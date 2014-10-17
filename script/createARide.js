$(document).ready(function() {

    document.getElementById("car").value = JSON.parse(localStorage.getItem('userdata')).modelName;
    
});

$(function() {
    $( ".date-input-css" ).datepicker();
});
        
function rideOnceFunc() {
	document.getElementById('daysLabel').style.display= "none";
	document.getElementById('daysCheckbox').style.display= "none";
	document.getElementById('dateLabel').style.display = "block";
	document.getElementById('datepickerLabel').style.display = "block";
};

function rideMultiFunc() {
	document.getElementById('daysLabel').style.display= "block";
	document.getElementById('daysCheckbox').style.display= "block";
	document.getElementById('dateLabel').style.display = "none";
	document.getElementById('datepickerLabel').style.display = "none";
};


<!-- STARTING MAP DEFINITION -->
function showMap(pDestination) {
	var rendererOptions = {
	    draggable: true
	};
	var map_direction = new google.maps.DirectionsRenderer(rendererOptions);
	var direction_service = new google.maps.DirectionsService();
	var map;
	var start = new google.maps.LatLng(0.0, 0.0);
	var geocoder;
	geocoder = new google.maps.Geocoder();
	 
	// Initalize your map
	function initialize() {
	    var myOptions = {
	        zoom:zoom,
	        mapTypeId: google.maps.MapTypeId.TERRAIN,
	        center: start
	    };
	    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	    map_direction.setMap(map);
	        map_direction.setPanel(document.getElementById("map_direction"));
	}
	 
	// Collect entered data and open Google Maps in a new browser tab
	function showRoute() {
	    var start = document.Formular.departure.value;
	    var dest_url = {
	            origin:start, 
	            destination: destination,
	            travelMode: google.maps.DirectionsTravelMode.DRIVING
	        };
	        direction_service.route(dest_url, function(response, status) {
	            if (status == google.maps.DirectionsStatus.OK) {
	                map_direction.setDirections(response);
	            }
	        });
	}  
	/*
	// Define infobox widget
	function codeAddress() {
	    var address = destination;
	     geocoder.geocode( { 'address': address }, function(results, status) {
	      if (status == google.maps.GeocoderStatus.OK) {
	        map.setCenter(results[0].geometry.location);
	        var coordInfoWindow = new google.maps.InfoWindow({
	        content: "<h2>Route planning</h2><p>Enter your address<br>and press the Start button</p><input id='address' type='textbox' value='' style='border: 1px solid #f0f0f0;-webkit-border-radius: 8px;-moz-border-radius: 8px;border-radius: 8px;'> <input type='button' value='Start' onClick='showRoute();'>",
	        map: map,
	        position: results[0].geometry.location
	        });
	      } else {
	        alert("Geocode not available: " + status);
	      }
	    });
	  }
	*/ 
	// Automatic geo localisation
	function codeLatLng() {
	    if(navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(function(position) {
	            var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	 
	    geocoder.geocode({'latLng': pos}, function(results, status) {
	 
	          if (status == google.maps.GeocoderStatus.OK) {
	            if (results[1]) {
	            document.getElementById("address").value = results[1].formatted_address;
	            } else {
	             // alert("No results found");
	            }
	          } else {
	           // alert("Geocoder failed due to: " + status);
	          }
	        });
	 
	      }, function() {
	        //
	      });
	    }
	}
	
	// DO NOT CHANGE CODE ABOVE! 
	// Change custom parameters starting from here:
	var zoom = 13; // map zoom
	var destination = pDestination; // destination, your address
	document.getElementById('map_canvas').style.width = document.Formular.width; // map width
	document.getElementById('map_canvas').style.height = '400px'; // map height
	initialize();
	showRoute();
	//codeAddress();
	codeLatLng();
	
}
<!-- END OF MAP DEFINITION -->