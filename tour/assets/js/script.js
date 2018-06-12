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


let array_of_prices = [4894.06, 3605.28, 7210.56, 5626.02, 4172.29, 8344.58];
/* 
	array_of_prices = [	12d: single room, 
							12d: room for two pp, 
							12d: room for two total,
							14d: single room,
							14d: room for two pp,
							14d: room for two total  ]
*/

let whole_sum = 0;
let visa_tax = 288.91;

document.getElementById('first_step').addEventListener('click', ()=>{
	
	//go to the next tab
	document.getElementById('tab2').checked = true;
	
	/*reinitializing variables (in case user already pressed first step button and
	returned to the first step)*/
	array_of_prices = [4894.06, 3605.28, 7210.56, 5626.02, 4172.29, 8344.58];
	
	//see what option client had choose 
	if (document.getElementById('option14').checked === true)
		array_of_prices = array_of_prices.slice(3);
	else
		array_of_prices=array_of_prices.slice(0, 3);		

	//display the right info on the next tab
	document.getElementById('friendly_price').innerHTML = '$' + array_of_prices[1];
	document.getElementById('discount').innerHTML = '$' +  parseInt(array_of_prices[0] - array_of_prices[1]);
	document.getElementById('single_price').innerHTML =  '$' +  array_of_prices[0];
	document.getElementById('double_price').innerHTML =  '$' + array_of_prices[2];
});

/* 
 *
 * 
 Execute when the second option (Bring friend) choosen
 */ 

document.getElementById('fourth_step').addEventListener('click', ()=>{
	
	//go to the next tab and make current tab clickable
	document.getElementById('tab3').checked = true;
	document.getElementById('tab2').disabled = false;	

	//depends on user choose throw out prices we don't need
	if(document.getElementById("option_friend_yes").checked === true){
		array_of_prices = array_of_prices.slice(2);
		visa_tax = 577.82;
	}
	else{
		array_of_prices = array_of_prices.slice(0,1);
		visa_tax = 288.91;
	}

	document.getElementById('visa_price').innerHTML = '$' + visa_tax;
});

/* 
 *
 * 
 Execute when third option (VISA tax) choosen
 */ 

 document.getElementById('second_step').addEventListener('click', ()=>{

	//go to the next tab and make current tab clickable

	document.getElementById('tab3').disabled = false;	
	document.getElementById('tab4').checked = true;

	if (document.getElementById("option_visa_yes").checked === true)
		whole_sum = array_of_prices[0] + visa_tax;		
	else
		whole_sum = array_of_prices[0];		

	document.getElementById('pay_today').innerHTML =  '$' +  (whole_sum/100 * 40).toFixed(2);

 	next_payments = document.getElementsByClassName('pay_next');
	
	for (let i = 0; i < next_payments.length; i++){
		next_payments[i].innerHTML = '$' +  (whole_sum/100 * 30).toFixed(2);
	}

});

/*
 * 
 *
 Synchronizing chekboxes
 */

let checkboxes = document.querySelectorAll("input[type='checkbox']");

for (var i = 0; i < checkboxes.length; i++){

	checkboxes[i].addEventListener('click', function(e){		
		
		let box = e.target;
	
		if(box.checked === true){
			//choose all checkbox with the same name as clicked checkbox			
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

/*  
	Form that should be submited

	document.getElementById('user_info').submit();

*/

// Open Checkout with further options:
	handler.open({
	    name: 'China tour',
	    description: "You won't regret!",
	    zipCode: true,
	    amount: whole_sum * 100
	});
	e.preventDefault();

});

// Close Checkout on page navigation:
window.addEventListener('popstate', function() {
	handler.close();
});