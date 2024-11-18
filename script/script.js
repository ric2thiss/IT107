// "use strict";

// Specified functions
const toggleShowPassword = document.getElementById("toggleShowPassword");
toggleShowPassword.addEventListener("click", () => {
    const passwordInput = document.getElementById("password");
    const reenteredPasswordInput = document.getElementById("reenterpassword");

    // Toggle the type for both password and reentered password fields
    if (passwordInput.getAttribute("type") === "password") {
        passwordInput.setAttribute("type", "text");
        reenteredPasswordInput.setAttribute("type", "text");
    } else {
        passwordInput.setAttribute("type", "password");
        reenteredPasswordInput.setAttribute("type", "password");
    }
});
 // Display validation errors
 const errorDivContainer = document.querySelector(".err-div");
 const errors = document.querySelector(".error");
 errorDivContainer.addEventListener("click", ()=>{
     errorDivContainer.style.transform = "translateX(-100%)";
 })
// Event listener for zip code
document.getElementById('zip').addEventListener('keyup', function(event) {
    const zip = event.target.value;

    if (zip.length > 3) { 
        fetch(`https://api.zippopotam.us/ph/${zip}`)
            .then(res => res.json())
            .then(data => {
                if (data.places && data.places.length > 0) {
                    document.getElementById('city').value = data.places[0]['place name'];
                }
            })
            .catch(err => {
                console.error('Error:', err);
                document.getElementById('city').value = '';
            });
    }
});


// Real-Time check password strength
document.getElementById("password").addEventListener("keyup", (event) => {
    const password = event.target.value;
    const strength = checkPasswordStrength(password);

    // Display the strength result
    const strengthDiv = document.getElementById("password-strength");
    switch (strength) {
        case "strong":
            strengthDiv.textContent = " * Password strength: Strong";
            strengthDiv.style.color = "green";
            break;
        case "medium":
            strengthDiv.textContent = "* Password strength: Medium";
            strengthDiv.style.color = "orange";
            break;
        case "weak":
            strengthDiv.textContent = "* Password strength: Weak";
            strengthDiv.style.color = "red";
            break;
        default:
            strengthDiv.textContent = "";
    }
});

// Re-Enter Password
document.getElementById("reenterpassword").addEventListener("keyup", (event) => {
    const reenteredPassword = event.target.value;
    const isMatched = validatePasswordMatch(document.getElementById("password").value, reenteredPassword);
    if(!isMatched){
        document.getElementById("password-match").textContent = "Matched Password";
        document.getElementById("password-match").style.color = "green";
    }else{
        document.getElementById("password-match").textContent = "Password does not match";
        document.getElementById("password-match").style.color = "red";
    }
    
    if(reenteredPassword == ""){
        document.getElementById("password-match").textContent = "";
    }
});



// Reusable Functions

// Validate length of input
function validateLength(label, value, min, max, specificErr = "characters") {
    if (value.length < min) {
        return `${label} must be at least ${min} ${specificErr}.`;
    } else if (value.length > max) {
        return `${label} must be no more than ${max} ${specificErr}.`;
    }
    return false;
}

