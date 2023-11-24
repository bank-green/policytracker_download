//requireJS 기본 설정 부분
require.config({
/*
    baseUrl:
    JavaScript 파일이 있는 기본 경로를 설정한다.
    만약 data-main 속성이 사용되었다면, 그 경로가 baseUrl이 된다.
    data-main 속성은 require.js를 위한 특별한 속성으로 require.js는 스크립트 로딩을 시작하기 위해 이 부분을 체크한다.
*/
    baseUrl: "/common/js", // "js" 라는 폴더를 기본 폴더로 설정한다.
    waitSeconds: 20,
    urlArgs : "bust="+new Date().getTime(),
/*
    paths:
    path는 baseUrl 아래에서 직접적으로 찾을 수 없는 모듈명들을 위해 경로를 매핑해주는 속성이다.
    "/"로 시작하거나 "http" 등으로 시작하지 않으면, 기본적으로는 baseUrl에 상대적으로 설정하게 된다.

    paths: {
        "exam": "aaaa/bbbb"
    }

    의 형태로 설정한 뒤에, define에서 "exam/module" 로 불러오게 되면, 스크립트 태그에서는 실제로는 src="aaaa/bbbb/module.js" 로 잡을 것이다.
    path는 또한 아래와 같이 특정 라이브러리 경로 선언을 위해 사용될 수 있는데, path 매핑 코드는 자동적으로 .js 확장자를 붙여서 모듈명을 매핑한다.
*/
    paths:{
        //뒤에 js 확장자는 생략한다.
        "clipboard" : 	"lib/clipboard.min",
    	"fnc"		: 	"lib/fnc",
		"ezCtrl"    : 	"lib/ezController/jquery.ez.controller-0.3.0",
		"jqueryUi"  :   "lib/jquery/jquery-ui"
    },
    shim : {
    	"jqueryUiTouch" : {
    		deps : ['jqueryUi']
    	}
    }
});

//requireJS를 활용하여 모듈 로드
//js 폴더를 기준으로 상대경로로 컨트롤러 js 파일 명을 적어준다.
//공통 함수 불러들이기
require(["fnc", "ezCtrl"], function($){
	jQuery(document).ready(function(){
		// get controller name
		jQuery("div").each(function(){
			var conValue = jQuery(this).data("controller");

			if (typeof conValue != "undefined" && conValue != "")
			{
				conValue = conValue.split(/\s+/);

				conValue = jQuery.map(conValue, function(name){
					return name;
				});

				require(conValue, function(){
					// return define
				}, function(error){
					// error
				});
			}
		});
	});
});