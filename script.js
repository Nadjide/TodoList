const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskCounter = document.getElementById('taskCounter');
const filterButtons = document.getElementById('filterButtons');
const filterAll = document.getElementById('filterAll');
const filterActive = document.getElementById('filterActive');
const filterCompleted = document.getElementById('filterCompleted');

let currentFilter = 'all';

taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask(event.target.value);
        event.target.value = '';
    }
});

addTaskBtn.addEventListener('click', () => {
    addTask(taskInput.value);
    taskInput.value = '';
});

filterAll.addEventListener('click', () => {
    currentFilter = 'all';
    updateFilterButtons();
    filterTasks();
});

filterActive.addEventListener('click', () => {
    currentFilter = 'active';
    updateFilterButtons();
    filterTasks();
});

filterCompleted.addEventListener('click', () => {
    currentFilter = 'completed';
    updateFilterButtons();
    filterTasks();
});

function addTask(task) {
    if (task.trim() !== '') {
        const listItem = document.createElement('li');

        const taskText = document.createElement('span');
        taskText.textContent = task;
        listItem.appendChild(taskText);

        const completeBtn = document.createElement('button');
        completeBtn.textContent = '✓';
        completeBtn.classList.add('complete-btn');
        completeBtn.addEventListener('click', () => {
            taskText.classList.toggle('completed');
            updateTaskCounter();
        });
        listItem.appendChild(completeBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(listItem);
            updateTaskCounter();
        });
        listItem.appendChild(deleteBtn);

        taskList.appendChild(listItem);
        updateTaskCounter();
    }
}

function updateTaskCounter() {
    const activeTasks = document.querySelectorAll('#taskList li:not(.completed)').length;
    taskCounter.textContent = `${activeTasks} tâches en cours`;
}

function updateFilterButtons() {
    filterAll.classList.toggle('active', currentFilter === 'all');
    filterActive.classList.toggle('active', currentFilter === 'active');
    filterCompleted.classList.toggle('active', currentFilter === 'completed');
    filterTasks();
}

function filterTasks() {
    const tasks = taskList.getElementsByTagName('li');
    for (let task of tasks) {
        switch (currentFilter) {
            case 'all':
                task.style.display = '';
                break;
            case 'active':
                if (task.querySelector('.completed')) {
                    task.style.display = 'none';
                } else {
                    task.style.display = '';
                }
                break;
            case 'completed':
                if (task.querySelector('.completed')) {
                    task.style.display = '';
                } else {
                    task.style.display = 'none';
                }
                break;
        }
    }
}