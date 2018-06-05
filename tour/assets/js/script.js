$(document).ready(function() {
    $("head").append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.0/css/font-awesome.min.css">');
    $("head").append('<link rel="stylesheet" href="assets/css/form.css">');    
    $("head").append('<link rel="stylesheet" href="assets/css/animate.css">');
    $("head").append('<link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet">');
    $("head").append('<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">');
})


// 
// 
// First option choosen
// 

let first_step = document.getElementById('first_step');
let tab2 = document.getElementById('tab2');
let first_options = document.getElementsByName('option'); 

var choosen_option = 0;
var auto_price = 0;

let option_price_array = [3694, 4944, 4247, 4797];
let auto_price_array = [1232, 1644, 1415, 1599];


let span_price = document.getElementById('auto_price');

first_step.addEventListener('click', function(){
	// go to the next step
	tab2.checked = true;
	// see what option client had choose
	for (opt of first_options){
		if (opt.checked === true)
			choosen_option = opt.value;
	}
	//check what price we need to show userr 
	for (var i = 0; i < 4; i++)
	{
		if (choosen_option == option_price_array[i])
			auto_price = auto_price_array[i];
	}
	// show right price to user
	span_price.innerHTML = auto_price;
});

// 
// 
// Second option choosen
// 


let second_step = document.getElementById('second_step');
let second_option = document.getElementById('option_auto1');

second_step.addEventListener('click', function(){

	document.getElementById('tab2').disabled = false;	
	document.getElementById('tab3').checked = true;

	for (opt of first_options){
		if (opt.checked === true)
			choosen_option = opt.value;
	}
	//get the first option 

	auto_price = span_price.innerHTML;
	//get the auto price

	if (second_option.checked === true)
		total = parseFloat(choosen_option) + parseFloat(auto_price);
	else
		total =  parseFloat(choosen_option);
	// depend on user answe add or don't add the price 
	document.getElementById('total').innerHTML = total;
	
	console.log(total);

});
				

// 
// 
// Synchronizing chekboxes
// 

$("input:checkbox").on('click', function() {
    // in the handler, 'this' refers to the box clicked on
	var $box = $(this);
	if ($box.is(":checked")) {
	// the name of the box is retrieved using the .attr() method
	// as it is assumed and expected to be immutable
	var group = "input:checkbox[name='" + $box.attr("name") + "']";
	// the checked state of the group/box on the other hand will change
	// and the current value is retrieved using .prop() method
	$(group).prop("checked", false);
	$box.prop("checked", true);
	} else {
	    $box.prop("checked", false);
	}
});