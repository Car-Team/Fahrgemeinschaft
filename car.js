 $(document).on('pagebeforeshow', '#profile', function(){ 
		if($(window).width()<450){
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

$(document).on('pagebeforeshow', '#car', function() {
		//alert($(window).width())
		if($(window).width()<450){
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
