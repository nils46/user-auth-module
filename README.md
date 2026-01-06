# User Authentication Module

## 📌 Project Overview
This project implements a **User Authentication Module** using Node.js and MongoDB.  
It supports secure user registration, login, profile management, and password updates through a **browser-based interface**.

The application follows best practices for authentication, security, and code organization.

---

## 🔧 Tech Stack Used

- **Programming Language:** JavaScript
- **Backend Framework:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication Type:** Session-based authentication
- **Password Security:** bcrypt (password hashing)
- **Frontend:** HTML, CSS (no external UI framework)

---

## ✨ Features Implemented

### 🔹 User Registration
- Collects detailed user information (name, email, phone, age, gender, address)
- Password is securely hashed using bcrypt before storage
- Automatically logs in the user after registration

### 🔹 User Login
- Email and password-based authentication
- Secure password verification using bcrypt
- Session is created upon successful login

### 🔹 View Profile
- Displays user profile details
- Accessible only after login
- Sensitive data (password) is never exposed

### 🔹 Edit & Update Profile
- Separate Edit Profile module
- Allows updating name, phone, age, gender, and address
- Accessible only after authentication

### 🔹 Change Password
- Requires old password verification
- New password is hashed before saving
- Implemented as a separate module/page

### 🔹 Logout
- Destroys user session
- Redirects back to home page

---

## 🔐 Security Measures

- Passwords are **never stored in plain text**
- bcrypt is used for hashing passwords
- Old password verification required before password change
- Session-based route protection using middleware
- Environment variables used for configuration
- Sensitive data is never sent to the client

---

## Project Structure
{
user-auth-module/

── controllers/authController.js

── middleware/authSession.js

── models/ User.js

── routes/ authRoutes.js

── public/
 index.html
 register.html
 login.html
 profile.html
 edit-profile.html
 change-password.html
 css/style.css

── config/ db.js

── server.js
── .env
── .gitignore
── README.md
}


---

##How to Run the Project

{
```terminal
npm install


## Create .env File

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/authdb

```terminal 
npx nodemon server.js

## open browser 
http://localhost:5000/
}




Authentication Approach
-Session-based authentication using express-session

-Suitable for browser-based applications

-Profile and update routes are protected via middleware

-Password handling implemented using bcrypt hashing