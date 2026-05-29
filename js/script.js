// script.js - DineEasy Restaurant Platform
// COS10005 Assignment 2 - Jenish Patel - 2026
// All JavaScript for the website is in this single file.


// ============================================================
// RESTAURANT DATA
// Used by the recommendation engine and bill calculator
// ============================================================

var restaurants = [
    {
        name: "Bella Roma",
        cuisine: "Italian",
        dietary: ["none"],
        budgetLevel: "mid",           // $25 - $50
        purposes: ["date", "family", "business"],
        priceMin: 25,
        priceMax: 50,
        deposit: 20,
        description: "Authentic Italian cuisine with homemade pasta and wood-fired pizza."
    },
    {
        name: "Sakura Kitchen",
        cuisine: "Japanese",
        dietary: ["none", "glutenfree"],
        budgetLevel: "mid",           // $20 - $45
        purposes: ["date", "business", "friends"],
        priceMin: 20,
        priceMax: 45,
        deposit: 15,
        description: "Fresh sushi, sashimi and ramen in a calm, minimalist setting."
    },
    {
        name: "Spice Garden",
        cuisine: "Indian",
        dietary: ["vegetarian", "vegan", "halal", "none"],
        budgetLevel: "low",           // $20 - $40
        purposes: ["family", "friends", "date"],
        priceMin: 20,
        priceMax: 40,
        deposit: 15,
        description: "Rich Indian curries and freshly baked naan. Great vegan and vegetarian options."
    },
    {
        name: "Golden Dragon",
        cuisine: "Chinese",
        dietary: ["none"],
        budgetLevel: "low",           // $18 - $45
        purposes: ["family", "friends"],
        priceMin: 18,
        priceMax: 45,
        deposit: 20,
        description: "Cantonese classics and yum cha. Perfect for large groups and celebrations."
    },
    {
        name: "Athena Taverna",
        cuisine: "Greek",
        dietary: ["none", "glutenfree"],
        budgetLevel: "high",          // $25 - $55
        purposes: ["date", "family", "business"],
        priceMin: 25,
        priceMax: 55,
        deposit: 25,
        description: "Traditional Greek mezze, grilled seafood and slow-roasted lamb."
    },
    {
        name: "El Rancho",
        cuisine: "Mexican",
        dietary: ["vegetarian", "none"],
        budgetLevel: "low",           // $18 - $40
        purposes: ["friends", "family"],
        priceMin: 18,
        priceMax: 40,
        deposit: 10,
        description: "Vibrant Mexican street food with fresh tacos, burritos and nachos."
    }
];


// ============================================================
// RECOMMENDATION LOGIC (recommend.html)
// ============================================================

function getRecommendation() {

    // get the user's selections from the form
    var dietary = document.getElementById("dietary").value;
    var budget = document.getElementById("budget").value;
    var purpose = document.getElementById("purpose").value;

    // check that all fields are selected
    if (dietary === "" || budget === "" || purpose === "") {
        alert("Please fill in all three preference fields before getting a recommendation.");
        return;
    }

    // hide any previous results
    document.getElementById("recommendation-result").style.display = "none";
    document.getElementById("no-match").style.display = "none";

    var bestMatch = null;
    var bestScore = 0;

    // loop through each restaurant and score how well it matches
    for (var i = 0; i < restaurants.length; i++) {
        var r = restaurants[i];
        var score = 0;

        // check dietary match - if user has a dietary need it must be supported
        if (dietary === "none") {
            score += 2;   // no restriction - any restaurant works
        } else if (r.dietary.indexOf(dietary) !== -1) {
            score += 3;   // restaurant supports the user's dietary need
        } else {
            continue;     // skip this restaurant - dietary need not met
        }

        // check budget match
        if (budget === "low" && r.budgetLevel === "low") {
            score += 3;
        } else if (budget === "mid" && (r.budgetLevel === "low" || r.budgetLevel === "mid")) {
            score += 2;
        } else if (budget === "high") {
            score += 1;   // any restaurant works for high budget
        } else if (budget === "low" && r.budgetLevel === "high") {
            score -= 1;   // budget restaurant but expensive - not ideal
        }

        // check purpose match
        if (r.purposes.indexOf(purpose) !== -1) {
            score += 3;   // restaurant suits the dining occasion
        } else {
            score += 1;   // still a valid option but not the best fit
        }

        // track the highest scoring restaurant
        if (score > bestScore) {
            bestScore = score;
            bestMatch = r;
        }
    }

    // show result or no-match message
    if (bestMatch !== null) {
        showRecommendationResult(bestMatch, dietary, budget, purpose);
    } else {
        document.getElementById("no-match").style.display = "block";
    }
}


