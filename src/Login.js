// naver ouath part
const WEB_IP = "http://192.168.0.12:8887/Login.html#";
const CALLBACK_IP = "http://192.168.0.12:8887/CallBack.html";
const CLIENT_ID = "Hw7RwBFOB7UjSufSEEjy";

var naver_id_login = new naver_id_login(CLIENT_ID, CALLBACK_IP);
var state = naver_id_login.getUniqState();
naver_id_login.setButton("white", 2, 40);
naver_id_login.setDomain(WEB_IP);
naver_id_login.setState(state);
naver_id_login.setPopup();
naver_id_login.init_naver_id_login();

// kakao ouath part
Kakao.init("13cee8f0d511dff11f766fe1d031b0a1"); //발급받은 키 중 javascript키를 사용해준다.
console.log(Kakao.isInitialized()); // sdk초기화여부판단
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

// 수정중인 부분 로그인 기능만 유지한 채로
// function kakaoLogin() {
//   window.Kakao.Auth.login({
//     scope: "profile_nickname, account_email, gender",
//     success: function (authObj) {
//       alert("로그인 성공");
//       console.log(authObj);
//       // window.Kakao.API.request({
//       //   url: "/v2/user/me",
//       //   success: res => {
//       //     const kakao_account = res.kako_account;
//       //     console.log(kakao_account);
//       //   },
//       // });
//     },
//   });
// }
