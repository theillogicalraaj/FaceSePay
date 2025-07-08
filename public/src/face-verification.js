let currentUser;
let keepLoggedIn = localStorage.getItem("keepLoggedIn");
let proceedFromHomeButtonOnly = sessionStorage.getItem("proceedFromHomeButtonOnly");
let payFromFacePageOnly = sessionStorage.getItem('payFromFacePageOnly');
let referencedImageURL;

function getUser() {
    if (keepLoggedIn === "yes") {
        currentUser = JSON.parse(localStorage.getItem('user'));
    } else {
        currentUser = JSON.parse(sessionStorage.getItem('user'));
    }
}
getUser();

if (!currentUser) {
    swal("Login First!", "Please log in to use face verification.", "warning").then(() => {
        window.location.href = "./login.html";
    });
} else {
    referencedImageURL = currentUser.profileImgURL;

    if (!referencedImageURL || referencedImageURL === "null" || referencedImageURL === "") {
        swal("Upload Profile Photo!", "Please update your profile photo first.", "warning").then(() => {
            window.location.href = "./profile.html";
        });
    }

    if (proceedFromHomeButtonOnly === "false") {
        swal("Incomplete Step!", "Please fill transaction details first.", "warning").then(() => {
            window.location.href = "../index.html";
        });
    }
}

const message = document.getElementById('message');
const video = document.getElementById('videoElement');
const main = document.getElementById('main');
const startBtn = document.getElementById('start-btn');

const modelsSrc = "../models";
let faceMatcher;
let canvas;
let faceLabel;
let faceScore;
let faceVerified = false;

document.querySelector('.logo-img').addEventListener('click', () => {
    window.location.href = '../index.html';
});

startBtn.addEventListener('click', () => {
    startFaceRecognition();
});

message.innerText = "Starting Camera...";

Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri(modelsSrc),
    faceapi.nets.faceLandmark68Net.loadFromUri(modelsSrc),
    faceapi.nets.faceRecognitionNet.loadFromUri(modelsSrc),
]).then(startVideo);

function startVideo() {
    navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => {
            video.srcObject = stream;
            matchFace();
        })
        .catch(err => {
            console.error(err);
            swal("Camera Error", "Unable to access camera. Please check browser permissions.", "error");
        });
}

async function loadLabeledImages() {
    const labels = ['known'];
    return Promise.all(
        labels.map(async (label) => {
            const descriptions = [];

            const img = await faceapi.fetchImage(referencedImageURL);
            const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

            if (!detection) {
                swal("No Face Found!", "No face detected in your uploaded photo.", "error");
                throw new Error("No Face Detected");
            }

            descriptions.push(detection.descriptor);
            return new faceapi.LabeledFaceDescriptors(label, descriptions);
        })
    );
}

async function matchFace() {
    try {
        message.innerText = "Processing your profile image...";

        const labeledDescriptors = await loadLabeledImages();
        faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);

        message.innerText = "Camera Ready! Press 'Start Verification'";

        startBtn.classList.replace('hide', 'unhide');
    } catch (e) {
        console.error(e);
    }
}

async function startFaceRecognition() {
    if (canvas) canvas.remove();

    canvas = faceapi.createCanvasFromMedia(video);
    main.appendChild(canvas);

    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (!resizedDetections[0]) {
        swal("No Face Detected!", "Please ensure your face is clearly visible.", "warning");
        return;
    }

    const bestMatch = faceMatcher.findBestMatch(resizedDetections[0].descriptor);

    faceLabel = bestMatch.label;
    faceScore = bestMatch.distance;

    const box = resizedDetections[0].detection.box;
    const drawBox = new faceapi.draw.DrawBox(box);
    drawBox.draw(canvas);

    handleVerificationResult();
}

function handleVerificationResult() {
    payFromFacePageOnly = true;
    sessionStorage.setItem('payFromFacePageOnly', payFromFacePageOnly);

    if (faceLabel === "known" && faceScore <= 0.45) {
        faceVerified = true;
        sessionStorage.setItem('faceVerified', faceVerified);

        swal(`Welcome ${currentUser.fullname}!`, "Face Verified. Press Pay to proceed.", "success");

        message.innerText = "Face Verified! Press 'Pay' button below.";
        startBtn.innerText = "Pay";
        startBtn.classList.add('pay-btn');
        startBtn.onclick = () => window.location.href = './payment.html';
    } else {
        faceVerified = false;
        sessionStorage.setItem('faceVerified', faceVerified);

        swal("Verification Failed!", "Your face did not match the profile.", "error")
            .then(() => window.location.href = './payment.html');
    }
}
