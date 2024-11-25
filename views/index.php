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
                <a href="index.php"><img src="../assets/img2.svg" alt="LOGO"></a>
            </div>
            <div class="flex gap-10" style="display:flex; align-items:center;">
                <!-- <a href="index.php">Home</a> -->
                <div class=" flex gap-4" id="loginregBtn">
                    <a href="login.php">LogIn</a>
                    <a href="signup.php">Register</a>
                </div>
                <div id="isLoggedIn">
                    <div style="display:flex; align-items:center; gap:1rem;">
                        <p id="username"></p>
                        <button onclick="logout()">LogOut</button>
                    </div>
                </div>
            </div>
        </section>
    </header>
    <main>
        <section class="container-90 section-1">
            <div id="isNotLoggedIn" style="display:none;">
                <div class="sm:max-w-lg">
                    <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Your Dream Home Awaits</h1>
                    <p class="mt-4 text-xl text-gray-500">Discover, buy, and sell properties effortlessly. Find your perfect home or get the best value for your real estate with our trusted platform.</p>
                    <a href="#" class="mt-10 inline-block rounded-md border border-transparent bg-blue-900 px-8 py-3 text-center font-medium text-white hover:bg-blue-800">Browse Property</a>
                </div>
            </div>

            <!-- Loggedin -->
            <div id="onceLoggedIn" style="display:none;">
                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">You are logged in!</h2>
                </div>
                <div class="flex min-w-0 gap-x-4 my-10">
                    <img class="size-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                    <div class="min-w-0 flex-auto">
                        <p class="text-sm/6 font-semibold text-gray-900" id="name"></p>
                        <p class="mt-1 truncate text-xs/5 text-gray-500" id="email"></p>
                    </div>

                </div>
                <button onclick="logout()" class="inline-block px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                        Logout
                </button>

            </div>
        </section>
        <section class="section-2"> 
            <img src="../assets/img1.svg" alt="Hero">
        </section>
    </main>
    <footer>
        <p class="container-90"> &copy; 2024 Real Estate Management System. Developed by PAQUIBOT.</p>
    </footer>
    <script src="../script/index.js"></script>
</body>
</html>
