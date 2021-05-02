let blink;

function loadPage(href) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", href, false);
    xmlhttp.send();
    return xmlhttp.responseText;
}

function loadLoginPage() {
    document.getElementById("content").innerHTML = loadPage("template/login.html");
    const logButton = document.getElementById("log-button");
    addEventListenerToElement(logButton, "click", login);
}

function addEventListenerToElement(element, eventType, callback) {
    element.addEventListener(eventType, callback);
}

function login() {
    const user = {};
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    user.username = username;
    user.password = password;
    loggedInUser(user);
    loadHangmanPage();

}

function blinkEyes() {
    let rightEye = document.getElementById("right-eye");
    let leftEye = document.getElementById("left-eye");
    rightEye.style.height = rightEye.offsetHeight == 7 ? "3px" : "7px";
    leftEye.style.height = leftEye.offsetHeight == 7 ? "3px" : "7px";
}
function loggedInUser(user) {
    localStorage.setItem("loggedUser", JSON.stringify(user));
}

function loadHangmanPage() {
    const hangman = document.getElementById("content");
    hangman.innerHTML = loadPage("template/hangman-game.html");
    const buttonOut = document.getElementById("btn-logout");
    addEventListenerToElement(buttonOut, "click", logout);
    initHangman();
    alertMessage();
    blink = setInterval(blinkEyes, 700);

}

function stopBlinkEyes() {
    clearInterval(blink);
}
function logout() {
    localStorage.removeItem("loggedUser");
    loadLoginPage();
    stopBlinkEyes();
}

function checkIfUserIsLoggedIn() {
    if (localStorage.getItem("loggedUser") === null) {
        loadLoginPage();
    } else {
        loadHangmanPage();
    }
}
