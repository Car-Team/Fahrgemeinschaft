$(document).ready(function() {

    document.getElementById("car").value = JSON.parse(localStorage.getItem('userdata')).modelName;
    
});

$(function() {
    $( ".date-input-css" ).datepicker();
});

// VISINILITY OF RADIO BUTTONS        
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


///////////////////////////////////////////////////////////////////////////// AJAX REQUEST
function saveInDB(){

	var date = $('#datepicker').val();
	var time = $('#departureTime').val();
	var departure = $('#departure').val();
	var destination = $('#destination').val();
	var freePlaces = $('#freePlaces').val();
	var price = $('#price').val();
	var carName = $('#carName').val();
	var rideInfos = $('#info').val();

	// VALIDATION
	var numbers = /[0-9]/;
	var letters = /[a-zA-Z]/;
	if (departure.match(numbers) != null){
		alert("Bitte \u00fcberpr\u00fcfen Sie Ihren Startort!");
		return;
	}
	if (destination.match(numbers) != null){
		alert("Bitte \u00fcberpr\u00fcfen Sie Ihren Zielort!");
		return;
	}
	if (price.match(letters) != null){
		alert("Bitte \u00fcberpr\u00fcfen Sie Ihre Preisangabe!");
		return;
	}

	// REQUEST ARRAY
	var requestData = {
		'date' : date,
		'time' : time,
		'departure' : departure,
		'destination' : destination,
		'freePlaces' : freePlaces,
		'price' : price,
		'carName' : carName,
		'rideInfos' : rideInfos,
	}
	
	$.ajax({
		type: "GET",
		url: "php/createARide.php",
		//dataType: 'jsonp',
		data: requestData,
		success: function(resultData) {
			alert(resultData);
		},
	});
}


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

	// Change custom parameters starting from here:
	var zoom = 13; // map zoom
	var destination = pDestination; // destination
	document.getElementById('map_canvas').style.width = document.Formular.width; // map width
	document.getElementById('map_canvas').style.height = '400px'; // map height
	initialize();
	showRoute();
	
}
<!-- END OF MAP DEFINITION -->