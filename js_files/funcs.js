function randint(max){
	//Where the return range is [0, max)
	return Math.floor(Math.random()*(max));
}

function random_action(){
	return ACTIONS[randint(LEN_ACTIONS)];
}

function random_death(){
	return INSTANT_DEATH[randint(LEN_DEATH)];
}

function roll(item){
	var r = randint(100);

	chances = DEFAULT_CHANCES;
	if ("threshold" in item)
		chances = item.threshold;

	if (r < chances[0]){
		return GREAT_FAIL;
	}
	else if (r < chances[1]){
		return FAIL;
	}
	else if (r < chances[2]){
		return SUCCESS;
	}
	else {
		return GREAT_SUCCESS;
	}
}

function pick_target_id(t_id){
	var picked = t_id;
	while (picked === t_id){
		var r = randint(alive_ids.length);
		picked = alive_ids[r];
	}

	return picked;
}


function kill_tribute(index){
	//index - index of tribute
	tributes[index].health = DEAD_STATUS;

	alive_ids.splice(alive_ids.indexOf(index), 1);
	graveyard.push(tributes[index]);

	if (tribute_order.indexOf(index) >= 0){
		tribute_order.splice(tribute_order.indexOf(index), 1);
	}

	adjust_status(index);
}

function adjust_health(index, roll_result, item_type=EFFECT_TYPE, action=""){
	var mod = 0;

	if (item_type === WEAPON_TYPE || (item_type === EFFECT_TYPE && roll_result <= FAIL))
		mod = -1;

	else if (item_type === EFFECT_TYPE)
		mod = 1;

	else if (item_type === HEAL_TYPE)
		mod = 1;

	if (roll_result === GREAT_SUCCESS || roll_result === GREAT_FAIL)
		tributes[index].health += mod*GREAT_RESULT;
	else if (roll_result === SUCCESS || roll_result === FAIL)
		tributes[index].health += mod*NORMAL_RESULT;


	if (tributes[index].health <= DEAD_STATUS)
		kill_tribute(index);
	else {
		adjust_status(index);
	}

	return action;
}

function adjust_health_self(index, roll_result){
	var mod = 1;
	if (roll_result === GREAT_FAIL || roll_result === FAIL)
		mod = -1

	if (roll_result === GREAT_FAIL){
		tributes[index].health -= GREAT_RESULT;
	}
}

function item_name(t, i=-1){
	/*
	t - index of tribute
	i - index of the item in their inventory (NOT in ITEM_LIST, i.e. not the number this index points to)
	*/
	if (i === -1){
		i = tributes[t].items.length-1;
	}
	return ITEM_LIST[tributes[t].items[i]].name;
}