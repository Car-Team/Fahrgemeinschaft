$(document).on('pageinit','#signup', function() {
	//validation
	
	$("#nameInput").change(function(){
		var name = $("#nameInput").val();
		if(nameValid(name)){
			$("#nameInput").parent().css({"border-color": "green"});
			$("#nameInputWarning").hide();
		} else {
			$("#nameInput").parent().css({"border-color": "red"});
			$("#nameInputWarning").show();
		}
	});
	
	$("#emailInput").change(function(){
		var email = $("#emailInput").val();
		if(emailValid(email)){
			$("#emailInput").parent().css({"border-color": "green"});
			$("#emailInputWarning").hide();
		} else {
			$("#emailInput").parent().css({"border-color": "red"});
			$("#emailInputWarning").show();
		}
	});
	
	$("#pwInput").change(function(){
		pwTest($("#pwInput").val(), $("#pwConfirmInput").val());
	});
	
	$("#pwConfirmInput").change(function(){
		pwTest($("#pwInput").val(), $("#pwConfirmInput").val());
	});
	
	function pwTest(pw, pwConfirm){
		if(pwValid(pw, pwConfirm)){
			$("#pwInput").parent().css({"border-color": "green"});
			$("#pwConfirmInput").parent().css({"border-color": "green"});
			$("#pwInputWarning").hide();
		} else {
			$("#pwInput").parent().css({"border-color": "red"});
			$("#pwConfirmInput").parent().css({"border-color": "red"});
			$("#pwInputWarning").show();
		}
	}
	
	function nameValid(name) {
		if(name == "") {
			return false;
		} else {
			return true;
		}
	}
	
	function emailValid(email) {
		if(email.indexOf("@") == -1) {
			return false;
		} else {
			return true;
		}
	}
	
	function pwValid(pw, pwConfirm) {
		if(pw == "" || pwConfirm == "" || pw != pwConfirm){
			return false;
		} else {
			return true;
		}
	}
	
});

function signup() {
	var name = $('#nameInput').val();
	var email = $('#emailInput').val();
	var pw = $('#pwInput').val();
	var pwConfirm = $('#pwConfirmInput').val();
	
	var everythingValid = nameValid(name) && emailValid(email) && pwValid(pw, pwConfirm);
	
	var signupData = {
		'name' : name,
		'email' : email,
		'pw' : pw
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