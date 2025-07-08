# FaceSePay - SecureOnlineTransactionSystem

## 👀 Overview

**FaceSePay** is a secure online transaction system using face recognition authentication.  
Users must register and upload their profile image. During payment, the system uses your webcam to detect and verify your face in real-time.  
Only verified users are allowed to proceed with transactions — if the match fails, the transaction is blocked.

---

## 📸 Screenshots

<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/c8b7d733-13d3-4ff8-9df2-c37577f1ec2c" />

<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/b2ba2fa5-98b4-4357-b1d7-c34f65aa33f5" />


<img width="1486" height="686" alt="Image" src="https://github.com/user-attachments/assets/b683ff99-23a2-4688-84c0-2de865a38c0d" />

<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/3fb18347-8d1f-457c-901e-798973abf9fb" />


<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/c9e3feef-549a-4534-9288-cda2d4fb3ad1" />


<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/94762d8f-7c54-472d-a7c6-03cc8280e560" />

---

## 🚀 How to Use

### 🛠 Installation

To get started, you just need a browser.

1. Clone this repository and open it in your favourite IDE or terminal.
2. If Node.js is already installed, skip the next step.
3. Install [Node.js](https://nodejs.org/en/). npm will be installed automatically.
4. Run `npm install` in the terminal to install all dependencies.
5. Run `node server.js` to start the server locally on port 3000.
6. Visit `http://localhost:3000/` in your browser.
7. Press `Ctrl + C` in terminal to stop the server.

---

### 🧑‍💻 While Using the Application

1. Click **Sign Up** to register a new user.
2. Log in with your credentials.
3. Click the profile icon to upload a face image.
4. Choose the transaction type and fill in the transaction details.
5. Click **Next** to launch the camera and load ML models.
6. Click **Start Verification** to scan your face.
7. If verified, click **Pay**. A success screen will appear.
8. If not verified, the transaction is rejected.

---

## 💻 Technology Stack

- **Frontend:** HTML, CSS, Bootstrap  
- **Backend:** JavaScript, Node.js (Express)  
- **Database:** Firebase  
- **Machine Learning:** face-api.js

---

## 🤖 Machine Learning Models

### face-api.js  
A JavaScript API for face detection and recognition built on top of TensorFlow.js.

#### Face Detection  
Uses SSD Mobilenet V1 with 68-point facial landmark detection.

#### Face Recognition  
Implements a ResNet-34 architecture to create a unique 128-dimensional descriptor for each face.  
Faces are matched by calculating the Euclidean distance between descriptors.

---

## 🙋‍♂️ Author

**Made by Raj**  
📧 theillogicalraj@gmail.com
