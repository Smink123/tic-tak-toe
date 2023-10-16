//we have the user names, their player num and their counter (X or 0)

//start off by implimenting a round. This consists of picking a square by clicking and changing it's text content to X/O
//once that square has been picked, it needs to be disabled so it can no longer be clicked on.
//Then, the locating of that div needs to be noted, and the result array needs to have the previous result marked. esult array will contain 3 nested arrays
//every round (as in each individual player round), it needs to be looped through and compared against the logic to see if a winner has been determined yet. If it has - game over, and a point is incrimented for the winner. if not, next round continues


const player1Name = document.getElementById('player1Name');
const player2Name = document.getElementById('player2Name');
const submitName1 = document.getElementById('submitOneName');
const submitName2 = document.getElementById('submitTwoName');
const startAgain = document.getElementById('startAgain')
const playerElements = document.getElementsByClassName('player');
const player1Profile = playerElements[0].querySelector('h3');
const player2Profile = playerElements[1].querySelector('h3');
const player1Counter = playerElements[0].querySelector('h4');
const player2Counter = playerElements[1].querySelector('h4');
const squares = document.querySelectorAll('.gameSquare'); // Use '.gameSquare' for the class selector
const gameContainer = document.getElementById('gameContainer')

let gameDisabled = true;

function userName(userInput) {
    const name = userInput.value;
    return name;
}

function createPlayer(name, counter, playerNum) {
    return {
        name,
        counter,
        playerNum,
        playerProfile: function() {
            return `Player ${this.playerNum}: ${this.name}`
        },
        playerCounter: function() {
            return `You are <br> ${this.counter}`
        }
    };
}

let player1 = {};
let player2 = {};

const userRegEx = /\w+/;

let validNameCount = 0;

submitName1.addEventListener('click', function() {
    player1 = createPlayer(userName(player1Name), 'X', 1);
    if (userRegEx.test((player1.name))) {
        submitName1.style.display = 'none';
        player1Name.style.display = 'none';
        player1Profile.style.display = 'block';
        player1Profile.textContent = player1.playerProfile();
        player1Counter.style.display = 'block';
        player1Counter.innerHTML = player1.playerCounter();
        
        validNameCount++; 

        if (validNameCount === 2) {
            gameDisabled = false;
        }
    }
});

submitName2.addEventListener('click', function() {
    player2 = createPlayer(userName(player2Name), 'O', 2);
    if (userRegEx.test((player2.name))) {
        submitName2.style.display = 'none';
        player2Name.style.display = 'none';
        player2Profile.style.display = 'block';
        player2Profile.textContent = player2.playerProfile();
        player2Counter.style.display = 'block';
        player2Counter.innerHTML = player2.playerCounter();
        
        validNameCount++;

        if (validNameCount === 2) {
            gameDisabled = false;
        }
    }
});

/*

players are now global!!

let player1Turn = true;
let player2Turn = false;
let goes = 1;

//implement rounds - a function where you can swap out the user info*/


squares.forEach(square => {
    function clickHandler(event) {
        if (gameDisabled === false) {
            console.log(player1.name)
            console.log(player2.counter)
            const clickedElement = event.target;
            const id = clickedElement.id;
            console.log(`Clicked element's id is: ${id}`);
            event.target.textContent = player1.counter;
            square.removeEventListener('click', clickHandler);
            const arrayNum = Number(id[0]);
            const indexNum = Number(id[1]);
            const presentGame = [[, , ], [, , ], [, , ]];
            presentGame[arrayNum][indexNum].push(player1.counter);
            checkXLogic(presentGame)
        }
    }
    square.addEventListener('click', clickHandler);
});

function checkXLogic(array) {
    if ((array[0][0] === 'X' &&
        array[0][1] === 'X' &&
        array[0][2] === 'X') ||
        (array[1][0] === 'X' &&
        array[1][1] === 'X' &&
        array[1][2] === 'X') ||
        (array[2][0] === 'X' &&
        array[2][1] === 'X' &&
        array[2][2] === 'X') ||
       (array[0][0] === 'X' &&
        array[1][0] === 'X' &&
        array[2][0] === 'X') ||
        (array[0][1] === 'X' &&
        array[1][1] === 'X' &&
        array[2][1] === 'X') ||
        (array[0][2] === 'X' &&
        array[1][2] === 'X' &&
        array[2][2] === 'X') ||
        (array[0][0] === 'X' &&
        array[1][1] === 'X' &&
        array[2][2] === 'X') ||
        (array[0][2] === 'X' &&
        array[1][1] === 'X' &&
        array[2][0] === 'X')
    ) {
        return 'wow you won!'
    }
}
/*
const winningCombos = [
    [['X', 'X', 'X'],
     [0, 0, 0], 
     [0, 0, 0]],

    [[0, 0, 0],
     ['X', 'X', 'X'], 
     [0, 0, 0]],

    [[0, 0, 0],
     [0, 0, 0], 
     ['X', 'X', 'X']],

    [['X', 0, 0],
     ['X', 0, 0], 
     ['X', 0, 0]],

    [[0, 'X', 0],
     [0, 'X', 0], 
     [0, 'X', 0]],

    [[0, 0, 'X'],
     [0, 0, 'X'], 
     [0, 0, 'X']],

    [['X', 0, 0],
     [0, 'X', 0], 
     [0, 0, 'X']],

    [[0, 0, 'X'],
     [0, 'X', 0], 
     ['X', 0, 0]],
];*/




startAgain.addEventListener('click', function() {
    [submitName1, submitName2].forEach((element) => element.style.display = 'block');
    [player1Name, player2Name].forEach((element) => {
        element.style.display = 'block';
        element.value = '';
    });
    [player1Profile, player2Profile, player1Counter, player2Counter].forEach((element) => {
        element.style.display = 'none';
        element.textContent = '';
    });
});