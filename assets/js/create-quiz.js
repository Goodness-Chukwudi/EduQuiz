"use strict";

const addQuizForm = document.querySelector(".addQuiz"),
	questionPaperForm = document.querySelector(".questionPaperForm");

// get existing questionPaper or create a new one
let existingQuestionPaper = JSON.parse(
	sessionStorage.getItem("eduQuiz_Active_questionPaper")
);

let questionPaper = existingQuestionPaper
	? existingQuestionPaper
	: { questions: [] };

//Event Listeners
window.addEventListener("load", updateUIQuestionPaper);
addQuizForm.addEventListener("submit", addToQuestionPaper);
questionPaperForm.addEventListener("submit", submitQuestionPaper);

function addToQuestionPaper(e) {
	// if there is no current questionPaper, create a new one
	questionPaper.title = document.getElementById("inputTitle").value;
	questionPaper.duration = parseInt(
		document.getElementById("inputDuration").value
	);
	questionPaper.totalScore = parseInt(
		document.getElementById("inputScore").value
	);

	//Get the provided answer
	let optionInputs = document.getElementsByClassName("optionInputs"),
		answer = "";
	for (const option of optionInputs) {
		if (option.checked) answer = option.value;
	}

	let question = {
		num: questionPaper.questions.length + 1,
		question: document.getElementById("inputQuestion").value,
		options: [
			document.getElementById("option1").value,
			document.getElementById("option2").value,
			document.getElementById("option3").value,
			document.getElementById("option4").value,
			document.getElementById("option5").value,
		],
		answer: document.getElementById(answer).value,
		score: parseInt(document.getElementById("questionScore").value),
	};
	questionPaper.questions.push(question);

	// Save Question paper and load update the UI
	sessionStorage.setItem(
		"eduQuiz_Active_questionPaper",
		JSON.stringify(questionPaper)
	);
	updateUIQuestionPaper();
}

//Update Question paper on the interface
function updateUIQuestionPaper() {
	if (questionPaper.questions.length > 0) {
		document.getElementById("questionPaperTitle").textContent =
			questionPaper.title;
		document.getElementById("inputTitle").value = questionPaper.title;
		document.getElementById("inputDuration").value = questionPaper.duration;
		document.getElementById("inputScore").value = questionPaper.totalScore;

		let questionContainer = document.createElement("div"),
			k = 0;

		for (const question of questionPaper.questions) {
			k++;
			let checked = ["", "", "", "", ""];
			//set the correct answer
			for (let i = 0; i < question.options.length; i++) {
				if (question.answer === question.options[i]) {
					checked[i] = "checked";
					break;
				}
			}

			questionContainer.innerHTML += `
                                    <div class="row">
                                        <div class="col-12 mt-3">
                                            <label for="inputQuestion" class="form-label">Question ${question.num}</label>
                                            <input disabled type="text" class="form-control" placeholder="Enter your question here" value="${question.question}" />
                                        </div>
                                        <!-- options here -->
                                        <div class="row">
                                            <div class="col-lg-4 col-md-6 col-sm-12 mt-1">
                                                <div class="input-group">
                                                    <div class="input-group-text">
                                                        <input disabled class="form-check-input mt-0" ${checked[0]} type="radio" name="option${k}" value="" aria-label="Radio button for following text input" />
                                                    </div>
                                                    <input disabled type="text" class="form-control" aria-label="Text input with radio button" value = "${question.options[0]}"/>
                                                </div>
                                            </div>

                                            <div
                                                class="
                                                    col-lg-4 col-md-6 col-sm-12
                                                    mt-1
                                                "
                                            >
                                                <div class="input-group">
                                                    <div class="input-group-text">
                                                        <input
                                                            class="
                                                                form-check-input
                                                                mt-0
                                                            "
                                                            ${checked[1]}
                                                            disabled
                                                            type="radio"
                                                            name="option${k}"
                                                            value=""
                                                            aria-label="Radio button for following text input"
                                                        />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        disabled
                                                        class="form-control"
                                                        aria-label="Text input with radio button"
                                                        value = "${question.options[1]}"

                                                    />
                                                </div>
                                            </div>

                                            <div
                                                class="
                                                    col-lg-4 col-md-6 col-sm-12
                                                    mt-1
                                                "
                                            >
                                                <div class="input-group">
                                                    <div class="input-group-text">
                                                        <input
                                                            class="
                                                                form-check-input
                                                                mt-0
                                                            "
                                                            ${checked[2]}
                                                            disabled
                                                            type="radio"
                                                            name="option${k}"
                                                            value=""
                                                            aria-label="Radio button for following text input"

                                                        />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        disabled
                                                        class="form-control"
                                                        aria-label="Text input with radio button"
                                                        value = "${question.options[2]}"
                                                    />
                                                </div>
                                            </div>

                                            <div
                                                class="
                                                    col-lg-4 col-md-6 col-sm-12
                                                    mt-1
                                                "
                                            >
                                                <div class="input-group">
                                                    <div class="input-group-text">
                                                        <input
                                                            class="
                                                                form-check-input
                                                                mt-0
                                                            "
                                                            ${checked[3]}
                                                            disabled
                                                            type="radio"
                                                            name="option${k}"
                                                            value=""
                                                            aria-label="Radio button for following text input"

                                                        />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        disabled
                                                        class="form-control"
                                                        aria-label="Text input with radio button"
                                                        value = "${question.options[3]}"

                                                    />
                                                </div>
                                            </div>

                                            <div
                                                class="
                                                    col-lg-4 col-md-6 col-sm-12
                                                    mt-1
                                                "
                                            >
                                                <div class="input-group">
                                                    <div class="input-group-text">
                                                        <input
                                                            class="
                                                                form-check-input
                                                                mt-0
                                                            "
                                                            disabled
                                                            ${checked[4]}
                                                            type="radio"
                                                            name="option${k}"
                                                            value=""
                                                            aria-label="Radio button for following text input"

                                                        />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        disabled
                                                        class="form-control"
                                                        aria-label="Text input with radio button"
                                                        value = "${question.options[4]}"

                                                    />
                                                </div>
                                            </div>

                                            <div
                                                class="
                                                    col-lg-4 col-md-6 col-sm-12
                                                    mt-1
                                                "
                                            >
                                                <input
                                                    disabled
                                                    min="1"
                                                    max="100"
                                                    type="number"
                                                    class="form-control"
                                                    id="questionScore"
                                                    placeholder="question score"
                                                    value = "${question.score}"
                                                />
                                            </div>
                                        </div>
                                    </div>`;
		}

		document.getElementById("new-quiz").append(questionContainer);

		// make the questionPaper visible
		document.querySelector(".questionPaperForm").classList =
			"row g-3 questionPaperForm d-block";
	}
}

function submitQuestionPaper(e) {
	e.preventDefault();
	// Make a HTTP POST Request for creating quiz
	axios
		.post("https://eduquizng.herokuapp.com/api/quiz", questionPaper, {
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		})
		.then((response) => {
			//delete eduQuiz_Active_questionPaper and reload page
			sessionStorage.removeItem("eduQuiz_Active_questionPaper");
			alert(response.data);
			location = location.href;
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
