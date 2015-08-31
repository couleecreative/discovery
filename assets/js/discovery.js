var Discovery = (function($) {

	var init = function() {

		// add animate class
		setTimeout(function(){
			$('body').addClass('animate-in');
		}, 250);

		// Navigation functionality
		if(typeof Navigation !== 'undefined') 
			Navigation.init();

		// TextSlider functionality
		if(typeof TextSlider !== 'undefined') 
			TextSlider.init();

		// handle the lack of SVG support
		if(!Modernizr.svg) {
			
			$('img[src*="svg"]').attr('src', function() {
				return $(this).attr('src').replace('.svg', '.png');
			});
		
		} else {

			// replace svg with svg code
			jQuery('img.svg-raw').each(function(){
	            var $img = jQuery(this);
	            var imgID = $img.attr('id');
	            var imgClass = $img.attr('class');
	            var imgURL = $img.attr('src');

	            jQuery.get(imgURL, function(data) {
	                // Get the SVG tag, ignore the rest
	                var $svg = jQuery(data).find('svg');

	                // Add replaced image's ID to the new SVG
	                if(typeof imgID !== 'undefined') {
	                    $svg = $svg.attr('id', imgID);
	                }
	                // Add replaced image's classes to the new SVG
	                if(typeof imgClass !== 'undefined') {
	                    $svg = $svg.attr('class', imgClass+' replaced-svg');
	                }

	                // Remove any invalid XML tags as per http://validator.w3.org
	                $svg = $svg.removeAttr('xmlns:a');

	                // Replace image with new SVG
	                $img.replaceWith($svg);

	            }, 'xml');

	        });
		}

		// event slider container
		var events = $('.event-slider');

		// owl slider properties
		events.owlCarousel({ 
			addClassActive : true,
			itemsCustom : [[0, 1]]
		});

		// grab carousel data
		events = $('.event-slider').data('owlCarousel');

		// event slider navigation
		$(".event-nav .event-next").click(function(){ events.next(); });
		$(".event-nav .event-prev").click(function(){ events.prev(); });


		// gallery slider container
		var gallery = $('.gallery-slider');

		// owl slider properties
		gallery.owlCarousel({ 
			addClassActive : true,
			scrollPerPage : true,
			pagination : true,
			itemsCustom : [[0, 1]]
		});

		// grab carousel data
		gallery = $('.gallery-slider').data('owlCarousel');

		// gallery slider navigation
		$(".gallery-nav .event-next").click(function(){ gallery.next(); });
		$(".gallery-nav .event-prev").click(function(){ gallery.prev(); });

		// set backgrounds with data attribute
		$('.set-background').each(function(index) {
			$(this).css({ 'background-image':'url(' + $(this).data('background') + ')' });
		});

		// waypoints
		$('.hero-waypoint').waypoint(function(direction) { 
			$('header').toggleClass('header-active', direction === 'down');
		});

		$('.waypoint').waypoint(function(direction) { 
			if(!$('body').hasClass('body-modal-open')) {
				$(this).toggleClass($(this).data('class'), direction === 'down');
			}
		}, { offset: '40%' });
	};
	
	var scrollTo = function(id) {
		
		// Stop any currently active scroll
		$('html, body').dequeue();
		// Scroll to #id offset by 90 pixels
		$('html, body').animate({ scrollTop: $(id).offset().top }, 1000, 'easeOutExpo');
	
	};

	return {
		init: init,
		scrollTo: scrollTo
	};

}(jQuery));

$(function() {
	Discovery.init();
});