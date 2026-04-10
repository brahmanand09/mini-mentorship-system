# 🚀 Sarthi Mentorship Evaluation System

A full-stack **Mentorship Evaluation Platform** where mentors can review students, students can track progress, and AI generates smart summaries from feedback.

---

## 📌 Features

### 👨‍🏫 Mentor

* View all students
* Add new students
* Submit reviews for students
* AI-generated summary of reviews

### 🎓 Student

* View personal progress
* See latest mentor reviews
* View AI-generated feedback summary

### 🤖 AI Integration

* Converts long feedback into **3 actionable bullet points**
* Uses **Google Gemini API**

---

## 🛠️ Tech Stack

### Frontend

* React + TypeScript
* React Router
* React Query
* Axios

### Backend

* Node.js + Express
* MongoDB + Mongoose
* JWT Authentication
* Express Validator

### AI

* Google Gemini (`@google/genai`)

---

## 📂 Project Structure

```
client/
 ├── src/
 │   ├── api/
 │   ├── components/
 │   ├── hooks/
 │   ├── pages/
 │   └── App.tsx

server/
 ├── src/
 │   ├── config/
 │   ├── controllers/
 │   ├── middlewares/
 │   ├── models/
 │   ├── routes/
 │   ├── services/
 │   └── utils/
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/brahmanand09/mini-mentorship-system.git
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
GOOGLE_API_KEY=your_gemini_key
PORT=5000
```

Run server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Authentication

* JWT-based authentication
* Role-based access:

  * `mentor`
  * `student`

---

## 📡 API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Students

* `GET /api/students`
* `POST /api/students`

### Reviews

* `POST /api/reviews`
* `GET /api/reviews/:studentId`

### AI

* `POST /api/ai/summarize`

---

## 🧹 Data Cleaning Strategy

Handled messy dataset as per assignment:

* ✅ Removed duplicate students using **Map (by ID)**
* ✅ Standardized date formats → converted to JS Date
* ✅ Removed unnecessary fields (`meta.unusedField`)
* ✅ Normalized emails → lowercase
* ✅ Trimmed name fields

### Why?

* Avoid duplicate entries
* Improve consistency
* Better scalability
* Clean API response

---

## 🧠 AI Feature

* Converts long feedback into:

  * 3 short actionable bullet points
* Uses **Gemini Flash Model**
* Fallback summary if API fails

---

## 🖥️ Pages

* `/` → Login
* `/signup` → Register
* `/dashboard` → Role-based dashboard
* `/add-student` → Add student (mentor only)
* `/ai-summary` → AI tool
* `/mentorship-program` → Public form page

---

## 🔄 Code Refactor (Phase 5)

### Before:

```js
if (user.role == 'admin') {
  if (data.length > 0) {
    data.map(item => {
      if (item.status == 'active') {
        // logic
      }
    })
  }
}
```

### After:

```ts
export const processData = (user: any, data: any[]) => {
  if (user.role !== "admin") return [];

  return data
    .filter(item => item.status === "active")
    .map(item => item);
};
```

---

## 🏗️ System Design (Phase 6)

### Flow:

```
User Form → Backend → DB (Students)
Mentor → Submit Review → AI → DB (Reviews)
Student → Dashboard → View Reviews
```

### Architecture:

* Frontend → React SPA
* Backend → Express API
* Database → MongoDB
* AI → Gemini API

---

## ⚠️ Error Handling

* Centralized error handler middleware
* Frontend error UI (`ErrorBox`)
* Loading states (`Loader`)

---

## 🔒 Security

* JWT authentication
* Protected routes
* Role-based middleware
* Input validation (express-validator)

---

## 📸 Demo (Optional)

👉 Add your demo video or screenshots here

---

## 📦 Future Improvements

* Pagination & search
* Notifications system
* Admin panel
* Analytics dashboard

---

## ⭐ Give a Star

If you like this project, give it a ⭐ on GitHub!
