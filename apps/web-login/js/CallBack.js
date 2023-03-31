const NAVER_OAUTH_ID = "Hw7RwBFOB7UjSufSEEjy";
const cookieName = "userProfile";
const NAVER_OAUTH_SECRETE = "MaLARH3T4B";
const callbackURL = new URL(document.location.href);
const indexURL = callbackURL.origin;
const pathname = callbackURL.pathname;

var userProfile = {};
var naverIdLogin = new naver_id_login(NAVER_OAUTH_ID, callbackURL);

// 네이버 사용자 프로필 조회

naverIdLogin.get_naver_userprofile("naverSignInCallback()");

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

  document.cookie = cookieName + "=" + JSON.stringify(userProfile);
  console.log(userProfile);
  return true;
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

function LogOut() {
  DeleteCookie(cookieName);
  // ChangeLoginBox();
  DelNaverToken(NAVER_OAUTH_ID, NAVER_OAUTH_SECRETE, userProfile.token);
  // window.open(`https://nid.naver.com/nidlogin.logout`);

  function DeleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    console.log("del cookies");
  }
}

function DelNaverToken(clentID, secrete, token) {
  const delTokenURL =
    `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_` +
    `id=${clentID}&client_` +
    `secret=${secrete}&access_` +
    `token=${token}&service_provider=NAVER`;
  location.replace(delTokenURL);

  // window.close();
}

window.addEventListener("message", function (event) {
  // 이벤트를 처리하는 코드 작성

  console.log(event.data); // 전달된 데이터 출력
  if (event.data === "use Naver Oauth") {
  }
});
