 ///////////////////////////////////////////PROFILE.HTML///////////////////////////////////////////////
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
 		//////////////////////////////CONNECT TO DB TO GET THE WALL / "PINNWAND EINTRAEGE"////////////////////////
		var userLoggedInDataloginName = JSON.parse(localStorage.getItem('userdata')).loginname;
		var userLoggedInDataloginID = JSON.parse(localStorage.getItem('userdata')).id;	
		var myWallEntries;
		var myCommentEntries;	
		var userLoggedInData = {
			'loginName' : userLoggedInDataloginName,
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

						},
				});	
				/////////////////////////////////////////////////////////////////////////////////////////////////////
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
				       	$("<li>").append(
					       	 //"<h2>"+myWallEntries[j].Sender + "</h2>" +
					       	 "<div align='justify'><label style='white-space:normal'>" + myWallEntries[j].Textinput + "</label></div>"
					       	 // +"<p class='ui-li-aside'><strong>"+ (myWallEntries[j].Timestamp).substring(11,16) + "</strong></p>"
				       	)).listview("refresh");

				       			i=0;
								for (;myCommentEntries[i];) {
				       				if(myWallEntries[j].ID == myCommentEntries[i].WallID){
				       						 $("#ulWallHeader").append(
										       	$("<li>").append(
											       	 "<h2>"+myCommentEntries[i].name + "</h2>" +
											       	 "<div align='justify'><label style='white-space:normal'>"+ "KOMMENTAR: "+myCommentEntries[i].Textinput + "</label></div>"
											       	 // +"<p class='ui-li-aside'><strong>"+ (myWallEntries[j].Timestamp).substring(11,16) + "</strong></p>"
										     )).listview("refresh");
				       				}
				       			  i++;
								}






				       j++;
				}		
				/////////////////////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////CAR.HTML///////////////////////////////////////////////
$(document).on('pageinit', '#car', function() {
		///////////////////////////////////////////ON_CLICK EVENTS///////////////////////////////////////////////
		//alert($(window).width())
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
