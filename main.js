var x = -5;
var y = -6;

function on_click(){
	x = $('#p_num').val();
	window.location.href = "side.html";
	y = $('#p_num').val();
}

function other_click(){
	$('#temp').text(x + " " + y);
}

if ($('body#main').length > 0){
	$('#button').click(on_click);
}
else if ($('body#side').length > 0){
	$('#other_button').click(other_click);
}
