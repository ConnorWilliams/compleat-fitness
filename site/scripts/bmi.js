// // Convert Inches (Imperial) to Centimeters (Metric)
// function convertHeight(inches) {
//     return inches * 0.0254;
// }

// // Convert Pounds (Imperial) to Kilograms (Metric)
// function convertWeight(pounds) {
//     return pounds/2.20462262185;
// }

// // Find Unit of Measurement
// function findUnit(unit) {
//     var output;           
//     for (i=0; i<unit.length; i++) {
//         if(unit[i].checked === true) {
//             output =  unit[i].value;
//         }
//     }
//     return output;
// }

// Cache Event Elements

function calculate(){
    var weight = document.getElementById('weight').value;
    var height = document.getElementById('height').value;
    
    // var unit = findUnit(document.getElementsByName('unit'));
    // var w;
    // console.log('Weight is measured in: ' + weightUnit + '\nHeight is measured in: ' + heightUnit);
    
    // If measurement is in pounds, do the math.
    // if(unit == 'metric') {
    //     w = convertWeight(weight);
    //     h = convertHeight(height);
    //     console.log(w + "kg");  
    //     console.log(h + "m");
    // } else {
    //     w = weight;
    //     h = height;
    //     console.log(w + "lbs");     
    //     console.log(h + "in");
    // }
    document.getElementById('weightrange').innerHTML = weight;
    document.getElementById('heightrange').innerHTML = height;

    var ans = weight/(height*height);
    document.getElementById('result').innerHTML = 'Your BMI is: ' + Math.round(ans*10)/10;
    if(ans > 25 && ans < 30) {
        document.getElementById('class').innerHTML = 'You\'re classed as overweight.';
    } else if (ans > 30) {
        document.getElementById('class').innerHTML = 'You\'re classed as obese.';
    } else if (ans < 18.5) {
        document.getElementById('class').innerHTML = 'You\'re classed as underweight.';
    } else {
        document.getElementById('class').innerHTML = 'You\'re classed as normal.';
    }
}