//  TO DOs
//  change alert to start game button
//  stop game on win or loss
//  create some better styling


alert("Press any key to get started!")

// define places in HTML that get updated. 
var gameStatusDiv = document.getElementById("gameStatus");
var guessesDiv = document.getElementById("guesses");
var guessableWordDiv = document.getElementById("guessableWord");
var numberOfGuesses = document.getElementById("numberOfGuesses");

// VARIABLES

// all possible words in the game
var guessableWords = ["pizza","love","good","bad"];

// pick the word you're trying to guess from list of available words above
var guessWord = guessableWords[Math.floor(Math.random() * guessableWords.length)];

// you get one turn per letter in the word
var guessTurns = guessWord.length;

// each letter user guesses.
var guesses = [];

// currentGuess is just the most recent guessed letter
var currentGuess = "x";

// letters in this array are removed with each correct guess. This helps decide if you won.
var letters = [];

// setup a variable to keep track of remaining guesses, start with the number of letters in the word.
var remainingGuesses = guessTurns;

// turn the guessWord into an array called letters, and a holder for the full word
letters = guessWord.split('');
guessWordArray = guessWord.split('');

// when page completely loads, print the word, score and status. 
window.onload = showWord;

// should only run once when page is loaded. 
function showWord() {
    printLetters();
}

// This function is run whenever the user presses a key. Identify key and send to guesses array.
document.onkeyup = function(guessLetter) {
    // Determine which key was pressed and sets userGuess to that key in lowercase
    var userGuess = guessLetter.key.toLowerCase();
    currentGuess = guessLetter.key.toLowerCase();
    // Add guess to guesses array, we'll compare this to the guessable word later
    guesses.push(userGuess);

    checkLetters();
    checkScore();
    printLetters();
};


// after a key is pressed check the letters to see if they are in the word
function checkLetters() {
    // if the guessed letter is included in the letters array, that's a good guess.
    if (letters.includes(currentGuess)) {
        // removes good guessed letters from array.
        for(var i = letters.length; i--;){
            if (letters[i] === currentGuess) letters.splice(i, 1);
        }
    }
    // there must be more letters and turns to get here... keep guessing. 
    else {
        // This must have been a bad guess or we wouldn't get here. So take one from  remaing guesses. 
        remainingGuesses--;
    }
};

function checkScore() {
    // if the number of turns equals the number of letters in the word, game over. 1 to make up for first guess before incrementing.
    if (remainingGuesses <= 0) {
        guessesDiv.style.display = "none"; 
        gameStatusDiv.innerHTML = "GAME OVER LOOSER";
    }
    // if there are no more letters to guess, you've won!
    else if (letters.length <= 0) {
        guessesDiv.style.display = "none"; 
        gameStatusDiv.textContent = "YOU WIN";
    }
    else {
        // You didn't loose or win so display the number of guesses remaining. 
        guessesDiv.innerHTML = "You have " + remainingGuesses + " guesses remaining.";
    }
};

// Print out the correctly guessed letters and _ for those still needing to be guessed.
function printLetters() {
    // make a list of all the lettes in the word
    listLetters = "<ul>";

    // loop through each letter in the guessWordArray of letters and make an li
    guessWordArray.forEach(function(aLetter) {
        // if the user guessed letters include letters in the word, display the correctly guessed letters
        if (guesses.includes(aLetter)) {
            listLetters += "<li>" + aLetter + "</li>";
        }
        // otherwise pring out an underscore for each letter that has not yet been guessed
        else {
            listLetters += "<li>" + " __ " + "</li>";            
        }
    });
    // close the list 
    listLetters += "</ul>"

    // print out the updated word with guessed letters displaying
    guessableWordDiv.innerHTML = listLetters;
};



