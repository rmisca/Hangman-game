function  initHangman() {
    const letters = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
    let randomWord = generateRandomWord();
    let lettersPressed = [];

    let bodyParts=["head", "body", "left-hand", "right-hand", "left-foot", "right-foot"];

    let bodyPartsForReset=["head", "body", "left-hand", "right-hand", "left-foot", "right-foot"];


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
            increaseWiningGames();
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
    function increaseWiningGames() {
        // localStorage.usersStatistics = {
        //     "test": {
        //         gamesWon: 0,
        //             gamesLost: 0
        // },
        //     "test2": {
        //         gamesWon: 0,
        //         gamesLost: 0
        //     },
        // }
        // const loggedInUser; // get loggedInUser from localStorage
        // const userStatistics = localStorage.getItem("userStatistics") || {};
        // const gamesWon = userStatistics[loggedInUser.username] ? userStatistics[loggedInUser.username].gamesWon : 0;
    }
    initGame();
}


function alertMessage() {
    const getMessage = document.getElementById("message");
    getMessage.innerHTML = "Buna " +  JSON.parse(localStorage.loggedUser).username;
}

function generate_table() {
    // get the reference for the body
    const body = document.getElementsByTagName("body")[0];

    // creates a <table> element and a <tbody> element
    const tbl = document.createElement("table");
    tbl.className += "table-info table-borderd table-score";
    const tblHead = document.createElement("thead");
    const trh = document.createElement("tr");
    const tblBody = document.createElement("tbody");


    for (let l = 0; l < 2; l++) {
        const th = document.createElement("th");
        const text = l === 0 ? "Jocuri castigate" : "Jocuri pierdute";
        const cellText = document.createTextNode(text);
        th.appendChild(cellText);
        trh.appendChild(th);
    }
    tblHead.appendChild(trh);

    // creating all cells
    for (let i = 0; i < 1; i++) {
        // creates a table row
        const row = document.createElement("tr");

        for (let j = 0; j < 2; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            const cell = document.createElement("td");
            // const numberGame =
            const cellText = document.createTextNode(" hahahahah");
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        // add the row to the end of the table body
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblHead);
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tbl);
    // sets the border attribute of tbl to 2;
    tbl.setAttribute("border", "2");
}
generate_table();

function gameScore () {



}



