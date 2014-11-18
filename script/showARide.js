$(document).on("pagebeforeshow", "#showARide", function() {
	viewRideID = JSON.parse(localStorage.getItem('userdata')).viewRideId;
	userID = JSON.parse(localStorage.getItem("userdata")).id;

	$('#btnToggleRide').hide();
	$('#btnCancelRide').hide();
	
	$('#btnCancelRide').click(function() {
		$('#cancelRidePopup').popup("open");
	});
	
	$('#cancelRideAccept').click(function() {
		cancelRide(viewRideID);
	});
	
	fillRideData(viewRideID);
	fillRiders(viewRideID, userID);
	configureButtons(viewRideID, userID);
	appendWall(viewRideID);
});

function fillRideData(viewRideID) {
	var viewRideData = {
		'viewRideID' : viewRideID
	}
	
	$.ajax({
		type: "GET",
		url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/showARide.php",	
		data: viewRideData,	
		dataType: "jsonp",
		success:	function(viewRideResult) {			
			//alert("result data der ID: " + viewRideResult.ID);
			// Names of Columns in Database:`ID`,`group`,`driver_id`,`price`,`date`,`departure_time`,`departure`,`destination`,`free_places`,`car_name`,`ride_infos` 
			//Paste info from DB				
			var datum=viewRideResult.date;
			document.getElementById("date").value = 			datum.substring(3,5)+"."+datum.substring(0,2)+"."+datum.substring(6,10);
			document.getElementById("departureTime").value = 	viewRideResult.departure_time;
			document.getElementById("departure").value = 		viewRideResult.departure;
			document.getElementById("destination").value = 		viewRideResult.destination;
			document.getElementById("freePlaces").value = 		viewRideResult.free_places;
			document.getElementById("price").value = 			viewRideResult.price;
			document.getElementById("carName").value = 			viewRideResult.car_name;
			document.getElementById("info").value = 			viewRideResult.ride_infos;
			document.getElementById("driverName").value = 		viewRideResult.name;		

          document.getElementById("driverName").onclick=function(){openProfilByID(viewRideResult.userID)};		

			//users shouldnt be allowed to edit the rideoverview
			document.getElementById("date").readOnly = true;
			document.getElementById("departureTime").readOnly = true;
			document.getElementById("departure").readOnly = true;
			document.getElementById("destination").readOnly = true;
			document.getElementById("freePlaces").readOnly = true;
			document.getElementById("price").readOnly = true;
			document.getElementById("carName").readOnly = true;
			document.getElementById("info").readOnly = true;
			document.getElementById("driverName").readOnly = true;
			//showMap(document.getElementById("destination").value);
		}
	});
}

function configureButtons(rideID, userID) {
	var rideIDContainer = {
		'rideID' : rideID,
	}

	$.ajax({
		type: "GET",
		url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/rideData.php",
		data: rideIDContainer,	
		dataType: "jsonp",
		success:	function(answer) {
			var departure = Date.parse(answer.date);
			var rideHappenedYet = departure < new Date().getTime();
			
			//show "Mitfahren" button if ride did not happen yet and user is not driver		
			if(answer.driverID != userID && !rideHappenedYet) 
				$('#btnToggleRide').show();
			
			//show cancel-ride button if user is driver
			if(answer.driverID == userID && !rideHappenedYet)
				$('#btnCancelRide').show();
		}
	});


	
}

function fillRiders(rideID, userID) {
	$('#rider').empty();
	
	var rideIDContainer = {
		'rideID' : rideID
	}
	
	var isRider = false;
	
	$.ajax({
		type: "GET",
		url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/fetchRider.php",
		data: rideIDContainer,	
		dataType: "jsonp",	
		success:	function(riders) {
			riders.forEach(function(rider) {
				appendRider(rider);
				if(rider.id == userID)
					isRider = true;
			});
			if(isRider)
				$('#btnToggleRide').html("Doch nicht mitfahren");
			else
				$('#btnToggleRide').html("Mitfahren");
		}
	});
}

