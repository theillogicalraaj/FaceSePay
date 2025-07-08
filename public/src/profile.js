// Reset session flags
sessionStorage.setItem('proceedFromHomeButtonOnly', false);
sessionStorage.setItem('faceVerified', false);
sessionStorage.setItem('payFromFacePageOnly', false);

const photo = document.getElementById('photo');
const file = document.getElementById('file');
const uploadBtn = document.getElementById('uploadBtn');
const saveBtn = document.getElementById('save-btn');

let currentUser = null;
let keepLoggedIn = localStorage.getItem("keepLoggedIn");

// Get user data from storage
function getUserData() {
  if (keepLoggedIn === "yes") {
    currentUser = JSON.parse(localStorage.getItem('user'));
  } else {
    currentUser = JSON.parse(sessionStorage.getItem('user'));
  }
}
getUserData();

// Load user data to page
if (currentUser) {
  const { fullname, email, username, phone, profileImgURL } = currentUser;
  const payid = phone ? `${phone}@facepay` : "NA";

  document.getElementById('name').innerText = fullname || "NA";
  document.getElementById('email').innerText = email || "NA";
  document.getElementById('username').innerText = username || "NA";
  document.getElementById('phone').innerText = phone || "NA";
  document.getElementById('payid').innerText = payid;

  if (profileImgURL && profileImgURL !== "null") {
    photo.src = profileImgURL;
  }
} else {
  swal("Login First!", "To view profile, please log in!", "warning").then(() => {
    window.location.href = "./login.html";
  });
}

// Handle profile image upload
file.addEventListener('change', function () {
  const imageChosen = this.files[0];
  if (!imageChosen) {
    swal("No File!", "Please select a valid image file.", "error");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const dataURL = reader.result;
    photo.setAttribute('src', dataURL);
    saveImageToLocal(dataURL);
    swal("Photo uploaded successfully!", "", "success");
  };
  reader.readAsDataURL(imageChosen);
});

function saveImageToLocal(dataURL) {
  if (!currentUser) return;

  currentUser.profileImgURL = dataURL;

  if (keepLoggedIn === "yes") {
    localStorage.setItem('user', JSON.stringify(currentUser));
  } else {
    sessionStorage.setItem('user', JSON.stringify(currentUser));
  }
}

// Save button handler
saveBtn.addEventListener('click', () => {
  swal("Profile Saved!", "Your profile details and image have been saved.", "success")
    .then(() => window.location.href = '../index.html');
});
