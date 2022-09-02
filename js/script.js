var quizQuestions = [
  {
    question: `What is the biggest lake within the Mississippi River?`,
    choices: [
      `Big Lake`,
      `Lake St. Louis`,
      `Lake Agassiz`,
      `Lake Pepin`,
    ],
    answer: `Lake Pepin`,
  },
  {
    question: `What is the name of a short, yet inward-curved, sword?`,
    choices: [
      `Kukri`,
      `Shortsword`,
      `Curved sword`,
      `Xiphos`,
    ],
    answer: `Kukri`,
  },
  {
    question: `How many spell slots do Sorcerer's get, in the most recent edition of D&D, at level 1?`,
    choices: [
      1,
      2,
      3,
      0,
    ],
    correctAnswer: 2,
  },
  {
    question: `Which country is the most southern in South America?`,
    choices: [
      `Argentina`,
      `Falkland Islands`,
      `Antarctica`,
      `Chile`,
    ],
    answer: `Chile`
  },
  {
    question: `How many shoe laces do you have for a pair of shoes?`,
    choices: [
      4,
      1,
      2,
      5,
    ],
    answer: 2
  },
];

console.log(questions);


var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var startButton = document.getElementById('start')
var submitButton = document.getElementById('submit');


var timeleft = 60;
var questionIndex = 0;

function startQuiz(questions, quizContainer, resultsContainer, submitButton) {

  var startTimer = setInterval(function startTimer() {
    if (timeleft <= 0) {
      clearInterval(startTimer);
      document.getElementById("countdown").innerHTML = "Finished";
    } else {
      document.getElementById("countdown").innerHTML = `${timeleft} seconds remaining!`;
    }
    timeleft -= 1;
    while (timeleft === 0) {
      document.getElementById("countdown").innerHTML = `Time's Up! Lose`;
      return;
    }
  }, 1000);

  function startQuestions(questions, quizContainer) {
    if (questionIndex >= quizQuestions.length) {
      endQuiz();
      return;
    }
    document.querySelector('#questions').innerText = quizQuestions[questionIndex].question;
    document.getElementById('choices').innerHTML = "";
    for (let i = 0; i < quizQuestions[questionIndex].choices.length; i++) {
      var button = document.createElement("button");
      button.innerText = quizQuestions[questionIndex].choices[i];
      button.addEventListener('click', checkChoice);
      document.querySelector("#choices").appendChild(button)
    }
  };

  startQuestions(questions, quizContainer);


  function checkChoice(event) {
    console.log(questionIndex, quizQuestions.length)
    if (questionIndex >= quizQuestions.length) {
      return;
    }
    var choice = event.target.innerText;
    var correctChoice = quizQuestions[questionIndex].answer
    if (choice === correctChoice) {
      questionIndex++;
      startQuestions();
    } else {
      questionIndex++;
      timeleft = timeleft - 5;
      startQuestions();
    }
  }

  function endQuiz() {
    clearInterval(startTimer);
    document.getElementById('quizbox').style.display = "none";
    document.getElementById('finish').style.display = "block";
    document.getElementById('score').innerText = "Your score is " + timeleft + "!";
  }

  document.getElementById("saveScore").addEventListener("click", function () {
    var initials = document.getElementById('initials').value;
    var scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push({initials:initials, score:timeleft});
    localStorage.setItem("scores", JSON.stringify(scores));
    location.reload();
  })
};

startButton.onclick = function () {
  startQuiz(quizQuestions);
  startButton.style.display = "none";
};

var highScores = document.getElementById("highscore");
var scores = JSON.parse(localStorage.getItem('scores')) || [];
scores.forEach(element => {
  var scoreEl = document.createElement("p")
  scoreEl.innerText = element.initials + " " + element.score;
  highScores.appendChild(scoreEl)
});