function appendRider(rider) {
	var li = document.createElement("li");
	{
		var a = document.createElement("a");
		{
			var img = document.createElement("img");
			$(img).attr("src", rider.picid);
			$(img).click(function() {
				openProfilByID(rider.id);
			});
		
			var span1 = document.createElement("span");
			$(span1).html(rider.name);
			$(span1).click(function() {
				openProfilByID(rider.id);
			});
			
			a.appendChild(img);
			a.appendChild(span1);
		}
		li.appendChild(a);
	}	
	$('#rider').append(li);
	$('#rider').listview("refresh");
}

function toggleRide() {
	//disable button to prevent bugs
	$('#btnToggleRide').attr('onClick', '');
	
	var viewRideID = JSON.parse(localStorage.getItem('userdata')).viewRideId;
	var userID = JSON.parse(localStorage.getItem('userdata')).id;

	var toggleData = {
		'rideID' : viewRideID,
		'userID' : userID
	}
	
	$.ajax({
		type: "GET",
		url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/toggleRider.php",
		data: toggleData,	
		dataType: "jsonp",	
		success:	function(message) {
			fillRiders(viewRideID);
			//enable the button again
			$('#btnToggleRide').attr('onClick', 'toggleRide();');
		},
		error: function(message) {
			//enable the button again
			$('#btnToggleRide').attr('onClick', 'toggleRide();');
		}
	});
}

function cancelRide(rideID) {
	var rideIDContainer = {
		'rideID' : rideID
	}

	$.ajax({
		type: "GET",
		url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/cancelRide.php",
		data: rideIDContainer,	
		dataType: "jsonp",	
		success:	function(message) {
			alert(message);
			$.mobile.changePage( "/communities.html");
		}
	});
}

////////////////////////////////////////FILL Wall DATA///////////////////////////////////////////////
function appendWall(viewRideID) {	
	var viewRideData = {
		'viewRideID' : viewRideID
	}
	//////////////////////////////CONNECT TO DB TO GET THE WALL / "PINNWAND EINTRAEGE"////////////////////////
	//alert(userLoggedInDataloginID)	;
	var myWallEntries;
	var myCommentEntries;						
		$.ajax({
			type: "GET",
			url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/commentsRides.php",
			data: viewRideData,
			dataType: "jsonp",			
			success:	function(commententries) {																	
				myCommentEntries=commententries;
				lookintoWallRides(myCommentEntries);										
			},
			error:	function() {										
				myCommentEntries={'ID':0, 'WallID':0, 'ReceiverID':0, 'SenderID':0, 'Textinput':0, 'Timestamp':0, 'name':0} //give empty commentlist into function to avoid errors
				lookintoWallRides(myCommentEntries);										
			},
	});	
}

//remove Comment
function removeWallCommentRides(commentid){
	var postData = {
			'commentID' : commentid
	}
		//alert(postData.commentID)
	if (confirm("Sicher, dass sie den Kommentar Nr. "+postData.commentID+ " löschen wollen?")) {
		$.ajax({
			type: "GET",
			url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/removeCommentRides.php",
			data: postData,
			dataType: "jsonp",
			success:	function() {							
							window.location.href="showARide.html"//window.location.href
						},
		});
	}
}

//remove Wallentry
function removeWallEntryRides(wallid){
	var postData = {
		'wallID' : wallid
	}
	//alert(postData.wallID)
	if (confirm("Sicher, dass sie den PinnwandEintrag Nr. "+postData.wallID+ " und alle damit verbundenen Kommentare löschen wollen?")) {
		$.ajax({
			type: "GET",
			url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/removeEntryRides.php",
			data: postData,
			dataType: "jsonp",
			success:	function() {							
							window.location.href="showARide.html"//window.location.href
						},
		});
	}
}

