// Retrieve user session
let currentUser;
let keepLoggedIn = localStorage.getItem("keepLoggedIn");

if (keepLoggedIn === "yes") {
    currentUser = JSON.parse(localStorage.getItem('user'));
} else {
    currentUser = JSON.parse(sessionStorage.getItem('user'));
}

// Redirect to login if no user found
if (!currentUser) {
    swal("Login First!", "Please log in to access payment page.", "warning")
        .then(() => window.location.href = './login.html');
}

// Get face verification status
let faceVerified = sessionStorage.getItem('faceVerified') === "true";
let payFromFacePageOnly = sessionStorage.getItem('payFromFacePageOnly') === "true";

// Get page elements
const successImg = document.querySelector('.success');
const failedAnim = document.querySelector('.failed');
const successMessage = document.getElementById('success-message');
const requestMessage = document.getElementById('request-message');
const failureReason = document.getElementById('failure-reason');
const redirectingMessage = document.getElementById('redirecting-message');

// Check if payment is accessed properly
if (!payFromFacePageOnly) {
    swal("Invalid Access!", "Please complete face verification first.", "warning")
        .then(() => window.location.href = "../index.html");
} else {
    if (faceVerified) {
        showSuccess();
    } else {
        showFailure();
    }
}

// Show Payment Success
function showSuccess() {
    if (successImg) successImg.classList.remove('hide');
    if (failedAnim) failedAnim.classList.add('hide');
    if (successMessage) {
        successMessage.innerText = "Payment Successful!";
        successMessage.style.color = "#4caf50";
    }
    if (requestMessage) requestMessage.innerText = `Thank you ${currentUser.fullname}, your payment has been processed successfully.`;
    if (failureReason) failureReason.classList.add('hide');
    if (redirectingMessage) redirectingMessage.innerText = "You will be redirected to home shortly...";
    autoRedirect();
}

// Show Payment Failure
function showFailure() {
    if (successImg) successImg.classList.add('hide');
    if (failedAnim) failedAnim.classList.remove('hide');
    if (successMessage) {
        successMessage.innerText = "Payment Failed!";
        successMessage.style.color = "red";
    }
    if (requestMessage) requestMessage.innerText = "Transaction could not be completed.";
    if (failureReason) failureReason.classList.remove('hide');
    if (redirectingMessage) redirectingMessage.innerText = "You will be redirected to home shortly...";
    autoRedirect();
}

// Auto redirect function
function autoRedirect() {
    setTimeout(() => {
        window.location.href = "../index.html";
    }, 5000);
}

// Go Home button
function clickHomeBtn() {
    window.location.href = "../index.html";
}
