let tasks = [];
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');

// Load tasks from localStorage when the page loads
window.addEventListener('load', () => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }
});

addTaskBtn.addEventListener('click', addTask);

function addTask() {
  const task = taskInput.value.trim();
  if (task) {
    const taskExists = tasks.some(existingTask => existingTask.text.toLowerCase() === task.toLowerCase());
    if (!taskExists) {
      tasks.push({ 
        text: task, 
        id: Date.now(),
        completed: false // Add completed property
      });
      taskInput.value = '';
      renderTasks();
      saveTasks();
    } else {
      alert('Task already exists!');
    }
  }
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const taskElement = document.createElement('li');
    taskElement.classList.add('task');
    if (task.completed) {
      taskElement.classList.add('completed');
    }
    taskElement.innerHTML = `
      <div class="task-content">
        <input type="checkbox" class="task-checkbox" 
          ${task.completed ? 'checked' : ''} 
          onclick="toggleTask(${task.id})"
        >
        <span>${task.text}</span>
      </div>
      <div class="task-buttons">
        <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    taskList.appendChild(taskElement);
  });
}

function toggleTask(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
    saveTasks();
  }
}

function editTask(id) {
  const task = tasks.find((task) => task.id === id);
  const newTaskText = prompt('Enter new task text:', task.text);
  if (newTaskText) {
    const taskExists = tasks.some(existingTask => 
      existingTask.id !== id && 
      existingTask.text.toLowerCase() === newTaskText.trim().toLowerCase()
    );
    
    if (!taskExists) {
      task.text = newTaskText.trim();
      renderTasks();
      saveTasks();
    } else {
      alert('Task already exists!');
    }
  }
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
  saveTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// How it works
// 1. The user enters a task in the input field and clicks the "Add Task" button.
// 2. The task is added to the tasks array and rendered in the task list.
// 3. Each task has an "Edit" and "Delete" button.
// 4. When the user clicks the "Edit" button, a prompt appears to enter new task text.
// 5. When the user clicks the "Delete" button, the task is removed from the tasks array and the task list
//    is re-rendered.
// 6. The tasks are saved to local storage so they persist even after refreshing the page.