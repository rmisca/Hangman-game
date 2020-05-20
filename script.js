var letters = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

//const temp = get template element
const temp = document.getElementById("btn-template");
for(let i = 0; i < letters.length; i++) {
    // const btnModel = document.createElement("button");-> <button class="..." ></button>
    //btnModel.addClass = "btn, bnta"
    // add btn text -> btnModel.innerHTML = letters[i]
    // add above button into template -> temp.innerHtml = btnModel;
    // btnModel.addEventListener("click", letterClicked(letters[i]))

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

var randomWord = "rom".toUpperCase();


function hideWordLetters (word) {
    let hiddenString = "";
    hiddenString += word.charAt(0);
    lastLetter = word.charAt(word.length - 1)
    let wordWithoutFirstAndLastLetter = word.substr(1).substr(1, word.length - 1);
    wordWithoutFirstAndLastLetter = wordWithoutFirstAndLastLetter.replace(/[a-z]/gi, '_')
    word.replace("_", "$")
    hiddenString += wordWithoutFirstAndLastLetter + lastLetter;

    return hiddenString;
}
const wordContainer = document.getElementById("word-container");
wordContainer.innerHTML = '<span>' + hideWordLetters(randomWord) + '</span>';

function wrongLetterClicked () {
    const head = document.getElementById("head");
    const neck = document.getElementById("neck");
    head.classList.remove("hide");
    neck.classList.remove("hide");

}