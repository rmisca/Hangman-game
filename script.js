var letters = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

//const temp = get template element
const temp = document.getElementById("btn-template");
for(let i = 0; i < letters.length; i++) {
    const btnLetter = document.createElement("button");
    btnLetter.className += "btn btn-default";
    btnLetter.innerHTML = '<span>' + letters[i] +'</span>';
    temp.appendChild(btnLetter);
    btnLetter.addEventListener("click", letterClicked);
}

function letterClicked(ev) {
    const letterPressed = ev.srcElement.innerHTML;
    if(randomWord.indexOf(letterPressed) > -1) {
        console.log("Letter exists")
        // show the letter in the random word
    } else {
        // show a body part on the screen
        wrongLetterClicked();
    }
 }

let bodyParts=["head", "body", "left-hand", "right-hand", "left-foot", "right-foot", "left-eye", "right-eye", "nose", "mouth"];

var randomWord = "ceasornicar".toUpperCase();

function hideWordLetters (word) {
    let hiddenString = "";
    hiddenString += word.charAt(0);
    const lastLetter = word.charAt(word.length - 1);
    const firstLetter = word.charAt(0);
    const newArrayOnTheWay = word.split("");
    for (let i = 1; i < newArrayOnTheWay.length - 1; i++) {
        console.log(newArrayOnTheWay[i]);
        if (newArrayOnTheWay[i] === firstLetter || newArrayOnTheWay[i] === lastLetter) {
            hiddenString += newArrayOnTheWay[i];
        } else {
            hiddenString += "_";
        }
    }
    hiddenString += lastLetter;
    return hiddenString;
}
const wordContainer = document.getElementById("word-container");
wordContainer.innerHTML = '<span>' + hideWordLetters(randomWord) + '</span>';

function wrongLetterClicked () {
    const bodyPartToShow = document.getElementById(bodyParts[0]);
    bodyPartToShow.classList.remove("hide");
    bodyParts.shift();
    if (bodyParts.length === 0) {
    console.log("hka")
    }
}