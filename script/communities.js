///////////////////////////////////////////////////////////////////////////// communities.html
$( document ).on( "pageinit", "#communities", function( event ) {
	//var id = JSON.parse(sessionStorage.getItem("userdata")).id;

	var requestData = {
		'action' : "getCommunities",
		'userID' : 1
	};

	databaseRequest(requestData);

});

///////////// Fill community list
function fillCommunitiyList(resultData){
	var ul = document.getElementById("communityList");
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
};

///////////////////////////////////////////////////////////////////////////// community_create.html
function createCommunity() {

	var communityName = $('#communityName').val();

	if(communityName.length < 5){
		alert("Bitte mindestens 5 Zeichen eingeben!");
	}else{
		var requestData = {
			'action' : "createCommunity",
			'communityName' : communityName,
			'userID' : 1
		};
		alert(requestData['communityName']);
		databaseRequest(requestData);
	}

};

///////////////////////////////////////////////////////////////////////////// AJAX REQUEST
function databaseRequest(requestData){
	$.ajax({
			type: "GET",
			url: "php/communities.php",
			// url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/communities.php",
			dataType: 'jsonp',
			// data: 'userID='+userID+'&action=getcommunities',
			data: requestData,
			success: function(resultData) {
						switch (requestData['action']) {
						    case "getCommunities":
						        fillCommunitiyList(resultData);
						        break;
						    case "createCommunity":
						    	alert("Fahrgemeinschaft erstellt!");
						    	break;
						} 
					},
		});
};

