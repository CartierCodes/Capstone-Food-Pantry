const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

let username;
let password;

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    username = loginForm.username.value;
    password = loginForm.password.value;

    if (username === "user" && password === "web_dev") {
        alert("You are logged in");
        location.reload();
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})

// Triggers every time the page is loaded
document.addEventListener("DOMContentLoaded", function() {
    console.log("Login page loaded...");
});