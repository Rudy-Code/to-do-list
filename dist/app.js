document.addEventListener('DOMContentLoaded', () => {
    let showAlerts = true;
    const btnAddNewTask = document.querySelector('.btn-add-new-task');
    const inputNewTask = document.querySelector('#input-new-task');
    const selectCategories = document.querySelector('#select-categories');
    const message = document.querySelector('.message');
    const taskNameError = document.querySelector('.task-name-error');
    let categories = ['gym', 'homework', 'general', 'hobby'];
    let selectedCategory;
    const tasks = [
        {
            name: 'Go to the gym',
            done: false,
            category: 'gym',
        },
        {
            name: 'Do homework',
            done: false,
            category: 'homework',
        },
        {
            name: 'Buy milk',
            done: false,
            category: 'general',
        },
        {
            name: 'Read a book',
            done: false,
            category: 'hobby',
        },
    ];
    const renderTasks = (tasks) => {
        const ul = document.querySelector('.tasks-list');
        ul.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
			<span style=" word-break: break-all "> ${task.name} </span>

			<div class="buttons">

				<button class="btn-done-task">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 			stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
		  			</svg>
		  
				</button>

				<button class="btn-edit-task">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
		  			</svg>
		  
				</button>

				<button class="btn-delete-task">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
					stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round"
						d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
					</svg>
				</button>
			</div>
			`;
            li.classList.add('flex', 'flex-col', 'justify-between', 'md:flex-row', 'md:items-center');
            ul.appendChild(li);
        });
    };
    const addNewTask = (task) => {
        tasks.push(task);
        renderTasks(tasks);
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
    btnAddNewTask.addEventListener('click', (e) => {
        e.preventDefault();
        selectedCategory = selectCategories.value;
        taskNameError.classList.add('hidden');
        if (inputNewTask.value.trim() !== '') {
            addNewTask({
                name: inputNewTask.value,
                done: false,
                category: selectedCategory,
            });
            inputNewTask.value = '';
            showAlerts && showSuccessMessage();
        }
        else {
            taskNameError.classList.remove('hidden');
        }
    });
    renderTasks(tasks);
});
