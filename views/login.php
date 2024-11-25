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
    
</head>
<body>
    <header>
        <section class="container-90 top-nav">
            <div class="header_logo">
                <img src="../assets/img2.svg" alt="LOGO">
            </div>
            <div class="flex gap-10">
                <a id="myhomeBtn" href="index.php" >Home</a>
                <a id="myregBtn" href="signup.php">Register</a>
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
    <script src="../script/loginScript.js"></script>
</body>
</html>
