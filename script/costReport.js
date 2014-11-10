$(document).on("pagebeforeshow", "#costReport", function() {
	fillCollapsibles();
});

function fillCollapsibles() {
	fillValues();
	fillPersons();
}

function fillValues() {
	var liabilities = -685.36;
	var receivables = 2022.78;
	var saldo = receivables + liabilities;
	
	$("#liabilities").html(getColoredValue(liabilities));
	$("#receivables").html(getColoredValue(receivables));
	$("#saldo").html(getColoredValue(saldo));
}

function fillPersons() {
	//appendPerson($('#creditors'), "Karl", "media/img/avatar.jpg", -685.36);
}

function appendPerson(to, name, imgSrc, value) {
	var li = document.createElement("li");
	{
		var a = document.createElement("a");
		{
			var img = document.createElement("img");
			$(img).attr("src", imgSrc);
		
			var span1 = document.createElement("span");
			$(span1).html(name);
			var span2 = document.createElement("span");
			$(span2).attr("style", "float:right");
			$(span2).html(getColoredValue(value));
		
			a.appendChild(img);
			a.appendChild(span1);
			a.appendChild(span2);
		}
		li.appendChild(a);
	}	
	to.append(li);
	
	$(to).listview("refresh");
}

function getColoredValue(value) {
	var color	= "black";

	if(value > 0)
		color = "green";
	else if(value < 0)
		color = "red";

	return "<font color='" + color + "'>" + value + "</font> Euro";
}

