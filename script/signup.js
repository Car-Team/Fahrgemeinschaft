$(document).on('pageinit','#signup', function() {
	//validation
	
	$("input").change(function(){
		var val = $(this).val();
		if(val == ''){
			$(this).parent().css({"border-color": "red"});
		} else {
			$(this).parent().css({"border-color": "green"});
		}
	});
	
	$("#emailInput").change(function(){
		var email = $("#emailInput").val();
		if(email.indexOf("@") == -1){
			$("#emailInput").parent().css({"border-color": "red"});
		} else {
			$("#emailInput").parent().css({"border-color": "green"});
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
		} else {
			$("#pwInput").parent().css({"border-color": "green"});
			$("#pwConfirmInput").parent().css({"border-color": "green"});
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