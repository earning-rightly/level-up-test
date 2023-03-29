const naverOuath_ID = "Hw7RwBFOB7UjSufSEEjy";
const callbackURL = new URL(document.location.href);
const indexURL = callbackURL.origin;
const cookieName = "userProfile";
var naverIdLogin = new naver_id_login(naverOuath_ID, callbackURL);

// 네이버 사용자 프로필 조회
naverIdLogin.get_naver_userprofile("naverSignInCallback()");
// 네이버 사용자 프로필 조회 이후 프로필 정보를 처리할 callback function
function naverSignInCallback() {
  // userProfile 객체를 JSON 형식으로 변환하여 쿠키에 저장
  UserProfileInputCookies();
  CloseCallback();
}

function UserProfileInputCookies() {
  userProfile = {
    token: naverIdLogin.oauthParams.access_token,
    email: naverIdLogin.getProfileData("email"),
    nickname: naverIdLogin.getProfileData("nickname"),
    age: naverIdLogin.getProfileData("age"),
  };

  document.cookie = cookieName + "=" + JSON.stringify(userProfile);
  console.log(userProfile);
}

function CloseCallback() {
  window.close();
  window.opener.postMessage(
    "callBack.html close",
    "http://127.0.0.1:5500/level-up-test/apps/web-login/index.html"
  );
}

// 로그아웃 구현
function logOut() {
  deleteCookie(cookieName);

  function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    console.log("del cookies?");
  }
  window.open(`https://nid.naver.com/nidlogin.logout`);
  Window.close();
}
