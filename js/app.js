// Selectors

const todoInput = document.querySelector(".todo-input"),
    todoButton = document.querySelector(".todo-button"),
    todoList = document.querySelector(".todo-list");

// Event Listeners

todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)

// Create A Todo
function addTodo(e) {
    e.preventDefault();
    // ToDo Div
    if (todoInput.value !== "" && todoInput.value.length < 100) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerHTML = todoInput.value;
        newTodo.classList.add("todo-item");

        todoDiv.appendChild(newTodo);

        // checker
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<li class="fas fa-check"></li>`;
        completedButton.classList.add("complete-btn")
        todoDiv.appendChild(completedButton)

        // trash 
        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<li class="fas fa-trash"></li>`;
        trashButton.classList.add("trash-btn")
        todoDiv.appendChild(trashButton)

        // Appending
        todoList.appendChild(todoDiv);
    }

    // Clearing Input Value
    todoInput.value = ""
}

// Delete Created Todo
function deleteCheck(e) {
   const item = e.target;

   if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.remove()
   }

    // Marked Element
    
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}