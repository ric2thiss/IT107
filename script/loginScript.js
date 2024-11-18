"use strict";

// Validate length of input
function validateLength(label, value, min, max, specificErr = "characters") {
    if (value.length < min) {
        return `${label} must be at least ${min} ${specificErr}.`;
    } else if (value.length > max) {
        return `${label} must be no more than ${max} ${specificErr}.`;
    }
    return false;
}

// Validate if there's a special character in the input
function hasSpecialChar(label, input) {
    if (/[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`]/.test(input)) {
        return `${label} must not contain special characters.`;
    }
    return false;
}

// Check for double spaces or leading spaces
function hasDoubleSpace(str) {
    if (str.startsWith(" ")) {
        return true;
    }
    return /\s{2,}/.test(str);
}

function validateLoginForm(event) {
    event.preventDefault();

    const form = document.forms["form"];
    const message = document.getElementById("message");

    // Get input values
    const username = form["username"].value.trim();
    const password = form["password"].value.trim();

    const validateUsername = validateLength("Username", username, 3, 65);
    const validatedPassword = validateLength("Password", password, 8, 255);

    // Clear any previous messages
    message.textContent = "";
    message.style.display = "block";

    if (validateUsername) {
        message.textContent = `Error: ${validateUsername}`;
        setTimeout(() => {
            message.style.display = "none";
        }, 4000);
        return false;
    }

    if (validatedPassword) {
        message.textContent = `Error: ${validatedPassword}`;
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

    // If all validations pass, submit the form
    form.submit();
    return true;
}