//Post Wallentry on Rideoverview
function postTWRides() {
	var text = $('#postTextRides').val();
	document.getElementById('postTextRides').value ="";
	var loginID = JSON.parse(localStorage.getItem('userdata')).id;	
	var viewRideID = JSON.parse(localStorage.getItem('userdata')).viewRideId;//JSON.parse(localStorage.getItem('userdata')).viewProfileId;
	if(text.length==0) {
		alert("Leere Nachrichten werden nicht verschickt. Geben Sie mindestens 1 Zeichen ein!");	
	}else{	
		var postData = {
			'text' : text,
			'loginID' : loginID,
			'viewRideID' : viewRideID
		}
			
		$.ajax({
			type: "GET",
			url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/postToWallRides.php",
			data: postData,
			dataType: "jsonp",
			success:	function() {
							//alert(postResult);
							window.location.href=window.location.href
						},
		});
	}
}

//Post Comment of an Entry on Rideoverview
function postCORides() {
	 //alert("kommentiere den eintrag "+window.commentIDInput);
	var text = $('#commentTextToPostRides').val();
	document.getElementById('commentTextToPostRides').value ="";
	var loginID = JSON.parse(localStorage.getItem('userdata')).id;	
	var viewRideID = JSON.parse(localStorage.getItem('userdata')).viewRideId;//JSON.parse(localStorage.getItem('userdata')).viewProfileId;	
	if(text.length==0) {
		alert("Leere Kommentare werden nicht verschickt. Geben Sie mindestens 1 Zeichen ein!");	
		$( "#popupCommentRides" ).popup( "close" );

	}else{	
		var postData = {
			'text' : text,
			'loginID' : loginID,
			'viewRideID' : viewRideID,
			'wallID': window.commentIDInput
		}
			$( "#popupComment" ).popup( "close" );
		$.ajax({
			type: "GET",
			url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/postCommentRides.php",
			data: postData,
			dataType: "jsonp",
			success:	function() {					
							window.location.href="showARide.html"
						},
		});
	}
}


// realign the wallentries time and text after the profilpicture of the wallentry is loaded
function realignEntriesRides(wID){
	//alert(cID)
	$("#wPicRides"+wID).one('load', function() {
		//alert(cID + " loaded.")

		var imgHeight = $("#wPicRides"+wID).height() 
		var textMarginTop = imgHeight+6;	
													       	
		if(imgHeight>10){											       									       						
			$("#wTextDivRides"+wID).css({ // place the elements of the wallentry acording to the size of the image     	     			
				"margin-top": textMarginTop+"px"
			});
		}else{
			textMarginTop=86;											       		
			$("#wTextDivRides"+wID).css({ // place the elements of the wallentry acording to the size of the image     	   			
				"margin-top": textMarginTop+"px"
			});	
		}
		var imgWidth = $("#wPicRides"+wID).width() 
		var textMarginLeft = Math.round(imgWidth+10);
													       						//alert(textMarginLeft);
		if(imgWidth>10){											       									       						
			$("#wTimeDivRides"+wID).css({ // place the elements of the wallentry acording to the size of the image     	     			
				"margin-left": textMarginLeft+"px"
			});
		}else{
			textMarginLeft=84;											       		
			$("#wTimeDivRides"+wID).css({ // place the elements of the wallentry acording to the size of the image     	    			
				"margin-left": textMarginLeft+"px"
			});
		}
												   

	});
}

// realign the comments time and text after the profilpicture of the comment is loaded
function realignCommentsRides(cID){
	//alert(cID)
	$("#cPicRides"+cID).one('load', function() {
		//alert(cID + " loaded.")
		var imgHeight = $("#cPicRides"+cID).height() 
		var textMarginTop = imgHeight + 26;											       					
		if(imgHeight>10){											       									       						
			$("#cTextDivRides"+cID).css({ // place the elements of the wallentry acording to the size of the image     	    			
				 "margin-top": textMarginTop+"px"
			});
		}else{
			textMarginTop=84+26;											       		
			$("#cTextDivRides"+cID).css({ // place the elements of the wallentry acording to the size of the image     	     			
				  "margin-top": textMarginTop+"px"
			});
		}

		var imgWidth = $("#cPicRides"+cID).width() 
		var textMarginLeft = Math.round(imgWidth+10);												       					
		if(imgWidth>10){											       									       						
			$("#cTimeDivRides"+cID).css({ /// place the elements of the wallentry acording to the size of the image     	     			
				 "margin-left": textMarginLeft+"px"
			});
		}else{
			textMarginLeft=84;											       		
			$("#cTimeDivRides"+cID).css({ // place the elements of the wallentry acording to the size of the image          			
				  "margin-left": textMarginLeft+"px"
			});
		}
	});
}

