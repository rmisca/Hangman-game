function  initHangman() {
    const letters = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
    let randomWord = generateRandomWord();
    let lettersPressed = [];

    let bodyParts=["head", "body", "left-hand", "right-hand", "left-foot", "right-foot"];

    let bodyPartsForReset=["head", "body", "left-hand", "right-hand", "left-foot", "right-foot"];

    const blink = setInterval(blinkEyes, 700);

    function generateRandomWord() {
        const randomWords  = ["rom", "inghetata", "dezastru", "relaxare", "generator", "marinimie", "import", "cascat", "noptiera", "exasperare", "lent", "platforma", "prajitura", "dezvoltator", "disperare", "frigider", "ceasornicar", "soare", "sistem", "nepot"];
        return randomWords[Math.floor(Math.random()*randomWords.length)].toUpperCase();
    }

    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = hideWordLetters();
    resetButton();

    function hideWordLetters () {
        let hiddenString = "";
        hiddenString += randomWord.charAt(0);
        const lastLetter = randomWord.charAt(randomWord.length - 1);
        const firstLetter = randomWord.charAt(0);
        const newArrayOnTheWay = randomWord.split("");
        for (let i = 1; i < newArrayOnTheWay.length - 1; i++) {
            if (newArrayOnTheWay[i] === firstLetter || newArrayOnTheWay[i] === lastLetter) {
                hiddenString += newArrayOnTheWay[i];
            } else {
                hiddenString += "_";
            }
        }
        hiddenString += lastLetter;
        return hiddenString;
    }

    function initGame() {
        //const temp = get template element
        const temp = document.getElementById("btn-template");
        temp.innerHTML = "";
        for(let i = 0; i < letters.length; i++) {
            const btnLetter = document.createElement("button");
            btnLetter.className += "btn btn-primary mr-2 ro-button";

            // disables first and last letter from the alphabet
            if (returnFirstAndLastLetter(randomWord).indexOf(letters[i]) > -1) {
                btnLetter.setAttribute("disabled", true)
            }
            btnLetter.innerHTML = letters[i];
            temp.appendChild(btnLetter);
            btnLetter.addEventListener("click", letterClicked);
        }
    }



    function toggleMessage(show, messageClass, messageText) {
        const showMessage = document.getElementById("alert-message");
        if (show) {
            showMessage.classList.remove("hide");
            showMessage.classList.add(messageClass);
            showMessage.innerHTML = messageText;
        } else {
            showMessage.classList.add("hide");
            showMessage.classList.remove(messageClass);
        }
    }

    function letterClicked(ev) {
        const elementClicked = ev.srcElement;
        if(randomWord.indexOf(elementClicked.innerHTML) > -1) {
            showLetterInWord(elementClicked);
        } else {
            // show a body part on the screen
            wrongLetterClicked(elementClicked);
        }
    }

    function wrongLetterClicked (elPressed) {
        const bodyPartToShow = document.getElementById(bodyParts[0]);
        bodyPartToShow.classList.remove("hide");
        bodyParts.shift();
        if (bodyParts.length === 0) {
            // showFailed();
            toggleMessage(true, "alert-danger", "Ai pierdut!");
            toggleAllOptions(true);
        }
        elPressed.setAttribute("disabled", true);
    }


    function returnFirstAndLastLetter(word) {
        return [word.charAt(0), word.charAt(word.length - 1)];
    }


    function showLetterInWord(elementClicked) {
        const wordSplit = randomWord.split("");
        const firstLetter = randomWord.charAt(0);
        const lastLetter = randomWord.charAt(randomWord.length - 1);
        let emptyString = firstLetter;
        for (let i = 1; i < wordSplit.length - 1; i++) {
            if (wordSplit[i] === firstLetter || wordSplit[i] === lastLetter || elementClicked.innerHTML === wordSplit[i] || lettersPressed.indexOf(wordSplit[i]) > -1) {
                emptyString += wordSplit[i];
            } else {
                emptyString += "_";
            }
        }
        emptyString += lastLetter;
        wordContainer.innerHTML = emptyString;
        lettersPressed.push(elementClicked.innerHTML);
        elementClicked.setAttribute("disabled", true);
        if (emptyString.indexOf("_") === -1) {
            // showSuccess();
            toggleMessage(true, "alert-success", "Ai castigat");
            toggleAllOptions(true);
        }
    }

    function resetButton() {
        const buttonReset = document.getElementById("btn-reset-game");
        buttonReset.addEventListener("click", resetPage);
    }

    function resetPage() {
        randomWord = generateRandomWord();
        wordContainer.innerHTML = hideWordLetters();
        for (let i = 0; i < bodyPartsForReset.length ; i++) {
            const bodyPartsForResetVar = document.getElementById(bodyPartsForReset[i]);
            bodyPartsForResetVar.classList.add("hide");
        }
        lettersPressed = [];
        bodyParts = JSON.parse(JSON.stringify(bodyPartsForReset));
        toggleMessage(false, "alert-success");
        toggleMessage(false, "alert-danger");
        toggleAllOptions(false);
        initGame();
    }

    function toggleAllOptions(isDisabled) {
        const buttons = document.getElementsByClassName("ro-button");
        for (let i = 0; i < buttons.length; i++) {
            if ( isDisabled) {
                buttons[i].setAttribute("disabled", isDisabled);
            } else  {
                buttons[i].removeAttribute("disabled");

            }
        }
    }

    function blinkEyes() {
        let rightEye = document.getElementById("right-eye");
        let leftEye = document.getElementById("left-eye");
        rightEye.style.height = rightEye.offsetHeight == 7 ? "3px" : "7px";
        leftEye.style.height = leftEye.offsetHeight == 7 ? "3px" : "7px";
    }
    initGame();
}

function alertMessage() {
    const getMessage = document.getElementById("message");
    getMessage.innerHTML = "Buna " +  JSON.parse(localStorage.loggedUser).username;
}