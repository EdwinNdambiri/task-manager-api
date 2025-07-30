const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskList = document.getElementById("taskList");

const API = "/tasks";

async function fetchTasks() {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const tasks = await res.json();
    renderTasks(tasks);
  } catch (error) {
    console.error("Failed to fetch tasks ", error.message);
    alert("Failed to load tasks. Please try again!");
  }
}

function renderTasks(tasks) {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
    ${task.title}
    <span>
        <button onclick="toggleComplete(${task.id}, ${task.completed})">Completed</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
    </span>
    `;
    taskList.appendChild(li);
  });
}

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = taskTitle.value.trim();
  if (!title) return;

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    taskTitle.value = "";
    fetchTasks();
  } catch (error) {
    console.error("Failed to add task:", error.message);
    alert("Failed to add task. Please try again.");
  }
});

// Toggle complete
async function toggleComplete(id, completed) {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });

    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    fetchTasks();
  } catch (error) {
    console.error("Failed to toggle task:", error.message);
    alert("Failed to update task. Please try again.");
  }
}

// Delete tasks
async function deleteTask(id) {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    fetchTasks();
  } catch (error) {
    console.error("Failed to delete task:", error.message);
    alert("Failed to delete task. Please try again.");
  }
}

// Initial load
fetchTasks();
