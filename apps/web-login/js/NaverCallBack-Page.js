const NAVER_CLIENT_ID = sessionStorage.getItem("NAVER_CLIENT_ID");
const cookieName = sessionStorage.getItem("cookieName");

let indexURL = new URL(document.location.href);
let pathname = indexURL.pathname; // url-path 부분

let callbackURL =
  indexURL.origin + // scheme와 hosts 부분
  pathname.substring(0, pathname.lastIndexOf("/")) +
  "/CallBack.html";

let naverLogOutBtn = document.getElementById("naver-logout-btn");

var userProfile = {};
var naverIdLogin = new naver_id_login(NAVER_CLIENT_ID, callbackURL);

naverIdLogin.get_naver_userprofile("naverSignInCallback()");
function naverSignInCallback() {
  // userProfile 객체를 JSON 형식으로 변환하여 쿠키에 저장
  userProfile = {
    token: naverIdLogin.oauthParams.access_token,
  };
  if (UserProfileInputCookies()) {
    CloseCallbackPage();
  } else {
    alert("Server에 접속하지 못했습니다");
  }
}

function UserProfileInputCookies() {
  userProfile = {
    token: naverIdLogin.oauthParams.access_token,
    email: naverIdLogin.getProfileData("email"),
    nickname: naverIdLogin.getProfileData("nickname"),
    age: naverIdLogin.getProfileData("age"),
  };

  if (!userProfile) {
    return false;
  } else {
    document.cookie = cookieName + "=" + JSON.stringify(userProfile);
    console.log("userProfile", userProfile);
    return true;
  }
}

function CloseCallbackPage() {
  window.opener.postMessage(
    "use Naver Oauth",
    indexURL + // scheme와 hosts 부분
      pathname.substring(0, pathname.lastIndexOf("/")) +
      "/login.html"
  );
  window.open("http://127.0.0.1:5500/level-up-test/apps/web-login/index.html");
  window.close();
}

function LogOut() {
  window.open(`https://nid.naver.com/nidlogin.logout`);
}

naverLogOutBtn.addEventListener("click", LogOut);
