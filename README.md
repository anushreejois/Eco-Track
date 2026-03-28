# 🌱 Eco-Track

Eco-Track is a full-stack web application that encourages users to adopt eco-friendly habits by logging daily sustainable actions, earning XP, tracking environmental impact, and competing on leaderboards. The platform uses gamification to make sustainability engaging and measurable.

---

##  Live Demo

* 🌐 Frontend: https://eco-track-lilac.vercel.app
* ⚙️ Backend API: https://eco-track-dsej.onrender.com

---

##  Key Features

###  Authentication

* Secure user registration and login using JWT
* Token-based authorization for protected routes
* Persistent sessions using localStorage

###  Eco Action Logging

* Users can log eco-friendly activities (e.g., planting trees, saving water)
* Each action contributes to environmental impact tracking
* Real-time XP gain on each action

### Gamification System

* XP-based leveling system
* Badge unlocking based on milestones
* Motivates users to stay consistent

### 📊 Dashboard & Insights

* Track total environmental impact
* View history of actions
* Personalized user statistics

###  Leaderboard

* Global ranking based on XP
* Encourages friendly competition

###  UI/UX

* Clean and responsive design
* Dark mode support 🌙
* Toast notifications for feedback

---

## Tech Stack

### 🔹 Frontend

* React.js
* Axios (API calls)
* React Router DOM
* Tailwind CSS
* React Toastify

### 🔹 Backend

* Node.js
* Express.js
* JWT (Authentication)
* bcrypt.js (Password hashing)

### 🔹 Database

* PostgreSQL (Supabase)

### 🔹 Deployment

* Frontend: Vercel
* Backend: Render
* Database: Supabase

---

## ⚙️ Architecture

```
Eco-Track/
├── client/   → React frontend (Vercel)
├── server/   → Node/Express backend (Render)
└── database  → Supabase PostgreSQL
```



## 🚧 Challenges Faced

* 🔥 Handling CORS issues between frontend and backend
* 🌐 Fixing IPv6 connection errors with Supabase (used connection pooler)
* 🔐 Managing JWT authentication and token expiry
* 🚀 Deploying full-stack app across multiple platforms (Vercel + Render)

---

## 📈 Future Improvements

* Add real-time analytics with charts
* Implement refresh tokens for better auth handling
* Add social features (friends, sharing achievements)
* Mobile responsiveness improvements

---

## 👩‍💻 Author

* **ANUSHREE HS JOIS**
* GitHub: https://github.com/anushreejois

---

## ⭐ Conclusion

Eco-Track demonstrates a complete full-stack application with real-world deployment, authentication, database integration, and gamification. It highlights problem-solving across frontend, backend, and infrastructure.

---
