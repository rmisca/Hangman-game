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
        generateTable();
        generalTable();
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
            increaseLosingGames();
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
        const loggedInUser = JSON.parse(localStorage.loggedUser);
        const currentUsersStatistics = localStorage.currentUsersStatistics
            ? JSON.parse(localStorage.currentUsersStatistics)
            : {};
        const statisticsForCurrentUser = currentUsersStatistics[loggedInUser.username];
        if (statisticsForCurrentUser) {
            const gamesWon = statisticsForCurrentUser.gamesWon ? statisticsForCurrentUser.gamesWon + 1 : 1;
            currentUsersStatistics[loggedInUser.username].gamesWon = gamesWon;
            currentUsersStatistics[loggedInUser.username].gamesLost = currentUsersStatistics[loggedInUser.username].gamesLost || 0;
            localStorage.currentUsersStatistics = JSON.stringify(currentUsersStatistics);
        } else {
            currentUsersStatistics[loggedInUser.username] = {
                gamesWon: 1,
            }
            currentUsersStatistics[loggedInUser.username].gamesLost = currentUsersStatistics[loggedInUser.username].gamesLost || 0;
            localStorage.setItem("currentUsersStatistics", JSON.stringify(currentUsersStatistics));
        }
        generateTable();
        generalTable()
    }

    function increaseLosingGames() {
        const loggedInUser = JSON.parse(localStorage.loggedUser);
        const currentUsersStatistics = localStorage.currentUsersStatistics
            ? JSON.parse(localStorage.currentUsersStatistics)
            : {};
        const statisticsForCurrentUser = currentUsersStatistics[loggedInUser.username];
        if (statisticsForCurrentUser) {
            const gamesLost = statisticsForCurrentUser.gamesLost ? statisticsForCurrentUser.gamesLost + 1 : 1;
            currentUsersStatistics[loggedInUser.username].gamesLost = gamesLost;
            currentUsersStatistics[loggedInUser.username].gamesWon = currentUsersStatistics[loggedInUser.username].gamesWon || 0;
            localStorage.currentUsersStatistics = JSON.stringify(currentUsersStatistics);
        } else {
            currentUsersStatistics[loggedInUser.username] = {
                gamesLost: 1,
            }
            currentUsersStatistics[loggedInUser.username].gamesWon = currentUsersStatistics[loggedInUser.username].gamesWon || 0;
            localStorage.setItem("currentUsersStatistics", JSON.stringify(currentUsersStatistics));
        }
        generateTable();
        generalTable()
    }

    function showLocalStorageResults() {
        const loggedInUserResult = JSON.parse(localStorage.loggedUser);
        const userStatistics = JSON.parse(localStorage.currentUsersStatistics)[loggedInUserResult.username];
        const showLocalStorage = userStatistics
            ? userStatistics
            : {
                gamesWon: 0,
                gamesLost: 0
            };
        return showLocalStorage;
    }
    sortObjectByProperty({}, "gamesWon");
    function sortObjectByProperty(data, property) {
        let sorted = {};

        Object
            .keys(data).sort( (a, b) => {
            return data[b][property] - data[a][property];
        })
            .forEach(key => {
                sorted[key] = data[key];
            });
        return sorted;

    }

    /**
     * function used for generating statistics users
     */
    function generateTable() {
        // get the reference for the body
        const tableWrapper = document.getElementById("table-wrapper");

        // creates a <table> element and a <tbody> element
        const tbl = document.createElement("table");
        tbl.className += "table-info table-borderd table-score";
        const tblHead = document.createElement("thead");
        tblHead.className += "table-dark";
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

            const statisticsForCurrentUser = showLocalStorageResults();
            const statisticKeys = ["gamesWon", "gamesLost"];
            for (let j = 0; j < statisticKeys.length; j++) {
                // Create a <td> element and a text node, make the text
                // node the contents of the <td>, and put the <td> at
                // the end of the table row
                const cell = document.createElement("td");
                // const numberGame =
                const cellText = document.createTextNode(statisticsForCurrentUser[statisticKeys[j]]);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            // add the row to the end of the table body
            tblBody.appendChild(row);
        }
        tbl.appendChild(tblHead);
        // put the <tbody> in the <table>
        tbl.appendChild(tblBody);
        // sets the border attribute of tbl to 2;
        tbl.setAttribute("border", "2");
        // appends <table> into <body>
        tableWrapper.innerHTML = tbl.outerHTML;
    }

    function generalTable() {
        const tableRaking = document.getElementById("table-raking");
        const tbl = document.createElement("table");
        tbl.className += "table-info table-borderd table-score";
        const tblHead = document.createElement("thead");
        tblHead.className += "table-dark";
        const trh = document.createElement("tr");
        const tblBody = document.createElement("tbody");
        const tableHeaders = ["Pozitia", "Nume jucator", "Jocuri castigate", "Jocuri pierdute"];

        for (let m = 0; m < tableHeaders.length; m++) {
            const th = document.createElement("th");
            const text = document.createTextNode(tableHeaders[m]);
            th.appendChild(text);
            trh.appendChild(th);
        }
        tblHead.appendChild(trh);

        const usersStatistics = JSON.parse(localStorage.currentUsersStatistics);
        const sortedStatistics = sortObjectByProperty(usersStatistics, "gamesWon");
        const usersStatisticsKeys = Object.keys(sortedStatistics);
        for (let n = 0; n < usersStatisticsKeys.length; n++) {
            const row = document.createElement("tr");

            //     // Create a <td> element and a text node, make the text
            //     // node the contents of the <td>, and put the <td> at
            //     // the end of the table row
            const rowData = [n + 1, usersStatisticsKeys[n], usersStatistics[usersStatisticsKeys[n]].gamesWon, usersStatistics[usersStatisticsKeys[n]].gamesLost];
            for (let o = 0; o < rowData.length; o++) {
                createCell(rowData[o], row);
            }
            // add the row to the end of the table body
            tblBody.appendChild(row);
        }
        tbl.appendChild(tblHead);
        // put the <tbody> in the <table>
        tbl.appendChild(tblBody);
        // sets the border attribute of tbl to 2;
        tbl.setAttribute("border", "2");
        // appends <table> into <body>
        tableRaking.innerHTML = tbl.outerHTML;

    }

    function createCell(textValue, row) {
        const cell = document.createElement("td");
        const cellText = document.createTextNode(textValue);
        cell.appendChild(cellText);
        row.appendChild(cell);
    }

    initGame();
}


function alertMessage() {
    const getMessage = document.getElementById("message");
    getMessage.innerHTML = "Buna " +  JSON.parse(localStorage.loggedUser).username;
}






