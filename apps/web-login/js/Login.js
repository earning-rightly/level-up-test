const NAVER_CLIENT_ID = "Hw7RwBFOB7UjSufSEEjy"; // 상수는 따로 .js 파일에 넣어서 관리하자
const KAKAO_CLIENT_ID = "13cee8f0d511dff11f766fe1d031b0a1";

const indexURL = new URL(document.location.href); // 객체인데 왜? 상수처럼 전부 대문자?
const pathname = indexURL.pathname; // url-path 부분
const callbackURL =
  indexURL.origin + // scheme와 hosts 부분
  pathname.substring(0, pathname.lastIndexOf("/")) +
  "/CallBack.html";

var naver_id_login = new naver_id_login(NAVER_CLIENT_ID, callbackURL); // 변수을 동일하게 할 필요 없다
var state = naver_id_login.getUniqState();
// 재새용 고
naver_id_login.setButton("white", 2, 40);
naver_id_login.setDomain(indexURL);
naver_id_login.setState(state);
naver_id_login.setPopup();
naver_id_login.init_naver_id_login();

// kakao ouath part
Kakao.init(KAKAO_CLIENT_ID); //발급받은 키 중 javascript키를 사용해준다.
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
