//////////////////////////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////////// 

// realign the wallentries time and text after the profilpicture of the wallentry is loaded
function realignEntries(wID){
	//alert(cID)
	$("#wPic"+wID).one('load', function() {
		//alert(cID + " loaded.")

		var imgHeight = $("#wPic"+wID).height() 
		var textMarginTop = imgHeight+6;	
													       	
		if(imgHeight>10){											       									       						
			$("#wTextDiv"+wID).css({ // place the elements of the wallentry acording to the size of the image     	     			
				"margin-top": textMarginTop+"px"
			});
		}else{
			textMarginTop=86;											       		
			$("#wTextDiv"+wID).css({ // place the elements of the wallentry acording to the size of the image     	   			
				"margin-top": textMarginTop+"px"
			});	
		}
		var imgWidth = $("#wPic"+wID).width() 
		var textMarginLeft = Math.round(imgWidth+10);
													       						//alert(textMarginLeft);
		if(imgWidth>10){											       									       						
			$("#wTimeDiv"+wID).css({ // place the elements of the wallentry acording to the size of the image     	     			
				"margin-left": textMarginLeft+"px"
			});
		}else{
			textMarginLeft=84;											       		
			$("#wTimeDiv"+wID).css({ // place the elements of the wallentry acording to the size of the image     	    			
				"margin-left": textMarginLeft+"px"
			});
		}
												   

	});
}

// realign the comments time and text after the profilpicture of the comment is loaded
function realignComments(cID){
	//alert(cID)
	$("#cPic"+cID).one('load', function() {
		//alert(cID + " loaded.")
		var imgHeight = $("#cPic"+cID).height() 
		var textMarginTop = imgHeight + 26;											       					
		if(imgHeight>10){											       									       						
			$("#cTextDiv"+cID).css({ // place the elements of the wallentry acording to the size of the image     	    			
				 "margin-top": textMarginTop+"px"
			});
		}else{
			textMarginTop=84+26;											       		
			$("#cTextDiv"+cID).css({ // place the elements of the wallentry acording to the size of the image     	     			
				  "margin-top": textMarginTop+"px"
			});
		}

		var imgWidth = $("#cPic"+cID).width() 
		var textMarginLeft = Math.round(imgWidth+10);												       					
		if(imgWidth>10){											       									       						
			$("#cTimeDiv"+cID).css({ /// place the elements of the wallentry acording to the size of the image     	     			
				 "margin-left": textMarginLeft+"px"
			});
		}else{
			textMarginLeft=84;											       		
			$("#cTimeDiv"+cID).css({ // place the elements of the wallentry acording to the size of the image          			
				  "margin-left": textMarginLeft+"px"
			});
		}
	});
}

//Function to Remove an Element by its ID --> Used to remove the editbutton from other peoples profil!
function remove(id)
{
    return (elem=document.getElementById(id)).parentNode.removeChild(elem);
}

//Function to check if a String is empty
function isEmpty(str) {
    return (!str || 0 === str.length);
}

//Function to Change the Profil View ID --> Changes before opening other peoples Profil. 
//Overwriting Specific Data in Localstorage
function setProfilIdtoView(id){
		localStorage.setItem("userdata", JSON.stringify({
			id: JSON.parse(localStorage.getItem('userdata')).id, 
			name: JSON.parse(localStorage.getItem('userdata')).name, 
			email: JSON.parse(localStorage.getItem('userdata')).email, 
			tel: JSON.parse(localStorage.getItem('userdata')).tel, 
			picid: JSON.parse(localStorage.getItem('userdata')).picid, 
			carid: JSON.parse(localStorage.getItem('userdata')).carid,
			descriptionUser: JSON.parse(localStorage.getItem('userdata')).descriptionUser,
			fb_id: JSON.parse(localStorage.getItem('userdata')).fb_id,
			modelName: JSON.parse(localStorage.getItem('userdata')).modelName,
			licensePlate: JSON.parse(localStorage.getItem('userdata')).licensePlate,
			seats: JSON.parse(localStorage.getItem('userdata')).seats,
			constructionYear: JSON.parse(localStorage.getItem('userdata')).constructionYear,
			descriptionCar: JSON.parse(localStorage.getItem('userdata')).descriptionCar,
			colourCar: JSON.parse(localStorage.getItem('userdata')).colourCar,
			carPicID: JSON.parse(localStorage.getItem('userdata')).carPicID,
			viewProfileId: id,
		    viewRideId: JSON.parse(localStorage.getItem('userdata')).viewRideId
		}));
}

//open specific Profil
function openProfilByID(id){
	setProfilIdtoView(id)
	window.location.href="profile.html"
}

//open my own Profil
function openMyProfil(){
	var id = JSON.parse(localStorage.getItem('userdata')).id;
	setProfilIdtoView(id)
	window.location.href="profile.html"
}

//Function needed to give the "Commenty entry popup on the wall" the correct ID of that entry to comment on
function openCommentInput(id)
{
   // alert("kommentiere den eintrag "+id);
   window.commentIDInput=id;
}

