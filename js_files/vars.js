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

const STATUS_COLORS = [
"red",
"white",
"lime"];

const CORN_CHOICES = 3; //Number of choices at the cornucopia

const MAX_CHOICE = 4;
const ITEM_CHANCE = 2;

//Possible choices, defined as if choice < CHOICE constant, pick that choice (choose the most specific constant that applies)
const ACTION_CHOICE = 1; //generic action - 2/5, 2/7 (with item)
const FIND_CHOICE = 3; //finding item - 2/5, 2/7
const DEATH_CHOICE = 4; //instant death - 1/5, 1/7
const ITEM_CHOICE = 6 //using an item - 2/7 (with item)

const GREAT_FAIL = 0;
const FAIL = 1;
const SUCCESS = 2;
const GREAT_SUCCESS = 3;

const GREAT_RESULT = 2;
const NORMAL_RESULT = 1;

const DEFAULT_TYPE = 0;
const WEAPON_TYPE = 1;
const HEAL_TYPE = 2;
const EFFECT_TYPE = 3;

const DEFAULT_CHANCES = [0, 50, 100];

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
	type: WEAPON_TYPE,
	success: "[player] shoots an arrow at [target]",
	fail: "[player] can't use a bow and shoots themself in the foot",
	threshold: [0, 10, 100]},
{
	name: "a sword",
	type: WEAPON_TYPE,
	success: "[player] slashes [target] with a sword",
	fail: "[player] fails sword",
	threshold: [0, 5, 100]},
{
	name: "a knife",
	type: WEAPON_TYPE,
	success: "[player] stabs [target] with a knife",
	fail: "[player] fails knife",
	threshold: [0, 5, 100]},
{
	name: "an indescribable object",
	type: DEFAULT_TYPE,
	message: "[player] cannot describe the indescribable object"},
{
	name: "a fruit tree",
	type: EFFECT_TYPE,
	success: "[player] munches on a fruit and feels stronger",
	fail: "[player] is poisoned by eating fruit"},
{
	name: "clean water",
	type: DEFAULT_TYPE,
	message: "[player] chooses to hydrate rather than diedrate"},
{
	name: "a tin of Altoids",
	type: DEFAULT_TYPE,
	message: "[player] becomes addicted to Altoids"},
{
	name: "a used Band-Aid",
	type: EFFECT_TYPE,
	success: "[player] prevents infection with their used Band-Aid",
	fail: "[player] falls ill with tetanus from the used Band-Aid"},
{
	name: "a biology textbook",
	type: DEFAULT_TYPE,
	message: "[player] reads a biology textbook and falls asleep"},
{
	name: "a bucket of KFC",
	type: DEFAULT_TYPE,
	message: "[player] eats KFC"},
{
	name: "The Emoji Movie on laserdisc",
	type: EFFECT_TYPE,
	great_fail: "[player] dies after watching the entire Emoji Movie on laserdisc",
	threshold: [100]},
{
	name: "an anthology of life-changing poems",
	type: DEFAULT_TYPE,
	message: "[player]\'s life is changed by poetry"},
{
	name: "quenched and tempered steel",
	type: DEFAULT_TYPE,
	message: "[player] constructs a geometrically stable truss"},
{
	name: "spiritual enlightenment in a Villanova brochure",
	type: DEFAULT_TYPE,
	message: "[player] sees the light and adheres to Villanova doctrine"},
{
	name: "diamond pickaxe",
	type: DEFAULT_TYPE,
	message: "[player] mines diamond ore"},
{
	name: "one spaghetti",
	type: DEFAULT_TYPE,
	message: "[player] eats a singular spaghetti"},
{
	name: "chocolate-covered cotton",
	type: DEFAULT_TYPE,
	fail: "[player] gets indigestion from too much chocolate-covered cotton",
	threshold: [0, 100]},
{
	name: "stick of Old Spice deodorant",
	type: DEFAULT_TYPE,
	message: "[player] smells good, but it\'s Old Spice, not your boy\'s cologne"},
{
	name: "findings",
	type: DEFAULT_TYPE,
	message: "[player] becomes the most successful paleontologist from Vatican City"},
{
	name: "paintball",
	type: DEFAULT_TYPE,
	message: "[player] is a paintball, so [target] can bring one less paintball"},
{
	name: "dead platypus",
	type: WEAPON_TYPE,
	success: "[player] whacks [target] to death with a dead platypus",
	great_fail: "[player] revives a dead platypus that murders them in anger",
	threshold: [2, 2, 100]}
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
"[player] hides from [target]",
];


const INJURE_EVENTS = [
"[player] yells \"woag wiag wiag\" at [target]",
"[player] roundhouse kicks [target]"];


const INSTANT_DEATH = [
"[player] strangles [target]",
"[player] dies of Ebola",
"[player] gets crushed by an unstable truss",
"[player] forgets to get the AED for [target]",
"[player] decides to take a permanent nap",
"[player] falls off a cliff while playing Pokemon Go",
"[target] gets nuked from orbit by [player]",
"[player] chokes on crabapples in cheeks",
"[player] forgets how to breathe",
"[player] uses dank memes to kill [target]",
"[player] calls the navy seals to kill [target]",
"[player] gets hit by a hurricane",
"[player] falls through a portal into the blender dimension",
"[player] loses circulation looking too good in those tight shorts",
"[player] loses circulation looking too tight in those good shorts",
"[player] fell into the void",
"[player] was slain by a zombie pigman",
"[player] withered away",
"[player] receives a bad Bishan test and dies",
"[player] dies after a botched birthmark removal surgery",
"[player] curses on a Christian server and gets smote",
"[player] spontaneously combusts",
"[player] lost connection to the server",
"[player] falls in a well",
"[player] dies in the Matrix",
"[player] succumbs to lethal peer pressure from [target]"];

var LEN_ACTIONS = ACTIONS.length;
var LEN_DEATH = INSTANT_DEATH.length;

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
