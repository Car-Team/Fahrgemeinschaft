///////////////////////////////////////////////////////////////////////////// communities.html
$( document ).on( "pageinit", "#communities", function( event ) {

	var requestData = {
		'action' : "getCommunities",
		'userID' : JSON.parse(localStorage.getItem('userdata')).id
	};

	databaseRequest(requestData);

});

///////////// Fill community list
function fillCommunitiyList(resultData){
	var ul = document.getElementById("communityList");
	$(ul).empty();
	$.each(resultData, function(key, value){
		var li = document.createElement("li");
		var a = document.createElement("a");
		a.appendChild(document.createTextNode(value['name']));
		li.appendChild(a);
		ul.appendChild(li);

		$(a).on("click", function(){
			localStorage.setItem('openCommunityID', value['community_id']);
			$.mobile.changePage("community.html");
									});

	});
	$(ul).listview("refresh");
};

///////////////////////////////////////////////////////////////////////////// community.html
$( document ).on( "pageinit", "#community", function( event ) {

	var requestData = {
		'action' : "loadCommunity",
		'communityID' : localStorage.getItem('openCommunityID')
	};	
	databaseRequest(requestData);
});

///////////// Fill community page with DB values
function fillCommunityInfo(resultData){
	$("#lblCommunityName").html(resultData['name']);

	var ul = document.getElementById("memberList");
	$(ul).empty();
	$.each(resultData['members'], function(key, value){
		var li = document.createElement("li");
		var a = document.createElement("a");
		var img = document.createElement("img");
		img.src = "media/img/bengel1.jpg";
		a.appendChild(img);
		a.appendChild(document.createTextNode(value['Name']));
		li.appendChild(a);
		//Admin prüfung einfügen
			var remove = document.createElement("a");
			remove.appendChild(document.createTextNode(value['Name'] + " aus der Fahrgemeinschaft entfernen"));
			li.appendChild(remove);
		ul.appendChild(li);

		// $(a).on("click", function(){
		// 	localStorage.setItem('openCommunityID', value['community_id']);
		// 	$.mobile.changePage("community.html");
		// 							});

	});
	$(ul).listview("refresh");
}

///////////////////////////////////////////////////////////////////////////// community_create.html
function createCommunity() {

	var communityName = $('#communityName').val();

	if(communityName.length < 5){
		alert("Bitte mindestens 5 Zeichen eingeben!");
	}else{
		var requestData = {
			'action' : "createCommunity",
			'communityName' : communityName,
			'userID' : JSON.parse(localStorage.getItem('userdata')).id
		};
		databaseRequest(requestData);
	}

};

///////////////////////////////////////////////////////////////////////////// community_invite.html
function inviteMember() {

	var inviteMail = $('#inviteMail').val();
	var emailCheck = true;

	if(emailCheck){
		var requestData = {
			'action' : "inviteMember",
			'communityID' : localStorage.getItem('openCommunityID'),
			'inviteMail' : inviteMail
		};
		databaseRequest(requestData);
	}else{
		alert("Bitte korrekte E-Mail eintragen!");
	}

};

///////////////////////////////////////////////////////////////////////////// AJAX REQUEST
function databaseRequest(requestData){
	$.ajax({
			type: "GET",
			url: "php/communities.php",
			// url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/communities.php",
			dataType: 'jsonp',
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
						    case "loadCommunity":
						    	fillCommunityInfo(resultData);
						    	break;
						    case "inviteMember":
						    	if(resultData){
						    		alert(requestData['inviteMail'] + " eingeladen!");
						    		$.mobile.changePage("community.html");
						    	}else {
						    		alert(requestData['inviteMail'] + " konnte nicht eingeladen werden!");
						    	}
						    	break;
						} 
					},
		});
};

