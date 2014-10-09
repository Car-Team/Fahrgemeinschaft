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
								sessionStorage.setItem("userdata", JSON.stringify({
									id: loginResult.id, 
									name: loginResult.name, 
									email: loginResult.email, 
									tel: loginResult.tel, 
									picid: loginResult.picID, 
									carid: loginResult.carID,
									modelName: loginResult.modelName}));
								$.mobile.changePage("menu.html");
							}else {
								alert("Falscher Benutzername oder falsches Passwort!");
							}
						},
		});
	});
});