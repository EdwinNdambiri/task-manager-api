# 📝 Task Manager API

A simple full-stack Task Manager built with **Express.js** on the backend and plain **HTML/CSS/JS** on the frontend. Tasks are stored in a local `tasks.json` file.

---

## 🚀 Features

- View all tasks
- Add new tasks
- Mark tasks as completed
- Delete tasks
- JSON file-based persistence (no database needed)
- Clean, user-friendly frontend interface

---

## 📁 Project Structure

task-manager-api/
├── index.js # Express server
├── tasks.json # Auto-created task data file (git-ignored)
├── public/ # Frontend assets
│ ├── index.html
│ ├── script.js
│ └── style.css
└── .gitignore # Ignore node_modules and tasks.json

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/edwinndambiri/task-manager-api.git
cd task-manager-api
```

2. Install Dependencies
   npm install

3. Start the Server
   node index.js

Then open your browser and go to:
http://localhost:3000
