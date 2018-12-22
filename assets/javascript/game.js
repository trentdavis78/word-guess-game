// puzzle list
var puzzles =          
    [
        "eagles",
        "cowboys",
        "giants",
        "redskins",
        "patriots",
        "bills",
        "jets",
        "dolphins",
        "brady",
        "manning",
        "sanders",
        "rodgers",
        "davis",
        "young",
        "rice",
        "faulk"
    ];
// puzzle hints
var puzzleHints = [
        ["Philadelphia", "NFC East Team", "Super Bowl LII Champions"],
        ["Dallas", "NFC East Team", "Super Bowl XXX Champions"],
        ["New York", "NFC East Team", "Super Bowl XLVI Champions"],
        ["Washington", "NFC East Team", "Super Bowl XXVI Champions"],
        ["New England", "AFC East Team", "Super Bowl LI Champions"],
        ["Buffalo", "AFC East Team", "Lost 52-17 in a Super Bowl"],
        ["New York", "AFC East Team", "Super Bowl III Champions"],
        ["Miami", "AFC East Team", "Super Bowl VIII Champions"],
        ["Tom", "Patriots QB", "2007, 2010, 2017 NFL MVP"],
        ["Peyton", "Colts QB", "2004, 2008, 2009 NFL MVP"],
        ["Barry", "Detroit RB", "1997 NFL MVP"],
        ["Aaron", "Packers QB", "2011, 2014 NFL MVP"],
        ["Terrell", "Broncos RB", "1998 NFL MVP"],
        ["Steve", "49ers QB", "1992, 1994 NFL MVP"],
        ["Jerry", "49ers WR", "1987 NFL MVP"],
        ["Marshall", "Rams RB", "2000, 2001 NFL MVP"]
];
// puzzle categories
var puzzleCategories = [
        "NFL Team Names",
        "NFL Team Names",
        "NFL Team Names",
        "NFL Team Names",
        "NFL Team Names",
        "NFL Team Names",
        "NFL Team Names",
        "NFL Team Names",
        "NFL MVP Last Names",
        "NFL MVP Last Names",
        "NFL MVP Last Names",
        "NFL MVP Last Names",
        "NFL MVP Last Names",
        "NFL MVP Last Names",
        "NFL MVP Last Names",
        "NFL MVP Last Names"        
];
// global game variables
var allowedMisses = 10;
var guessedLetters = [];       
var puzzleIndex;           
var guessingWord = [];         
var remainingGuesses = 0;      
var gameStarted = false;        
var gameIsOver = false;         
var wins = 0;                   
var hints = 3;
// DOM variables
var DOMGame = document.getElementById('game');
var DOMScore =  document.getElementById("score");
var DOMHint = document.getElementById("hint");
var DOMPuzzleContent = document.getElementById("puzzleContent");
var DOMCategory = document.getElementById("category");
var DOMMiss = document.getElementById("miss");
var DOMGuessedLetters = document.getElementById("guessedLetters");
var DOMHintButton = document.getElementById('hintButton');
var DOMSplash = document.getElementById('splash');
var DOMGameOverSplash = document.getElementById('gameOver-splash');
var DOMWinSplash = document.getElementById('win-splash');
var DOMHintBody = document.getElementById("hintBody");
// function to reset game variables
function resetGame() {
    // set remainingGuesses to the initial amount of allowedMisses
    remainingGuesses = allowedMisses;
    // set gameStarted to true
    gameStarted = true;
    // set the puzzleIndex to a random number within our puzzle array
    puzzleIndex = Math.floor(Math.random() * (puzzles.length));
    // clear arrays
    guessedLetters = [];
    guessingWord = [];
    // create our puzzle word with blanks
    for (var i = 0; i < puzzles[puzzleIndex].length; i++) {
        guessingWord.push("_");
    }
    DOMCategory.innerHTML = puzzleCategories[puzzleIndex];
     // update the HTML
    updateDisplay();
    
};
function updateDisplay() {
    // update HTML to amount of hints and wins
    DOMScore.innerText = wins;
    DOMHint.innerHTML = hints;
    // clear puzzleContent text
    DOMPuzzleContent.innerText = "";
    // loop through guessingWord array and update puzzleContent
    for (var i = 0; i < guessingWord.length; i++) {
        DOMPuzzleContent.innerText += guessingWord[i];
    }
    // update remainingGuesses
    DOMMiss.innerText = remainingGuesses;
    // update Letters Picked HTML
    DOMGuessedLetters.innerText = guessedLetters;
    // end game and clear wins/hints if remainingGuesses = 0
    if(remainingGuesses <= 0) {
        gameIsOver = true;       
        gameStarted = false;
        wins = 0;   
        hints = 3;
        DOMGameOverSplash.classList.remove("hidden");
        DOMGame.classList.add("opacity-1");
        DOMGame.classList.remove("opacity-f");
        DOMHintButton.disabled = true;
        DOMHintButton.classList.remove("pulse");    
        
    }
    // if out of hints, wait 500 miliseconds to disable hintButton
    if(hints == 0){
        setTimeout(function(){  DOMHintButton.disabled = true }, 100);         
        DOMHintButton.classList.remove("pulse");  
    }    
};
document.onkeydown = function(event) {
    // if game is finihed, reset 
    if(gameStarted == false ) {
       DOMSplash.classList.add("hidden");
      DOMWinSplash.classList.add("hidden");
       DOMGameOverSplash.classList.add("hidden");
        DOMGame.classList.remove("opacity-1");
        DOMGame.classList.add("opacity-f");
        DOMHintButton.disabled = false;
        DOMHintButton.classList.add("pulse");    
        resetGame();
        updateDisplay();
    } 
        if(gameIsOver) {            
            resetGame();            
            gameIsOver = false;
        } else {
            // Check to make sure a valid letter was pressed
            if(event.keyCode >= 65 && event.keyCode <= 90) {
                makeGuess(event.key.toLowerCase());
            }
      }   
};
// push letter picked into the guessedLetters array and trigger the evaluate guess function
function makeGuess(letter) {    
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    // check if game is won and update the display
    checkWin();
    updateDisplay();
   
};
// evaluate letter pressed
function evaluateGuess(letter) {
    // evaluate whether letter pressed is in the puzzleIndex
    var positions = [];
    for (var i = 0; i < puzzles[puzzleIndex].length; i++) {
        if(puzzles[puzzleIndex][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        remainingGuesses--;
    } else {
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};
// evaluate whether game is won
function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        wins++;
        gameIsOver = true;
        showWin();
    }
};
function showWin() {
    // show the You Win splash screen
    DOMWinSplash.classList.remove("hidden");
    DOMGame.classList.add("opacity-1");
    DOMGame.classList.remove("opacity-f");
    DOMHintButton.disabled = true;
    DOMHintButton.classList.remove("pulse");    
    gameStarted = false;    
}
// triggered when the hintButton is pressed
function runHint() {  
        hints--;
        DOMHint.innerHTML = hints;
        // update hint        
        DOMHintBody.innerHTML = puzzleHints[puzzleIndex][hints];
        updateDisplay()
}