//Edit Profil --> send changes to DB
function postProfileChanges() {
	var picurl = $('#picurlInput').val();
	//alert(picurl)
	var nametext = $('#namefieldInput').val();
	var emailtext = $('#emailfieldInput').val();
	var teltext = $('#telfieldInput').val();
	var descriptiontext = $('#userdescriptionInput').val();
	var loginID = JSON.parse(localStorage.getItem('userdata')).id;	

	if(isEmpty(nametext)) {
		alert("Geben Sie bitte Ihren Namen an!");	
		return;
	}	
	if(isEmpty(emailtext)) {
		alert("Geben Sie bitte Ihre korrekte Emailadresse an!");	
		return;
	}

	localStorage.setItem("userdata", JSON.stringify({
		id: JSON.parse(localStorage.getItem('userdata')).id, 
		name: nametext, 
		email: emailtext, 
		tel: teltext, 
		picid: picurl, 
		carid: JSON.parse(localStorage.getItem('userdata')).carid,
		descriptionUser: descriptiontext,
		fb_id: JSON.parse(localStorage.getItem('userdata')).fb_id,
		modelName: JSON.parse(localStorage.getItem('userdata')).modelName,
		licensePlate: JSON.parse(localStorage.getItem('userdata')).licensePlate,
		seats: JSON.parse(localStorage.getItem('userdata')).seats,
		constructionYear: JSON.parse(localStorage.getItem('userdata')).constructionYear,
		descriptionCar: JSON.parse(localStorage.getItem('userdata')).descriptionCar,
		colourCar: JSON.parse(localStorage.getItem('userdata')).colourCar,
		carPicID: JSON.parse(localStorage.getItem('userdata')).carPicID,
		viewProfileId: JSON.parse(localStorage.getItem('userdata')).viewProfileId,
	    viewRideId: JSON.parse(localStorage.getItem('userdata')).viewRideId
	}));

	var postData = {
		'picurl' : picurl,
		'name' : nametext,
		'email' : emailtext,
		'tel' : teltext,
		'description' : descriptiontext,
		'loginID' : loginID
	}
		
	$.ajax({
		type: "GET",
		url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/changeProfile.php",
		data: postData,
		dataType: "jsonp",
		success:	function() {
						//alert(postResult);
						window.location.href="profile.html"
					},
	});
	
}

//Edit Car --> send changes to DB
function postCarChanges() { 
	var carpicurl 			= $('#carpicurlInput').val();
	var carmodeltext 		= $('#carmodelfieldInput').val();
	var carcolortext 		= $('#carcolorfieldInput').val();
	var caryeartext 		= $('#caryearfieldInput').val();
	var carlicenseplatetext = $('#carlicenseplateInput').val();
	var carseatstext 		= $('#carseatsInput').val();
	var cardescriptiontext  = $('#cardescriptionInput').val();
	var loginID = JSON.parse(localStorage.getItem('userdata')).id;
	//Overwriting Specific Data in Localstorage

	if(isEmpty(carmodeltext)) {
		alert("Geben Sie den Modell Namen des Autos an!");	
		return;
	}
	if(isEmpty(carseatstext)) {
		alert("Geben Sie bitte die Anzahl der Sitze an!");	
		return;
	}			

	localStorage.setItem("userdata", JSON.stringify({
		id: JSON.parse(localStorage.getItem('userdata')).id, 
		name: JSON.parse(localStorage.getItem('userdata')).name, 
		email: JSON.parse(localStorage.getItem('userdata')).email, 
		tel: JSON.parse(localStorage.getItem('userdata')).tel, 
		picid: JSON.parse(localStorage.getItem('userdata')).picid, 
		carid: JSON.parse(localStorage.getItem('userdata')).carid,
		descriptionUser: JSON.parse(localStorage.getItem('userdata')).descriptionUser,
		fb_id: JSON.parse(localStorage.getItem('userdata')).fb_id,
		modelName: carmodeltext,
		licensePlate: carlicenseplatetext,
		seats: carseatstext,
		constructionYear: caryeartext,
		descriptionCar: cardescriptiontext,
		colourCar: carcolortext,
		carPicID: carpicurl,
		viewProfileId: JSON.parse(localStorage.getItem('userdata')).viewProfileId,
	    viewRideId: JSON.parse(localStorage.getItem('userdata')).viewRideId
	}));
		
	var postData = {
		'carpicurl' : carpicurl,
		'carmodel' : carmodeltext,
		'loginID' : loginID,
		'carcolor' : carcolortext,
		'caryear' : caryeartext,
		'carseats' : carseatstext,
		'cardescription' : cardescriptiontext,
		'carlicenseplate' : carlicenseplatetext
	}			
	$.ajax({
		type: "GET",
		url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/changeCar.php",
		data: postData,
		dataType: "jsonp",
		success:	function() {
						//alert(postResult);
						window.location.href="car.html"
					},
	});
		
}

