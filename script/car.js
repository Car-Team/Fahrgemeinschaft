//////////////////////////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////////// 
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
				/////////////////////////////////////////////////////////////////////////////////////////////////////
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
											       $("#ulWallHeader").append(
											      	$("<li data-role='list-divider'>").append(				      		
											       	 myWallEntries[j].name+"<span class='ui-li-count'>"+date.substring(8,10)+"."+date.substring(5,7)+"."+date.substring(0,4)+" - "+(myWallEntries[j].Timestamp).substring(11,16)+"</span>" //myWallEntries.length+
											       )).listview("refresh");

											       $("#ulWallHeader").append(
											       	$("<li style='min-height:61px'>").append(
												       	 //"<h2>"+myWallEntries[j].Sender + "</h2>" +
												       	"<div class='commentPicFrameWall'><img class='wallpic' src='http://newtroy.integra-technologies.co.uk/static/images/unknown_user.png'></div>"+
														"<div style='margin-left:75px'>"+
												       		"<div align='justify'>"+
												       	 		"<label style='white-space:normal'>" + myWallEntries[j].Textinput + "</label>"+
												       		"</div>"+
												       	"</div>"
												       	 // +"<p class='ui-li-aside'><strong>"+ (myWallEntries[j].Timestamp).substring(11,16) + "</strong></p>"
											       	)).listview("refresh");
														i=0;	
											       		for (;myCommentEntries[i];) {	
											       				if(myWallEntries[j].ID == myCommentEntries[i].WallID){
											       					var date2 = (myCommentEntries[i].Timestamp).substring(0,11);
											       						 $("#ulWallHeader").append(
																	       	$("<li style='border-color: #D8D8D8 ; border-left:0px; border-right:0px; background-color:#E8E8E8 ; min-height:90px; margin-left:30px'>").append(
																	       		"<div class='commentPicFrameWall' style='margin-top:30px;'>"+
																	       			"<img class='wallpic' src='http://newtroy.integra-technologies.co.uk/static/images/unknown_user.png'></img>"+
																	       		"</div>"+
																		       	"<h2 style='position: absolute; left:7; top:0;'>"+ myCommentEntries[i].name+"</h2>"+
																		       	"<div style='margin-top:31px; margin-left:75px'><div align='justify'>" +
																		       		"<label style='white-space:normal'>"+myCommentEntries[i].Textinput + "</label>"+
																		       	"</div>"+											       	
																		       	"<span class='ui-li-count dateComment'>"+ date2.substring(8,10)+"."+date2.substring(5,7)+"."+date2.substring(0,4)+" - "+(myCommentEntries[i].Timestamp).substring(11,16)+  "</span>"
																	     )).listview("refresh");
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
				/////////////////////////////////////////////////////////////////////////////////////////////////////
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
