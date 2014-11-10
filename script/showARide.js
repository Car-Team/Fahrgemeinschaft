$(document).on("pagebeforeshow", "#showARide", function(event) {
	alert("1");
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		//http://87.230.14.183/showARide.php
		url: "php/showARide.php",
		success: function(resultData) {
			alert("result data" + resultData.departure);

			$("#date").value = resultData.date;
			$("#departureTime").value = resultData.departure_time;
			$("#departure").value = resultData.departure;
			$("#destination").value = resultData.destination;
			$("#freePlaces").value = resultData.freePlaces;
			$("#price").value = resultData.price;
			$("#carName").value = resultData.car_name;
			$("#info").value = resultData.ride_infos;
			$("#driverName").value = resultData.driver_name;
		}
	});
});