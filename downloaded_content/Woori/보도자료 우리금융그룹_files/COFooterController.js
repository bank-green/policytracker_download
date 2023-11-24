define(["ezCtrl"], function(ezCtrl) {

	"use strict";

	// set controller name
	var exports = {
		controller : "controller/COFooterController"
	};

	// get controller object
	var footerCtrl = new ezCtrl.controller(exports.controller);

	// create object function
	footerCtrl.getFamilySite = function(target, id){
		$.ajax({
			url : '/getFamilyList.ajax',
			type : 'post',
			dataType : 'json',
			data : {
				id : id
			},
			success : function(data){
				var list = data.familyListMap
				  , fmsNm = ""
				  , drvNm = $('body').data().drvNm;
				
				$.each(list, function(index, item){
					if(drvNm == "eng"){
						fmsNm = item.fmsNmEng;
					}else if(drvNm == "jpn"){
						fmsNm = item.fmsNmJpn;
					}else if(drvNm == "zh"){
						fmsNm = item.fmsNmZhs;
					}else{
						fmsNm = item.fmsNm;
					}
					
					$(target).append('<a href="' + item.siteUrl + '" class="abbr" target="_blank">' + fmsNm + '</a>');
					
				});
				
			},
			error : function(){
				
			}
		});
	};
	
	// set model
	footerCtrl.model = {
		id : {
		},
		classname : {	
			
		},
		immediately : function() {
			
			footerCtrl.getFamilySite("#familySite", "WOORI_FS");
			
			$(".family-site .btn").on("click", function(){
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
			})
		}
	};

	// execute model
	footerCtrl.exec();

	return exports.controller;;
});