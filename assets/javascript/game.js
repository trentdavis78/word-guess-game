var puzzles =           // Word list
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
var puzzleCategories = [
        "NFL Team Mascots",
        "NFL Team Mascots",
        "NFL Team Mascots",
        "NFL Team Mascots",
        "NFL Team Mascots",
        "NFL Team Mascots",
        "NFL Team Mascots",
        "NFL Team Mascots",
        "NFL MVP Last Names",
        "NFL MVP Last Names",
        "NFL MVP Last Names",
        "NFL MVP Last Names",
        "NFL MVP Last Names",
        "NFL MVP Last Names",
        "NFL MVP Last Names",
        "NFL MVP Last Names"
        
];
var allowedMisses = 10;            

var guessedLetters = [];       
var puzzleIndex;           
var guessingWord = [];         
var remainingGuesses = 0;      
var gameStarted = false;        
var hasFinished = false;         
var wins = 0;                   
var hints = 3;
// reset game variables
function resetGame() {
    remainingGuesses = allowedMisses;
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
    document.getElementById("category").innerHTML = puzzleCategories[puzzleIndex];
     // update the HTML
    updateDisplay();
    
};
function updateDisplay() {
    document.getElementById("score").innerText = wins;
    document.getElementById("hint").innerHTML = hints;
    document.getElementById("puzzleContent").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("puzzleContent").innerText += guessingWord[i];
    }
    document.getElementById("miss").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if(remainingGuesses <= 0) {
        hasFinished = true;       
        gameStarted = false;
        wins = 0;   
        hints = 3;
        document.getElementById('gameOver-splash').classList.remove("hidden");
        document.getElementById('game').classList.add("opacity-1");
        document.getElementById('game').classList.remove("opacity-f");
        document.getElementById('hintButton').disabled = true;
        document.getElementById('hintButton').classList.remove("pulse");    
        
    }
    if(hints == 0){
        setTimeout(function(){  document.getElementById('hintButton').disabled = true }, 100);         
        document.getElementById('hintButton').classList.remove("pulse");  
    }    
};
document.onkeydown = function(event) {
    // If we finished a game, dump one keystroke and reset.
    if(gameStarted == false ) {
        document.getElementById('splash').classList.add("hidden");
        document.getElementById('win-splash').classList.add("hidden");
        document.getElementById('gameOver-splash').classList.add("hidden");
        document.getElementById('game').classList.remove("opacity-1");
        document.getElementById('game').classList.add("opacity-f");
        document.getElementById('hintButton').disabled = false;
        document.getElementById('hintButton').classList.add("pulse");    
        resetGame();
        updateDisplay();
    } 
        if(hasFinished) {            
            resetGame();            
            hasFinished = false;
        } else {
            // Check to make sure a valid letter was pressed
            if(event.keyCode >= 65 && event.keyCode <= 90) {
                makeGuess(event.key.toLowerCase());
            }
      }   
};
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
    checkWin();
    updateDisplay();
   
};
// evaluate letter pressed
function evaluateGuess(letter) {
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
function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        wins++;
        hasFinished = true;
        showWin();
    }
};
function showWin() {
    document.getElementById('win-splash').classList.remove("hidden");
    document.getElementById('game').classList.add("opacity-1");
    document.getElementById('game').classList.remove("opacity-f");
    document.getElementById('hintButton').disabled = true;
    document.getElementById('hintButton').classList.remove("pulse");    
    gameStarted = false;    
}
function runHint() {  
        hints--;
        document.getElementById("hint").innerHTML = hints;
        // update hint        
        document.getElementById("hintBody").innerHTML = puzzleHints[puzzleIndex][hints];
        updateDisplay()
}