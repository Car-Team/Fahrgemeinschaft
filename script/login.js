function login() {
	var email = $('#emailInput').val();
	var pw = $('#pwInput').val();
	
	var hashedPw = CryptoJS.SHA1(pw).toString();
	
	if(email == '' || pw == '')
		return;
	
	var loginData = {
		'email' : email,
		'pw' : hashedPw
	}

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
								carPicID: loginResult.carPicID,
								descriptionCar: loginResult.descriptionCar,
								colourCar: loginResult.colourCar,
								viewProfileId: loginResult.id})); //loginResult.id
							$.mobile.changePage("menu.html");
						}else {
							alert("Falscher Benutzername oder falsches Passwort!");
						}
					},
	});
}
