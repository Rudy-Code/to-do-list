document.addEventListener('DOMContentLoaded', () => {
	let showAlerts: boolean = true

	const btnAddNewTask: HTMLButtonElement = document.querySelector('.btn-add-new-task')
	const inputNewTask: HTMLInputElement = document.querySelector('#input-new-task')
	const selectCategories: HTMLSelectElement = document.querySelector('#select-categories')
	const message: HTMLDivElement = document.querySelector('.message')
	const taskNameError: HTMLElement = document.querySelector('.task-name-error')
	let btnsDoneTask: NodeList


	let categories: string[] = ['gym', 'homework', 'general', 'hobby']

	let selectedCategory: string

	interface Task {
		id: number
		name: string
		done: boolean
		category?: string
	}

	const tasks: Task[] = [
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
	]
	console.log(tasks)

	const renderTasks = (tasks: Task[]) => {
		const taskList = document.querySelector('.tasks-list')
		const doneTaskList = document.querySelector('.done-task-list')
		// console.log(doneTaskList)
		taskList.innerHTML = ''
		doneTaskList.innerHTML = ''

		

		tasks.forEach((task, index) => {
			let svgDoneClass
			
				task.done ? svgDoneClass = 'transition-[fill] fill-white stroke-black hover:fill-black hover:stroke-white' : 
				svgDoneClass = 'transition-[fill] fill-black stroke-white hover:fill-white hover:stroke-black'
			


			const li = document.createElement('li')
			li.innerHTML = `
			<span style="word-break: break-all"> ${task.name}</span>

			<div class="buttons">

				<div class="hidden space-y-2 md:block">
					<button class="btn-done-task px-2">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 				stroke="currentColor" class="w-6 h-6 ${svgDoneClass}">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
		  				</svg>
		  
					</button>

					<button class="btn-edit-task px-2">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
		  				</svg>
		  
					</button>

					<button class="btn-delete-task px-2">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
						stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round"
							d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
						</svg>
					</button>
				</div>

				<button class="btn-settings-task px-3 md:hidden">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
					stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
				</button>
			</div>
			`
			li.classList.add('flex', 'justify-between', 'md:flex-row', 'md:items-center')
			li.setAttribute('id', `${index}`);
			// console.log(task.done)
			if(task.done === true) {
				doneTaskList.appendChild(li)
				li.querySelector('span').classList.add('line-through','text-zinc-400')
			}
			else taskList.appendChild(li)

		})
		getTaskBtns()
		
	}

	const addNewTask = (task: Task) => {
		tasks.push(task)
		renderTasks(tasks)
	}

	const showSuccessMessage = () => {
		message.innerHTML = ''
		const div = document.createElement('div')
		div.classList.add('alert', 'alert-success', 'fixed', 'top-0', 'left-0', 'rounded-[3px]', 'flex', 'show')
		div.innerHTML = `
			<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
			<span class="text-sm">Your task has been successfully added!</span>
			<span class="progress absolute -bottom-1 left-0  h-1 bg-green-700"></span>
		`
		message.appendChild(div)

		// make animation progress bar and remove message after 3s
		const progress = div.querySelector('.progress')
		progress.classList.add('animate-progress-bar')

		setTimeout(() => {
			div.classList.remove('show')
			div.classList.add('hide')
			setTimeout(() => {
				div.remove()
			}, 1000)
		}, 2000)
	}

	btnAddNewTask.addEventListener('click', (e: Event) => {
		e.preventDefault()
		selectedCategory = selectCategories.value
		taskNameError.classList.add('hidden')
		if (inputNewTask.value.trim() !== '') {

			addNewTask({
				id: tasks.length+1,
				name: inputNewTask.value,
				done: false,
				category: selectedCategory,
			})
			inputNewTask.value = ''
			showAlerts && showSuccessMessage()
		} else {
			taskNameError.classList.remove('hidden')
		}
	})

	const getTaskBtns = () => {
		btnsDoneTask = document.querySelectorAll('.btn-done-task')

		btnsDoneTask.forEach((btn) => {
			btn.addEventListener('click', (e:Event) => {
				const taskIndex = (e.target as HTMLElement).closest('li').getAttribute('id')
				tasks[taskIndex].done == true ? tasks[taskIndex].done = false : tasks[taskIndex].done = true
				renderTasks(tasks)
			})
		})
	}

	renderTasks(tasks)
})