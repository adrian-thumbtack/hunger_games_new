function proceed_to_names(){
	//Function to create participant name div based on the amount of participants entered by user

	num_tributes = $("#t_num").val();
	if (num_tributes < 2){
		alert("You can\'t fight a hunger games with just that many people, buddy");
	}
	else {
		for (var i=0; i<num_tributes; i++){
			//Looks complicated, but it just creates a table row that contains an input field, nice for organized looking thing
			$('<tr>').append(
				$('<td>').append(
				$('<input/>').attr({
				"type": "text",
				"class": "t_entry"
			}))).prependTo($("#input_table")); //Add to the beginning of the table
		}
		$("div#main").css("visibility", "hidden"); //Change the div that's visible to the add players screen
		$("#tribute_entry").css("visibility", "visible");
	}
}

function generate_tributes(){
//It's a function to process the names...
	$(".t_entry").each(function(){
		tributes.push({
			name: $(this).val(),
			t_id: tributes.length,
			life: true
		})
	});
	//Make objects for each person because why not, consisting of name and id
}

function generate_tribute_table(){
	for (var i=0; i<num_tributes; i++){
		$("#tribute_table tbody").append(
			$('<tr>').append(
			$('<td>').text(tributes[i].name)
		));
	}
}

function submit_names(){
	generate_tributes(); //Generate code representing the tributes
	generate_tribute_table(); //Generate table to be used to show status
	
	$("#tribute_entry").css("visibility", "hidden");
	$("#tribute_status").css("visibility", "visible");
}

$("div#main #continue").click(proceed_to_names); //Main function goes to name screen
$("#tribute_entry #continue").click(submit_names);



