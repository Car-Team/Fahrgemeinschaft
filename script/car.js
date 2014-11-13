//////////////////////////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////////// 
function remove(id)
{
    return (elem=document.getElementById(id)).parentNode.removeChild(elem);
}


function isEmpty(str) {
    return (!str || 0 === str.length);
}
//
//
//
//
//
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
							    viewRideId: JSON.parse(localStorage.getItem('userdata')).viewRideId}));
}



//
//
//
//
//


function openProfil(){
	var id = $('#viewProfilIDInput').val();
	setProfilIdtoView(id)
	window.location.href="profile.html"
}

function openProfilByID(id){
	setProfilIdtoView(id)
	window.location.href="profile.html"
}

function openMyProfil(){
	var id = JSON.parse(localStorage.getItem('userdata')).id;
	setProfilIdtoView(id)
	window.location.href="profile.html"
}
//
//
//
//
//

function openCommentInput(id)
{
   // alert("kommentiere den eintrag "+id);
   window.commentIDInput=id;
}





function postProfileChanges() {
	var nametext = $('#namefieldInput').val();
	var emailtext = $('#emailfieldInput').val();
	var teltext = $('#telfieldInput').val();
	var descriptiontext = $('#userdescriptionInput').val();
	var loginID = JSON.parse(localStorage.getItem('userdata')).id;	

	localStorage.setItem("userdata", JSON.stringify({
								id: JSON.parse(localStorage.getItem('userdata')).id, 
								name: nametext, 
								email: emailtext, 
								tel: teltext, 
								picid: JSON.parse(localStorage.getItem('userdata')).picid, 
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
							    viewRideId: JSON.parse(localStorage.getItem('userdata')).viewRideId}));

	if(nametext.length==0) {
		alert("JUNGE, gib wenigstens 1 Gottverdammtes Zeichen ein!");	
	}else{	
		var postData = {
			'name' : nametext,
			'email' : emailtext,
			'tel' : teltext,
			'description' : descriptiontext,
			'loginID' : loginID,
		}
			
		$.ajax({
			type: "GET",
			url: "http://87.230.14.183/changeProfile.php",
			data: postData,
			success:	function(postResult) {
							//alert(postResult);
							window.location.href="profile.html"
						},
		});
	}
}

//
//
//
//
//
function postCarChanges() { 
	var carmodeltext 		= $('#carmodelfieldInput').val();
	var carcolortext 		= $('#carcolorfieldInput').val();
	var caryeartext 		= $('#caryearfieldInput').val();
	var carlicenseplatetext = $('#carlicenseplateInput').val();
	var carseatstext 		= $('#carseatsInput').val();
	var cardescriptiontext  = $('#cardescriptionInput').val();
	var loginID = JSON.parse(localStorage.getItem('userdata')).id;

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
								carPicID: JSON.parse(localStorage.getItem('userdata')).carPicID,
								viewProfileId: JSON.parse(localStorage.getItem('userdata')).viewProfileId,
							    viewRideId: JSON.parse(localStorage.getItem('userdata')).viewRideId}));
		
		var postData = {
			'carmodel' : carmodeltext,
			'loginID' : loginID,
			'carcolor' : carcolortext,
			'caryear' : caryeartext,
			'carseats' : carseatstext,
			'cardescription' : cardescriptiontext,
			'carlicenseplate' : carlicenseplatetext,
		}	
				
		$.ajax({
			type: "GET",
			url: "http://87.230.14.183/changeCar.php",
			data: postData,
			success:	function(postResult) {
							//alert(postResult);
							window.location.href="car.html"
						},
		});
	window.location.href="car.html"
}
//
//
//
//
//
function postCarAddition() { 

	var carmodeltext 		= $('#carmodelfieldInputAdd').val();
	var carcolortext 		= $('#carcolorfieldInputAdd').val();
	var caryeartext 		= $('#caryearfieldInputAdd').val();
	var carlicenseplatetext = $('#carlicenseplateInputAdd').val();
	var carseatstext 		= $('#carseatsInputAdd').val();
	var cardescriptiontext  = $('#cardescriptionInputAdd').val();
	var loginID = JSON.parse(localStorage.getItem('userdata')).id;

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
								carPicID: "0",
								viewProfileId: JSON.parse(localStorage.getItem('userdata')).viewProfileId,
							    viewRideId: JSON.parse(localStorage.getItem('userdata')).viewRideId}));
		
		var postData = {
			'carmodel' : carmodeltext,
			'loginID' : loginID,
			'carcolor' : carcolortext,
			'caryear' : caryeartext,
			'carseats' : carseatstext,
			'cardescription' : cardescriptiontext,
			'carlicenseplate' : carlicenseplatetext,
		}			
		$.ajax({
			type: "GET",
			url: "http://87.230.14.183/addCar.php",
			data: postData,
			success:	function(postResult) {
							//alert(postResult);
							window.location.href="car.html"
						},
		});
	
}
//
//
//
//
//
function postTW() {
	var text = $('#postText').val();
	document.getElementById('postText').value ="";
	var loginID = JSON.parse(localStorage.getItem('userdata')).id;	
	var viewProfileID = JSON.parse(localStorage.getItem('userdata')).viewProfileId;	
	if(text.length==0) {
		alert("JUNGE, gib wenigstens 1 Gottverdammtes Zeichen ein!");	
	}else{	
		var postData = {
			'text' : text,
			'loginID' : loginID,
			'viewProfileID' : viewProfileID
		}
			
		$.ajax({
			type: "GET",
			url: "http://87.230.14.183/postToWall.php",
			data: postData,
			success:	function(postResult) {
							//alert(postResult);
							window.location.href=window.location.href
						},
		});
	}
}
//
//
//
//
//
function postCO() {
	 //alert("kommentiere den eintrag "+window.commentIDInput);
	var text = $('#commentTextToPost').val();
	document.getElementById('commentTextToPost').value ="";
	var loginID = JSON.parse(localStorage.getItem('userdata')).id;	
	var viewProfileID = JSON.parse(localStorage.getItem('userdata')).viewProfileId;	
	if(text.length==0) {
		alert("JUNGE, gib wenigstens 1 Gottverdammtes Zeichen ein!");	
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
			url: "http://87.230.14.183/postComment.php",
			data: postData,
			success:	function(postResult) {
							//alert(postResult);
							
							window.location.href="profile.html"//window.location.href
						},
		});
	}
}

