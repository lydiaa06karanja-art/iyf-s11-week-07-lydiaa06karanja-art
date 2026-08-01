import { save, load } from './storage.js';

export let state = {
  todos: [],
  formData: {},
  products: [
    { id: 1, name: "Laptop", price: 999.99, image: "https://via.placeholder.com/100?text=Laptop" },
    { id: 2, name: "Phone", price: 699.99, image: "https://via.placeholder.com/100?text=Phone" },
    { id: 3, name: "Headphones", price: 199.99, image: "https://via.placeholder.com/100?text=Headphones" },
  ],
  cart: []
};

export function setState(newState) {
  state = {...state,...newState };
  save('appState', state);
}

export function loadState() {
  const saved = load('appState');
  if (saved) state = saved;
}
