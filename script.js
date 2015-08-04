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

  $('#geocode-info').submit(function(e) {
    e.preventDefault();
    var stAddress = $('#st-name').val();
    var parkingInfo = $('#parking-info').val();
    geocode({
      address: stAddress,
      success: function(results) {
        var result = results[0];
        parksolid.addMarker({
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng(),
          icon: 'parking.png',
          content: '<span>Parking info: '+ parkingInfo + '</span>'
        });
      },
      error: function(status) {
        console.log(status);
      }
    });
  });

}(window, window.ParkSolid, jQuery));