//
//
//
//
//
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

//
//
//
//
//
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
										url: "http://87.230.14.183/wall.php",
										data: viewProfileData,
										dataType: "jsonp",			
										success:	function(wallentries) {	
											var i = 0;
											myWallEntries=wallentries;
											var j = 0;
											for (;myWallEntries[j];) {		        // Create the list item:


											        var date = (myWallEntries[j].Timestamp).substring(0,11);		

											        var date1=new Date().getTime()- (new Date().getTimezoneOffset() * 60000);										       
													var dateb2= myWallEntries[j].Timestamp;
													var date2 = new Date(dateb2.replace(' ', 'T')).getTime();
											        //alert(date2+"\n"+date1);
											     
											       $("#ulWallHeader").append(
											      	$("<li data-role='list-divider' style='font-size:1.1em'  onClick='openProfilByID("+myWallEntries[j].SenderID+");'>").append(			//+"."+date.substring(0,4)	      		
											       	 myWallEntries[j].name+"<span class='ui-li-count'>"+date.substring(8,10)+"."+date.substring(5,7)+" - "+(myWallEntries[j].Timestamp).substring(11,16)+"</span>" //myWallEntries.length+
											       )).listview("refresh");

											       //var wImgSrc="http://images.fotocommunity.de/bilder/natur/tiere/pfau-hochformat-357029dc-d282-4a87-a9d3-01e9ec2600e8.jpg" 
											       //var wImgSrc="http://st.depositphotos.com/1003368/1944/i/950/depositphotos_19448249-business-woman-in-glasses.jpg";
											       //var wImgSrc ="http://us.123rf.com/400wm/400/400/malopes/malopes0901/malopes090100089/4185805-schone-fr-hling-landschaft-mit-gras-und-sky--hochformat.jpg"
											       var wImgSrc="";
											       if(myWallEntries[j].picID.length>5){
											       	wImgSrc=myWallEntries[j].picID;//"http://newtroy.integra-technologies.co.uk/static/images/unknown_user.png" 
											   		}else{
											   		wImgSrc="http://newtroy.integra-technologies.co.uk/static/images/unknown_user.png"; 	
											   		}
											       //var wImgSrc="http://us.cdn282.fansshare.com/photos/kateupton/kate-upton-terry-richardson-outtakes-jpeg-model-302939606.jpg"
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
												       	 		"<a href='#popupComment' data-rel='popup' data-position-to='window' class='ui-btn ui-corner-all btn-only-icon fa fa-comment' data-transition='pop' style='Color:white; Background-Color:#6d88b7; text-shadow: none; position: absolute; margin-right:6px; right:8px; top: 2px;' onClick='openCommentInput("+myWallEntries[j].ID+");'>"+	
												       	 		 ""+//"ID:"+myWallEntries[j].ID+
												       	 		"</a>"+		
												       	 											       		
												       	"</div>"




												       //	"<a href='#popupComment' data-rel='popup' data-position-to='window' class='ui-btn fa fa-send-o' data-transition='pop'>Kommentieren</a>"+
												       /*
														"<div data-role='popup' id='popupComment' data-theme='a' class='ui-corner-all'>"+
														    "<form>"+
														        "<div style='padding:10px 20px;'>"+
														            "<h3>Pinnwandeintrag kommentieren</h3>"+														          
														            "<input type='text' name='user' id='commenttextv value='' placeholder='Kommentar' data-theme='a'>"+
														            "<div style='margin-right:34px'><a id='postToWall' class='ui-btn ui-corner-all fa fa-send-o' style='text-align:center; Color:white; Background-Color:#6d88b7; text-shadow: none; width:100%' onClick='postTW();'>Kommentieren</a></div>"+
														        "</div>"+
														    "</form>"+
														"</div>"*/








											       	)).listview("refresh");

											       	var imgHeight = $("#wPic"+myWallEntries[j].ID).height() 
											       	var textMarginTop = imgHeight+6;	
											       	
											       	if(imgHeight>10){											       									       						
												       	$("#wTextDiv"+myWallEntries[j].ID).css({ // resize the image     			
			     												"margin-top": textMarginTop+"px"
					  									});
											       	}else{
											       		textMarginTop=86;											       		
											       		$("#wTextDiv"+myWallEntries[j].ID).css({ // resize the image     			
		     												"margin-top": textMarginTop+"px"
				  										});	
											       	}
											       	var imgWidth = $("#wPic"+myWallEntries[j].ID).width() 
											       	var textMarginLeft = Math.round(imgWidth+10);
											       						//alert(textMarginLeft);
			  										if(imgWidth>10){											       									       						
												     	 $("#wTimeDiv"+myWallEntries[j].ID).css({ // resize the image     			
		     												"margin-left": textMarginLeft+"px"
				  										});
											       	}else{
											       		textMarginLeft=84;											       		
											       		$("#wTimeDiv"+myWallEntries[j].ID).css({ // resize the image     			
		     												"margin-left": textMarginLeft+"px"
				  										});
											       	}

														i=0;	
											       		for (;myCommentEntries[i];) {	
											       				if(myWallEntries[j].ID == myCommentEntries[i].WallID){
											       					var cdate = (myCommentEntries[i].Timestamp).substring(0,11);

											       					var cdate1=new Date().getTime() - (new Date().getTimezoneOffset() * 60000);												       
																	var cdateb2= myCommentEntries[i].Timestamp;
																	var cdate2 = new Date(cdateb2.replace(' ', 'T')).getTime();
															        //alert(date2+"\n"+date1);

											       						//var cImgSrc ="http://st.depositphotos.com/1003368/1944/i/950/depositphotos_19448249-business-woman-in-glasses.jpg"	
											       						
											       						var cImgSrc="";
																       if(myCommentEntries[i].picID.length>5){
																       	cImgSrc=myCommentEntries[i].picID;//"http://newtroy.integra-technologies.co.uk/static/images/unknown_user.png" 
																   		}else{
																   		cImgSrc="http://newtroy.integra-technologies.co.uk/static/images/unknown_user.png"; 	
																   		}

											       						//var cImgSrc ="http://us.123rf.com/400wm/400/400/malopes/malopes0901/malopes090100089/4185805-schone-fr-hling-landschaft-mit-gras-und-sky--hochformat.jpg"								       					
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
																	       
																		       )).listview("refresh");

											       						var imgHeight = $("#cPic"+myCommentEntries[i].ID).height() 
											       						var textMarginTop = imgHeight + 26;
											       						//alert(textMarginTop);
			  														if(imgHeight>10){											       									       						
												     					 $("#cTextDiv"+myCommentEntries[i].ID).css({ // resize the image     			
		     																"margin-top": textMarginTop+"px"
				  														});
											       					}else{
											       						textMarginTop=84+26;											       		
											       						$("#cTextDiv"+myCommentEntries[i].ID).css({ // resize the image     			
		     																"margin-top": textMarginTop+"px"
				  														});
											       					}

											       					var imgWidth = $("#cPic"+myCommentEntries[i].ID).width() 
											       					var textMarginLeft = Math.round(imgWidth+10);
											       						//alert(textMarginLeft);
			  														if(imgWidth>10){											       									       						
												     					 $("#cTimeDiv"+myCommentEntries[i].ID).css({ // resize the image     			
		     																"margin-left": textMarginLeft+"px"
				  														});
											       					}else{
											       						textMarginLeft=84;											       		
											       						$("#cTimeDiv"+myCommentEntries[i].ID).css({ // resize the image     			
		     																"margin-left": textMarginLeft+"px"
				  														});
											       					}

											       						 
											       				} //class='commentWall'
											       			  i++;
															}
											       j++;
											}		
											
										},
									});	
 									
	}





