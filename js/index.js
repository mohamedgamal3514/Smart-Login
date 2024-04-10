// HTML Element
let passwordInput = document.querySelector("#userPassword");
let showIcon = document.getElementById("showIcon");
let userSignUpName = document.getElementById("userSignUpName");
let UserSignUpEmail = document.getElementById("UserSignUpEmail");
let UserSignUpPassword = document.getElementById("UserSignUpPassword");
let signUpAlert = document.getElementById("signUpAlert");
let signInAlert = document.getElementById("signInAlert");
let userSignInEmail = document.getElementById("userSignInEmail");
let userSignInPassword = document.getElementById("userSignInPassword");
let welcomeDiv = document.getElementById("welcome_div");
let logOutBtn = document.getElementById("logOutBtn");


//Getting Users Saved On Local Storage
let signUparray;
if (localStorage.getItem("users") !== null) {
	signUparray = JSON.parse(localStorage.getItem("users"));
} else {
	signUparray = [];
}

//Function if Signup Inputs is Empty
function signUpInputsIsEmpty() {
	if (userSignUpName.value === "" || UserSignUpEmail === "" || UserSignUpPassword === "") {
		return false;
	} else {
		return true;
	}
};

//Function For Checking Email Is Already Exist 
function isEmailExist() {
	for (let i = 0; i < signUparray.length; i++) {
		if (signUparray[i].userEmail.toLowerCase() == UserSignUpEmail.value.toLowerCase()) {
			console.log(signUparray[i].userEmail);
			return false;
		}
	}
}

// Function For SignUp
function signUp() {
	if (signUpInputsIsEmpty() == false) {
		signUpAlert.innerHTML = `<span class="text-danger">All Inputs required</span>`;
		return false;
	}
	let usersObject = {
		userName: userSignUpName.value,
		userEmail: UserSignUpEmail.value,
		userPassword: UserSignUpPassword.value,
	}
	console.log(usersObject.userEmail)
	if (signUparray.length == 0) {
		signUparray.push(usersObject);
		addToLocalStorage()
		signUpAlert.innerHTML = `<span class="text-success">Successful Registered , Please Sign In</span>`;
		return true;
	}
	if (isEmailExist() == false) {
		signUpAlert.innerHTML = `<span class="text-danger">Email Is Already Exist</span>`;
	} else {
		signUparray.push(usersObject);
		addToLocalStorage()
		signUpAlert.innerHTML = `<span class="text-success">Successful Registered , Please Sign In</span>`;
	}
	clearsignUpInputs();
}

//Function if SignIn Inputs is Empty
function signInInputsIsEmpty() {
	if (userSignInEmail.value === "" || userSignInPassword === "") {
		return false;
	} else {
		return true;
	}
};

// Function For Sign In
function signIn() {
	let email = userSignInEmail.value;
	let password = userSignInPassword.value;
	if (signInInputsIsEmpty() == false) {
		signInAlert.innerHTML = `<span class="text-danger">All Inputs required</span>`;
		return false;
	}
	for (let i = 0; i < signUparray.length; i++) {
		if (signUparray[i].userEmail.toLowerCase() == email.toLowerCase() && signUparray[i].userPassword.toLowerCase() == password.toLowerCase()) {
			localStorage.setItem("userName", signUparray[i].userName);
			location.replace("home.html");
		} else {
			signInAlert.innerHTML = `<span class="text-danger">Incorrect Email Or Password</span>`;
		}
	}
	clearsignInInputs()
}

//Function For Adding Users To Local Storage
function addToLocalStorage() {
	localStorage.setItem("users", JSON.stringify(signUparray));
}

// Function For Showing Password in SignIn Page
function showPasswordsignIn() {
	if (showIcon.classList.contains("fa-eye-slash")) {
		showIcon.classList.replace("fa-eye-slash", "fa-eye");
		userSignInPassword.setAttribute("type", "text");
	} else {
		showIcon.classList.replace("fa-eye", "fa-eye-slash");
		userSignInPassword.setAttribute("type", "password");
	}
};

// Function For Showing Password in SignUp Page
function showPasswordSignUp() {
	if (showIcon.classList.contains("fa-eye-slash")) {
		showIcon.classList.replace("fa-eye-slash", "fa-eye");
		UserSignUpPassword.setAttribute("type", "text");
	} else {
		showIcon.classList.replace("fa-eye", "fa-eye-slash");
		UserSignUpPassword.setAttribute("type", "password");
	}
};


//Function For Clear SignUp Inputs
function clearsignUpInputs() {
	userSignUpName.value = "";
	UserSignUpEmail.value = "";
	UserSignUpPassword.value = "";
};

//Function For Clear SignIn Inputs
function clearsignInInputs() {
	userSignInEmail.value = "";
	userSignInPassword.value = "";
};

// Function For Showing UserName At Home Page
let userWelcomeName = localStorage.getItem("userName");
if (userWelcomeName !== null) {
	welcomeDiv.innerHTML = `<h2>Welcome ${userWelcomeName}</h2>`
}

// Function For Logout
function logOut() {
	location.assign("../index.html");
	localStorage.removeItem("userName");
}

