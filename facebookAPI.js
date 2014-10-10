$(document).ready(function() {

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);

    if (response.status === 'connected') {

        $.mobile.changePage("menu.html");
    
    } else if (response.status === 'not_authorized') {
      
            document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    
    } else {
     
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  $('#fb-login').click ( function() { 
    FB.login(function(response) {
      statusChangeCallback(response);
    }, {scope: 'public_profile,email'});
  });

  $('#fb-logout').click ( function() {
    FB.logout(function(response) {
      console.log('Benutzer ist ausgeloggt');
      $.mobile.changePage("index.html");
    });
  });

});
