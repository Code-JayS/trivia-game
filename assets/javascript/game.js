// time allowed per question
var quizTimer = 0;
// time alotted between questions
var coolDownTimer = 0;
// score keeping variable tracked during game
var correct = 0;
var wrong = 0;
var timeout = 0;
var theClock;
var guessMade = false;
var questionArray = [];
var round = -1;
var correctAnswer = "";
var userGuess = "";
const questions = [
  { name: "dog", question: "Is this a dog gif?", a: "no", b: "yes", c: "It's a snake", d: "It's a monkey", correct: "b" },
  { name: "cat", question: "Is this a cat gif?", a: "no", b: "Yes", c: "It's a bird", d: "It's a dolphin", correct: "b" },
  { name: "owl", question: "Is this a kangaroo gif?", a: "It's a rabbit", b: "Yes", c: "It's a bird", d: "It's a dolphin", correct: "c" },
  { name: "panda", question: "Is this a cat gif?", a: "a pinecone?", b: "Yes", c: "It's a bird", d: "It's a panda", correct: "d" },
  { name: "rabbit", question: "Is this a cat gif?", a: "It's a rabbit", b: "Yes", c: "It's a bird", d: "It's a dolphin", correct: "a" },
  { name: "penguin", question: "Is this a dog gif?", a: "It's an Elephant", b: "yes", c: "It's a penguin", d: "It's a monkey", correct: "c" },
  { name: "monkey", question: "Is this a koala gif?", a: "It's a Velociraptor", b: "yes", c: "It's a snake", d: "It's a monkey", correct: "d" },
  { name: "shark", question: "Is this a dog gif?", a: "Is it shark week? because that is a shark.", b: "yes", c: "its a snake", d: "its a monkey", correct: "a" },
];



// var currentQuestion = questions[Math.floor(Math.random)] use random array index thingy lookup 
// use giphy image from object name function to apply background image //


function backgroundImage() {
  var currentImage = questions[round].name;
  // Storing our giphy API URL for a random cat image
  var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&tag=" + currentImage;

  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })

    // After the data from the AJAX request comes back
    .then(function (response) {
      console.log(response)
      // Saving the image_original_url property
      var imageUrl = response.data.image_original_url;

      $('#gifLanding').css({
        'background-size': 'contain',
        'background-repeat': 'no-repeat',
        'background-image': 'url(' + imageUrl + ')'
      });
    });

};


// start the game function called at the begining of the game.
function startButton() {
  var start = $('<button class = "btn btn-default bg-dark text-white text-center">Click Here to begin</button>').click(function () {
    beginRound();
    // Noise.play();
  });
  $("#startButton").append('<div></div>').attr("class", "text-center").append(start);

};
//******************************Dom manipulation****************************************/
// clears the questions and reveal div
function clearSplash() {
  $("#splashArea").empty();
  $("#startButton").empty();
};
//places the question on the DOM
function showQuestion() {

  $("#splashArea").empty();
  $("#splashArea").append('<h1 id = "question"></h1>');
  $("#splashArea").append('<br>');
  $("#splashArea").append('<button id = "a"></button>');
  $("#splashArea").append('<br>');
  $("#splashArea").append('<button id = "b"></button>');
  $("#splashArea").append('<br>');
  $("#splashArea").append('<button id = "c"></button>');
  $("#splashArea").append('<br>');
  $("#splashArea").append('<button id = "d"></button>');
  $("#a").addClass("btn btn-secondary answers");
  $("#b").addClass("btn btn-secondary answers");
  $("#c").addClass("btn btn-secondary answers");
  $("#d").addClass("btn btn-secondary answers");
  // the information from the question. 
  $("#question").text(questions[round].question);
  $("#a").text(questions[round].a);
  $("#b").text(questions[round].b);
  $("#c").text(questions[round].c);
  $("#d").text(questions[round].d);

}

