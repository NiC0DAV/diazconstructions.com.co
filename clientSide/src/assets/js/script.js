(function(jQuery) {

	"use strict";

	
/*========== Loader start ================*/
$(window).on('load', function() {
	$('#loader-wrapper').fadeIn();
	setTimeout(function() {
		$('#loader-wrapper').fadeOut();
	}, 500);
});
// $(window).parallaxmouse({
// 	invert: true,
// 	range: 400,
// 	elms: [
// 		{el: $('#shape1'), rate: 0.2},
// 		{el: $('#shape2'), rate: 0.4},
// 		{el: $('#shape4'), rate: 0.3},
// 		{el: $('#shape5'), rate: 0.2},
// 		{el: $('#shape3'), rate: 0.12},
// 		{el: $('#shape6'), rate: 0.25},
// 		{el: $('#shape7'), rate: 0.19}
// 	]
// });
	//Hide Loading Box (Preloader)
	// function handlePreloader() {
	// 	if(jQuery('.preloader').length){
	// 		jQuery('.preloader').delay(200).fadeOut(500);
	// 	}
	// }


	//Update Header Style and Scroll to Top
	function headerStyle() {
		if(jQuery('.main-header').length){
			var windowpos = jQuery(window).scrollTop();
			if (windowpos >= 200) {
				jQuery('.main-header').addClass('fixed-header');
				jQuery('.scroll-to-top').fadeIn(300);
			} else {
				jQuery('.main-header').removeClass('fixed-header');
				jQuery('.scroll-to-top').fadeOut(300);
			}
		}
	}

	headerStyle();

	//Submenu Dropdown Toggle
	if(jQuery('.main-header li.dropdown ul').length){
		jQuery('.main-header li.dropdown').append('<div class="dropdown-btn"></div>');

		//Dropdown Button
		jQuery('.main-header li.dropdown .dropdown-btn').on('click', function() {
			jQuery(this).prev('ul').slideToggle(500);
		});

		//Disable dropdown parent link
		jQuery('.navigation li.dropdown > a').on('click', function(e) {
			e.preventDefault();
		});
	}


	//Hidden Bar Menu Config
	function hiddenBarMenuConfig() {
		var menuWrap = jQuery('.hidden-bar .side-menu');
		// appending expander button
		menuWrap.find('.dropdown').children('a').append(function () {
			return '<button type="button" class="btn expander"><i class="icon fa fa-angle-down"></i></button>';
		});
		// hidding submenu
		menuWrap.find('.dropdown').children('ul').hide();
		// toggling child ul
		menuWrap.find('.btn.expander').each(function () {
			jQuery(this).on('click', function () {
				jQuery(this).parent() // return parent of .btn.expander (a)
					.parent() // return parent of a (li)
						.children('ul').slideToggle();

				// adding class to expander container
				jQuery(this).parent().toggleClass('current');
				// toggling arrow of expander
				jQuery(this).find('i').toggleClass('fa-angle-up fa-angle-down');

				return false;

			});
		});
	}

	hiddenBarMenuConfig();


	//Custom Scroll for Hidden Sidebar
	if (jQuery('.hidden-bar-wrapper').length) {
		jQuery('.hidden-bar-wrapper').mCustomScrollbar();
	}


	//Hidden Bar Toggler
	if (jQuery('.hidden-bar-closer').length) {
		jQuery('.hidden-bar-closer').on('click', function () {
			jQuery('.hidden-bar').removeClass('visible-sidebar');
		});
	}
	if (jQuery('.hidden-bar-opener').length) {
		jQuery('.hidden-bar-opener').on('click', function () {
			jQuery('.hidden-bar').addClass('visible-sidebar');
		});
	}
	
	//Search Popup
	if(jQuery('#search-popup').length){
		
		//Show Popup
		jQuery('.search-box-btn').on('click', function() {
			jQuery('#search-popup').addClass('popup-visible');
		});
		
		//Hide Popup
		jQuery('.close-search').on('click', function() {
			jQuery('#search-popup').removeClass('popup-visible');
		});
	}
	

	//Revolution Slider
	if($('.main-slider .tp-banner').length !== 0){
		// alert('');
		$('.main-slider .tp-banner').show().revolution({
			dottedOverlay:'yes',
			delay:10000,
			startwidth:1200,
			startheight:730,
			hideThumbs:600,

			thumbWidth:80,
			thumbHeight:50,
			thumbAmount:5,

			navigationType:"bullet",
			navigationArrows:"0",
			navigationStyle:"preview3",

			touchenabled:"on",
			onHoverStop:"off",

			swipe_velocity: 0.7,
			swipe_min_touches: 1,
			swipe_max_touches: 1,
			drag_block_vertical: false,

			parallax:"mouse",
			parallaxBgFreeze:"on",
			parallaxLevels:[7,4,3,2,5,4,3,2,1,0],

			keyboardNavigation:"off",

			navigationHAlign:"center",
			navigationVAlign:"bottom",
			navigationHOffset:0,
			navigationVOffset:40,

			soloArrowLeftHalign:"left",
			soloArrowLeftValign:"center",
			soloArrowLeftHOffset:20,
			soloArrowLeftVOffset:0,

			soloArrowRightHalign:"right",
			soloArrowRightValign:"center",
			soloArrowRightHOffset:20,
			soloArrowRightVOffset:0,

			shadow:0,
			fullWidth:"on",
			fullScreen:"off",

			spinner:"spinner4",

			stopLoop:"off",
			stopAfterLoops:-1,
			stopAtSlide:-1,

			shuffle:"off",

			autoHeight:"off",
			forceFullWidth:"on",

			hideThumbsOnMobile:"on",
			hideNavDelayOnMobile:1500,
			hideBulletsOnMobile:"on",
			hideArrowsOnMobile:"on",
			hideThumbsUnderResolution:0,

			hideSliderAtLimit:0,
			hideCaptionAtLimit:0,
			hideAllCaptionAtLilmit:0,
			startWithSlide:0,
			videoJsPath:"",
			fullScreenOffsetContainer: ""
		});
	}

	//Tabs Box
	if(jQuery('.tabs-box').length){
		jQuery('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = jQuery(jQuery(this).attr('data-tab'));
			
			target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
			jQuery(this).addClass('active-btn');
			target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
			target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
			jQuery(target).fadeIn(300);
			jQuery(target).addClass('active-tab');
		});
	}


	//Single Item Carousel
	if (jQuery('.single-item-carousel').length) {
		jQuery('.single-item-carousel').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			smartSpeed: 700,
			autoplay: 5000,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				1024:{
					items:1
				},
				1200:{
					items:1
				}
			}
		});
	}
	
	
	//Shop Tabs Box
	if(jQuery('.shop-tabs-box').length){
		jQuery('.shop-tabs-box .tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = jQuery(jQuery(this).attr('data-tab'));
			
			target.parents('.shop-tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
			jQuery(this).addClass('active-btn');
			target.parents('.shop-tabs-box').find('.tabs-content').find('.shop-tab').removeClass('active-tab');
			jQuery(target).addClass('active-tab');
		});
	}
	
	
	//Tabbed Shop Carousel
	if (jQuery('.tabbed-shop-carousel').length) {
		jQuery('.tabbed-shop-carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 700,
			autoplay: 5000,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				1024:{
					items:3
				},
				1200:{
					items:4
				}
			}
		});
	}
	
	//Related Items Carousel
	if (jQuery('.related-items-carousel').length) {
		jQuery('.related-items-carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 700,
			autoplay: 5000,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				1140:{
					items:2
				},
				1200:{
					items:3
				}
			}
		});
	}
	
	
	//Sponsors Carousel
	if (jQuery('.sponsors-carousel').length) {
		jQuery('.sponsors-carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 500,
			autoplay: 5000,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				800:{
					items:3
				},
				1024:{
					items:4
				},
				1200:{
					items:5
				}
			}
		});
	}
	
	//Footer Gallery Widget Carousel
	if (jQuery('.gallery-widget-carousel').length) {
		jQuery('.gallery-widget-carousel').owlCarousel({
			loop:true,
			margin:10,
			nav:true,
			smartSpeed: 500,
			autoplay: 5000,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:3
				},
				600:{
					items:4
				},
				1024:{
					items:3
				},
				1200:{
					items:4
				}
			}
		});
	}
	
	//Two Column Carousel
	if (jQuery('.two-column-carousel').length) {
		jQuery('.two-column-carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 500,
			autoplay: 5000,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1024:{
					items:2
				},
				1200:{
					items:2
				}
			}
		});
	}
	
	//Member Experties Carousel
	if (jQuery('.experties-carousel').length) {
		jQuery('.experties-carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 700,
			autoplay: 5000,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				1024:{
					items:2
				},
				1200:{
					items:3
				}
			}
		});
	}


	//LightBox / Fancybox
	if(jQuery('.lightbox-image').length) {
		jQuery('.lightbox-image').fancybox({
			openEffect  : 'fade',
			closeEffect : 'fade',
			helpers : {
				media : {}
			}
		});
	}
	
	//Mixitup Gallery
	if(jQuery('.filter-list').length){
		jQuery('.filter-list').mixItUp({});
	}
	
	
	//Sortable Masonary with Filters
	function enableMasonry() {
		if(jQuery('.sortable-masonry').length){
	
			var winDow = jQuery(window);
			// Needed variables
			var jQuerycontainer=jQuery('.sortable-masonry .items-container');
			var jQueryfilter=jQuery('.filter-btns');
	
			jQuerycontainer.isotope({
				filter:'*',
				 masonry: {
					columnWidth : 0 
				 },
				animationOptions:{
					duration:1000,
					easing:'linear'
				}
			});
			
	
			// Isotope Filter 
			jQueryfilter.find('li').on('click', function(){
				var selector = jQuery(this).attr('data-filter');
	
				try {
					jQuerycontainer.isotope({ 
						filter	: selector,
						animationOptions: {
							duration: 1000,
							easing	: 'linear',
							queue	: false
						}
					});
				} catch(err) {
	
				}
				return false;
			});
	
	
			winDow.bind('resize', function(){
				var selector = jQueryfilter.find('li.active').attr('data-filter');

				jQuerycontainer.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 1000,
						easing	: 'linear',
						queue	: false
					}
				});
			});
	
	
			var filterItemA	= jQuery('.filter-btns li');
	
			filterItemA.on('click', function(){
				var jQuerythis = jQuery(this);
				if ( !jQuerythis.hasClass('active')) {
					filterItemA.removeClass('active');
					jQuerythis.addClass('active');
				}
			});
		}
	}
	
	enableMasonry();
	
	
	//Accordion Box
	if(jQuery('.accordion-box').length){
		jQuery(".accordion-box").on('click', '.acc-btn', function() {
			
			var outerBox = jQuery(this).parents('.accordion-box');
			var target = jQuery(this).parents('.accordion');
			
			if(jQuery(this).hasClass('active')!==true){
			jQuery('.accordion .acc-btn').removeClass('active');
			
			}
			
			if (jQuery(this).next('.acc-content').is(':visible')){
				return false;
			}else{
				jQuery(this).addClass('active');
				jQuery(outerBox).children('.accordion').removeClass('active-block');
				jQuery(outerBox).children('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				jQuery(this).next('.acc-content').slideDown(300);	
			}
		});	
	}
	

	//Jquery Spinner / Quantity Spinner
	if(jQuery('.quantity-spinner').length){
		jQuery("input.quantity-spinner").TouchSpin({
		  verticalbuttons: true
		});
	}
	
	
	// Fact Counter
	function factCounter() {
		if(jQuery('.fact-counter').length){
			jQuery('.fact-counter .counter-column.animated').each(function() {
		
				var jQueryt = jQuery(this),
					n = jQueryt.find(".count-text").attr("data-stop"),
					r = parseInt(jQueryt.find(".count-text").attr("data-speed"), 10);
					
				if (!jQueryt.hasClass("counted")) {
					jQueryt.addClass("counted");
					jQuery({
						countNum: jQueryt.find(".count-text").text()
					}).animate({
						countNum: n
					}, {
						duration: r,
						easing: "linear",
						step: function() {
							jQueryt.find(".count-text").text(Math.floor(this.countNum));
						},
						complete: function() {
							jQueryt.find(".count-text").text(this.countNum);
						}
					});
				}
				
			});
		}
	}


	//Price Range Slider
	if(jQuery('.range-slider-price').length){

		var priceRange = document.getElementById('range-slider-price');

		noUiSlider.create(priceRange, {
			start: [ 30, 300 ],
			limit: 1000,
			behaviour: 'drag',
			connect: true,
			range: {
				'min': 10,
				'max': 500
			}
		});

		var limitFieldMin = document.getElementById('min-value-rangeslider');
		var limitFieldMax = document.getElementById('max-value-rangeslider');

		priceRange.noUiSlider.on('update', function( values, handle ){
			(handle ? limitFieldMax : limitFieldMin).value = values[handle];
		});
	}


	//Product Tabs
	if(jQuery('.prod-tabs .tab-btn').length){
		jQuery('.prod-tabs .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = jQuery(jQuery(this).attr('href'));
			jQuery('.prod-tabs .tab-btn').removeClass('active-btn');
			jQuery(this).addClass('active-btn');
			jQuery('.prod-tabs .tab').fadeOut(0);
			jQuery('.prod-tabs .tab').removeClass('active-tab');
			jQuery(target).fadeIn(500);
			jQuery(target).addClass('active-tab');
		});

	}


	//Contact Form Validation
	if(jQuery('#contact-form').length){
		jQuery('#contact-form').validate({
			rules: {
				username: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				phone: {
					required: true
				},
				subject: {
					required: true
				},
				message: {
					required: true
				}
			}
		});
	}


	// Scroll to a Specific Div
	if(jQuery('.scroll-to-target').length){
		jQuery(".scroll-to-target").on('click', function() {
			var target = jQuery(this).attr('data-target');
		   // animate
		   jQuery('html, body').animate({
			   scrollTop: jQuery(target).offset().top
			 }, 1000);

		});
	}


	// Elements Animation
	if(jQuery('.wow').length){
		var wow = new WOW(
		  {
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       true,       // trigger animations on mobile devices (default is true)
			live:         true       // act on asynchronously loaded content (default is true)
		  }
		);
		wow.init();
	}


/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */

	jQuery(window).on('scroll', function() {
		headerStyle();
		factCounter();
	});
	

/* ==========================================================================
   When window is Resized, do
   ========================================================================== */

	jQuery(window).on('resize', function() {
		enableMasonry();
	});

/* ==========================================================================
   When document is loading, do
   ========================================================================== */

	jQuery(window).on('load', function() {
		// handlePreloader();
		enableMasonry();
	});



})(window.jQuery);
