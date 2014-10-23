$(document).on('pageinit','#signup', function() {
	//validation
	
	$("#nameInput").change(function(){
		var name = $("#nameInput").val();
		if(name == ""){
			$("#nameInput").parent().css({"border-color": "red"});
			$("#nameInputWarning").show();
		} else {
			$("#nameInput").parent().css({"border-color": "green"});
			$("#nameInputWarning").hide();
		}
	});
	
	$("#emailInput").change(function(){
		var email = $("#emailInput").val();
		if(email.indexOf("@") == -1){
			$("#emailInput").parent().css({"border-color": "red"});
			$("#emailInputWarning").show();
		} else {
			$("#emailInput").parent().css({"border-color": "green"});
			$("#emailInputWarning").hide();
		}
	});
	
	$("#pwInput").change(function(){
		pwTest($("#pwInput").val(), $("#pwConfirmInput").val());
	});
	
	$("#pwConfirmInput").change(function(){
		pwTest($("#pwInput").val(), $("#pwConfirmInput").val());
	});
	
	function pwTest(pw, pwConfirm) {
		if(pw != pwConfirm){
			$("#pwInput").parent().css({"border-color": "red"});
			$("#pwConfirmInput").parent().css({"border-color": "red"});
			$("#pwInputWarning").show();
		} else {
			$("#pwInput").parent().css({"border-color": "green"});
			$("#pwConfirmInput").parent().css({"border-color": "green"});
			$("#pwInputWarning").hide();
		}
	}
	
});

function signup() {
	var name = $('#nameInput').val();
	var emailInput = $('#emailInput').val();
	var pwInput = $('#pwInput').val();
	var pwConfirmInput = $('#pwConfirmInput').val();
	
	if(pwInput != pwConfirmInput) {
		alert("JUNGE, " + pwInput + " ist nicht gleich " + pwConfirmInput);
		return;
	}
	
	var signupData = {
		'name' : name,
		'email' : emailInput,
		'pw' : pwInput
	}
		
	$.ajax({
		type: "POST",
		url: "php/signup.php",
		data: signupData,
		success:	function(signupResult) {
						alert(signupResult);
						$.mobile.changePage("index.html");
					},
	});
}