//selectors
const todoInput = document.querySelector(".todo-input");
const todoUL = document.querySelector(".todo-ul");
const todoFilter = document.querySelector(".filter-todo");
const errorM = document.querySelector(".error");


//event listeners
document.querySelector(".add-btn").addEventListener("click", addTask);
document.querySelector("ul").addEventListener("click", deleteTask);
todoFilter.addEventListener("change", filterTodo);
// DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed
document.addEventListener("DOMContentLoaded", getTodos);

//functions
function addTask(e) {
    e.preventDefault();

    if (todoInput.value.length != 0) {
        // remove error message if previous task had no input
        errorM.textContent = "";
        //add div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo-div");
        todoUL.appendChild(todoDiv);

        //add li (input text) 
        const todoLi = document.createElement("li");
        todoDiv.appendChild(todoLi);
        todoLi.innerHTML = todoInput.value;

        // add todo to local storage
        saveLocalTodos(todoInput.value);

        //add complete button
        const completeButton = document.createElement("button");
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);
        completeButton.innerHTML = '<i class="fas fa-check-square"></i>';

        //add delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';

        //clear input field
        todoInput.value = "";
        // remove error message when no input was specified
        // document.querySelector(".input-error").remove();

    } else {
        // const needInput = document.createElement("p");
        // needInput.classList.add("input-error");
        // needInput.innerHTML = "Please enter a task!";
        // document.querySelector(".error").appendChild(needInput);
        // if(document.querySelector(".input-error")===true)
        // console.log(needInput);
        displayErrorMessage();
    }
}

function displayErrorMessage(){
    var errorM = document.querySelector(".error");
    errorM.textContent = "Please enter a task";
    // if(document.querySelector("span").classList.contains("error")){
        
    // } else {
    //     errorM.textContent = "";
    // }
}


function deleteTask(e) {
    const item = e.target;

    //delete completed item
    if (item.classList[0] === "delete-btn") {
        // animation
        const itemparent = item.parentElement;
        item.parentElement.classList.add("fall");
        removeLocalTodos(itemparent);
        item.parentElement.addEventListener("transitionend", function () {
            item.parentElement.remove();
        })
    }

    if (item.classList[0] === "complete-btn") {
        item.parentElement.classList.toggle("completed");
    }
}

function filterTodo(e) {
    // get child nodes of ul
    const todos = todoUL.childNodes;
    todos.forEach(todo => {
        // "case value"
        switch (e.target.value) {
            case "all":
                // display type to show
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    // set display to none, does not show element;
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            default:
                console.log("Error");
                break;
        }
    })
}

// can only see in console not in UI
function saveLocalTodos(todo) {
    let todos;
    // check if there is already a todo array in storage
    // if there is no todo array stored, create an empty array
    if (localStorage.getItem("todos") === null) {
        todos = [];

    } else {
        // bring up the stored todo list; show as array  
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    // save back to local storage
    localStorage.setItem("todos", JSON.stringify(todos));
}

//to show up on UI; get todos from local storage
function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function (todo) {
        //add div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo-div");
        todoUL.appendChild(todoDiv);

        //add li (input text) 
        const todoLi = document.createElement("li");
        todoDiv.appendChild(todoLi);
        // don't need todo from user input but todo from local storage
        todoLi.innerHTML = todo;

        //add complete button
        const completeButton = document.createElement("button");
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);
        completeButton.innerHTML = '<i class="fas fa-check-square"></i>';

        //add delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    });
}

// remove so doesn't show up in UI when deleted & refreshed
function removeLocalTodos(itemparent) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    // to get text of screen todolist
    const todoIndex = itemparent.children[0].innerText;
    // find index of item of screen todolist and remove at that position, 1 item
    todos.splice(todos.indexOf(todoIndex), 1);
    // save new array back to local storage;
    localStorage.setItem("todos", JSON.stringify(todos));
} 