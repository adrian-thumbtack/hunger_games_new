function display_events(event_text){
	$("div#event_display #events").empty();

	while(event_text.length > 0){
		var msg = event_text.shift();

		if (msg.includes("d_flag")){
			msg = msg.substring(6);
			death_text.push(msg);
		}

		$("div#event_display #events").append(
			$('<p>').text(msg));
	}

	$(".container").css("visibility", "hidden");
	$("div#event_display").css("visibility", "visible")
}

function display_fallen(){
	$("div#fallen_display #deaths").empty();

	while(death_counter < death_text.length){
		$("div#fallen_display #deaths").append(
			$('<p>').text(death_text.shift()));

		death_counter++;
	}

	$(".container").css("visibility", "hidden");
	$("div#fallen_display").css("visibility", "visible")
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