//Add new Car if you dont already have one--> send to DB
function postCarAddition() { 

	var carpicurladd		= $('#carpicurlInputAdd').val();
	var carmodeltext 		= $('#carmodelfieldInputAdd').val();
	var carcolortext 		= $('#carcolorfieldInputAdd').val();
	var caryeartext 		= $('#caryearfieldInputAdd').val();
	var carlicenseplatetext = $('#carlicenseplateInputAdd').val();
	var carseatstext 		= $('#carseatsInputAdd').val();
	var cardescriptiontext  = $('#cardescriptionInputAdd').val();
	var loginID = JSON.parse(localStorage.getItem('userdata')).id;
	//Overwriting Specific Data in Localstorage
	if(isEmpty(carmodeltext)) {
		alert("Geben Sie den Modell Namen des Autos an!");	
		return;
	}
	if(isEmpty(carseatstext)) {
		alert("Geben Sie bitte die Anzahl der Sitze an!");	
		return;
	}
	localStorage.setItem("userdata", JSON.stringify({
		id: JSON.parse(localStorage.getItem('userdata')).id, 
		name: JSON.parse(localStorage.getItem('userdata')).name, 
		email: JSON.parse(localStorage.getItem('userdata')).email, 
		tel: JSON.parse(localStorage.getItem('userdata')).tel, 
		picid: JSON.parse(localStorage.getItem('userdata')).picid, 
		carid: JSON.parse(localStorage.getItem('userdata')).id,
		descriptionUser: JSON.parse(localStorage.getItem('userdata')).descriptionUser,
		fb_id: JSON.parse(localStorage.getItem('userdata')).fb_id,
		modelName: carmodeltext,
		licensePlate: carlicenseplatetext,
		seats: carseatstext,
		constructionYear: caryeartext,
		descriptionCar: cardescriptiontext,
		colourCar: carcolortext,
		carPicID: carpicurladd,
		viewProfileId: JSON.parse(localStorage.getItem('userdata')).viewProfileId,
	    viewRideId: JSON.parse(localStorage.getItem('userdata')).viewRideId
	}));
		
	var postData = {
		'carpicurladd' : carpicurladd,
		'carmodel' : carmodeltext,
		'loginID' : loginID,
		'carcolor' : carcolortext,
		'caryear' : caryeartext,
		'carseats' : carseatstext,
		'cardescription' : cardescriptiontext,
		'carlicenseplate' : carlicenseplatetext
	}

	$.ajax({
		type: "GET",
		url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/addCar.php",
		data: postData,
		dataType: "jsonp",
		success:	function() {
						//alert(postResult);
						window.location.href="car.html"
					},
	});
	
}

//Post an Entry to the Profils Wall
function postTW() {
	var text = $('#postText').val();
	document.getElementById('postText').value ="";
	var loginID = JSON.parse(localStorage.getItem('userdata')).id;	
	var viewProfileID = JSON.parse(localStorage.getItem('userdata')).viewProfileId;	
	if(text.length==0) {
		alert("Leere Nachrichten werden nicht verschickt. Geben Sie mindestens 1 Zeichen ein!");	
	}else{	
		var postData = {
			'text' : text,
			'loginID' : loginID,
			'viewProfileID' : viewProfileID
		}
			
		$.ajax({
			type: "GET",
			url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/postToWall.php",
			data: postData,
			dataType: "jsonp",
			success:	function() {
							//alert(postResult);
							window.location.href=window.location.href
						},
		});
	}
}

//Post a Comment on an Entry to the Profils Wall (aka Pinnwand)
function postCO() {
	 //alert("kommentiere den eintrag "+window.commentIDInput);
	var text = $('#commentTextToPost').val();
	document.getElementById('commentTextToPost').value ="";
	var loginID = JSON.parse(localStorage.getItem('userdata')).id;	
	var viewProfileID = JSON.parse(localStorage.getItem('userdata')).viewProfileId;	
	if(text.length==0) {
		alert("Leere Kommentare werden nicht verschickt. Geben Sie mindestens 1 Zeichen ein!");	
		$( "#popupComment" ).popup( "close" );

	}else{	
		var postData = {
			'text' : text,
			'loginID' : loginID,
			'viewProfileID' : viewProfileID,
			'wallID': window.commentIDInput
		}
			$( "#popupComment" ).popup( "close" );
		$.ajax({
			type: "GET",
			url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/postComment.php",
			data: postData,
			dataType: "jsonp",
			success:	function() {
							//alert(postResult);
							
							window.location.href="profile.html"//window.location.href
						},
		});
	}
}

//remove Comment
function removeWallComment(commentid){
	var postData = {
			'commentID' : commentid
	}
		//alert(postData.commentID)
	if (confirm("Sicher, dass sie den Kommentar Nr. "+postData.commentID+ " löschen wollen?")) {
		$.ajax({
			type: "GET",
			url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/removeComment.php",
			data: postData,
			dataType: "jsonp",
			success:	function() {							
							window.location.href="profile.html"//window.location.href
						},
		});
	}
}

