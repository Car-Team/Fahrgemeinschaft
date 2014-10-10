function signup() {
	var emailInput = $('#emailInput').val();
	var nameInput = $('#nameInput').val();
	var pwInput = $('#pwInput').val();
			
	var signupData = {
		'email' : emailInput,
		'username' : nameInput,
		'pw' : pwInput
	}
		
	$.ajax({
		type: "POST",
		url: "signup.php",
		data: signupData,
		success:	function(signupResult) {
						alert(signupResult);
						window.document.location.href = "index.html";
					},
	});
}