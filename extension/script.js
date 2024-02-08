const CONTENT_SELECTOR = "content";
const META_SELECTOR = "meta[name='user-login']";
const MY_PROFILE_LINK_ID = "github-my-profile-link";
const NAVBAR_SELECTOR = "AppHeader-globalBar-start";
const MY_PROFILE_IMAGE_DIR = "assets/img/my-profile.svg";

function createSvgImage(path) {
  const svgImage = document.createElement("img");
  svgImage.size = "32";
  svgImage.width = "32";
  svgImage.height = "32";
  svgImage.alt = "My Profile";
  svgImage.src = `${path}.png?size=32`;
  svgImage.classList.add("avatar", "circle");
  svgImage.onerror = () => (svgImage.src = browser.runtime.getURL(MY_PROFILE_IMAGE_DIR));
  return svgImage;
}

function createProfileAnchor(path, githubLogoAnchor) {
  const profileAnchor = document.createElement("a");
  profileAnchor.href = path;
  profileAnchor.id = MY_PROFILE_LINK_ID;
  profileAnchor.ariaLabel = "Your Profile";
  profileAnchor.className = githubLogoAnchor.classList;
  return profileAnchor;
}

function addMyProfileLink() {
  if (document.getElementById(MY_PROFILE_LINK_ID)) return;

  const userLogin = document.querySelector(META_SELECTOR)?.getAttribute(CONTENT_SELECTOR);

  if (userLogin) {
    const navbar = document.getElementsByClassName(NAVBAR_SELECTOR)[0];
    const githubLogoAnchor = navbar?.children[1];

    if (githubLogoAnchor) {
      const path = "/" + userLogin;
      const svgImage = createSvgImage(path);
      const myProfileAnchor = createProfileAnchor(path, githubLogoAnchor);
      myProfileAnchor.appendChild(svgImage);
      navbar.insertBefore(myProfileAnchor, githubLogoAnchor);
    }
  }
}

new MutationObserver(addMyProfileLink).observe(document, { childList: true, subtree: true });
