//Überprüfen ob ein Facebook User angemeldet ist, wenn ja keine Passwort Abfrage
$( document ).on( "pageinit", "#options", function( event ) {

var fbUserId = JSON.parse(localStorage.getItem('userdata')).fb_id;
  
  //check if fb_acc 
  if(fbUserId != "") {
  	$('#passwordConfirmation').hide();
  }
  else {
  	$('#passwordConfirmation').show();
  }
});




//Account des Benutzers löschen
function deleteAccount(){

	var id = JSON.parse(localStorage.getItem('userdata')).id;

	var fb_id = JSON.parse(localStorage.getItem('userdata')).fb_id;
	var pw = $('#pwRequest').val();
	var pwConfirm = $('#pwProof').val();

	var hashedPw = CryptoJS.SHA1(pw).toString();
	
	var data = {
		'fb_id' : fb_id,
		'id' : id,
		'pw' : hashedPw
	}

	//eingegebenes Passwort überprüfen auf gleichheit
	if(pwConfirm == '' || pw == '' || pwConfirm != pw) {
		alert("Die eingegebenen Passwörter sind falsch oder stimmen nicht überein!");
		return;
	}
		
	//Anfrage an Datenbank ob das Passwort zu dem Account gehört
	$.ajax({
		type: "GET",
		url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/options.php",
		data: data,
		dataType: "jsonp",
		success: function(result) {
			if(result.successful){
				$.mobile.changePage("index.html");
			}
			else {
				alert("Die eingegebenen Passwörter sind falsch oder stimmen nicht überein!");
			}
		},
	});
}