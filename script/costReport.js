//@author MHinzmann

$(document).on("pagebeforeshow", "#costReport", function() {
	clearCollapsibles();
	fillCollapsibles();
});

function clearCollapsibles() {
	$('#deptors').empty();
	$('#creditors').empty();
}

function fillCollapsibles() {
	$id = JSON.parse(localStorage.getItem("userdata")).id;
	var data = {
		'id' : $id,
	}
	
	$.ajax({
		type: "GET",
		// url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/costReport.php",
		url: "php/costReport.php",
		data: data,
		dataType: "jsonp",
		success:	function(persons) {
			fillPage(persons.debtors, persons.creditors);
		}
	});
}

function fillPage(debtors, creditors) {
	var liabilities = 0;
	var receivables = 0;
	
	debtors.forEach(function(person) {
		receivables += person.debt;
		appendPerson($('#deptors'), person);
	});
	
	creditors.forEach(function(person) {
		liabilities += person.debt;
		appendPerson($('#creditors'), person);
	});
	
	var saldo = receivables + liabilities;
	
	$("#liabilities").html(calcColoredHtml(liabilities));
	$("#receivables").html(calcColoredHtml(receivables));
	$("#saldo").html(calcColoredHtml(saldo));
}

function appendPerson(to, person) {
	var li = document.createElement("li");
	{
		var a = document.createElement("a");
		{
			$(a).click(function() {
				localStorage.setItem("costReportUser", JSON.stringify(person));
				$.mobile.changePage("costReportUser.html");
			});
			
			var img = document.createElement("img");
			$(img).attr("src", person.picid);
		
			var span1 = document.createElement("span");
			$(span1).html(person.name);
			var span2 = document.createElement("span");
			$(span2).attr("style", "float:right");
			$(span2).html(calcColoredHtml(person.debt));
		
			a.appendChild(img);
			a.appendChild(span1);
			a.appendChild(span2);
		}
		li.appendChild(a);
	}	
	to.append(li);
	
	$(to).listview("refresh");
}

function calcColoredHtml(value) {
	if(value < 0.0)
		return getColoredHtml(value, "red");
	else if(value > 0.0)
		return getColoredHtml(value, "green");
	else
		return getColoredHtml(value, "black");
}

function getColoredHtml(value, color) {
	return "<font color='" + color + "'>" + value + "</font> Euro";
}

