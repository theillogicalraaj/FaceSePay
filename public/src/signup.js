// Reset session values
sessionStorage.setItem('proceedFromHomeButtonOnly', false);
sessionStorage.setItem('faceVerified', false);
sessionStorage.setItem('payFromFacePageOnly', false);

// Firebase Setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, get, child, set } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC_xmkI67ZokC5S3bs_I4Wn1ZHL9qbsy6E",
  authDomain: "facepay-b93d2.firebaseapp.com",
  projectId: "facepay-b93d2",
  storageBucket: "facepay-b93d2.appspot.com",
  messagingSenderId: "894989632635",
  appId: "1:894989632635:web:a14b1f884f00e60bd20ede",
  databaseURL: "https://facepay-b93d2-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Form References
const name = document.getElementById('nameInp');
const email = document.getElementById('emailInp');
const username = document.getElementById('userInp');
const phone = document.getElementById('phoneInp');
const pass = document.getElementById('passInp');
const submit = document.getElementById('sub_btn');

// Validation Function
function isEmptyOrSpaces(str) {
  return str == null || str.trim() === "";
}

function Validation() {
  const nameregex = /^[a-zA-Z\s]+$/;
  const emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const userregex = /^[a-zA-Z0-9]{3,}$/;
  const phoneregex = /^(\+\d{1,3}[- ]?)?[0]?\d{10}$/;

  if ([name.value, email.value, username.value, phone.value, pass.value].some(isEmptyOrSpaces)) {
    swal("", "You cannot leave any field empty!", "warning");
    return false;
  }

  if (!nameregex.test(name.value)) {
    swal("", "The name should only contain alphabets!", "warning");
    return false;
  }

  if (!emailregex.test(email.value)) {
    swal("", "Enter a valid email!", "warning");
    return false;
  }

  if (!userregex.test(username.value)) {
    swal("", "Username must be at least 3 characters, alphanumeric.", "warning");
    return false;
  }

  if (!phoneregex.test(phone.value)) {
    swal("", "Enter a valid phone number!", "warning");
    return false;
  }

  if (pass.value.length < 5) {
    swal("", "Password must be at least 5 characters!", "warning");
    return false;
  }

  return true;
}

// Encrypt Password
function encPass() {
  const secretKey = "Secret Pass";
  const encrypted = CryptoJS.AES.encrypt(pass.value, secretKey);
  return encrypted.toString();
}

// Register User
function RegisterUser() {
  if (!Validation()) return;

  const dbRef = ref(db);
  const emailKey = email.value.replace(/[.#$/\[\]]/g, '');

  get(child(dbRef, "UsersList/" + emailKey)).then((snapshot) => {
    if (snapshot.exists()) {
      swal("", "Account already exists!", "warning");
    } else {
      const userData = {
        fullname: name.value,
        username: username.value,
        email: email.value,
        phone: phone.value,
        profileImgURL: "",
        password: encPass()
      };

      set(ref(db, "UsersList/" + emailKey), userData)
        .then(() => {
          swal("Account Created!", "Please log in now.", "success").then(() => {
            window.location.replace("login.html");
          });
        })
        .catch((error) => {
          swal("Error!", `${error}`, "error");
        });
    }
  });
}

// Attach Event
submit.addEventListener('click', RegisterUser);
