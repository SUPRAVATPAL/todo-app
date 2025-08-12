document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  if (taskText === '') return;

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
  input.value = '';
  renderTasks();
}

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleComplete(id) {
  const tasks = getTasks();
  const task = tasks.find(t => t.id === id);
  if (task) task.completed = !task.completed;
  saveTasks(tasks);
  renderTasks();
}

function deleteTask(id) {
  let tasks = getTasks();
  tasks = tasks.filter(t => t.id !== id);
  saveTasks(tasks);
  renderTasks();
}

function clearAllTasks() {
  localStorage.removeItem('tasks');
  renderTasks();
}

function updateTaskCount() {
  const tasks = getTasks();
  const taskCount = document.getElementById('taskCount');
  taskCount.textContent = `${tasks.length} task${tasks.length !== 1 ? 's' : ''}`;
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  const tasks = getTasks();
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task.text;
    if (task.completed) span.classList.add('completed');
    span.addEventListener('click', () => toggleComplete(task.id));

    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTask(task.id);
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });

  updateTaskCount();
}

function loadTasks() {
  renderTasks();
}
