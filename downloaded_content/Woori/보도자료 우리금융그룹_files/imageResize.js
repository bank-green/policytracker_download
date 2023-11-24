var conWidth = $('.viewpage-cont .cont').width();
var imageWidth = "", imageHeight = "";

function resizeImg(){
	$('.viewpage-cont .cont').find('img').each(function(){
		if($(this).data().width > conWidth){
			$(this).css('width','100%').css('height','');
		}else{
			$(this).css('width', $(this).data().width)
					.css('height', $(this).data().height)
		}
	});
}

$(window).load(function(){	
	$('.viewpage-cont .cont').find('img').each(function(){
		imageWidth = $(this).width();
		imageHeight = $(this).height();
		
		$(this).data('width', imageWidth).data('height', imageHeight);
	});
	
	resizeImg();
});

$(window).resize(function(){
	conWidth = $('.viewpage-cont .cont').width();
	
	resizeImg();
});
