# Backend — Todo App (Express + MongoDB)

A REST API backend for the fullstack Todo application built with Node.js, Express, and Mongoose.

## Tech Stack

- **Node.js** — runtime
- **Express 5** — web framework
- **Mongoose** — MongoDB ODM
- **dotenv** — environment variable management
- **cors** — cross-origin request support
- **nodemon** — auto-restart during development

## Project Structure

```
server/
├── models/
│   └── Todo.js          # Mongoose schema (title, description, done, timestamps)
├── routes/
│   └── todoRoutes.js    # All /api/todos route handlers
├── index.js             # App entry point — Express setup, DB connect, server start
├── .env                 # Environment variables (not committed to git)
└── package.json
```

## Setup & Running

### Prerequisites

- Node.js 18+
- MongoDB running locally **or** a MongoDB Atlas connection string

### 1. Install dependencies

```bash
cd server
npm install
```

### 2. Create the `.env` file

Create a file named `.env` inside the `server/` folder:

```env
# Local MongoDB
MONGODB_URI=mongodb://127.0.0.1:27017/todo-app

# OR MongoDB Atlas
# MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority

PORT=5000
```

> **Important:** Never commit `.env` to version control. It is already listed in `.gitignore`.

### 3. Start the server

```bash
# Development (auto-restarts on file changes)
npm run dev

# Production
npm start
```

The server will run at `http://localhost:5000`.

### Run from root (both frontend + backend together)

```bash
# from the project root
npm run dev
```

## API Endpoints

| Method | Endpoint                  | Description                        | Status Codes     |
|--------|---------------------------|------------------------------------|------------------|
| GET    | `/api/todos`              | Get all todos (newest first)       | 200              |
| POST   | `/api/todos`              | Create a new todo                  | 201, 400         |
| PUT    | `/api/todos/:id`          | Update title and description       | 200, 400, 404    |
| PATCH  | `/api/todos/:id/done`     | Toggle the `done` status           | 200, 404         |
| DELETE | `/api/todos/:id`          | Delete a todo                      | 200, 404         |

### Example request body (POST / PUT)

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

## MongoDB Connection Notes

### Local MongoDB

- Install [MongoDB Community Edition](https://www.mongodb.com/try/download/community) for Windows.
- Ensure the `MongoDB` service is running:
  ```powershell
  Get-Service -Name MongoDB
  Start-Service -Name MongoDB
  ```
- Use `127.0.0.1` instead of `localhost` in the URI to avoid IPv6 resolution issues on Windows.

### MongoDB Atlas (Cloud)

1. Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Whitelist your IP address under **Network Access**
3. Create a database user under **Database Access**
4. Copy the connection string and paste it as `MONGODB_URI` in your `.env` file

## Assumptions & Limitations

- No authentication — all todos are publicly accessible. For production, add JWT or session-based auth.
- The `title` field is required. Requests without it return a `400` error.
- MongoDB connection uses `serverSelectionTimeoutMS: 5000` — the server will exit with an error if it cannot connect within 5 seconds, making misconfiguration easy to spot.
- The server only starts listening for requests **after** a successful database connection, preventing buffering timeout errors.
- No rate limiting or input sanitization beyond Mongoose schema validation. Not production-hardened.
