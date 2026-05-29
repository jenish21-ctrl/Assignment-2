# Assignment-2
This is my project (assignment 2) of web development
================================================================
DineEasy - Restaurant Discovery & Reservation Platform
COS10005 Web Development - Assignment 2
Swinburne University of Technology - Semester 1, 2026
================================================================

Student Name:    Jenish Patel
Student ID:      106196963
Unit:            COS10005 Web Development
Submission Date: 31 May 2026

----------------------------------------------------------------
GITHUB REPOSITORY
----------------------------------------------------------------

GitHub Repository URL: https://github.com/jenish21-ctrl/Assignment-2.git

The repository contains all project files and must remain
accessible to the marker during the marking period.

----------------------------------------------------------------
WEBSITE STRUCTURE
----------------------------------------------------------------

assignment2/
├── index.html          Home page - introduces the platform
├── restaurants.html    Lists 6 restaurants with full details
├── recommend.html      Recommendation form with JS logic
├── register.html       User registration form with JS validation
├── reservation.html    Reservation form with deposit/payment logic
├── bill.html           Bonus: Estimated bill calculator
├── css/
│   └── style.css       Single external stylesheet for all pages
├── js/
│   └── script.js       Single JavaScript file for all pages
├── images/
│   ├── logo.png        Site logo
│   ├── athena.jpg  Athena Taverna (Greek)
│   ├── Bella roma.jpg Bella Roma (Italian)
│   ├── el.jpg El Rancho (Mexican)
│   ├── golden dragon.jpg Golden Dragon (Chinese)
│   ├── Sakura.jpg Sakura Kitchen (Japanese)
│   ├── spice g.jpg  Spice Garden (Indian)
└── Readme.txt          This file

----------------------------------------------------------------
PAGES OVERVIEW
----------------------------------------------------------------

index.html
  - Introduces the DineEasy platform
  - Describes services (discovery, recommendation, reservation)
  - Lists target users (families, couples, professionals, tourists)
  - Links to key pages

restaurants.html
  - 6 restaurants: Bella Roma (Italian), Sakura Kitchen (Japanese),
    Spice Garden (Indian), Golden Dragon (Chinese),
    Athena Taverna (Greek), El Rancho (Mexican)
  - Each listing includes: name, cuisine, description, signature
    dishes with prices, price range, deposit amount, image
  - Reserve Now button links to reservation page with restaurant
    pre-selected via URL parameter

recommend.html
  - Form with 3 fields: dietary preference, budget, dining occasion
  - JS recommendation engine scores each restaurant and returns
    the best match
  - Result card shows restaurant details and links to reservation

register.html
  - Registration form with: username, email, phone, password,
    confirm password, gender, dietary preferences, country
  - All fields validated with JS before submission

reservation.html
  - Reservation form with all required fields
  - Restaurant dropdown auto-fills from URL parameter
  - Deposit amount updates dynamically when restaurant is selected
  - Payment method toggle: Voucher shows voucher code field,
    Online Payment shows credit card fields
  - Billing email can be copied from main email via checkbox
  - Full JS validation before submission

bill.html (BONUS)
  - Select restaurant and number of people
  - Choose spend level (budget / average / splurge)
  - Option to include drinks
  - Calculates estimated food, drinks, deposit and grand total
  - Updates dynamically with JS
  - Reserve link pre-fills the reservation page

----------------------------------------------------------------
JAVASCRIPT VALIDATION LOGIC (Plain English)
----------------------------------------------------------------

REGISTRATION FORM:

Username:
  - Cannot be empty
  - Must be at least 5 characters long
  - Can only contain letters, numbers and underscores
  - Tested using a regular expression: /^[a-zA-Z0-9_]+$/

Email:
  - Cannot be empty
  - Must match email format (something@something.something)
  - Tested with: /^[^\s@]+@[^\s@]+\.[^\s@]+$/

Phone Number:
  - Cannot be empty
  - Must contain digits only (no spaces or dashes)
  - Must be between 8 and 15 digits long

Password:
  - Cannot be empty
  - Must be at least 10 characters
  - Must contain at least one uppercase letter
  - Must contain at least one lowercase letter
  - Must contain at least one number
  - Must contain at least one special character
  - Each condition checked with a separate regex test

Confirm Password:
  - Cannot be empty
  - Must exactly match the password field

Gender:
  - At least one radio button must be selected
  - Checked by looping through all radio buttons

Country:
  - A country must be selected from the dropdown

RESERVATION FORM:

Full name, email, phone:
  - Cannot be empty
  - Email must match valid format
  - Phone must have at least 10 digits (non-digit characters stripped)

Restaurant:
  - Must be selected from the dropdown

Date:
  - Must not be empty
  - Compared against today's date (time stripped) - cannot be past

Time:
  - Must not be empty

Number of people:
  - Must be greater than 0

Payment method:
  - Must select either Voucher or Online Payment
  - If Online Payment: card type must be selected, card number
    must be digits only, and must be 15 digits for Amex or
    16 digits for Visa/Mastercard

Billing email:
  - Must be valid email format

----------------------------------------------------------------
KNOWN ISSUES AND LIMITATIONS
----------------------------------------------------------------

- Restaurant images are placeholders. Replace image files in the
  images/ folder with real photos before submission.
- The logo.png file needs to be added to the images/ folder.
- Form submission points to the Mercury test server. No data is
  stored permanently.
- The bill calculator produces an estimate only. Actual costs
  will vary depending on what is ordered.

----------------------------------------------------------------
REFERENCES
----------------------------------------------------------------

All restaurant descriptions, dish names and prices are fictional
and created for this assignment. No real businesses are referenced.

Images used:
- El rancho restaurant Outside photo of restaurent
  https://elranchoharrisburg.com/

- trip advisor. Spice garden eating house and grill
  https://www.tripadvisor.com.au/

- Welcome to yorkshire. Athena greek Taverna
  yorkshire.com 

-Trip advisor. Golden Dragon BBQ and seafood house
  https://www.tripadvisor.com.au/

-Sakura japanese Kitchen. Authentic japanese cuisine
  https://sakurajapanesekitchen.menu-res.com/

- perth mum groups. pizza bella Roma
  https://perthmumsgroup.com.au/pizza-bella-roma-fremantle/


----------------------------------------------------------------