//
//
//
//
//
function postTWRides() {
	var text = $('#postTextRides').val();
	document.getElementById('postTextRides').value ="";
	var loginID = JSON.parse(localStorage.getItem('userdata')).id;	
	var viewRideID = JSON.parse(localStorage.getItem('userdata')).viewRideId;//JSON.parse(localStorage.getItem('userdata')).viewProfileId;
	if(text.length==0) {
		alert("JUNGE, gib wenigstens 1 Gottverdammtes Zeichen ein!");	
	}else{	
		var postData = {
			'text' : text,
			'loginID' : loginID,
			'viewRideID' : viewRideID
		}
			
		$.ajax({
			type: "GET",
			url: "http://87.230.14.183/postToWallRides.php",
			data: postData,
			success:	function(postResult) {
							//alert(postResult);
							window.location.href=window.location.href
						},
		});
	}
}
//
//
//
//
//
function postCORides() {
	 //alert("kommentiere den eintrag "+window.commentIDInput);
	var text = $('#commentTextToPostRides').val();
	document.getElementById('commentTextToPostRides').value ="";
	var loginID = JSON.parse(localStorage.getItem('userdata')).id;	
	var viewRideID = JSON.parse(localStorage.getItem('userdata')).viewRideId;//JSON.parse(localStorage.getItem('userdata')).viewProfileId;	
	if(text.length==0) {
		alert("JUNGE, gib wenigstens 1 Gottverdammtes Zeichen ein!");	
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
			url: "http://87.230.14.183/postCommentRides.php",
			data: postData,
			success:	function(postResult) {
							//alert(postResult);
							
							window.location.href="showARide.html"//window.location.href
						},
		});
	}
}

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
										url: "http://87.230.14.183/wallRides.php",
										data: viewRideData,
										dataType: "jsonp",			
										success:	function(wallentries) {	
											var i = 0;
											myWallEntries=wallentries;
											var j = 0;
											for (;myWallEntries[j];) {		        // Create the list item:


											        var date = (myWallEntries[j].Timestamp).substring(0,11);		

											        var date1=new Date().getTime()- (new Date().getTimezoneOffset() * 60000);										       
													var dateb2= myWallEntries[j].Timestamp;
													var date2 = new Date(dateb2.replace(' ', 'T')).getTime();
											        //alert(date2+"\n"+date1);
											     
											       $("#ulWallHeaderRides").append(
											      	$("<li data-role='list-divider' style='font-size:1.1em'  onClick='openProfilByID("+myWallEntries[j].SenderID+");'>").append(			//+"."+date.substring(0,4)	      		
											       	 myWallEntries[j].name+"<span class='ui-li-count'>"+date.substring(8,10)+"."+date.substring(5,7)+" - "+(myWallEntries[j].Timestamp).substring(11,16)+"</span>" //myWallEntries.length+
											       )).listview("refresh");

											       //var wImgSrc="http://images.fotocommunity.de/bilder/natur/tiere/pfau-hochformat-357029dc-d282-4a87-a9d3-01e9ec2600e8.jpg" 
											       //var wImgSrc="http://st.depositphotos.com/1003368/1944/i/950/depositphotos_19448249-business-woman-in-glasses.jpg";
											       //var wImgSrc ="http://us.123rf.com/400wm/400/400/malopes/malopes0901/malopes090100089/4185805-schone-fr-hling-landschaft-mit-gras-und-sky--hochformat.jpg"
											       var wImgSrc="";
											       if(myWallEntries[j].picID.length>5){
											       	wImgSrc=myWallEntries[j].picID;//"http://newtroy.integra-technologies.co.uk/static/images/unknown_user.png" 
											   		}else{
											   		wImgSrc="http://newtroy.integra-technologies.co.uk/static/images/unknown_user.png"; 	
											   		}
											       //var wImgSrc="http://us.cdn282.fansshare.com/photos/kateupton/kate-upton-terry-richardson-outtakes-jpeg-model-302939606.jpg"
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
												       	 		"<a href='#popupCommentRides' data-rel='popup' data-position-to='window' class='ui-btn ui-corner-all btn-only-icon fa fa-comment' data-transition='pop' style='Color:white; Background-Color:#6d88b7; text-shadow: none; position: absolute; margin-right:6px; right:8px; top: 2px;' onClick='openCommentInput("+myWallEntries[j].ID+");'>"+	
												       	 		 ""+//"ID:"+myWallEntries[j].ID+
												       	 		"</a>"+		
												       	 											       		
												       	"</div>"




												       //	"<a href='#popupComment' data-rel='popup' data-position-to='window' class='ui-btn fa fa-send-o' data-transition='pop'>Kommentieren</a>"+
												       /*
														"<div data-role='popup' id='popupComment' data-theme='a' class='ui-corner-all'>"+
														    "<form>"+
														        "<div style='padding:10px 20px;'>"+
														            "<h3>Pinnwandeintrag kommentieren</h3>"+														          
														            "<input type='text' name='user' id='commenttextv value='' placeholder='Kommentar' data-theme='a'>"+
														            "<div style='margin-right:34px'><a id='postToWall' class='ui-btn ui-corner-all fa fa-send-o' style='text-align:center; Color:white; Background-Color:#6d88b7; text-shadow: none; width:100%' onClick='postTW();'>Kommentieren</a></div>"+
														        "</div>"+
														    "</form>"+
														"</div>"*/








											       	)).listview("refresh");

											       	var imgHeight = $("#wPicRides"+myWallEntries[j].ID).height() 
											       	var textMarginTop = imgHeight+6;	
											       	
											       	if(imgHeight>10){											       									       						
												       	$("#wTextDivRides"+myWallEntries[j].ID).css({ // resize the image     			
			     												"margin-top": textMarginTop+"px"
					  									});
											       	}else{
											       		textMarginTop=86;											       		
											       		$("#wTextDivRides"+myWallEntries[j].ID).css({ // resize the image     			
		     												"margin-top": textMarginTop+"px"
				  										});	
											       	}
											       	var imgWidth = $("#wPicRides"+myWallEntries[j].ID).width() 
											       	var textMarginLeft = Math.round(imgWidth+10);
											       						//alert(textMarginLeft);
			  										if(imgWidth>10){											       									       						
												     	 $("#wTimeDivRides"+myWallEntries[j].ID).css({ // resize the image     			
		     												"margin-left": textMarginLeft+"px"
				  										});
											       	}else{
											       		textMarginLeft=84;											       		
											       		$("#wTimeDivRides"+myWallEntries[j].ID).css({ // resize the image     			
		     												"margin-left": textMarginLeft+"px"
				  										});
											       	}

														i=0;	
											       		for (;myCommentEntries[i];) {	
											       				if(myWallEntries[j].ID == myCommentEntries[i].WallID){
											       					var cdate = (myCommentEntries[i].Timestamp).substring(0,11);

											       					var cdate1=new Date().getTime() - (new Date().getTimezoneOffset() * 60000);												       
																	var cdateb2= myCommentEntries[i].Timestamp;
																	var cdate2 = new Date(cdateb2.replace(' ', 'T')).getTime();
															        //alert(date2+"\n"+date1);

											       						//var cImgSrc ="http://st.depositphotos.com/1003368/1944/i/950/depositphotos_19448249-business-woman-in-glasses.jpg"	
											       						
											       						var cImgSrc="";
																       if(myCommentEntries[i].picID.length>5){
																       	cImgSrc=myCommentEntries[i].picID;//"http://newtroy.integra-technologies.co.uk/static/images/unknown_user.png" 
																   		}else{
																   		cImgSrc="http://newtroy.integra-technologies.co.uk/static/images/unknown_user.png"; 	
																   		}

											       						//var cImgSrc ="http://us.123rf.com/400wm/400/400/malopes/malopes0901/malopes090100089/4185805-schone-fr-hling-landschaft-mit-gras-und-sky--hochformat.jpg"								       					
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
																	       
																		       )).listview("refresh");

											       						var imgHeight = $("#cPicRides"+myCommentEntries[i].ID).height() 
											       						var textMarginTop = imgHeight + 26;
											       						//alert(textMarginTop);
			  														if(imgHeight>10){											       									       						
												     					 $("#cTextDivRides"+myCommentEntries[i].ID).css({ // resize the image     			
		     																"margin-top": textMarginTop+"px"
				  														});
											       					}else{
											       						textMarginTop=84+26;											       		
											       						$("#cTextDivRides"+myCommentEntries[i].ID).css({ // resize the image     			
		     																"margin-top": textMarginTop+"px"
				  														});
											       					}

											       					var imgWidth = $("#cPicRides"+myCommentEntries[i].ID).width() 
											       					var textMarginLeft = Math.round(imgWidth+10);
											       						//alert(textMarginLeft);
			  														if(imgWidth>10){											       									       						
												     					 $("#cTimeDivRides"+myCommentEntries[i].ID).css({ // resize the image     			
		     																"margin-left": textMarginLeft+"px"
				  														});
											       					}else{
											       						textMarginLeft=84;											       		
											       						$("#cTimeDivRides"+myCommentEntries[i].ID).css({ // resize the image     			
		     																"margin-left": textMarginLeft+"px"
				  														});
											       					}

											       						 
											       				} //class='commentWall'
											       			  i++;
															}
											       j++;
											}		
											
										},
									});	
 									
	}


