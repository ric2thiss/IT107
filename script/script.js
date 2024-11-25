// "use strict";
if(localStorage.getItem("user")){
    window.location.href = "index.php";
}
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
        return `${label} must not more than ${max} ${specificErr}.`;
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
        return `${label}: The first letter of each word must be capitalized (e.g., First Letter Of Each Word).`;
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
// check if there is a digit in string or str
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
        return "Middle initial must be less than 2 letters.";
    }
    return false;
}
// Validate name extension
function validateNameExtension(extension) {
    const validExtensions = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'Jr', 'Sr'];
    return extension === '' || validExtensions.includes(extension) ? false : "Invalid extension name.";
}

function regexImproperCapitalization(label = "Input Field", input) {
    const regexSecond = /^[A-Z][A-Z]/;
    const regexThird = /^.[a-zA-Z][A-Z]/;
    const regexFourConsecutive = /[A-Z]{4}/;
    const regexImproperCapitalization = /[A-Z][a-z]*[A-Z]/;

    if (regexSecond.test(input)) {
        return `The second letter of "${label}" should NOT be capitalized. Only the first letter of each word MUST be capitalized.`;
    }

    if (regexThird.test(input)) {
        return `The third letter of "${label}" should NOT be capitalized. Only the first letter of each word MUST be capitalized.`;
    }

    if (regexFourConsecutive.test(input)) {
        return `The input "${label}" must NOT contain four consecutive uppercase letters.`;
    }

    if (regexImproperCapitalization.test(input)) {
        return `The input "${label}" contains improper capitalization. Only the first letter of each word MUST be capitalized.`;
    }

    return false;
}




// Validate address fields
function validateAddress(purok, barangay, city, province, country, zip) {
    if (!purok || !barangay || !city || !province || !country || !zip) {
        return "All address fields are required.";
    }

    if (hasDoubleSpace(purok) || hasDoubleSpace(barangay) || hasDoubleSpace(city) || hasDoubleSpace(province) || hasDoubleSpace(country)) {
        return "No double spaces allowed in address fields.";
    }

    if(regexImproperCapitalization("Purok",purok) || regexImproperCapitalization("Barangay",barangay) || regexImproperCapitalization("City",city)
        || regexImproperCapitalization("Province",province) || regexImproperCapitalization("Country",country)){
            return regexImproperCapitalization("Purok",purok) || regexImproperCapitalization("Barangay",barangay) || regexImproperCapitalization("City",city)
            || regexImproperCapitalization("Province",province) || regexImproperCapitalization("Country",country)
    }

    const zipValidation = validateLength("Zip Code", zip, 4, 6);
    if (zipValidation) {
        return zipValidation;
    }

    return null;
}


