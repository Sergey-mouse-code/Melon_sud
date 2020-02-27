function popupsInit(newPopup){
	$(".page-width").css("min-height","100%");
	var bodyH = $(window).outerHeight();
	var pageH = $(".page-width").outerHeight();if(pageH < bodyH) {pageH = bodyH;}
	var scrollH = $(window).scrollTop();
	var popupH = $(newPopup).outerHeight();

	if(pageH < popupH)
	{
		if( $("body").hasClass("show-popups-preload") == true )
		{$(".page-width").css("min-height",popupH+30);pageH = popupH+30;}
	}

	var popupTop = scrollH + 20;
	if( popupH < bodyH ){popupTop = (bodyH-popupH)/2 + scrollH;}
	if( (popupTop+popupH) > pageH ){popupTop = pageH - popupH;}

	if( $(newPopup).hasClass("show") != true )
	{$(newPopup).css("top", popupTop+"px");}
}
function mobInit(){
	var mobLen = $(".mobile-nav").length;
	if(mobLen > 0)
	{
		var mobSnav = $(".mobile-nav").eq(0).find(".sub-nav").length;
		for(var i=0;i<mobSnav;i++)
		{
			var sNav = $(".mobile-nav").eq(0).find(".sub-nav").eq(i);
			$(sNav).parent().find(".m-btn").eq(0).append("<span class='sub-btn'></span>");
			if( $(sNav).parent().find(".m-btn").eq(0).hasClass("have-sub") != true )
			{$(sNav).parent().find(".m-btn").eq(0).toggleClass("have-sub");}
		}
	}

	$(document).on("click", ".mobile-nav .sub-btn, .mobile-nav.click-btn .have-sub a", function(){
		if( $(this).parent().hasClass("open") != true )
		{$(this).parent().parent().find(".sub-nav").eq(0).show(200);}
		else
		{$(this).parent().parent().find(".sub-nav").eq(0).hide(200);}
		$(this).parent().toggleClass("open");
		return false;
	});
	$(document).on("click", ".mobile-sbm", function(){
		$("body").toggleClass("show-mobile-nav");
	});
	$(document).mouseup(function (e){
		var div = $("body.show-mobile-nav .mobile-nav-wrap").eq(0);
		if (!div.is(e.target) && div.has(e.target).length === 0) {
			$("body.show-mobile-nav").removeClass("show-mobile-nav");
		}
	});
}
$(document).ready(function(){
	mobInit();
	//Popups
	$(".popup-link").on("click", function(){
		var newPopup = $(this).attr("href");
		if( $("body").hasClass("show-popups-preload") != true ){$("body").toggleClass("show-popups-preload");}
		popupsInit($(newPopup));
		if( $("body").hasClass("show-popups") != true ){$("body").toggleClass("show-popups");if( $(newPopup).hasClass("show") != true ){$(newPopup).toggleClass("show");}}
		else{$(".popup-bl").removeClass("show");$(newPopup).toggleClass("show");}
		$("body").removeClass("show-popups-preload");
		if( $("body").hasClass("show-popups-hide") != true ){$("body").toggleClass("show-popups-hide");}
		return false;
	});
	$(".popup-bl .close").on("click", function(){
		$(".popup-bl").removeClass("show");
		$("body").removeClass("show-popups");
		$("body").removeClass("show-popups-hide");
		$(".page-width").css("min-height","100%");
		return false;
	});
	$(".popup-bl").on("mouseover", function(){ if( $("body").hasClass("show-popups-hide") == true ){$("body").removeClass("show-popups-hide");} });
	$(".popup-bl").on("mouseout", function(){ if( $("body").hasClass("show-popups-hide") != true ){$("body").toggleClass("show-popups-hide");} });
	$("body").on("click", function(){
		$(".show-popups-hide .popup-bl.show").removeClass("show");
		$(".show-popups-hide .page-width").css("min-height","100%");
		$(".show-popups-hide").removeClass("show-popups");
		$(".show-popups-hide").removeClass("show-popups-hide");
	});
});
$(window).resize(function(){
	//Popups
	var popupsLen = $(".popup-bl.show").length;for(var i=0;i<popupsLen;i++){popupsInit($(".popup-bl").eq(i));}
});
$(window).load(function(){
	//Popups
	var popupsLen = $(".popup-bl.show").length;for(var i=0;i<popupsLen;i++){popupsInit($(".popup-bl").eq(i));}
});
$(document).on("keyup",function(e){if( e.key == 'Escape'){$(".popup-bl.show .close").trigger("click");}});