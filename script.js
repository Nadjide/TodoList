const taskInput = document.getElementById('taskInput');
        const taskList = document.getElementById('taskList');

        taskInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                addTask(event.target.value);
                event.target.value = '';
            }
        });

        function addTask(task) {
            if (task.trim() !== '') {
                const listItem = document.createElement('li');
                listItem.textContent = task;
                listItem.addEventListener('click', () => {
                    listItem.classList.toggle('completed');
                });
                listItem.addEventListener('dblclick', () => {
                    taskList.removeChild(listItem);
                });
                taskList.appendChild(listItem);
            }
        }