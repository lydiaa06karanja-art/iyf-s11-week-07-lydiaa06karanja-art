
//  BASICS 
// 1. STORE
localStorage.setItem("username", "lydiaa06karanja-art");

// 2. GET
const username = localStorage.getItem("username");
console.log("Saved username:", username); // "lydiaa06karanja-art"

// 3. REMOVE
localStorage.removeItem("tempUser");

// 4. CLEAR
// localStorage.clear(); // uncomment only if you want to delete everything

// 5. CHECK IF EXISTS
if (localStorage.getItem("username")) {
  console.log("User exists in storage!");
}
//STORING OBJECTS 
const user = {
  name: "Regina Gathoni",
  username: "lydiaa06karanja-art",
  status: "coding while sick 💪"
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
