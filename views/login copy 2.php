<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["username"]) && isset($_POST["password"])) {
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
        $lockoutTime = (int)$user['lockout_time']; // Retrieve lockout time from database
        $currentTime = time();

        // Lockout durations for multiple failed attempts
        $lockOutDuration = [15, 30, 60]; // Lockout duration in seconds

        // Check if account is locked
        if ($lockoutTime > $currentTime) {
            $_SESSION['lockout_time'] = $lockoutTime - $currentTime;
            $_SESSION['error'] = "Account is locked. Please try again after " . $_SESSION['lockout_time'] . " seconds.";
            header("Location: login.php");
            exit();
        }

        // Verify password
        if (password_verify($password, $user['password'])) {
            // Reset failed attempts and lockout time
            $stmt = $conn->prepare("UPDATE users_credential SET failed_attempts = 0, lockout_time = 0 WHERE username = :username");
            $stmt->bindParam(':username', $username);
            $stmt->execute();

            $_SESSION['username'] = $username;
            header('Location: dashboard.php');
            exit();
        } else {
            // Increment failed attempts
            $failedAttempts++;

            // Lock the account if failed attempts exceed threshold
            if ($failedAttempts > 3) {
                $lockDuration = $lockOutDuration[min($failedAttempts - 4, count($lockOutDuration) - 1)];
                $newLockoutTime = $currentTime + $lockDuration;

                $stmt = $conn->prepare("UPDATE users_credential SET failed_attempts = :failedAttempts, lockout_time = :lockoutTime WHERE username = :username");
                $stmt->bindParam(':failedAttempts', $failedAttempts);
                $stmt->bindParam(':lockoutTime', $newLockoutTime);
                $stmt->bindParam(':username', $username);
                $stmt->execute();

                $_SESSION['lockout_time'] = $lockDuration;
                $_SESSION['error'] = "Too many failed attempts. Account locked for $lockDuration seconds.";
                header("Location: login.php");
                exit();
            } else {
                // Update failed attempts
                $stmt = $conn->prepare("UPDATE users_credential SET failed_attempts = :failedAttempts WHERE username = :username");
                $stmt->bindParam(':failedAttempts', $failedAttempts);
                $stmt->bindParam(':username', $username);
                $stmt->execute();

                // Show forgot password link after 2 failed attempts
                if ($failedAttempts >= 2) {
                    $_SESSION['forgot_password'] = true;
                }

                $_SESSION['error'] = "Invalid password.";
                header("Location: login.php");
                exit();
            }
        }
    } else {
        $_SESSION['error'] = "No account associated with that username.";
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
        let lockoutTime = <?php echo isset($_SESSION['lockout_time']) ? $_SESSION['lockout_time'] : 0; ?>;

        function startLockoutTimer() {
            const lockoutMessage = document.getElementById("lockoutMessage");
            const loginButton = document.getElementById("loginButton");
            const registerLink = document.getElementById("registerLink");

            if (lockoutTime > 0) {
                loginButton.disabled = true;
                registerLink.style.pointerEvents = "none";
                lockoutMessage.innerText = `Please try again in ${lockoutTime} seconds.`;

                const interval = setInterval(() => {
                    lockoutTime--;
                    lockoutMessage.innerText = `Please try again in ${lockoutTime} seconds.`;

                    if (lockoutTime <= 0) {
                        clearInterval(interval);
                        loginButton.disabled = false;
                        registerLink.style.pointerEvents = "auto";
                        lockoutMessage.innerText = "";
                    }
                }, 1000);
            }
        }

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
                        echo $_SESSION['error'] = "";
                    }
                    ?>
                    <span id="lockoutMessage"></span>
                    <?php
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
                    <i id="togglePassword" class="fa fa-eye" onclick="togglePassword()" style="cursor:pointer;position:absolute;right:10px;top:35px;"></i>
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
