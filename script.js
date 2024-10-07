// Get input and list elements
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Add new task to the list
function addTask() {
    const taskText = inputBox.value.trim();

    if (taskText === '') {
        alert("You must write something");
        return;
    }

    const li = createTaskElement(taskText);
    listContainer.appendChild(li);

    inputBox.value = ""; // Clear input field after adding
    saveData(); // Save updated list to local storage
}

// Create task list item with delete button
function createTaskElement(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "\u00d7"; // Unicode for '×'
    deleteBtn.classList.add("delete-btn"); // Optional: add class for styling

    li.appendChild(deleteBtn);

    return li;
}

// Handle task complete/incomplete and delete actions
listContainer.addEventListener("click", function (event) {
    const target = event.target;

    if (target.tagName === "LI") {
        target.classList.toggle("checked"); // Toggle completed state
    } else if (target.tagName === "SPAN") {
        target.parentElement.remove(); // Remove task
    }

    saveData(); // Save changes to local storage
}, false);

// Save tasks to local storage
function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

// Load tasks from local storage on page load
function showData() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks.length > 0) {
        listContainer.innerHTML = savedTasks;
    }
}

// Initialize app by showing saved tasks
showData();
