function login() {
	var email = $('#nameInput').val();
	var pw = $('#pwInput').val();
	
	var loginData = {
		'email' : email,
		'pw' : pw
	}

	if(email == '' || pw == '')
	return;
		
	$.ajax({
		type: "POST",
		url: "php/login.php",
		data: loginData,
		dataType: "json",
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
								descriptionCar: loginResult.descriptionCar,
								colourCar: loginResult.colourCar}));
							$.mobile.changePage("menu.html");
						}else {
							alert("Falscher Benutzername oder falsches Passwort!");
						}
					},
	});
}
