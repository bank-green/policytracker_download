$(function(){
    /*
    AUTHOR : 장덕식
    E-MAIL : tessjds@easymedia.net
    DATE : 2018.12.10
    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    $$$$$$      $$$$$$$$$$$     $$$$$$$$        $$$$$$$$         $$$$
    $$$$   $$$$   $$$$$$$   $$$   $$$$$$   $$$$   $$$$$$   $$$$$$$$$$
    $$$   $$$$$$$$$$$$$$   $$$$$   $$$$$   $$$$$   $$$$$   $$$$$$$$$$
    $$$  $$$$$$$$$$$$$$$  $$$$$$$  $$$$$   $$$$$$  $$$$$        $$$$$
    $$$   $$$$$$$$$$$$$$   $$$$$   $$$$$   $$$$$   $$$$$   $$$$$$$$$$
    $$$$   $$$$   $$$$$$$   $$$   $$$$$$   $$$$   $$$$$$   $$$$$$$$$$
    $$$$$$      $$$$$$$$$$$     $$$$$$$$        $$$$$$$$         $$$$
    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    */
	$("div.downside .gnb.clear .one-dep a span").on("click", function(){
		if ( $(this).parent().parent().index() == 5 ) {
			location.href='/kor/recruit/recruit-announcement/list.do';
		} else {
			if($("#visual-main").length == 0){ // Two-Depth로 들어가 있는 경우
				location.href ="/kor/main/index.do?goDetail=Y&pageNumber="+$(this).parent().parent().index();
			}else{
				$(".btn-slide").eq( $(this).parent().parent().index() ).trigger("click");
				$(".visual-main .visual .btn-view").trigger("click");
				$(".swiper-slide-active .bg-over .tit").focus();
				mouse_out();
			}
		}
    });

    /* gnb */
    $(".gnb .one-dep span").each(function(q){
        $(this).on("mouseover", function(){
            clearInterval(mouseoutInterval);
			$("#wrap").addClass("gnb-open");
			$("#header .gnb .one-dep .two-dep").stop(true, true).slideDown(300);
			$("#header .gnb-bg").stop(true, true).slideDown(300);
        });
    });

	$("#header").on("mouseover", function(){
		clearInterval(mouseoutInterval);
	});

    $(".gnb-bg").on("mouseleave", function(){
        clearInterval(mouseoutInterval);
        mouseoutInterval = setInterval("mouse_out()", 300);
    });

    /*$(".gnb .one-dep").on("mouseenter", function(){
        clearInterval(mouseoutInterval);
        $("#header .gnb .one-dep .two-dep").stop(true, true).fadeIn(300);
        $("#header .gnb-bg").stop(true, true).slideDown(200);
    });

    $(".gnb-bg").on("mouseleave", function(){
        clearInterval(mouseoutInterval);
        mouseoutInterval = setInterval("mouse_out()", 200);
    });

    $("#header .gnb .one-dep").each(function(q){
        $(this).find("a").mouseenter(function(){
            $("#header .gnb .two-dep").eq(q).prev(".one").css("color","#0067ac");
        });
        $(this).find("a").mouseleave(function(){
            $("#header .gnb .two-dep").eq(q).prev(".one").css("color","#000");
        });
    });*/

	//모바일 전체메뉴
	var mobGnbN = -1;
	$(".allmenu-cont .one-dep").each(function(q){
		$(this).click(function(){
			if(isGnb == 'MOB'){
				if(mobGnbN != q){
					$(".allmenu-cont .one-dep .two-dep-div").stop(true, true).slideUp(300);
					$(".allmenu-cont .one-dep").removeClass("open");
					mobGnbN = q;
					$(".allmenu-cont .one-dep").eq(mobGnbN).find(".two-dep-div").stop(true, true).slideDown(300);
					$(".allmenu-cont .one-dep").eq(mobGnbN).addClass("open");
				}else{
					$(".allmenu-cont .one-dep .two-dep-div").stop(true, true).slideUp(300);
					$(".allmenu-cont .one-dep").removeClass("open");
					mobGnbN = -1;
				}
			}
		});
	});

    //header 언어변경
    $(".language-box .btn-language").on("click", function(){
        if(!$(this).hasClass("on")) {
            $(this).addClass("on");
            $(".language-box .slide-cont").show();
        } else {
            $(this).removeClass("on");
            $(".language-box .slide-cont").hide();
        }
    }).focusout(function(){
        setTimeout(function(){
            $(".language-box .btn-language").removeClass("on");
            $(".language-box .slide-cont").hide();
        }, 200);
    });
	
	//3depth
	$("#indicator .tab-div a").each(function(q){
		$(this).click(function(){
			if(!$(this).hasClass("on")){
				$("#indicator .tab-div a").removeClass("on");
				$("#indicator .mobile-tab").text($(this).text());
				if($("#indicator").hasClass("mobile")){
					$("#indicator .tab-div").stop(true, true).slideUp(300);
				}
				$("#indicator .tab-div a").eq(q).addClass("on");
				$("#indicator .mobile-tab").removeClass("on");

			}
		});
	});
	$("#indicator .mobile-tab").click(function(){
		if(!$(this).hasClass("on")){
			$(this).addClass("on");
			$("#indicator .tab-div").stop(true, true).slideDown(300);
		}else{
			$(this).removeClass("on");
			$("#indicator .tab-div").stop(true, true).slideUp(300);
		}
	});
	
	//인디게이터 없을시
	if($("#indicator").size() < 1){
		$(".ci-div").addClass("no-tab");
		$(".loca-div").addClass("no-tab");
		$(".domestic-public").addClass("no-tab");
		$(".basic-cont").addClass("no-tab");
		$(".social-upside").addClass("no-tab");
	}

	/* 국내 네트워크 */
	$(".network-div .top-area .local-image #image-map area").click(function(){
		if(!$(this).parents(".local-image").hasClass("on")){
			$(this).parents(".local-image").addClass("on");
			$(this).parents(".local-image").find(".default img").attr("src", $(this).parents(".local-image").find(".default img").attr("src").replace(".png", "_on.png"));
			$(this).parents(".local-image").find(".slide").show();
		}else{
			$(this).parents(".local-image").removeClass("on");
			$(this).parents(".local-image").find(".default img").attr("src", $(this).parents(".local-image").find(".default img").attr("src").replace("_on.png", ".png"));
			$(this).parents(".local-image").find(".slide").hide();
		}
	});

	$(".network-div .top-area .local-image #image-map2 area").click(function(){
		if(!$(this).parent("#image-map2").hasClass("on")){
			$(this).parent("#image-map2").addClass("on");
			$(".network-div .top-area .local-image .img2").stop(true, true).slideDown(100);
			$(this).parents(".local-image").find(".mob-default .img1").attr("src", $(this).parents(".local-image").find(".mob-default .img1").attr("src").replace(".png", "_on.png"));
		}else{
			$(this).parent("#image-map2").removeClass("on");
			$(".network-div .top-area .local-image .img2").stop(true, true).slideUp(100);
				$(this).parents(".local-image").find(".mob-default .img1").attr("src", $(this).parents(".local-image").find(".mob-default .img1").attr("src").replace("_on.png", ".png"));
		}
	});

	/* 글로벌 네트워크 */
	//탭
	var globalTabN = 0;
	$(".network-div .map-area map area").each(function(q){
		$(this).hover(function(){
			$(".network-div .map-area .hide-img img").eq(q).show();
		},function(){
			$(".network-div .map-area .hide-img img").hide();
		});
	});
	$(".network-div .map-guide .global-tab a").each(function(q){
		$(this).click(function(){
			if(globalTabN !=q){
				$(".network-div .map-guide .global-tab a").removeClass("on");
				$(".network-div .map-guide .area").removeClass("on");
				$(".network-div .map-area .area").eq(globalTabN).find(".accor-div .accor-list .country").show();
				$(".network-div .map-area .area").eq(globalTabN).find(".head").removeClass("open");
				$(".network-div .map-area .area").eq(globalTabN).find(".head").text($(".network-div .map-area .area").eq(globalTabN).find(".select-all > a").eq(0).text());
				/*$(".network-div .map-area .area").eq(globalTabN).find(".select-all").stop(true, true).slideUp(0);*/
				$(".network-div .map-area .area").eq(globalTabN).find(".select-all").find("a").removeClass("on");
				$(".network-div .map-area .area").eq(globalTabN).find(".select-all").find("a").eq(0).addClass("on");
				globalTabN = q;
				$(".network-div .map-guide .global-tab a").eq(globalTabN).addClass("on");
				$(".network-div .map-guide .area").eq(globalTabN).addClass("on");
			}
		});
	});
	//지도클릭
	$(".network-div .map-guide .global map area").each(function(q){
		$(this).click(function(){
			$(".network-div .map-guide .global-tab a").removeClass("on");
			$(".network-div .map-guide .area").removeClass("on");
			$(".network-div .map-guide .global-tab a").eq(q+1).addClass("on");
			$(".network-div .map-guide .area").eq(q+1).addClass("on");
			globalTabN = q+1;
		});
	});

	//나라 셀렉트박스
	$(".network-div .map-area .area .accor-div .select-div .head").on("click", function(){
		if(!$(this).hasClass("open")){
			$(this).addClass("open");
			$(this).parent().find(".select-all").stop(true, true).slideDown(250);
		}else{
//			$(this).removeClass("open");
			$(this).parent().find(".select-all").stop(true, true).slideUp(250);
		}
	});

	//나라선택
	$(".network-div .map-area .area").each(function(q){
		$(this).find(".accor-div .select-all a").each(function(k){
			$(this).click(function(){
				$(this).parent(".select-all").find("a").removeClass("on");
				$(this).addClass("on");
				$(this).parents(".select-div").find(".head").removeClass("open");
				$(this).parents(".select-div").find(".head").text($(this).text());
				/*$(this).parent(".select-all").stop(true, true).slideUp(250);*/
				if(k == 0){
					$(".network-div .map-area .area").eq(q).find(".accor-div .accor-list .country").show();
				}else{
					/*$(".network-div .map-area .area").eq(q).find(".accor-div .accor-list .country").hide();*/
					var offset = $(".network-div .map-area .area").eq(q).find(".accor-div .accor-list .country").eq(k-1).offset();
					$("html,body").animate({scrollTop:offset.top-($(window).height()/2)}, 400);
				}
			});
		});
	});
	
	//아코디언 아이콘
	$(".network-div .map-area .area .accor-div .accor-list .country .office-list .office").each(function(){
		if($(this).find(".open-div-accor").size() > 0){
			$(this).find(".open-div").addClass("has-accor")
		}
	});

	//아코디언 열닫
	var accorOpenN = -1;
	var heightAll = 0;
	$(".network-div .map-area .area .accor-div .accor-list .country .office-list .office .open-div").each(function(q){
		$(this).on("click", function(){
			if($(this).hasClass("has-accor")){
				if(accorOpenN != q){
					$(".network-div .map-area .area .accor-div .accor-list .country .office-list .office .open-div").removeClass("open");
					$(".network-div .map-area .area .accor-div .accor-list .country .office-list .office .open-div-accor").stop(true, true).slideUp(0);
					accorOpenN = q;
					$(this).addClass("open");
					$(this).parent().find(".open-div-accor").stop(true, true).slideDown(0, function(){
						$(this).parent().find(".open-div-accor .open-accor-list").each(function(k){
							/*heightAll += $(this).parents(".open-div-accor").find(".open-accor-list").eq(q).outerHeight();
							if($(window).width() >  981){
								if(heightAll > 460){
									if($(this).parents(".open-div-accor").hasClass("mCustomScrollbar")){
										$(this).parents(".open-div-accor").mCustomScrollbar("destroy");
									}
									
									$(this).parents(".open-div-accor").addClass("scroll");
									$(this).parents(".open-div-accor").mCustomScrollbar({
										scrollInertia:50,
										advanced:{
											updateOnContentResize: true
										}
									});
								}else{
									$(this).parents(".open-div-accor").mCustomScrollbar("destroy");
								}
							}else{
								if(heightAll > 280){
									if($(this).parents(".open-div-accor").hasClass("mCustomScrollbar")){
										$(this).parents(".open-div-accor").mCustomScrollbar("destroy");
									}
									
									$(this).parents(".open-div-accor").addClass("scroll");
									$(this).parents(".open-div-accor").mCustomScrollbar({
										scrollInertia:50,
										advanced:{
											updateOnContentResize: true
										}
									});
								}else{
									$(this).parents(".open-div-accor").mCustomScrollbar("destroy");
								}
							}*/
						});
						if($(this).hasClass("mCustomScrollbar")){
							$(this).mCustomScrollbar("destroy");
						}

						$(this).addClass("scroll");
						$(this).mCustomScrollbar({
							scrollInertia:50,
							advanced:{
								updateOnContentResize: true
							}
						});
						heightAll = 0;
					});
				}else{
					$(".network-div .map-area .area .accor-div .accor-list .country .office-list .office .open-div").removeClass("open");
					$(".network-div .map-area .area .accor-div .accor-list .country .office-list .office .open-div-accor").stop(true, true).slideUp(0);
					accorOpenN = -1
				}
			}
		});
	});
	/* //글로벌 네트워크 */
	
	/* 연혁 tab */
	var historyTabN = 0;
	$(".swiper-history .swiper-slide").each(function(q){
		$(this).click(function(){
			if(historyTabN != q){
				$(".swiper-history .swiper-slide").removeClass("on");
				$(".history-content .tab-content").hide();
				historyTabN = q;
				$(".swiper-history .swiper-slide").eq(historyTabN).addClass("on");
				$(".history-content .tab-content").eq(historyTabN).show();
				if($(".swiper-history").css("top").split("p")[0] == 0){
					TweenMax.to($("html, body"), 0.6, {scrollTop : $(".history-div .con-area .history-content").offset().top - 40, ease:Power3.easeOut});
				}

				historySwiper.slideTo(q, 300);
			}
		});
	});


    /* 수상내역 swiper */
    var awardYearsSwiper = new Swiper('.swiper-award', {
        slidesPerView : 5,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on:{
            click: function(){
                /* 2018-12-13 이석화사원 요청으로 인한 주석 */
                /*$(".award-box .swiper-slide").removeClass("on");
                $(".award-box .swiper-slide").eq(awardYearsSwiper.clickedIndex).addClass("on");

                $(".award-box .tab-cont .tab").hide();
                $(".award-box .tab-cont .tab").eq(awardYearsSwiper.clickedIndex).show();*/
            },
        },
    });

    var awardActive;
    $(".award-box .cover > a").each(function(q){
        $(this).on("click", function(){
            awardActive = $(".swiper-award .swiper-slide.swiper-slide-active").index();
            if(q) awardYearsSwiper.slideTo(awardActive+1, 300, false);
            else awardYearsSwiper.slideTo(awardActive-1, 300, false);
        })
    });

    /* 스포츠단 - 농구단 siwper */
    var sports_baseball = new Swiper('.swiper-basketball', {
        slidesPerView :2,
        centeredSlides : true,
        spaceBetween: 0,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            //type: 'bullets',
            type: 'fraction',
            //type : 'progressbar',
            //type : 'custom',
        },
		breakpoints: {
			768: {
				slidesPerView :1.5,
			}
		},
    });

    /* 스포츠단 - 배구단 siwper */
    var sports_baseball = new Swiper('.swiper-vball', {
        slidesPerView :2,
        centeredSlides : true,
        spaceBetween: 0,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            //type: 'bullets',
            type: 'fraction',
            //type : 'progressbar',
            //type : 'custom',
        },
		breakpoints: {
			768: {
				slidesPerView :1.5,
			}
		},
    });

    /* 스포츠단 - 사격단 siwper */
    var sports_baseball = new Swiper('.swiper-shoot', {
        slidesPerView :2,
        centeredSlides : true,
        spaceBetween: 0,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            //type: 'bullets',
            type: 'fraction',
            //type : 'progressbar',
            //type : 'custom',
        },
		breakpoints: {
			768: {
				slidesPerView :1.5,
			}
		},
    });

    /* 툴팁 박스 */
    $(".btn-tooltip").each(function(q){
        $(this).on("click", function(){
            //reset
            $(".btn-tooltip").removeClass("on");
            $(".btn-tooltip").find(".tooltip").stop(true, true).fadeOut(300);
            if($(this).find(".tooltip").is(":hidden")) {
                $(this).addClass("on");
                // $(this).find(".tooltip").css("top", -($(this).find(".tooltip").innerHeight() + 14));
                $(this).find(".tooltip").css("top", 38);
                $(this).find(".tooltip").stop(true, true).fadeIn(300);
            } else {
                $(this).removeClass("on");
                $(this).find(".tooltip").stop(true, true).fadeOut(300);
            }
        })
    });


    /* gnb 전체메뉴 */
    $("#header").find(".btn-gnb").on("click", function(){
        if(!$(this).hasClass("close")) {
            $(this).addClass("close");
            $("#wrap .btn-gnb-sub").addClass("close");
            $("#wrap").addClass("wht");
            $("#header").find(".allmenu-cont").stop(true, true).fadeIn(0, function(){
				$("#header .upside").addClass("bg");
			});

            $(".black-bg").stop(true, true).fadeIn(0);
			$("body").css("overflow","hidden");
			if(isGnb == "PC"){
				$(".allmenu-cont").css("height",$(window).height());
			}else{
				$(".allmenu-cont").css("height",$(window).height() - 52);
				$("#header .logo").hide();
			}
			$("#header .language-box").css("display","block");
        } else {
            $(this).removeClass("close");
            $("#wrap .btn-gnb-sub").removeClass("close");
            $("#wrap").removeClass("wht");
			$("#header .logo").show();
            $("#header").find(".allmenu-cont").stop(true, true).fadeOut(0);
			 $("#header .upside").removeClass("bg");
			$(".black-bg").stop(true, true).fadeOut(0);
			$("body").css("overflow","");
			$(".allmenu-cont").css("height","");
			$("#header .language-box").css("display","");
        }
    });

    /* select form group */
    $(document).on("change", ".form-group select", function(e){
        $(this).parent().find(".select-box span").text($(this).children("option:eq(" + e.target.selectedIndex + ")").text());
    });

    /* 파일다운로드 - 파일이 여러개 일때 */
    $(".btn-download.multi").each(function(q){
        $(this).find(".btn").on("click", function(){
            if($(this).next(".multi-pop").is(":hidden")) {
                //이미 띄워진창 있으면 닫기
                $(".btn-download.multi").removeClass("on");
                $(".btn-download.multi .btn").removeClass("close");
                $(".btn-download.multi .multi-pop").hide();


                $(this).addClass("close");
                $(this).parent().addClass("on");
                $(this).parent().parent().addClass("on");
                $(this).next(".multi-pop").stop(true, true).fadeIn(300);
            } else {
                $(this).removeClass("close");
                $(this).parent().removeClass("on");
                $(this).parent().parent().removeClass("on");
                $(this).next(".multi-pop").stop(true, true).fadeOut(300);
            }
        })
    });


    /* 탭 */
    $(".head-tab a").each(function(q){
        $(this).on("click", function(){
            $(".head-tab a").removeClass("on");
            $(this).addClass("on");
            $(".head-tab-cont .cont").removeClass("on");
            $(".head-tab-cont .cont").eq(q).addClass("on");
        })
    })

	$(window).scroll(function(){
		//연혁
		if($(".swiper-history").size() > 0){
			if($(window).scrollTop() > $(".history-div .con-area .history-content").offset().top - 40){
				$(".swiper-history").css({"position":"fixed","top":"0"});
			}else{
				$(".swiper-history").css({"position":"absolute","top":"-40px"});
			}
			if($(window).scrollTop() >= $(".history-div .con-area .history-content").offset().top){
				$(".hidden-area").css("position","fixed");
			}else{
				$(".hidden-area").css("position","absolute");
			}
		}

		//그룹개요, 사회공헌가치체계 스크롤모션
		if($(".scroll-motion").size() != 0 ) {
			$(".scroll-motion").each(function(q){
				if($(window).scrollTop() > $(".scroll-motion").eq(q).offset().top - 600) {
					TweenMax.to($(".scroll-motion").eq(q), 1.5, {opacity:1, top:0, ease:Power3.easeOut});
				}
			});
		}
});$(window).scroll();
	
	var prevCeoWidth = 872;
	var isDevice = "PC";
	var historyW;
	$(window).resize(function(){
		if($(window).width() > 1024) {
            isGnb = "PC";
			$(".two-dep-div").css({"display":"", "overflow":""});
			$("#header .allmenu-cont .one-dep").removeClass("open");
			$("#header .allmenu-cont").css("height","") //2019-01-15 추가
			mobGnbN = -1;
		}else if($(window).width() <= 1024 && $(window).width() >768) {
            isGnb = "TABL";
			$(".two-dep-div").css({"display":"", "overflow":""});
			$("#header .allmenu-cont .one-dep").removeClass("open");
			$("#header .allmenu-cont").css("height",$(window).height()); //2019-01-15 추가
			mobGnbN = -1;
        } else {
            isGnb = "MOB";
		}

		if($(window).width() > 1263){

			//CI
			$(".ci-div .con-area .ci-list-div .list .ci-type").each(function(){
				$(this).css("height","");
			});
		}else if($(window).width() <= 1263 && $(window).width() > 964){
			//CI
			$(".ci-div .con-area .ci-list-div .list .ci-type").each(function(){
				$(this).css("height", $(this).width());
			});
		}else{
			//CI
			$(".ci-div .con-area .ci-list-div .list .ci-type").each(function(){
				$(this).css("height", $(this).width());
			});
		}

		if($(window).width() > 964){
			//3depth
			$("#indicator").removeClass("mobile");
			$("#indicator .tab-div").css("display","table");

			//국내네트워크 전화
			$(".network-div .con-area .list-div .list .txt-area .txt-div .info li .tel").attr("href","javascript:");
		}else{
			//3depth
			$("#indicator").addClass("mobile");
			$("#indicator .mobile-tab").removeClass("on");
			$("#indicator .tab-div").css("display","none");

			//국내네트워크 전화
			$(".network-div .con-area .list-div .list .txt-area .txt-div .info li .tel").each(function(){
				var thisTel = $(this).text();
				$(this).attr("href","tel:" + thisTel)
			});

		}
		/* 연혁 swiper padding */
		if($(".swiper-history").size() > 0){
			$(".hidden-area").css("left",$(".history-div .con-area .history-content").offset().left);
		}
		if($(window).width() >= 981) {
			if($(".swiper-history").size() > 0){
				$(".history-div .con-area .swiper-history").css("padding-left", $(".history-content .tab-content .year-list .cont").offset().left);
				$(".history-div .con-area .swiper-history").css("padding-right", $(window).width() - $(".history-content .tab-content .year-list .cont").offset().left - $(".history-div .con-area .swiper-history .swiper-slide").width());
			}
		} else {
			if($(window).width() < 981) {
				$(".history-div .con-area .swiper-history").css("padding-left", 80);
				$(".history-div .con-area .swiper-history").css("padding-right", 80);
			}

			if($(window).width() < 769) {
				$(".history-div .con-area .swiper-history").css("padding-left", 65);
				$(".history-div .con-area .swiper-history").css("padding-right", 65);
			}

			if($(window).width() < 641) {
				$(".history-div .con-area .swiper-history").css("padding-left", 60);
				$(".history-div .con-area .swiper-history").css("padding-right", 60);
			}

			if($(window).width() < 415) {
				$(".history-div .con-area .swiper-history").css("padding-left", 50);
				$(".history-div .con-area .swiper-history").css("padding-right", 50);
			}

			if($(window).width() < 320) {
				$(".history-div .con-area .swiper-history").css("padding-left", 45);
				$(".history-div .con-area .swiper-history").css("padding-right", 45);
			}
		}


		//주가정보 iframe resize
		if($(window).width() >= 950 ) {
			$("#content").find("iframe").css("width", 950);
		} else {
			$("#content").find("iframe").css("width", "100%");
		}

		//CEO 인사말, 프로필
		if($(".ceo-div").size() > 0){
			if($(window).width() > 1135){
				$(".ceo-div .ceo-img").css("width", prevCeoWidth - ( 385 - $(".ceo-div .txt-div").offset().left));
			}else{
				$(".ceo-div .ceo-img").css("width", "");
			}
		}


		//연혁 탭 width
		historyW = $(".history-div .con-area .swiper-history .swiper-slide").width() + 30;

		
		/* 2019-01-03 삭제 
		사회책임경영 float 되는 이미지 높이 값 
		if($(".social-contents").size() > 0){
			if( $(window).width() < 1281 && $(window).width()  > 962 ){
				$(".social-contents").each(function(q){
					var txtRightHeight = $(this).find(".social-txt-info.txt-right").outerHeight();
					var txtLeftHeight = $(this).find(".social-txt-info.txt-left").outerHeight();
					if( $(this).find(".social-txt-info.txt-right").outerHeight() > 500 ){
						$(".social-contents").eq(q).find(".img-left").css("height", txtRightHeight );
					}else{
						$(".social-contents").eq(q).find(".img-left").css("height", "auto" );
					}
					if( $(this).find(".social-txt-info.txt-left").outerHeight() > 500 ){
						$(".social-contents").eq(q).find(".img-right").css("height", txtLeftHeight );
					}else{
						$(".social-contents").eq(q).find(".img-right").css("height", "auto" );
					}
				});
			}else{
				$(".social-contents .img-left").css("height", "auto" );
				$(".social-contents .img-right").css("height", "auto" );
			}
		}*/

	});$(window).resize();

	$(window).load(function(){
		/* 연혁 swiper */
		historySwiper = new Swiper('.swiper-history', {
			slidesOffsetBefore : 0,
			slidesOffsetAfter : 0,
			slidesPerView : "auto",
			spaceBetween: 30,
			// slideToClickedSlide: true,
		});

		$(window).resize(function(){
			//네트워크 리스트
			$(".network-div .con-area .list-div .list .txt-area").each(function(q){
				if($(window).width() > 1007){
					if($(this).outerHeight() + 50 > $(this).parent().find(".img-area").height()){
						$(this).css("padding-bottom","100px");
					}
				}else{
					$(this).css("padding-bottom","");
				}
			});

		});$(window).resize();

	});


	/* 푸터 */
	/*$(".family-site .btn").on("click", function(){
		if(!$(this).hasClass("on")) {
			$(this).addClass("on");
			$(this).siblings(".slide-cont").stop(true, true).slideDown(0);
		} else {
			$(this).siblings(".slide-cont").stop(true, true).slideUp(0, function(){
				$(".family-site .btn").removeClass("on");
			});
		}
	});
	$(".family-site .slide-cont").on("mouseleave", function(){
		$(".family-site .slide-cont").stop(true, true).slideUp(0, function(){
			$(".family-site .btn").removeClass("on");
		});
	})*/
});
var historySwiper;
var mouseoutInterval;
function mouse_out()
{
	clearInterval(mouseoutInterval);
    $("#wrap").removeClass("gnb-open");
    $("#header .gnb .one-dep .two-dep").stop(true, true).slideUp(200);
    $("#header .gnb-bg").stop(true, true).slideUp(300);
}