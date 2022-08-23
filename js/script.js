var quizQuestions = [
  {
    question_1: `What is the biggest lake within the Mississippi River?`,
    answers: {
      a: `Big Lake`,
      b: `Lake St. Louis`,
      c: `Lake Agassiz`,
      d: `Lake Pepin`,
    },
    correctAnswer: `d`,
  },
  {
    question_2: `What is the name of a short, yet inward-curved, sword?`,
    answer: {
      a: `Kukri`,
      b: `Shortsword`,
      c: `Curved sword`,
      d: `Xiphos`,
    },
    correctAnswer: `a`,
  },
  {
    question_3: `How many spell slots do Sorcerer's get, in the most recent edition of D&D, at level 1?`,
    answer: {
      a: `1`,
      b: `2`,
      c: `3`,
      d: `0`,
    },
    correctAnswer: `b`,
  },
  {
    question_4: `Which country is the most southern in South America?`,
    answer: {
      a: `Argentina`,
      b: `Falkland Islands`,
      c: `Antarctica`,
      d: `Chile`,
    },
    correctAnswer: `d`
  },
  {
    question_5: `How many shoe laces do you have for a pair of shoes?`,
    answer: {
      a: `4`,
      b: `1`,
      c: `2`,
      d: `5`,
    },
    correctAnswer: `c`
  },
];

console.log(questions);


var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var startButton = document.getElementById('start')
var submitButton = document.getElementById('submit');


var timeleft = 60;


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
        var output = [];
        var answers = ``;

        for (var i = 0; i <questions.length; i++) {
            answers = [];
            console.log("working");
            for(letter in questions[i].answers){
                answers.push(
                    '<label>'
                        + 'input type="radio" name="question'+i+'" value="'+letter+'">'
                        + letter + ': '
                        + questions[i].answers[letter]
                );
            };
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        };
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

    submitButton.onclick = function(){   
        showResults(questions, quizContainer, resultsContainer);
    };
};

startButton.onclick = function(){   
  startQuiz(quizQuestions);
};

