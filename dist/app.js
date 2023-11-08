document.addEventListener('DOMContentLoaded', () => {
    let showAlerts = true;
    let theme = 'synthwave';
    const taskList = document.querySelector('.tasks-list');
    const doneTaskList = document.querySelector('.done-task-list');
    const btnAddNewTask = document.querySelector('.btn-add-new-task');
    const inputNewTask = document.querySelector('#input-new-task');
    const selectCategories = document.querySelector('#select-categories');
    const message = document.querySelector('.message');
    const taskNameError = document.querySelector('.task-name-error');
    const selectSortCategory = document.querySelector('#select-sort-category');
    // task
    let btnsDoneTask;
    let btnsEditTask;
    let btnsDeleteTask;
    const inputEditNameTask = document.querySelector('#input-edit-name-task');
    // settings
    const btnSaveSettings = document.querySelector('.btn-save-settings');
    const inputNewCategory = document.querySelector('#input-new-category');
    const btnShowAlerts = document.querySelector('.btn-show-alerts');
    const btnEditNameTask = document.querySelector('.btn-edit-name-task');
    let categories = ['gym', 'homework', 'general', 'hobby'];
    let selectedCategory;

    
    function convertJSONToObj(jsonArray) {
        const obj = {};

        for (const todo of jsonArray) {
            obj[todo.id] = {
                id: todo.id,
                name: todo.name,
                done: todo.done,
                category: todo.category,
            };
        }

        return obj;
    }

    async function fetchAndConvert() {
        const response = await fetch('/todos');

        if (response.ok) {
            const todos = await response.json();
            const todosObj = convertJSONToObj(todos);
            return todosObj;
        }
    }

    async function initializeTasks() {
        const tasks = [
            {
                id: 0,
                name: 'Go to the gym',
                done: false,
                category: 'gym',
            },
            {
                id: 1,
                name: 'Do homework',
                done: true,
                category: 'homework',
            },
            {
                id: 2,
                name: 'Buy milk',
                done: false,
                category: 'general',
            },
            {
                id: 3,
                name: 'Read a book',
                done: false,
                category: 'hobby',
            },
        ];

        try {
            const todosObj = await fetchAndConvert();

            Object.values(todosObj).forEach(todo => {
                tasks.push(todo);
            });

            return tasks;
        } catch (error) {
            console.error(error);
            return tasks; 
        }
    }



    const renderCategories = (categories) => {
        selectCategories.innerHTML = '';
        selectSortCategory.innerHTML = '';
        selectCategories.innerHTML = `<option value="">None</option>`;
        selectCategories.innerHTML = `<option value="" selected disabled>Pick your category</option>`;
        selectSortCategory.innerHTML = `<option value="all" selected>All</option>`;
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.innerHTML = category;
            selectCategories.appendChild(option);
            selectSortCategory.appendChild(option.cloneNode(true));
        });
    };
    const taskListTemp = document.querySelector('.done-task-list-template');
    const renderTasks = (tasks) => {
        // console.log(doneTaskList)
        taskList.innerHTML = '';
        doneTaskList.innerHTML = '';
        // console.log(taskListTemp);
        tasks.forEach((task, index) => {
            const clone = taskListTemp.content.cloneNode(true);
            const doneBtn = clone.querySelector('.btn-done-task');
            // console.log(clone)
            clone.querySelector('li').setAttribute('id', `${index}`);
            const li = clone.querySelector('li');
            // console.log(li);
            li.querySelector('span').textContent = task.name;
            if (task.done === true) {
                doneTaskList.appendChild(clone);
                li.querySelector('span').classList.add('line-through', 'text-zinc-400');
                doneBtn
                    .querySelector('svg')
                    .classList.add('transition-[fill,stroke]', 'duration-500', 'linear', 'fill-white', 'stroke-black', 'hover:fill-black', 'hover:stroke-white');
                // li.querySelector('span').classList.add('line-through', 'text-zinc-400')
            }
            else {
                taskList.appendChild(clone);
                doneBtn
                    .querySelector('svg')
                    .classList.add('transition-[fill,stroke]', 'duration-500', 'linear', 'fill-black', 'stroke-white', 'hover:fill-white', 'hover:stroke-black');
            }
        });
        getTaskBtns();
    };
    const addNewTask = async (task) => {
        try {
            const currentTasks = await initializeTasks();

            renderTasks(currentTasks);
        } catch (error) {
            console.error(error);
        }
    };
    const showSuccessMessage = () => {
        message.innerHTML = '';
        const div = document.createElement('div');
        div.classList.add('alert', 'alert-success', 'fixed', 'top-0', 'left-0', 'rounded-[3px]', 'flex', 'show');
        div.innerHTML = `
			<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
			<span class="text-sm">Your task has been successfully added!</span>
			<span class="progress absolute -bottom-1 left-0  h-1 bg-green-700"></span>
		`;
        message.appendChild(div);
        // make animation progress bar and remove message after 3s
        const progress = div.querySelector('.progress');
        progress.classList.add('animate-progress-bar');
        setTimeout(() => {
            div.classList.remove('show');
            div.classList.add('hide');
            setTimeout(() => {
                div.remove();
            }, 1000);
        }, 2000);
    };
    const getTaskBtns = () => {
        // btnEditNameTask.removeEventListener('click', test)
        btnsDoneTask = document.querySelectorAll('.btn-done-task');
        btnsEditTask = document.querySelectorAll('.btn-edit-task');
        btnsDeleteTask = document.querySelectorAll('.btn-delete-task');
        btnsDoneTask.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskIndex = Number(e.target.closest('li').getAttribute('id'));
                tasks[taskIndex].done == true ? (tasks[taskIndex].done = false) : (tasks[taskIndex].done = true);
                renderTasks(tasks);
            });
        });
        let taskIndex;
        let spanText;
        btnsEditTask.forEach(btn => {
            btn.addEventListener('click', (e) => {
                taskIndex = Number(e.currentTarget.closest('li').getAttribute('id'));
                spanText = e.target.closest('li').querySelector('span').textContent;
                inputEditNameTask.placeholder = spanText;
            });
        });
        const saveEditTask = () => {
            btnEditNameTask.removeEventListener('click', saveEditTask);
            const taskDone = tasks[taskIndex].done;
            const taskCategory = tasks[taskIndex].category;
            const newTaskName = inputEditNameTask.value;
            tasks.splice(Number(taskIndex), 1, {
                id: taskIndex,
                name: newTaskName,
                done: taskDone,
                category: taskCategory,
            });
            renderTasks(tasks);
            inputEditNameTask.value = '';
        };
        btnEditNameTask.addEventListener('click', saveEditTask);
        btnsDeleteTask.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskIndex = e.target.closest('li').getAttribute('id');
                tasks.splice(Number(taskIndex), 1);
                console.log(taskIndex);
                renderTasks(tasks);
            });
        });
    };
    const saveSettings = () => {
        const newCategory = inputNewCategory.value;
        if (newCategory.trim() !== '') {
            categories.push(newCategory);
            renderCategories(categories);
        }
        inputNewCategory.value = '';
        showAlerts = btnShowAlerts.textContent === 'ON' ? true : false;
    };
    btnShowAlerts.addEventListener('click', () => {
        btnShowAlerts.textContent === 'ON' ? (btnShowAlerts.textContent = 'OFF') : (btnShowAlerts.textContent = 'ON');
    });
    const sortViewCategory = () => {
        const selectedCategory = selectSortCategory.value;
        if (selectedCategory === 'all') {
            renderTasks(tasks);
        }
        else {
            const filteredTasks = tasks.filter(task => task.category === selectedCategory);
            renderTasks(filteredTasks);
            doneTaskList.innerHTML === '' &&
                (doneTaskList.innerHTML = `<p class="text-center text-zinc-400">No tasks in this category</p>`);
            taskList.innerHTML === '' &&
                (taskList.innerHTML = `<p class="text-center text-zinc-400">No done tasks in this category</p>`);
        }
    };
    btnAddNewTask.addEventListener('click', async (e) => {
        e.preventDefault();
        selectedCategory = selectCategories.value;
        taskNameError.classList.add('hidden');

        if (inputNewTask.value.trim() !== '') {
            const tasks = await initializeTasks();
            const newTask = {
                id: tasks.length + 1,
                name: inputNewTask.value,
                done: false,
                category: selectedCategory,
            };

            try {
                const response = await fetch('/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newTask),
                });

                if (response.ok) {

                    addNewTask(newTask);

                    inputNewTask.value = '';
                    showAlerts && showSuccessMessage();
                } else {
                    console.error('Error creating to-do:', response.statusText);
                }
            } catch (error) {
                console.error('Error creating to-do:', error);
            }
        } else {
            taskNameError.classList.remove('hidden');
        }
    });

    btnSaveSettings.addEventListener('click', saveSettings);
    selectSortCategory.addEventListener('change', sortViewCategory);
    initializeTasks()
        .then(tasks => {
            console.log(tasks);
            renderTasks(tasks);
        })
        .catch(error => {
            console.error(error);
        });
    renderCategories(categories);
});