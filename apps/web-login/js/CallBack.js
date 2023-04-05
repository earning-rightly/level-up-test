import { NAVER_CLIENT_ID, NAVER_OAUTH_SECRETE } from "./constants.js";
import { cookieName } from "./constants.js";
import { indexURL, callbackURL, pathname } from "./url_list.js";
import { naverLogOut } from "./Logout.js";

let naverLogOutBtn = document.getElementById("naver-logout-btn");

// const callbackURL = new URL(document.location.href);
// const indexURL = callbackURL.origin;
// const pathname = callbackURL.pathname;

var userProfile = {};
var naverIdLogin = new naver_id_login(NAVER_CLIENT_ID, callbackURL);
console.log(callbackURL);
naverSignInCallback();

function naverSignInCallback() {
  // userProfile 객체를 JSON 형식으로 변환하여 쿠키에 저장
  if (UserProfileInputCookies()) {
    CloseCallbackPage();
  } else {
    alert("Server에 접속하지 못했습니다");
  }
}

console.log(indexURL);
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
    console.log(userProfile);
    return true;
  }
}

function CloseCallbackPage() {
  console.log("close funtion");
  window.opener.postMessage(
    "close",
    indexURL + // scheme와 hosts 부분
      pathname.substring(0, pathname.lastIndexOf("/")) +
      "/login.html"
  );
  // window.close();
}

window.addEventListener("message", function (event) {
  // 이벤트를 처리하는 코드 작성

  console.log(event.data); // 전달된 데이터 출력
  if (event.data === "use Naver Oauth") {
  }
});

function LogOut() {
  naverLogOut(userProfile);
}

naverLogOutBtn.addEventListener("click", LogOut);
