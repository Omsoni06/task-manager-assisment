#  Task Manager API

A RESTful API built using Node.js, Express, TypeScript, and MongoDB to manage tasks with filtering, sorting, and pagination.

---

##  Tech Stack

- Node.js
- Express.js
- TypeScript (strict mode)
- MongoDB (Mongoose)
- dotenv

---

## Project Structure


src/
config/
controllers/
models/
routes/
middleware/
utils/
app.ts


---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-link>
cd task-manager
2. Install dependencies
npm install
3. Create .env file
PORT=5000
MONGO_URI=your_mongodb_connection_string
4. Run the server
npm run dev
📌 API Endpoints
🔹 Create Task

POST /api/tasks

Request Body:
{
  "title": "Learn Node",
  "description": "Practice backend",
  "status": "todo",
  "priority": "medium",
  "dueDate": "2026-01-01",
  "tags": ["backend"]
}
🔹 Get All Tasks

GET /api/tasks

Query Parameters:
status=todo
priority=high
tags=backend
dueBefore=2026-12-31
sortBy=createdAt
order=desc
page=1
limit=10
Example:
/api/tasks?status=todo&priority=high&page=1&limit=5
🔹 Get Task by ID

GET /api/tasks/:id

🔹 Update Task

PATCH /api/tasks/:id

Example Body:
{
  "status": "done"
}
🔹 Delete Task

DELETE /api/tasks/:id

📦 Response Format
✅ Success
{
  "success": true,
  "data": {}
}
❌ Error
{
  "success": false,
  "message": "Error message",
  "errors": []
}
⚙️ Features
CRUD operations
Filtering (status, priority, tags, due date)
Sorting & pagination
Manual validation (no external libraries)
Global error handling
Clean folder structure
MongoDB indexing
⚡ Indexing

Indexes added on:

status
createdAt

This improves filtering and sorting performance.

📌 Notes
.lean() is used for better performance
Proper HTTP status codes are returned
Validation is handled manually as required
🧪 Testing

You can test APIs using:

Postman
Thunder Client (VS Code)
👨‍💻 Author

Om Soni
