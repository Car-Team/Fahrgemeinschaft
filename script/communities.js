///////////////////////////////////////////////////////////////////////////// menu.html
$( document ).on( "pageinit", "#menu", function( event ) {

	var requestData = {
		'action' : "getInvites",
		'userID' : JSON.parse(localStorage.getItem('userdata')).id
	};

	databaseRequest(requestData);

	$("#popupDialog").on({popupbeforeposition: function(){
		$("#lblJoinCommunity").html("Einladung zur Fahrgemeinschaft <u>" + localStorage.getItem('inviteCommunityName') + "</u> akzeptieren?");
	}});

});

///////////// Fill Invitelist
function fillInviteList(resultData){
	var ul = document.getElementById("myInvitesList");
	$(ul).empty();
	$.each(resultData, function(key, value){
		var li = document.createElement("li");
		var a = document.createElement("a");
		a.appendChild(document.createTextNode(value['name']));
		// href="#popupDialog" data-rel="popup" data-position-to="window" data-transition="pop"
		a.href="#popupDialog";
		a.setAttribute("data-rel","popup");
		a.setAttribute("data-position-to", "window");
		a.setAttribute("data-transition", "pop");
		li.appendChild(a);
		ul.appendChild(li);

		$(a).on("click", function(){
			localStorage.setItem('inviteCommunityID', value['community_id']);
			localStorage.setItem('inviteCommunityName', value['name']);
									});

	});
	$(ul).listview("refresh");

	if(document.getElementById('myInvitesList').getElementsByTagName('li').length > 0){
		$("#myInvites").show();
	}else{
		$("#myInvites").hide();	
	}

};

///////////// Accept Invite
function acceptInvite(){
	var requestData = {
		'action' : "acceptInvite",
		'userID' : JSON.parse(localStorage.getItem('userdata')).id,
		'communityID' : localStorage.getItem('inviteCommunityID')
	};

	databaseRequest(requestData);
};

