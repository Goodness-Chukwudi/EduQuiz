"use strict";
const quiz_Id_Popup = document.querySelector(".quiz-id"),
	takeQuizBtn = document.querySelector(".take-quiz"),
	continueBtn = document.querySelector("#continue-quiz-btn");

takeQuizBtn.addEventListener("click", handlePopup);
continueBtn.addEventListener("click", loadQuiz);

function handlePopup() {
	if (quiz_Id_Popup.style.visibility === "hidden")
		quiz_Id_Popup.style.visibility = "visible";
	else quiz_Id_Popup.style.visibility = "hidden";
}

function loadQuiz() {
	//TO DO:  Display any special instruction and information from quiz creator
	// get the requested quiz
	let quizId = document.getElementById("id-input").value;
	getQuiz(quizId);
}

function getQuiz(id) {
	// Make a HTTP GET Request for starting quiz
	axios.defaults.withCredentials = true;
	axios
		.get(baseAPI + "/api/quiz/take-quiz/" + id, {
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		})
		.then((response) => {
			// save user in session storage
			sessionStorage.setItem(
				"eduQuiz_Active_Quiz",
				JSON.stringify(response.data)
			);
			location = "./quiz.html";
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