// shows results after user has guessed 
function showResult() {
  $("#clock").empty();
  coolDownTimer = 7;
  startDisplay();
  correctAnswer = questions[round].correct;
  //creates header area for text output of results 
  $("#splashArea").empty();
  $("#splashArea").append('<h1 id = "question"></h1>');
  $("#splashArea").append('<br>');
  $("#splashArea").append('<h3 id = "ca-text"></h3>');
  $("#splashArea").append('<br>');
  $("#splashArea").append('<h3 id = "ca-display"></h3>');
  $("#splashArea").append('<br>');
  $("#splashArea").append('<h3 id = "ua-text"></h3>');
  $("#splashArea").append('<br>');
  $("#splashArea").append('<h3 id = "ua-display"></h3>');
  $("#question").text(questions[round].question);
  $("#ca-text").text("The Correct Answer was ...");
  $("#ca-display").text(questions[round][correctAnswer]);
  $("#ua-text").text("Your Answer was...");
  $("#ua-display").text(questions[round][userGuess]);
}
// shows final score 
function scoreScreen() {
  $("#splashArea").empty();
  $("#clock").empty();
  $("#splashArea").append('<h1 id = "correct"></h1>');
  $("#correct").text("Correct Answers " + correct);
  $("#splashArea").append('<br>');
  $("#splashArea").append('<h1 id = "wrong"></h3>');
  $("#wrong").text("Wrong Answers " + wrong);
  $("#splashArea").append('<br>');
  $("#splashArea").append('<h1 id = "timeout"></h1>');
  $("#timeout").text("Questions not Answered " + timeout);
  $("#splashArea").append('<br>');
  $("#splashArea").append('<button id = "playAgain"></button>');
  $("#playAgain").addClass("btn btn-secondary text-white")
  $("#playAgain").text("Play Again?");
  $(document.body).on("click", "#playAgain", function () {
    beginGame()
  });
}


//*************************************************Clock Area************************************************/
//display clock for answer reveal screen
function startDisplay() {
  clearInterval(theClock);
  theClock = setInterval(decrementDisplay, 1000);

}
function decrementDisplay() {
  if (coolDownTimer === 0) {
    guessMade = false;
    quizTimer = 30;
    stopTimer();
    beginRound();
  }
  else {
    coolDownTimer--;
    $("#clock").html("<h1> Next question in " + coolDownTimer + "</h1>");
  }
}
//display clock for quiz timer 
function startTimer() {
  clearInterval(theClock);
  theClock = setInterval(decrement, 1000);
}
function decrement() {
  if (quizTimer === 0) {
    stopTimer();
    showResult();
    timeout++;
  }
  else if (quizTimer % 10 === 0) {
    backgroundImage();
    quizTimer--;
    $("#clock").html("<h1>" + quizTimer + "</h1>");
  }
  else {
    quizTimer--;
    $("#clock").html("<h1>" + quizTimer + "</h1>");
  }
}
// stop timer functionality works on either timer
function stopTimer() {
  clearInterval(theClock);
}
//***********************************************verifies user input***********************************/
function click() {
  if (guessMade === false) {
    $(document.body).on("click", ".answers", function () {

      // Get the number of the button from its data attribute and hold in a variable called  toDoNumber.
      userGuess = $(this).attr("id");
      if (userGuess === questions[round].correct) {
        guessMade = true;
        stopTimer();
        correct++;
        showResult();
        $(document.body).off().on("click", ".answers", function () {
          userGuess = $(this).attr("id");
        });
      }
      else {
        guessMade = true;
        stopTimer();
        wrong++;
        showResult();
        $(document.body).off().on("click", ".answers", function () {
          userGuess = $(this).attr("id");
        });
      }

    });
  }
}


function beginGame() {
  correct = 0;
  wrong = 0;
  timeout = 0;
  questionArray = [];
  round = -1;
  correctAnswer = "";
  userGuess = "";
  clearSplash();
  startButton();
}


function beginRound() {
  if (correct + wrong + timeout < questions.length) {
    round++;
    quizTimer = 30;
    coolDownTimer = 7;
    clearSplash();
    showQuestion();
    click();
    startTimer();
  }
  else {
    scoreScreen();
  }
}
startButton();
