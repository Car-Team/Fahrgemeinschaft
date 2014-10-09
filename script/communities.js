$(document).on('pagebeforeshow', '#communities', function(){
	//var id = JSON.parse(sessionStorage.getItem("userdata")).id;
	var ul = document.getElementById("communityList");
	var userID = 1;

	var postData = {
		'userID' : userID,
	}


	$.ajax({
			type: "POST",
			//url: "carteam.lvps87-230-14-183.dedicated.hosteurope.de/communities.php",
			url: "php/communities.php",
			data: postData,
			success:	function(resultData) {
							    						    						
alert(resultData);
							var list = $.parseJSON(resultData);
							$.each(list, function(key, value){

									var li = document.createElement("li");
									var a = document.createElement("a");
									a.setAttribute("class", "ui-btn ui-btn-icon-right ui-icon-carat-r");
									a.setAttribute("data-transition","slide");
									a.setAttribute("href", value['community_id']);
									a.appendChild(document.createTextNode(value['name']));
									li.appendChild(a);
									ul.appendChild(li);

							});


						},
		});

});
