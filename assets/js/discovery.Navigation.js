var Navigation = (function($) {

	var $body, scrollPos;

	var init = function() {

		// cache body selector
		$body = $('body');

		// listen for nav click events
		$('.navigation a, .search-btn').on("click", toggleDropdown);



		// listen for menu button click events
		$('.menu-btn a').on("click", toggleMenu);

		// handle body click
		$(document).mouseup(function(e) {

			if(!$('.dropdown').hasClass('dropdown-active')) return;
			if (!$('.header, .header *, .dropdown, .dropdown *').is(e.target)) {

				$('.dropdown').removeClass('dropdown-active');
				$('.navigation a').removeClass('active');
				$('.search-btn').removeClass('active');
			}
		});
	};

	var toggleDropdown = function() {

		// remove menu class
		$body.removeClass('body-menu-active');

		if($(this).hasClass('active')) {

			$(this).removeClass('active');
			$('.dropdown').removeClass('dropdown-active');
		} else {

			// grab drop class
			var dropdown = $(this).data('dropdown');

			// check if other panels are active and hide
			if($('.dropdown').hasClass('dropdown-active')) {
				$('.dropdown').removeClass('dropdown-active');
				$('.navigation a').removeClass('active');
				$('.search-btn').removeClass('active');
			}

			// show new panel
			$(this).addClass('active');
			$('.dropdown-' + dropdown).addClass('dropdown-active');
		}	
	};

	var toggleMenu = function() {

		// remove drop down class
		$('.dropdown').removeClass('dropdown-active');
		$('.navigation a').removeClass('active');
		$('.search-btn').removeClass('active');

		// toggle classes
		if($body.hasClass('body-menu-active')) {
			closeMenu();
		} else {
			showMenu();
		}
	}

	var showMenu = function() {

		// remove menu active class
		$body.addClass('body-menu-active');

		// force viewport for touch
		// $body.find('.viewport').css({ top:'-' + scrollPos + 'px' });

	};

	var closeMenu = function() {
		
		// remove menu active class
		$body.removeClass('body-menu-active');

		// force viewport for touch
		// $body.find('.viewport').css({ top:'auto' });
		// $('html, body').animate({ scrollTop: scrollPos },0);

	};
	
	return {
		toggleDropdown: toggleDropdown,
		toggleMenu: toggleMenu,
		init: init
	};

}(jQuery));