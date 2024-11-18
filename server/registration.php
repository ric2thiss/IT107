<?php
require('db.php');
header('Content-Type: application/json');

// error_reporting(E_ALL);
// ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    // Validate JSON input
    if ($data === null) {
        echo json_encode(["error" => "Invalid JSON data."]);
        exit;
    }

    // Retrieve and trim form inputs
    $idnumber = trim($data["idnumber"] ?? '');
    $firstname = trim($data["firstname"] ?? '');
    $lastname = trim($data["lastname"] ?? '');
    $middleinitial = trim($data["middleinitial"] ?? '');
    $extensionname = trim($data["extensionname"] ?? '');
    $email = trim($data["email"] ?? '');
    $sex = trim($data["sex"] ?? '');
    $purok = trim($data["purok"] ?? '');
    $barangay = trim($data["barangay"] ?? '');
    $city = trim($data["city"] ?? '');
    $province = trim($data["province"] ?? '');
    $country = trim($data["country"] ?? '');
    $zip = trim($data["zip"] ?? '');
    $username = trim($data["username"] ?? '');
    $password = trim($data["password"] ?? '');
    $reenterpassword = trim($data["reenterpassword"] ?? '');

    // Validate passwords match
    // if ($password != $reenterpassword) {
    //     echo json_encode(["error" => "Passwords do not match."]);
    //     exit;
    // }

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["error" => "Invalid email format."]);
        exit;
    }

    // Check if username, ID number, or email already exists
    if (usernameExists($username)) {
        echo json_encode(["error" => "Username already exists."]);
        exit;
    }

    if (idnumberExists($idnumber)) {
        echo json_encode(["error" => "ID number already exists."]);
        exit;
    }

    if (emailExists($email)) {
        echo json_encode(["error" => "Email already exists."]);
        exit;
    }

    // Insert data into the database
    if (insertData($idnumber, $firstname, $lastname, $middleinitial, $extensionname, $email, $sex, $purok, $barangay, $city, $province, $country, $zip, $username, $hashedPassword)) {
        echo json_encode(["success" => "Registration successful!"]);
    } else {
        echo json_encode(["error" => "An error occurred. Please try again."]);
    }
}

function insertData($idnumber, $firstname, $lastname, $middleinitial, $extensionname, $email, $sex, $purok, $barangay, $city, $province, $country, $zip, $username, $password) {
    try {
        $conn = DbConnection(); // Get the database connection
        $sql = "INSERT INTO users_credential (idnumber, First_Name, Last_Name, Middle_Initial, Extension_Name, Email, Sex, Purok, Barangay, City, Province, Country, Zip_Code, Username, Password)
                VALUES (:idnumber, :firstname, :lastname, :middleinitial, :extensionname, :email, :sex, :purok, :barangay, :city, :province, :country, :zip, :username, :password)";

        $stmt = $conn->prepare($sql);

        // Bind parameters
        $stmt->bindParam(':idnumber', $idnumber);
        $stmt->bindParam(':firstname', $firstname);
        $stmt->bindParam(':lastname', $lastname);
        $stmt->bindParam(':middleinitial', $middleinitial);
        $stmt->bindParam(':extensionname', $extensionname);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':sex', $sex);
        $stmt->bindParam(':purok', $purok);
        $stmt->bindParam(':barangay', $barangay);
        $stmt->bindParam(':city', $city);
        $stmt->bindParam(':province', $province);
        $stmt->bindParam(':country', $country);
        $stmt->bindParam(':zip', $zip);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $password);

        return $stmt->execute();
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        echo json_encode(["error" => "An internal error occurred."]);
        return false;
    }
}

function usernameExists($username) {
    $conn = DbConnection();
    $stmt = $conn->prepare("SELECT COUNT(*) FROM users_credential WHERE Username = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    return $stmt->fetchColumn() > 0;
}

function emailExists($email) {
    $conn = DbConnection();
    $stmt = $conn->prepare("SELECT COUNT(*) FROM users_credential WHERE Email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    return $stmt->fetchColumn() > 0;
}

function idnumberExists($idnumber) {
    $conn = DbConnection();
    $stmt = $conn->prepare("SELECT COUNT(*) FROM users_credential WHERE idnumber = :idnumber");
    $stmt->bindParam(':idnumber', $idnumber);
    $stmt->execute();
    return $stmt->fetchColumn() > 0;
}
?>
