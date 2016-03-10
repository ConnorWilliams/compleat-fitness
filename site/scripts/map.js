function init_map() {
  var myOptions = {
    zoom:16,
    center:new google.maps.LatLng(51.457568, -2.592061),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);
  marker = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(51.457568, -2.592061)
  });
  google.maps.event.addListener(marker, 'click', function(){
    infowindow.open(map,marker);
  });
}
