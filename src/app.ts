document.addEventListener('DOMContentLoaded', () => {
	let showAlerts: boolean = true
	let theme: string = 'synthwave'

	const taskList: HTMLElement = document.querySelector('.tasks-list')
	const doneTaskList: HTMLElement = document.querySelector('.done-task-list')

	const btnAddNewTask: HTMLButtonElement = document.querySelector('.btn-add-new-task')
	const inputNewTask: HTMLInputElement = document.querySelector('#input-new-task')
	const selectCategories: HTMLSelectElement = document.querySelector('#select-categories')
	const message: HTMLDivElement = document.querySelector('.message')
	const taskNameError: HTMLElement = document.querySelector('.task-name-error')
	const selectSortCategory: HTMLSelectElement = document.querySelector('#select-sort-category')

	// task
	let btnsDoneTask: NodeList
	let btnsEditTask: NodeList
	let btnsDeleteTask: NodeList
	const inputEditNameTask: HTMLInputElement = document.querySelector('#input-edit-name-task')

	// settings
	const btnSaveSettings: HTMLButtonElement = document.querySelector('.btn-save-settings')
	const inputNewCategory: HTMLInputElement = document.querySelector('#input-new-category')
	const btnShowAlerts: HTMLButtonElement = document.querySelector('.btn-show-alerts')
	const btnEditNameTask: HTMLButtonElement = document.querySelector('.btn-edit-name-task')

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

	const renderCategories = (categories: string[]) => {
		selectCategories.innerHTML = ''
		selectSortCategory.innerHTML = ''
		selectCategories.innerHTML = `<option value="">None</option>`
		selectCategories.innerHTML = `<option value="" selected disabled>Pick your category</option>`
		selectSortCategory.innerHTML = `<option value="all" selected>All</option>`
		categories.forEach(category => {
			const option = document.createElement('option')
			option.value = category
			option.innerHTML = category
			selectCategories.appendChild(option)
			selectSortCategory.appendChild(option.cloneNode(true))
		})
	}
	const taskListTemp: HTMLTemplateElement = document.querySelector('.done-task-list-template')

	const renderTasks = (tasks: Task[]) => {
		// console.log(doneTaskList)
		taskList.innerHTML = ''
		doneTaskList.innerHTML = ''

		// console.log(taskListTemp);

		tasks.forEach((task, index) => {
			const clone: HTMLLIElement = taskListTemp.content.cloneNode(true) as HTMLLIElement
			const doneBtn = clone.querySelector('.btn-done-task')
			// console.log(clone)
			clone.querySelector('li').setAttribute('id', `${index}`)
			const li = clone.querySelector('li')
			// console.log(li);
			li.querySelector('span').textContent = task.name
			if (task.done === true) {
				doneTaskList.appendChild(clone)
				li.querySelector('span').classList.add('line-through', 'text-zinc-400')
				doneBtn
					.querySelector('svg')
					.classList.add(
						'transition-[fill,stroke]',
						'duration-500',
						'linear',
						'fill-white',
						'stroke-black',
						'hover:fill-black',
						'hover:stroke-white'
					)
				// li.querySelector('span').classList.add('line-through', 'text-zinc-400')
			} else {
				taskList.appendChild(clone)
				doneBtn
					.querySelector('svg')
					.classList.add(
						'transition-[fill,stroke]',
						'duration-500',
						'linear',
						'fill-black',
						'stroke-white',
						'hover:fill-white',
						'hover:stroke-black'
					)
			}
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

	const getTaskBtns = () => {
		// btnEditNameTask.removeEventListener('click', test)
		btnsDoneTask = document.querySelectorAll('.btn-done-task')
		btnsEditTask = document.querySelectorAll('.btn-edit-task')
		btnsDeleteTask = document.querySelectorAll('.btn-delete-task')

		btnsDoneTask.forEach(btn => {
			btn.addEventListener('click', (e: Event) => {
				const taskIndex = Number((e.target as HTMLElement).closest('li').getAttribute('id'))
				tasks[taskIndex].done == true ? (tasks[taskIndex].done = false) : (tasks[taskIndex].done = true)
				renderTasks(tasks)
			})
		})

		let taskIndex: number
		let spanText: string

		btnsEditTask.forEach(btn => {
			btn.addEventListener('click', (e: Event) => {
				taskIndex = Number((e.currentTarget as HTMLElement).closest('li').getAttribute('id'))
				spanText = (e.target as HTMLElement).closest('li').querySelector('span').textContent
				inputEditNameTask.placeholder = spanText
			})
		})

		const test = () => {
			btnEditNameTask.removeEventListener('click', test)
			const taskDone: boolean = tasks[taskIndex].done
			const taskCategory: string = tasks[taskIndex].category

			const saveEditTask = () => {
				const newTaskName = inputEditNameTask.value
				console.log(taskIndex)
				console.log(newTaskName)
				tasks.splice(Number(taskIndex), 1, {
					id: taskIndex,
					name: newTaskName,
					done: taskDone,
					category: taskCategory,
				})
				renderTasks(tasks)
			}
			saveEditTask()
			inputEditNameTask.value = ''
		}
		btnEditNameTask.addEventListener('click', test)

		btnsDeleteTask.forEach(btn => {
			btn.addEventListener('click', (e: Event) => {
				const taskIndex = (e.target as HTMLElement).closest('li').getAttribute('id')
				tasks.splice(Number(taskIndex), 1)
				console.log(taskIndex)

				renderTasks(tasks)
			})
		})
	}

	const saveSettings = () => {
		const newCategory = inputNewCategory.value
		if (newCategory.trim() !== '') {
			categories.push(newCategory)
			renderCategories(categories)
		}
		inputNewCategory.value = ''
		showAlerts = btnShowAlerts.textContent === 'ON' ? true : false
	}

	btnShowAlerts.addEventListener('click', () => {
		btnShowAlerts.textContent === 'ON' ? (btnShowAlerts.textContent = 'OFF') : (btnShowAlerts.textContent = 'ON')
	})

	const sortViewCategory = () => {
		const selectedCategory = selectSortCategory.value
		if (selectedCategory === 'all') {
			renderTasks(tasks)
		} else {
			const filteredTasks = tasks.filter(task => task.category === selectedCategory)
			renderTasks(filteredTasks)
			doneTaskList.innerHTML === '' &&
				(doneTaskList.innerHTML = `<p class="text-center text-zinc-400">No tasks in this category</p>`)
			taskList.innerHTML === '' &&
				(taskList.innerHTML = `<p class="text-center text-zinc-400">No done tasks in this category</p>`)
		}
	}

	btnAddNewTask.addEventListener('click', (e: Event) => {
		e.preventDefault()
		selectedCategory = selectCategories.value
		taskNameError.classList.add('hidden')
		if (inputNewTask.value.trim() !== '') {
			addNewTask({
				id: tasks.length + 1,
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

	btnSaveSettings.addEventListener('click', saveSettings)
	selectSortCategory.addEventListener('change', sortViewCategory)

	renderTasks(tasks)
	renderCategories(categories)
})
