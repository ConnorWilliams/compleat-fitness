"use strict";

google.maps.event.addDomListener(window, 'load', init_map);


function send_mail(){
    var fn = document.getElementById("firstname").value
    var ln = document.getElementById("lastname").value
    var eml = document.getElementById("email").value
    var msg = document.getElementById("message").value
    var sub = document.getElementById("subscribe").checked;
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
