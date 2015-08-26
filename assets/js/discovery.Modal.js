var Modal = (function($) {

	var $body, scrollPos;

	var init = function() {

		// cache body selector
		$body = $('body');

		// bind touch move listener cause fuck iOS
		$body.bind('touchmove', function(e){ 
			if (!$(e.target).closest('.modal').length ) {
				if($body.hasClass('body-modal-open')) {
					e.preventDefault(); 
				}
			}
		});

	};
	
	var toggleModal = function(id) {

		// toggle classes
		if($body.hasClass('body-modal-open')) {
			close();
		} else {
			show(id);
		}
	
	};

	var show = function(id) {

		if($body.hasClass('body-modal-open')) close();
		
		scrollPos = $(document).scrollTop();

		// add modal open class
		$body.addClass('body-modal-open');

		// force viewport for touch
		$body.find('.viewport').css({ top:'-' + scrollPos + 'px' });

		// set timeout for active class to allow css animation
		setTimeout(function() {
			$(id).animate({ scrollTop:0 }, 0);
			$(id).addClass('modal-active');
			$(id).focus();
		},25);
		
	}

	var close = function() {

		// remove modal open class
		$body.removeClass('body-modal-open');

		// force viewport for touch
		$body.find('.viewport').css({ top:'auto' });
		$('html, body').animate({ scrollTop: scrollPos },0);

		// set timeout for active class to allow css animation
		setTimeout(function() {
			$('.modal').removeClass('modal-active');
		},25);
		
	};

	return {
		init: init,
		toggleModal: toggleModal,
		show: show,
		close: close
	};

}(jQuery));