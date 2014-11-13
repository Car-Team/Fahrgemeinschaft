$(document).on("pagebeforeshow", "#showARide", function() {
	//alert("1");
//var group = localStorage.getItem('openCommunityID');
//alert(group);

viewRideID = JSON.parse(localStorage.getItem('userdata')).viewRideId;
var viewRideData = {
			'viewRideID' : viewRideID
		}

$.ajax({
		type: "GET",
		url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/showARide.php",	
		data: viewRideData,	
		dataType: "jsonp",	
		success:	function(viewRideResult) {			
			//alert("result data der ID: " + viewRideResult.ID);
			// Names of Columns in Database:`ID`,`group`,`driver_id`,`price`,`date`,`departure_time`,`departure`,`destination`,`free_places`,`car_name`,`ride_infos` 
			document.getElementById("date").value = 			viewRideResult.date;
			document.getElementById("departureTime").value = 	viewRideResult.departure_time;
			document.getElementById("departure").value = 		viewRideResult.departure;
			document.getElementById("destination").value = 		viewRideResult.destination;
			document.getElementById("freePlaces").value = 		viewRideResult.free_places;
			document.getElementById("price").value = 			viewRideResult.price;
			document.getElementById("carName").value = 			viewRideResult.car_name;
			document.getElementById("info").value = 			viewRideResult.ride_infos;
			document.getElementById("driverName").value = 		viewRideResult.name;			

			document.getElementById("date").readOnly = true;
			document.getElementById("departureTime").readOnly = true;
			document.getElementById("departure").readOnly = true;
			document.getElementById("destination").readOnly = true;
			document.getElementById("freePlaces").readOnly = true;
			document.getElementById("price").readOnly = true;
			document.getElementById("carName").readOnly = true;
			document.getElementById("info").readOnly = true;
			document.getElementById("driverName").readOnly = true;

			//showMap(document.getElementById("destination").value)

		}
	});
});

