// login form
const loginForm = document.querySelector('.login');
const registrationForm = document.querySelector('.registration');
const btnShowLogin = document.querySelector('#btn-show-login');
const btnShowRegister = document.querySelector('#btn-show-register');
const btnsToggleLoginForm = document.querySelectorAll('.btn-toggle-login-form'); //
const toogleLoginForm = (index) => {
    if (index === 0) {
        loginForm.classList.remove('hidden');
        loginForm.classList.remove('down');
        loginForm.classList.add('up');
        registrationForm.classList.remove('up');
        registrationForm.classList.add('down');
    }
    else if (index === 1) {
        loginForm.classList.remove('up');
        loginForm.classList.add('down');
        registrationForm.classList.remove('down');
        registrationForm.classList.add('up');
        setTimeout(() => {
            loginForm.classList.add('hidden');
        }, 800);
    }
};
btnsToggleLoginForm.forEach((btn, index) => {
    console.log(btn);
    btn.addEventListener('click', btn => {
        btn.preventDefault();
        toogleLoginForm(index);
    });
});
