$(document).on("pagebeforeshow", "#showARide", function() {
	//alert("1");


viewRideID = 9;
var viewRideData = {
			'viewRideID' : viewRideID
		}

$.ajax({
		type: "POST",
		url: "php/showARide.php",	
		data: viewRideData,	
		dataType: "json",	
		success:	function(viewRideResult) {
			
			alert("result data der ID: " + viewRideResult.ID);
//`ID`,`group`,`driver_id`,`price`,`date`,`departure_time`,`departure`,`destination`,`free_places`,`car_name`,`ride_infos` 
			/*document.getElementById("date").innerHTML = 			viewRideResult.date;
			document.getElementById("departureTime").innerHTML = 	viewRideResult.departure_time;
			document.getElementById("departure").innerHTML = 		viewRideResult.departure;
			document.getElementById("destination").innerHTML = 		viewRideResult.destination;
			document.getElementById("freePlaces").innerHTML = 		viewRideResult.free_places;
			document.getElementById("price").innerHTML = 			viewRideResult.price;
			document.getElementById("carName").innerHTML = 			viewRideResult.car_name;
			document.getElementById("info").innerHTML = 			viewRideResult.ride_infos;
			document.getElementById("driverName").innerHTML = 		viewRideResult.name;*/

			document.getElementById("date").value = 			viewRideResult.date;
			document.getElementById("departureTime").value = 	viewRideResult.departure_time;
			document.getElementById("departure").value = 		viewRideResult.departure;
			document.getElementById("destination").value = 		viewRideResult.destination;
			document.getElementById("freePlaces").value = 		viewRideResult.free_places;
			document.getElementById("price").value = 			viewRideResult.price;
			document.getElementById("carName").value = 			viewRideResult.car_name;
			document.getElementById("info").value = 			viewRideResult.ride_infos;
			document.getElementById("driverName").value = 		viewRideResult.name;


			showMap(document.getElementById("destination").value)

		}
	});
});

