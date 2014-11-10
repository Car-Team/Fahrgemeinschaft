$(document).ready(function() {

    $.ajax({
		type: "GET",
		url: "php/showARide.php",
		success: function(resultData) {
			alert('success');
			alert(resultData);
		},
	});
    
});