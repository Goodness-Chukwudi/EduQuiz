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
	//TO DO:  Display any special instruction and information from creators

	location = "./quiz.html";
}
