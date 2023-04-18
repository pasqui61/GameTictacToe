let editedPlayer = 0;
const players = [
    {
        name: "",
        symbol: "X"
    },
    {
        name: "",
        symbol: "O"
    },
];

// listener click edit
const buttonEdit1 = document.getElementById("button-edit1");
let listenButtonEdit1 = buttonEdit1.addEventListener("click", clickEdit);
const buttonEdit2 = document.getElementById("button-edit2");
let listenButtonEdit2 = buttonEdit2.addEventListener("click", clickEdit);
// display click edit
const windowsBg = document.getElementById("window-background");
function clickEdit(event) {
    editedPlayer = +event.target.dataset.playerid;
    windowsBg.style.display = "block";
};

//button cancel
const buttonCancel = document.getElementById("button-cancel-name");
const listenButtonCancel = buttonCancel.addEventListener("click", backEdit);

let inputEditName = document.getElementById("input-window-name");

function backEdit() {
    windowsBg.style.display = "none";
};

// save name player config1 + textcontent name
let formElement = document.getElementById("save-form");
formElement.addEventListener("submit", savePlayerConfig);

function savePlayerConfig(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    let enteredPlayerName = formData.get('playername').trim();

    if (!enteredPlayerName) {
        alert("please enter a valid name !");
        return;
    } else {
        windowsBg.style.display = "none"
        const updatedPlayerDataElement = document.getElementById("player-" + editedPlayer + "-data");
        updatedPlayerDataElement.children[1].textContent = enteredPlayerName;
        players[editedPlayer - 1].name = enteredPlayerName;
        inputEditName.value = "";
    };
};
// button start game
const buttonStart = document.getElementById("button-start");
let listenButtonStart = buttonStart.addEventListener("click", startGame);
const windowGame = document.getElementById("window-game");
const sectionPlayer = document.querySelector(".section-player");
let buttonBottomStart = document.getElementById("button-bottom");
const buttonReset = document.getElementById("button-reset");

function startGame() {
    if (players[0].name === "" || players[1].name === "") {
        alert("please set custom player names for both players!")
        return;
    } else {
        windowGame.style.display = "block";
        sectionPlayer.style.display = "none";
        buttonBottomStart.style.backgroundColor = "rgba(29, 26, 27, 0.735)";
        turnName.textContent = players[0].name.toUpperCase();
        buttonStart.style.display = "none";
        buttonReset.style.display = "block";
        buttonReset.addEventListener("click", resetGameStatus);
    }
};

// Game Logic
let windowWinner = document.getElementById("winner");
// declaration of counts of winners
let winnerCountOut1 = document.getElementById("win-count1");
let winnerCountOut2 = document.getElementById("win-count2");
let helperCount = [winnerCountOut1, winnerCountOut2];
helperCount[0].style.color = "MediumAquaMarine";
helperCount[1].style.color = "MediumAquaMarine";

let turnName = document.getElementById("turn-name");
let activePlayer = 0;
let gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];
function switchPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
};
// for of grid-container
let inputDivTic = document.querySelectorAll(".input-tic-tac");
for (let inputDivTicTac of inputDivTic) {
    inputDivTicTac.addEventListener("click", logicSymbol);
};
// main logic game
function logicSymbol(event) {
    const selectedColumn = event.target.dataset.col - 1;
    const selectedRow = event.target.dataset.row - 1;
    if (gameData[selectedRow][selectedColumn] > 0) {
        alert("select an empty field!");
        return;
    }
    event.target.textContent = players[activePlayer].symbol;
    event.target.style.backgroundColor = " rgba(178, 176, 46, 0.589)";
    gameData[selectedRow][selectedColumn] = activePlayer + 1;

    switchPlayer();
    turnName.textContent = players[activePlayer].name.toUpperCase();

    //    winner game
    let winnerId = checkGameOver();
    currentRound++;
    let nameWinner = document.querySelector("#winner-id");
    // let winnerCount = document.querySelector("#player-" + winnerId + "-data .winner-count");
    let winnerCount1 = document.querySelector("#player-1-data .winner-count");
    let winnerCount2 = document.querySelector("#player-2-data .winner-count");

    if (winnerId > 0) {
        nameWinner.textContent = "The winner is_ _" + players[winnerId - 1].name.toUpperCase()
        sameLayoutFinish();
        buttonReset.addEventListener("click", resetGameStatus);
        if (winnerId === 1) {
            helperCount[0]++;
            winnerCount1.textContent = helperCount[0];
        }
        else if (winnerId === 2) {
            helperCount[1]++;
            winnerCount2.textContent = helperCount[1];

        }

    } else if (winnerId === -1) {
        nameWinner.textContent = "It's a Draw!";
        sameLayoutFinish()
        buttonReset.addEventListener("click", resetGameStatus);
        buttonReset.style.display = "block";

    };
};

// function layout css x winnerWindows
function sameLayoutFinish() {
    windowWinner.style.display = "block";
    windowGame.style.paddingLeft = "190px";
    document.getElementById("paragraph-turn-name").style.display = "none";
    document.getElementById("grid-container").style.marginTop = "60px";
};

function resetGameStatus() {
    activePlayer = 0;
    currentRound = 1;
    windowWinner.style.display = "none";
    windowGame.style.display = "none";
    buttonStart.style.display = "block";
    buttonReset.style.display = "none";
    windowGame.style.paddingLeft = "0";
    sectionPlayer.style.display = "flex";
    buttonBottomStart.style.backgroundColor = "azure";
    for (let inputDivTicTac of inputDivTic) {
        inputDivTicTac.style.backgroundColor = "rgba(240, 239, 179, 0.589)";
    };
    let gridContainerIndex = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameData[i][j] = 0;
            let gridContainerItems = inputDivTic[gridContainerIndex];
            gridContainerItems.textContent = "";
            gridContainerIndex++
        }
    }
    document.getElementById("paragraph-turn-name").style.display = "block";
    turnName.textContent = players[activePlayer].name.toUpperCase();
    document.getElementById("grid-container").style.marginTop = "0px"
}

// logic for winner
let currentRound = 1;
function checkGameOver() {
    //   checking the row for equality
    for (let i = 0; i < 3; i++) {
        if (gameData[i][0] > 0 &&
            gameData[i][0] === gameData[i][1] &&
            gameData[i][1] === gameData[i][2]
        ) {
            return gameData[i][0];
        }
    }
    //   checking the column for equality
    for (let i = 0; i < 3; i++) {
        if (gameData[0][i] > 0 &&
            gameData[0][i] === gameData[1][i] &&
            gameData[0][i] === gameData[2][i]
        ) {
            return gameData[0][i];
        }
    }
    // diagonal: top left to bottom right
    if (gameData[0][0] > 0 &&
        gameData[0][0] === gameData[1][1] &&
        gameData[1][1] === gameData[2][2]
    ) {
        return gameData[0][0];
    }
    // diagonal: Bottom left to top right
    if (gameData[2][0] > 0 &&
        gameData[2][0] === gameData[1][1] &&
        gameData[1][1] === gameData[0][2]
    ) {
        return gameData[2][0];
    }
    if (currentRound === 9) {
        return -1;
    }
    return 0;
};