// Validated if theres a special character of the input
function hasSpecialChar(label, input){
    if( /[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`]/.test(input)){
        return `${label} must not contain special characters.`
    }
    return false;
}
// Check for double spaces or more
function hasDoubleSpace(str) {
    // Check if the input starts with a space in case if the trim doesnt work 
    // This shoud be like a call back
    if (str.startsWith(" ")) {
        return true;
    }
    // Check for two or more consecutive spaces
    return /\s{2,}/.test(str);
}

// Check for three consecutive uppercase or lowercase letters
function hasConsecutiveChars(value) {
    let consecutiveCount = 1;
    value = value.toLowerCase(); // To handle both upper and lower case
    for (let i = 1; i < value.length; i++) {
        if (value[i] === value[i - 1]) {
            consecutiveCount++;
            if (consecutiveCount === 3) {
                return true;
            }
        } else {
            consecutiveCount = 1;
        }
    }
    return false;
}

// Check if each word starts with a capital letter and others are lowercase
function validateNameCapitalization(label = "Input",name) {
    const regex = /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/;
    if (!regex.test(name)) {
        return `${label}: The first letter of each word must be capitalized (e.g., Juan Carlo).`;
    }
    return false;
}
function validateFirstLetterCapitalization(label = "Input",str) {
    const regex = /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/;
    if (!regex.test(str)) {
        return `${label}: The first letter of each word must be capitalized (e.g., Capital The First Letter).`;
    }
    return false;
}

function hasDigit(label, str){
    if( /\d/.test(str)){
        return `${label} must not contain a number`;
    }
    return;
    // return /\d/.test(str);
}

// Validate middle initial (optional field)
function validateMiddleInitial(middleInitial) {
    hasSpecialChar("Middle Initial" , middleInitial)
    if (middleInitial === "") {
        return false;
    }
    if(hasSpecialChar("Middle Initial" , middleInitial)) return hasSpecialChar("Middle Initial" , middleInitial);
    if (middleInitial === middleInitial.toLowerCase()) {
        return "Middle initial must be capitalized.";
    }
    if (middleInitial.length > 1) {
        return "Middle initial must not greater than 2 characters.";
    }
    return false;
}
// Validate name extension
function validateNameExtension(extension) {
    const validExtensions = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'Jr', 'Sr'];
    return extension === '' || validExtensions.includes(extension) ? false : "Invalid extension name.";
}

// Validate address fields
function validateAddress(purok, barangay, city, province, country, zip) {
    if (!purok || !barangay || !city || !province || !country || !zip) {
        return "All address fields are required.";
    }

    if (hasDoubleSpace(purok) || hasDoubleSpace(barangay) || hasDoubleSpace(city) || hasDoubleSpace(province) || hasDoubleSpace(country)) {
        return "No double spaces allowed in address fields.";
    }

    if(validateFirstLetterCapitalization("Purok",purok) || validateFirstLetterCapitalization("Barangay",barangay) || validateFirstLetterCapitalization("City",city)
        || validateFirstLetterCapitalization("Province",province) || validateFirstLetterCapitalization("Country",country)){
            return validateFirstLetterCapitalization("Purok",purok) || validateFirstLetterCapitalization("Barangay",barangay) || validateFirstLetterCapitalization("City",city)
            || validateFirstLetterCapitalization("Province",province) || validateFirstLetterCapitalization("Country",country)
    }

    const zipValidation = validateLength("Zip Code", zip, 4, 6);
    if (zipValidation) {
        return zipValidation;
    }

    return null;
}

// Validate email
function validateEmail(email) {
    const atSymbolIndex = email.indexOf("@");
    const dotIndex = email.lastIndexOf(".");

    if (atSymbolIndex === -1 || dotIndex === -1 || atSymbolIndex > dotIndex || atSymbolIndex < 1 || dotIndex - atSymbolIndex < 2) {
        return "Invalid email address.";
    }
    return false;
}

// Empty function to check if the username already exists
function checkUsernameExists(username) {
    // Logic to check if the username exists in the database
    return false; // Placeholder return statement
}

// Validate sex input
function validateSex(sex) {
    
    if (!sex) {
        return "Please select a valid gender.";
    }
    return false;
}

// Check password strength
function checkPasswordStrength(password) {
    const length = password.length;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`]/.test(password);

    if (length >= 8 && hasLetter && hasDigit && hasSpecialChar) {
        return "strong";
    } else if (length >= 8 && hasLetter && hasDigit) {
        return "medium";
    } else if (length >= 8 && hasLetter) {
        return "weak";
    } else {
        return "invalid";
    }
}

// Validate if passwords match
function validatePasswordMatch(password, reEnteredPassword) {
    if (password !== reEnteredPassword) {
        return "Passwords do not match.";
    }
    return null;
}

// Registration form validation
function validateRegForm(event) {
    event.preventDefault();
    const form = document.forms['form'];

    // Get input values
    const idnumber = form["idnumber"].value.trim();
    const firstname = form["firstname"].value.trim();
    const lastname = form["lastname"].value.trim();
    const middleinitial = form["middleinitial"].value.trim();
    const extensionname = form["extensionname"].value.trim();
    const email = form["email"].value.trim();
    const sex = form["sex"].value;
    const purok = form["purok"].value.trim();
    const barangay = form["barangay"].value.trim();
    const city = form["city"].value.trim();
    const province = form["province"].value.trim();
    const country = form["country"].value.trim();
    const zip = form["zip"].value.trim();
    const username = form["username"].value.trim();
    const password = form["password"].value.trim();
    const reenterpassword = form["reenterpassword"].value.trim();

    // Check double spaces
    // if (hasDoubleSpace(firstname) || hasDoubleSpace(lastname) || hasDoubleSpace(username)) {
    //     // alert("No double spaces allowed in names or username.");
    //     errors.textContent = `No double spaces allowed in names or username`;
    //     errorDivContainer.style.transform = "translateX(0)"; 
    //     return;
    // }

    if (hasDoubleSpace(firstname)) {
        errors.textContent = `Double spaces are not allowed in the First Name field.`;
        errorDivContainer.style.transform = "translateX(0)";
        return;
    }
    if (hasDoubleSpace(lastname)) {
        errors.textContent = `Double spaces are not allowed in the Last Name field.`;
        errorDivContainer.style.transform = "translateX(0)";
        return;
    }
    if (hasDoubleSpace(email)) {
        errors.textContent = `Double spaces are not allowed in the Email field.`;
        errorDivContainer.style.transform = "translateX(0)";
        return;
    }
    if (hasDoubleSpace(purok)) {
        errors.textContent = `Double spaces are not allowed in the Purok address field.`;
        errorDivContainer.style.transform = "translateX(0)";
        return;
    }
    if (hasDoubleSpace(barangay)) {
        errors.textContent = `Double spaces are not allowed in the Barangay address field.`;
        errorDivContainer.style.transform = "translateX(0)";
        return;
    }
    if (hasDoubleSpace(city)) {
        errors.textContent = `Double spaces are not allowed in the City address field.`;
        errorDivContainer.style.transform = "translateX(0)";
        return;
    }
    if (hasDoubleSpace(province)) {
        errors.textContent = `Double spaces are not allowed in the Province address field.`;
        errorDivContainer.style.transform = "translateX(0)";
        return;
    }
    if (hasDoubleSpace(country)) {
        errors.textContent = `Double spaces are not allowed in the Country field.`;
        errorDivContainer.style.transform = "translateX(0)";
        return;
    }
    if (hasDoubleSpace(username)) {
        errors.textContent = `Double spaces are not allowed in the Username field.`;
        errorDivContainer.style.transform = "translateX(0)";
        return;
    }
    if (hasDoubleSpace(password)) {
        errors.textContent = `Double spaces are not allowed in the Password field.`;
        errorDivContainer.style.transform = "translateX(0)";
        return;
    }
    if (hasDoubleSpace(reenterpassword)) {
        errors.textContent = `Double spaces are not allowed in the Re-Entered Password field.`;
        errorDivContainer.style.transform = "translateX(0)";
        return;
    }
    

    // Check three consecutive characters
    const fieldsToCheck = [firstname, lastname, username, password, purok, barangay, city, province, country];
    for (let field of fieldsToCheck) {
        if (hasConsecutiveChars(field)) {
            // alert("No three consecutive identical characters allowed.");
            errors.textContent = `No three consecutive identical characters allowed.`;
            errorDivContainer.style.transform = "translateX(0)"; 
            return;
        }
    }

    // Validate fields
    const idnumberValidation = validateLength("ID No.", idnumber, 5, 10, "numbers") || hasSpecialChar("ID No. " , idnumber)
    const firstnameValidation = validateLength("First Name", firstname, 3, 15) || hasDigit("First Name",firstname) || hasSpecialChar("First Name " , firstname)  || validateNameCapitalization("First Name ", firstname)
    const lastnameValidation = validateLength("Last Name", lastname, 3, 15)||  hasSpecialChar("Last Name " , lastname) || hasDigit("Last Name", lastname) || validateNameCapitalization("Last Name " , lastname);
    const middleinitialValidation = hasDigit("Middle Initial", middleinitial) || validateMiddleInitial(middleinitial);
    const emailValidation = validateEmail(email);
    const extensionnameValidation = validateNameExtension(extensionname);
    const sexValidation = validateSex(sex);
    const addressValidation = validateAddress(purok, barangay, city, province, country, zip);
    const usernameValidation = validateLength("Username", username, 3, 50);
    // const usernameExists = checkUsernameExists(username); // Placeholder for checking username existence. Already implemented the logic in the server
    const passwordValidation = checkPasswordStrength(password);
    const passwordMatchValidation = validatePasswordMatch(password, reenterpassword);

    // console.log(idnumberValidation)
    if(idnumberValidation){
        errors.textContent = idnumberValidation;
        errorDivContainer.style.transform = "translateX(0)";
        return;
    }
    if (firstnameValidation) {
        // alert(firstnameValidation);
        errors.textContent = firstnameValidation;
        errorDivContainer.style.transform = "translateX(0)"; // Slide in
        return;
    }
    if (lastnameValidation) {
        // alert(lastnameValidation);
        errors.textContent = lastnameValidation;
        errorDivContainer.style.transform = "translateX(0)"; 
        return;
    }
    if (middleinitialValidation) {
        // alert(middleinitialValidation);
        errors.textContent = middleinitialValidation;
        errorDivContainer.style.transform = "translateX(0)"; 
        return;
    }
    if (extensionnameValidation) {
        // alert(extensionnameValidation);
        errors.textContent = extensionnameValidation;
        errorDivContainer.style.transform = "translateX(0)";
        return;
    }
    if (emailValidation) {
        // alert(emailValidation);
        errors.textContent = emailValidation;
        errorDivContainer.style.transform = "translateX(0)";
        return;
    }

    if (sexValidation) {
        // alert(sexValidation);
        errors.textContent = sexValidation;
        errorDivContainer.style.transform = "translateX(0)";
        return;
    }

    if (addressValidation) {
        // alert(addressValidation);
        errors.textContent = addressValidation;
        errorDivContainer.style.transform = "translateX(0)";
        return;
    }

    if (usernameValidation) {
        // alert(usernameValidation);
        errors.textContent = usernameValidation;
        errorDivContainer.style.transform = "translateX(0)";
        return;
    }

    // if (usernameExists) {
    //     alert("Username already exists. Please choose a different one.");
    //     return;
    // }

    if (passwordValidation === "invalid") {
        // alert("Password must be at least 8 characters long and contain letters and numbers.");
        errors.textContent = "Password must be at least 8 characters long and contain letters and numbers.";
        errorDivContainer.style.transform = "translateX(0)";
        return;
    }

    if (passwordMatchValidation) {
        // alert(passwordMatchValidation);
        errors.textContent = passwordMatchValidation;
        errorDivContainer.style.transform = "translateX(0)";
        return;
    }

    // alert("Registration is successful!");

    // After the restriction: This part make the data to be an object form
        const registrationData = {
            idnumber,
            firstname,
            lastname,
            email,
            sex,
            purok,
            barangay,
            city,
            province,
            country,
            zip,
            username,
            password,
            middleinitial,
            extensionname
        };
    
        // Send POST request to this endpoint 
        fetch('http://localhost/paquibot/server/registration.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationData)
        })
        .then(async response => {
            console.log("Response:", response); // Log the entire response for debugging
            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || 'Network response was not ok');
            }
            return response.json(); // Ensure the response is JSON
        })
        .then(data => {
            // Query DOM elements
            const successMessage = document.querySelector(".message");
            const errorMessage = document.querySelector(".error-message-container");
            const errorDivContainer = document.querySelector(".err-div");

            // Handle successful registration response
            if (data.success) {
                // successMessage.innerHTML = `<i class="fa-solid fa-circle-check" style="color: green;"></i> ${data.success}`;
                // successMessage.style.color = "green";
                // errorDivContainer.style.transform = "translateX(0)"; // Show success message

                // setTimeout(()=>{
                //     errors.innerHTML = `
                //     <hr>
                //     <h5><strong>Account Details</strong></h5>
                //     <hr>
                //     <p>First Name : <u>${firstname}</u></p>
                //     <p>Last Name : <u>${lastname}</u></p>
                //     <p>Middle Initial : <u>${middleinitial}</u></p>
                //     <p>Extension Name : <u>${extensionname}</u></p>
                //     <p>Email : <u>${email}</u></p>
                //     <p>Sex : <u>${sex.textContent}</u></p>
                //     <p>Purok : <u>${purok}</u></p>
                //     <p>Barangay : <u>${barangay}</u></p>
                //     <p>City : <u>${city}</u></p>
                //     <p>Province : <u>${province}</u></p>
                //     <p>Country : <u>${country}</u></p>
                //     <p>Zip : <u>${zip}</u></p>
                //     <hr>
                //     <h5><strong>Your Account</strong></h5>
                //     <hr>
                //     <p>Username : <u>${username}</u></p>
                //     <p>Password : <u>${password}</u></p>
                    
                //     `;
                //     errorDivContainer.addEventListener("click", ()=>{
                //         window.location ="../views/index.html";
                //     })
                // }, 3000)
                alert(data.success)
                window.location.href = "../views/login.php";
            } else if (data.error) {
                alert(data.error)
                // error.textContent = '';
                // errorMessage.textContent = data.error;
                // errorMessage.style.color = "red";
                // errorDivContainer.style.transform = "translateX(0)"; // Show error message
            }

            // Log the response data for debugging
            console.log("Response data:", data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
            alert("There was an error during registration: " + error.message);
        });

    
}


// Login form validation 

function validateLoginForm(event){
    event.preventDefault();

    const form = document.forms["form"];

    // Get input values
    const username = form["username"].value.trim();
    const password = form["password"].value.trim();

    const validateUsername = validateLength("Username", username, 3, 65);
    const validatedPassword = validateLength("Password", password, 8, 255);

    if(validateUsername){
        errors.textContent = validateUsername;
        errorDivContainer.style.transform = "translateX(0)"; 
        return;
    }

    if(validatedPassword){
        errors.textContent = validatedPassword;
        errorDivContainer.style.transform = "translateX(0)"; 
        return;
    }

    if (hasDoubleSpace(username) || hasDoubleSpace(password)){
        // alert("No double spaces allowed in names or username.");
        errors.textContent = `No double spaces allowed in username or password`;
        errorDivContainer.style.transform = "translateX(0)"; 
        return;
    }
    

    console.log(true)

    return true;

    


}

