// login form
const loginForm: HTMLFormElement = document.querySelector('.login')
const registrationForm: HTMLFormElement = document.querySelector('.registration')
const btnShowLogin: HTMLButtonElement = document.querySelector('#btn-show-login')
const btnShowRegister: HTMLButtonElement = document.querySelector('#btn-show-register')
const btnsToggleLoginForm = document.querySelectorAll('.btn-toggle-login-form') //

const toogleLoginForm = (index: number) => {
	if (index === 0) {
		loginForm.classList.remove('hidden')
		loginForm.classList.remove('down')
		loginForm.classList.add('up')

		registrationForm.classList.remove('up')
		registrationForm.classList.add('down')
	} else if (index === 1) {
		loginForm.classList.remove('up')
		loginForm.classList.add('down')

		registrationForm.classList.remove('down')
		registrationForm.classList.add('up')
		setTimeout(() => {
			loginForm.classList.add('hidden')
		}, 500)
	}
}

btnsToggleLoginForm.forEach((btn: HTMLElement, index: number) => {
	console.log(btn)
	btn.addEventListener('click', btn => {
		btn.preventDefault()
		toogleLoginForm(index)
	})
})
