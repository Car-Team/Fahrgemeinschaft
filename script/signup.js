function signup() {
	var name = $('#nameInput').val();
	var emailInput = $('#emailInput').val();
	var tel = $('#telInput').val();
	var nameInput = $('#usernameInput').val();
	var pwInput = $('#pwInput').val();
	var pwConfirmInput = $('#pwConfirmInput').val();
	
	if(pwInput != pwConfirmInput) {
		alert("JUNGE, " + pwInput + " ist nicht gleich " + pwConfirmInput);
		return;
	}
	
	var signupData = {
		'name' : name,
		'email' : emailInput,
		'tel' : tel,
		'username' : nameInput,
		'pw' : pwInput
	}
		
	$.ajax({
		type: "POST",
		url: "php/signup.php",
		data: signupData,
		success:	function(signupResult) {
						alert(signupResult);
						window.document.location.href = "index.html";
					},
	});
}