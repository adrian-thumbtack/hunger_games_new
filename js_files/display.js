function display_events(event_text){
	$("div#event_display #events").empty();

	while(event_text.length > 0){
		$("div#event_display #events").append(
			$('<p>').text(event_text.pop()));
	}

	$(".container").css("visibility", "hidden");
	$("div#event_display").css("visibility", "visible")
}


function display_status(){
	$(".container").css("visibility", "hidden");
	$("div#tribute_status").css("visibility", "visible");
}