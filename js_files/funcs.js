function randint(max){
	//Where the return range is [0, max)
	return Math.floor(Math.random()*(max));
}

function roll(item){
	var r = randint(100);
	if (r < item.threshold[0]){
		return GREAT_FAIL;
	}
	else if (r < item.threshold[1]){
		return FAIL;
	}
	else if (r < item.threshold[2]){
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
	tributes[index].status_id = DEAD_STATUS;
	tributes[index].status = STATUS_MSGS[DEAD_STATUS]

	alive_ids.splice(alive_ids.indexOf(index), 1);
	graveyard.push(tributes[index]);

	if (tribute_order.indexOf(index) >= 0){
		tribute_order.splice(tribute_order.indexOf(index), 1);
	}
}

function adjust_health(t_id, roll_result){
	if (roll_result === GREAT_FAIL || roll_result === GREAT_SUCCESS)
		tributes[t_id].health -= GREAT_RESULT;
	else if (roll_result === FAIL || roll_result === SUCCESS)
		tributes[t_id].health -= NORMAL_RESULT;

	if (tributes[t_id].health <= 0){
		kill_tribute(t_id);
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