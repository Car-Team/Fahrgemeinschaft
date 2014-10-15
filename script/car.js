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
		var userLoggedInData = {
			'loginName' : userLoggedInDataloginName,
			'loginID' : userLoggedInDataloginID
		}
		$.ajax({
			type: "POST",
			url: "php/wall.php",
			data: userLoggedInData,
			dataType: "json",			
			success:	function(wallentries) {	
				//alert(json[0].Textinput);
				var i = 0;
				var text = "Einträge auf der Pinnwand - live gelesen aus der DB:\n\n";
				myWallEntries=wallentries;
				//for (;myWallEntries[i];) {
    			//	text += myWallEntries[i].Sender + ": " + myWallEntries[i].Textinput + "\n";
    			//	i++;
				//}
				//alert(text)
				/////////////////////////////////////////////////////////////////////////////////////////////////////				
			    //	var outputtext ="Einträge auf der Pinnwand - live gelesen aus der DB:";// = "<li data-role='list-divider'>Freitag, 03.10.2014 <span class='ui-li-count'>2</span></li>";
				//var outputtext = "<ul data-role='listview' data-inset='true'>";
				//outputtext += "<li data-role='list-divider'>Freitag, 03.10.2014 <span class='ui-li-count'>2</span></li>";
				////var outputtext="";
				var j = 0;
				for (;myWallEntries[j];) {		        // Create the list item:
				       //outputtext += "<li>" +  "(" + myWallEntries[j].Timestamp+ ") " + myWallEntries[j].Sender + ": " + myWallEntries[j].Textinput + "</li>";
				       var date = (myWallEntries[j].Timestamp).substring(0,11);
				       $("#ulWallHeader").append(
				      	$("<li data-role='list-divider'>").append(
				       	 date.substring(8,10)+"."+date.substring(5,7)+"."+date.substring(0,4)+"<span class='ui-li-count'>"+myWallEntries.length+"</span>"
				       )).listview("refresh");


				       $("#ulWallHeader").append(
				       	$("<li>").append(
					       	 "<h2>"+myWallEntries[j].Sender + "</h2>" +
					       	 "<label style='white-space:normal'>" + myWallEntries[j].Textinput + "</label>"+
					       	  "<p class='ui-li-aside'><strong>"+ (myWallEntries[j].Timestamp).substring(11,16) + "</strong></p>"
				       	)).listview("refresh");
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