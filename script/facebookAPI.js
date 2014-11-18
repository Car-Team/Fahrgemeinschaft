$(document).ready(function() {
  
  //Internetverbindung überprüfen
  //var online = window.navigator.onLine;
  //if(online == false) {
  //  checkConnection(); 
  //}

  // SDK asynchron laden
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
  };
});

//Netzwerkverbindung überprüfen
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}

//Facebook Login
function fblogin() { 
  FB.login(function(response) {
    statusChangeCallback(response);
  }, {scope: 'public_profile'});
};

// Daten aus FB auslesen
function getUserData() {
  FB.api('/me', function(response) {
    console.log('FBID: ' + response.id);
    console.log('Name: ' + response.name);
    console.log(response);
    checkFB_ID(response);
  });
}

// Status der Facebook Verbindung überprüfen
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);

  if (response.status == 'connected') {  
    console.log("Sie sind mit Facebook verbunden.");
    getUserData();
  } else if (response.status === 'not_authorized') {  
    console.log('Nicht authorisierter User, bitte in richtigen Account einloggen.');
  } else {     
    console.log('Unbekannter User, bitte einloggen');
  }
}

  
// Überprüfen ob FBID in Datenbank vorhanden ist
function checkFB_ID(fbResponse){
   
  console.log('FBID überprüfen');

  var fbid_data = {
    'fbid' : fbResponse.id
  }

  $.ajax({
    type: "GET",
    url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/loginFB.php",
    data: fbid_data,
    dataType: "jsonp",
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
              colourCar: loginResult.colourCar,
              viewProfileId: loginResult.id,
              viewRideId: 1}));

              console.log("FBID ist in Datenbank enthalten und Benutzerdaten sind geladen!");
              console.log(localStorage);
              window.location.href="menu.html";
              //$.mobile.changePage("menu.html");
            }else {
              console.log("FBID ist nicht vorhanden und Account wird angelegt!");
              signUpWithFacebook(fbResponse);
            }
         },
   });
}

var FBID;

//Mit Facebook Daten Account anlegen
function signUpWithFacebook(fbResponse) {

  var signupData = {
    'fb_id' : fbResponse.id,
    'name' : fbResponse.name
  }
  FBID = fbResponse;
 
  $.ajax({
    type: "GET",
    url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/signupFB.php",
    data: signupData,
    dataType: "jsonp",
    success:  function(signupResult) {
                alert(signupResult.message);
                if(signupResult.successful) {
                  window.location.href="emailRequest.html";                  
                  //$.mobile.changePage("emailRequest.html");
                }
          },
    });
}


//Logout
function logout() {

  //get Userdata
  var fbUserId = JSON.parse(localStorage.getItem('userdata')).fb_id;
  
  //check if fb_acc 
  if(fbUserId == "" || fbUserId == null) {
    window.location.href="emailRequest.html";
    //$.mobile.changePage("index.html");
  } else {
    FB.logout(function(response) {
      console.log('Benutzer ist ausgeloggt');
      window.location.href="index.html";
      //$.mobile.changePage("index.html");
    });
  }
  window.location.href="index.html";
  //$.mobile.changePage("index.html");
    window.localStorage.clear();
    console.log('localStorage gelöscht'); 
};

//E-Mail Adresse abfragen
function emailRequest() {

  var email = $('#emailRequest').val();

  if(email.search('@') != -1) {

  var signupData = {
    'fb_id' : FBID.id,
    'email' : email
  }

  $.ajax({
    type: "GET",
    url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/emailRequest.php",
    data: signupData,
    dataType: "jsonp",
    success:  function(signupResult) {
              if(signupResult.successful)
                loadLocalStorage();
                window.location.href="menu.html";
                //$.mobile.changePage("menu.html");
              },
    });
  }
  else {
    alert("Bitte geben Sie eine gültige E-Mail Adresse an.")
  }
}

//Localstorage laden
function loadLocalStorage() {
  var fbid_data = {
    'fbid' : FBID.id
  }

  $.ajax({
    type: "GET",
    url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/loginFB.php",
    data: fbid_data,
    dataType: "jsonp",
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
              colourCar: loginResult.colourCar,
              viewProfileId: loginResult.id,
              viewRideId: 1}));
            }
         },
   });
}
