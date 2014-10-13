function login() {
	var loginName = $('#nameInput').val();
	var loginPw = $('#pwInput').val();
	
	var loginData = {
		'loginName' : loginName,
		'loginPw' : loginPw
	}

	if(loginName == '' || loginPw == '')
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
								loginname: loginResult.loginname,
								name: loginResult.name, 
								email: loginResult.email, 
								tel: loginResult.tel, 
								picid: loginResult.picID, 
								carid: loginResult.carID,
								descriptionUser: loginResult.descriptionUser,
								modelName: loginResult.modelName,
								licensePlate: loginResult.licensePlate,
								seats: loginResult.seats,
								constructionYear: loginResult.constructionYear,
								descriptionCar: loginResult.descriptionCar,
								colourCar: loginResult.colourCar}));
							window.document.location.href = "menu.html";
						}else {
							alert("Falscher Benutzername oder falsches Passwort!");
						}
					},
	});
}
