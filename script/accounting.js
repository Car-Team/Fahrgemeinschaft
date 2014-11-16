//@author MHinzmann

$(document).on("pagebeforeshow", "#accounting", function() {
	clearCollapsibles();
	fillCollapsibles();
});

function clearCollapsibles() {
	$('#deptors').empty();
	$('#creditors').empty();
}

function fillCollapsibles() {
	$('#persons').empty();
	$('#persons').listview("refresh");
	
	var id = JSON.parse(localStorage.getItem("userdata")).id;
	var data = {
		'id' : id,
	}
	
	$.ajax({
		type: "GET",
		url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/accounting.php",
		data: data,
		dataType: "jsonp",
		success:	function(persons) {
			fillPage(persons, id);
		}
	});
}

function fillPage(persons, userID) {
	var liabilities = 0;
	var receivables = 0;
	var saldo = 0;
	
	persons.forEach(function(person) {
		if(person.saldo > 0)
			receivables += person.saldo;
		else
			liabilities += person.saldo;
		
		saldo += person.saldo;
		appendPerson(person, userID);
	});
	
	var saldo = receivables + liabilities;
	
	$("#liabilities").html(calcColoredHtml(liabilities));
	$("#receivables").html(calcColoredHtml(receivables));
	$("#saldo").html(calcColoredHtml(saldo));
}

function appendPerson(person, userID) {
	var li = document.createElement("li");
	{
		var a = document.createElement("a");
		{
			var img = document.createElement("img");
			$(img).attr("src", person.picid);
			$(img).click(function() {
				openProfilByID(person.id);
			});
		
			var span1 = document.createElement("span");
			$(span1).html(person.name);
			$(span1).click(function() {
				openProfilByID(person.id);
			});
			var span2 = document.createElement("span");
			$(span2).attr("style", "float:right");
			$(span2).html(calcColoredHtml(person.saldo));
		
			var btn = document.createElement("a");
			
			$(btn).attr("class", "ui-btn");
			$(btn).attr("width", "10%");
			$(btn).html("Abrechnung anfordern");
			
			btn.setAttribute("data-rel","popup");
			btn.setAttribute("data-position-to", "window");
			btn.setAttribute("data-transition", "pop");
			
			//set link to popup
			btn.href="#accountPopup";
			$(btn).click(function() {
				sessionStorage.setItem("accountPersonID", person.id);
				sessionStorage.setItem("accountPersonSaldo", person.saldo);
			});
			
			a.appendChild(img);
			a.appendChild(span1);
			a.appendChild(span2);
			a.appendChild(btn);
		}
		li.appendChild(a);
	}	
	$('#persons').append(li);
	
	$('#persons').listview("refresh");
}

function doAccounting() {
	var userID = JSON.parse(localStorage.getItem("userdata")).id;
	var debtorID = sessionStorage.getItem("accountPersonID");
	var saldo = sessionStorage.getItem("accountPersonSaldo");
	
	sendMail(userID, debtorID, saldo);
}

function sendMail(userID, debtorID, saldo) {
	var data = {
		'userID' : userID,
		'debtorID' : debtorID,
		'saldo' : saldo
	}
	
	$.ajax({
		type: "GET",
		url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/accountingMail.php",
		data: data,
		dataType: "jsonp",
		success:	function(callback) {
			alert(callback);
			fillCollapsibles();
		}
	});
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

function getIndex(array, id) {
	for (var i = 0; i < array.length; i++) {
			if (array[i].id == id) {
					return i;
			}
	}
	return -1;
}

