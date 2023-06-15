function display_events(event_text){
	$("div#event_display #events").empty();

	while(event_text.length > 0){
		$("div#event_display #events").append(
			$('<p>').text(event_text.shift()));
	}

	$(".container").css("visibility", "hidden");
	$("div#event_display").css("visibility", "visible")
}


function display_status(){
	$(".container").css("visibility", "hidden");
	$("div#tribute_status").css("visibility", "visible");
}

function adjust_status(idx){
	tributes[idx].status = STATUS_MSGS[tributes[idx].health]
	$("td.status_display").eq(idx).text(tributes[idx].status)
	$("td.status_display").eq(idx).css("color", STATUS_COLORS[tributes[idx].health])
}