const CONTENT_SELECTOR = "content";
const NAVBAR_SELECTOR = "global-nav";
const META_SELECTOR = "meta[name='user-login']";
const MY_PROFILE_LINK_ID = "github-my-profile-link";

function addMyProfileLink() {
  if (document.getElementById(MY_PROFILE_LINK_ID)) return;

  const userLogin = document.querySelector(META_SELECTOR)?.getAttribute(CONTENT_SELECTOR);

  if (userLogin) {
    const path = "/" + userLogin;
    const navbar = document.getElementById(NAVBAR_SELECTOR);
    const pullRequestsAnchor = navbar?.children[1];

    if (pullRequestsAnchor) {
      const myProfileAnchor = document.createElement("a");
      myProfileAnchor.href = path;
      myProfileAnchor.id = MY_PROFILE_LINK_ID;
      myProfileAnchor.textContent = "My profile";
      myProfileAnchor.ariaLabel = "Your Profile";
      myProfileAnchor.className = pullRequestsAnchor.classList;

      navbar.insertBefore(myProfileAnchor, pullRequestsAnchor);
    }
  }
}

new MutationObserver(addMyProfileLink).observe(document, { childList: true, subtree: true });
