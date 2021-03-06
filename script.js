// self invoking anonymous function contains scope in project
(function(window, parksolid, $) {
  // map options (obj literal)
  var options = parksolid.Map_Options;
  // DOM element that holds the map instance
  var element = document.getElementById('map-canvas');

  parksolid.create(element, options);

  var geocoder = new google.maps.Geocoder();

  function geocode(options) {
    geocoder.geocode({
      address: options.address
    }, function(results, status) {
      if (status = google.maps.GeocoderStatus.OK) {
        options.success.call(this, results, status);
      } else {
        options.error.call(this, status);
      }
    });
  }

  var clickCount = 0;
  var coordinates = [];
  var polyLineCount = 0;
  window.polylines = [];

  google.maps.event.addListener(parksolid.gMap, 'click', function(e) {
    coordinates.push(e.latLng);
    clickCount++;
    if (clickCount === 2) {
      window.polylines[polyLineCount] = {
        parkMarker: parksolid.addMarker({
          lat: e.latLng.G,
          lng: e.latLng.K,
          icon: 'parking.png'
        }),

        parkLine: parksolid.addPolyLine({
          path: coordinates,
          map: parksolid.gMap,
          geodesic: true,
          strokeColor: '#FFBF99',
          strokeOpacity: 1.0,
          strokeWeight: 4,
          id: 1
        })
      }
      google.maps.event.addListener(polylines[polyLineCount].parkMarker, 'click', function(e) {
      var content = prompt("What's the parking like here?");
      var infoWind = new google.maps.InfoWindow({
        content: '<span><strong>Parking info:</strong> '+ content + '</span>'
      });
      infoWind.open(ParkSolid.gMap, polylines[0].parkMarker);
      });
      polyLineCount++;
      clickCount = 0;
      coordinates = []; 
    }
  });

  $('#geocode-info').submit(function(e) {
    e.preventDefault();
    var stAddress = $('#st-name');
    var meter = $('#meter');
    var free = $('#free');
    var limit = $('#limit');
    var parkingNotes = '<div><span><strong>Parking Info For: </strong>'+ stAddress.val() +'</span><br><span><strong>Metered Parking: </strong>'+ meter.val() +'</span><br><span><strong>Free Parking: </strong>'+ free.val() +'</span><br><span><strong>Time Limits: </strong>'+ limit.val() +'</span><br></div>';
    console.log(parkingNotes);
    geocode({
      address: stAddress.val(),
      success: function(results) {
        var result = results[0];
        parksolid.addMarker({
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng(),
          icon: 'parking.png',
          content: parkingNotes
        });
      },
      error: function(status) {
        console.log(status);
      }
    });
    stAddress.val("");
    meter.val("");
    free.val("");
    limit.val("");
  });

}(window, window.ParkSolid, jQuery));