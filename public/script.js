let login = document.getElementById("login");
let signup = document.getElementById("signup");
let profile = document.getElementById("profile");
let profileLogo = document.getElementById("profileLogo");
let walletSwitch = document.getElementById("wallet-switch");
let bankSwitch = document.getElementById("bank-switch");
let wallet = document.getElementById("wallet-transfer-container");
let bank = document.getElementById("bank-transfer-container");

// Reset flags
sessionStorage.setItem("proceedFromHomeButtonOnly", false);
sessionStorage.setItem("faceVerified", false);
sessionStorage.setItem("payFromFacePageOnly", false);

// Toggle transfer type
walletSwitch.onclick = () => {
  wallet.classList.replace("hide", "unhide");
  bank.classList.replace("unhide", "hide");
};

bankSwitch.onclick = () => {
  wallet.classList.replace("unhide", "hide");
  bank.classList.replace("hide", "unhide");
};

// Load user & profile picture
let currentUser = null;
let keepLoggedIn = localStorage.getItem("keepLoggedIn");

function getUserName() {
  if (keepLoggedIn === "yes") {
    currentUser = JSON.parse(localStorage.getItem("user"));
  } else {
    currentUser = JSON.parse(sessionStorage.getItem("user"));
  }
}
getUserName();

if (currentUser && currentUser.profileImgURL && currentUser.profileImgURL !== "null") {
  profileLogo.src = currentUser.profileImgURL;
} else {
  profileLogo.src = "./images/profileM.webp";
}
profileLogo.onerror = () => {
  profileLogo.src = "./images/profileM.webp";
};

// Navigation
login.onclick = () => (window.location.href = "./src/login.html");
signup.onclick = () => (window.location.href = "./src/signup.html");
profile.onclick = () => (window.location.href = "./src/profile.html");

function clickLogoImg() {
  window.location.href = "./index.html";
}
window.clickLogoImg = clickLogoImg;

// Button logic
function clickHomeNextBtn() {
  const isWallet = wallet.classList.contains("unhide");
  let allFilled = true;
  const inputs = isWallet
    ? wallet.querySelectorAll("input")
    : bank.querySelectorAll("input");

  inputs.forEach((input) => {
    if (input.value.trim() === "") allFilled = false;
  });

  if (!allFilled) {
    swal("Error", "Please fill in all fields.", "error");
    return;
  }

  sessionStorage.setItem("proceedFromHomeButtonOnly", true);
  window.location.href = "./src/face-verification.html";
}
window.clickHomeNextBtn = clickHomeNextBtn;
