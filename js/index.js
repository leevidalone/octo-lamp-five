/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector('#start');
  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';
  });
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  let finished = false;
  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
    {
      q: "What does HTML stand for?",
      o: ["Hyper Tag Markup Language", "Hyper Text Markup Language", "Hyperlinks Text Mark Language", "Hyperlinking Text Marking Language"],
      a: 1,
    },
    {
      q: "What does CSS stand for?",
      o: ["Computing Style Sheet", "Creative Style System", "Cascading Style Sheet", "Creative Styling Sheet"],
      a: 2,
    },
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  const submitQuiz = () => {
    let score = 0;
    //loops through each question
    for (let i = 0; i < quizArray.length; i++){
      //gets all the radio buttons
      let radio = document.querySelectorAll('input[name="radio' + i.toString() +'"]')
      //checks if correct answer is selected
      //if yes, increment the score
      if(radio[quizArray[i]['a']].checked){
        score++;
      }
      //highlights all corrects answers
      radio[quizArray[i]['a']].parentElement.style.border = '3px solid lightgreen';
    }
    //disables radio buttons
    let radioBtn = document.querySelectorAll('input[type="radio"]');
    for (let i = 0; i < radioBtn.length; i++){
      radioBtn[i].disabled = true
    }
    //displays score
    document.querySelector(".score").innerHTML = '<h4>Total Score: ' + score.toString() + '/5</h4>';
    //kill timer
    finished = true;
  }

  document.querySelector('#btnSubmit').addEventListener("click", submitQuiz);

  // call the displayQuiz function
  displayQuiz();

  //timer function
  document.getElementById("btnstart").addEventListener("click", function(){
  
    const startTiming = 1
    let time = startTiming * 60
    
    const count = document.getElementById('time')
    let timer = setInterval(updateTimer, 1000)
    function updateTimer(){
      if(finished){
        clearInterval(timer)
        return;
      }
      const minutes = Math.floor(time/60)
      let seconds = time % 60
    
      seconds = seconds < 10 ? '0' + seconds : seconds
      count.innerHTML = `${minutes}:${seconds}`
      time--
  
      if(time < 0){
        clearInterval(timer);
        submitQuiz();
      }
    }
  });
});
  
//reloads the page
document.getElementById("btnReset").addEventListener("click", function(){
  location.reload();
})