console.log("Started autologin extension")

// Example: https://lk.spbstu.ru
let gotoCasButton = document.querySelector('#bx_auth_href_spbstu_cas')
if (gotoCasButton) {
    console.log("gotoCasButton", gotoCasButton)
    gotoCasButton.click()
}

// Example: https://dl.spbstu.ru/login/index.php
let gotoCasButton2 = document.querySelector('#page-login-index .auth0-lock-social-button')
if (gotoCasButton2) {
    console.log("gotoCasButton2", gotoCasButton2)
    gotoCasButton2.click()
}

// Example: https://dl.spbstu.ru
let gotoLoginButton = document.querySelector('.usermenu .login a')
if (gotoLoginButton) {
    console.log("gotoLoginButton", gotoLoginButton)
    gotoLoginButton.click()
}