<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Real Estate Management System - Create Account</title>
    <link rel="stylesheet" href="../styles/style.css?v=1.0">

    <!-- TailwindCSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
    integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />

    <style>
        #toggleShowPassword{
            position: absolute;
            right: 10px;
            top: 30%;
        }
        .red{
            color: red;
        }
    </style>
</head>
<body>
    <div class="err-div">
        <div class="error-message-container">
            <div class="message p-2 text-center " style="font-size: 1.3rem;">
                <i class="fa-solid fa-circle-xmark" style="color: red;"></i> ERROR MESSAGE
            </div>
            <div class="error p-2"></div>
        </div>
    </div>
    <header>
        <section class="container-90 top-nav">
            <div class="header_logo">
                <img src="../assets/img2.svg" alt="LOGO">
            </div>
            <div class="flex gap-10">
                <a href="index.php">Home</a>
                <a href="login.php">Login</a>
            </div>
        </section>
            <!-- User Profile, notifs, search bar or more must be placed here in larger screen -->
    </header>
    <main>
        <section class="container-90 section-1">
            <form name="form"
            onsubmit="return validateRegForm(event)"
            method="POST"
            >
            
                <h1>Create Account</h1>
                <div class="divider"></div>
                <hr>
                <div class="grid-container">
                    <div class="form-floating grid-item-1">
                        <label for="idnumber">ID No: </label>
                        <input type="text" name="idnumber" id="idnumber" placeholder="xxxx-xxxx" maxlength="9">
                    </div>
                    <div class="form-floating email-add">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="" >
                    </div>

                    <div class="form-floating grid-item-2">
                        <label for="firstname">First Name </label>
                        <input type="text" name="firstname" id="firstname" placeholder="" >
                    </div>
                    <div class="form-floating grid-item-3">
                        <label for="lastname">Last Name</label>
                        <input type="text" name="lastname" id="lastname" placeholder="" >
                    </div>
                    <div class="form-floating grid-item-4">
                        <label for="middleinitial">Middle Initial</label>
                        <input type="text" name="middleinitial" id="middleinitial" placeholder="">
                    </div>
                    <div class="form-floating grid-item-5">
                        <!-- <label for="extensionname">Extension Name</label> -->
                        <!-- <input type="text" name="extensionname" id="extensionname" placeholder=""> -->
                        <select name="extensionname" class="text-center" id="extensionname" style="width: 100%;height:100%;">
                            <option value="">Select Extention Name (Optional)</option>
                            <option value="I">I</option>
                            <option value="II">II</option>
                            <option value="I">III</option>
                            <option value="I">IV</option>
                            <option value="I">V</option>
                        </select>
                    </div>
                    <div class="form-floating grid-item-6">
                        <label for="birtdate">Birthdate</label>
                        <input type="date" name="birthdate" id="birthdate" placeholder="">
                    </div>
                    <div class="grid-item-7 mb-2" style="display:flex;align-items:center;gap:5px; justify-content: space-between;">
                        <div style="display:flex;align-items:center;gap:1rem;">
                            <input type="radio" name="sex" id="male" value="Male"><label for="male">Male</label>
                            <input type="radio" name="sex" id="female" value="Female"><label for="female">Female</label>
                        </div>
                        <div style="display:flex;align-items:center;gap:5px;" class="flex">
                            <label for="age">Age : </label><input type="text" id="age" class="px-2 w-20" disabled>
                        </div>
                    </div>
                    <div class="form-floating grid-item-8">
                        <label for="purok">Purok</label>
                        <input type="text" name="purok" id="purok" placeholder="" >
                    </div>
                    <div class="form-floating grid-item-9">
                        <label for="barangay">Barangay</label>
                        <input type="text" name="barangay" id="barangay" placeholder="" >
                    </div>
                    <div class="form-floating grid-item-10">
                        <label for="city">City</label>
                        <input type="text" name="city" id="city" placeholder="" >
                    </div>
                    <div class="form-floating grid-item-11">
                        <label for="province">Province</label>
                        <input type="text" name="province" id="province" placeholder="" >
                    </div>
                    <div class="form-floating grid-item-12">
                        <label for="country">Country</label>
                        <input type="text" name="country" id="country" placeholder="" >
                    </div>
                    <div class="form-floating grid-item-13">
                        <label for="zip">ZIP Code</label>
                        <input type="number" name="zip" id="zip" placeholder="" >
                    </div>
                    <div class="form-floating grid-item-14">
                        <label for="username">Username</label>
                        <input type="text" name="username" id="username" >
                    </div>
                    <div class="form-floating grid-item-15">
                        <i class="fa-solid fa-eye" id="toggleShowPassword"></i>
                        <label for="password" style="display: flex; gap:1rem;">Password
                            <div id="password-strength"></div>
                        </label>
                      <input type="password" name="password" id="password">
                    </div>
                    <div class="form-floating grid-item-16">
                        <label for="reenterpassword" style="display: flex; gap:1rem;">Re-Enter Password
                            <div id="password-match"></div>
                        </label>
                        <input type="password" name="reenterpassword" id="reenterpassword" >
                        <!-- <div id="toggleShowPassword"><i class="fa-solid fa-eye"></i></div> -->
                    </div>
                    <input type="submit" value="Create Account" class="grid-item-17">
                </div>
                <p class="mt-4 mb-4">You already have an account? <a href="../views/login.php" class="underline underline-offset-4">Click here</a></p>
            </form>
        </section>
        <section class="section-2">
            <img src="../assets/img1.svg" alt="Hero">
        </section>
    </main>
    <footer>
        <p class="container-90"> &copy; 2024 Real Estate Management System. Developed by PAQUIBOT.</p>
    </footer>

    <script src="../script/script.js"></script>
</body>
</html>