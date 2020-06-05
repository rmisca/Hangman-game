function loadPage(href) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", href, false);
    xmlhttp.send();
    return xmlhttp.responseText;
}

function loadLoginPage() {
    document.getElementById("content").innerHTML = loadPage("template/login.html");
    const logButton = document.getElementById("log-button");
    addEventListener(logButton, "click", login);
}

function addEventListener(element, eventType, callback) {
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
    initHangman();
    alertMessage();

}

function loggedInUser(user) {
    localStorage.setItem("loggedUser", JSON.stringify(user));
}

function loadHangmanPage() {
    const hangman = document.getElementById("content");
    hangman.innerHTML = loadPage("template/hangman-game.html");

}

