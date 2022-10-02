// Functions to run on init
function init() {
    clickdropdownsenable();
    hoverdropdownsenable();
}

// Script for enabling dropdown-on-click
function clickdropdownsenable() {

    clickdropdowns = document.getElementsByClassName("clickdropdown");
    for (let dropdown of clickdropdowns) {

        dropdown.addEventListener("click", function () {

            let clsLst = dropdown.lastElementChild.classList;
            if (clsLst.contains('hidden')) clsLst.remove('hidden');
            else clsLst.add('hidden');

        })

    }
}

// Script for enabling dropdown-on-hover
function hoverdropdownsenable() {

    let hoverdropdowns = document.getElementsByClassName("hoverdropdown");
    for (let dropdown of hoverdropdowns) {

        let clsLst = dropdown.lastElementChild.classList;
        dropdown.addEventListener('mouseover', () => clsLst.remove('hidden'));
        dropdown.addEventListener('mouseout', () => clsLst.add('hidden'));

    }

}

// Script for horoscope page button
function getHoroscope() {

    // Get values day, month, year
    let day = Number(document.getElementById("day").value);
    let month = Number(document.getElementById("month").value);
    let year = Number(document.getElementById("year").value);

    // Validate day, month, year,
    let err = validateDate(day, month, year);

    if (err == "") {

        // Get correct Horoscope
        let horoscopeName = getHoroscopeName(day, month);

        // Display correct horoscope
        displayHoroscopeName(horoscopeName);

    } else displayError(err); // Display error if exists

};

const validateDate = function (day, month, year) {

    if (isNaN(day) || isNaN(month) || isNaN(year)) return "A field is not a number";

    if (day < 1 || day > 31) return "Day is out of range";

    if (month < 1 || month > 12) return "Month is out of range";

    if (year < 1900 || year > 2100) return "Year is out of range (enter year between 1900 and 2100, inclusive)"

    if (day > 30 && (month == 4 || month == 6 || month == 9 || month == 11)) return "Day is out of range for a 30-day month";

    if (day > 28 && month == 2 && year % 4 != 0) return "Day is out of range for the non-leap-year month of February";

    if (day > 29 && month == 2 && year % 4 == 0) return "Day is out of range for the leap-year month of February";

    // No errors?; Return empty string, i.e., no error (valid date)
    return "";

};

function getHoroscopeName(day, month) {

    switch (month) {

        case 1: return (day < 20) ? "Capricorn" : "Aquarius";
        case 2: return (day < 19) ? "Aquarius" : "Pisces";
        case 3: return (day < 21) ? "Pisces" : "Aries";
        case 4: return (day < 20) ? "Aries" : "Taurus";
        case 5: return (day < 21) ? "Taurus" : "Gemini";
        case 6: return (day < 21) ? "Gemini" : "Cancer";
        case 7: return (day < 23) ? "Cancer" : "Leo";
        case 8: return (day < 23) ? "Leo" : "Virgo";
        case 9: return (day < 23) ? "Virgo" : "Libra";
        case 10: return (day < 23) ? "Libra" : "Scorpio";
        case 11: return (day < 23) ? "Scorpio" : "Sagittarius";
        case 12: return (day < 22) ? "Sagittarius" : "Capricorn";

    }

};

function displayHoroscopeName(name) {

    document.getElementById("result").innerHTML = "<strong style='color:green'>" + name + "</strong>";

};

function displayError(err) {

    document.getElementById("result").innerHTML = "<strong style='color:red'>ERROR | " + err + "</strong>";

};
