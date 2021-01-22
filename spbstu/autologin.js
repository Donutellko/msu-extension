console.log("Started autologin extension")

let possibleButtons = {
// Example: https://lk.spbstu.ru
    gotoCasButton: document.querySelector('#bx_auth_href_spbstu_cas'),
// Example: https://dl.spbstu.ru/login/index.php
    gotoCasButton2: document.querySelector('#page-login-index .auth0-lock-social-button'),
// Example: https://dl.spbstu.ru
    gotoLoginButton: document.querySelector('.usermenu .login a')
}

for (let buttonName in possibleButtons) {
    let button = possibleButtons[buttonName]
    if (button != null) {
        console.log(`Found ${buttonName}. CLICK!`)
        button.click()
        button.style.background = 'grey'
        button.style.cursor = 'wait'
    }
}