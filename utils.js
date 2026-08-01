export function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
