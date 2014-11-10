$(document).ready(function() {

	alert('js läuft an');
    $.ajax({
		type: "GET",
		url: "php/showARide.php",
		success: function(resultData) {
			alert("result data" + resultData['destination']);

			$("#date").html(resultData['date']);
			$("#departureTime").html(resultData['departure_time']);
			$("#departure").html(resultData['departure']);
			$("#destination").html(resultData['destination']);
			$("#freePlaces").html(resultData['freePlaces']);
			$("#price").html(resultData['price']);
			$("#carName").html(resultData['car_name']);
			$("#info").html(resultData['ride_infos']);
			$("#driverName").html(resultData['driver_name']);

		},
	});
    
});