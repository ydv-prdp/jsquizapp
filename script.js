const questions = [
    {
        question:"Which is the largesst animal in the world?",
        answers:[
            {text:"Shark", correct:false},
            {text:"Elephant", correct:false},
            {text:"Rhino", correct:false},
            {text:"Blue Whale", correct:true},

        ]
    },
    {
        question:"What is the capital of Uttrakhand?",
        answers:[
            {text:"Dineshpur", correct:false},
            {text:"Ramngar", correct:false},
            {text:"Dehradun", correct:true},
            {text:"Bazpur", correct:false},

        ]
    },
    {
        question:"What is thr article of equality?",
        answers:[
            {text:"15", correct:true},
            {text:"16", correct:false},
            {text:"17", correct:false},
            {text:"18", correct:false},

        ]
    },
    {
        question:"What is the landform created by glacier",
        answers:[
            {text:"seif", correct:false},
            {text:"corrie", correct:true},
            {text:"waterfall", correct:false},
            {text:"v-shape valley", correct:false},

        ]
    },
];

const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");
let currentQuestionIndex =0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    nextButton.style.display="none";
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; 

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button"); 
        button.innerHTML = answer.text;
        button.classList.add("option");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
            console.log(button.dataset)
        }
        button.addEventListener("click",selectAnswer);
    })
}

function selectAnswer(e){

    const selectedBtn = e.target;
    console.log(selectedBtn)
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        //to reveal the final answer
        console.log(button);
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}
function showScore(){
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    while(answerButtons.firstChild){
        console.log(answerButtons.firstChild)
        answerButtons.removeChild(answerButtons.firstChild)
    }
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();
