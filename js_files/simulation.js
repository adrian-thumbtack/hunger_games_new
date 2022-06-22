function one_day(){
	if(day_num === 1){
		//On the first day, the cornucopia event occurs
		simulate_cornucopia()
	}
	else {
		//On every subsequent day, day proceeds as normal
		simulate_day()
	}
	day_num++;
}

function simulate_cornucopia(){
	/* Simulates the cornucopia at the beginning of the Hunger Games.
	Currently, each tribute has 3 choices
			0 - run away from the cornucopia
			1 - find an item
			2 - fight another tribute (this then uses up the other tribute's action as well as of now)
	*/
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
			event_string = `${tribute.name} found ${item_name(tribute.id)} in the cornucopia`;
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
	tribute_order = get_tribute_order();

	while (tribute_order.length > 0){

		var	tribute = tributes[tribute_order.pop()];
		var event_string = "";
		var choice = get_choice(tribute)

		/*Currently,
		<= 0 - some base action
		<= 1 - some other base action
		<= 2 - use an item
		*/
		if (choice === 0){
			event_text.push("case 0");
		}
		else if (choice <= 1){
			event_text.push("case 1");
		}
		else if (choice <= 2){
			item_i = randint(tribute.items.length);
			if (ITEM_LIST[tribute.items[item_i]].type === "weapon"){
				var result = event_text.push(use_weapon(tribute, item_i)); 
			}
			else { 
				event_text.push(use_item(tribute, item_i)); 
			}
		}
	}

	display_events(event_text);
}

function get_choice(tribute){
	//function to add choices based on items in inventory and other factors
	max_choice = MAX_CHOICE;

	if (tribute.items.length > 0){
		max_choice += ITEM_CHANCE; //Change to use constants later probably
	}
	return randint(max_choice);
}

function use_item(tribute, item_i){
	//TODO: Success or fail

	var event = ITEM_LIST[tribute.items[item_i]].success;


	//TODO: Effect of item on player
	//TODO: Retain or discard item (uses)

	
	tribute.items.splice(item_i, 1);

	return event.replace("[player]", tribute.name);
}

function use_weapon(tribute, weapon_idx){

	var weapon = ITEM_LIST[tribute.items[weapon_idx]];	
	//TODO: Success or fail
	console.log(weapon)

	var roll_result = roll(weapon);

	var event = "";

	//Currently no weapons can great fail or great success, here for the future.
	if (roll_result === GREAT_FAIL){
		event = weapon.great_fail;
	}
	else if (roll_result === FAIL){
		event = weapon.fail;
	}
	else if (roll_result === SUCCESS){
		event = weapon.success;
	}
	else if (roll_result === GREAT_SUCCESS){
		event = weapon.great_success;
	}

	event = event.replace("[player]", tribute.name);
	if (event.includes("[target]")){
		target_id = pick_target_id(tribute.id)
		event = event.replace("[target]", tributes[target_id].name)

		target_fate(target_id, roll_result);
	}
	else {
		target_fate(tribute.id, roll_result);
	}

	tribute.items.splice(weapon_idx, 1);

	//TODO: Determine if strike was lethal

	return event;
}

function get_tribute_order(){
	var temp = alive_ids.slice(); //copy alive_ids temporarily

	//pick an element to be at the back of the array, switch it there, ignore it for the rest of the sorting
	for (var i=temp.length-1; i>0; i--){
		var r = randint(i+1);
		var t = temp[i];
		temp[i] = temp[r];
		temp[r] = t;
	}

	return temp;
}

$("#tribute_status #continue").click(one_day);
$("#event_display #continue").click(display_status);