//remove Wallentry
function removeWallEntry(wallid){
	var postData = {
		'wallID' : wallid
	}
	//alert(postData.wallID)
	if (confirm("Sicher, dass sie den PinnwandEintrag Nr. "+postData.wallID+ " und alle damit verbundenen Kommentare löschen wollen?")) {
		$.ajax({
			type: "GET",
			url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/removeEntry.php",
			data: postData,
			dataType: "jsonp",
			success:	function() {							
							window.location.href="profile.html"//window.location.href
						},
		});
	}
}
//Calculate the Time that has passed since the entry on the Wall (aka Pinnwand) was created
function timeDifference(date1,date2) {
        var difference = date1 - (date2)+10000;//-7200000
        var daysDifference = Math.floor(difference/1000/60/60/24);
        difference -= daysDifference*1000*60*60*24
        var hoursDifference = Math.floor(difference/1000/60/60);
        difference -= hoursDifference*1000*60*60
        var minutesDifference = Math.floor(difference/1000/60);
        difference -= minutesDifference*1000*60
        var secondsDifference = Math.floor(difference/1000);

        if(daysDifference>0){
        	if(daysDifference==1){return "vor "+daysDifference+ " Tag";}
        	return "vor "+daysDifference+ " Tagen";
        }
        if(hoursDifference>0){
        	if(hoursDifference==1){return "vor "+hoursDifference+" Stunde";}
        	return "vor "+hoursDifference+" Stunden";
        }
        if(minutesDifference>0){
        	if(minutesDifference==1){return "vor "+minutesDifference+ " Minute";}
        	return "vor "+minutesDifference+ " Minuten";
        }
        if(secondsDifference>0){
        	return "vor "+secondsDifference + " Sekunden";
        }
    	var answer = 'vor ' + daysDifference + ' Tagen ' + hoursDifference + ' Stunden ' + minutesDifference + ' Minuten ' + secondsDifference + ' Sekunden ';
    	return answer;
     }

