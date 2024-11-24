<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = trim($_POST["username"]);
    $password = trim($_POST["password"]);

    // Connect to the database
    require_once('../server/db.php');
    $conn = DbConnection();

    // Retrieve user info
    $stmt = $conn->prepare("SELECT * FROM users_credential WHERE username = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    $user = $stmt->fetch();

    if ($user) {
        $failedAttempts = (int)$user['failed_attempts'];
        $lockoutStart = $user['lockout_start'] ? strtotime($user['lockout_start']) : 0;

        // Define lockout durations for specific thresholds
        $lockoutDurations = [3 => 15, 6 => 30, 9 => 60]; // in seconds
        $lockoutDuration = 0;

        // Determine the lockout duration based on failed attempts
        foreach ($lockoutDurations as $threshold => $duration) {
            if ($failedAttempts >= $threshold) {
                $lockoutDuration = $duration;
            }
        }

        // Check if the user is currently locked out
        if ($failedAttempts >= 3 && (time() - $lockoutStart) < $lockoutDuration) {
            $remainingTime = $lockoutDuration - (time() - $lockoutStart);
            $_SESSION['lockout_time'] = $remainingTime;
            header("Location: login.php");
            exit();
        }

        // Password verification
        if (password_verify($password, $user['password'])) {
            // Reset failed attempts on successful login
            $resetStmt = $conn->prepare("UPDATE users_credential SET failed_attempts = 0, lockout_start = NULL WHERE username = :username");
            $resetStmt->bindParam(':username', $username);
            $resetStmt->execute();

            $_SESSION['username'] = $username;
            header('Location: index.php');
            exit();
        } else {
            // Increment failed attempts
            $failedAttempts++;
            $lockoutStart = ($failedAttempts % 3 === 0) ? date("Y-m-d H:i:s") : $user['lockout_start'];

            $updateStmt = $conn->prepare("UPDATE users_credential SET failed_attempts = :failedAttempts, lockout_start = :lockoutStart WHERE username = :username");
            $updateStmt->bindParam(':failedAttempts', $failedAttempts);
            $updateStmt->bindParam(':lockoutStart', $lockoutStart);
            $updateStmt->bindParam(':username', $username);
            $updateStmt->execute();

            // Show "Forgot Password?" after 2 consecutive errors
            if ($failedAttempts >= 2) {
                $_SESSION['forgot_password'] = true;
            }

            $_SESSION['error'] = "Invalid password";
            header("Location: login.php");
            exit();
        }
    } else {
        $_SESSION['error'] = "No account associated with that username";
        header("Location: login.php");
        exit();
    }
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Real Estate Management System - Login</title>
    <link rel="stylesheet" href="../styles/style.css">
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
        // Disable the back button
        history.pushState(null, null, location.href);
        window.onpopstate = function () {
            history.go(1);
        };

        // Timer function to disable login button and register link
        let lockoutTime = <?php echo isset($_SESSION['lockout_time']) ? $_SESSION['lockout_time'] : 0; ?>;
        function startLockoutTimer() {
            if (lockoutTime > 0) {
                document.getElementById("loginButton").disabled = true;
                document.getElementById("registerLink").style.pointerEvents = "none";
                const interval = setInterval(() => {
                    lockoutTime--;
                    document.getElementById("lockoutMessage").innerText = `Please try again in ${lockoutTime} seconds.`;
                    if (lockoutTime <= 0) {
                        clearInterval(interval);
                        document.getElementById("loginButton").disabled = false;
                        document.getElementById("registerLink").style.pointerEvents = "auto";
                        document.getElementById("lockoutMessage").innerText = "";
                    }
                }, 1000);
            }
        }

        // Toggle password visibility
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
    </script>
</head>
<body onload="startLockoutTimer()">
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
                onsubmit="return validateLoginForm(event)"
                method="POST"
                action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>"
            >
                <h1>Login Account</h1>
                <div class="divider"></div>

                <div id="message" style="font-size: .9rem;color:red;">
                    <?php
                    if (isset($_SESSION['error'])) {
                        echo $_SESSION['error'];
                        unset($_SESSION['error']);
                    } elseif (isset($_SESSION['lockout_time'])) {
                        echo "<span id='lockoutMessage'>Please try again in {$_SESSION['lockout_time']} seconds.</span>";
                        unset($_SESSION['lockout_time']);
                    }
                    if (isset($_SESSION['forgot_password'])) {
                        echo "<p>Forgot Password? <a href='reset_password.php' class='text-underline'>Reset Here</a></p>";
                        unset($_SESSION['forgot_password']);
                    }
                    ?>
                </div>

                <div class="form-floating" style="margin-top:1rem;">
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="" required>
                </div>
                <div class="form-floating">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" required>
                    <i id="togglePassword" class="fa fa-eye" onclick="togglePassword()" style="cursor:pointer;position:absolute;right:10px;top: 20px;"></i>
                </div>
                <input type="submit" id="loginButton" value="Login">
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
