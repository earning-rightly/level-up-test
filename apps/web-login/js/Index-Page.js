const cookieName = "userProfile";

let loginBox = document.getElementById("login_box");
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
function LogOut() {
  DeleteCookie(cookieName);
  ChangeLoginBox();
  window.open(`https://nid.naver.com/nidlogin.logout`);

  function DeleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    console.log("del cookies?");
  }

  function ChangeLoginBox() {
    loginBox.innerHTML = `<a type="module" href="login.html">Log In</a>`;
    location.reload();
  }
}

if (getCookie("userProfile")) {
  GetUserProfileObject();
  console.log("cookies");
  loginBox.innerHTML = `<a href=> ${userProfile.nickname}님 안녕하세요 </a>
  <span><button class="btn" id="log_out_btn" onClick="LogOut()"> Log out</buuton> </span>`;
}
