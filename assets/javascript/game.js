// time allowed per question
var quizTimer = 0;
// time alotted between questions
var coolDownTimer = 7;
// score keeping variable tracked during game
var correct = 0;
var wrong = 0;
var timeout = 0;
var theClock;
var guessMade = false;
var questionArray = [];
var round = -1;
const questions = [
  { name: "dog", question: "is this cat a dog?", a: "no", b: "yes", c: "its a snake", d: "its a monkey", correct: "a" },
  { name: "cat", question: "is this dog a cat?", a: "Maybe", b: "Yes", c: "its a bird", d: "its a dolphin", correct: "b" }
]
// var currentQuestion = questions[Math.floor(Math.random)] use random array index thingy lookup 
// start the game function called at the begining of the game and on loss/win conditions
function startButton() {
  var start = $('<button class = "btn btn-default bg-dark text-white text-center">Click Here to begin</button>').click(function () {
    beginGame();
    // Noise.play();
  });
  $("#splashArea").append('<div></div>').attr("class", "text-center").append(start);

};
//places the question on the DOM
function showQuestion() {
  $("#splashArea").empty();
  $("#splashArea").append('<h1 id = "question"></h1>');
  $("#splashArea").append('<br>');
  $("#splashArea").append('<h3 id = "a"></h3>');
  $("#splashArea").append('<br>');
  $("#splashArea").append('<h3 id = "b"></h3>');
  $("#splashArea").append('<br>');
  $("#splashArea").append('<h3 id = "c"></h3>');
  $("#splashArea").append('<br>');
  $("#splashArea").append('<h3 id = "d"></h3>');
  $("#question").addClass("bg-light title text-dark")
  $("#a").addClass("answers");
  $("#b").addClass("answers");
  $("#c").addClass("answers");
  $("#d").addClass("answers");

  $("#question").text(questions[round].question);
  $("#a").text(questions[round].a);
  $("#b").text(questions[round].b);
  $("#c").text(questions[round].c);
  $("#d").text(questions[round].d);

}
function showResult() {
  $("#clock").empty();
  coolDownTimer = 10;
  startDisplay();

  $("#splashArea").empty();
  $("#splashArea").append('<h1 id = "question"></h1>');
  $("#splashArea").append('<br>');
  $("#splashArea").append('<h3 id = "a"></h3>');
  $("#splashArea").append('<br>');
  $("#splashArea").append('<h3 id = "b"></h3>');
  $("#splashArea").append('<br>');
  $("#splashArea").append('<h3 id = "c"></h3>');
  $("#splashArea").append('<br>');
  $("#splashArea").append('<h3 id = "d"></h3>');
  $("#question").addClass("bg-light title text-dark")


  $("#question").text(questions[1].question);
  $("#a").text("test");
  $("#b").text(questions[1].b);
  $("#c").text(questions[1].c);
  $("#d").text(questions[1].d);
}

function scoreScreen() {
  $("#splashArea").empty();
  $("#clock").empty();
  $("#splashArea").append('<h1 id = "correct"></h1>');
  $("#correct").text("Correct Answers " +correct);
  $("#splashArea").append('<br>');
  $("#splashArea").append('<h1 id = "wrong"></h3>');
  $("#wrong").text("Wrong Answers " + wrong);
  $("#splashArea").append('<br>');
  $("#splashArea").append('<h1 id = "timeout"></h1>');
  $("#timeout").text("Questions not Answered " +timeout);
  $("#splashArea").append('<br>');
  $("#splashArea").append('<button id = "playAgain"></button>');
  $("#playAgain").text("Play Again?");
}




function startDisplay() {
  clearInterval(theClock);
  theClock = setInterval(decrementDisplay, 1000);

}
function decrementDisplay() {

  console.log(coolDownTimer);
  if (coolDownTimer === 0) {
    quizTimer = 30;
    stopTimer();
    beginGame();
  }
  else {
    coolDownTimer--;
  }
}

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
  else {
    quizTimer--;
    $("#clock").html("<h1>" + quizTimer + "</h1>");
  }
}
function stopTimer() {
  clearInterval(theClock);
}
// verifies answer 
function click() {
  if (guessMade === false) {
    $(document.body).on("click", ".answers", function () {

      // Get the number of the button from its data attribute and hold in a variable called  toDoNumber.
      var answer = $(this).attr("id");
      if (answer === questions[1].correct) {
        guessMade = true;
        stopTimer();
        correct++;
        showResult();
      }
      else {
        guessMade = true;
        stopTimer();
        wrong++;
        showResult();
      }

    });
  }
}

function clearSplash() {
  $("#splashArea").empty();
};



function beginGame() {
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
