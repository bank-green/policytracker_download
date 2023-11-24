define(["ezCtrl"], function(ezCtrl) {

	"use strict";

	// set controller name
	var exports = {
		controller : "controller/COCommonController"
	};

	// get controller object
	var commonCtrl = new ezCtrl.controller(exports.controller);

	// create object function
	var dataObj = null
	  , bodyData = $('body').data();

	if ( commonCtrl.obj.data != undefined )
	{
		dataObj = commonCtrl.obj.data();
	}
	

	commonCtrl.pagination = function(pageIndex)
	{
		var url = location.pathname;

		jQuery("#pageIndex").val(pageIndex);
		jQuery("#frm_search").attr("action", url).submit();
	};

	commonCtrl.checkbox = {
		allClass : ".checkbox_all",
		singleClass : ".checkbox_single",
		allClick : function($this) {
			if ($this.is(":checked"))
			{
				jQuery(this.singleClass).prop("checked", true);
				jQuery(this.singleClass).closest("div").addClass("on");
			}
			else
			{
				jQuery(this.singleClass).prop("checked", false);
				jQuery(this.singleClass).closest("div").removeClass("on");
			}
		},
		singleClick : function() {
			var allChkCnt = jQuery(this.singleClass).length;
			var selChkCnt = jQuery(this.singleClass + ":checked").length;

			if (allChkCnt == selChkCnt)
			{
				jQuery(this.allClass).prop("checked", true);
				jQuery(this.allClass).closest("div").addClass("on");
			}
			else
			{
				jQuery(this.allClass).prop("checked", false);
				jQuery(this.allClass).closest("div").removeClass("on");
			}
		}
	};

	commonCtrl.extnCheck = function(obj, extns, maxSize)
	{
		var brwtype = jQuery("#cBody").data("brwtype");

		var trgtObj1 = jQuery(obj).closest("#fileTopForm");

		var fileAppdCnt = parseInt(jQuery(trgtObj1).data("fileAppdCnt"), 10);
		var fileLngth = parseInt(jQuery(trgtObj1).data("fileLngth"), 10);
		var delFileLngth = (brwtype == 'mbl' ? jQuery(this).closest(".fileDiv").find("a").length : jQuery(trgtObj1).find("input:checkbox[name^='del']:checked").length);

		var isFile = true, fileName;

		if (fileAppdCnt <= (fileLngth - delFileLngth))
		{
			var msg = brwtype == 'mbl' ? "첨부 가능한 파일 수를 초과하였습니다.\n원본 파일 삭제 후 진행해주세요." : "첨부 가능한 파일 수를 초과하였습니다.\n원본 파일 check 후 진행해주세요.";
			alert(msg);
			isFile = false;
		}
		else
		{
			fileName = jQuery(obj).val();

			if (fileName)
			{
				var fileExtn = fileName.substr(fileName.lastIndexOf(".") + 1);

				if (extns.indexOf(fileExtn.toLowerCase()) < 0)
				{
					alert("지원하지 않는 파일확장자입니다.");
					isFile = false;
				}
				else
				{
					//IE9 이하는 지원을 안함. IE9 이하는 서버단에서 체크
					if (typeof obj.files != "undefined")
					{
						var fileSize = obj.files[0].size;
						var maxFileSize = maxSize * 1024 * 1024;

						if (fileSize > maxFileSize)
						{
							alert("파일 용량을 초과하였습니다.");
							isFile = false;
						}
					}
				}
			}
		}

		var trgtObj2 = jQuery(obj).closest("p");

		if (!isFile)
		{
			jQuery(trgtObj2).children().not(".btn_srch_file").remove();

			jQuery(trgtObj2).append(jQuery(obj).clone(true).val(""));
		}
		else
		{
			//경로 뺀 파일명과 확장자
			var fileValue = fileName.split("\\");
			var fileNm = fileValue[fileValue.length-1];

			if(brwtype == 'mbl')
			{
				jQuery(obj).siblings("a").trigger("click");
			}
			else
			{
				jQuery(trgtObj2).prev().val(fileNm);
			}
		}
	};

	commonCtrl.fnChkByte = function(obj, maxByte, $cByteObj)
	{
		var str = obj.value
		  , str_len = str.length
		  , rbyte = 0
		  , rlen = 0
		  , one_char = ""
		  , str2 = "";

		for ( var i = 0; i < str_len; i++ )
		{
			one_char = str.charAt(i);

			if ( escape(one_char).length > 4 )
			{
				rbyte += 2;				// 한글 2Byte
			}
			else
			{
				rbyte++;				// 영문 등 나머지 1Byte
			}

			if (rbyte <= maxByte)
			{
				rlen = i + 1;			// return할 문자열 갯수
			}
		}

		if ( rbyte > maxByte )
		{
			alert("한글 " + (maxByte / 2) + "자 / 영문 " + maxByte + "자를 초과 입력할 수 없습니다.");
			str2 = str.substr(0, rlen); // 문자열 자르기
			obj.value = str2;

			commonCtrl.fnChkByte(obj, maxByte, $cByteObj);
		}
		else
		{
			$cByteObj.text(rbyte);
		}
	};

	commonCtrl.startAjax = function(config)
	{
		jQuery(".blackBg").stop().fadeIn(100);
		jQuery(".ajaxLoader").stop().fadeIn(200);
		jQuery(".ajaxLoader").css("position","absolute");
		jQuery(".ajaxLoader").css("top",  $(window).height() / 2 - $(".ajaxLoader img").height() / 2 );
		jQuery(".ajaxLoader").css("left", $(window).width() / 2 - $(".ajaxLoader img").width() / 2 );		
		jQuery(".ajaxLoader").focus();
	};
	
	commonCtrl.completeAjax = function()
	{
		setTimeout(function(){
			jQuery(".ajaxLoader").last().stop().fadeOut(200);
			jQuery(".blackBg").stop().fadeOut(200);	
		}, 700);		
	};
	
	commonCtrl.layerPopup = {
		zoneObj : '#layerZone',
		watchObj : '.blackBg',
		layerObj : '',
		closeObj : ['.popClose', '.lyPopClose'],
		watchLayer : function(){			
			var zone = this.zoneObj 
			  , watch = this.watchObj
			  , interval;
			
			$(watch).click(function(){				
				interval = setInterval(function(){
					if($(watch).css('display') == 'none'){
						clearInterval(interval);
						$(zone).remove();
					}					
				}, 100);
			});
		},
		getJspPopup : function(fileName){
			var zone = this.zoneObj 
			  , watch = this.watchObj
			  , layer = this.layerObj
			  , scrollboxObj;
			  
			$.ajax({
				type : 'post',
				url : '/popup/' + fileName,
				dataType : 'html',
				async : false,
				success : function(html){
					
					$('#wrapper').append('<div id="' + zone.replace("#", "") + '">' + html + '</div>');
					
					scrollboxObj = $(zone).find('.scrollbox');
					
					if(scrollboxObj.length != 0){
						scrollboxObj.mCustomScrollbar({
							scrollInertia:50,
							advanced:{
				                updateOnContentResize: true
				            }
						});
					}
					
					$(layer).fadeIn(500);
					$(watch).css("z-index","11").fadeIn(500);
					
					commonCtrl.layerPopup.watchLayer();	// 호출한 레이어 팝업 감시 역활
					commonCtrl.layerPopup.closePopup(); // 호출한 레이어 팝업 닫기 역활
				},
				error : function(){
					alert("죄송합니다. 정보를 가져오는 중 에러가 발생하였습니다. 페이지를 다시 로드합니다.");
					location.reload(true);
				}
			});
		},
		getDoPopup : function(url, fileName, formName){
			var zone = this.zoneObj 
			  , watch = this.watchObj
			  , layer = this.layerObj
			  , scrollboxObj
			  , formObj;
			
			$.ajax({
				type : 'post',
				url : url,
				dataType : 'html',
				async : false,
				data : {
					fn : fileName
				},
				success : function(html){
					
					$('#wrapper').append('<div id="' + zone.replace("#", "") + '">' + html + '</div>');
					
					scrollboxObj = $(zone).find('.scrollbox');
					
					if(scrollboxObj.length != 0){
						scrollboxObj.mCustomScrollbar({
							scrollInertia:50,
							advanced:{
				                updateOnContentResize: true
				            }
						});
					}

					$(layer).fadeIn(500);
					$(watch).css("z-index","11").fadeIn(500);
					
					commonCtrl.layerPopup.watchLayer();	// 호출한 레이어 팝업 감시 역활
					commonCtrl.layerPopup.closePopup(); // 호출한 레이어 팝업 닫기 역활
					
					if(typeof formName !== 'undefined' && formName != ''){
						formObj = $(zone).find('form[name=' + formName + ']');
						
					}
					
				},
				error : function(){
					alert("죄송합니다. 정보를 가져오는 중 에러가 발생하였습니다. 페이지를 다시 로드합니다.");
					location.reload(true);
				}
			});
			 
			return formObj;
		},
		getPopup : function(url, fileName, formName, layerId){
			
			this.layerObj = '#' + layerId; 
			
			if(fileName.indexOf('.jsp') > -1 || fileName.indexOf('.html') > -1){
				this.getJspPopup(fileName);
			}else{
				return this.getDoPopup(url, fileName, formName);
			}
			
		},
		closePopup : function(){
			var watch = this.watchObj;
			
			$(this.closeObj.join(',')).click(function(){
				$(watch).trigger('click');
			});
		}
	};
	
	commonCtrl.browserUpdate = function(){
		//모바일이 아니고 IE가 9이하이고 오늘 하루값이 없을때 보여진다.		
		//IEVerChk()
		var isChk = $.cookie('browserUpgradePop');
				
		if(typeof isChk == 'undefined'){
			isChk = true;
		}
		
		if(isChk == true && IEVerChk())
		{
			commonCtrl.layerPopup.getPopup('BrowserUpdate.jsp');

			//브라우져 오늘 하루 닫기
			$("#chk1").click(function(){
				if ( $(this).is(":checked") )
				{
					$.cookie('browserUpgradePop', false, {path: "/", expires: 1 });
				}
				else
				{
					$.removeCookie('browserUpgradePop', {path : "/"});
				}
			});		
		}
	};
	
	// set model
	commonCtrl.model = {
		id : {
			btn_search : {
				event : {
					click : function() {
						commonCtrl.pagination(1);
					}
				}
			},
			q : {
				event : {
					keydown : function(e) {
						if(e.keyCode == 13)
						{
							commonCtrl.pagination(1);
						}						
					}
				}
			},
			btn_refresh : {
				event : {
					click : function() {
						location.href = location.pathname;
					}
				}
			}
		},
		classname : {
			checkbox_all : {
				event : {
					click : function() {
						commonCtrl.checkbox.allClick($(this));
					}
				}
			},
			checkbox_single : {
				event : {
					click : function() {
						commonCtrl.checkbox.singleClick();
					}
				}
			},
			btn_file_plus : {
				event : {
					click : function() {
						var brwtype = jQuery("#cBody").data("brwtype");
						var addMblFileLngth = jQuery(this).closest(".fileDiv").children(".fileList").find("a").length;
						var addFileLngth = brwtype == 'mbl' ? addMblFileLngth : jQuery(this).closest("#fileTopForm").find("input[type='file']").length;
						var fileAppdCnt = jQuery(this).closest("#fileTopForm").data("fileAppdCnt");

						var isFileAppd = true;

						if (jQuery("#frm_inquiry").data("actionType") == "insert")
						{
							if (addFileLngth >= fileAppdCnt)
							{
								isFileAppd = false;
							}
						}
						else
						{
							var fileLngth = jQuery(this).closest("#fileTopForm").data("fileLngth");
							var delFileLngth = (brwtype == 'mbl' ? addMblFileLngth : jQuery(this).closest("#fileTopForm").find("input:checkbox[name^='del']:checked").length);

							if (addFileLngth >= (fileAppdCnt - fileLngth + delFileLngth))
							{
								isFileAppd = false;
							}
						}

						if(jQuery("#atchFile").val() != '')
						{
							if (isFileAppd)
							{
								if(brwtype == 'mbl')
								{
									var fileName = jQuery(this).prev().val();
									var fileValue = fileName.split("\\");
									var fileNm = fileValue[fileValue.length-1];
	
									var fileDiv = jQuery(this).closest(".fileDiv");
	                                var addFile = '<a href=\"javascript:\" class=\"fileBt btn_minus\" data-btn-seq="-1"><span>'+fileNm+'</span></a>';
	
									jQuery(fileDiv).children(".fileList").append(addFile);
	
									jQuery(fileDiv).children(".fileChoice:last")
									.after(jQuery(fileDiv).children(".fileChoice:first").clone(true).find("input").val("").end());
	
									jQuery(fileDiv).children(".fileChoice:first").hide();
	
									//파일 name setting
									var idxObj = jQuery(this).closest("div");
	
									jQuery(idxObj).data("index", jQuery(idxObj).data("index") + 1);
	
									var fileObj = jQuery(fileDiv).children(".fileChoice:last").find("input[type='file']");
	
									jQuery(fileObj).attr("id", jQuery(fileObj).attr("id") + jQuery(idxObj).data("index"));
									jQuery(fileObj).attr("name", jQuery(fileObj).attr("name") + jQuery(idxObj).data("index"));
									jQuery(fileObj).data("fileSeq", jQuery(fileObj).data("fileSeq") + jQuery(idxObj).data("index"));
									jQuery(".fileList").children("a:last").data("btnSeq", jQuery(".fileList").children("a:last").data("btnSeq") + jQuery(idxObj).data("index"));
	
									if(addMblFileLngth == 1)
									{
										jQuery(fileDiv).children(".fileChoice:last").remove();
									}
								}
								else
								{
									jQuery(this).closest("#fileMidForm").children(".fileDiv:last")
												.after(jQuery(this).closest("#fileMidForm").children(".fileDiv:first").clone(true).find("input").val("").end().addClass("mt10"));
	
									//파일 name setting
									var idxObj = jQuery(this).closest("div");
	
									jQuery(idxObj).data("index", jQuery(idxObj).data("index") + 1);
	
									var fileObj = jQuery(this).closest("#fileMidForm").children(".fileDiv:last").find("input[type='file']");
	
									jQuery(fileObj).attr("id", jQuery(fileObj).attr("id") + jQuery(idxObj).data("index"));
									jQuery(fileObj).attr("name", jQuery(fileObj).attr("name") + jQuery(idxObj).data("index"));
								}
							}
							else
							{
								alert("첨부 가능한 파일 수는 " + fileAppdCnt + "개 입니다.");
							}
						}
						else
						{
							return false;
						}
					}
				}
			},
			btn_file_minus : {
				event : {
					click : function() {
						var trgtIndex = jQuery(this).closest("#fileMidForm").children(".fileDiv").index(jQuery(this).closest(".fileDiv"));

						if (trgtIndex == 0)
						{
							var addFileLngth = jQuery(this).closest("#fileMidForm").find("input[type='file']").length;

							if (addFileLngth == 1)
							{
								jQuery(this).closest("#fileMidForm").children(".fileDiv:last")
										    .after(jQuery(this).closest(".fileDiv").clone(true).find("input").val("").end()).remove();
							}
							else
							{
								jQuery(this).closest("#fileMidForm").children(".fileDiv:last").remove();
							}
						}
						else
						{
							jQuery(this).closest(".fileDiv").remove();
						}
					}
				}
			},
			cbox_del_file : {
				event : {
					change : function() {
						if (!jQuery(this).is(":checked"))
						{
							var trgtObj = jQuery(this).closest("#fileTopForm");

							var fileAppdCnt = parseInt(jQuery(trgtObj).data("fileAppdCnt"), 10);
							var fileLngth = parseInt(jQuery(trgtObj).data("fileLngth"), 10);
							var addFileLngth = jQuery(trgtObj).find("input[type='file']").length;
							var delFileLngth = jQuey(trgtObj).find("input:checkbox[name^='del']:checked").length;

							if (addFileLngth > (fileAppdCnt - fileLngth + delFileLngth))
							{
								jQuery(trgtObj).find(".btn_file_minus:last").trigger("click");
							}
						}
					}
				}
			},
			calenInput : {
				event : {
					click : function () {
						jQuery(this).children("a").addClass('on');
					}
				}
			}
		},
		immediately : function() {
			window.commonCtrl = commonCtrl;
			
			if(bodyData.main){
				commonCtrl.browserUpdate();	
			}
			
		/*	var movePositionObj = $('#indicator');				  
			if(movePositionObj.length > 0){
				$('html, body').animate({scrollTop : movePositionObj.offset().top}, 500);	
			}*/
			
		}
	};

	// execute model
	commonCtrl.exec();

	return commonCtrl;
});