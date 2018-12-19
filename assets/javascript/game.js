//variables = solution array, win total, miss total
var DOMGame = document.getElementById('game');
var DOMSplash = document.getElementById('splash');
var DOMScore = document.getElementById('score');
var DOMMiss = document.getElementById('miss');
var DOMHint = document.getElementById('hint');
var DOMHintButton = document.getElementById('hintButton');
var DOMLetters = document.getElementById('letters-picked');
var alpha = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
var lettersPicked = [];

var score = 0;
var miss = 10;
var hint = 3;

var puzzles = ["Eagles", "Brian Dawkins"];
var categories = ["Team Names", "Players"];
var hints = ["Super Bowl LLI Champions", "This 2018 HOF inductee played Safety for the Philadelphia Eagles"];


// Splash page w/ 'press any key to continue' event listener
document.onkeydown = function(e) {
    start();
    DOMSplash.classList.add("hidden");
    DOMGame.classList.remove("opacity-1");
    DOMGame.classList.add("opacity-f");
    DOMHintButton.disabled = false;
    DOMHintButton.classList.add("pulse");    
    // prevent spacebar from scrolling
    if(e.which == 32) {
        return false;
    }
    return;
    
}

function start() {
    // reset game to defaults and start game
    DOMHint.innerHTML = hint;
    DOMScore.innerHTML = "0" + score;
    DOMMiss.innerHTML = miss;
    // pick random number 
    var random = Math.floor(Math.random() * 3 + 1);
    console.log(random);
    
    document.onkeypress = function(e) {
        // check if the key pressed is in the alpha array
        if(alpha.indexOf(e.key) > -1) {
            // check if the key pressed is already in the lettersPicked array
            if(lettersPicked.includes(" " + e.key) !== true) {
                // add key pressed to lettersPicked array
                lettersPicked.push(" " + e.key);
                // print key pressed to Letters Picked div
                DOMLetters.textContent = lettersPicked;
            }
        }
    }
   
    

}

// onkeypress event function --> check if letter pressed is in the solution,
// if it is, show letter, if not increment miss total

// check if miss total is < 10, if so end game
// check if solved, if so end game
// else fire onkeypress event function again

//game reset function
function reset() {
    score = 0;
    miss = 0;
    hint = 3;
    DOMHint.innerHTML = hint;
}