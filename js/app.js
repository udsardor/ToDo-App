// Selectors

const todoInput = document.querySelector(".todo-input"),
    todoButton = document.querySelector(".todo-button"),
    todoList = document.querySelector(".todo-list"),
    filterOption = document.querySelector(".filter-todo");
// Event Listeners

document.addEventListener("DOMContentLoaded", getTodos)

todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click", filterTodo)

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

        // Add to localStorage

        saveLocalTodos(todoInput.value)
    }

    // Clearing Input Value
    todoInput.value = ""
}

// Delete Created Todo
function deleteCheck(e) {
    const item = e.target;

    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        // Animation
        todo.classList.add("fall");

        removeTodos(todo)
        todo.addEventListener("transitionend", () => {
            todo.remove()
        })
    }

    // Marked Element

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        console.log(item.parentElement)
        todo.classList.toggle("completed")
        console.log(item.classList.contains("completed") ? item.classList.contains("completed"): "hatolik")
    }
}

function markEl(e){
    const item = e.target;
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        console.log(item.parentElement)
        todo.classList.toggle("completed")
        console.log(item.classList.contains("completed") ? item.classList.contains("completed"): "hatolik")
    }
}

function filterTodo(e)  {
    const todos = todoList.childNodes;
    if(e.target.value === "completed"){
        todos.forEach(function(todo){
            switch (e.target.value) {
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    }else {
                        todo.style.display = "none";
                    }
                break;
                case "uncompleted" : 
                    if(!todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    }else {
                        todo.style.display = "none"
                    }
            }
        })
    }
}

function saveLocalTodos(todo){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}   

function getTodos(){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerHTML = todo;
        newTodo.classList.add(todo);

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
    })
    
}

function removeTodos(todo){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1)

    localStorage.setItem("todos", JSON.stringify(todos));
    
}