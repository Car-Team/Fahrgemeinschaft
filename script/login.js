// $(document).on("pageinit", "#index", function(event) {
	//// check for logindata in localStorage
	// var email = JSON.parse(localStorage.getItem('userdata')).email;
	// var hashedPw = localStorage.getItem('hashedPw');

	// if(email != "" && hashedPw != "")
		// loginAs(email, hashedPw);
	
// });

$(document).on("pageinit", "#index", function() {
	$('#login').on("tap", function(){
		login();
	});
});

function login() {
	var email = $('#emailInput').val();
	var pw = $('#pwInput').val();
	
	if(email == '' || pw == '')
		return;
		
	var hashedPw = CryptoJS.SHA1(pw).toString();
	
	loginAs(email, hashedPw);
}

function loginAs(email, hashedPw) {
	var loginData = {
		'email' : email,
		'pw' : hashedPw
	}
	
	$.ajax({
		type: "GET",
		url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/login.php",
		//url: "php/login.php",
		data: loginData,
		dataType: "jsonp",
		success:	function(loginResult) {
			if(loginResult.successful){
				localStorage.setItem("userdata", JSON.stringify({
					id: loginResult.id, 
					name: loginResult.name, 
					email: loginResult.email, 
					tel: loginResult.tel, 
					picid: loginResult.picID, 
					carid: loginResult.carID,
					descriptionUser: loginResult.descriptionUser,
					fb_id: loginResult.fb_id,
					modelName: loginResult.modelName,
					licensePlate: loginResult.licensePlate,
					seats: loginResult.seats,
					constructionYear: loginResult.constructionYear,
					carPicID: loginResult.carPicID,
					descriptionCar: loginResult.descriptionCar,
					colourCar: loginResult.colourCar,
					viewProfileId: loginResult.id,
					viewRideId: 1})); //loginResult.id
				localStorage.setItem('hashedPw', hashedPw);
				$.mobile.changePage("menu.html");
			}else {
				alert("Falscher Benutzername oder falsches Passwort!");
			}
		},
	});
}
