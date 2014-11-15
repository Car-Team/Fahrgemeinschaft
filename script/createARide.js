function isEmpty(str) {
   return (!str || 0 === str.length);
}


$(document).on("pagebeforeshow", "#createARide", function() {
   // $( ".date-input-css" ).datepicker();
   document.getElementById("datepicker").readOnly = true;
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
	var pricekomma = $('#price').val();
	var price = pricekomma.replace(",", ".");
	var carName = JSON.parse(localStorage.getItem('userdata')).id;
	var rideInfos = $('#info').val();
	var userName = JSON.parse(localStorage.getItem('userdata')).name;
	var userID = JSON.parse(localStorage.getItem('userdata')).id;
	var group = localStorage.getItem('openCommunityID');

	// VALIDATION
	var numbers = /[0-9]/;
	var letters = /[a-zA-Z]/;
	if (isEmpty(departure)){
		alert("Bitte \u00fcberpr\u00fcfen Sie Ihren Startort!");
		return;
	}
	if (isEmpty(destination)){
		alert("Bitte \u00fcberpr\u00fcfen Sie Ihren Zielort!");
		return;
	}
	if (price.match(letters && price.length > 0) != null){
		alert("Bitte \u00fcberpr\u00fcfen Sie Ihre Preisangabe!");
		return;
	}
	if (date.length == 0){
		alert("Bitte geben Sie ein Datum an!");
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
		'userName' : userName,
		'userID' : userID,
		'groupID' : group
	}
	//alert("hier")
	$.ajax({
		type: "GET",
		url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/createARide.php",	
		data: requestData,
		dataType: "jsonp",
		success: function() {			
			alert('Datensatz wurde erfolgreich eingetragen.');
			window.location.href="community.html";
		},
	});
}


//<!-- STARTING MAP DEFINITION -->
function showMap() {
//alert("in showmap")
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
	    var start = document.getElementById("departure").value;
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
	var destination = document.getElementById("destination").value; // destination
	document.getElementById('map_canvas').style.width = $(window).width(); // map width
	document.getElementById('map_canvas').style.height = '400px'; // map height
	initialize();
	showRoute();
	
}
//<!-- END OF MAP DEFINITION -->