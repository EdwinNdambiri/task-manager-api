const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.use(express.json());
const DATA_FILE = path.join(__dirname, "tasks.json");

function readTasks() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw new Error(`Failed to read tasks: ${error.message}`);
  }
}

function writeTasks(tasks) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
  } catch (error) {
    throw new Error(`Failed to write tasks: ${error.message}`);
  }
}

let tasks = readTasks();

app.get("/", (req, res) => {
  res.sendFile();
});

// GET all the tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// GET a specific task
app.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  res.json(task);
});

// POST a task
app.post("/tasks", (req, res) => {
  // Get the next ID
  const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  const { title, completed } = req.body;
  const newTask = { id: nextId, title, completed: completed || false };

  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

// PUT update a task
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: "Task not found" });
  const { title, completed } = req.body;
  if (title != undefined) task.title = title;
  if (completed != undefined) task.completed = true;

  writeTasks(tasks);
  res.json(task);
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter((t) => t.id !== parseInt(req.params.id));

  writeTasks(tasks);
  res.json({ message: "Task deleted" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
