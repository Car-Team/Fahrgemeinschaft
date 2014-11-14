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
	var id = JSON.parse(localStorage.getItem("userdata")).id;
	var data = {
		'id' : id,
	}
	
	$.ajax({
		type: "GET",
		// url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/accounting.php",
		url: "php/accounting.php",
		data: data,
		dataType: "jsonp",
		success:	function(persons) {
			mergePersons(persons.debtors, persons.creditors);
			fillPage(persons.debtors, persons.creditors, id);
		}
	});
}

function mergePersons(debtors, creditors) {
	for (var i = 0; i < debtors.length; i++) {
		var debtor = debtors[i];
		var index = getIndex(creditors, debtor.id);
		if(index != -1){
			var saldo = debtor.debt + creditors[index].debt;
			debtor.debt = saldo;
			debtors.splice(i, 1);
			creditors.splice(index, 1);
			if (saldo > 0)
				debtors.push(debtor);
			else if (saldo < 0)
				debtors.push(debtor);
		}
	}
}

function fillPage(debtors, creditors, userID) {
	var liabilities = 0;
	var receivables = 0;
	
	debtors.forEach(function(person) {
		receivables += person.debt;
		appendPerson($('#deptors'), person, userID);
	});
	
	creditors.forEach(function(person) {
		liabilities += person.debt;
		appendPerson($('#creditors'), person, userID);
	});
	
	var saldo = receivables + liabilities;
	
	$("#liabilities").html(calcColoredHtml(liabilities));
	$("#receivables").html(calcColoredHtml(receivables));
	$("#saldo").html(calcColoredHtml(saldo));
}

function appendPerson(to, person, userID) {
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
			$(span2).html(calcColoredHtml(person.debt));
		
			var btn = document.createElement("a");
			
			$(btn).attr("class", "ui-btn");
			$(btn).attr("width", "10%");
			$(btn).html("Abrechnung anfordern");
		
			$(btn).click(function() {
				alert("DIE ABRECHNUNG KOMMT");
				sendMail(userID, person.id);
			});
		
			a.appendChild(img);
			a.appendChild(span1);
			a.appendChild(span2);
			a.appendChild(btn);
		}
		li.appendChild(a);
	}	
	to.append(li);
	
	$(to).listview("refresh");
}

function sendMail(userID, debtorID) {
	
	var data = {
		'userID' : userID,
		'debtorID' : debtorID
	}
	
	$.ajax({
		type: "GET",
		url: "http://www.carteam.lvps87-230-14-183.dedicated.hosteurope.de/accountingMail.php",
		data: data,
		dataType: "jsonp",
		success:	function(callback) {
			alert(callback);
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

