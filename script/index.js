const isNotLoggedIn = document.getElementById("isNotLoggedIn");
const onceLoggedIn = document.getElementById("onceLoggedIn");
const isLoggedIn = localStorage.getItem("loggedIn");
const isLoggedInSection = document.getElementById("isLoggedIn"); 
const loginregBtn = document.getElementById("loginregBtn");

// Check if the user is logged in
if (!isLoggedIn || !localStorage.getItem("user")) {
    // If not logged in or user data doesn't exist, show the "not logged in" section
    isNotLoggedIn.style.display = "block";
    isLoggedInSection.style.display = "none"; // Hide the "logged in" section (including logout button)
    onceLoggedIn.style.display = "none";
    loginregBtn.style.display = "flex"
} else {
    // If logged in, show the "logged in" section
    isNotLoggedIn.style.display = "none";
    isLoggedInSection.style.display = "flex"; // Show the "logged in" section (including logout button)
    onceLoggedIn.style.display = "block";
    loginregBtn.style.display = "none";
    
    // Retrieve and display user information
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.First_Name) {
        // If user has a First_Name, display it in the "username" element
        document.getElementById("username").innerHTML = `<p class="text-blue-900">${user.First_Name}</p>`;
        document.getElementById("name").textContent = `${user.First_Name} ${user.Last_Name}`;
        document.getElementById("email").textContent = `${user.Email}`;
    } else {
        // If no First_Name found, hide the logged-in section (or show fallback content)
        isLoggedInSection.style.display = "none";
    }
}

function logout(){
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    window.location.href =  "login.php";
}
