# 💳 FaceSePay – A Secure Way to Pay with Your Face

**FaceSePay** is a smart payment system where your **face is the key**.  
Instead of passwords or OTPs, the system uses your **live webcam** to verify your identity before allowing transactions.

---

## 🎯 What Does This Project Do?

- Sends money using wallet or bank transfer
- Confirms user identity with **face recognition**
- Blocks fraud or fake users
- Fully browser-based, no app needed

---

## 🔁 Step-by-Step Flow with Screenshots

---

### 🏠 1. Home Page  
[Home]<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/42cf4cd6-b17a-4604-b860-1f2c2b339a1d" />


This is the welcome screen.  
Users can click:
- 🔐 Login  
- 📝 Sign Up

Simple and clean UI.

---

### 📝 2. Sign Up Page  
[Sign Up]<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/66120ba6-8fa3-4700-9d2c-b2e46bb706b9" />


New users register by entering:
- Name  
- Email  
- Phone  
- Password

Their data is saved in **Firebase**, and they can then log in.

---

### 🔐 3. Login Page  
[Login]<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/a556dd4b-523e-4bac-99a3-14a8f261652a" />


Registered users enter their **email and password**.  
Successful login leads to the **profile page**.

---

### 🖼️ 4a. Upload Face  

User uploads a clear photo of their face.  
This is saved as the reference image for future verification.

---

### 👤 4b. Profile Page  
[Profile]<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/a79663ce-b3a0-4336-a152-f1ea01d6f551" />


This is the user's dashboard:
- Shows Name, Email, FaceSePay ID  
- Option to **upload face photo** for verification

This uploaded photo is later used for live face matching.


---

### 💸 5. Transfer Money  
[Transfer]<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/d71289a2-a459-4c4d-a67b-182646190294" />


User chooses:
- **Wallet transfer** (via FaceSePay ID or phone)
- **Bank transfer** (account number + IFSC)

They enter amount + receiver details.  
➡️ Before confirming, face verification is required.

---

### 📷 6. Live Face Verification  
[Verification]<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/428720e5-8c9f-43e9-8bea-66e7587d5ddb" />

Before the final payment step, the webcam turns on.  
It compares the live face with the uploaded photo using **ML model**.

If match = proceed  
If not = block

---


### ✅ 7. Transaction Success (Face Matched)  
[Transaction Success]<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/96f4c103-2833-4ab5-957c-92d7b246abda" />

If the face is verified correctly:  
- Payment is processed ✅  
- A success screen is shown with green tick

---


### ❌ 9. Face Mismatch – Transaction Blocked  
🚧 *(To be added by you later)*

If the person in front of the camera does not match the uploaded photo:  
- Transaction is blocked  
- User sees a red warning screen

---

## 🤖 How Face Recognition Works

- Uses **face-api.js** + **TensorFlow.js**
- Live face is converted into a 128-number vector (face descriptor)
- Compared with stored image
- Matching is done using **Euclidean distance**
  - ✅ Match → allow payment  
  - ❌ Not match → block

---

## 💻 Technologies Used

| Area          | Technology              |
|---------------|--------------------------|
| Frontend      | HTML, CSS, Bootstrap     |
| Backend       | Node.js + Express        |
| Authentication| face-api.js (TensorFlow.js) |
| Database      | Firebase                 |
| ML Model      | ResNet-34 + SSD MobileNet |

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

**Made by Rajeev**  
📧 theillogicalraj@gmail.com