// show the recommended restaurant card
function showRecommendationResult(restaurant, dietary, budget, purpose) {

    document.getElementById("result-name").textContent = restaurant.name;
    document.getElementById("result-cuisine").textContent = restaurant.cuisine;
    document.getElementById("result-reason").textContent = restaurant.description;
    document.getElementById("result-price").textContent = "Price range: $" + restaurant.priceMin + " – $" + restaurant.priceMax + " per person";
    document.getElementById("result-deposit").textContent = "Reservation deposit: $" + restaurant.deposit;

    // set the reserve button to go to reservation page with restaurant pre-selected
    var reserveLink = "reservation.html?restaurant=" + encodeURIComponent(restaurant.name);
    document.getElementById("result-reserve-btn").href = reserveLink;

    document.getElementById("recommendation-result").style.display = "block";
}


// ============================================================
// RESERVATION PAGE FUNCTIONS (reservation.html)
// ============================================================

// update deposit display when restaurant is selected
function updateDeposit() {
    var select = document.getElementById("restaurant-select");
    var selectedOption = select.options[select.selectedIndex];
    var depositDisplay = document.getElementById("deposit-display");
    var depositValue = document.getElementById("deposit-value");

    if (select.value !== "") {
        var deposit = selectedOption.getAttribute("data-deposit");
        depositValue.textContent = deposit;
        depositDisplay.style.display = "block";
    } else {
        depositDisplay.style.display = "none";
    }
}


// show voucher or credit card fields based on payment method chosen
function showPaymentFields(method) {
    var voucherField = document.getElementById("voucher-field");
    var cardFields = document.getElementById("card-fields");

    if (method === "voucher") {
        voucherField.style.display = "block";
        cardFields.style.display = "none";
        // clear any card field values when switching away
        document.getElementById("card-number").value = "";
    } else if (method === "online") {
        cardFields.style.display = "block";
        voucherField.style.display = "none";
        document.getElementById("voucher-code").value = "";
    }
}


// copy email address to billing email when checkbox is ticked
function copyEmail() {
    var checkbox = document.getElementById("same-email");
    var billingEmail = document.getElementById("billing-email");
    var mainEmail = document.getElementById("res-email");

    if (checkbox.checked) {
        billingEmail.value = mainEmail.value;
        billingEmail.readOnly = true;
    } else {
        billingEmail.value = "";
        billingEmail.readOnly = false;
    }
}


// update card hint text based on selected card type
function updateCardHint() {
    var cardType = document.getElementById("card-type").value;
    var hint = document.getElementById("card-hint");
    var cardInput = document.getElementById("card-number");

    if (cardType === "amex") {
        hint.textContent = "American Express: 15 digits";
        cardInput.placeholder = "15-digit card number";
    } else if (cardType === "visa" || cardType === "mastercard") {
        hint.textContent = "Visa / Mastercard: 16 digits";
        cardInput.placeholder = "16-digit card number";
    } else {
        hint.textContent = "Visa/Mastercard: 16 digits | Amex: 15 digits";
        cardInput.placeholder = "Card number (digits only)";
    }
}


// ============================================================
// REGISTRATION FORM VALIDATION (register.html)
// ============================================================

// helper - show an error message under a field
function showError(fieldId, message) {
    var el = document.getElementById(fieldId);
    if (el) {
        el.textContent = message;
    }
}

