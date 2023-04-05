import { NAVER_CLIENT_ID, KAKAO_CLIENT_ID } from "./constants.js";

let kakaoLoginBtn = document.getElementById("kakao-login-btn");
let naverLoginBtn = document.getElementById("naver-login-btn");
const indexURL = new URL(document.location.href);
const pathname = indexURL.pathname; // url-path 부분
const callbackURL =
  indexURL.origin + // scheme와 hosts 부분
  pathname.substring(0, pathname.lastIndexOf("/")) +
  "/CallBack.html";

let userProfile = {}; // Ouath를 통해 받을 정보를 저장할 객체

function NaverOauthLogin() {
  naverLoginBtn.innerHTML = '  <a id="naver_id_login"></a>';
  NaverLoginInit();
  if (CheckingUserProileCookie()) {
    // MoveHomepage();
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
  if (getCookie("userProfile")) {
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
  const cookieName = "userProfile";
  const cookieValue = document.cookie
    .split(";")
    .find(cookie => cookie.trim().startsWith(cookieName + "="))
    ?.split("=")[1];
  // 쿠키에 저장된 userProfile 정보를 객체로 변환
  userProfile = JSON.parse(cookieValue);
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

//카카오로그아웃
function kakaoLogout() {
  if (Kakao.Auth.getAccessToken()) {
    Kakao.API.request({
      url: "/v1/user/unlink",
      success: function (response) {
        console.log(response);
      },
      fail: function (error) {
        console.log(error);
      },
    });
    Kakao.Auth.setAccessToken(undefined);
  }
}

kakaoLoginBtn.addEventListener("click", kakaoLogin);
naverLoginBtn.addEventListener("click", NaverOauthLogin);
