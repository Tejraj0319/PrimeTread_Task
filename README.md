Primetrade.ai – Backend Developer Intern Assignment

This project is built as part of the **Backend Developer (Intern) – Project Assignment**. The goal is to design a **secure, scalable REST API** with **authentication, role-based access control (RBAC)**, and a **basic frontend UI** to demonstrate API functionality.



 Project Overview

The application provides:

* User authentication using **JWT**
* **Role-Based Access Control (USER / ADMIN)**
* CRUD operations on a secondary entity (**Tasks**)
* Secure API structure with validations and error handling
* A simple **React frontend** to test APIs visually



 Tech Stack

# Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* bcrypt for password hashing

# Frontend

* React.js (Vite)
* Axios for API calls
* Basic role-based UI rendering


# Authentication & Authorization

#Authentication

* User registration & login
* Passwords hashed using `bcrypt`
* JWT issued on successful login

### Authorization (RBAC)

| Action           | USER    | ADMIN |
| ---------------- | ------- | ----- |
| Register / Login | ✅       | ✅     |
| Create Task      | ✅       | ✅     |
| View Own Tasks   | ✅       | ✅     |
| View All Tasks   | ❌       | ✅     |
| Update Task      | ✅ (own) | ✅     |
| Delete Task      | ❌       | ✅     |

RBAC is enforced at backend middleware level and frontend UI level



 Project Structure

backend/
 ├─ src/
 │  ├─ modules/
 │  │  ├─ auth/
 │  │  └─ tasks/
 │  ├─ middlewares/
 │  ├─ routes/
 │  ├─ utils/
 │  └─ server.js
 └─ package.json

frontend/
 ├─ src/
 │  ├─ components/
 │  ├─ pages/
 │  ├─ services/
 │  └─ App.jsx
 └─ package.json




API Endpoints (v1)

 Auth Routes

* `POST /api/v1/auth/register`
* `POST /api/v1/auth/login`

### Task Routes

| Method | Endpoint   | Access                   |
| ------ | ---------- | ------------------------ |
| POST   | /tasks     | USER / ADMIN             |
| GET    | /tasks     | USER (own) / ADMIN (all) |
| GET    | /tasks/:id | Owner / ADMIN            |
| PUT    | /tasks/:id | Owner / ADMIN            |
| DELETE | /tasks/:id | ADMIN only               |



RBAC Testing Strategy

 Backend Testing (Postman)

* Login as USER → try deleting a task → **403 Forbidden**
* Login as ADMIN → delete task → **Success**
* USER token accessing admin-only route → **Blocked**

### Frontend Testing

* USER login:

  * Create & update task
  * Delete button hidden

* ADMIN login:

  * Delete button visible
  * Can delete any task

Even if a user manually sends a DELETE request, backend RBAC prevents unauthorized access.

Frontend Features

* Register & Login
* JWT-based protected dashboard
* Task CRUD operations
* Status update for tasks
* Error & success message handling
* Role-based UI rendering

Error Handling

* `401 Unauthorized` → Missing/invalid token
* `403 Forbidden` → Insufficient role
* `404 Not Found` → Invalid resource
* Centralized error handling middleware



How to Run the Project

Backend

```bash
cd backend
npm install
npm run start
```

# Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:5000
```

---

# Assignment Objectives Covered

JWT Authentication
Role-Based Access Control (RBAC)
Secure CRUD APIs
API versioning & validation
Frontend for API testing
Scalable project structure

 Future Improvements (Optional)

* Redis caching
* Dockerization
* Audit logs
* Admin dashboard analytics

 Author

Rajesh Ananta Patil
Full Stack Developer (Backend Focus)