//Load the Entries on the Wall and combine them with the correct Comments!
function lookintoWall(myCommentEntries){
		var userLoggedInDataloginID = JSON.parse(localStorage.getItem('userdata')).id;
		var myWallEntries;
	
		var userLoggedInData = {
			//'loginName' : userLoggedInDataloginName,
			'loginID' : userLoggedInDataloginID
		}
		var viewProfileID = JSON.parse(localStorage.getItem('userdata')).viewProfileId;

		var viewProfileData = {
			'viewProfileID' : viewProfileID
		}


		$.ajax({
			type: "GET",
			url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/wall.php",
			data: viewProfileData,
			dataType: "jsonp",			
			success:	function(wallentries) {	

				var i = 0;
				myWallEntries=wallentries;
				var j = 0;
				var cIDs = [];
				var wIDs = [];
				for (;myWallEntries[j];) {		        // Create the list item:
				        var date = (myWallEntries[j].Timestamp).substring(0,11);	
				        var date1=new Date().getTime()- (new Date().getTimezoneOffset() * 60000);										       
						var dateb2= myWallEntries[j].Timestamp;
						var date2 = new Date(dateb2.replace(' ', 'T')).getTime();
				     
				       $("#ulWallHeader").append(
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
				   		if(myWallEntries[j].SenderID==JSON.parse(localStorage.getItem('userdata')).id  | JSON.parse(localStorage.getItem('userdata')).id===JSON.parse(localStorage.getItem('userdata')).viewProfileId){
				   			deleteString = "<a class='ui-btn ui-corner-all btn-only-icon fa fa-remove' style='Color:white; Background-Color:#FF6666; text-shadow: none; position: absolute; margin-right:6px; right:0px; top: -2px;' onClick='removeWallEntry("+myWallEntries[j].ID+");'>"+	"</a>";				 		
				   			einrueckPixel=50;
				   		}
				       $("#ulWallHeader").append(
				       	$("<li style='min-height:66px'>").append(
					       	"<div class='commentPicFrameWall'>"+
					       		"<img id='wPic"+myWallEntries[j].ID+"' class='wallpic' src='"+wImgSrc+"' onClick='openProfilByID("+myWallEntries[j].SenderID+");'></img>"+
					       	"</div>"+
					       	"<div id='wTimeDiv"+myWallEntries[j].ID+"' style='position: absolute; margin-left:90px; margin-top:4px'>"+
					       		"<label class='timeGone'>"+timeDifference(date1,date2)+"</label>"+
					       	"</div>"+
							"<div id='wTextDiv"+myWallEntries[j].ID+"' style='margin-top:75px' align='justify'>"+
																																		       		
					       	 		"<label style='white-space:normal'>" + 
					       	 			myWallEntries[j].Textinput + 												       	 			
					       	 		"</label>"+	
					       	 		"<a href='#popupComment' data-rel='popup' data-position-to='window' class='ui-btn ui-corner-all btn-only-icon fa fa-comment' data-transition='pop' style='Color:white; Background-Color:#6d88b7; text-shadow: none; position: absolute; margin-right:6px; right:"+einrueckPixel+"px; top: -2px;' onClick='openCommentInput("+myWallEntries[j].ID+");'>"+	
					       	 		 ""+//"ID:"+myWallEntries[j].ID+
					       	 		"</a>"+
					       	 			deleteString+								       		
					       	"</div>"

				       	)).listview("refresh");


						wIDs.push(myWallEntries[j].ID);// for a later realign of the text components acording to the picture size
			
							i=0;	
							
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
									   		if(myCommentEntries[i].SenderID==JSON.parse(localStorage.getItem('userdata')).id | JSON.parse(localStorage.getItem('userdata')).id===JSON.parse(localStorage.getItem('userdata')).viewProfileId){
									   			deleteString = "<a class='ui-btn ui-corner-all btn-only-icon fa fa-remove' style='Color:white; Background-Color:#FF6666; text-shadow: none; position: absolute; margin-right:6px; right:0px; top: 22px;' onClick='removeWallComment("+myCommentEntries[i].ID+");'>"+	"</a>";				 		
									   		}
				       						$("#ulWallHeader").append(
										       	$("<li style='border-color: #D8D8D8 ; border-left:0px; border-right:0px; background-color:#E8E8E8 ; min-height:94px; margin-left:30px'>").append(
										       		"<div class='commentPicFrameWall' style='margin-top:30px;'>"+
										       			"<img id='cPic"+myCommentEntries[i].ID+"' class='wallpic' src='"+cImgSrc+"'  onClick='openProfilByID("+myCommentEntries[i].SenderID+");'></img>"+
										       		"</div>"+
										       		"<h2 style='position: absolute; left:7; top:0;' onClick='openProfilByID("+myCommentEntries[i].SenderID+");'>"+ myCommentEntries[i].name+"</h2>"+
										       		"<div id='cTimeDiv"+myCommentEntries[i].ID+"' style='position: absolute; margin-left:90px; margin-top:24px;'>"+
					       								"<label class='timeGone'>"+timeDifference(cdate1,cdate2)+"</label>"+
					       							"</div>"+
											       	"<div id='cTextDiv"+myCommentEntries[i].ID+"' style='margin-top:105px'><div align='justify'>" +	
											       		"<label style='white-space:normal'>"+myCommentEntries[i].Textinput + "</label>"+
											       	"</div>"+			//+"."+date2.substring(0,4)								       	
											       	"<span class='ui-li-count commentDate'>"+ cdate.substring(8,10)+"."+cdate.substring(5,7)+" - "+(myCommentEntries[i].Timestamp).substring(11,16)+  "</span>"
										       		+deleteString
											       )).listview("refresh");
											

											
											cIDs.push(myCommentEntries[i].ID);// for a later realign of the text components acording to the picture size
																				       						 
				       				} 
				       			  i++;
								}
				       j++;
				}	

				//alert(cIDs)	
				//alert(wIDs)
				var x=0;															
				for (;cIDs[x];) {
					realignComments(cIDs[x]);
					x++;
				}
				var y=0;															
				for (;wIDs[y];) {
					realignEntries(wIDs[y]);
					y++;
				}
			},
		});	

 									
	}


  //Code Executed when the Profil.html is opened
 //+++++++++++++++++++++++++++/////////////////////////////////////////PROFILE.HTML///////////////////////////////////////////+++++++++++++++++++++++++++++//
  $(document).on('pageinit', '#profile', function(){   	
 		////////////////////////////////////////AUTO RESIZE IMAGE///////////////////////////////////////////////
		if($(window).width()<430){
			 $("#profile_block_a").css({ // resize the image     			
	     			'width': 'calc(98%)'
			   	});
			   	$("#profile_block_b").css({ // resize the image     			
	     			'width': 'calc(100%)'
			   	});
		}
		 else {
			   $("#profile_block_a").css({ // resize the image     			
	     			'width': 'calc(38%)'
			   	});
			   $("#profile_block_b").css({ // resize the image     			
	     			'width': 'calc(60%)'
			   	});
			}
		////////////////////////////////////////FILL PROFILE DATA///////////////////////////////////////////////
		var userLoggedInDataloginID = JSON.parse(localStorage.getItem('userdata')).id;
		var viewProfileID = JSON.parse(localStorage.getItem('userdata')).viewProfileId;
		var userLoggedInData = {
			//'loginName' : userLoggedInDataloginName,
			'loginID' : userLoggedInDataloginID
		}
		var viewProfileData = {
			'viewProfileID' : viewProfileID
		}

		//check if its my own profil i want to visit
		if(userLoggedInDataloginID==viewProfileID){
			//if it is my own profil than load from localstorage			
			var emailDB = JSON.parse(localStorage.getItem('userdata')).email;
			if(isEmpty(emailDB)){emailDB="/";}
			var telnumberDB = JSON.parse(localStorage.getItem('userdata')).tel;
			if(isEmpty(telnumberDB)){telnumberDB="/";}
			var carnameDB = JSON.parse(localStorage.getItem('userdata')).modelName;
			if(isEmpty(carnameDB)){carnameDB="AUTO ANLEGEN";document.getElementById("carLink").href = "carAddNew.html";}
			var descriptiontextDB = JSON.parse(localStorage.getItem('userdata')).descriptionUser;
			if(isEmpty(descriptiontextDB)){descriptiontextDB="/";}

			var myDiv1 = document.getElementById("namefield");
		 	myDiv1.innerHTML = JSON.parse(localStorage.getItem('userdata')).name;	       				   
			var myDiv2 = document.getElementById("emailfield");
			myDiv2.innerHTML = emailDB;							        
			var myDiv3 = document.getElementById("telfield");							        							    	
			myDiv3.innerHTML = telnumberDB;
			var myDiv4 = document.getElementById("carfield");
			myDiv4.innerHTML = carnameDB;	
			var myDiv5 = document.getElementById("userdescription");							       
			myDiv5.innerHTML = "<h3>Beschreibung</h3>" + descriptiontextDB;								       	

			if(JSON.parse(localStorage.getItem('userdata')).picid.length>5){
				document.getElementById("profile_picture").src=JSON.parse(localStorage.getItem('userdata')).picid;
			}

	        document.getElementById("profilTitle").innerHTML="Mein Profil"

	    }else{
	    	//if it is not my own Profil, then load the Profildata like name from db etc.
	    	remove("editButton");	    	
	    	$.ajax({
				type: "GET",
				url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/viewProfile.php",
				data: viewProfileData,
				dataType: "jsonp",			
				success:	function(viewProfileResult) {	
						
						var emailDB=viewProfileResult.email;
						if(isEmpty(emailDB)){emailDB="/";}
						var telnumberDB = viewProfileResult.tel;
						if(isEmpty(telnumberDB)){telnumberDB="/";}
						var carnameDB=viewProfileResult.modelName;
						if(isEmpty(carnameDB)){carnameDB="Kein Auto angegeben.";}
						var descriptiontextDB = viewProfileResult.descriptionUser;
						if(isEmpty(descriptiontextDB)){descriptiontextDB="/";}

						var myDiv1 = document.getElementById("namefield");
				        myDiv1.innerHTML = viewProfileResult.name;	       				   
				        var myDiv2 = document.getElementById("emailfield");
				        myDiv2.innerHTML = emailDB;							        
				        var myDiv3 = document.getElementById("telfield");							        							    	
				        myDiv3.innerHTML = telnumberDB;
				        var myDiv4 = document.getElementById("carfield");
				       	myDiv4.innerHTML = carnameDB;	
				        var myDiv5 = document.getElementById("userdescription");							       
				        myDiv5.innerHTML = "<h3>Beschreibung</h3>" + descriptiontextDB;								       	

				        if(viewProfileResult.picID.length>5){
				        	document.getElementById("profile_picture").src=viewProfileResult.picID;
				    	}
				},
			});	
	    }

 		//////////////////////////////CONNECT TO DB TO GET THE WALL / "PINNWAND EINTRAEGE"////////////////////////
		var myWallEntries;
		var myCommentEntries;				
			$.ajax({
				type: "GET",
				url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/comments.php",
				data: viewProfileData,
				dataType: "jsonp",			
				success:	function(commententries) {									
						myCommentEntries=commententries;
						lookintoWall(myCommentEntries);
						
				},
				error:	function() {					
						myCommentEntries={'ID':0, 'WallID':0, 'ReceiverID':0, 'SenderID':0, 'Textinput':0, 'Timestamp':0, 'name':0} //give empty commentlist into function to avoid errors
						lookintoWall(myCommentEntries);
						
				},
			});	
							
		///////////////////////////////////////////ON_CLICK EVENTS - Resize the Profilpicture///////////////////////////////////////////////
		$("#profile_picture").on("click", function(e1) {
			var bodywidth = $(window).width();//document.getElementById("description").offsetWidth
			if(bodywidth>800){bodywidth=800}
			if(e1.handled !== true) // This will prevent event triggering more then once
        	{        	
				if (document.getElementById("profile_block_a").offsetWidth<(bodywidth/100)*80) {
				    $("#profile_block_a").css({ // resize the image     			
		     			'width': 'calc(98%)'
				   	});
				   	$("#profile_block_b").css({ // resize the image     			
		     			'width': 'calc(100%)'
				   	});
				} else {
				   $("#profile_block_a").css({ // resize the image     			
		     			'width': 'calc(38%)'
				   	});
				   $("#profile_block_b").css({ // resize the image     			
		     			'width': 'calc(60%)'
				   	});
				}
			e1.handled = true;
        	}
		});
		$("#profile_picture_label").on("click", function(e2) {
			var bodywidth = $(window).width();//document.getElementById("description").offsetWidth
			if(bodywidth>800){bodywidth=800}	
			if(e2.handled !== true) // This will prevent event triggering more then once
        	{        		
				if (document.getElementById("profile_block_a").offsetWidth<(bodywidth/100)*80) {
				    $("#profile_block_a").css({ // resize the image     			
		     			'width': 'calc(98%)'
				   	});
				   	$("#profile_block_b").css({ // resize the image     			
		     			'width': 'calc(100%)'
				   	});
				} else {
				   $("#profile_block_a").css({ // resize the image     			
		     			'width': 'calc(38%)'
				   	});
				   $("#profile_block_b").css({ // resize the image     			
		     			'width': 'calc(60%)'
				   	});
				}
			e2.handled = true;
        	}
		});

});

