$(document).ready(function() {

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);

    if (response.status === 'connected') {

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
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }

  function signUpWithFacebook(public_profile) {
    var fullname = $(public_profile.first_name + " " + public_profile.last_name).val();
    var emailInput = $(email).val();
    var tel = $('').val();
    var nameInput = $(public_profile.name).val();
    var pwInput = $(password).val();
    var pwConfirmInput = $(password).val();
  
    if(pwInput != pwConfirmInput) {
      alert("JUNGE, " + pwInput + " ist nicht gleich " + pwConfirmInput);
      return;
    }
  
    var signupData = {
      'name' : fullname,
      'email' : emailInput,
      'tel' : tel,
      'username' : nameInput,
      'pw' : pwInput
    }
    
    $.ajax({
      type: "POST",
      url: "php/signup.php",
      data: signupData,
      success:  function(signupResult) {
                  alert(signupResult);
                  window.document.location.href = "index.html";
                },
      });
  }

  function checkAccountData(public_profile){
    var loginName = $('#nameInput').val();
    var loginPw = $('#pwInput').val();
  
    var loginData = {
      'loginName' : loginName,
      'loginPw' : loginPw
    }

    if(loginName == '' || loginPw == '')
    return;
    
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
              alert("Falscher Benutzername oder falsches Passwort!");
            }
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
