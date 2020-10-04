var num_tributes; //The number of tributes
var tributes = []; //Objects describing the tributes (eventually)
var event_text = []; //Keep track of current events in game

const CORN_CHOICES = 3;
const NUM_CHOICES = 0;

//And now the whole mess of items and events and whatnot
const item_list = [{
	name: "a bow",
	type: "weapon",
	used: "[player] shoots an arrow at [target]"},
{
	name: "a sword",
	type: "weapon",
	used: "[player] slashes [target] with a sword"},
{
	name: "a knife",
	type: "weapon",
	used: "[player] stabs [target] with a knife"},
{
	name: "an indescribable object",
	type: "object",
	used: "[player] cannot describe the indescribable object"}
];	

var LEN_ITEMS = item_list.length;
