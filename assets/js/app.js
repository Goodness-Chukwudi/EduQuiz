//Controls login and log out
"use strict";
// const baseAPI = "http://localhost:5500";
const baseAPI = "https://eduquizng.herokuapp.com";

displayLoginPage(); //Dynamically displays login page for evry page
const logInLink = document.querySelector(".logInLink"),
	signUpLink = document.querySelector(".signUpLink"),
	signupLoginBtn = document.getElementById("signupLoginBtn"),
	logoutBtn = document.querySelector(".logout");

window.addEventListener("DOMContentLoaded", setActiveUser);
logInLink.addEventListener("click", handleLogIn);
signUpLink.addEventListener("click", handleSignUp);
signupLoginBtn.addEventListener("click", handleLoginSignUp);
logoutBtn.addEventListener("click", logoutUser);

//Set the logged in user's email on the drop down
function setActiveUser() {
	let activeUser = JSON.parse(sessionStorage.getItem("eduQuiz_Active_User")),
		userEl = document.querySelector(".activeUserEmail");
	if (activeUser) {
		userEl.textContent = activeUser.userId;
		userEl.classList = "d-block dropdown-item activeUserEmail";
	} else userEl.classList = "d-none dropdown-item activeUserEmail";
}

function handleLogIn() {
	document.querySelector(".confirmPassword").className =
		"row confirmPassword d-none";
	setPopupLabels("Log In");
}
function handleSignUp() {
	document.querySelector(".confirmPassword").className =
		"row confirmPassword";
	setPopupLabels("Sign Up");
}

function setPopupLabels(txt) {
	//sets the appropriate label for either login or sign up
	document.getElementById("signupLoginTitle").textContent = txt;
	signupLoginBtn.value = txt;
}

function handleLoginSignUp(e) {
	e.preventDefault();
	let url = baseAPI + "/api/login",
		data = {
			userId: document.getElementById("username").value,
			password: document.getElementById("password").value,
		};

	if (signupLoginBtn.value === "Sign Up") {
		data.confirmPassword = document.getElementById("confirmPassword").value;
		url = baseAPI + "/api/register";
	}
	// Make a HTTP POST Request for either login or register
	axios.defaults.withCredentials = true;
	axios
		.post(url, data, {
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		})
		.then((response) => {
			// save user in session storage
			sessionStorage.setItem(
				"eduQuiz_Active_User",
				JSON.stringify(response.data)
			);
			alert("successful!");
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

function logoutUser() {
	// Make a HTTP GET Request to log user out
	axios.defaults.withCredentials = true;
	axios
		.get(baseAPI + "/api/logout", {
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		})
		.then((response) => {
			// remove user in session storage
			sessionStorage.removeItem("eduQuiz_Active_User");
			location = "/";
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