function validateIdNumber(idnumber) {
    // Ensure the format is xxxx-xxxx (4 digits, a dash, then 4 digits)
    const pattern = /^\d{4}-\d{4}$/;
    if(/[a-zA-Z]/.test(idnumber)){
        return "ID Number must not contain any letters.";
    }

    if (/[^0-9-]/.test(idnumber)) {
        return "ID Number must not contain any characters other than numbers and a dash (-).";
    }

    // Validate the format
    if (!pattern.test(idnumber)) {
        return "Invalid ID format! : ID Number must follow the format xxxx-xxxx.";
    }

    return false; // No errors, ID Number is valid
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

// Validate sex input
function validateSex(sex) {
    
    if (!sex) {
        return "Please select a valid gender.";
    }
    return false;
}
// Validate birthdate and age
function validateBirthdate(date, age){
    if(!date){
        return "Please enter a birthdate.";
    }
    if(age <= 18){
        return "You must be at least 18 years old to register.";
    }
    return false;

}

let age = 0;
let date = 0;
const bdate = document.getElementById("birthdate")
    bdate.addEventListener("input", function(){
        date = bdate.value
        const dateParts = date.split("-");
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];
        const dateObject = new Date(year, month - 1, day);
        age = Math.floor((Date.now() - dateObject.getTime()) / (1000 *
        60 * 60 * 24 * 365.25));
        if(age <= 0){
            age = 0
        }
        document.getElementById("age").value = age;
        console.log(date)
    })



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
    // console.log(`Submitted ${date}`)
    // console.log(`Submitted ${age}`)

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
    

    const DoubleSpacingValidation = [
        { field: firstname, label: "First Name" },
        { field: lastname, label: "Last Name" },
        { field: email, label: "Email" },
        { field: purok, label: "Purok address" },
        { field: barangay, label: "Barangay address" },
        { field: city, label: "City address" },
        { field: province, label: "Province address" },
        { field: country, label: "Country" },
        { field: username, label: "Username" },
        { field: password, label: "Password" },
        { field: reenterpassword, label: "Re-Entered Password" },
    ];

    // Loop through each field to check for double spaces
    for (let { field, label } of DoubleSpacingValidation) {
        if (hasDoubleSpace(field)) {
            errors.textContent = `Double spaces are not allowed in the ${label} field.`;
            errorDivContainer.style.transform = "translateX(0)";
            return;
        }
    }

    
    // Check for three consecutive characters
    const fieldsToCheck = [
        { field: firstname, label: "First Name" },
        { field: lastname, label: "Last Name" },
        { field: username, label: "Username" },
        { field: password, label: "Password" },
        { field: purok, label: "Purok" },
        { field: barangay, label: "Barangay" },
        { field: city, label: "City" },
        { field: province, label: "Province" },
        { field: country, label: "Country" },
    ];

    for (let { field, label } of fieldsToCheck) {
        if (hasConsecutiveChars(field)) {
            // Display specific error message for the field
            errors.textContent = `${label} is not allowed to have three identical letters or characters in a row.`;
            errorDivContainer.style.transform = "translateX(0)";
            return;
        }
    }

    // Validate fields
    const idnumberValidation = validateLength("ID No.", idnumber, 8, 9, "numbers (ex. 1234-5678)") ||   validateIdNumber(idnumber)  || hasSpecialChar("ID No. " , idnumber);
    const emailValidation = validateLength("Email", email, 5, 35, " characters long, excluding '@email.com")||validateEmail(email);
    const firstnameValidation = validateLength("First Name", firstname, 3, 15) || regexImproperCapitalization("First Name", firstname)  || hasDigit("First Name",firstname) || hasSpecialChar("First Name " , firstname)  || validateNameCapitalization("First Name ", firstname)
    const lastnameValidation = validateLength("Last Name", lastname, 3, 15)||  regexImproperCapitalization("Last Name", lastname) || hasSpecialChar("Last Name " , lastname) || hasDigit("Last Name", lastname) || validateNameCapitalization("Last Name " , lastname);
    const middleinitialValidation = hasDigit("Middle Initial", middleinitial) || validateMiddleInitial(middleinitial);
    const extensionnameValidation = validateNameExtension(extensionname);
    const birthdateValidation = validateBirthdate(date, age);
    const sexValidation = validateSex(sex);
    const addressValidation = validateAddress(purok, barangay, city, province, country, zip);
    const usernameValidation = validateLength("Username", username, 5, 30);
    // const usernameExists = checkUsernameExists(username); // Placeholder for checking username existence. Already implemented the logic in the server
    const passwordValidation = checkPasswordStrength(password);
    const passwordMatchValidation = validatePasswordMatch(password, reenterpassword);

    // console.log(idnumberValidation)
    if(idnumberValidation){
        errors.textContent = idnumberValidation;
        errorDivContainer.style.transform = "translateX(0)";
        return;
    }
    if (emailValidation) {
        // alert(emailValidation);
        errors.textContent = emailValidation;
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
    if (birthdateValidation) {
        // alert(birthdateValidation);
        errors.textContent = birthdateValidation;
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
    console.log("Before inserting to db : " + idnumber);

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
            extensionname,
            date,
            age
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
            // Handle successful registration response
            if (data.success) {

                alert(data.success)
                window.location.href = "../views/login.php";
            } else if (data.error) {
                alert(data.error)
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

// function validateLoginForm(event){
//     event.preventDefault();

//     const form = document.forms["form"];

//     // Get input values
//     const username = form["username"].value.trim();
//     const password = form["password"].value.trim();

//     const validateUsername = validateLength("Username", username, 3, 65);
//     const validatedPassword = validateLength("Password", password, 8, 255);

//     if(validateUsername){
//         errors.textContent = validateUsername;
//         errorDivContainer.style.transform = "translateX(0)"; 
//         return;
//     }

//     if(validatedPassword){
//         errors.textContent = validatedPassword;
//         errorDivContainer.style.transform = "translateX(0)"; 
//         return;
//     }

//     if (hasDoubleSpace(username) || hasDoubleSpace(password)){
//         // alert("No double spaces allowed in names or username.");
//         errors.textContent = `No double spaces allowed in username or password`;
//         errorDivContainer.style.transform = "translateX(0)"; 
//         return;
//     }
    

//     console.log(true)

//     return true;

    


// }

