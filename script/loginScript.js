// "use strict";

// // Validate length of input
// function validateLength(label, value, min, max, specificErr = "characters") {
//     if (value.length < min) {
//         return `${label} must be at least ${min} ${specificErr}.`;
//     } else if (value.length > max) {
//         return `${label} must be no more than ${max} ${specificErr}.`;
//     }
//     return false;
// }

// // Validate if there's a special character in the input
// function hasSpecialChar(label, input) {
//     if (/[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`]/.test(input)) {
//         return `${label} must not contain special characters.`;
//     }
//     return false;
// }

// // Check for double spaces or leading spaces
// function hasDoubleSpace(str) {
//     if (str.startsWith(" ")) {
//         return true;
//     }
//     return /\s{2,}/.test(str);
// }

// function validateLoginForm(event) {
//     event.preventDefault();

//     const form = document.forms["form"];
//     const message = document.getElementById("message");

//     // Get input values
//     const username = form["username"].value.trim();
//     const password = form["password"].value.trim();

//     const validateUsername = validateLength("Username", username, 3, 10);
//     const validatedPassword = validateLength("Password", password, 8, 10);

//     // Clear any previous messages
//     message.textContent = "";
//     message.style.display = "block";

//     if (validateUsername) {
//         message.textContent = `Error: ${validateUsername}`;
//         setTimeout(() => {
//             message.style.display = "none";
//         }, 4000);
//         return false;
//     }

//     if (validatedPassword) {
//         message.textContent = `Error: ${validatedPassword}`;
//         setTimeout(() => {
//             message.style.display = "none";
//         }, 4000);
//         return false;
//     }

//     if (hasDoubleSpace(username) || hasDoubleSpace(password)) {
//         message.textContent = `No double spaces allowed in username or password.`;
//         setTimeout(() => {
//             message.style.display = "none";
//         }, 4000);
//         return false;
//     }

//     // If all validations pass, use fetch to send data to endpoint
    
// }



// Onload
if(localStorage.getItem("user")){
    window.location.href = "index.php";
}
document.addEventListener("DOMContentLoaded", function() {
    let time = parseInt(localStorage.getItem("remainingTime"), 10); 
    if (!Number.isNaN(time)) { 
        setTimer(time);
    }
    return;
});


function togglePassword() {
    const passwordField = document.getElementById("password");
    const toggleIcon = document.getElementById("togglePassword");
    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleIcon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        passwordField.type = "password";
        toggleIcon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

// Prevent form submission and validate it
function validateLoginForm(event) {
    event.preventDefault(); // Prevent default form submission
    const form = document.forms["form"];
    const message = document.getElementById("message");

    // Get input values
    const username = form["username"].value.trim();
    const password = form["password"].value.trim();

    // Validate username and password
    const validateUsername = validateLength("Username", username, 3, 10);
    const validatePassword = validateLength("Password", password, 8, 20); // updated max length

    // Clear previous messages
    message.textContent = "";
    message.style.display = "block";

    if (validateUsername) {
        message.textContent = `Error: ${validateUsername}`;
        setTimeout(() => {
            message.style.display = "none";
        }, 4000);
        return false;
    }

    if (validatePassword) {
        message.textContent = `Error: ${validatePassword}`;
        setTimeout(() => {
            message.style.display = "none";
        }, 4000);
        return false;
    }

    if (hasDoubleSpace(username) || hasDoubleSpace(password)) {
        message.textContent = `No double spaces allowed in username or password.`;
        setTimeout(() => {
            message.style.display = "none";
        }, 4000);
        return false;
    }

    // If all validations pass, use fetch to send data to endpoint
    loginUser(username, password);
}

function validateLength(label, value, min, max) {
    if (value.length < min) {
        return `${label} must be at least ${min} characters.`;
    } else if (value.length > max) {
        return `${label} must be no more than ${max} characters.`;
    }
    return false;
}

function hasDoubleSpace(str) {
    if (str.startsWith(" ")) {
        return true;
    }
    return /\s{2,}/.test(str);
}
const loginButton = document.getElementById("loginButton");
const registerLink = document.getElementById("registerLink");





function setTimer(remainingTime) {
    const timerElement = document.getElementById("message");
    let timeRemaining = remainingTime;
    loginButton.style.cursor = "not-allowed";
    loginButton.disabled = true;
    registerLink.style.cursor = "not-allowed";
    registerLink.disabled = true;
    registerLink.href = "";
    registerLink.removeAttribute("href"); 


    const countdown = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = `Too many failed attempts. Account locked for ${timeRemaining} seconds`;
        localStorage.setItem("remainingTime", timeRemaining)
        console.log(parseInt(localStorage.getItem("remainingTime")));
        
        // // Disable the back button
        
        history.pushState(null, null, location.href);
        window.onpopstate = function () {
            history.go(1);
        };
        
        

        

        // When the time runs out, stop the timer and show the message
        if (timeRemaining <= 0) {
            clearInterval(countdown);
            localStorage.removeItem("remainingTime")
            timerElement.style.display = "none";
            window.onpopstate = null;
            history.pushState(null, "", location.href);


            loginButton.style.cursor = "pointer"; 
            loginButton.disabled = false; 

            registerLink.style.cursor = "pointer"; 
            registerLink.removeAttribute("disabled"); 
            registerLink.href = "signup.php";

        }
    }, 1000); // Update every 1 second
}

// Function to make the API call and send login request
let counts = 0;

function loginUser(username, password) {
    const message = document.getElementById("message");
    
    
    fetch('../server/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
    .then(response => response.json())
    .then(data => {
        // const reset = document.querySelector(".reset");
        
        if (data.success) {
            message.textContent = "Login successful! Welcome " + " " + data.user["First_Name"];
            message.style.color = "green";
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("user", JSON.stringify(data.user));
            setTimeout(() => {
                // console.log(JSON.parse(localStorage.getItem("user")))
                window.location.href =  'index.php';
            }, 3000);
        } else {
            message.innerHTML = ` Error: ${data.error}`;
            // console.log(counts)
            if (!data.error.includes("User not found")) {
                counts++;
                if(counts === 2){
                    console.log(counts)
                    message.innerHTML = `Wrong Password! <p class="mt-5 text-gray-500">Forgot Password? <a href="index.php" style="text-decoration: underline;">Reset Password Here</a></p>`;
                }
            }
        

            

            // If the error is related to lockout, start the timer
            if (data.error.includes('locked')) {
                const match = data.error.match(/(\d+) seconds/); // Extract number of seconds from the error message
                if (match && match[1]) {
                    const lockoutTime = parseInt(match[1]);
                    setTimer(lockoutTime); // Start the countdown timer
                    
                    localStorage.setItem("lockout-time", lockoutTime);

                    
                }
            }
        }
    })
    .catch(error => {
        message.textContent = `Error: ${error.message}`;
        setTimeout(() => {
            message.style.display = "none";
        }, 4000);
    });
}

