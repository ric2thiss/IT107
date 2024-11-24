<?php
require('db.php');
header('Content-Type: application/json');

// Enable error reporting for debugging (if needed)
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get raw POST data
    $data = json_decode(file_get_contents("php://input"), true);

    // Validate JSON input
    if ($data === null) {
        echo json_encode(["error" => "Invalid JSON data."]);
        exit;
    }

    // Check if username and password are provided
    if (!isset($data['username']) || !isset($data['password'])) {
        echo json_encode(["error" => "Username and password are required."]);
        exit;
    }

    $username = $data['username'];
    $password = $data['password'];

    // Call the Login function with username and password
    Login($username, $password);
}

function Login($username, $password) {
    try {
        // Get DB connection
        $conn = DbConnection();

        // Prepare query to check if user exists
        $stmt = $conn->prepare("SELECT * FROM users_credential WHERE Username = :username LIMIT 1");
        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        $stmt->execute();

        // Fetch the user record
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            // Check if the account is locked
            $currentTime = time();
            if ($user["lockout_time"] > $currentTime) {
                $remainingTime = $user["lockout_time"] - $currentTime;
                echo json_encode(["error" => "Account is locked. Please try again in $remainingTime seconds."]);
                return;
            }

            // Verify the password
            if (password_verify($password, $user['Password'])) {
                // Reset failed attempts and lockout time on successful login
                $stmtUpdate = $conn->prepare("UPDATE users_credential SET failed_attempts = 0, lockout_time = 0 WHERE Id = :Id");
                $stmtUpdate->bindParam(':Id', $user["Id"], PDO::PARAM_INT);
                $stmtUpdate->execute();

                // Password is correct, return success
                echo json_encode(["success" => "Login successful"]);
            } else {
                // Handle incorrect password
                $failedAttempts = $user["failed_attempts"] + 1;
                $lockoutDuration = 0;
                
                // Determine lockout duration based on failed attempts
               if ($failedAttempts === 3) {
                    $lockoutDuration = 15; // Lockout for 15 seconds
    
                } else if ($failedAttempts === 6) {
                    $lockoutDuration = 30; // Lockout for 30 seconds
                } else if ($failedAttempts === 9) {
                    $lockoutDuration = 60; // Lockout for 60 seconds

                }




                // Update failed attempts and lockout time if needed
                $lockoutTime = $lockoutDuration > 0 ? time() + $lockoutDuration : 0;
                $stmtUpdate = $conn->prepare(
                    "UPDATE users_credential SET failed_attempts = :failed_attempts, lockout_time = :lockout_time WHERE Id = :Id"
                );
                $stmtUpdate->bindParam(':failed_attempts', $failedAttempts, PDO::PARAM_INT);
                $stmtUpdate->bindParam(':lockout_time', $lockoutTime, PDO::PARAM_INT);
                $stmtUpdate->bindParam(':Id', $user["Id"], PDO::PARAM_INT);
                $stmtUpdate->execute();                
                if ($lockoutDuration > 0) {
                    echo json_encode(["error" => "Too many failed attempts. Account locked for $lockoutDuration seconds."]);
                }else {
                    if($user["failed_attempts"] > 8){
                        $reset = $conn->prepare(
                            "UPDATE users_credential SET failed_attempts = 1, lockout_time = 0 WHERE Id = :Id"
                        );
                        $reset->bindParam(':Id', $user["Id"], PDO::PARAM_INT);
                        $reset->execute();
                    }
                    echo json_encode(["error" => "Wrong password."]);
                }
            }
        } else {
            // User does not exist
            echo json_encode(["error" => "User not found."]);
        }
    } catch (PDOException $e) {
        // Catch and handle database-related errors
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
}

?>
