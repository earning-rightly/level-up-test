const naverOuath_ID = "Hw7RwBFOB7UjSufSEEjy";
const callbackURL = new URL(document.location.href);
const indexURL = callbackURL.origin;
const pathname = callbackURL.pathname;
const cookieName = "userProfile";
var naverIdLogin = new naver_id_login(naverOuath_ID, callbackURL);

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
  window.close();
}
