(function(window, google) {
  // this variable holds the result of the self-invoking anonymous function, which is
  // itself a function
  var ParkSolid = (function() {
    return {
      create: function (element, options) {
        this.gMap = new google.maps.Map(element, options);
      },
      zoom: function(level) {
        if (level) {
          this.gMap.setZoom(level);
        } else {
          return this.gMap.getZoom();
        }
      }, 
      _on: function(options) {
        // save a reference to `this` outside of the anonymous function passed to addListener()
        var self = this;
        google.maps.event.addListener(options.obj, options.event, function(e) {
          options.callback.call(self, e);
        });
      },

      addMarker: function(options) {
        var marker;
        options.position = {
          lat: options.lat,
          lng: options.lng
        };
         return marker = this._createMarker(options);

        if(options.event) {
          this._on({
            obj: marker,
            event: options.event.name,
            callback: options.event.callback
          });
        }

        if (options.content) {
          this._on({
            obj: marker,
            event: 'click',
            callback: function() {
              var infoWindow = new google.maps.InfoWindow({ content: options.content });
              infoWindow.open(this.gMap, marker);
            }
          });
        }
      },
      _createMarker: function(options) {
        options.map = this.gMap;
        return new google.maps.Marker(options); 
      },

      addPolyLine: function(options) {
        var polyLine;
        path = options.path;
        strokeColor = options.strokeColor;
        strokeOpacity = options.strokeOpacity;
        strokeWeight = options.strokeWeight;
        id: options.id;
        return polyLine = this._createPolyline(options);
      },

      _createPolyline: function(options) {
        options.map = this.gMap;
        return new google.maps.Polyline(options);
      }

    }
  }());

  // ensure ParkSolid is attached to the window object
  window.ParkSolid = ParkSolid;

}(window, google));

// (function(window, google) {
//   // this variable holds the result of the self-invoking anonymous function, which is
//   // itself a function
//   var ParkSolid = (function() {
//     function ParkSolid(element, options) {
//       this.gMap = new google.maps.Map(element, options);
//     }
//     ParkSolid.prototype = {
//       zoom: function(level) {
//         if (level) {
//           this.gMap.setZoom(level);
//         } else {
//           return this.gMap.getZoom();
//         }
//       }, 
//       _on: function(event, callback) {
//         // save a reference to `this` outside of the anonymous function passed to addListener()
//         var self = this;
//         google.maps.event.addListener(this.gMap, event, function(e) {
//           callback.call(self, e);
//         });
//       }, 
//       addMarker: function(lat, lng) {
//         this._createMarker(lat, lng);
//       },
//       _createMarker: function(lat, lng) {
//         var options = {
//           position: {
//             lat: lat,
//             lng: lng
//           },
//           map: this.gMap
//         };

//         return new google.maps.Marker(options);
//       }
//     };
//     return ParkSolid;
//   }());

//   ParkSolid.create = function(element, options) {
//     return new ParkSolid(element, options);
//   };

//   // ensure ParkSolid is attached to the window object
//   window.ParkSolid = ParkSolid;

// }(window, google));