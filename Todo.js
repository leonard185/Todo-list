// Retrieve existing todos from local storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

// Function to render todos from array
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.textContent = todo.text;
        if (todo.completed) {
            todoItem.classList.add('completed');
        }

        // Add delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => {
            todos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos();
        };

        // Toggle todo completion
        todoItem.addEventListener('click', () => {
            todo.completed = !todo.completed;
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos();
        });

        todoItem.appendChild(deleteBtn);
        todoList.appendChild(todoItem);
    });
}

// Add todo function
function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        todos.push({ text: todoText, completed: false });
        localStorage.setItem('todos', JSON.stringify(todos));
        todoInput.value = '';
        renderTodos();
    }
}

// Initial render
renderTodos();
