//////////////////////////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////////// 
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
								picid: JSON.parse(localStorage.getItem('userdata')).picID, 
								carid: JSON.parse(localStorage.getItem('userdata')).carID,
								descriptionUser: descriptiontext,
								fb_id: JSON.parse(localStorage.getItem('userdata')).fb_id,
								modelName: JSON.parse(localStorage.getItem('userdata')).modelName,
								licensePlate: JSON.parse(localStorage.getItem('userdata')).licensePlate,
								seats: JSON.parse(localStorage.getItem('userdata')).seats,
								constructionYear: JSON.parse(localStorage.getItem('userdata')).constructionYear,
								descriptionCar: JSON.parse(localStorage.getItem('userdata')).descriptionCar,
								colourCar: JSON.parse(localStorage.getItem('userdata')).colourCar}));

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
			type: "POST",
			url: "php/changeProfile.php",
			data: postData,
			success:	function(postResult) {
							//alert(postResult);
							window.location.href=window.location.href
						},
		});
	}
}

function postTW() {
	var text = $('#postText').val();
	var loginID = JSON.parse(localStorage.getItem('userdata')).id;	
	
	if(text.length==0) {
		alert("JUNGE, gib wenigstens 1 Gottverdammtes Zeichen ein!");	
	}else{	
		var postData = {
			'text' : text,
			'loginID' : loginID,
		}
			
		$.ajax({
			type: "POST",
			url: "php/postToWall.php",
			data: postData,
			success:	function(postResult) {
							//alert(postResult);
							window.location.href=window.location.href
						},
		});
	}
}

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


 //+++++++++++++++++++++++++++/////////////////////////////////////////PROFILEEDIT.HTML///////////////////////////////////////////+++++++++++++++++++++++++++++//
    $(document).on('pageinit', '#profileEdit', function(){   	
 		////////////////////////////////////////AUTO RESIZE IMAGE///////////////////////////////////////////////
		if($(window).width()<430){
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
			}
		////////////////////////////////////////FILL PROFILE DATA///////////////////////////////////////////////
			var myDiv1 = document.getElementById("namefieldInput");
	        myDiv1.value = JSON.parse(localStorage.getItem('userdata')).name;	       				   
	        var myDiv2 = document.getElementById("emailfieldInput");
	        myDiv2.value = JSON.parse(localStorage.getItem('userdata')).email;	       				    
	        var myDiv3 = document.getElementById("telfieldInput");
	        myDiv3.value = JSON.parse(localStorage.getItem('userdata')).tel;	       				    
	        var myDiv5 = document.getElementById("userdescriptionInput");
	        myDiv5.value = JSON.parse(localStorage.getItem('userdata')).descriptionUser;

 		//////////////////////////////CONNECT TO DB TO GET THE WALL / "PINNWAND EINTRAEGE"////////////////////////
		//var userLoggedInDataloginName = JSON.parse(localStorage.getItem('userdata')).loginname;
		var userLoggedInDataloginID = JSON.parse(localStorage.getItem('userdata')).id;	
	


		$("#profileEdit_picture").on("click", function(e3) {
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
		});
	});	
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
			var myDiv1 = document.getElementById("namefield");
	        myDiv1.innerHTML = JSON.parse(localStorage.getItem('userdata')).name;	       				   
	        var myDiv2 = document.getElementById("emailfield");
	        myDiv2.innerHTML = JSON.parse(localStorage.getItem('userdata')).email;	       				    
	        var myDiv3 = document.getElementById("telfield");
	        myDiv3.innerHTML = JSON.parse(localStorage.getItem('userdata')).tel;	       				    
	        var myDiv4 = document.getElementById("carfield");
	        myDiv4.innerHTML = JSON.parse(localStorage.getItem('userdata')).modelName;
	        var myDiv5 = document.getElementById("userdescription");
	        myDiv5.innerHTML = "<h3>Beschreibung</h3>" + JSON.parse(localStorage.getItem('userdata')).descriptionUser;

 		//////////////////////////////CONNECT TO DB TO GET THE WALL / "PINNWAND EINTRAEGE"////////////////////////
		//var userLoggedInDataloginName = JSON.parse(localStorage.getItem('userdata')).loginname;
		var userLoggedInDataloginID = JSON.parse(localStorage.getItem('userdata')).id;	
		var myWallEntries;
		var myCommentEntries;	
		var userLoggedInData = {
			//'loginName' : userLoggedInDataloginName,
			'loginID' : userLoggedInDataloginID
		}
				
				$.ajax({
							type: "POST",
							url: "php/comments.php",
							data: userLoggedInData,
							dataType: "json",			
							success:	function(commententries) {									
									myCommentEntries=commententries;
									//////////////////////////////////////////////////////
									$.ajax({
										type: "POST",
										url: "php/wall.php",
										data: userLoggedInData,
										dataType: "json",			
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
											      	$("<li data-role='list-divider' style='font-size:1.1em'>").append(			//+"."+date.substring(0,4)	      		
											       	 myWallEntries[j].name+"<span class='ui-li-count'>"+date.substring(8,10)+"."+date.substring(5,7)+" - "+(myWallEntries[j].Timestamp).substring(11,16)+"</span>" //myWallEntries.length+
											       )).listview("refresh");

											       //var wImgSrc="http://images.fotocommunity.de/bilder/natur/tiere/pfau-hochformat-357029dc-d282-4a87-a9d3-01e9ec2600e8.jpg" 
											       //var wImgSrc="http://st.depositphotos.com/1003368/1944/i/950/depositphotos_19448249-business-woman-in-glasses.jpg";
											       //var wImgSrc ="http://us.123rf.com/400wm/400/400/malopes/malopes0901/malopes090100089/4185805-schone-fr-hling-landschaft-mit-gras-und-sky--hochformat.jpg"
											       var wImgSrc="http://newtroy.integra-technologies.co.uk/static/images/unknown_user.png" 
											       //var wImgSrc="http://us.cdn282.fansshare.com/photos/kateupton/kate-upton-terry-richardson-outtakes-jpeg-model-302939606.jpg"
											       $("#ulWallHeader").append(
											       	$("<li style='min-height:66px'>").append(
												       	"<div class='commentPicFrameWall'>"+
												       		"<img id='wPic"+myWallEntries[j].ID+"' class='wallpic' src='"+wImgSrc+"'></img>"+
												       	"</div>"+
												       	"<div id='wTimeDiv"+myWallEntries[j].ID+"' style='position: absolute; margin-left:90px; margin-top:4px'>"+
												       		"<label class='timeGone'>"+timeDifference(date1,date2)+"</label>"+
												       	"</div>"+
														"<div id='wTextDiv"+myWallEntries[j].ID+"' style='margin-top:75px' align='justify'>"+																										       		
												       	 		"<label style='white-space:normal'>" + myWallEntries[j].Textinput + "</label>"+												       		
												       	"</div>"
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
											       						var cImgSrc ="http://newtroy.integra-technologies.co.uk/static/images/unknown_user.png" 
											       						//var cImgSrc ="http://us.123rf.com/400wm/400/400/malopes/malopes0901/malopes090100089/4185805-schone-fr-hling-landschaft-mit-gras-und-sky--hochformat.jpg"								       					
											       						$("#ulWallHeader").append(
																	       	$("<li style='border-color: #D8D8D8 ; border-left:0px; border-right:0px; background-color:#E8E8E8 ; min-height:94px; margin-left:30px'>").append(
																	       		"<div class='commentPicFrameWall' style='margin-top:30px;'>"+
																	       			"<img id='cPic"+myCommentEntries[i].ID+"' class='wallpic' src='"+cImgSrc+"'></img>"+
																	       		"</div>"+
																	       		"<h2 style='position: absolute; left:7; top:0;'>"+ myCommentEntries[i].name+"</h2>"+
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
 									/////////////////////////////////////
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
