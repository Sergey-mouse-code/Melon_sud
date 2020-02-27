function popupsInit(newPopup){
	$(".page-width").css("min-height","100%");
	var bodyH = $(window).outerHeight();
	var pageH = $(".page-width").outerHeight();if(pageH < bodyH) {pageH = bodyH;}
	var scrollH = $(window).scrollTop();
	var popupH = $(newPopup).outerHeight();

	if(pageH < popupH)
	{
		if( $("body").hasClass("show-popups-preload") == true )
		{
			$(".page-width").css("min-height",popupH+10);pageH = popupH+10;
		}
	}

	var popupTop = scrollH + 20;
	if( popupH < bodyH ){popupTop = (bodyH-popupH)/2 + scrollH;}
	if( (popupTop+popupH) > pageH ){popupTop = pageH - popupH;}

	if( $(newPopup).hasClass("show") != true )
	{$(newPopup).css("top", popupTop+"px");}
}
function upInit(){
	var bodyH = $(window).outerHeight();
	var scroll = $(window).scrollTop();
	if(scroll > bodyH && $("body").hasClass("show-up") != true)
	{$("body").toggleClass("show-up");}
	if(scroll < bodyH && $("body").hasClass("show-up") == true)
	{$("body").removeClass("show-up");}

	var sectLen = $(".animate-bl").length;
	for(var i=0;i<sectLen;i++)
	{
		var sectTop = $(".animate-bl").eq(i).offset().top;
		var sectH = $(".animate-bl").eq(i).outerHeight();
		if( (scroll+bodyH-sectH/2) > sectTop && $(".animate-bl").eq(i).hasClass("animated") != true )
		{
			$(".animate-bl").eq(i).toggleClass("animated");
		}
	}
}
function pageInit(){
	setTimeout(function(){
		if( $("body").hasClass("show-page") != true )
		{
			$("body").toggleClass("show-page");
			$(".start-wrap").fadeOut(500);
		}
	}, 1500);
}
$(document).ready(function(){
	if( $("body").hasClass("show-page") == true )
	{$(".start-wrap").hide(0);}

	upInit();
	//Popups
	// var popupsLen = $(".popup-bl").length;for(var i=0;i<popupsLen;i++){popupsInit($(".popup-bl").eq(i));}
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

	$(".select-bl .title").on("click", function(){
		var newSel = $(this).parent();
		if( $(newSel).hasClass("open") != true )
		{
			$(newSel).find("ul").show(200);
			$(newSel).toggleClass("open");
		}
		else
		{
			$(newSel).find("ul").hide(200);
			$(newSel).removeClass("open");
		}
	});
	$(".select-bl li span").on("click", function(){
		var newSel = $(this).parent().parent().parent();
		var newVal = $(this).html();
		$(newSel).find(".title span").html(newVal);
		$(newSel).find("ul .active").removeClass("active");
		$(this).parent().toggleClass("active");
		$(newSel).find("ul").hide(200);
		$(newSel).removeClass("open");
	});
	$(document).mouseup(function (e){
		var div = $(".select-bl.open").eq(0);
		if (!div.is(e.target) && div.has(e.target).length === 0) {
			$(".select-bl.open ul").hide(200);
			$(".select-bl.open").removeClass("open");
		}
	});

	$(".mobile-sbm").on("click",function(){
		$("body").toggleClass("show-mobile-nav");
	});
	$(document).mouseup(function (e){
		var div = $("body.show-mobile-nav .mobile-site-nav").eq(0);
		if (!div.is(e.target) && div.has(e.target).length === 0) {
			$("body.show-mobile-nav").removeClass("show-mobile-nav");
		}
	});

	$(".area-order .ord-sbm").on("click",function(){
		$(".area-order .ord-sbm-bl").attr("style", "display:none;");
		$(".area-order .ord-form").attr("style", "");
	});
	$(".area-order .ord-form form").on("submit",function(){
		$(".area-order .ord-sbm-bl").attr("style", "display:none;");
		$(".area-order .ord-form").attr("style", "display:none;");
		$(".area-order .ord-result").attr("style", "");
		return false;
	});

	$(".up-link").on("click",function(){
		jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: 0},800);
		return false;
	});

	$(".scroll-link").on("click",function(){
		var newBl = $(this).attr("href");
		var temp = $(newBl).offset().top;
		jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: temp},800);
		return false;
	});

	$(".file-load input").on("change",function(){
		var newFile = $(this).val().split('\\');;
		$(this).parent().find(".file-name p").text(newFile[newFile.length - 1]);
	});

	$(".tabs-nav a").on("click",function(){
		if( $(this).hasClass("active") != true )
		{
			$(".tab-bl.focus").hide(0);
			$(".tab-bl.focus").removeClass("focus");
			var oldLink = $(this).parent().parent().find(".active").eq(0);
			var oldBl = $(oldLink).attr("href");
			$(oldLink).removeClass("active");
			$(oldBl).hide(0);

			var newLink = $(this);
			var newBl = $(this).attr("href");
			$(newLink).toggleClass("active");
			$(newBl).fadeIn(500);
		}
		return false;
	});
});
$(window).resize(function(){
	upInit();
	//Popups
	var popupsLen = $(".popup-bl").length;for(var i=0;i<popupsLen;i++){popupsInit($(".popup-bl").eq(i));}
});
$(window).load(function(){
	//Popups
	var popupsLen = $(".popup-bl").length;for(var i=0;i<popupsLen;i++){popupsInit($(".popup-bl").eq(i));}

	$(".start-wrap .play").trigger("click");
});
$(window).scroll(function(){
	upInit();
});
$(document).on("keyup",function(e){
	if( e.key == 'Escape'){$(".popup-bl.show .close").trigger("click");}
});