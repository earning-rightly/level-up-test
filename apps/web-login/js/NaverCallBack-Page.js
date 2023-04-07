// import { NAVER_CLIENT_ID, NAVER_OAUTH_SECRETE } from "./moudle/constants.js";
// import { cookieName } from "./moudle/constants.js";
// import { indexURL, callbackURL, pathname } from "./moudle/url_list.js";
// import { naverLogOut } from "./moudle/Logout.js";
const NAVER_CLIENT_ID = "Hw7RwBFOB7UjSufSEEjy"; // 상수는 따로 .js 파일에 넣어서 관리하자
const cookieName = "userProfile";

let indexURL = new URL(document.location.href);
let pathname = indexURL.pathname; // url-path 부분

let callbackURL =
  indexURL.origin + // scheme와 hosts 부분
  pathname.substring(0, pathname.lastIndexOf("/")) +
  "/CallBack.html";

let naverLogOutBtn = document.getElementById("naver-logout-btn");

// const callbackURL = new URL(document.location.href);
// const indexURL = callbackURL.origin;
// const pathname = callbackURL.pathname;

var userProfile = {};
var naverIdLogin = new naver_id_login(NAVER_CLIENT_ID, callbackURL);

// naverSignInCallback();

naverIdLogin.get_naver_userprofile("naverSignInCallback()"); // 실행이 안됨
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

// function naverSignInCallback() {
//   // userProfile 객체를 JSON 형식으로 변환하여 쿠키에 저장
//   alert(naverIdLogin.getProfileData("email"));
//   alert(naverIdLogin.getProfileData("nickname"));
//   alert(naverIdLogin.getProfileData("age"));
// }
console.log(naverIdLogin);

function UserProfileInputCookies() {
  console.log("UserProfileInputCookies");
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
  console.log("close funtion");
  window.opener.postMessage(
    "use Naver Oauth",
    indexURL + // scheme와 hosts 부분
      pathname.substring(0, pathname.lastIndexOf("/")) +
      "/login.html"
  );
  // window.close();
}

function LogOut() {
  window.open(`https://nid.naver.com/nidlogin.logout`);
}

naverLogOutBtn.addEventListener("click", LogOut);
