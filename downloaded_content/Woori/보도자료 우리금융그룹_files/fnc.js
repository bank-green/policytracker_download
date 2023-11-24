define([], function() {

	"use strict";

	// set controller name
	var exports = {
		controller : "lib/fnc"
	};

	// get controller object
	window.constructor.prototype.fnc = {};

	/**
	 * 바이트 문자 입력가능 문자수 체크
	 *
	 * @param id : tag id
	 * @param title : tag title
	 * @param maxLength : 최대 입력가능 수 (byte)
	 * @returns {Boolean}
	 */
	fnc.maxLengthCheck = function(id, title, maxLength)
	{
		var obj = jQuery("#" + id);

		if (maxLength == null)
		{
			maxLength = obj.attr("maxLength") != null ? obj.attr("maxLength") : 1000;
		}

		if (Number(fnc.byteCheck(obj)) >= Number(maxLength))
		{
			alert(title + "이(가) 입력 가능 문자 수를 초과하였습니다.\n(영문, 숫자, 일반 특수문자 : " + maxLength + " / 한글, 한자, 기타 특수문자 : " + parseInt(maxLength/2, 10) + ").");
			obj.focus();
			return false;
		}
		else
		{
			return true;
		}
	}

	/**
	 * current의 input태그의 maxlength가 되면 next로 포커스 이동
	 *
	 * @param id : tag id
	 * @param title : tag title
	 * @param maxLength : 최대 입력가능 수 (byte)
	 * @returns {Boolean}
	 */
	fnc.moveNext = function(current, next)
	{
		var maxlength = jQuery(current).attr("maxlength");
		if(jQuery(current).val().length == maxlength)
		{
			jQuery(next).focus();
		}
	}

	/**
	 * 바이트수 반환
	 *
	 * @param el : tag jquery object
	 * @returns {Number}
	 */
	fnc.byteCheck = function(el)
	{
		var codeByte = 0;

		for (var idx = 0; idx < el.val().length; idx++)
		{
	        var oneChar = escape(el.val().charAt(idx));

	        if ( oneChar.length == 1 )
	        {
	            codeByte ++;
	        }
	        else if (oneChar.indexOf("%u") != -1)
	        {
	            codeByte += 2;
	        }
	        else if (oneChar.indexOf("%") != -1)
	        {
	            codeByte ++;
	        }
	    }

	    return codeByte;
	}

	/*
	 * fnc.trace
	 * note : 콘솔창 로그 찍기
	 */
	fnc.trace = function()
	{
		var log = "";

		for (var i = 0; i < arguments.length; i++)
		{
		   log = (log == "" ) ? arguments[i] : log + " " + arguments[i];
		}

		if (typeof console != "undefined")
		{
			console.log(log)
		}
	}

	/*
	 * fnc.nvl
	 * note : 데이터가 null 또는 undefined이면 값을 치환한다.
	 */
	fnc.nvl = function(val, chgStr)
	{
		if (val == undefined || val == null)
		{
			return chgStr;
		}
		else
		{
			return val;
		}
	}

	/*
	 * fnc.replaceAll
	 * str 문자열에서 findStr문자열을 찾아 changeStr문자열로 교체한다.
	 */
	fnc.replaceAll = function(str, findStr, changeStr)
	{
	    return str.split(findStr).join(changeStr);
	}

	/*
	 * fnc.checkMobile
	 * 모바일기기 접속 여부를 반환
	 */
	fnc.checkMobile = function()
	{
		var UserAgent = navigator.userAgent;

		if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
		{
			// 모바일일 경우 (변동사항 있을경우 추가 필요)
			return true;
		}
		else
		{
			// 모바일이 아닐 경우
			return false;
		}
	};
	
	fnc.IEVersionCheck = function()
	{
		var word;
 		var version = "N/A";
 		var agent = navigator.userAgent.toLowerCase();
 		var name = navigator.appName;
 		// IE old version ( IE 10 or Lower )
 		if ( name == "Microsoft Internet Explorer" )
 		{
 			word = "msie ";
 		}
 		else 
 		{
    		if ( agent.search("trident") > -1 ) 
    		{
    			word = "trident/.*rv:";
    		}                     
     		else if ( agent.search("edge/") > -1 )
     		{
     			word = "edge/";
     		}
    	}
 		var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" );
 		if (  reg.exec( agent ) != null  )
 		{
 			version = RegExp.$1 + RegExp.$2;		
 		}
 		return version;
	}

	fnc.getMessage = function(code)
	{
		var msg = "";

		try
		{
			msg = window.ui[code];

		}
		catch(e)
		{
			alert(e);
		}

		if (typeof msg == "undefined")
		{
			msg = "";
			alert("No registered messages. Please check again.[code:" + code + "]");
		}

		return msg;
	};

	/**
	 * Left 함수
	 *
	 * @param str : 자르려는 문자열
	 * @param n : 자르려는 왼쪽 위치
	 * @returns {String}
	 */
	fnc.leftString = function(str, n)
	{
		if (n <= 0)
		{
		    return "";
		}
		else if (n > String(str).length)
		{
		    return str;
		}
		else
		{
		    return String(str).substring(0,n);
		}
	}

	/*
	 * fnc.setTelFocus
	 * 전화번호 포커스 이동
	 */
	fnc.setTelFocus = function(obj, curPstn)
	{
		var cmprArr = ["010","011","016","017","019","070","02","031","032","033","041","042","043","044","051","052","053","054","055","061","062","063","064"];
		var trgtVal = jQuery(obj).val();

		if ( curPstn == 1 && cmprArr.indexOf(trgtVal) > -1 )
		{
			jQuery(obj).nextAll("input").first().focus();
		}

		if ( trgtVal.length >= 4 )
		{
			jQuery(obj).nextAll("input").first().focus();
		}
	}

	/*
	 * fnc.setMaxLenChk
	 * input type="number" maxlength 체크
	 */
	fnc.setMaxLenChk = function(obj)
	{
		if ( obj.value.length > obj.maxLength )
		{
			obj.value = obj.value.slice(0, obj.maxLength);
	    }
	}
});