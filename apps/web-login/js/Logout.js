import { NAVER_CLIENT_ID, NAVER_OAUTH_SECRETE } from "./constants.js";
import { cookieName } from "./constants.js";

//카카오로그아웃
function kakaoLogOut(Kakao) {
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

// 네이버 로그아웃
function naverLogOut(userProfile) {
  console.log("logout");
  DeleteCookie(cookieName);
  // ChangeLoginBox();
  DelNaverToken(NAVER_CLIENT_ID, NAVER_OAUTH_SECRETE, userProfile.token);
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

function ChangeLoginBox() {
  loginBox.innerHTML = `<a type="module" href="login.html">Log In</a>`;
  location.reload();
}

export { kakaoLogOut, naverLogOut };
