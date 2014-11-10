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

	alert("1");
	
	$.ajax({
		type: "POST",
		url: "php/login.php",
		data: loginData,
		dataType: "json",
		success:	function(loginResult) {
			alert("2");
			if(loginResult.successful){
				alert("3");
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
					viewProfileId: loginResult.id})); //loginResult.id
				localStorage.setItem('hashedPw', hashedPw);
				alert("4");
				$.mobile.changePage("menu.html");
			}else {
				alert("Falscher Benutzername oder falsches Passwort!");
			}
		},
	});
}
