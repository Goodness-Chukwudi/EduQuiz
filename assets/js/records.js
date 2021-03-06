"use strict";

window.addEventListener("load", updateRecords);

async function updateRecords() {
	const user = await getUserDetails();
	if (user && user.quizzes) setQuizDetails(user);
	if (user && user.results) setResultDetails(user);
}

function setQuizDetails(user) {
	if (user.quizzes.length === 0) return;

	document.querySelector(
		".quiz-alert"
	).innerHTML = `${user.quizzes.length} quiz was found! <br />
	Candidates indicates the number of people that have taken this quiz`;

	// generate a list of quizzes with the user data
	let list = "";
	user.quizzes.forEach((quiz) => {
		let candidates = quiz.candidates ? quiz.candidates : 0;
		list += `<li
		data-bs-toggle="modal"
		data-bs-target="#exampleModal"
		class="createdQuiz list-group-item d-flex justify-content-between align-items-start"
		id="${quiz.id}">
		<div class="ms-2 me-auto">
			<div class="fw-bold">Quiz ID: ${quiz.id}</div>
			${quiz.title}
		</div>
		<span class="badge bg-info rounded-pill">candidates: ${candidates}</span>
	</li>`;
	});

	let quizList = document.querySelector("#quizList");
	quizList.innerHTML += list;

	for (const item of quizList.children) {
		item.addEventListener("click", () => {
			getSelectedQuiz(item.id);
		});
	}
}

function setResultDetails(user) {
	if (user.results.length === 0) return;

	document.querySelector(
		".result-alert"
	).innerHTML = `${user.results.length} result was found! <br />
	Click a result to see details`;

	// generate a list of quizzes with the user data
	let list = "";
	user.results.forEach((result) => {
		list += `<li
			data-bs-toggle="modal"
			data-bs-target="#exampleModal"
			class="createdResult list-group-item d-flex justify-content-between align-items-start"
			id="${result.id}">
			<div class="ms-2 me-auto">
				<div class="fw-bold">Result ID: ${result.id}</div>
				${result.title}
			</div>
			<span class="badge bg-info rounded-pill">Score: ${result.score}</span>
		</li>`;
	});

	let resultList = document.querySelector("#resultList");
	resultList.innerHTML += list;

	for (const item of resultList.children) {
		item.addEventListener("click", () => {
			getSelectedResult(item.id);
		});
	}
}

async function getUserDetails() {
	// Make a HTTP GET Request for user details
	try {
		const response = await axios.get(baseAPI + "/api/quiz/me", {
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		});

		// save user in session storage
		sessionStorage.setItem(
			"eduQuiz_Active_User",
			JSON.stringify(response.data)
		);

		return response.data;
	} catch (error) {
		if (error.response) {
			alert(error.response.data);
		} else if (error.request) {
			alert(error.request);
		} else {
			console.log("Error", error.message);
		}
	}
}

function getSelectedQuiz(id) {
	// Make a HTTP GET Request for the selected quiz
	axios.defaults.withCredentials = true;
	axios
		.get(baseAPI + "/api/quiz/get-quiz/" + id, {
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		})
		.then((response) => {
			setSelectedQuiz(response.data);
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

function getSelectedResult(id) {
	// Make a HTTP GET Request for selected result
	axios.defaults.withCredentials = true;
	axios
		.get(baseAPI + "/api/quiz/get-result/" + id, {
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		})
		.then((response) => {
			setSelectedQuiz(response.data);
		})
		.catch((error) => {
			if (error.response) {
				alert(error.response.data);
			} else if (error.request) {
				alert(error.request);
			} else {
				console.log("Error", error.message);
			}
			location = location.href;
		});
}

function setSelectedQuiz(value) {
	let questionContainer = "";
	if (value.timeLeft)
		document.getElementById("time").textContent = "Time left (in mins)";
	else document.getElementById("time").textContent = "Duration (in mins)";

	document.getElementById("questionPaperTitle").textContent = value.title;
	document.getElementById("inputDuration").value =
		value.duration || value.timeLeft;
	document.getElementById("inputScore").value = value.totalScore;

	let k = 0;
	for (const question of value.questions) {
		k++;
		let checked = ["", "", "", "", ""];
		//set the correct answer
		for (let i = 0; i < question.options.length; i++) {
			if (question.answer === question.options[i]) {
				checked[i] = "checked";
				break;
			}
		}
		questionContainer += `
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

	document.querySelector("#new-quiz").innerHTML = questionContainer;
}
