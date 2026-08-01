import { state, setState } from './state.js';
import { addToCart, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartCount, handleAdd, toggleTodo, deleteTodo, handleInput } from './app.js';
import { formatPrice } from './utils.js';

// TODO RENDER
export function renderTodos() {
  const todoList = document.getElementById('todo-list');
  if (!todoList) return;
  todoList.innerHTML = state.todos.map(todo => `
    <li>
      <span onclick="toggleTodo(${todo.id})" style="text-decoration: ${todo.completed? 'line-through' : 'none'}">
        ${todo.text}
      </span>
      <button onclick="deleteTodo(${todo.id})">X</button>
    </li>
  `).join('');
}

// PRODUCTS RENDER
export function renderProducts() {
  const productList = document.getElementById('product-list');
  if (!productList) return;
  productList.innerHTML = state.products.map(product => `
    <div class="product">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${formatPrice(product.price)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `).join('');
}

// CART RENDER
export function renderCart() {
  const cartDiv = document.getElementById('cart');
  const totalSpan = document.getElementById('cart-total');
  const countSpan = document.getElementById('cart-count');
  if (!cartDiv) return;

  if (state.cart.length === 0) {
    cartDiv.innerHTML = "<p>Cart is empty</p>";
  } else {
    cartDiv.innerHTML = state.cart.map(item => {
      const product = state.products.find(p => p.id === item.productId);
      return `
        <div class="cart-item">
          <span>${product.name} - ${formatPrice(product.price)}</span>
          <div>
            <button onclick="updateQuantity(${product.id}, ${item.quantity - 1})">-</button>
            ${item.quantity}
            <button onclick="updateQuantity(${product.id}, ${item.quantity + 1})">+</button>
            <button onclick="removeFromCart(${product.id})">Remove</button>
          </div>
        </div>
      `;
    }).join('');
  }
  if(totalSpan) totalSpan.textContent = getCartTotal().toFixed(2);
  if(countSpan) countSpan.textContent = getCartCount();
}

// FORM RENDER
export function renderForm() {
  Object.keys(state.formData).forEach(key => {
    const el = document.getElementById(key);
    if (el) el.value = state.formData[key];
  });
}

export function render() {
  renderTodos();
  renderProducts();
  renderCart();
  renderForm();
}
