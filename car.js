 $(document).on('pagebeforeshow', '#profile', function(){ 
	//$(document).on('page:load', ready)
		//alert("Hello world!");
		//alert(bodywidth);//alert(document.getElementById("page").offsetWidth)

		
		alert($(window).width())
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


		$("#profile_picture").on("click", function() {
			var bodywidth = document.getElementById("description").offsetWidth
			//alert('body '+ (bodywidth/100)*70 +' -> img '+ document.getElementById("profile_block_a").offsetWidth)	
			if (document.getElementById("profile_block_a").offsetWidth<(bodywidth/100)*70) {
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
		});
	


		$("#profile_picture_label").on("click", function() {
			var bodywidth = document.getElementById("description").offsetWidth			
			if (document.getElementById("profile_block_a").offsetWidth<(bodywidth/100)*70) {
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
		});

});



$(document).on('pagebeforeshow', '#car', function(){ 

		alert($(window).width())
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

		$("#car_picture").on("click", function() {
			var bodywidth = document.getElementById("description").offsetWidth
			//alert('body '+ (bodywidth/100)*70 +' -> img '+ document.getElementById("car_block_a").offsetWidth);				
			if (document.getElementById("car_block_a").offsetWidth<(bodywidth/100)*70) {
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
		});
		$("#car_picture_label").on("click", function() {
			var bodywidth = document.getElementById("description").offsetWidth			
			//$("#profile_picture").css({ // resize the image
     		//	height: '800px',
     		//	width: '800px'
		    //});			
			if (document.getElementById("car_block_a").offsetWidth<(bodywidth/100)*70) {
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
		});
});
