
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
//SESSION STORAGE 
const sessionForm = document.getElementById("sessionForm");
if(sessionForm){
  const sessionInputs = sessionForm.querySelectorAll("input");

  // Load saved values on page load
  sessionInputs.forEach(input => {
    const saved = sessionStorage.getItem(`session_${input.name}`);
    if (saved) input.value = saved;

    // Save on every input
    input.addEventListener("input", () => {
      sessionStorage.setItem(`session_${input.name}`, input.value);
    });
  });

  // Clear on submit
  sessionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sessionInputs.forEach(input => {
      sessionStorage.removeItem(`session_${input.name}`);
    });
    alert("Submitted! Session data cleared.");
    sessionForm.reset();
  });
}

// CENTRALIZED STATE
const state = {
  todos: [],
  filter: "all",
  theme: "light"
};

// Main update function 
function setState(updates) {
  Object.assign(state, updates);
  saveState();
  render(); 
}

// Helper functions
function setFilter(filter) {
  setState({ filter });
}

function addTodo(text) {
  setState({
    todos: [...state.todos, { id: Date.now(), text, completed: false }]
  });
}

function toggleTodo(id) {
  setState({
    todos: state.todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  });
}

// Persist state
function saveState() {
  localStorage.setItem("appState", JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem("appState");
  if (saved) {
    Object.assign(state, JSON.parse(saved));
  }
}

// Call loadState on page load
loadState();
// SHOPPING CART 
// Add products to your centralized state
state.products = [
  { id: 1, name: "Laptop", price: 999.99, image: "https://via.placeholder.com/80?text=Laptop" },
  { id: 2, name: "Phone", price: 699.99, image: "https://via.placeholder.com/80?text=Phone" },
  { id: 3, name: "Headphones", price: 199.99, image: "https://via.placeholder.com/80?text=Headphones" },
];

// Add cart to state if it doesn't exist
if(!state.cart) state.cart = [];

// Cart Functions
function addToCart(productId) {
  const existing = state.cart.find(item => item.productId === productId);
  if (existing) {
    existing.quantity++;
  } else {
    state.cart.push({ productId, quantity: 1 });
  }
  setState({ cart: state.cart }); // uses your existing setState!
}

function updateQuantity(productId, quantity) {
  if (quantity <= 0) return removeFromCart(productId);
  const newCart = state.cart.map(item => 
    item.productId === productId ? { ...item, quantity } : item
  );
  setState({ cart: newCart });
}

function removeFromCart(productId) {
  setState({ cart: state.cart.filter(item => item.productId !== productId) });
}

function clearCart() {
  setState({ cart: [] });
}

function getCartTotal() {
  return state.cart.reduce((total, item) => {
    const product = state.products.find(p => p.id === item.productId);
    return total + (product.price * item.quantity);
  }, 0);
}

function getCartCount() {
  return state.cart.reduce((count, item) => count + item.quantity, 0);
}

function renderProducts() {
  const productList = document.getElementById('product-list');
  if(!productList) return;
  productList.innerHTML = state.products.map(product => `
    <div style="border:1px solid #ccc; padding:10px; margin:10px 0; display:flex; gap:10px;">
      <img src="${product.image}" width="80">
      <div>
        <h4>${product.name}</h4>
        <p>$${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    </div>
  `).join('');
}

function renderCart() {
  const cartDiv = document.getElementById('cart');
  const totalSpan = document.getElementById('cart-total');
  const countSpan = document.getElementById('cart-count');
  if(!cartDiv) return;

  if (state.cart.length === 0) {
    cartDiv.innerHTML = "<p>Cart is empty</p>";
  } else {
    cartDiv.innerHTML = state.cart.map(item => {
      const product = state.products.find(p => p.id === item.productId);
      return `
        <div style="display:flex; justify-content:space-between; margin:5px 0;">
          <span>${product.name} - $${product.price.toFixed(2)}</span>
          <div>
            <button onclick="updateQuantity(${product.id}, ${item.quantity - 1})">-</button>
            ${item.quantity}
            <button onclick="updateQuantity(${product.id}, ${item.quantity + 1})">+</button>
            <button onclick="removeFromCart(${product.id})">X</button>
          </div>
        </div>
      `;
    }).join('');
  }
  totalSpan.textContent = getCartTotal().toFixed(2);
  countSpan.textContent = getCartCount();
}

// Update your existing render() to also render cart
const oldRender = window.render;
window.render = function() {
  if(oldRender) oldRender(); // keeps todo rendering
  renderProducts();
  renderCart();
}

// Load state on start
loadState();
render();
