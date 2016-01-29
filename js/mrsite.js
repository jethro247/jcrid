jQuery(document).ready(function($){
	// Hover Class for menu
	$('#navbar li').hover(function() {
		$(this).addClass('side-hover');
			}, function() {
		$(this).removeClass('side-hover');
	});
	
	// Superfish menu dropdown
	$('ul.nav').superfish({ 
		delay:       1000,
		animation:   {opacity:'show'}, 
		speed:       'fast',
		autoArrows:  false,
		dropShadows: false
	});
	
	// Medua Plugin
	$('.media').media();
	
	// MP3 Plugin
	$('.mp3').media({ height: 20, autoplay: true}); 
	
	// Gallery Widget
	$('div.latestGallery div.thumbImg').hover(function() {
		$(this).addClass('thumbImg_Hover');
			}, function() {
		$(this).removeClass('thumbImg_Hover');
	});
	$('div.latestGallery div.thumbImg').css('opacity', '0.6');
		
		$('div.latestGallery div.thumbImg').mouseover(function(){
			$(this).stop().animate({opacity: 1}, {duration:600})
		})
		.mouseout(function(){
			$(this).stop().animate({opacity: 0.6}, {duration:800})
		});
	
	// .
	 
	
	// ..
	// Mini-cart
	$('a.removeitem').live("click", function(){
		alert('remove');
		//$(this).parent().parent().children('p').fadeOut();
	});
	// Website search
	
	



	$('td.searchResultsType').hover(function() {
		$(this).children('span').addClass('search_hover');
			}, function() {
		$(this).children('span').removeClass('search_hover');
	});
	$('input.searchResultsButton, input.mailinglistButton').hover(function() {
		$(this).addClass('hover_button');
			}, function() {
		$(this).removeClass('hover_button');
	});


	
});