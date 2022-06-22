var num_tributes; //The number of tributes
var tributes = []; //Objects describing the tributes
var alive_ids = []; //Alive tributes
var graveyard = []; //what it sounds like
var tribute_order = []; //Current tribute order
var day_num = 1 // What day is it?

const ALIVE_STATUS = 2;
const INJURED_STATUS = 1;
const DEAD_STATUS = 0;
const STATUS_MSGS = [
"Dead",
"Injured",
"Alive"];

const CORN_CHOICES = 3; //Number of choices at the cornucopia

const MAX_CHOICE = 2;
const ITEM_CHANCE = 1;

//Possible choices, defined as if choice < CHOICE constant, pick that choice (choose the most specific constant that applies)
const BASE_CHOICE = 0; //TODO: Define base choice 1
const OTHER_CHOICE = 1; //TODO: Define base choice 2
const ITEM_CHOICE = 2 //The value corresponding to using an item

const GREAT_FAIL = 0;
const FAIL = 1;
const SUCCESS = 2;
const GREAT_SUCCESS = 3;

const GREAT_RESULT = 2;
const NORMAL_RESULT = 1;

/*Every item as follows:
	-name: Name of the item as it appears in a sentence with the corresponding article
	-type: type of item
		- "weapon": must be used to attack another player - possibility of misfiring
		- "heal": used to heal the player or another player
		- "object": everything else
	-success: message indicating item has been successfully used
	-fail: message indicating item has unsuccessfully been used
	-TODO: threshold: number from 1 to 100 that indicates the success threshold (anything above that number is successful)
*/
const ITEM_LIST = [{
	name: "a bow",
	type: "weapon",
	success: "[player] shoots an arrow at [target]",
	fail: "[player] can't use a bow and shoots themself in the foot",
	threshold: [0, 10, 100]},
{
	name: "a sword",
	type: "weapon",
	success: "[player] slashes [target] with a sword",
	fail: "[player] fails sword",
	threshold: [0, 5, 100]},
{
	name: "a knife",
	type: "weapon",
	success: "[player] stabs [target] with a knife",
	fail: "[player] fails knife",
	threshold: [0, 5, 100]},
{
	name: "an indescribable object",
	type: "object",
	success: "[player] cannot describe the indescribable object"}
];	

var LEN_ITEMS = ITEM_LIST.length;


const ACTIONS = [
"[player] wanders around",
"[player] picks flowers",
"[player] levels up",
"[player] sings us a song",
"[player] is the sheriff",
"[player] lost the game",
"[player] cries",
"[player] has nightmares",
"[player] stabs asparagus",
"[player] is accused of mansplaining",
"A Disney star takes [player]\'s money",
"[player] hides in a river",
"[player] eats bread",
"[player] attaches a measuring tape to a toaster",
"[player] gains that Disney Channel flo",
"[player] sings opera",
"[player] blames Nelson",
"[player] becomes a literary artist",
"[player] complains about a test grade",
"[player] catches 22",
"[player] catches in the rye",
"[player] raises the mission requirement to 65",
"[player] tries to post a Vine",
"[player] changes genders",
"[player] angrily emails finance club about not being on the A team",
"[player] finds Chuck Norris",
"[player] fights the Ender dragon",
"[player] watches WatchMojo for 3 hours",
"[player] joins the Society of Teen Suicide Prevention",
"[player] does a barrel roll",
"[player] finds Dory",
"[player] finds Nemo",
"[player] talks to [target]",
"[player] drops a rant against [target]",
"[player] hides from [target]"
];

//TODO: Add possible not item-related deaths
//Old actions: use "places head between two inconspicuously placed logs" as a possible death

const default_names = [
"Katniss Everdeen",
"Peeta Mellark",
"Finnick Odair",
"Johanna Mason",
"Rue",
"Thresh",
"Cato",
"Glimmer",
"Foxface"];
