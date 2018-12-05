//  TO DOs
//  change alert to start game button
//  stop game on win or loss
//  create some better styling

// define places in HTML that get updated. 
var tallyResultsDiv = document.getElementById("tallyResults");
var gameStatusDiv = document.getElementById("gameStatus");
var guessesDiv = document.getElementById("guesses");
var guessableWordDiv = document.getElementById("guessableWord");
var numberOfGuesses = document.getElementById("numberOfGuesses");
var newBackgroundDiv = document.getElementById("bgImage");

// VARIABLES

// all possible words in the game
var guessableWords = ["antimatter","asteroid","celestial","comet","cosmic","moon","sun","stars","mars","jupiter","neptune","meteor","exoplanet","saturn","galaxy","radiation"];

// space background images
var spaceBackgrounds = ["outerspace.jpg","earthsun.jpg","rocket.jpg","europe.jpg","planet.jpg"]

// pick the word you're trying to guess from list of available words above
var guessWord = guessableWords[Math.floor(Math.random() * guessableWords.length)];

// each letter user guesses.
var guesses = [];

// letters in this array are removed with each correct guess. This helps decide if you won.
var letters = [];

// you get one turn per letter in the word
var guessTurns = guessWord.length;

// currentGuess is just the most recent guessed letter
var currentGuess = "x";

// setup a variable to keep track of remaining guesses, start with the number of letters in the word.
var remainingGuesses = guessTurns;

// Keep track of how many games
var Games = {
    guesswords: ["Guess this word"],
    guesses: ["xxxxxx"],
    results: ["New Game"]
};

// create an array of Games results
var tallyResults = [];
tallyResults = Games.results;


// turn the guessWord into an array called letters, and a holder for the full word
letters = guessWord.split('');
guessWordArray = guessWord.split('');


// This function is run whenever the user presses a key. Identify key and send to guesses array.
document.onkeyup = function(guessLetter) {
    // Determine which key was pressed and sets userGuess to that key in lowercase
    var userGuess = guessLetter.key.toLowerCase();
    currentGuess = guessLetter.key.toLowerCase();
    // Add guess to guesses array, we'll compare this to the guessable word later
    guesses.push(userGuess);
    
    Games.guesses.push(userGuess);

    gameStatusDiv.style.display = "block";
    numberOfGuesses.style.display = "none";

    checkLetters();
    checkScore();
};


function newGuessWord() {
    gameStatusDiv.style.display = "none";
    guessWord = guessableWords[Math.floor(Math.random() * guessableWords.length)];
    
    // assign guessword to Games object
    Games.guesswords.push(guessWord);
}

// when page completely loads, print the word, score and status. 
function setupGame() {
    guesses = [];
    letters = [];
    guessWordArray = [];
    currentGuess = "x";
    guessWord = [];

    newGuessWord();

    guessTurns = guessWord.length;
    remainingGuesses = guessTurns;

    letters = guessWord.split('');
    guessWordArray = guessWord.split('');

    numberOfGuesses.style.display = "inline";
    numberOfGuesses.innerHTML = "You have " + remainingGuesses + " guesses for this word.";

    tallyScore();

    // get new random background url from the spaceBackgrounds array
    newBackground = spaceBackgrounds[Math.floor(Math.random() * spaceBackgrounds.length)];

    // update the css id to the new image
    newBackgroundDiv.style.backgroundImage = "url('assets/images/" + newBackground + "')"; 
    
    printLetters();

}


// after a key is pressed check the letters to see if they are in the word
function checkLetters() {
    // make sure to only accept a-z
    if (currentGuess.match(/^[A-Za-z]+$/)) {
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
    }
    else {
        var msg = new SpeechSynthesisUtterance("Sorry, that is not a valid letter");
        window.speechSynthesis.speak(msg);
    };
};

function checkScore() {
    // if the number of turns equals the number of letters in the word 
    // and there are more ltters to guess game over. 
    if (remainingGuesses == 0 && letters.length > 0) {
        guessableWordDiv.style.diplay = "none";
        gameStatusDiv.textContent = "GAME OVER LOOSER";

        // assign the results of the game if you loose.
        Games.results.push("LOSS");

        // tell them what the correct word was.
        var msg = new SpeechSynthesisUtterance("You loose, it was: " + guessWord);
        window.speechSynthesis.speak(msg);              

        // add a pause and play this audio
        setTimeout(function (){
            var audio = new Audio('assets/sounds/DamnAnnoying.mp3');
            audio.play();
    
          }, 3000);
    }
    // if there are no more letters to guess, you've won!
    else if (letters === undefined || letters.length == 0) {
        // print letters if game won with last guess.
        printLetters();
        // array empty or does not exist
        guessableWordDiv.style.diplay = "none";
        gameStatusDiv.textContent = "YOU WIN";

        // assign the results of the game if you win
        Games.results.push("WIN");

        // Tell us the result and say the word
        var msg = new SpeechSynthesisUtterance("Winner winner chicken dinner, it is: " + guessWord);
        window.speechSynthesis.speak(msg);              

         // add a pause then play this audio
         setTimeout(function (){
            var audio = new Audio('assets/sounds/Iwin.mp3');
            audio.play();
        
          }, 3000);
    }
    else {
        // you pressed more keys after loosing
        if (remainingGuesses < 0 && letters.length > 0) {
            guessableWordDiv.style.diplay = "none";
            gameStatusDiv.textContent = "GAME OVER LOOSER";
        }
        else {
            // will only print letters while game hasn't been lost
            printLetters();

            // You didn't loose or win so display the number of guesses remaining. 
            gameStatusDiv.textContent = "You have " + remainingGuesses + " guesses remaining.";
        }
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

function tallyScore() {
    // start a list
    listResults = "<ul>";

    //  add game results to list
    for (var g = 1; g < tallyResults.length; g++) {
        if (tallyResults[g] === "LOSS") {
            listResults += "<li class='loss'>Game: " + [g] + " ~ " + tallyResults[g] + " </li>";
        }
        else {
            listResults += "<li class='win'>Game: " + [g] + " ~ " + tallyResults[g] + " </li>";
        }         
    };

    // close list
    listResults += "</ul>";

    // print out the updated list
    tallyResultsDiv.innerHTML = listResults;

};



