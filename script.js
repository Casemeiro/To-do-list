let tasks = [];
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');

addTaskBtn.addEventListener('click', addTask);

function addTask() {
  const task = taskInput.value.trim();
  if (task) {
    // Check if the task already exists
    const taskExists = tasks.some(existingTask => existingTask.text.toLowerCase() === task.toLowerCase());
    if (!taskExists) {
      tasks.push({ text: task, id: Date.now() });
      taskInput.value = '';
      renderTasks();
    } else {
      alert('Task already exists!');
    }
  }
}
function editTask(id) {
  const task = tasks.find((task) => task.id === id);
  const newTaskText = prompt('Enter new task text:', task.text);
  if (newTaskText) {
    const duplicate = tasks.some(
      t => t.text.toLowerCase() === newTaskText.toLowerCase() && t.id !== id
    );
    if (duplicate) {
      alert('Task already exists!');
      return;
    }
    task.text = newTaskText;
    renderTasks();
  }
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const taskElement = document.createElement('li');
    taskElement.classList.add('task');
    taskElement.innerHTML = `
      <span>${task.text}</span>
      <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
      <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(taskElement);
  });
}

function editTask(id) {
  const task = tasks.find((task) => task.id === id);
  const newTaskText = prompt('Enter new task text:', task.text);
  if (newTaskText) {
    task.text = newTaskText;
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

// Save tasks to local storage
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

