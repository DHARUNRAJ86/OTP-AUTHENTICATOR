# 🔐 OTP Authenticator – Secure Authentication System

<p align="center">
  🚀 A secure OTP-based authentication system built with modern full-stack technologies  
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react">
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js">
  <img src="https://img.shields.io/badge/Database-MongoDB-darkgreen?style=for-the-badge&logo=mongodb">
  <img src="https://img.shields.io/badge/Auth-OTP-orange?style=for-the-badge">
  <img src="https://img.shields.io/badge/Security-JWT-red?style=for-the-badge&logo=jsonwebtokens">
</p>

---

## 🌟 Project Overview

**OTP Authenticator** is a secure user authentication system that uses **One-Time Passwords (OTP)** for verifying users.

It ensures enhanced security by validating users through time-sensitive OTPs, making it suitable for modern applications requiring secure login and verification flows.

This project demonstrates:
✔ Secure authentication workflows
✔ Backend API design
✔ OTP generation & validation
✔ Full-stack integration
✔ Real-world authentication use cases

---

## ✨ Key Highlights

🔐 OTP-based user verification system
📩 Email-based OTP delivery (or configurable service)
⏳ Time-limited OTP expiration
🔄 Resend OTP functionality
🛡️ Secure password handling (bcrypt)
🔑 JWT-based authentication (optional session handling)
⚡ Clean and scalable backend architecture

---

## 🛠️ Tech Stack

### 🎨 Frontend

* React.js
* Tailwind CSS
* Axios

### ⚙️ Backend

* Node.js
* Express.js

### 🗄️ Database

* MongoDB (Mongoose)

### 🔌 Other Integrations

* Nodemailer / Email Service (OTP delivery)
* JWT (Authentication)
* bcrypt (Password hashing)

---

## 🧠 System Architecture

```id="otp-arch"
User → Request OTP  
        │  
        ▼  
Server generates OTP  
        │  
        ▼  
OTP sent via Email/SMS  
        │  
        ▼  
User enters OTP  
        │  
        ▼  
Server verifies OTP → Authenticated  
```

---

## 📂 Folder Structure

```id="otp-struct"
OTP-AUTHENTICATOR/
│── frontend/           # React Application
│── backend/            # Express Server
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the backend:

```id="otp-env"
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone Repository

```bash id="otp-clone"
git clone https://github.com/DHARUNRAJ86/OTP-AUTHENTICATOR.git
cd OTP-AUTHENTICATOR
```

---

### 2️⃣ Backend Setup

```bash id="otp-backend"
cd backend
npm install
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash id="otp-frontend"
cd frontend
npm install
npm run dev
```

---

## 🚀 Core Functionalities

✔ User Registration
✔ OTP Generation & Verification
✔ Email OTP Delivery
✔ OTP Expiration Handling
✔ Secure Login System
✔ Protected Routes

---

## 📡 API Endpoints (Sample)

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | /api/auth/register   | Register user |
| POST   | /api/auth/send-otp   | Send OTP      |
| POST   | /api/auth/verify-otp | Verify OTP    |
| POST   | /api/auth/login      | Login user    |

---

---

## 🎯 Challenges Faced

* Implementing secure OTP generation and expiration logic
* Handling email delivery reliability
* Preventing OTP misuse (rate limiting, expiry)
* Managing authentication state securely

---

## 🔮 Future Improvements

📱 SMS OTP Integration
🌐 Deployment (Render / Vercel)
🔐 Two-Factor Authentication (2FA)
📊 Admin dashboard for monitoring
🤖 AI-based fraud detection

---

## 🤝 Contributing

Contributions are welcome!

```id="otp-contri"
1. Fork the repository  
2. Create a new branch  
3. Commit your changes  
4. Push and open a Pull Request  
```

---

## 📄 License

This project is licensed under the **MIT License**

---

## 👨‍💻 Author

**Dharun Raj P**
💼 Full Stack Developer (MERN)
📍 Passionate about building secure applications

---

## 🌟 Show Your Support

If you like this project:
⭐ Star the repository
🍴 Fork it
📢 Share it

---

<p align="center">
  Made with ❤️ by Dharun Raj
</p>
