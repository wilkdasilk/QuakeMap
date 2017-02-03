// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var map;
$(document).on("ready", function() {

  // CODE IN HERE!

  $.ajax({
    method: "GET",
    url: weekly_quakes_endpoint,
    success: onSuccess,
    error: onError
  })

  function onSuccess(response){
        initMap();
    $.map(response.features, function integrate (quake){
      //get and append description
      var description = quake.properties.title;
      $('#info').append(`<p>${description}</p>`);

      //get coordinates
        var locationCoor = quake.geometry.coordinates;
        var long = locationCoor[0];
        var lati = locationCoor[1];

      //add marker
        var latLng = new google.maps.LatLng({lat: lati,lng: long});
        var marker = new google.maps.Marker({
          position: latLng,
          map: map
         });
    //    console.log(marker);
    //    console.log(google.maps.Marker);
    });
  };

  function onError(jqXHR, textStatus, errorThrown){
    console.log("error: "+ jqXHR);
    console.log("error: "+ textStatus);
    console.log("error: "+ errorThrown);
  }
  function initMap() {
    var sanFran = {lat: 37.78, lng: -122.44};
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: sanFran
    });
  }

});
