var quizQuestions = [
  {
    question: `What is the biggest lake within the Mississippi River?`,
    choices: [
      `Big Lake`,
      `Lake St. Louis`,
      `Lake Agassiz`,
      `Lake Pepin`,
    ],
    answer: [`Lake Pepin`],
  },
  {
    question: `What is the name of a short, yet inward-curved, sword?`,
    choices: {
      a: `Kukri`,
      b: `Shortsword`,
      c: `Curved sword`,
      d: `Xiphos`,
    },
    answer: `a`,
  },
  {
    question: `How many spell slots do Sorcerer's get, in the most recent edition of D&D, at level 1?`,
    choices: {
      a: `1`,
      b: `2`,
      c: `3`,
      d: `0`,
    },
    correctAnswer: `b`,
  },
  {
    question: `Which country is the most southern in South America?`,
    choices: {
      a: `Argentina`,
      b: `Falkland Islands`,
      c: `Antarctica`,
      d: `Chile`,
    },
    answer: `d`
  },
  {
    question: `How many shoe laces do you have for a pair of shoes?`,
    choices: {
      a: `4`,
      b: `1`,
      c: `2`,
      d: `5`,
    },
    answer: `c`
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

    var startTimer = setInterval(function startTimer(){
        if(timeleft <= 0){
          clearInterval(downloadTimer);
          document.getElementById("countdown").innerHTML = "Finished";
        } else {
          document.getElementById("countdown").innerHTML = `${timeleft} seconds remaining!`;
        }
        timeleft -= 1;
        while(timeleft === 0) {
          document.getElementById("countdown").innerHTML = `Time's Up! Lose`;
          return;
        }
    }, 1000);
    
    function startQuestions(questions, quizContainer){
      document.querySelector('#questions').innerText = quizQuestions[questionIndex].question;
      for (let i=0; i < quizQuestions[questionIndex].choices.length; i++) {
        var button = document.createElement("button");
        button.innerText = quizQuestions[questionIndex].choices[i];
        document.querySelector("#choices").appendChild(button)
      }
    };

    startQuestions(questions, quizContainer);


    function showResults(questions, quizContainer, resultsContainer){
        var answerContainer = quizContainer.querySelectorAll('.answers');
        var userAnswer = '';
        var numCorrect = 0;

        for(var i=0; i<questions.length; i++){
            userAnswer = (answerContainer[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            if(userAnswer===questions[i].correctAnswer){
                numCorrect++;
            }
            else{
                startTimer(duration)
                    --timer(5);
            }
        }
        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
    };
};

startButton.onclick = function(){   
  startQuiz(quizQuestions);
  startButton.style.display = "none";
};

