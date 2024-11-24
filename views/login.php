<?php
 session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Real Estate Management System - Login</title>
    <link rel="stylesheet" href="../styles/style.css?v=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
    integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @media(min-width: 1024px){
            form { width: 50%; }
        }
    </style>
    <script>
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

        function setTimer(remainingTime) {
            const timerElement = document.getElementById("message");
            let timeRemaining = remainingTime;
          
            

            const countdown = setInterval(() => {
                timeRemaining--;
                timerElement.textContent = `Too many failed attempts. Account locked for ${timeRemaining} seconds`;
                // Disable the back button
                history.pushState(null, null, location.href);
                window.onpopstate = function () {
                    history.go(1);
                };

                

                // When the time runs out, stop the timer and show the message
                if (timeRemaining <= 0) {
                    clearInterval(countdown);
                    timerElement.style.display = "none";
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
                const reset = document.querySelector(".reset");
                
                if (data.success) {
                    message.textContent = "Login successful!";
                    message.style.color = "green";
                } else {
                    message.innerHTML = ` Error: ${data.error}`;
                    counts++;
                    console.log(counts)
                    if(counts === 2){
                        message.innerHTML = `Wrong Password! <p class="mt-5 text-gray-500">Forgot Password? <a href="index.php" style="text-decoration: underline;">Reset Password Here</a></p>`;
                    }

                    

                    // If the error is related to lockout, start the timer
                    if (data.error.includes('locked')) {
                        const match = data.error.match(/(\d+) seconds/); // Extract number of seconds from the error message
                        if (match && match[1]) {
                            const lockoutTime = parseInt(match[1]);
                            setTimer(lockoutTime); // Start the countdown timer
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
    </script>
</head>
<body>
    <header>
        <section class="container-90 top-nav">
            <div class="header_logo">
                <img src="../assets/img2.svg" alt="LOGO">
            </div>
            <div class="flex gap-10">
                <a href="index.php">Home</a>
                <a href="signup.php">Register</a>
            </div>
        </section>
    </header>
    <main>
        <section class="container-90 section-1">
            <form
                name="form"
                method="POST"
                onsubmit="validateLoginForm(event)" >
                <h1>Login Account</h1>
                <div class="divider"></div>

                <div id="message" style="font-size: .9rem;color:red;">
                    <!-- Timer or error message will show here -->
                </div>

                <div class="form-floating" style="margin-top:1rem;">
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="" required>
                </div>
                <div class="form-floating">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" required>
                    <i id="togglePassword" class="fa fa-eye" onclick="togglePassword()" style="cursor:pointer;position:absolute;right:10px;top:37%;"></i>
                </div>
                <input type="submit" id="loginButton" value="Login" style="cursor: pointer;">
                    <!-- <div class="reset">
                       
                    </div> -->
                            
                  
                <p class="mt-4 mb-4">You don't have an account? <a id="registerLink" href="../views/signup.php" class="underline underline-offset-4">Click here</a></p>
            </form>
        </section>
        <section class="section-2"> 
            <img src="../assets/img1.svg" alt="Hero">
        </section>
    </main>
    <footer>
        <p class="container-90"> &copy; 2024 Real Estate Management System. Developed by PAQUIBOT.</p>
    </footer>
</body>
</html>
