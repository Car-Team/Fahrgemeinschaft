$(document).ready(function() {
	$("#login").click(function(){
		var loginName = $('#nameInput').val();
		var loginPw = $('#pwInput').val();
			
		var loginData = {
			'loginName' : loginName,
			'loginPw' : loginPw,
		}

		if(loginName == '' || loginPw == '')
			return;
		
		$.ajax({
			type: "POST",
			url: "test.php",
			data: loginData,
			dataType: "json",
			success:	function(loginResult) {
							if(loginResult.successful)
								$.mobile.changePage("menu.html");
							else
								alert("Falscher Benutzername oder falsches Passwort!");
						},
		});
	});
});