//
//
//
//
//
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

		//alert(viewProfileID)
		if(userLoggedInDataloginID==viewProfileID){
			var myDiv1 = document.getElementById("namefield");
	        myDiv1.innerHTML = JSON.parse(localStorage.getItem('userdata')).name;	       				   
	        var myDiv2 = document.getElementById("emailfield");
	        myDiv2.innerHTML = JSON.parse(localStorage.getItem('userdata')).email;	       				    
	        var myDiv3 = document.getElementById("telfield");
	        myDiv3.innerHTML = JSON.parse(localStorage.getItem('userdata')).tel;	       				    
	        var myDiv4 = document.getElementById("carfield");
	        myDiv4.innerHTML = JSON.parse(localStorage.getItem('userdata')).modelName;

			if(JSON.parse(localStorage.getItem('userdata')).picid.length>5){
				document.getElementById("profile_picture").src=JSON.parse(localStorage.getItem('userdata')).picid;
			}

	        if(isEmpty(JSON.parse(localStorage.getItem('userdata')).modelName)==true){
	        	//alert("Sie haben bisher noch kein Auto angelegt!")
	        	 myDiv4.innerHTML = "AUTO ANLEGEN";
	        	 document.getElementById("carLink").href = "carAddNew.html";
	        }



	        var myDiv5 = document.getElementById("userdescription");
	        myDiv5.innerHTML = "<h3>Beschreibung</h3>" + JSON.parse(localStorage.getItem('userdata')).descriptionUser;
	        document.getElementById("profilTitle").innerHTML="Mein Profil"
	    }else{
	    	//alert(userLoggedInDataloginID + " / " + viewProfileID)
	    	remove("editButton");	    	
	    	$.ajax({
							type: "GET",
							url: "http://87.230.14.183/viewProfile.php",
							data: viewProfileData,
							dataType: "jsonp",			
							success:	function(viewProfileResult) {									
									var myDiv1 = document.getElementById("namefield");
							        myDiv1.innerHTML = viewProfileResult.name;	       				   
							        var myDiv2 = document.getElementById("emailfield");
							        myDiv2.innerHTML = viewProfileResult.email;	      				    
							        var myDiv3 = document.getElementById("telfield");
							        myDiv3.innerHTML = viewProfileResult.tel;		       				    
							        var myDiv4 = document.getElementById("carfield");
							        myDiv4.innerHTML = viewProfileResult.modelName;	
							        var myDiv5 = document.getElementById("userdescription");
							        myDiv5.innerHTML = "<h3>Beschreibung</h3>" + viewProfileResult.descriptionUser;	

							        if(viewProfileResult.picID.length>5){
							        	document.getElementById("profile_picture").src=viewProfileResult.picID;
							    	}
							    	
							       //document.getElementById("profile_picture").src=
							},
				});	
	    }

 		//////////////////////////////CONNECT TO DB TO GET THE WALL / "PINNWAND EINTRAEGE"////////////////////////
		//alert(userLoggedInDataloginID)	;
		var myWallEntries;
		var myCommentEntries;	
				
				$.ajax({
							type: "GET",
							url: "http://87.230.14.183/comments.php",
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


							
		///////////////////////////////////////////ON_CLICK EVENTS///////////////////////////////////////////////
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


//
//
//
//
//









//
//
//
//
//
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

		//alert(viewProfileID)
		if(userLoggedInDataloginID===viewProfileID){
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


	    }else{
	    	remove("editButton");
	    	$.ajax({
							type: "GET",
							url: "http://87.230.14.183/viewProfile.php",
							data: viewProfileData,
							dataType: "jsonp",			
							success:	function(viewProfileResult) {									
							        var myDiv1 = document.getElementById("carmodelfield");
							        myDiv1.innerHTML = viewProfileResult.modelName  +  " ("+viewProfileResult.colourCar+")";	
							        var myDiv2 = document.getElementById("caryearfield");
							        myDiv2.innerHTML = "Baujahr " + viewProfileResult.constructionYear;	
							        var myDiv3 = document.getElementById("carlicenseplate");
							        myDiv3.innerHTML = viewProfileResult.licensePlate;	
							        var myDiv4 = document.getElementById("carseats");
							        myDiv4.innerHTML = viewProfileResult.seats;	 + " Sitze";
							        var myDiv5= document.getElementById("carnamefield");
							        myDiv5.innerHTML = viewProfileResult.name;	
							        var myDiv6 = document.getElementById("cardescription");
							        myDiv6.innerHTML = "<h3>Beschreibung</h3>" + viewProfileResult.descriptionCar;	

									if(viewProfileResult.carPicID.length>5){
							        	document.getElementById("car_picture").src=viewProfileResult.carPicID;
							    	}


							},
				});	
	    }



		///////////////////////////////////////////ON_CLICK EVENTS///////////////////////////////////////////////
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
//
//
//
//
 //+++++++++++++++++++++++++++/////////////////////////////////////////PROFILEEDIT.HTML///////////////////////////////////////////+++++++++++++++++++++++++++++//
    $(document).on('pageinit', '#profileEdit', function(){   	
 		////////////////////////////////////////AUTO RESIZE IMAGE///////////////////////////////////////////////
		/*if($(window).width()<430){
			 $("#profileEdit_block_a").css({ // resize the image     			
	     			'width': 'calc(98%)'
			   	});
			   	$("#profileEdit_block_b").css({ // resize the image     			
	     			'width': 'calc(100%)'
			   	});
		}
		 else {
			   $("#profileEdit_block_a").css({ // resize the image     			
	     			'width': 'calc(38%)'
			   	});
			   $("#profileEdit_block_b").css({ // resize the image     			
	     			'width': 'calc(60%)'
			   	});
			}*/
		////////////////////////////////////////FILL PROFILE DATA///////////////////////////////////////////////
			var myDiv1 = document.getElementById("namefieldInput");
	        myDiv1.value = JSON.parse(localStorage.getItem('userdata')).name;	       				   
	        var myDiv2 = document.getElementById("emailfieldInput");
	        myDiv2.value = JSON.parse(localStorage.getItem('userdata')).email;	       				    
	        var myDiv3 = document.getElementById("telfieldInput");
	        myDiv3.value = JSON.parse(localStorage.getItem('userdata')).tel;	       				    
	        var myDiv5 = document.getElementById("userdescriptionInput");
	        myDiv5.value = JSON.parse(localStorage.getItem('userdata')).descriptionUser;
	    ///////////////////////////////////RESIZE PICTURE ON CLICK/////////////////////////////////////////////////
		/*$("#profileEdit_picture").on("click", function(e3) {
			var bodywidth = $(window).width();//document.getElementById("description").offsetWidth
			if(bodywidth>800){bodywidth=800}
			if(e3.handled !== true) // This will prevent event triggering more then once
        	{        	
				if (document.getElementById("profileEdit_block_a").offsetWidth<(bodywidth/100)*80) {
				    $("#profileEdit_block_a").css({ // resize the image     			
		     			'width': 'calc(98%)'
				   	});
				   	$("#profileEdit_block_b").css({ // resize the image     			
		     			'width': 'calc(100%)'
				   	});
				} else {
				   $("#profileEdit_block_a").css({ // resize the image     			
		     			'width': 'calc(38%)'
				   	});
				   $("#profileEdit_block_b").css({ // resize the image     			
		     			'width': 'calc(60%)'
				   	});
				}
			e3.handled = true;
        	}
		});
		$("#profileEdit_picture_label").on("click", function(e4) {
			var bodywidth = $(window).width();//document.getElementById("description").offsetWidth
			if(bodywidth>800){bodywidth=800}	
			if(e4.handled !== true) // This will prevent event triggering more then once
        	{        		
				if (document.getElementById("profileEdit_block_a").offsetWidth<(bodywidth/100)*80) {
				    $("#profileEdit_block_a").css({ // resize the image     			
		     			'width': 'calc(98%)'
				   	});
				   	$("#profileEdit_block_b").css({ // resize the image     			
		     			'width': 'calc(100%)'
				   	});
				} else {
				   $("#profileEdit_block_a").css({ // resize the image     			
		     			'width': 'calc(38%)'
				   	});
				   $("#profileEdit_block_b").css({ // resize the image     			
		     			'width': 'calc(60%)'
				   	});
				}
			e4.handled = true;
        	}
		});*/
	});	

//
//
//
//
//
//+++++++++++++++++++++++++++/////////////////////////////////////////CAREDIT.HTML///////////////////////////////////////////+++++++++++++++++++++++++++++//
    $(document).on('pageinit', '#carEdit', function(){   	
 		////////////////////////////////////////AUTO RESIZE IMAGE///////////////////////////////////////////////
		/*if($(window).width()<430){
			 $("#carEdit_block_a").css({ // resize the image     			
	     			'width': 'calc(98%)'
			   	});
			   	$("#carEdit_block_b").css({ // resize the image     			
	     			'width': 'calc(100%)'
			   	});
		}
		 else {
			   $("#carEdit_block_a").css({ // resize the image     			
	     			'width': 'calc(38%)'
			   	});
			   $("#carEdit_block_b").css({ // resize the image     			
	     			'width': 'calc(60%)'
			   	});
			}*/
		////////////////////////////////////////FILL PROFILE DATA///////////////////////////////////////////////
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
		///////////////////////////////////RESIZE PICTURE ON CLICK/////////////////////////////////////////////////
		/*$("#carEdit_picture").on("click", function(e3) {
			var bodywidth = $(window).width();//document.getElementById("description").offsetWidth
			if(bodywidth>800){bodywidth=800}
			if(e3.handled !== true) // This will prevent event triggering more then once
        	{        	
				if (document.getElementById("carEdit_block_a").offsetWidth<(bodywidth/100)*80) {
				    $("#carEdit_block_a").css({ // resize the image     			
		     			'width': 'calc(98%)'
				   	});
				   	$("#carEdit_block_b").css({ // resize the image     			
		     			'width': 'calc(100%)'
				   	});
				} else {
				   $("#carEdit_block_a").css({ // resize the image     			
		     			'width': 'calc(38%)'
				   	});
				   $("#carEdit_block_b").css({ // resize the image     			
		     			'width': 'calc(60%)'
				   	});
				}
			e3.handled = true;
        	}
		});
		$("#carEdit_picture_label").on("click", function(e4) {
			var bodywidth = $(window).width();//document.getElementById("description").offsetWidth
			if(bodywidth>800){bodywidth=800}	
			if(e4.handled !== true) // This will prevent event triggering more then once
        	{        		
				if (document.getElementById("carEdit_block_a").offsetWidth<(bodywidth/100)*80) {
				    $("#carEdit_block_a").css({ // resize the image     			
		     			'width': 'calc(98%)'
				   	});
				   	$("#carEdit_block_b").css({ // resize the image     			
		     			'width': 'calc(100%)'
				   	});
				} else {
				   $("#carEdit_block_a").css({ // resize the image     			
		     			'width': 'calc(38%)'
				   	});
				   $("#carEdit_block_b").css({ // resize the image     			
		     			'width': 'calc(60%)'
				   	});
				}
			e4.handled = true;
        	}
		});*/

	});	













 //+++++++++++++++++++++++++++/////////////////////////////////////////showARide.HTML///////////////////////////////////////////+++++++++++++++++++++++++++++//
  $(document).on('pageinit', '#showARide', function(){   	
 		////////////////////////////////////////AUTO RESIZE IMAGE///////////////////////////////////////////////
		
		////////////////////////////////////////FILL PROFILE DATA///////////////////////////////////////////////
		var userLoggedInDataloginID = JSON.parse(localStorage.getItem('userdata')).id;
		var viewRideID = JSON.parse(localStorage.getItem('userdata')).viewRideId; //JSON.parse(localStorage.getItem('userdata')).viewProfileId
		var userLoggedInData = {
			//'loginName' : userLoggedInDataloginName,
			'loginID' : userLoggedInDataloginID
		}
		var viewRideData = {
			'viewRideID' : viewRideID
		}



 		//////////////////////////////CONNECT TO DB TO GET THE WALL / "PINNWAND EINTRAEGE"////////////////////////
		//alert(userLoggedInDataloginID)	;
		var myWallEntries;
		var myCommentEntries;	
				
				$.ajax({
							type: "GET",
							url: "http://87.230.14.183/commentsRides.php",
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

});




















