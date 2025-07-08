// Reset session values
sessionStorage.setItem('proceedFromHomeButtonOnly', false);
sessionStorage.setItem('faceVerified', false);
sessionStorage.setItem('payFromFacePageOnly', false);

// Check if already logged in
let currentUser = null;
let keepLoggedIn = localStorage.getItem("keepLoggedIn");

function getUserName() {
    if (keepLoggedIn === "yes") {
        currentUser = JSON.parse(localStorage.getItem('user'));
    } else {
        currentUser = JSON.parse(sessionStorage.getItem('user'));
    }
}
getUserName();

if (currentUser) {
    swal("Already Logged In!", "Log Out first to continue.", "warning").then(function () {
        window.location.replace("index.html");
    });
}

// Firebase Setup (v8)
const firebaseConfig = {
    apiKey: "AIzaSyC_xmkI67ZokC5S3bs_I4Wn1ZHL9qbsy6E",
    authDomain: "facepay-b93d2.firebaseapp.com",
    projectId: "facepay-b93d2",
    storageBucket: "facepay-b93d2.appspot.com",
    messagingSenderId: "894989632635",
    appId: "1:894989632635:web:a14b1f884f00e60bd20ede",
    measurementId: "G-GPV0QHPX2T",
    databaseURL: "https://facepay-b93d2-default-rtdb.firebaseio.com"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Form References
const email = document.getElementById('emailInp');
const pass = document.getElementById('passInp');
const submit = document.getElementById('loginBtn');

// Validation Function
function isEmptyOrSpaces(str) {
    return str == null || str.trim() === "";
}

function Validation() {
    const emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (isEmptyOrSpaces(email.value) || isEmptyOrSpaces(pass.value)) {
        swal("", "Please fill all fields", "warning");
        return false;
    }

    if (!emailregex.test(email.value)) {
        swal("", "Enter a valid email!", "warning");
        return false;
    }

    return true;
}

// Authenticate User
function AuthenticateUser() {
    if (!Validation()) return;

    const emailKey = email.value.replace(/[.#$[\]]/g, '');

    db.ref('UsersList/' + emailKey).once('value')
        .then(snapshot => {
            if (snapshot.exists()) {
                const userData = snapshot.val();

                if (!userData.password) {
                    swal("Error", "Password not set for this user. Please sign up again.", "error");
                    return;
                }

                const decryptedPass = decryptPassword(userData.password);

                if (decryptedPass === pass.value) {
                    saveUserSession(userData);
                    swal("Success", "Login Successful", "success").then(() => {
                        window.location.href = "../index.html";
                    });
                } else {
                    swal("Error", "Incorrect password", "error");
                }
            } else {
                swal("Error", "User not found. Please sign up first.", "error");
            }
        })
        .catch(error => {
            swal("Error", error.message, "error");
        });
}

// Decrypt Password
function decryptPassword(dbPassword) {
    try {
        const bytes = CryptoJS.AES.decrypt(dbPassword, "Secret Pass");
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText || "";
    } catch (e) {
        return "";
    }
}

// Save Session
function saveUserSession(userData) {
    const keepLoggedIn = document.getElementById('customSwitch1').checked;

    if (keepLoggedIn) {
        localStorage.setItem('keepLoggedIn', 'yes');
        localStorage.setItem('user', JSON.stringify(userData));
    } else {
        sessionStorage.setItem('user', JSON.stringify(userData));
    }
}

// Attach Event
submit.addEventListener('click', AuthenticateUser);