//Code executed when opening car.html
//+++++++++++++++++++++++++++++++////////////////////////////////////////CAR.HTML/////////////////////////////////////////////++++++++++++++++++++++++++++++//
$(document).on('pageinit', '#car', function() {	
		
		////////////////////////////////////////AUTO RESIZE IMAGE///////////////////////////////////////////////
		if($(window).width()<430){
				$("#car_block_a").css({ // resize the image     			
	     			'width': 'calc(98%)'
			   	});
			   	$("#car_block_b").css({ // resize the image     			
	     			'width': 'calc(100%)'
			   	});
		} else {
			   $("#car_block_a").css({ // resize the image     			
	     			'width': 'calc(38%)'
			   	});
			   $("#car_block_b").css({ // resize the image     			
	     			'width': 'calc(60%)'
			   	});
		}
		///////////////////////////////////////Paste Car Content//////////////////////////////////////////////////////////////////

		var userLoggedInDataloginID = JSON.parse(localStorage.getItem('userdata')).id;
		var viewProfileID = JSON.parse(localStorage.getItem('userdata')).viewProfileId;
		var userLoggedInData = {
			//'loginName' : userLoggedInDataloginName,
			'loginID' : userLoggedInDataloginID
		}
		var viewProfileData = {
			'viewProfileID' : viewProfileID
		}
		//check if its my own profil i want to visit			
		if(userLoggedInDataloginID===viewProfileID){
			//if it is my own profil than load from localstorage

			var carname = JSON.parse(localStorage.getItem('userdata')).modelName;

			if(isEmpty(carname)){
				var myDiv1 = document.getElementById("carmodelfield");
		    	myDiv1.innerHTML = "Kein Auto angegeben.";
		   	    var myDiv2 = document.getElementById("caryearfield");
				myDiv2.innerHTML = "/";	
				var myDiv3 = document.getElementById("carlicenseplate");
				myDiv3.innerHTML = "/";	
				var myDiv4 = document.getElementById("carseats");
				myDiv4.innerHTML = "/";	
				var myDiv5= document.getElementById("carnamefield");
				myDiv5.innerHTML = JSON.parse(localStorage.getItem('userdata')).name;
				var myDiv6 = document.getElementById("cardescription");
				myDiv6.innerHTML = "<h3>Beschreibung</h3>" + "/";	
		    }else{
				var myDiv1 = document.getElementById("carmodelfield");
		        myDiv1.innerHTML = JSON.parse(localStorage.getItem('userdata')).modelName +  " ("+JSON.parse(localStorage.getItem('userdata')).colourCar+")";
		        var myDiv2 = document.getElementById("caryearfield");
		        myDiv2.innerHTML = "Baujahr " + JSON.parse(localStorage.getItem('userdata')).constructionYear;
		        var myDiv3 = document.getElementById("carlicenseplate");
		        myDiv3.innerHTML = JSON.parse(localStorage.getItem('userdata')).licensePlate;
		        var myDiv4 = document.getElementById("carseats");
		        myDiv4.innerHTML = JSON.parse(localStorage.getItem('userdata')).seats + " Sitze";
		        var myDiv5= document.getElementById("carnamefield");
		        myDiv5.innerHTML = JSON.parse(localStorage.getItem('userdata')).name;
		        var myDiv6 = document.getElementById("cardescription");	        
		        myDiv6.innerHTML = "<h3>Beschreibung</h3>" + JSON.parse(localStorage.getItem('userdata')).descriptionCar;
		        if(JSON.parse(localStorage.getItem('userdata')).carPicID.length>5){
					document.getElementById("car_picture").src=JSON.parse(localStorage.getItem('userdata')).carPicID;
				}
	    		    		
	    	}

			
	    }else{
	    	remove("editButton");
	    	$.ajax({
							type: "GET",
							url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/viewProfile.php",
							data: viewProfileData,
							dataType: "jsonp",			
							success:	function(viewProfileResult) {									
									
									var carmodelDB = viewProfileResult.modelName;
									if(isEmpty(carmodelDB)){
										carmodelDB = "Kein Auto angegeben.";					
									}else{
										carmodelDB = carmodelDB +  " ("+viewProfileResult.colourCar+")";	 
									}
									var caryearDB = viewProfileResult.constructionYear;
									if(isEmpty(caryearDB)){
										caryearDB = "/";					
									}else{
										caryearDB = "Baujahr " + caryearDB;
									}
									var carlicenseDB = viewProfileResult.licensePlate;
									if(isEmpty(carlicenseDB)){
										carlicenseDB = "/";					
									}
									var carseatsDB = viewProfileResult.seats;
									if(isEmpty(carseatsDB)){
										carseatsDB = "/";					
									}
									var carnamefieldDB = viewProfileResult.name;
									if(isEmpty(carnamefieldDB)){
										carnamefieldDB = "/";					
									}
									var cardescriptionDB = viewProfileResult.descriptionCar;
									if(isEmpty(cardescriptionDB)){
										cardescriptionDB = "/";					
									}															
								    var myDiv1 = document.getElementById("carmodelfield");
								    myDiv1.innerHTML = carmodelDB;	
								    var myDiv2 = document.getElementById("caryearfield");
								    myDiv2.innerHTML = caryearDB;	
								    var myDiv3 = document.getElementById("carlicenseplate");
								    myDiv3.innerHTML = carlicenseDB;	
								    var myDiv4 = document.getElementById("carseats");
								    myDiv4.innerHTML = carseatsDB;	 + " Sitze";
								    var myDiv5= document.getElementById("carnamefield");
								    myDiv5.innerHTML = carnamefieldDB;	
								    var myDiv6 = document.getElementById("cardescription");
								    myDiv6.innerHTML = "<h3>Beschreibung</h3>" + cardescriptionDB;	

									if(viewProfileResult.carPicID.length>5){
								       	document.getElementById("car_picture").src=viewProfileResult.carPicID;
								    }	

							},
				});	
	    }
		///////////////////////////////////////////ON_CLICK EVENTS - resize car picture ///////////////////////////////////////////////
		$("#car_picture").on("click", function(e3) {
			var bodywidth = $(window).width();//document.getElementById("description").offsetWidth
			if(bodywidth>800){bodywidth=800}
			if(e3.handled !== true) // This will prevent event triggering more then once
        	{			
			//alert('body '+ (bodywidth/100)*70 +' -> img '+ document.getElementById("car_block_a").offsetWidth);				
				if (document.getElementById("car_block_a").offsetWidth<(bodywidth/100)*80) {
				    $("#car_block_a").css({ // resize the image     			
		     			'width': 'calc(98%)'
				   	});
				   	$("#car_block_b").css({ // resize the image     			
		     			'width': 'calc(100%)'
				   	});
				} else {
				   $("#car_block_a").css({ // resize the image     			
		     			'width': 'calc(38%)'
				   	});
				   $("#car_block_b").css({ // resize the image     			
		     			'width': 'calc(60%)'
				   	});
				}
			e3.handled = true;
        	}
		});
		$("#car_picture_label").on("click", function(e4) {
			var bodywidth = $(window).width();//document.getElementById("description").offsetWidth
			if(bodywidth>800){bodywidth=800}
			//alert('body 80% = '+ (bodywidth/100)*80 +' -> img '+ document.getElementById("car_block_a").offsetWidth);
			if(e4.handled !== true) // This will prevent event triggering more then once
        	{        	
				if (document.getElementById("car_block_a").offsetWidth<(bodywidth/100)*80) {
				    $("#car_block_a").css({ // resize the image     			
		     			'width': 'calc(98%)'
				   	});
				   	$("#car_block_b").css({ // resize the image     			
		     			'width': 'calc(100%)'
				   	});
				} else {
				   $("#car_block_a").css({ // resize the image     			
		     			'width': 'calc(38%)'
				   	});
				   $("#car_block_b").css({ // resize the image     			
		     			'width': 'calc(60%)'
				   	});
				}
			e4.handled = true;
        	}
		});
});

