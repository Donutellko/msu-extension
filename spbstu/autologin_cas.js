console.log("Started autologin_cas extension")

const LOCAL_STORAGE_PLATFORM_USERNAME = 'spbstu_username'
const LOCAL_STORAGE_PLATFORM_PASSWORD = 'spbstu_password'

let usernameField = document.getElementById('user')
let passwordField = document.getElementById('password')

let loginButton = document.getElementById('doLogin')
let logoutButton = document.getElementById('doLogout')
let reloginButton = document.querySelector('a.underline')

const NO_AUTOLOGIN_QUERY = '#no_autologin'

if (loginButton) {
    if (location.href.indexOf(NO_AUTOLOGIN_QUERY) < 0) {
        doLogin()
    } else {
        onLoginSaveCredentials()
    }
} else if (logoutButton) {
    logoutButton.href += NO_AUTOLOGIN_QUERY
} else if (reloginButton) {
    reloginButton.href += NO_AUTOLOGIN_QUERY
}

function doLogin() {
    let savedUsername = localStorage[LOCAL_STORAGE_PLATFORM_USERNAME]
    let savedPassword = localStorage[LOCAL_STORAGE_PLATFORM_PASSWORD]

    if (!usernameField.value && savedUsername) usernameField.value = savedUsername
    if (!passwordField.value && savedPassword) passwordField.value = savedPassword

    let errorText = document.querySelector('.form_alert')

    if (usernameField.value
        && passwordField.value
        && !errorText) {

        console.log("CLICK!", usernameField.value, passwordField.value)
        loginButton.disabled = false
        loginButton.click()
        loginButton.style.background = 'grey'
        loginButton.style.cursor = 'wait'

    } else {
        onLoginSaveCredentials()
    }
}

function onLoginSaveCredentials() {
    loginButton.onclick = () => {
        localStorage[LOCAL_STORAGE_PLATFORM_USERNAME] = usernameField.value
        localStorage[LOCAL_STORAGE_PLATFORM_PASSWORD] = passwordField.value
    }
}