// helper - clear an error message
function clearError(fieldId) {
    var el = document.getElementById(fieldId);
    if (el) {
        el.textContent = "";
    }
}


// validate the registration form
function validateRegisterForm(e) {
    e.preventDefault();   // stop form submitting until validation passes

    var isValid = true;

    // --- username ---
    var username = document.getElementById("username").value.trim();
    var usernamePattern = /^[a-zA-Z0-9_]+$/;

    if (username === "") {
        showError("username-error", "Username is required.");
        isValid = false;
    } else if (username.length < 5) {
        showError("username-error", "Username must be at least 5 characters.");
        isValid = false;
    } else if (!usernamePattern.test(username)) {
        showError("username-error", "Username can only contain letters, numbers and underscores.");
        isValid = false;
    } else {
        clearError("username-error");
    }

    // --- email ---
    var email = document.getElementById("reg-email").value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        showError("email-error", "Email address is required.");
        isValid = false;
    } else if (!emailPattern.test(email)) {
        showError("email-error", "Please enter a valid email address.");
        isValid = false;
    } else {
        clearError("email-error");
    }

    // --- phone ---
    var phone = document.getElementById("phone").value.trim();
    var phonePattern = /^[0-9]+$/;

    if (phone === "") {
        showError("phone-error", "Phone number is required.");
        isValid = false;
    } else if (!phonePattern.test(phone)) {
        showError("phone-error", "Phone number must contain digits only.");
        isValid = false;
    } else if (phone.length < 8 || phone.length > 15) {
        showError("phone-error", "Phone number must be between 8 and 15 digits.");
        isValid = false;
    } else {
        clearError("phone-error");
    }

    // --- password ---
    // must be at least 10 chars with uppercase, lowercase, number and special char
    var password = document.getElementById("password").value;
    var hasUpper   = /[A-Z]/.test(password);
    var hasLower   = /[a-z]/.test(password);
    var hasNumber  = /[0-9]/.test(password);
    var hasSpecial = /[^a-zA-Z0-9]/.test(password);

    if (password === "") {
        showError("password-error", "Password is required.");
        isValid = false;
    } else if (password.length < 10) {
        showError("password-error", "Password must be at least 10 characters long.");
        isValid = false;
    } else if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
        showError("password-error", "Password must include uppercase, lowercase, a number and a special character.");
        isValid = false;
    } else {
        clearError("password-error");
    }

    // --- confirm password ---
    var confirmPassword = document.getElementById("confirm-password").value;

    if (confirmPassword === "") {
        showError("confirm-error", "Please confirm your password.");
        isValid = false;
    } else if (confirmPassword !== password) {
        showError("confirm-error", "Passwords do not match.");
        isValid = false;
    } else {
        clearError("confirm-error");
    }

    // --- gender ---
    var genderInputs = document.querySelectorAll("input[name='gender']");
    var genderSelected = false;
    for (var i = 0; i < genderInputs.length; i++) {
        if (genderInputs[i].checked) {
            genderSelected = true;
            break;
        }
    }

    if (!genderSelected) {
        showError("gender-error", "Please select your gender.");
        isValid = false;
    } else {
        clearError("gender-error");
    }

    // --- country ---
    var country = document.getElementById("country").value;

    if (country === "") {
        showError("country-error", "Please select your country.");
        isValid = false;
    } else {
        clearError("country-error");
    }

    // if all checks passed, submit the form
    if (isValid) {
        document.getElementById("register-form").submit();
    }
}


// ============================================================
// RESERVATION FORM VALIDATION (reservation.html)
// ============================================================

