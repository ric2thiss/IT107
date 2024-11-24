if(localStorage.getItem("user")){
    window.location.href = "index.php";
}
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
function hasDoubleSpace(input, label) {
    if(/\s{2,}/.test(input)){
        return `Double spaces are not allowed in the ${label} field.`;
    }
    return;
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
// check if there is a digit in string or str
function hasDigit(label, str){
    if( /\d/.test(str)){
        return `${label} must not contain a number`;
    }
    return;
}
// Check if each word starts with a capital letter and others are lowercase
function validateNameCapitalization(label = "Input",name) {
    const regex = /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/;
    if (!regex.test(name)) {
        return `${label}: The first letter of each word must be capitalized (e.g., Juan Carlo).`;
    }
    return false;
}
function capitalizationOfFirstLetterInString(label, input){
    if(input.length){
        if(input[0].length == input[0].length.toLowerCase){
            return `${label} must be a capital letter.`
        }
    }
}
// Validate middle initial (optional field)
function validateMiddleInitial(middleInitial, min, max, specficErr) {
    validateLength("Middle Initial", middleInitial, min, max, specficErr);
    hasSpecialChar("Middle Initial" , middleInitial);
    capitalizationOfFirstLetterInString("Middle Initial", middleInitial)
    return false;
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
function validateFirstLetterCapitalization(label = "Input fields", input) {
    const regex = /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/;
    if (!regex.test(name)) {
        return `${label}: The first letter of each word must be capitalized (e.g., First Letter Of Each Word).`;
    }
    return false;
}
// Validate name extension
function validateNameExtension(extension) {
    const validExtensions = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'Jr', 'Sr'];
    return extension === '' || validExtensions.includes(extension) ? false : "Invalid extension name.";
}
// Validate Address
function validateAddress(purok, barangay, city, province, country, zip) {
    if (!purok || !barangay || !city || !province || !country || !zip) {
        return "All address fields are required.";
    }
    
    hasDoubleSpace(purok, "Purok");
    hasDoubleSpace(barangay, "Barangay");
    hasDoubleSpace(city, "City")
    hasDoubleSpace(province, "Province")
    hasDoubleSpace(country, "Country")

    validateFirstLetterCapitalization("Purok", purok);
    validateFirstLetterCapitalization("Barangay", barangay);
    validateFirstLetterCapitalization("City", city);
    validateFirstLetterCapitalization("Province", province);
    validateFirstLetterCapitalization("Country", country);

    validateLength("Zip Code", zip, 4, 5, "numbers")

    return false;
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



// Validate Registration Form
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

    // Collect all validation errors
    let errors = [];

    // Validate ID number
    let idError = validateLength("ID Number", idnumber, 6, 10, "characters");
    if (idError) errors.push(idError);

    // Validate first name and last name
    let firstNameError = validateNameCapitalization("First Name", firstname);
    if (firstNameError) errors.push(firstNameError);

    let lastNameError = validateNameCapitalization("Last Name", lastname);
    if (lastNameError) errors.push(lastNameError);

    // Validate middle initial
    let middleInitialError = validateMiddleInitial(middleinitial, 1, 1, "character");
    if (middleInitialError) errors.push(middleInitialError);

    // Validate name extension
    let extensionError = validateNameExtension(extensionname);
    if (extensionError) errors.push(extensionError);

    // Validate email
    let emailError = validateEmail(email);
    if (emailError) errors.push(emailError);

    // Validate sex
    let sexError = validateSex(sex);
    if (sexError) errors.push(sexError);

    // Validate address fields
    let addressError = validateAddress(purok, barangay, city, province, country, zip);
    if (addressError) errors.push(addressError);

    // Validate username
    let usernameError = validateLength("Username", username, 4, 20);
    if (usernameError) errors.push(usernameError);

    let specialCharError = hasSpecialChar("Username", username);
    if (specialCharError) errors.push(specialCharError);

    let doubleSpaceError = hasDoubleSpace(username, "Username");
    if (doubleSpaceError) errors.push(doubleSpaceError);

    // Validate password
    let passwordStrength = checkPasswordStrength(password);
    if (passwordStrength === "invalid") {
        errors.push("Password must be at least 8 characters long and include letters, numbers, and special characters.");
    }

    // Validate if passwords match
    let passwordMatchError = validatePasswordMatch(password, reenterpassword);
    if (passwordMatchError) errors.push(passwordMatchError);

    // Display errors or submit the form
    if (errors.length > 0) {
        // Display errors (assumes you have a div with ID 'error-container' to show the messages)
        const errorContainer = document.getElementById("error-message-container");
        errorContainer.innerHTML = errors.map(error => `<p>${error}</p>`).join("");
        errorContainer.style.display = "block";
    } else {
        // If no errors, submit the form
        form.submit();
    }
}
