import { state, setState, loadState } from './state.js';
import { render } from './ui.js';
import { debounce } from './utils.js';

// MAKE FUNCTIONS GLOBAL FOR HTML onclick
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.handleAdd = handleAdd;
window.toggleTodo = toggleTodo;
window.deleteTodo = deleteTodo;

// CART LOGIC
export function addToCart(productId) {
  const existing = state.cart.find(item => item.productId === productId);
  if (existing) existing.quantity++; else state.cart.push({ productId, quantity: 1 });
  setState({ cart: state.cart }); render();
}

export function updateQuantity(productId, quantity) {
  if (quantity <= 0) return removeFromCart(productId);
  const item = state.cart.find(item => item.productId === productId);
  if (item) item.quantity = quantity;
  setState({ cart: state.cart }); render();
}

export function removeFromCart(productId) {
  setState({ cart: state.cart.filter(item => item.productId!== productId) }); render();
}

export function clearCart() {
  setState({ cart: [] }); render();
}

export function getCartTotal() {
  return state.cart.reduce((total, item) => {
    const product = state.products.find(p => p.id === item.productId);
    return total + (product.price * item.quantity);
  }, 0);
}

export function getCartCount() {
  return state.cart.reduce((count, item) => count + item.quantity, 0);
}

// TODO LOGIC
export function handleAdd() {
  const input = document.getElementById('todo-input');
  if (!input || input.value.trim() === '') return;
  const newTodo = { id: Date.now(), text: input.value, completed: false };
  setState({ todos: [...state.todos, newTodo] });
  input.value = ''; render();
}

export function toggleTodo(id) {
  setState({ todos: state.todos.map(t => t.id === id? {...t, completed:!t.completed} : t) }); render();
}

export function deleteTodo(id) {
  setState({ todos: state.todos.filter(t => t.id!== id) }); render();
}

// FORM LOGIC
export const handleInput = debounce((e) => {
  setState({ formData: {...state.formData, [e.target.id]: e.target.value} });
}, 500);

// INIT
loadState();
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('todo-input')?.addEventListener('input', handleInput);
  document.getElementById('form-name')?.addEventListener('input', handleInput);
  document.getElementById('form-email')?.addEventListener('input', handleInput);
  render();
});
