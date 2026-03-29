
---

```md
# 🎓 Teachify

> A full-stack platform that connects learners with expert tutors for seamless online booking and learning.


## 🧠 Project Overview

**Teachify** is a full-stack web application that connects students with qualified tutors.

- Students can explore tutor profiles, check availability, and book sessions instantly.
- Tutors can manage their profiles, set availability, and track their sessions.
- Admins can monitor and manage the entire platform.

---

## ✨ Features

### 👨‍🎓 Student
- Browse tutor profiles
- Book tutoring sessions
- Leave reviews and ratings
- Manage personal profile

### 👩‍🏫 Tutor
- Create and manage tutor profile
- Set availability
- View and manage bookings
- Manage subjects and expertise

### 🛠️ Admin
- Manage all users (students & tutors)
- Monitor platform activity
- Moderate content
- Access analytics 

---

## 🛠️ Tech Stack

### Frontend
- Next.js 16
- Tailwind CSS v4
- Shadcn UI
- TanStack Query
- Axios

### Backend
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL

---



## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/teachify.git
cd teachify
````

---

### 2️⃣ Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

### 3️⃣ Setup Backend

```bash
cd server
npm install
```

Create a `.env` file and add:

```env
DATABASE_URL=your_postgresql_database_url
PORT=5000
```

Run the server:

```bash
npm run dev
```

---

## 🌐 API Overview

* `GET /tutors` → Fetch all tutors
* `POST /bookings` → Create a booking
* `GET /users` → Get all users (Admin)
* `PATCH /profile` → Update user profile

---

## 📌 Usage

1. Sign up as Student or Tutor
2. Browse or create tutor profiles
3. Book sessions or manage availability
4. Admin manages the platform

---

## 🚧 Future Improvements

* Payment integration 💳
* Real-time chat between student & tutor 💬
* Notification system 🔔
* Advanced filtering & search 🔍

---


