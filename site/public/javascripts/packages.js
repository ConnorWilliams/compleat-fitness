"use strict";

// This function obtains the slider values from the page and uses them to calculate the BMI. Once this is calculated, a message is displayed in the HTML.
function bmiCalculate() {
    var weight = document.getElementById('weight').value;
    var height = document.getElementById('height').value;

    document.getElementById('weightrange').innerHTML = weight;
    document.getElementById('heightrange').innerHTML = height;

    var ans = weight / (height * height);
    document.getElementById('result').innerHTML = 'Your BMI is: ' + Math.round(ans * 10) / 10;
    if (ans > 25 && ans < 30) {
        document.getElementById('class').innerHTML = 'You\'re classed as overweight.';
    } else if (ans > 30) {
        document.getElementById('class').innerHTML = 'You\'re classed as obese.';
    } else if (ans < 18.5) {
        document.getElementById('class').innerHTML = 'You\'re classed as underweight.';
    } else {
        document.getElementById('class').innerHTML = 'You\'re classed as normal.';
    }
}

// Function which handles any accordion activity.
function accordionHandler() {
    $('.accordion-section-title').click(function(e) {
        // Grab current anchor value
        var currentAttrValue = $(this).attr('href');

        if ($(e.target).is('.active')) {
            close_accordion_section();
        } else {
            close_accordion_section();
            // Add active class to section title
            $(this).addClass('active');
            // Open up the hidden content panel
            $('.accordion ' + currentAttrValue).slideDown(300).addClass('open');
        }

        e.preventDefault();
    });
}
// Called by the accordianHandler function.
function close_accordion_section() {
    $('.accordion .accordion-section-title').removeClass('active');
    $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
}
