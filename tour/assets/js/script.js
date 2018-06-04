$(document).ready(function() {
    $("head").append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.0/css/font-awesome.min.css">');
    $("head").append('<link rel="stylesheet" href="assets/css/form.css">');    
    $("head").append('<link rel="stylesheet" href="assets/css/animate.css">');
    $("head").append('<link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet">');
    $("head").append('<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">');
})

let add_button = document.getElementById('add_extension_button');
let pay_text = document.getElementById('after_pay_text');
let remove_button = document.getElementById('remove_extension_button');
let order_full = document.getElementById('preorder_full');
let order_basic = document.getElementById('preorder_basic');

add_button.addEventListener('click', function(){
	console.log('click\n');
	
	this.classList.add('hide');
	this.classList.remove('show');

	pay_text.classList.add('show');
	pay_text.classList.remove('hide');
	
	order_basic.classList.remove('show');
	order_basic.classList.add('hide');

	order_full.classList.add('show');
	order_full.classList.remove('hide');

});

remove_button.addEventListener('click', function(){
	
	pay_text.classList.remove('show');
	pay_text.classList.add('hide');
	
	add_button.classList.add('show');
	add_button.classList.remove('hide');


	order_basic.classList.add('show');
	order_basic.classList.remove('hide');

	order_full.classList.remove('show');
	order_full.classList.add('hide');
});

