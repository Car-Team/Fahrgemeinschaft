$( document ).on( "pageinit", "#communities", function( event ) {
	//var id = JSON.parse(sessionStorage.getItem("userdata")).id;
alert("fff");
	var ul = document.getElementById("communityList");
	var userID = 1;

	$.ajax({
			type: "GET",
			url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/communities.php",
			dataType: 'jsonp',
			data: 'userID='+userID,
			success:	function(resultData) {
							$.each(resultData, function(key, value){
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