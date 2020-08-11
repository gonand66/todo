//Selector
const todoInput = document.querySelector(".todo_input");
const todoBtn = document.querySelector(".todo_btn");
const todoList = document.querySelector(".todo_list");

//Event listener
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", checkDelete);
document.addEventListener("DOMContentLoaded",getTodo)

//Function
function addTodo(e) {
  e.preventDefault();
    //todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create list
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo_item");
  todoDiv.appendChild(newTodo);
  //save
  saveLocal(todoInput.value);
  //checkmark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete_btn");
  todoDiv.appendChild(completedButton);
  //trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="far fa-trash-alt"></i>';
  trashButton.classList.add("trash_btn");
  todoDiv.appendChild(trashButton);
  //append todo list
  todoList.appendChild(todoDiv);
  //Clear
  todoInput.value = "";
}

function checkDelete(e) {
  const item = e.target;
  if (item.classList[0] === "trash_btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocal(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();

    });
  }

  if (item.classList[0] === "complete_btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}


function saveLocal(todo){
  //check do i have sth
  let todos;
  if (localStorage.getItem('todos') === null){
    todos=[]
  }else{
    todos=JSON.parse(localStorage.getItem("todos"))
  }
  todos.push(todo)
  localStorage.setItem("todos",JSON.stringify(todos))
}

function getTodo(){
  let todos;
  if (localStorage.getItem('todos') === null){
    todos=[]
  }else{
    todos=JSON.parse(localStorage.getItem("todos"))
  }
  todos.forEach(function(todo){

    //todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create list
  const newTodo = document.createElement("li");
  newTodo.innerText = todo;;
  newTodo.classList.add("todo_item");
  todoDiv.appendChild(newTodo);
  //checkmark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete_btn");
  todoDiv.appendChild(completedButton);
  //trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="far fa-trash-alt"></i>';
  trashButton.classList.add("trash_btn");
  todoDiv.appendChild(trashButton);
  //append todo list
  todoList.appendChild(todoDiv);
  })
}

function removeLocal(todo){
  //check do i have sth
  let todos;
  if (localStorage.getItem('todos') === null){
    todos=[]
  }else{
    todos=JSON.parse(localStorage.getItem("todos"))
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex),1)
  localStorage.setItem("todos",JSON.stringify(todos));
}
