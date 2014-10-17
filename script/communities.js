///////////////////////////////////////////////////////////////////////////// communities.html
$( document ).on( "pageinit", "#communities", function( event ) {
	//var id = JSON.parse(sessionStorage.getItem("userdata")).id;

	var requestData = {
		'action' : "getCommunities",
		'userID' : 1
	};

	databaseRequest(requestData);

});

function openCommunity( event ) {
	$.mobile.changePage("community.html", {data:{param1:'value1'}});
}

///////////// Fill community list
function fillCommunitiyList(resultData){
	var ul = document.getElementById("communityList");
	$.each(resultData, function(key, value){
		var li = document.createElement("li");
		var a = document.createElement("a");
		a.setAttribute("class", "ui-btn ui-btn-icon-right ui-icon-carat-r");
		a.setAttribute("data-transition","slide");
		// a.setAttribute("href", "community.html");
		// a.onClick($.mobile.changePage("community.html"));
		// a.setAttribute("communityID", value['community_id']);
		a.setAttribute("id", value['communityI_id']);
		a.appendChild(document.createTextNode(value['name']));
		li.appendChild(a);
		ul.appendChild(li);

		$(a).on("click",{name: value['community_id']},  openCommunity);

	});
};

///////////////////////////////////////////////////////////////////////////// community.html
$( document ).on( "pageinit", "#community", function( event ) {
	// var communityID = $.url(document.location).param("communityID");
	// alert(communityID);

			var url = $.url(document.location);

            var data = url.param("value1");

            alert(data);

});

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
						    	if(resultData){
						    		alert(requestData['communityName'] + " erstellt!");
						    		$.mobile.changePage("communities.html");
						    	}else {
						    		alert("Fahrgemeinschaft konnte unter dem Namen " + requestData['communityName'] + " nicht erstellt werden!");
						    	}
						    	break;
						} 
					},
		});
};