function validateReservationForm(e) {
    e.preventDefault();

    var isValid = true;

    // --- full name ---
    var fullname = document.getElementById("fullname").value.trim();
    if (fullname === "") {
        showError("fullname-error", "Full name is required.");
        isValid = false;
    } else {
        clearError("fullname-error");
    }

    // --- email ---
    var email = document.getElementById("res-email").value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        showError("res-email-error", "Email address is required.");
        isValid = false;
    } else if (!emailPattern.test(email)) {
        showError("res-email-error", "Please enter a valid email address.");
        isValid = false;
    } else {
        clearError("res-email-error");
    }

    // --- phone - at least 10 digits ---
    var phone = document.getElementById("res-phone").value.trim();
    var digitsOnly = phone.replace(/\D/g, "");   // remove any non-digit characters

    if (phone === "") {
        showError("res-phone-error", "Phone number is required.");
        isValid = false;
    } else if (digitsOnly.length < 10) {
        showError("res-phone-error", "Phone number must contain at least 10 digits.");
        isValid = false;
    } else {
        clearError("res-phone-error");
    }

    // --- restaurant selection ---
    var restaurant = document.getElementById("restaurant-select").value;
    if (restaurant === "") {
        showError("restaurant-error", "Please select a restaurant.");
        isValid = false;
    } else {
        clearError("restaurant-error");
    }

    // --- date - must not be in the past ---
    var dateInput = document.getElementById("res-date").value;
    if (dateInput === "") {
        showError("date-error", "Please select a reservation date.");
        isValid = false;
    } else {
        var selectedDate = new Date(dateInput);
        var today = new Date();
        today.setHours(0, 0, 0, 0);   // strip time so we compare dates only

        if (selectedDate < today) {
            showError("date-error", "Reservation date cannot be in the past.");
            isValid = false;
        } else {
            clearError("date-error");
        }
    }

    // --- time ---
    var timeInput = document.getElementById("res-time").value;
    if (timeInput === "") {
        showError("time-error", "Please select a reservation time.");
        isValid = false;
    } else {
        clearError("time-error");
    }

    // --- number of people - must be greater than 0 ---
    var people = document.getElementById("num-people").value;
    if (people === "" || parseInt(people) <= 0) {
        showError("people-error", "Number of people must be greater than 0.");
        isValid = false;
    } else {
        clearError("people-error");
    }

    // --- payment method ---
    var paymentInputs = document.querySelectorAll("input[name='payment_method']");
    var paymentSelected = "";
    for (var i = 0; i < paymentInputs.length; i++) {
        if (paymentInputs[i].checked) {
            paymentSelected = paymentInputs[i].value;
            break;
        }
    }

    if (paymentSelected === "") {
        showError("payment-error", "Please select a payment method.");
        isValid = false;
    } else {
        clearError("payment-error");

        // validate based on payment method chosen
        if (paymentSelected === "voucher") {
            // voucher code is shown but no validation required per spec
            clearError("voucher-error");

        } else if (paymentSelected === "online") {
            // credit card validation
            var cardType = document.getElementById("card-type").value;
            var cardNumber = document.getElementById("card-number").value.trim();
            var cardDigits = cardNumber.replace(/\D/g, "");

            if (cardType === "") {
                showError("card-type-error", "Please select a card type.");
                isValid = false;
            } else {
                clearError("card-type-error");
            }

            if (cardNumber === "") {
                showError("card-error", "Card number is required for online payment.");
                isValid = false;
            } else if (!/^[0-9]+$/.test(cardNumber)) {
                showError("card-error", "Card number must contain digits only.");
                isValid = false;
            } else if (cardType === "amex" && cardDigits.length !== 15) {
                showError("card-error", "American Express card numbers must be 15 digits.");
                isValid = false;
            } else if ((cardType === "visa" || cardType === "mastercard") && cardDigits.length !== 16) {
                showError("card-error", "Visa and Mastercard numbers must be 16 digits.");
                isValid = false;
            } else {
                clearError("card-error");
            }
        }
    }

    // --- billing email ---
    var billingEmail = document.getElementById("billing-email").value.trim();
    if (billingEmail === "") {
        showError("billing-error", "Billing email address is required.");
        isValid = false;
    } else if (!emailPattern.test(billingEmail)) {
        showError("billing-error", "Please enter a valid billing email address.");
        isValid = false;
    } else {
        clearError("billing-error");
    }

    // submit if all validation passed
    if (isValid) {
        document.getElementById("reservation-form").submit();
    }
}


