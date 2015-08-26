var TextSlider = (function($) {

	var Sldr;

	var init = function() {

		// create new Sldr properties
		Sldr = new SliderProps($('.title-slider'),$(''), 0, 0, 0);

		// set slide total
		Sldr.total = Sldr.element.find('.slide').length - 1;

		// set default slide states
		Sldr.element.find('.slide').each(function(index) {

			// add active slide class
			if(index == 0) $(this).addClass('active');

		});

		// auto rotate
		autoRotate();

	};

	var previous = function() {

		// set up correct indexes of next slide
		Sldr.current = Sldr.next;
		Sldr.next = Sldr.next == 0 ? Sldr.total : Sldr.next - 1;

		// animate to new item
		animate();

	};

	var next = function() {

		// set up correct indexes of next slide
		Sldr.current = Sldr.next;
		Sldr.next = Sldr.next == Sldr.total ? 0 : Sldr.next + 1;
		
		// animate to new item
		animate();

	};

	var autoRotate = function() {

		setTimeout(function() {

			next();
			autoRotate();

		}, 5000);

	};

	var animate = function() {

		// set active slide
		Sldr.element.find('.slide').removeClass('active');

		setTimeout(function() {
			Sldr.element.find('.slide:eq(' + Sldr.next + ')').addClass('active');
		}, 1000);

	};

	return {
		init: init,
		next: next,
		previous: previous
	};

}(jQuery));

function SliderProps(element, navigation, total, next, current) {

	this.element = element;
	this.navigation = navigation;
	this.total = total;
	this.next = next;
	this.current = current;

}