//
 //+++++++++++++++++++++++++++/////////////////////////////////////////PROFILEEDIT.HTML///////////////////////////////////////////+++++++++++++++++++++++++++++//
    $(document).on('pageinit', '#profileEdit', function(){  	 	
			////////////////////////////////////////FILL PROFILE DATA///////////////////////////////////////////////
			var myDiv0 = document.getElementById("picurlInput");
	        myDiv0.value = JSON.parse(localStorage.getItem('userdata')).picid;
			var myDiv1 = document.getElementById("namefieldInput");
	        myDiv1.value = JSON.parse(localStorage.getItem('userdata')).name;	       				   
	        var myDiv2 = document.getElementById("emailfieldInput");
	        myDiv2.value = JSON.parse(localStorage.getItem('userdata')).email;	       				    
	        var myDiv3 = document.getElementById("telfieldInput");
	        myDiv3.value = JSON.parse(localStorage.getItem('userdata')).tel;	       				    
	        var myDiv5 = document.getElementById("userdescriptionInput");
	        myDiv5.value = JSON.parse(localStorage.getItem('userdata')).descriptionUser;	  
	});	

//
//+++++++++++++++++++++++++++/////////////////////////////////////////CAREDIT.HTML///////////////////////////////////////////+++++++++++++++++++++++++++++//
    $(document).on('pageinit', '#carEdit', function(){   	
		////////////////////////////////////////FILL PROFILE DATA///////////////////////////////////////////////
		var myDiv0 = document.getElementById("carpicurlInput");
	    myDiv0.value = JSON.parse(localStorage.getItem('userdata')).carPicID;
		var myDiv1 = document.getElementById("carmodelfieldInput");
        myDiv1.value = JSON.parse(localStorage.getItem('userdata')).modelName; //+  " (
        var myDiv2 = document.getElementById("caryearfieldInput");
        myDiv2.value = JSON.parse(localStorage.getItem('userdata')).constructionYear;
        var myDiv3 = document.getElementById("carlicenseplateInput");
        myDiv3.value = JSON.parse(localStorage.getItem('userdata')).licensePlate;
        var myDiv4 = document.getElementById("carseatsInput");
        myDiv4.value = JSON.parse(localStorage.getItem('userdata')).seats;
		var myDiv5 = document.getElementById("carcolorfieldInput");
		myDiv5.value = JSON.parse(localStorage.getItem('userdata')).colourCar
        var myDiv6 = document.getElementById("cardescriptionInput");
        myDiv6.value = JSON.parse(localStorage.getItem('userdata')).descriptionCar;		
	});	
