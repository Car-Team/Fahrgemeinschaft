$(document).ready(function() {
	$("#login").click(function(){
		var loginName = $('#nameInput').val();
		var loginPw = $('#pwInput').val();
			
		var loginData = {
			'dbuser' : 'car',
			'dbpw' : 'car',
			'loginName' : loginName,
			'loginPw' : loginPw
		}

		if(loginName == '' || loginPw == '')
			return;
		
		$.ajax({
			type: "POST",
			url: "login.php",
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
									modelName: loginResult.modelName,
									licensePlate: loginResult.licensePlate,
									seats: loginResult.seats,
									constructionYear: loginResult.constructionYear,
									descriptionCar: loginResult.descriptionCar}));
								$.mobile.changePage("menu.html");
							}else {
								alert("Falscher Benutzername oder falsches Passwort!");
							}
						},
		});
	});
});

//to be able to login again!
/*(document).on('pagebeforeshow', '#index', function(){ 
		$("#login").click(function(){
			alert("jo")
		var loginName = $('#nameInput').val();
		var loginPw = $('#pwInput').val();
			
		var loginData = {
			'dbuser' : 'car',
			'dbpw' : 'car',
			'loginName' : loginName,
			'loginPw' : loginPw
		}

		if(loginName == '' || loginPw == '')
			return;
		
		$.ajax({
			type: "POST",
			url: "login.php",
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
									modelName: loginResult.modelName,
									licensePlate: loginResult.licensePlate,
									seats: loginResult.seats,
									constructionYear: loginResult.constructionYear}));
								$.mobile.changePage("menu.html");
							}else {
								alert("Falscher Benutzername oder falsches Passwort!");
							}
						},
		});
	});
});*/