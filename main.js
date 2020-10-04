function on_click(){
	console.log("Click!");
	//Function to create participant name div
	num_tributes = $("#t_num").val();
	if (num_tributes < 2){
		alert("You can\'t fight a hunger games with just that many people, buddy");
	}
	else {
		$("div#main").css("visibility", "hidden");
		$("#tribute_entry").css("visibility", "visible");

		for (var i=0; i<num_tributes; i++){
			$('<input/>').attr({
				"type": "text",
				"class": "t_entry"
			}).appendTo($("#tribute_entry"));
		}
	}
}

$("div#main #continue").click(on_click);


