# Fullstack Todo App

A fullstack monorepo Todo application with a React frontend and an Express/MongoDB backend, managed with **npm workspaces**.

## Monorepo Structure

```
fullstack-todo-assignment/
├── client/          # React + Vite frontend
├── server/          # Express + MongoDB backend
├── package.json     # Root workspace config + concurrently scripts
└── .gitignore
```

Each workspace has its own `package.json`, `README.md`, and `node_modules` are hoisted to the root.

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 19, Vite, Axios, Lucide React |
| Backend  | Node.js, Express 5, Mongoose        |
| Database | MongoDB (local or Atlas)            |
| Tooling  | npm workspaces, concurrently        |

## Prerequisites

- **Node.js** 18+
- **npm** 8+ (workspaces support)
- **MongoDB** running locally on port `27017` — or a MongoDB Atlas connection string

## Quick Start

### 1. Clone and install all dependencies

```bash
git clone <repo-url>
cd fullstack-todo-assignment
npm install
```

This installs dependencies for both `client` and `server` in one command.

### 2. Configure the backend environment

Create `server/.env`:

```env
# Local MongoDB
MONGODB_URI=mongodb://127.0.0.1:27017/todo-app

# OR MongoDB Atlas
# MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority

PORT=5000
```

### 3. Run both frontend and backend together

```bash
npm run dev
```

| Service  | URL                     |
|----------|-------------------------|
| Frontend | http://localhost:5173   |
| Backend  | http://localhost:5000   |

Output is color-coded: **cyan** = client, **yellow** = server.

## Available Root Scripts

| Script          | Description                                      |
|-----------------|--------------------------------------------------|
| `npm run dev`   | Runs client (Vite) + server (nodemon) together   |
| `npm start`     | Runs client (Vite) + server (node) together      |
| `npm install`   | Installs all workspace dependencies              |

## Running Workspaces Individually

```bash
# Frontend only
npm run dev --workspace=client

# Backend only
npm run dev --workspace=server
```

## Further Documentation

- [client/README.md](client/README.md) — Frontend setup, features, assumptions
- [server/README.md](server/README.md) — Backend setup, API reference, MongoDB notes
