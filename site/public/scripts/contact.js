"use strict";

// Listener for google map.
google.maps.event.addDomListener(window, 'load', init_map);

// Function to initialise the google map so that the marker is pointing to the correct place.
function init_map() {
  var myOptions = {
    zoom:16,
    center:new google.maps.LatLng(51.457568, -2.592061),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);
  var marker = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(51.457568, -2.592061)
  });
  google.maps.event.addListener(marker, 'click', function(){
    infowindow.open(map,marker);
  });
}


// Client side function which sends contact form information to the server with an AJAX post request. Also receives a response and changes the innerHTML of the page to get feedback to a user.
function send_mail() {
    // Get all the info from the HTML DOM.
    var fn = document.getElementById("firstname").value
    var ln = document.getElementById("lastname").value
    var eml = document.getElementById("email").value
    var msg = document.getElementById("message").value
    var sub = document.getElementById("subscribe").checked;

    console.log(fn, ln, eml, msg)

    // Send a post request to the server with all the gathered info as a JSON object.
    $.ajax({
        type: 'POST',
        url: '/send_mail',
        dataType: "json",
        data: {firstname:fn, lastname:ln, email:eml, message:msg, subscribe:sub},
        success: function(result){
            document.getElementById("feedback").innerHTML=result.resp;
            if (result.success){
                document.getElementById("firstname").value='';
                document.getElementById("lastname").value='';
                document.getElementById("email").value='';
                document.getElementById("message").value='';
            }
        }
    });
}
