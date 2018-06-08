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

let choosen_option = 0;
let auto_price = 0;
let num_of_tours = 0;

document.getElementById('first_step').addEventListener('click', function(){
	
	/*go to the next step*/
	document.getElementById('tab2').checked = true;

	/*see what option client had choose*/
	for (opt of first_options){
		if (opt.checked === true)
			choosen_option = opt.value;
	}
	
	num_of_tours = document.getElementById('num_persons').value;

	/*show right price to user*/
	document.getElementById('whole_price').innerHTML = choosen_option * num_of_tours;

	let spans = document.getElementsByClassName('third_part');
	for (let i = 0; i < spans.length; i++){
		spans[i].innerHTML = Math.round( ((choosen_option * num_of_tours) / 3), -2);
	}
	// document.getElementById('second_step').addEventListener('click', show_payment(choosen_option * num_of_tours));
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


	if (document.getElementById('price_tour').checked === true){
		console.log("Hi");
		document.getElementById('total').innerHTML = Math.round(choosen_option * num_of_tours + 280);
	}
	else if(document.getElementById('parts_payment').checked === true){
		document.getElementById('total').innerHTML = Math.round(choosen_option * num_of_tours / 3 + 280);
	}
});

/* 
 *
 * 
 Execute when the pay button is preseed
 */		

document.getElementById('confirm_info').addEventListener('change', ()=>{
	console.log("Submit");
	document.getElementById('user_info').submit();
});

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
	image: 'https://marcystepler.github.io/tour/assets/img/china.png',
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