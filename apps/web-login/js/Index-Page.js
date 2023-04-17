const NAVER_CLIENT_ID = sessionStorage.getItem("NAVER_CLIENT_ID");
const cookieName = sessionStorage.getItem("cookieName");
const NAVER_OAUTH_SECRETE = sessionStorage.getItem("NAVER_OAUTH_SECRETE");

console.log(cookieName);
let current_URL = new URL(document.location.href);

let loginBox = document.getElementById("login_box");
let logOutBtn = document.getElementById("log_out_btn");
// let logOutBtn = document.getElementById("");

let userProfile;
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
}

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

  location.replace(current_URL);
}

function LogOut() {
  naverLogOut(userProfile);
}

if (getCookie("userProfile")) {
  GetUserProfileObject();
  console.log("cookies");
  loginBox.innerHTML = `<a href=> ${userProfile.nickname}님 안녕하세요 </a>
  <span><button class="btn" id="log_out_btn"onclick="LogOut()" > Log out</buuton> </span>`;
}
console.log("logOutBtn:", logOutBtn);
