
//  BASICS 
// 1. STORE
localStorage.setItem("username", "lydiaa06karanja-art");

// 2. GET
const username = localStorage.getItem("username");
console.log("Saved username:", username); // "lydiaa06karanja-art"

// 3. REMOVE
localStorage.removeItem("tempUser");

// 4. CLEAR
// localStorage.clear(); 

// 5. CHECK IF EXISTS
if (localStorage.getItem("username")) {
  console.log("User exists in storage!");
}
//STORING OBJECTS 
const user = {
  name: "Regina Gathoni",
  username: "lydiaa06karanja-art",
};

// RIGHT - turn object into string
localStorage.setItem("user", JSON.stringify(user));

// GET IT BACK - turn string back into object
const retrievedUser = JSON.parse(localStorage.getItem("user"));
console.log("Retrieved user:", retrievedUser);

// HELPER FUNCTIONS 
function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key, defaultValue) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
}

function removeFromStorage(key) {
  localStorage.removeItem(key);
}

// USAGE
saveToStorage("settings", { theme: "dark", author: "Regina" });
const settings = getFromStorage("settings", {});
console.log("Settings:", settings);

//  BUILD: NOTES APP 
function addNote(note) {
  const notes = getFromStorage("notes", []);
  notes.push(note);
  saveToStorage("notes", notes);
}

function getNotes() {
  return getFromStorage("notes", []);
}

// Test the notes app 
addNote("Task 13.1: Local Storage Basics - Completed");
addNote("Exercise 1: setItem, getItem, removeItem tested");
addNote("Exercise 2: JSON.stringify and JSON.parse working");
addNote("Exercise 3: Helper functions created");
addNote("Build: Notes App saves data persistently");
addNote("Submitted by: Regina Gathoni - lydiaa06karanja-art");

console.log("All Notes:", getNotes());
//PERSISTENT TO-DO LIST 

// Load todos from storage
function loadTodos() {
  return getFromStorage("todos", []);
}

// Save todos
function saveTodos(todos) {
  saveToStorage("todos", todos);
}

// Add todo
function addTodo(text) {
  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false,
    createdAt: new Date().toISOString()
  };
  const todos = loadTodos();
  todos.push(newTodo);
  saveTodos(todos);
  renderTodos();
}

// Toggle todo
function toggleTodo(id) {
  const todos = loadTodos();
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos(todos);
    renderTodos();
  }
}

// Delete todo
function deleteTodo(id) {
  let todos = loadTodos();
  todos = todos.filter(t => t.id !== id);
  saveTodos(todos);
  renderTodos();
}

// Render todos
function renderTodos() {
  const todos = loadTodos();
  const todoList = document.getElementById("todoList");
  if (!todoList) return;
  
  todoList.innerHTML = "";
  todos.forEach(todo => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">
        ${todo.text}
      </span>
      <button onclick="toggleTodo(${todo.id})">✓</button>
      <button onclick="deleteTodo(${todo.id})">X</button>
    `;
    todoList.appendChild(li);
  });
}

// Handle add button
function handleAdd() {
  const input = document.getElementById("todoInput");
  if (input.value.trim() !== "") {
    addTodo(input.value);
    input.value = "";
  }
}

// Load when page opens
document.addEventListener("DOMContentLoaded", () => {
  renderTodos();
});
