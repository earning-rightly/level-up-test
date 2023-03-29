const NAVER_CLIENT_ID = "Hw7RwBFOB7UjSufSEEjy"; // 상수는 따로 .js 파일에 넣어서 관리하자
const KAKAO_CLIENT_ID = "13cee8f0d511dff11f766fe1d031b0a1";
const indexURL = new URL(document.location.href); // 객체인데 왜? 상수처럼 전부 대문자?
const pathname = indexURL.pathname; // url-path 부분
const callbackURL =
  indexURL.origin + // scheme와 hosts 부분
  pathname.substring(0, pathname.lastIndexOf("/")) +
  "/CallBack.html";

// console.lo(button);

let btn1 = document.querySelector("#naver_id_login");

// 재새용 고

btn1.addEventListener("click", pop1);
console.log(btn1);
// console.log(btn2);

// btn1.addEventListener("click", pop1);
NaverLoginInit();
function NaverLoginInit() {
  var naverIdLogin = new naver_id_login(NAVER_CLIENT_ID, callbackURL);

  SetNaverOauth(naverIdLogin);
  naverIdLogin.init_naver_id_login();
}
function SetNaverOauth(naverIdLogin) {
  var state = naverIdLogin.getUniqState();

  naverIdLogin.setButton("white", 2, 40);
  naverIdLogin.setDomain(indexURL);
  naverIdLogin.setState(state);
  naverIdLogin.setPopup();
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

function pop1() {
  console.log("로그인 중");
  if (getCookie("userProfile")) {
    // window.location.href = "https://www.daum.net/";
    console.log("work function");
    const cookieName = "userProfile";
    const cookieValue = document.cookie
      .split(";")
      .find(cookie => cookie.trim().startsWith(cookieName + "="))
      ?.split("=")[1];

    // 쿠키에 저장된 userProfile 정보를 객체로 변환
    const userProfile = JSON.parse(cookieValue);
    console.log(userProfile);
  } else {
    console.log("erro: cookis could not be found");
  }
}

// kakao ouath part
Kakao.init(NAVER_CLIENT_ID); //발급받은 키 중 javascript키를 사용해준다.
// sdk초기화여부판단
if (!Kakao.isInitialized()) {
  alert("kakao sdk is not initialized");
  // return;
}

//카카오로그인
function kakaoLogin() {
  Kakao.Auth.login({
    success: function (response) {
      Kakao.API.request({
        url: "/v2/user/me",
        success: function (response) {
          console.log(response);
          alert("success login");
          openNew(); // 세로운 창을 띄우고 싶은데 왜 안되는 걸까요? 알려 주세요
        },
        fail: function (error) {
          console.log(error);
        },
      });
    },
    fail: function (error) {
      console.log(error);
    },
  });
}
function openNew() {
  windowOpen(
    // https://developers.kakao.com/sdk/js/kakao.js 에 있는 함수를 사용하려고 하는데 오류가 나와요 ㅠㅠ
    "https://t1.kakaocdn.net/kakao_js_sdk/v1/kakao.js",
    "_blank",
    "width=400,height=400"
  );
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

window.addEventListener("message", event => {
  // 이벤트를 처리하는 코드 작성
  console.log(event.data); // 전달된 데이터 출력
});