///////////// Refuse Invite
function refuseInvite(){
	var requestData = {
		'action' : "refuseInvite",
		'userID' : JSON.parse(localStorage.getItem('userdata')).id,
		'communityID' : localStorage.getItem('inviteCommunityID')
	};

	databaseRequest(requestData);
};

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
	$.each(resultData, function(key, value){
		var li = document.createElement("li");
		var a = document.createElement("a");
		a.appendChild(document.createTextNode(value['name']));
		li.appendChild(a);
		ul.appendChild(li);

		$(a).on("click", function(){
			localStorage.setItem('openCommunityID', value['community_id']);
			window.location.href="community.html";

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

	$("#removeMemberDialog").on({popupbeforeposition: function(){
		$("#lblRemoveMember").html(localStorage.getItem('removeMemberName') + " aus der Gruppe entfernen?");
	}});

	$("#removeInviteDialog").on({popupbeforeposition: function(){
		$("#lblRemoveInvite").html("Einladung an " + localStorage.getItem('removeMemberEmail') + " zur&uuml;ckziehen?");
	}});

});

///////////// Fill community page with DB values
function fillCommunityInfo(resultData){
	$("#lblCommunityName").html(resultData['name']);
	var admin = (JSON.parse(localStorage.getItem('userdata')).id == resultData['creator_id']) ? true : false;

////////Memberlist
	var ul = document.getElementById("memberList");
	$.each(resultData['members'], function(key, value){
		var li = document.createElement("li");
		var a = document.createElement("a");
		var img = document.createElement("img");
		var imgpicsrc= value['PicID']
		if(imgpicsrc.length<5){
			img.src="http://newtroy.integra-technologies.co.uk/static/images/unknown_user.png"
		}else{
			img.src = imgpicsrc;
		}
		a.appendChild(img);
		a.appendChild(document.createTextNode(value['Name']));

		///////// Connect to Profil
		a.addEventListener( 'click', function(){
			openProfilByID(value['ID']);
		});
		/////////////////////////////////

		li.appendChild(a);

		//Admin prüfung einfügen
		if(admin){
			var remove = document.createElement("a");
			remove.appendChild(document.createTextNode(value['Name'] + " aus der Fahrgemeinschaft entfernen"));
			remove.href="#removeMemberDialog";
			remove.setAttribute("data-rel","popup");
			remove.setAttribute("data-position-to", "window");
			remove.setAttribute("data-transition", "pop");
			$(remove).on("click", function(){
				localStorage.setItem('removeMemberID', value['ID']);
				localStorage.setItem('removeMemberName', value['Name']);
										});
			li.appendChild(remove);
		}
		ul.appendChild(li);
	});
	$(ul).listview("refresh");

////////InviteList/Inivte sichtbar wenn admin
	admin ? $("#inviteAdmin").show() : $("#inviteAdmin").hide();

////////InviteList laden
	if(admin){
		if(resultData['invites']){
			var ul = document.getElementById("inviteList");
			$.each(resultData['invites'], function(key, value){
				var li = document.createElement("li");
				var a = document.createElement("a");
				a.appendChild(document.createTextNode(value['Email']));

				a.href="#removeInviteDialog";
				a.setAttribute("data-rel","popup");
				a.setAttribute("data-position-to", "window");
				a.setAttribute("data-transition", "pop");
				$(a).on("click", function(){
					localStorage.setItem('removeMemberID', value['ID']);
					localStorage.setItem('removeMemberEmail', value['Email']);
											});


				li.appendChild(a);
				ul.appendChild(li);
			});
			$(ul).listview("refresh");
		}		
	}

////////RideList
	if(resultData['rides']){
		var ul = document.getElementById("rideList");
		$.each(resultData['rides'], function(key, value){
			var li = document.createElement("li");
			var a = document.createElement("a");
			var rideDate = value['date'].substring(3,5)+"."+value['date'].substring(0,2)+"."+value['date'].substring(6,10); // codepfusch
			var rideTime = value['departure_time'].substring(0,2) + ":" + value['departure_time'].substring(3,5) +  " Uhr"; // worst code ever
			a.appendChild(document.createTextNode(rideDate + " - " + rideTime + " // " + value['departure'] +  " - " + value['destination']));
			li.appendChild(a);
			ul.appendChild(li);

			$(a).on("click", function(){
				localStorage.setItem('openCommunityID', value['community_id']);
				var userData = JSON.parse(localStorage.getItem('userdata'));
				userData['viewRideId'] = value['ID'];
				localStorage.setItem("userdata", JSON.stringify(userData));


				window.location.href="showARide.html";
										});

		});
		$(ul).listview("refresh");
	}

}

function removeMember(){
	var requestData = {
		'action' : "removeMember",
		'userID' : localStorage.getItem('removeMemberID'),
		'communityID' : localStorage.getItem('openCommunityID')
	};

	databaseRequest(requestData);
};

function removeInvite(){
	var requestData = {
		'action' : "removeInvite",
		'userID' : localStorage.getItem('removeMemberID'),
		'communityID' : localStorage.getItem('openCommunityID')
	};

	databaseRequest(requestData);
};

///////////////////////////////////////////////////////////////////////////// community_create.html ///////////////////////////////TODOOOOOOOOO
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
	var requestData = {
		'action' : "inviteMember",
		'communityID' : localStorage.getItem('openCommunityID'),
		'inviteMail' : inviteMail
	};
	databaseRequest(requestData);

};

///////////////////////////////////////////////////////////////////////////// AJAX REQUEST
function databaseRequest(requestData){
	$.ajax({
			type: "GET",
			//url: "php/communities.php",
			url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/communities.php",
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
						    		window.location.href="community.html";
						    	}else {
						    		alert(requestData['inviteMail'] + " konnte nicht eingeladen werden!");
						    	}
						    	break;
						    case "getInvites":
						    	fillInviteList(resultData);
						    	break;
						    case "acceptInvite":
						    	if(resultData){
						    		alert("Fahrgemeinschaft beigetreten!");
						    		window.location.href="menu.html";
						    	}else {
						    		alert("Error");
						    	}
					    		break;
						    case "refuseInvite":
						    	if(resultData){
						    		alert("Einladung abgelehnt!");
						    		window.location.href="menu.html";
						    	}else {
						    		alert("Error");
						    	}
					    		break;
					    	case "removeMember":
						    	if(resultData){
						    		alert("Mitglied entfernt!");
						    		window.location.href="community.html";
						    	}else {
						    		alert("Error");
						    	}
					    		break;
					    	case "removeInvite":
						    	if(resultData){
						    		window.location.href="community.html";
						    	}else {
						    		alert("Error");
						    	}
					    		break;
						} 
					},
		});
};

