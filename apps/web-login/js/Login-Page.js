import { NAVER_CLIENT_ID, KAKAO_CLIENT_ID } from "./moudle/constants.js";
import { cookieName } from "./moudle/constants.js";
import { indexURL, callbackURL, pathname } from "./moudle/url_list.js";
import { kakaoLogOut } from "./moudle/Logout.js";

let kakaoLoginBtn = document.getElementById("kakao-login-btn");
let kakaoLogOutBtn = document.getElementById("kakao-logout-btn");
let naverLoginBtn = document.getElementById("naver-login-btn");
let userProfile = {}; // Ouath를 통해 받을 정보를 저장할 객체

sessionStorage.setItem("cookieName", "userProfile");
sessionStorage.setItem("NAVER_CLIENT_ID", "Hw7RwBFOB7UjSufSEEjy");

NaverLoginInit();

function NaverLogin() {
  // naverLoginBtn.innerHTML = ' <a id="naver_id_login"></a> ';

  if (CheckingUserProileCookie()) {
    // MoveHomepage();
    console.log("CheckingUserProileCooki");
  }
}

function NaverLoginInit() {
  let naverIdLogin = new naver_id_login(NAVER_CLIENT_ID, callbackURL);

  SetNaverOauth(naverIdLogin);
  naverIdLogin.init_naver_id_login();
}
function SetNaverOauth(naverIdLogin) {
  let state = naverIdLogin.getUniqState();

  naverIdLogin.setButton("white", 2, 40);
  naverIdLogin.setDomain(indexURL);
  naverIdLogin.setState(state);
  naverIdLogin.setPopup();
}

function CheckingUserProileCookie() {
  console.log("로그인 중");
  if (getCookie(cookieName)) {
    GetUserProfileObject();
    console.log("find Object ");
    return true;
  } else {
    console.log("erro: cookis could not be found");
    return false;
  }
}
function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}
function GetUserProfileObject() {
  const cookieValue = document.cookie
    .split(";")
    .find(cookie => cookie.trim().startsWith(cookieName + "="))
    ?.split("=")[1];
  // 쿠키에 저장된 userProfile 정보를 객체로 변환
  userProfile = JSON.parse(cookieValue);
  console.log("GetUserProfileObject", userProfile);
}

/*카카오 로그인 ----------------- */
// kakao ouath part
Kakao.init(KAKAO_CLIENT_ID); //발급받은 키 중 javascript키를 사용해준다.
// sdk초기화여부판단
if (!Kakao.isInitialized()) {
  alert("kakao sdk is not initialized");
  // return;
}

//카카오로그인
function kakaoLogin() {
  let token = Kakao.Auth.getAccessToken();
  console.log(token);
  Kakao.Auth.login({
    // this.auth.
    success: function (response) {
      Kakao.API.request({
        url: "/v2/user/me",
        data: {
          property_keys: ["kakao_account.email", "kakao_account.gender"],
        },
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    fail: function (error) {
      console.log(error);
    },
  });
}

function LogOut() {
  kakaoLogOut(Kakao);
}

kakaoLoginBtn.addEventListener("click", kakaoLogin);
kakaoLogOutBtn.addEventListener("click", LogOut);
naverLoginBtn.addEventListener("click", NaverLogin);
window.addEventListener("message", function (event) {
  // 이벤트를 처리하는 코드 작성

  console.log(event.data); // 전달된 데이터 출력
  if (event.data === "use Naver Oauth") {
    console.log("if문");
  }
});
