//  TO DOs
//  change alert to start game button
//  stop game on win or loss
//  check the guess counter seem to miss some key presses


alert("Press any key to get started!")

// define places in HTML that get updated. 
var wordDiv = document.getElementById("guessableWord");
var guessesDiv = document.getElementById("guesses");
var placeholderDiv = document.getElementById("placeholder");
var guesswordDiv = document.getElementById("guessword");
var numberOfGuesses = document.getElementById("numberOfGuesses");
var gameStatusDiv = document.getElementById("gameStatus");

// VARIABLES

// all possible words in the game
var guessableWords = ["pizza","love","good","bad"];
// pick the word you're trying to guess from list of available words above
var guessWord = guessableWords[Math.floor(Math.random() * guessableWords.length)];
// you get one turn per letter in the word
var guessTurns = guessWord.length;
// each letter user guesses.
var guesses = [];
// set a variable to keep track of how many bad guesses;
var badGuesses = 0;
// letters in this array are removed with each correct guess. This helps decide if you won.
var letters = [];
// setup a variable to keep track of bad guesses
var remainingGuesses = 0;

// turn the guessWord into an array called letters for logic later
letters = guessWord.split('');
guessWordArray = guessWord.split('');


// This function is run whenever the user presses a key. Identify key and send to guesses array.
document.onkeyup = function(guessLetter) {
    // Determine which key was pressed and sets userGuess to that key
    var userGuess = guessLetter.key.toLowerCase();
    // Add guess to guesses array
    guesses.push(userGuess);

    // keep track of how many guess you have left. 
    var remainingGuesses = guessTurns - badGuesses;
    // show the number of guesses remaining. 
    guessesDiv.innerHTML = "You have " + remainingGuesses + " guesses remaining.";

    // if the number of turns equals the number of letters in the word, game over. Minus -1 to make up for first guess before incrementing.
    if (remainingGuesses === 0) {
        gameStatusDiv.innerHTML = "GAME OVER";
        guesswordDiv.style.display = "none"; 
    }
    // if the guessed letter is included in the array of letters in the word, that's a good guess.
    else if (letters.includes(userGuess)) {
        // removes good guessed letters from array, this helps if there are duplicate letters.
        for( var i = 0; i < letters.length; i++){ 
            if ( letters[i] == userGuess) {
                letters.splice(i, 1);
            }
        };
        // if there are no more letters to guess, you've won!
        if (letters.length === 0) {
            gameStatusDiv.textContent = "YOU WIN";
        }
    }
    // there must be more letters and turns to get here... keep guessing. 
    else {
        badGuesses = badGuesses + 1;
    };
    placeholderDiv.style.display = "none";
    guesswordDiv.style.display = "block";

    printLetters();
};


// if the letters in the guessWord are present in the letters array, 
// then they have not been guessed and should not be displayed
function printLetters() {
    listLetters = "<ul>";
    guessWordArray.forEach(function(aLetter) {
        if (guesses.includes(aLetter)) {
            listLetters += "<li>" + aLetter + "</li>";
        }
        else {
            listLetters += "<li>" + " __ " + "</li>";            
        }
    });
    listLetters += "</ul>"
    document.getElementById("guessword").innerHTML = listLetters;
};
printLetters();
placeholderDiv.style.display = "block";

