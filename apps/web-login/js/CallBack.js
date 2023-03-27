const naverOuath_ID = "Hw7RwBFOB7UjSufSEEjy";
const callbackURL = new URL(document.location.href);
const indexURL = callbackURL.origin;
var naver_id_login = new naver_id_login(naverOuath_ID, index_URL);

// 네이버 사용자 프로필 조회
naver_id_login.get_naver_userprofile("naverSignInCallback()");
// 네이버 사용자 프로필 조회 이후 프로필 정보를 처리할 callback function
function naverSignInCallback() {
  alert(naver_id_login.getProfileData("email"));
  alert(naver_id_login.getProfileData("nickname"));
  alert(naver_id_login.getProfileData("age"));
  alert("로그인 성공");
}

// 로그아웃 구현
function logOut() {
  window.open(`https://nid.naver.com/nidlogin.logout`);
}
