function on_click(){
	console.log("Click!");
	//Function to create participant name div
	num_tributes = $("#t_num").val();
	if (num_tributes < 2){
		alert("You can\'t fight a hunger games with just that many people, buddy");
	}
	else {
		$("div#main").css("visibility", "hidden");
		$("div#tribute_entry").css("visibility", "visible");
	}
}

$("#button").click(on_click);


