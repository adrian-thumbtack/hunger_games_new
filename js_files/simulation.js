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
				adjust_health(tribute.id, FAIL, EFFECT_TYPE);
			}
			else if (kill === 1){
				event_string += `. They are evenly matched, and nothing happens.`;
			}
			else {
				event_string += ` and kills them.`;
				kill_tribute(target.id);
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
		var choice = get_choice(tribute)

		/*Currently,
		<= 0-1 - generic action
		<= 2-3 - find an item
		<= 4 - death event
		<= 5-6 - use an item
		*/
		if (tribute.health > DEAD_STATUS){
			if (choice <= ACTION_CHOICE){
				var action = random_action().replace("[player]", tribute.name);
				if (action.includes("[target]")){
					target_id = pick_target_id(tribute.id)
					action = action.replace("[target]", tributes[target_id].name);
				}
				event_text.push(action);
			}
			else if (choice <= FIND_CHOICE){
				tribute.items.push(randint(LEN_ITEMS)); //Give player a random item, as determined by item index
				event_text.push(`${tribute.name} found ${item_name(tribute.id)} in the cornucopia`);
			}
			else if (choice <= DEATH_CHOICE){
				var death = random_death().replace("[player]", tribute.name);
				if (death.includes("[target]")){
					target_id = pick_target_id(tribute.id);
					death = death.replace("[target]", tributes[target_id].name);
					kill_tribute(target_id);
				}
				else {
					kill_tribute(tribute.id);
				}
				event_text.push(death);
			}
			else if (choice <= ITEM_CHOICE){
				item_i = randint(tribute.items.length);
				item = ITEM_LIST[tribute.items[item_i]];
				tribute.items.splice(item_i, 1);
				event_text.push(use_item(tribute, item));
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

function use_item(tribute, item){
	if (item.type === DEFAULT_TYPE){
		var action = item.message.replace("[player]", tribute.name);
		if (msg.includes("[target]")){
			var target_id = pick_target_id(tribute.id)
			action = action.replace("[target]", tributes[target_id].name);
		}
		return action;
	}

	else if (item.type === WEAPON_TYPE)
		return item_effect(tribute, item);

	else if (item.type === EFFECT_TYPE)
		return item_effect(tribute, item);

	else if (item.type === HEAL_TYPE)
		adjust_health(tribute.id, SUCCESS, item.type)
		return item.message.replace("[player]", tribute.name);


	//TODO: Effect of item on player - will be done on a type by type basis
	//TODO: Retain or discard item (uses)
}

function item_effect(tribute, item){

	var roll_result = roll(item);

	var event = "";

	//Currently no weapons can great fail or great success, here for the future.
	if (roll_result === GREAT_FAIL){
		event = item.great_fail;
	}
	else if (roll_result === FAIL){
		event = item.fail;
	}
	else if (roll_result === SUCCESS){
		event = item.success;
	}
	else if (roll_result === GREAT_SUCCESS){
		event = item.great_success;
	}

	event = event.replace("[player]", tribute.name);
	if (event.includes("[target]")){
		target_id = pick_target_id(tribute.id)
		event = event.replace("[target]", tributes[target_id].name)

		adjust_health(target_id, roll_result, item.type);
	}
	else {
		adjust_health(tribute.id, roll_result, item.type);
	}

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