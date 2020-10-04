function simulate_cornucopia(){
	console.log("at least this");
	var tribute_order = get_tribute_order();
	while(tribute_order.length > 0){
		console.log(`${tribute_order}`);
		var choice = randint(CORN_CHOICES);
		var t = tribute_order.pop();
		var event_string = "";

		if (tribute_order.length === 0 && choice === 2){
			choice = 1;
		}

		if (choice === 0){
			event_string = `${tributes[t].name} runs away from the cornucopia.`;
		}
		else if (choice === 1){
			tributes[t].items.push(randint(LEN_ITEMS)); //Give player a random item, as determined by item index
			event_string = `${tributes[t].name} found ${item_name(t)}`;
		}
		else if (choice === 2){
			var target = tribute_order.pop();
			event_string = `${tributes[t].name} attacks ${tributes[target].name}`;

			var kill = randint(3);
			if (kill === 0){
				event_string += `. ${tributes[t].name} is overwhelmed and injured.`;
			}
			else if (kill === 1){
				event_string += `. They are evenly matched, and nothing happens.`;
			}
			else {
				event_string += ` and kills them.`;
			}
		}

		event_text.push(event_string);
	}

	display_events();
}


function display_events(){
	$("div#event_display").empty();

	while(event_text.length > 0){
		$("div#event_display").append(
			$('<p>').text(event_text.pop()));
	}

	$(".container").css("visibility", "hidden");
	$("div#event_display").css("visibility", "visible")
}


function item_name(t, i=-1){
	/*
	t - index of tribute
	i - index of the item in their inventory (NOT in item_list, i.e. not the number this index points to)
	*/
	if (i === -1){
		i = tributes[t].items.length-1;
	}
	return item_list[tributes[t].items[i]].name;
}

/*function pick_item(t_num){
	return Math.floor(Math.random()*tributes[t_num].items.length);
}*/

function randint(max){
	//Where the return range is [0, max)
	return Math.floor(Math.random()*(max));
}

function get_tribute_order(){
	var temp = [];
	for (var i=0; i<num_tributes; i++){
		temp.push(i);
	}

	for (var i=num_tributes-1; i>0; i--){
		var r = randint(i+1);
		var t = temp[i];
		temp[i] = temp[r];
		temp[r] = t;
	}

	return temp;
}