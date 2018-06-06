/*
 *
 *
 Optimizing styles uploading
 */

$(document).ready(function() {
    $("head").append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.0/css/font-awesome.min.css">');
    $("head").append('<link rel="stylesheet" href="assets/css/form.css">');    
    $("head").append('<link rel="stylesheet" href="assets/css/animate.css">');
    $("head").append('<link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet">');
    $("head").append('<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">');
})


/*
 *
 *
 Execute when the first option (Choosee duration) choosen
 */


let first_options = document.getElementsByName('option'); 

var choosen_option = 0;
var auto_price = 0;

var option_price_array = [3694, 4944, 4247, 4797];
var auto_price_array = [1232, 1644, 1415, 1599];

document.getElementById('first_step').addEventListener('click', function(){
	
	/*go to the next step*/
	document.getElementById('tab2').checked = true;

	/*see what option client had choose*/
	for (opt of first_options){
		if (opt.checked === true)
			choosen_option = opt.value;
	}
	
	/*check what price we need to show user*/ 
	for (let i = 0; i < 4; i++)
	{
		if (choosen_option == option_price_array[i])
			auto_price = auto_price_array[i];
	}
	
	/*show right price to user*/
	document.getElementById('auto_price').innerHTML = auto_price;
});


/* 
 *
 * 
 Execute when the second option(Book auto) choosen
 */ 

 document.getElementById('second_step').addEventListener('click', function(){

 	/*make the second option tab clickable*/
	document.getElementById('tab2').disabled = false;	
	document.getElementById('tab3').checked = true;

	/*get the first option (Need to change)*/ 
	for (opt of first_options){
		if (opt.checked === true)
			choosen_option = opt.value;
	}
	
	/*get the auto price (Need to change)*/ 
	auto_price = document.getElementById('auto_price').innerHTML;

	/*check if user choose additional autochanges and sum the money*/
	if (document.getElementById('option_auto1').checked === true)
		total = parseFloat(choosen_option) + parseFloat(auto_price);
	else
		total =  parseFloat(choosen_option);

	/*show the correct price to user*/
	document.getElementById('total').innerHTML = total;
	document.getElementById('total_input').value = total;

});

/* 
 *
 * 
 Execute when the pay button is preseed
 */		

// document.getElementById('third_step').addEventListener('click', ()=>{
// 		document.getElementById('tab1').checked = true;
// });

/*
 * 
 *
 Synchronizing chekboxes
 */

let checkboxes = document.querySelectorAll("input[type='checkbox']");

for (var i = 0; i < checkboxes.length; i++){

	checkboxes[i].addEventListener('click', ()=>{
		
		let box = event.target;
	
		if(box.checked === true){

			/*choose all checkbox with the same name as clicked checkbox*/			
			let group = document.querySelectorAll('[name="'+ box.name +'"]');
			
			for (let i = 0; i < group.length; i++){
				group[i].checked = false;
			}
			
			box.checked = true;
		}
		else{
			box.checked = false;
		}
	});
}

/*
 * 
 *
 Stripe settings
 */



var handler = StripeCheckout.configure({
	key: 'pk_test_BpWd3wjjUaNY9sSoSYwfuU5f',
	image: '../img/china.png',
	locale: 'auto',
	 token: function(token) {
	    // You can access the token ID with `token.id`.
	    // Get the token ID to your server-side code for use.
	  }
	});

document.getElementById('third_step').addEventListener('click', function(e) {
// Open Checkout with further options:
	handler.open({
	    name: 'China tour',
	    description: "You won't regret!",
	    zipCode: true,
	    amount: document.getElementById('total').innerHTML * 100
	});
	e.preventDefault();
});

// Close Checkout on page navigation:
window.addEventListener('popstate', function() {
	handler.close();
});