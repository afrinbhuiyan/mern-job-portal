# 🚀 MERN Job Portal

A full-stack job management application where users can **register, login, and manage jobs** (CRUD).  
This project is built with **MongoDB, Express.js, React, and Node.js**.

---

## 🔗 Live Links
- **Frontend:** https://mernjobportalclient.vercel.app/
  
---

## ✨ Features
- 🔐 User authentication with **JWT**
- 👤 Users can **create, update, delete, and view** their own jobs
- 🏢 Job fields:
  - Title
  - Company
  - Location
  - Description
  - Price / Salary
  - Remote / Onsite / Hybrid
  - Technologies (multiple)
  - CreatedAt timestamp
- 🎨 Modern responsive UI with **React + TailwindCSS + Framer Motion**
- ⚡ State management with **Context API**

---

## 🛠️ Tech Stack
**Frontend**
- React.js
- React Router
- TailwindCSS
- Framer Motion
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB (Native Driver)
- JWT Authentication
- dotenv

---

## 📂 Project Structure
```
mern-job-portal/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Header, SearchBar, etc.
│   │   ├── pages/       # MyJobs, Login, Register
│   │   ├── context/     # AuthContext
│   │   └── api/         # jobs.js (Axios calls)
│   └── package.json
│
├── server/              # Express backend
│   ├── config/          # db.js (Mongo connection)
│   ├── controllers/     # jobController.js, authController.js
│   ├── middleware/      # auth.js
│   ├── models/          # Job.js, User.js
│   ├── routes/          # jobRoutes.js, authRoutes.js
│   ├── index.js         # App entry point
│   └── package.json
│
├── .env                 # Environment variables
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/mern-job-portal.git
cd mern-job-portal
```

### 2️⃣ Setup Backend
```bash
cd server
npm install
```

Create a `.env` file:
```
MONGO_URI=mongodb+srv://<your_mongo_uri>
JWT_SECRET=your_jwt_secret
PORT=5000
```

Run backend:
```bash
npm run dev
```

### 3️⃣ Setup Frontend
```bash
cd ../client
npm install
npm run dev
```

---

## 🔑 API Endpoints

### Auth
- `POST /api/auth/register` → Register new user  
- `POST /api/auth/login` → Login user  

### Jobs (Protected by JWT)
- `POST /api/jobs` → Create job  
- `GET /api/jobs` → Get logged-in user's jobs  
- `PUT /api/jobs/:id` → Update job  
- `DELETE /api/jobs/:id` → Delete job  

---

## 📸 Screenshots
(Add screenshots of UI later)

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first.

---

## 📜 License
MIT License © 2025

