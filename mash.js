/*
Set Form fields to lock in values with the "Set Up"
When values are locked, choose a number value
Once number has been chosen, go through all the input types, and MASH Text Options, everytime it hits that number value, strikethrough the text
check if there are others in that specific section, if the last one in the section, highlight, move to next one
keep going until each section has a hilighted value
 */

 // !!!!! strip html from user input !!!!


 // change input to text values when "Set Up" is clicked
$(function(){
	// loop through the inputs and gather the responses and default inputs
	$('#submit').on('click', function() {
		
		function outputAbodeOptions() {
			var arr = ['Mansion','Apartment','Shack','House'];
			var arrlen = arr.length;
			var i = 0;
			for ( i ; i < arrlen ; i++ ) {
				$('form.abode').append('<p class="option abode">'+arr[i]+'</p>');
			}
		}

		outputAbodeOptions();

	//initialize values to be used	
		$("input[type='text']").each( function() {
				$this = $(this);
				$parent = $($this.parent());
				var parentClass = $parent.attr('class');
			if ($this.val() !== '') {
				var text = $this.val();
				//removes html to avoid malicious code injection
				text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
				$this.remove();
				$parent.append('<p>'+text+'</p>');
				// $('p').last().addClass(parentClass);
				// arr.push(text);
			} 
			if ($this.val() == '') {
				var placeholder = $this.attr('placeholder');
				$this.remove();
				$parent.append('<p>'+placeholder+'</p>');
				// arr.push(placeholder);
				// $('p').last().addClass(parentClass);
			}
			$('p').last().addClass('option '+ parentClass);
		//show a number selection	
		});

		$('#submit').hide();
	});
	// generate a magic number between 2 and 20 inclusive
	$('#magicNumberBtn').on('click', function(){
		randomNumber = Math.floor(Math.random()*20)+2;
		$('#magicNumber').text(randomNumber);
	});

	$('#start').on('click', function(i) {
		
		var pickedLen = $('.picked').length;
		while ( pickedLength !== 7 ) {  // keeps running the loop until 7 options are picked, one from each class

				var i = randomNumber - 1; // MAGIC NUMBER; offset by -1 to account for index starting at zero
				var optionLen = $('.option:not(.eliminated):not(.picked)').length;
				var selector = '';

				// if the number of options is greater than the magic number, run this code
				if ( optionLen > i ) {
					var optionClass = '';
					var s = i; // options loop
					for ( s ; s < optionLen ; s+=s ) {
					selector = 'p.option:not(.eliminated):not(.picked):eq('+s+')';

					// make sure picked length did not reach 6 at a previous loop
					var pickedLength = $('.picked').length;
					optionLen = $('p.option:not(.eliminated):not(.picked)').length;
						if ( pickedLength < 7 ) {
							
							// find class, then query class selection, if class selection length is 1, then it is the last

								var optionClass = '';
								optionClass = $(selector).attr('class');
								if (optionClass) {
									optionClass = optionClass.split(' ');
								    var parentClassFilter = 'p.option.'+optionClass[1]+':not(.eliminated):not(.picked)';
									var optionClassLength = $(parentClassFilter).length; 
									// alert($(selector).attr('class')+ ' : ' +optionClass+ ' : ' +optionClassLength);

									// check if item is last of it's class
									if ( optionClassLength == 1 ) {
										$(selector).addClass('picked');
										
									} else if ( optionClassLength > 1 ) {
										var text = $(selector).text();
										$(selector).html('<del>'+text+'</del>');
										$(selector).addClass('eliminated');
									}
								}

						}
					}
				}

				// if the number of options is less than the magic number, run this code
				if ( optionLen <= i ) {
					var k = 0;

					while ( k <= i ) { // loop will run the amount of times the magic number runs
						var j = 0;
						if (j == optionLen) {
							j = 0;
							selector = $('p.option:not(.eliminated):not(.picked):eq('+j+')');
						} else {
							selector = $('p.option:not(.eliminated):not(.picked):eq('+j+')');
							j++;
						}
				

					if ( pickedLength < 6 ) {
							
							// find class, then query class selection, if class selection length is 1, then it is the last
							
							optionClass = $(selector).attr('class');
							/* logged: "optionClass is undefined"
							 if (optionClass == undefined) {
								 alert('magic num is: '+ i + ' ; optionLen is:' + optionLen +' ; eq:' + j+ 
								 	'; pickedLength :' + pickedLength );
							} */
								optionClass = optionClass.split(' ');
							    parentClassFilter = 'p.option.'+optionClass[1]+':not(.eliminated):not(.picked)';
								optionClassLength = $(parentClassFilter).length; 
								// alert($(selector).attr('class')+ ' : ' +optionClass+ ' : ' +optionClassLength);

								// change class to picked if it is the last in its class
								if ( optionClassLength == 1 ) {
									$(selector).addClass('picked');

								// eliminate if not last in its class	
								} else if ( optionClassLength > 1) {
									text = $(selector).text();
									$(selector).html('<del>'+text+'</del>');
									$(selector).addClass('eliminated');
								}
						}
					}
				optionLen = $('p.option:not(.eliminated):not(.picked)').length;
				pickedLength = $('.picked').length;	
				}
		}

	}); 

});
