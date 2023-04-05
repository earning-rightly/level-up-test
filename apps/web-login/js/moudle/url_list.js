let indexURL = new URL(document.location.href);
let pathname = indexURL.pathname; // url-path 부분

let callbackURL =
  indexURL.origin + // scheme와 hosts 부분
  pathname.substring(0, pathname.lastIndexOf("/")) +
  "/CallBack.html";

export { indexURL, callbackURL, pathname };