// ============================================================
// BILL CALCULATOR (bill.html)
// ============================================================

function updateBillOptions() {
    // nothing needed here - just resets when restaurant changes
    document.getElementById("bill-result").style.display = "none";
}


function calculateBill() {

    var restaurantSelect = document.getElementById("bill-restaurant");
    var peopleInput = document.getElementById("bill-people").value;
    var spendLevel = document.getElementById("bill-spend").value;
    var drinksPerPerson = parseInt(document.getElementById("bill-drinks").value);

    // basic validation
    if (restaurantSelect.value === "") {
        alert("Please select a restaurant.");
        return;
    }

    var people = parseInt(peopleInput);
    if (isNaN(people) || people <= 0) {
        document.getElementById("bill-people-error").textContent = "Please enter a valid number of people (must be at least 1).";
        return;
    } else {
        document.getElementById("bill-people-error").textContent = "";
    }

    // get data from the selected option
    var selectedOption = restaurantSelect.options[restaurantSelect.selectedIndex];
    var restaurantName = restaurantSelect.value;
    var priceMin = parseInt(selectedOption.getAttribute("data-min"));
    var priceMax = parseInt(selectedOption.getAttribute("data-max"));
    var deposit = parseInt(selectedOption.getAttribute("data-deposit"));

    // calculate food cost per person based on spend level
    var foodPerPerson;
    if (spendLevel === "min") {
        foodPerPerson = priceMin;
    } else if (spendLevel === "max") {
        foodPerPerson = priceMax;
    } else {
        // mid = average of min and max
        foodPerPerson = Math.round((priceMin + priceMax) / 2);
    }

    // calculate totals
    var foodTotal = foodPerPerson * people;
    var drinksTotal = drinksPerPerson * people;
    var subtotal = foodTotal + drinksTotal;
    var grandTotal = subtotal + deposit;

    // display results
    document.getElementById("bill-result-restaurant").textContent = restaurantName;
    document.getElementById("bill-result-people").textContent = people;
    document.getElementById("bill-result-perperson").textContent = "$" + foodPerPerson;
    document.getElementById("bill-result-drinks").textContent = drinksPerPerson === 0 ? "Not included" : "$" + drinksPerPerson;
    document.getElementById("bill-result-subtotal").textContent = "$" + subtotal;
    document.getElementById("bill-result-deposit").textContent = "$" + deposit;
    document.getElementById("bill-result-total").innerHTML = "<strong>$" + grandTotal + "</strong>";

    // update the reserve link to pre-select the restaurant
    document.getElementById("bill-reserve-link").href = "reservation.html?restaurant=" + encodeURIComponent(restaurantName);

    document.getElementById("bill-result").style.display = "block";
}


// ============================================================
// URL PARAMETER HANDLER
// Pre-fills restaurant selection from URL query string
// e.g. reservation.html?restaurant=Bella+Roma
// ============================================================

function getURLParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
}


function prefillRestaurantFromURL() {
    var restaurantParam = getURLParam("restaurant");
    if (!restaurantParam) return;

    // check if we are on the reservation page
    var restaurantSelect = document.getElementById("restaurant-select");
    if (restaurantSelect) {
        for (var i = 0; i < restaurantSelect.options.length; i++) {
            if (restaurantSelect.options[i].value === restaurantParam) {
                restaurantSelect.selectedIndex = i;
                updateDeposit();   // update deposit amount to match pre-selected restaurant
                break;
            }
        }
    }
}


// ============================================================
// PAGE INIT - runs when the page loads
// ============================================================

window.onload = function() {

    // pre-fill restaurant from URL if coming from another page
    prefillRestaurantFromURL();

    // attach register form validation if on register page
    var registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", validateRegisterForm);
    }

    // attach reservation form validation if on reservation page
    var reservationForm = document.getElementById("reservation-form");
    if (reservationForm) {
        reservationForm.addEventListener("submit", validateReservationForm);
    }
};
