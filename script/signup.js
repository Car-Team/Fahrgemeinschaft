$(document).on('pageinit','#signup', function() {
	//validation
	
	$("#nameInputSignUp").change(function(){
		var name = $("#nameInputSignUp").val();
		if(nameValid(name)){
			$("#nameInput").parent().css({"border-color": "green"});
			$("#nameInputWarning").hide();
		} else {
			$("#nameInput").parent().css({"border-color": "red"});
			$("#nameInputWarning").show();
		}
	});
	
	$("#emailInputSignUp").change(function(){
		var email = $("#emailInputSignUp").val();
		if(emailValid(email)){
			$("#emailInputSignUp").parent().css({"border-color": "green"});
			$("#emailInputWarning").hide();
		} else {
			$("#emailInputSignUp").parent().css({"border-color": "red"});
			$("#emailInputWarning").show();
		}
	});
	
	$("#pwInputSignUp").change(function(){
		pwTest($("#pwInputSignUp").val(), $("#pwConfirmInputSignUp").val());
	});
	
	$("#pwConfirmInputSignUp").change(function(){
		pwTest($("#pwInputSignUp").val(), $("#pwConfirmInputSignUp").val());
	});
	
	function pwTest(pw, pwConfirm){
		if(pwValid(pw, pwConfirm)){
			$("#pwInputSignUp").parent().css({"border-color": "green"});
			$("#pwConfirmInputSignUp").parent().css({"border-color": "green"});
			$("#pwInputWarning").hide();
		} else {
			$("#pwInputSignUp").parent().css({"border-color": "red"});
			$("#pwConfirmInputSignUp").parent().css({"border-color": "red"});
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
	var name = $('#nameInputSignUp').val();
	var email = $('#emailInputSignUp').val();
	var pw = $('#pwInputSignUp').val();
	var pwConfirm = $('#pwConfirmInputSignUp').val();
	
	//var everythingValid = nameValid(name) && emailValid(email) && pwValid(pw, pwConfirm);
	
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