//Load Wall
function lookintoWallRides(myCommentEntries){
		var userLoggedInDataloginID = JSON.parse(localStorage.getItem('userdata')).id;
		var myWallEntries;
	
		var userLoggedInData = {
			//'loginName' : userLoggedInDataloginName,
			'loginID' : userLoggedInDataloginID
		}
		var viewRideID = JSON.parse(localStorage.getItem('userdata')).viewRideId;//JSON.parse(localStorage.getItem('userdata')).viewProfileId;

		var viewRideData = {
			'viewRideID' : viewRideID
		}


									$.ajax({
										type: "GET",
										url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/wallRides.php",
										data: viewRideData,
										dataType: "jsonp",			
										success:	function(wallentries) {	
											var i = 0;
											myWallEntries=wallentries;
											var j = 0;
											var cIDs = [];
											var wIDs = [];

											//ADD EACH WALLENTRY
											for (;myWallEntries[j];) {		        // Create the list item:
											        var date = (myWallEntries[j].Timestamp).substring(0,11);
											        var date1=new Date().getTime()- (new Date().getTimezoneOffset() * 60000);										       
													var dateb2= myWallEntries[j].Timestamp;
													var date2 = new Date(dateb2.replace(' ', 'T')).getTime();											       
											     
											       $("#ulWallHeaderRides").append(
											      	$("<li data-role='list-divider' style='font-size:1.1em'  onClick='openProfilByID("+myWallEntries[j].SenderID+");'>").append(			//+"."+date.substring(0,4)	      		
											       	 myWallEntries[j].name+"<span class='ui-li-count'>"+date.substring(8,10)+"."+date.substring(5,7)+" - "+(myWallEntries[j].Timestamp).substring(11,16)+"</span>" //myWallEntries.length+
											       )).listview("refresh");

											        var wImgSrc="";
											        if(myWallEntries[j].picID.length>5){
											       	wImgSrc=myWallEntries[j].picID;//"http://newtroy.integra-technologies.co.uk/static/images/unknown_user.png" 
											   		}else{
											   		wImgSrc="http://newtroy.integra-technologies.co.uk/static/images/unknown_user.png"; 	
											   		}

												   	var deleteString ="";
											   		var einrueckPixel=0;
											   		if(myWallEntries[j].SenderID==JSON.parse(localStorage.getItem('userdata')).id){
											   			deleteString = "<a class='ui-btn ui-corner-all btn-only-icon fa fa-remove' style='Color:white; Background-Color:#FF6666; text-shadow: none; position: absolute; margin-right:6px; right:0px; top: -2px;' onClick='removeWallEntryRides("+myWallEntries[j].ID+");'>"+	"</a>";				 		
											   			einrueckPixel=50;
											   		}
											       $("#ulWallHeaderRides").append(
											       	$("<li style='min-height:66px'>").append(
												       	"<div class='commentPicFrameWall'>"+
												       		"<img id='wPicRides"+myWallEntries[j].ID+"' class='wallpic' src='"+wImgSrc+"'  onClick='openProfilByID("+myWallEntries[j].SenderID+");'></img>"+
												       	"</div>"+
												       	"<div id='wTimeDivRides"+myWallEntries[j].ID+"' style='position: absolute; margin-left:90px; margin-top:4px'>"+
												       		"<label class='timeGone'>"+timeDifference(date1,date2)+"</label>"+
												       	"</div>"+
														"<div id='wTextDivRides"+myWallEntries[j].ID+"' style='margin-top:75px' align='justify'>"+
																																									       		
												       	 		"<label style='white-space:normal'>" + 
												       	 			myWallEntries[j].Textinput + 												       	 			
												       	 		"</label>"+	
												       	 		"<a href='#popupCommentRides' data-rel='popup' data-position-to='window' class='ui-btn ui-corner-all btn-only-icon fa fa-comment' data-transition='pop' style='Color:white; Background-Color:#6d88b7; text-shadow: none; position: absolute; margin-right:6px; right:"+einrueckPixel+"px; top: -2px;' onClick='openCommentInput("+myWallEntries[j].ID+");'>"+	
												       	 		 ""+//"ID:"+myWallEntries[j].ID+
												       	 		"</a>"+	
												       	 		deleteString+												       	 											       		
												       	"</div>"
											       	)).listview("refresh");

													wIDs.push(myWallEntries[j].ID);// for a later realign of the text components acording to the picture size
													

														i=0;	
														//ADD THE COMMENTS
											       		for (;myCommentEntries[i];) {	
											       				if(myWallEntries[j].ID == myCommentEntries[i].WallID){
											       					var cdate = (myCommentEntries[i].Timestamp).substring(0,11);
											       					var cdate1=new Date().getTime() - (new Date().getTimezoneOffset() * 60000);												       
																	var cdateb2= myCommentEntries[i].Timestamp;
																	var cdate2 = new Date(cdateb2.replace(' ', 'T')).getTime();
										       						var cImgSrc="";
																    if(myCommentEntries[i].picID.length>5){
																       	cImgSrc=myCommentEntries[i].picID;//"http://newtroy.integra-technologies.co.uk/static/images/unknown_user.png" 
																   	}else{
																   		cImgSrc="http://newtroy.integra-technologies.co.uk/static/images/unknown_user.png"; 	
																   	}

																   	var deleteString ="";									   		
									   								if(myCommentEntries[i].SenderID==JSON.parse(localStorage.getItem('userdata')).id){
									   									deleteString = "<a class='ui-btn ui-corner-all btn-only-icon fa fa-remove' style='Color:white; Background-Color:#FF6666; text-shadow: none; position: absolute; margin-right:6px; right:0px; top: 22px;' onClick='removeWallCommentRides("+myCommentEntries[i].ID+");'>"+	"</a>";				 		
									   								}
											       					$("#ulWallHeaderRides").append(
																	    $("<li style='border-color: #D8D8D8 ; border-left:0px; border-right:0px; background-color:#E8E8E8 ; min-height:94px; margin-left:30px'>").append(
																	       		"<div class='commentPicFrameWall' style='margin-top:30px;'>"+
																	       			"<img id='cPicRides"+myCommentEntries[i].ID+"' class='wallpic' src='"+cImgSrc+"'  onClick='openProfilByID("+myCommentEntries[i].SenderID+");'></img>"+
																	       		"</div>"+
																	       		"<h2 style='position: absolute; left:7; top:0;'  onClick='openProfilByID("+myCommentEntries[i].SenderID+");'>"+ myCommentEntries[i].name+"</h2>"+
																	       		"<div id='cTimeDivRides"+myCommentEntries[i].ID+"' style='position: absolute; margin-left:90px; margin-top:24px;'>"+
												       								"<label class='timeGone'>"+timeDifference(cdate1,cdate2)+"</label>"+
												       							"</div>"+
																		       	"<div id='cTextDivRides"+myCommentEntries[i].ID+"' style='margin-top:105px'><div align='justify'>" +	
																		       		"<label style='white-space:normal'>"+myCommentEntries[i].Textinput + "</label>"+
																		       	"</div>"+			//+"."+date2.substring(0,4)								       	
																		       	"<span class='ui-li-count commentDate'>"+ cdate.substring(8,10)+"."+cdate.substring(5,7)+" - "+(myCommentEntries[i].Timestamp).substring(11,16)+  "</span>"
																	       +deleteString
																	)).listview("refresh");

																	cIDs.push(myCommentEntries[i].ID); // for a later realign of the text components acording to the picture size
							       						 
											       				} 
											       			  i++;
															}
											       j++;
											}	
											var x=0;															
											for (;cIDs[x];) {
												realignCommentsRides(cIDs[x]);
												x++;
											}
											var y=0;															
											for (;wIDs[y];) {
												realignEntriesRides(wIDs[y]);
												y++;
											}	
											
										},
									});	
 									
	}