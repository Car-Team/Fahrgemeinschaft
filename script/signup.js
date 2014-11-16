$( document ).on( "pageinit", "#signup", function( event ) {
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
		if(pwValidLength(pw)){
			if(pwValidSimilar(pw, pwConfirm)){
				$("#pwInputSignUp").parent().css({"border-color": "green"});
				$("#pwConfirmInputSignUp").parent().css({"border-color": "green"});
				$("#pwInputWarning").hide();
			} else {
				$("#pwInputWarning").html("Die Passwörter stimmen nicht überein");
				$("#pwInputSignUp").parent().css({"border-color": "red"});
				$("#pwConfirmInputSignUp").parent().css({"border-color": "red"});
				$("#pwInputWarning").show();
			}
		} else {
			$("#pwInputWarning").html("Das Passwort muss mindestens 3 Zeichen lang sein.");
			$("#pwInputSignUp").parent().css({"border-color": "red"});
			$("#pwConfirmInputSignUp").parent().css({"border-color": "red"});
			$("#pwInputWarning").show();
		}
	}
});

function nameValid(name) {
	if(name == "") {
		return false;
	} else {
		return true;
	}
}
	
function emailValid(email) {
	var atIndex = email.indexOf("@");
	var afterAt = email.substring(atIndex + 1, email.length);
	var dotIndex = afterAt.indexOf(".") + atIndex + 1;
	if(atIndex != -1 && dotIndex != -1 && dotIndex > atIndex) {
		return true;
	} else {
		return false;
	}
}
	
function pwValidSimilar(pw, pwConfirm) {
	return pw == pwConfirm;

}

function pwValidLength(pw) {
	return pw.length >= 3;
}

function signup() {
	var name = $('#nameInputSignUp').val();
	var email = $('#emailInputSignUp').val();
	var pw = $('#pwInputSignUp').val();
	var pwConfirm = $('#pwConfirmInputSignUp').val();
	
	var everythingValid = nameValid(name) && emailValid(email) && pwValidLength(pw) && pwValidSimilar(pw, pwConfirm);

	if(!everythingValid) {
		alert("Überprüfe bitte deine Eingaben!");
		return;
	}

	var hashedPw = CryptoJS.SHA1(pw).toString();
	
	var signupData = {
		'name' : name,
		'email' : email,
		'pw' : hashedPw
	}
	
	$.ajax({
		type: "GET",
		// url: "php/signup.php",
		url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/signup.php",
		data: signupData,
		dataType: "jsonp",
		async: false,
		success:	function(signupResult) {
						alert(signupResult.message);
						if(signupResult.successful)
							$.mobile.changePage("index.html");
		},
	});
}