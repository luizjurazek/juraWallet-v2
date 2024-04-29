const btn_login = document.getElementById('btn-login')

btn_login.addEventListener('click', (evt) => {
    evt.preventDefault()
    const email = document.getElementById('input-email').value
    const password = document.getElementById('input-password').value

    console.log(email)
    console.log(password)
})