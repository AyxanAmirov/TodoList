//new element

// const parent = document.querySelector(".todo-list")
// const todoLi = document.createElement("li")
// const todoA = document.createElement("a")
// const todoI = document.createElement("i")

// todoLi.className="list-element";
// todoLi.innerHTML="Todo 5"
// todoA.href="#!";
// todoA.className="remove-btn";
// todoI.className="fa-solid fa-xmark  icon-hover";

// todoA.appendChild(todoI)
// todoLi.appendChild(todoA)
// parent.appendChild(todoLi)

//remove

// const listElement = document.querySelectorAll(".list-element");
// const btn = document.querySelectorAll(".remove-btn")[0];
// btn.addEventListener("click", removeTodos);
// const btnAll = document.querySelectorAll(".btn")[1];
// btnAll.addEventListener("click", removeAllTodos);

// function removeTodos(todo) {
//   listElement[0].remove();
// }
// function removeAllTodos(todo) {
//   for (i = 0; i <= listElement.length; i++) {
//     listElement[i].remove();
//   }
// }

//replace

// const table = document.querySelector(".table")
// const newTitle = document.createElement("h2")
// newTitle.className = "name-list"
// newTitle.innerHTML = "New Todo"

// table.replaceChild(newTitle,table.childNodes[1])

// f5 engelleme

// document.addEventListener("keydown",run);

// function run(e){
//     console.log(e.keyCode);
//      console.log("salam");
//     if(e.keyCode === 116){
//         alert("Səhifə yenilənmə ləğv edilib!!!")
//     }
//      e.preventDefault();
// }

//todo js cods

const form = document.querySelector("#formElement");
const addInput = document.querySelector("#getinput");
const todoList = document.querySelector(".todo-list");
const inputsBodySecond = document.querySelectorAll(".inputs-body")[1];
const removeAllTodos = document.querySelectorAll(".btn")[1];
const filterInput = document.querySelectorAll(".search-input")[1];

let todos = [];

runEvents();

function runEvents() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", pageLoad);
  inputsBodySecond.addEventListener("click", removeTodoUi);
  removeAllTodos.addEventListener("click", removeTodoEveryWhere);
  filterInput.addEventListener("keyup", filterTodo);
}

function pageLoad() {
  checkStorage();
  todos.forEach(function (todo) {
    addTodoUi(todo);
  });
}
function removeTodoUi(e) {
  if (e.target.className === "fa-solid fa-xmark icon-hover") {
    const todo = e.target.parentElement.parentElement;
    todo.remove();
    //storagedən silmək
    removeTodDotoStorage(todo.textContent);
  }
}

function removeTodDotoStorage(todoRemove) {
  checkStorage();
  todos.forEach(function (todo, index) {
    if (todoRemove === todo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(e) {
  let inputText = addInput.value.trim();
  if (inputText == null || inputText == "") {
    alert("Boş yazı daxil edə bilməzsiniz");
  } else {
    addTodoUi(inputText);
    addStorage(inputText);
  }

  e.preventDefault();
}

function addTodoUi(newToDo) {
  const li = document.createElement("li");
  li.className = "list-element";
  li.textContent = newToDo;

  const a = document.createElement("a");
  a.className = "remove-btn";
  a.href = "#!";

  const i = document.createElement("i");
  i.className = "fa-solid fa-xmark icon-hover";

  a.appendChild(i);
  li.appendChild(a);
  todoList.appendChild(li);
  addInput.value = "";
}
function addStorage(newToDo) {
  checkStorage();
  todos.push(newToDo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function checkStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

function removeTodoEveryWhere() {
  const todoListesi = document.querySelectorAll(".list-element");
  if (todoListesi.length > 0) {
    todoListesi.forEach(function (todo) {
      todo.remove();
      todos = [];
      localStorage.setItem("todos", JSON.stringify(todos));
    });
  } else {
    alert("silmək üçün ən az 1 todo daxil edin");
  }
}
function filterTodo(e) {
  let todoName = e.target.value.toLowerCase().trim();
  const todoListesi = document.querySelectorAll(".list-element");

  if (todoListesi.length > 0) {
    todoListesi.forEach(function (todo) {
      if (todo.textContent.toLowerCase().trim().includes(todoName)) {
        todo.setAttribute("style","display : block");
      } else {
        todo.setAttribute("style","display : none")
      }                             
    });
  }else{
    alert("Ən az 1 todo daxil edin")
  }
}
