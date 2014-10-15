$(document).ready(function() {

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);

    if (response.status === 'connected') {

        checkFB_ID(response);
        //weiterleitung kann später entfernt werden
        $.mobile.changePage("menu.html");
        testAPI();
    
    } else if (response.status === 'not_authorized') {
      
            document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    
    } else {
     
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  $('#fb-login').click ( function() { 
    alert("einloggen");
    FB.login(function(response) {
      statusChangeCallback(response);
    }, {scope: 'public_profile,email'});
  });

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
    });
  }

  function checkFB_ID(response){
    var fb_id = $(response.id).val();
      
    $.ajax({
      type: "POST",
      url: "php/checkFB_ID.php",
      data: fb_id,
      dataType: "json",
      success:  function(loginResult) {
            if(loginResult.successful){

              loginFB(response);

              console.log("FBID ist in Datenbank enthalten!");
              window.document.location.href = "menu.html";
            }else {
              console.log("FBID ist nicht vorhanden!");
              signUpWithFacebook(response);
            }
          },
    });
  }

function loginFB(response) {

  var loginData = {
    'fb_id' : response.id,
  }
    
  $.ajax({
    type: "POST",
    url: "php/login.php",
    data: loginData,
    dataType: "json",
    success:  function(loginResult) {
            if(loginResult.successful){
              localStorage.setItem("userdata", JSON.stringify({
                id: loginResult.id, 
                loginname: loginResult.loginname,
                name: loginResult.name, 
                email: loginResult.email, 
                tel: loginResult.tel, 
                picid: loginResult.picID, 
                carid: loginResult.carID,
                descriptionUser: loginResult.descriptionUser,
                modelName: loginResult.modelName,
                licensePlate: loginResult.licensePlate,
                seats: loginResult.seats,
                constructionYear: loginResult.constructionYear,
                descriptionCar: loginResult.descriptionCar,
                colourCar: loginResult.colourCar}));
              window.document.location.href = "menu.html";
            }else {
              console.log("FBID nicht in der Datenbank enthalten");
            }
          },
  });
}


function signUpWithFacebook(response) {
    var fb_id = $(response.id).val();
    var fullname = $(response.first_name + " " + response.last_name).val();
    var emailInput = $(response.email).val();
    var tel = $('').val();
    var nameInput = $(response.name).val();

  
    var signupData = {
      'fb_id' : fb_id,
      'name' : fullname,
      'email' : emailInput,
      'tel' : tel,
      'username' : nameInput,
    }
    
    $.ajax({
      type: "POST",
      url: "php/signupFB.php",
      data: signupData,
      success:  function(signupResult) {
                  alert(signupResult);
                  window.document.location.href = "index.html";
                },
      });
}


  
  $('#fb-logout').click ( function() {
    FB.logout(function(response) {
      console.log('Benutzer ist ausgeloggt');
      $.mobile.changePage("index.html");
    });
  });

});
