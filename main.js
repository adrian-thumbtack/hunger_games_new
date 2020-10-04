var x = -5;

function on_click(){
	x = $('#p_num').val();
}

function on_click2(){
	$('#temp').text(x);
}

$('#button').click(on_click);
$('#button2').click(on_click2);

