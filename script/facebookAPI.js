$(document).ready(function() {

    var fb_connected;

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  window.fbAsyncInit = function() {
        FB.init({
            appId      : '566575780137093',
            cookie     : true,  // enable cookies to allow the server to access 
                                // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.1' // use version 2.1
    });

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  };

  $('#fb-login').click ( function() { 
    alert("einloggen");
    FB.login(function(response) {
      statusChangeCallback(response);
    }, {scope: 'public_profile,email'});

  });

    // Daten aus FB auslesen
  function getUserData() {
    FB.api('/me', function(response) {
      console.log('FBID: ' + response.id);
      console.log('Name: ' + response.name);

      checkFB_ID(response);
    });
  }

  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);

    if (response.status == 'connected') {
      
      console.log("You`re connected with Facebook");
      getUserData();
    
    } else if (response.status === 'not_authorized') {
      
        document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    
    } else {
     
        document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  
  // Überprüfen ob FBID in Datenbank vorhanden ist
  function checkFB_ID(fbResponse){
   
    console.log('FBID überprüfen');

    var fbid_data = {
      'fbid' : fbResponse.id
    }

    $.ajax({
      type: "POST",
      url: "php/loginFB.php",
      data: fbid_data,
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
                fb_id: loginResult.fb_id,
                modelName: loginResult.modelName,
                licensePlate: loginResult.licensePlate,
                seats: loginResult.seats,
                constructionYear: loginResult.constructionYear,
                descriptionCar: loginResult.descriptionCar,
                colourCar: loginResult.colourCar}));

                console.log("FBID ist in Datenbank enthalten und Benutzerdaten sind geladen!");
                console.log(localStorage);
                $.mobile.changePage("menu.html");
              }else {
                console.log("FBID ist nicht vorhanden und Account wird angelegt!");

                signUpWithFacebook(fbResponse);
              }
          },
    });
  }

  //Mit Facebook Daten Account anlegen
  function signUpWithFacebook(fbResponse) {
  
    var signupData = {
      'fb_id' : fbResponse.id,
      'name' : fbResponse.name
    }
    
    $.ajax({
      type: "POST",
      url: "php/signupFB.php",
      data: signupData,
      success:  function(signupResult) {
                  alert(signupResult);
                  $.mobile.changePage("index.html");
                },
      });
  }

  //Logout
  $('#fb-logout').click ( function() {

    //get Userdata
    //  localStorage.getItem("userdata", JSON.stringify({
    //              id: loginResult.id, 
    //              loginname: loginResult.loginname,
    //              name: loginResult.name, 
    //              email: loginResult.email, 
    //              tel: loginResult.tel, 
    //              picid: loginResult.picID, 
    //              carid: loginResult.carID,
    //              descriptionUser: loginResult.descriptionUser,
    //              fb_id: loginResult.fb_id,
    //              modelName: loginResult.modelName,
    //              licensePlate: loginResult.licensePlate,
    //              seats: loginResult.seats,
    //              constructionYear: loginResult.constructionYear,
    //              descriptionCar: loginResult.descriptionCar,
    //              colourCar: loginResult.colourCar}));

    //check if fb_acc 
    //   if(fb_id != null) {

      FB.logout(function(response) {
        console.log('Benutzer ist ausgeloggt');
        $.mobile.changePage("index.html");
       });

    //  } else {
       $.mobile.changePage("index.html");
    //}   
  });

});
