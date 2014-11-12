$(document).on("pagebeforeshow", "#showARide", function(event) {
	//alert("1");




$.ajax({
		type: "POST",
		url: "php/showARide.php",		
		dataType: "json",	
		success:	function(viewRideResult) {
			
			alert("result data der ID: " + viewRideResult.ID);
//`ID`,`group`,`driver_id`,`price`,`date`,`departure_time`,`departure`,`destination`,`free_places`,`car_name`,`ride_infos` 
			document.getElementById("date").value = 			viewRideResult.date;
			document.getElementById("departureTime").value = 	viewRideResult.departure_time;
			document.getElementById("departure").value = 		viewRideResult.departure;
			document.getElementById("destination").value = 		viewRideResult.destination;
			document.getElementById("freePlaces").value = 		viewRideResult.free_places;
			document.getElementById("price").value = 			viewRideResult.price;
			document.getElementById("carName").value = 			viewRideResult.car_name;
			document.getElementById("info").value = 			viewRideResult.ride_infos;
			document.getElementById("driverName").value = 		viewRideResult.driver_name;
		}
	});
});