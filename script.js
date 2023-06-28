const CONTENT_SELECTOR = "content";
const META_SELECTOR = "meta[name='user-login']";
const MY_PROFILE_IMAGE_DIR = "assets/img/my-profile.svg";
const MY_PROFILE_LINK_ID = "github-my-profile-link";
const NAVBAR_SELECTOR = "AppHeader-globalBar-start";

function addMyProfileLink() {
  if (document.getElementById(MY_PROFILE_LINK_ID)) return;

  const userLogin = document.querySelector(META_SELECTOR)?.getAttribute(CONTENT_SELECTOR);

  if (userLogin) {
    const path = "/" + userLogin;
    const navbar = document.getElementsByClassName(NAVBAR_SELECTOR)[0];
    const githubLogoAnchor = navbar?.children[1];

    if (githubLogoAnchor) {
      const svgImage = document.createElement("img");
      svgImage.width = "32";
      svgImage.height = "32";
      svgImage.alt = "My Profile";
      svgImage.src = chrome.runtime.getURL(MY_PROFILE_IMAGE_DIR);

      const myProfileAnchor = document.createElement("a");
      myProfileAnchor.href = path;
      myProfileAnchor.id = MY_PROFILE_LINK_ID;
      myProfileAnchor.ariaLabel = "Your Profile";
      myProfileAnchor.className = githubLogoAnchor.classList;
      
      myProfileAnchor.appendChild(svgImage);
      navbar.insertBefore(myProfileAnchor, githubLogoAnchor);
    }
  }
}

new MutationObserver(addMyProfileLink).observe(document, { childList: true, subtree: true });
