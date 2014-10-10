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
		url: "login.php",
		data: loginData,
		dataType: "json",
		success:	function(loginResult) {
						if(loginResult.successful){
							sessionStorage.setItem("userdata", JSON.stringify({id: loginResult.id, name: loginResult.name, email: loginResult.email, tel: loginResult.tel, picid: loginResult.picID, carid: loginResult.carID}));
							window.document.location.href = "menu.html";
						}else {
							alert("Falscher Benutzername oder falsches Passwort!");
						}
				},
	});
}