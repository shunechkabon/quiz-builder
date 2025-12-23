# 🧠 Quiz Builder

Full-stack application for creating and viewing quizzes.
Users can create quizzes with different question types and browse them in a read-only mode.

---

## 🛠 Tech Stack

### Frontend

- ⚛️ React
- ⚡ Vite
- 🟦 TypeScript
- 📋 React Hook Form

### Backend

- 🟢 Node.js
- 🟦 TypeScript
- 🚀 Express

### Database

- 🗄 Prisma
- 💾 SQLite

---

## 📁 Project Structure

```sh
quiz-builder/
├── backend/
└── frontend/
```

---

## ✅ Requirements

- Node.js (LTS recommended)
- npm

---

## 🔧 Backend Setup

1. Install dependencies

```sh
cd backend
npm install
```

2. Environment variables

Create a .env file in the backend directory.

SQLite example:

```sh
DATABASE_URL="file:./dev.db"
```

3. Database setup (Prisma)

Generate Prisma client:

```sh
npx prisma generate
```

Apply database migrations:

```sh
npx prisma migrate dev
```

(Optional) Open Prisma Studio:

```sh
npx prisma studio
```

4. Run backend

```sh
npm run dev
```

Backend runs on:
http://localhost:3001

## 🎨 Frontend Setup

1. Install dependencies

```sh
cd frontend
npm install
```

2. Run frontend

```sh
npm run dev
```

Frontend runs on:
http://localhost:5173

---

## 🔄 API & Proxy Configuration

The frontend uses a Vite proxy to forward API requests to the backend.
This avoids CORS issues and prevents routing conflicts when refreshing pages like /quizzes/:id.

Example vite.config.ts configuration (structure only):

server:
proxy:
/api:
target: http://localhost:3001

changeOrigin: true
rewrite: remove /api prefix

---

## Backend API endpoints

- POST /quizzes — Create a new quiz
- GET /quizzes — Get list of quizzes with question count
- GET /quizzes/:id — Get quiz details
- DELETE /quizzes/:id — Delete a quiz

---

## 📄 Pages

- /create — Create a new quiz
- /quizzes — List of all quizzes
- /quizzes/:id — Quiz details (read-only)

---

## 🧪 Create a Sample Quiz

1. Open http://localhost:5173/create
2. Enter a quiz title
3. Add questions (Boolean / Input / Checkbox)
4. Click Create quiz
5. Open the quiz list at http://localhost:5173/quizzes

---

## 📝 Notes

- Quiz detail page is read-only (no quiz solving functionality)
- Frontend and backend routes are separated to avoid conflicts
- The project follows the requirements from the test assignment

**✨ Happy coding!**
