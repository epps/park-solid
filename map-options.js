(function(window, google, parksolid) {

  parksolid.Map_Options = {
    center: {
      lat: 34.019686, 
      lng: -118.494512
    },
    zoom: 18,
    styles: [{"stylers":[{"hue":"#007fff"},{"saturation":89}]},{"featureType":"water","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"off"}]}]
  };

}(window, google, window.ParkSolid || (window.ParkSolid = {})));

/*
* Given the size of the map options object, it makes sense to abstract it out into its own namespace
* and then include it in the script.js file.
*
* Here another self-invoking anonymous function is used to create an enclose namespace, which relies
* on the window, the google namespace, and the map library namespace.
* 
 */ 