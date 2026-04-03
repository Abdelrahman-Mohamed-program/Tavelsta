# 🌍 Travel System (Full-Stack MERN Project)

A full-stack travel platform that allows users to explore destinations, make bookings, and manage their profiles, with an admin dashboard for managing users and tracking activity.

This project was built as part of a team project where I was the team leader and took full ownership of the backend.

---

## Features

### 👤 User Features
- Browse travel destinations  
- Book trips  
- Create and manage user profile  
- Update personal data and password  

### 🛠 Admin Features
- View and manage users  
- Block/unblock users  
- Track most booked destinations  

---

## My Contributions

### Backend (fully implemented by me)
- Designed and built RESTful API endpoints  
- Implemented JWT authentication (Access Tokens)  
- Role-based authorization (Admin/User)  
- Middleware for:
  - Token validation  
  - Admin access control  
  - Enforcing JSON requests  
- Mongoose validation (match, enum, custom validators)  
- Custom error handling (including Mongoose validation errors)  

### Frontend
- Built the **All Destinations page**  
- Integrated APIs across the application  
- Handled authentication state and admin dashboard behavior  

---

## Project Structure

/frontend   → React frontend  
/backend    → Node.js + Express backend  

---

##  Tech Stack

### Frontend
- React  
- Axios  
- (Tailwind / Bootstrap if you used any)

### Backend
- Node.js  
- Express.js  
- MongoDB (Mongoose)  

---

##  Authentication & Authorization

- JWT-based authentication (Access Tokens)  
- Role-based access control (Admin/User)  
- Protected routes using middleware  

---

##  Validation & Error Handling

- Schema validation using Mongoose  
- Custom validators  
- Centralized error handling middleware  
- Handling different error formats  

---

## 📡 API Highlights

- User authentication (login / signup)  
- Update user data  
- Change password  
- Admin actions (block users, manage data)  

---

##  Notes & Improvements

This was my first backend project, and I learned most of the concepts through self-learning and hands-on implementation.

Things I would improve now:
- Separate input validation from the database layer  
- Make validation middleware more reusable  
- Improve overall project structure  

---

## ▶️ Getting Started

### 1. Clone the repo
git clone <your-repo-link>

### 2. Setup Backend
cd backend  
npm install  
npm run dev  

### 3. Setup Frontend
cd frontend  
npm install  
npm start  

---

## Status

Completed as a learning project.  
Future improvements may include deployment and integration with real data sources.

---

## Team Project

This project was developed as part of a team collaboration.  
Each member contributed to different frontend parts, while I focused on backend development and leading the team.

---

## 📬 Contact
Linkedin: https://www.linkedin.com/in/abdelarahman-mohamed/?skipRedirect=true

Feel free to connect or reach out.