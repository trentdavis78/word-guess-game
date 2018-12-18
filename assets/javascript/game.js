//variables = solution array, win total, miss total
var DOMGame = document.getElementById('game');
var DOMSplash = document.getElementById('splash');
var DOMScore = document.getElementById('score');
var DOMMiss = document.getElementById('miss');
var DOMHint = document.getElementById('hint');
var DOMHintButton = document.getElementById('hintButton');

var score = 0;
var miss = 0;
var hint = 3;


// Splash page w/ 'press any key to continue' event listener
document.onkeydown = function(e) {
    DOMSplash.classList.add("hidden");
    DOMGame.classList.remove("opacity-1");
    DOMGame.classList.add("opacity-f");
    DOMHintButton.classList.add("pulse");
    start();
}

// reset game to defaults and start game
function start() {
    DOMHint.innerHTML = hint;
}

// onkeypress event function --> check if letter pressed is in the solution,
// if it is, show letter, if not increment miss total

// check if miss total = 6, if so end game
// check if solved, if so end game
// else fire onkeypress event function again

//game reset function
function reset() {
    score = 0;
    miss = 0;
    hint = 3;
    DOMHint.innerHTML = hint;
}