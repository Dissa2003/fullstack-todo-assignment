# Frontend — Todo App (React + Vite)

A React frontend for the fullstack Todo application. Communicates with the Express/MongoDB backend via REST API.

## Tech Stack

- **React 19** — UI library
- **Vite** — dev server and bundler
- **Axios** — HTTP client for API calls
- **Lucide React** — icon library

## Project Structure

```
src/
├── api/
│   └── todoApi.js        # All axios API calls
├── components/
│   ├── TodoForm.jsx       # Add new todo (title + optional description)
│   ├── TodoItem.jsx       # Single todo row with inline edit, toggle, delete
│   └── TodoList.jsx       # Filter tabs (All/Active/Done) + todo list
├── hooks/
│   └── useTodos.js        # State management and API integration
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Setup & Running

### Prerequisites

- Node.js 18+
- The backend server must be running on `http://localhost:5000` (see `../server/README.md`)

### Install dependencies

```bash
cd client
npm install
```

### Start development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

Output is in `client/dist/`.

### Run from root (both frontend + backend together)

```bash
# from the project root
npm run dev
```

This uses `concurrently` to start both servers at once.

## Features

- Add todos with a title and optional description
- Inline editing — click the pencil icon to edit in place
- Toggle done/undone per task
- Delete tasks
- Filter by **All**, **Active**, or **Done**
- Live task counter
- Relative timestamps (`2m ago`, `1h ago`)
- Dark mode support (follows system preference)

## Assumptions & Limitations

- The API base URL is hardcoded to `http://localhost:5000/api/todos` in `src/api/todoApi.js`. For production, this should be set via an environment variable (e.g., `VITE_API_URL`).
- No authentication — all todos are shared/public.
- No pagination — all todos are loaded at once. Performance may degrade with very large datasets.
- No offline support or optimistic UI updates — every action re-fetches from the server.
- Tested on modern browsers (Chrome, Firefox, Edge). IE is not supported.

