let questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyperlink Text Management Language", correct: false }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Creative Style Sheets", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Computer Style Sheets", correct: false },
            { text: "Colorful Style Sheets", correct: false }
        ]
    },
    {
        question: "What does PHP stand for?",
        answers: [
            { text: "Preprocessor Hypertext", correct: false },
            { text: "Private Home Page", correct: false },
            { text: "PHP: Hypertext Preprocessor", correct: true },
            { text: "Personal Hypertext Processor", correct: false }
        ]
    },
    {
        question: "What does JS stand for in the context of web development?",
        answers: [
            { text: "JavaScript", correct: true },
            { text: "JavaScripting", correct: false },
            { text: "JavaSoft", correct: false },
            { text: "JustScript", correct: false }
        ]
    },
    {
        question: "What is the full form of SQL?",
        answers: [
            { text: "Structured Query Language", correct: true },
            { text: "Simple Query Language", correct: false },
            { text: "Standard Query Language", correct: false },
            { text: "Sequential Query Language", correct: false }
        ]
    }
];

let questionContainer = document.getElementById('question-container');
let questionElement = document.getElementById('question');
let answerButtonsElement = document.getElementById('answer-buttons');
let nextButton = document.getElementById('next-button');
let scoreDisplay = document.getElementById('score');

let shuffledQuestions, currentQuestionIndex;
let score = 0;

function startGame() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = 'Next';
    nextButton.classList.add('hide');
    scoreDisplay.textContent = '';
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.textContent = question.question;
    answerButtonsElement.innerHTML = '';
    question.answers.forEach(answer => {
        let button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answer');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
}

function selectAnswer(e) {
    let selectedButton = e.target;
    let correct = selectedButton.dataset.correct;
    if (correct) {
        score += 10;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.textContent = 'Restart';
        nextButton.classList.remove('hide');
        scoreDisplay.textContent = `Final Score: ${score}`;
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

nextButton.addEventListener('click', () => {
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    } else {
        startGame();
    }
});

startGame();
