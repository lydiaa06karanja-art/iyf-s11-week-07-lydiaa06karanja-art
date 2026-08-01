
//  Debugging Skill

// EXERCISE 1: CONSOLE METHODS
console.log("Basic message");
console.log("%cImportant!", "color: red; font-size: 20px");
console.warn("This might be a problem");
console.error("This is definitely wrong");

const users = [{name: "Lydia", age: 20}, {name: "Partner", age: 21}];
console.table(users);

console.group("User Processing");
console.log("Step 1");
console.log("Step 2");
console.groupEnd();

console.time("fetchUsers");
// await fetchUsers(); 
console.timeEnd("fetchUsers");

let x = 5;
console.assert(x > 0, "x should be positive");
console.trace("How did we get here?");

// EXERCISE 3: DEBUG THIS CODE - FIXED
function calculateOrderTotal(items) {
  let total = 0;

  // Fixed: i < items.length instead of i <=
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    total += item.price * item.quantity; 
  }

  if (total > 100) {
    total = total * 0.9; // 10% discount
  }

  return total;
}

const order = [
  { name: "Book", price: 15, quantity: 2 },
  { name: "Pen", price: 3, quantity: 3 },
  { name: "Notebook", price: 8, quantity: 3 }
];

console.log(calculateOrderTotal(order)); // Expected: 63
