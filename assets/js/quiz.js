"use strict";

const quizTitle_El = document.getElementById("quiz-title"),
	timeLeft_El = document.getElementById("time-left"),
	questionNumber_El = document.getElementById("question-number"),
	prevBtn = document.getElementById("prevBtn"),
	nextBtn = document.getElementById("nextBtn"),
	activeQuestion_El = document.querySelector(".activeQuestion"),
	options_El = document.querySelector("#options");

window.addEventListener("load", startQuiz);
nextBtn.addEventListener("click", handleNext);
prevBtn.addEventListener("click", handlePrevious);

let quiz = {},
	activeQuestion,
	currentQuestionIndex = 0,
	answerUpdate = {
		questionNum: 0,
		answer: "",
		isCompleted: false,
	};

function startQuiz() {
	quiz = JSON.parse(sessionStorage.getItem("eduQuiz_Active_Quiz"));
	if (quiz) {
		setQuiz();
	} else {
		alert("Error! No quiz to take");
		location = "/";
	}
}

function setQuiz() {
	currentQuestionIndex = 0;
	quizTitle_El.textContent = quiz.title;
	timeLeft_El.textContent = `Time left: ${quiz.timeLeft}`;

	setActiveQuestion();
	handleCountDown();
}

function setActiveQuestion() {
	activeQuestion = quiz.questions[currentQuestionIndex];
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
                                <span class="px-2 ansOptions">${option}</span>
                            </label>
                        </div>`;
	}
	options_El.innerHTML = optionsDiv;

	//set an event listener to track selected options
	let radOptions = document.getElementsByClassName("ansOptions");
	for (const radOption of radOptions) {
		radOption.addEventListener("click", () => {
			answerUpdate.questionNum = activeQuestion.num;
			answerUpdate.answer = radOption.textContent;
		});
	}
}

function handleCountDown() {
	let id = setInterval(timer, 60000);

	function timer() {
		if (quiz.timeLeft <= 1) {
			clearInterval(id);
			alert("You have exhausted the time for this quiz!\nThank you!");
			sessionStorage.removeItem("eduQuiz_Active_Quiz");
			location = "/";
		} else {
			quiz.timeLeft -= 1;
			timeLeft_El.textContent = `Time left: ${quiz.timeLeft}`;
		}
	}
}

function handleNext() {
	if (currentQuestionIndex < quiz.questions.length - 1) {
		currentQuestionIndex++;
		setActiveQuestion();

		// send update
		updateAnswer(answerUpdate);
	} else if (currentQuestionIndex === quiz.questions.length - 1) {
		//Done
		currentQuestionIndex++;
		nextBtn.textContent = "Finish";
		nextBtn.classList = "btn btn-success align-items-center px-4";
		//send update
		updateAnswer(answerUpdate);
	} else if (currentQuestionIndex === quiz.questions.length) {
		let done = confirm("please confirm submission");
		if (done) {
			//send completed update
			answerUpdate.isCompleted = true;
			updateAnswer(answerUpdate);
			sessionStorage.removeItem("eduQuiz_Active_Quiz");
			// redirect to home page
			location = "/";
		} else currentQuestionIndex--;
	}
}

function handlePrevious() {
	nextBtn.textContent = "Next";
	nextBtn.classList = "btn btn-primary align-items-center px-4";
	if (currentQuestionIndex > 0) {
		currentQuestionIndex--;
		setActiveQuestion();
	} else if (currentQuestionIndex <= 0) {
		alert("last question");
	}
}

function updateAnswer(data) {
	// Make a HTTP PUT Request for updating answer
	axios.defaults.withCredentials = true;
	axios
		.put("https://eduquizng.herokuapp.com/api/quiz/update-answer", data, {
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		})
		.then((response) => {
			if (data.isCompleted) alert(response.data);
		})
		.catch((error) => {
			if (error.response) {
				alert(error.response.data);
			} else if (error.request) {
				alert(error.request);
			} else {
				console.log("Error", error.message);
			}
		});
}
