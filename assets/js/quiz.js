"use strict";
const quizTitle_El = document.getElementById("quiz-title"),
	timeLeft_El = document.getElementById("time-left"),
	questionNumber_El = document.getElementById("question-number"),
	prevBtn = document.getElementById("prevBtn"),
	nextBtn = document.getElementById("nextBtn"),
	activeQuestion_El = document.querySelector(".activeQuestion"),
	options_El = document.querySelector("#options");
let currentQuestionIndex = 0;

nextBtn.addEventListener("click", handleNext);
prevBtn.addEventListener("click", handlePrevious);

let quiz = {
	title: "Demo Quiz",
	timeLeft: 30,
	questions: [
		{
			num: 1,
			question: "This is question 1",
			options: [
				"option Q1 1",
				"option Q1 2",
				"option Q1 3",
				"option Q1 4",
				"option Q1 5",
			],
			answer: "",
		},
		{
			num: 2,
			question: "This is question 2",
			options: [
				"option Q2 1",
				"option Q2 2",
				"option Q2 3",
				"option Q2 4",
				"option Q2 5",
			],
			answer: "",
		},
		{
			num: 3,
			question: "This is question 3",
			options: [
				"option Q3 1",
				"option Q3 2",
				"option Q3 3",
				"option Q3 4",
				"option Q3 5",
			],
			answer: "",
		},
		{
			num: 4,
			question: "This is question 4",
			options: [
				"option Q4 1",
				"option Q4 2",
				"option Q4 3",
				"option Q4 4",
				"option Q4 5",
			],
			answer: "",
		},
		{
			num: 5,
			question: "This is question 5",
			options: [
				"option Q5 1",
				"option Q5 2",
				"option Q5 3",
				"option Q5 4",
				"option Q5 5",
			],
			answer: "",
		},
	],
};

function setQuiz() {
	currentQuestionIndex = 0;
	quizTitle_El.textContent = quiz.title;
	timeLeft_El.textContent = `Time left: ${quiz.timeLeft}`;

	setActiveQuestion();
}

function setActiveQuestion() {
	let activeQuestion = quiz.questions[currentQuestionIndex];
	let optionsDiv = "";

	activeQuestion_El.textContent = activeQuestion.question;
	questionNumber_El.textContent = `(${currentQuestionIndex + 1} of ${
		quiz.questions.length
	})`;

	for (const option of activeQuestion.options) {
		let checked = activeQuestion.answer === option ? "checked" : "";

		optionsDiv += `<div class="ans ml-2">
                            <label class="radio">
                                <input
                                    ${checked}
                                    type="radio"
                                    name="optionBtn"
                                    value=${option}
                                />
                                <span class="px-2">${option}</span>
                            </label>
                        </div>`;
	}
	options_El.innerHTML = optionsDiv;
}

function handleNext() {
	if (currentQuestionIndex < quiz.questions.length - 1) {
		currentQuestionIndex++;
		setActiveQuestion();
	} else if (currentQuestionIndex === quiz.questions.length - 1) {
		//Done
		console.log("done");
	}
}

function handlePrevious() {
	if (currentQuestionIndex > 0) {
		currentQuestionIndex--;
		setActiveQuestion();
	} else if (currentQuestionIndex <= 0) {
		//Done
		console.log("done");
	}
}

setQuiz();
