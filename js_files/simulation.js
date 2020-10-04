function simulate_cornucopia(){
	var event_text = [];
	var tribute_order = get_tribute_order();
	while(tribute_order.length > 0){
		var choice = randint(CORN_CHOICES);
		var tribute = tributes[tribute_order.pop()];
		var event_string = "";

		if (tribute_order.length === 0 && choice === 2){
			choice = 1;
		}

		if (choice === 0){
			event_string = `${tribute.name} runs away from the cornucopia.`;
		}
		else if (choice === 1){
			tribute.items.push(randint(LEN_ITEMS)); //Give player a random item, as determined by item index
			event_string = `${tribute.name} found ${item_name(tribute.t_id)} in the cornucopia`;
		}
		else if (choice === 2){
			var target = tributes[tribute_order.pop()];
			event_string = `${tribute.name} attacks ${target.name}`;

			var kill = randint(3);
			if (kill === 0){
				event_string += `. ${tribute.name} is overwhelmed and injured.`;
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

	display_events(event_text);
}

function simulate_day(){
	var event_text = [];
	var tribute_order = get_tribute_order();

	while (tribute_order.length > 0){
		var tribute = tributes[tribute_order.pop()];
		var event_string = "";
		var choices = get_choices(tribute);

		var choice = choices[randint(choices.length)]; //Randomly generate a choice from the number of choices, weights to be decided later

		/*Currently,
		0 - some base action
		1 - some other base action
		2 - use an item
		*/
		switch (choice){
			case 0: event_text.push("case 0");
					break;
			case 1: event_text.push("case 1");
					break;
			case 2: var item_i = randint(tribute.items.length);
					if (item_list[tribute.items[item_i]].type === "weapon"){ event_text.push(use_weapon(tribute, tributes[randint(num_tributes)], item_i)); }
					else { event_text.push(use_item(tribute, item_i)); }
					break;
		}
	}

	display_events(event_text);
}

function get_choices(tribute){
	//function to add choices based on items in inventory and other factors
	choices = base_choices.slice();

	if (tribute.items.length > 0){
		choices.push(2); //Change to use constants later probably
	}

	return choices;
}

function use_item(tribute, item_i){
	var ret = item_list[tribute.items[item_i]].used;
	
	tribute.items.splice(item_i, 1);

	return ret.replace("[player]", tribute.name);
}

function use_weapon(tribute, target, weapon_i){
	var ret = item_list[tribute.items[weapon_i]].used;
	ret = ret.replace("[player]", tribute.name);
	ret = ret.replace("[target]", target.name);

	tribute.items.splice(weapon_i, 1);

	return ret;
}

function display_events(event_text){
	$("div#event_display #events").empty();

	while(event_text.length > 0){
		$("div#event_display #events").append(
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


$("#tribute_status #continue").click(simulate_cornucopia);
$("#event_display #continue").click(simulate_day);