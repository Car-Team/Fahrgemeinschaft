//@author MHinzmann
$(document).on("pagebeforeshow", "#costReportUser", function() {
	fillSpans(JSON.parse(localStorage.getItem("costReportUser")));
});

function fillSpans(person) {
	$('#financeProfilePicture').attr('src', person.picid);

	$('#financeNameSpan').html(person.name);
	$('#financeEmailSpan').html(person.email);
	$('#fincanceTelSpan').html(person.tel);
	
	$('#financeSaldoSpan').html(calcColoredHtml(person.debt));
}