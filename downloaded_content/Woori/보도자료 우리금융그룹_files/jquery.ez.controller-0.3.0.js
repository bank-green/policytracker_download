define([], function() {

	"use strict";
	
	// do something...
	function Hashtable(){
		this.items = new Array();
		this.itemsCount = 0;

		this.add = function(key, value){
			if(!this.containsKey(key)){
				this.items[key] = value;
				this.itemsCount++;
			}else{
				this.items[key] = value;
			}
		};

		this.get = function(key){
			if(this.containsKey(key)){
				return this.items[key];
			}else{
				return null;
			}
		};

		this.remove = function(key){
			if(this.containsKey(key)){
				delete this.items[key];
				this.itemsCount--;
			}else{
				throw "key '" + key + "' dose not exists";
			}
		};

		this.containsKey = function(key){
			return typeof(this.items[key]) != "undefined";
		};

		this.containsValue = function containsValue(value){
			for(var item in this.items){
				if(this.items[item] == value){
					return true;
				}
			}
			return false;
		};

		this.contains = function(keyOrValue){
			return this.containsKey(keyOrValue) || this.containsValue(keyOrValue);
		};

		this.clear = function(){
			this.items = new Array();
			this.itemsCount = 0;
		};

		this.size = function(){
			return this.itemsCount;
		};

		this.isEmpty = function(){
			return this.size() === 0;
		};
	};

	// Recursion method
	function GetSearchObject(obj, key){
		var result = null;

		if(typeof obj === 'object'){
			for(var k in obj){
				if(k != '$obj'){
					if(k == key){
						return obj[k];
					}

					if(typeof obj[k] === 'object'){
						result = GetSearchObject(obj[k], key);

						if(result){
							break;
						}
					}
				}
			}
		}

		return result;
	};


	
	function GetIds(parentTag, tagType){
		var idvalue = "", arr = [];
		var patten = /-/i;
		
		for(var type in tagType){
			parentTag.find(tagType[type]).each(function(i, v){
				idvalue = $(this).attr('id');
				if(idvalue !== undefined && idvalue != "" && !patten.test(idvalue)){
					arr.push(idvalue);
				//}else{
				//	alert(idvalue + '[id overrap!!]');
				}
			});
		}

		return arr;
	};

	function GetClass(parentTag, tagType){
		var classvalue = "", arr = [];
		var patten = /-/i;
		
		for(var type in tagType){
			parentTag.find(tagType[type]).each(function(i, v){
				classvalue = $(this).attr('class');
				if(classvalue !== undefined && !patten.test(classvalue)){
					classvalue = classvalue.split(/\s+/);					
					$.each(classvalue, function(index, value){
						if($.inArray(value, arr) === -1){
							if(value !== undefined && value != ""){
								arr.push(value);								
							}
						}						
					});
				}
			});
		}
		return arr;
	};

	function FormProjection(parentTag, tagType, mode){
		var formTag = parentTag.find('form')
		,	ht = new Hashtable()
		,	array = new Array();
		
		var setData = function(fobj, tType){
			var count = 0;
			fobj.submit(function(){
				ht.clear();
				count = 0;
				
				for(var type in tType){
					
					fobj.find(tType[type]).each(function(i){
						var nodeName = $(tType[type])[0].nodeName;
						var nodeType = $(this).attr('type');
						array = [];
						
						switch (nodeName)
						{
							case "INPUT" :
								if (nodeType == "text" || nodeType == "hidden"){
									ht.add($(this).attr('name'), $(this).val());									
								}else if(nodeType == "checkbox" || nodeType == "radio"){
									if(ht.get($(this).attr('name')) == null){
										array.push($(this).is(':checked'));
										ht.add($(this).attr('name'), array);
									}else{
										array = ht.get($(this).attr('name'));										
										array.push($(this).is(':checked'));
										
										ht.add($(this).attr('name'), array);
									}
								}
								break;
							case "SELECT" :
								ht.add($(this).attr('name'), $(this).val());
								break;
							case "TEXTAREA" :								
								ht.add($(this).attr('name'), $(this).val().replace(/\r?\n/g, '<br />'));
								break;
						}
					});
				}
				
				var jsontest = "{";
				for(var item in ht.items){
					
					if($.isArray(ht.items[item])){	// is array
						jsontest = jsontest + '"' + item + '"' + ':' + '[' + ht.items[item] + ']';
					}else{
						jsontest = jsontest + '"' + item + '"' + ':' + '"' + ht.items[item] + '"';
					}
					
					if(ht.size() - 1 > count){
						jsontest = jsontest + ",";
					}	
					count = count + 1;
				}
				jsontest = jsontest + "}";
				
				$.cookie(fobj.attr('name'), jsontest);
			});			
		};
		
		var getData = function(fobj, tType){
			var eventTrigger = function(obj, $obj){
				events = $._data(obj, "events");
				if(events !== undefined){
					$.each(events, function(type){
						$obj.trigger(type);
					});
				}
			};
			
			if(!($.cookie(fobj.attr('name')) == null)){
				var obj = ""
				,	jsonformValue  = $.parseJSON($.cookie(fobj.attr('name')));

				$.each(jsonformValue, function(name, val){
					obj = $('[name='+name+']');
					nodeName = obj[0].nodeName;
					nodeType = obj.attr('type');
					
					switch(nodeName){
						case "INPUT":
							if(nodeType == "text" || nodeType == "hidden"){
								obj.val(val);
							}else if(nodeType == "checkbox" || nodeType == "radio"){
								obj.each(function(index, item){
									$(this).prop("checked", val[index]);
									
									if(val[index]){
										eventTrigger(this, $(item));
									}
								});
							}
							break;
						case "SELECT" :
							obj.val(val).prop('selected', true);
							eventTrigger(obj[0], obj);
							break;				
						case "TEXTAREA" :
							obj.val(val.replace(/<br\s*[\/]?>/gi, "\n")); 
							break;							
					}
				});
			}
		};
		
		var clearData = function(fobj){
			$.cookie(fobj.attr('name'), null);
		};
	
		formTag.each(function(){
			if(mode == "dev"){
				setData($(this), tagType);
				getData($(this), tagType);
			}else{
				clearData($(this));
			}
		});
	}
	
	function ArrayToJson(array){
		var jsonString = "{";
		for(var arr in array){
			jsonString = jsonString + '"' + array[arr] + '"' + ':' + '{}';
			if(arr < array.length - 1) jsonString = jsonString + ',';
		}
		jsonString = jsonString + "}";

		return $.parseJSON(jsonString);
	};

	var feel = {};
	
	feel.controller = function(controllerName, mode){
		this.obj = {};
		this.model = {};

		var controllerVal = {
			obj : null,
			alias : 'view',
			viewdata : ''
		};

		var modelVal = {
			targetObj : {},
			attrObj : {},
			eventObj : {},
			viewObj : {},
			viewTargetString : "",
			arrTrigger : []
		};

		var defaultObj = {
			id : {},
			classname : {} 
		};

		var defaultTagObj = {
			$obj : {},
			isShow : true,
			show : function(e){
				this.isShow = true;
				this.$obj.show();
			},
			hide : function(e){
				this.isShow = false;
				this.$obj.val('').hide();
			},
			ShowHide : function(){
				this.isShow ? this.hide() : this.show();
			}
		};

		var targetChar = ""
		  , arrId = []
		  , arrClass = [];


		// get controller
		$('div[data-controller]').each(function(){
			var $this = $(this)
			  , conValue = $this.data('controller');
			
			if(typeof conValue != 'undefined' && conValue != ''){
				conValue = conValue.split(/\s+/);					
				$.each(conValue, function(index, value){
					if(value == controllerName){
						controllerVal.obj = $this;	
					}					
				});
			}
		});	
		
		if (controllerVal.obj == null)
		{
			//console.log("Can not find " + controllerName + " object. Check controller name.");			
			this.exec = function(){
				return;
			};
			return;
		}

		this.obj = controllerVal.obj;

		// get alias
		if(typeof controllerVal.obj.data('alias') != 'undefined' && controllerVal.obj.data('alias') != ''){
			controllerVal.alias = controllerVal.obj.data('alias');
		}

		// get viewdata
		if(typeof controllerVal.obj.data('viewdata') != 'undefined' && controllerVal.obj.data('viewdata') != ''){
			controllerVal.viewdata = controllerVal.obj.data('viewdata');

			$.ajax({
				async : false,
				url : controllerVal.viewdata,
				dataType : 'json',
				success : function(jdata){
					model = jdata;
				}
			});
		}

		// get ids
		arrId = GetIds(controllerVal.obj, ['form', 'input', 'div', 'p', 'span', 'textarea', 'ul']);
		arrClass = GetClass(controllerVal.obj, ['input', 'div', 'p', 'span', 'textarea', 'ul']);
 

		defaultObj.id = $.extend(true, {}, defaultObj.id, ArrayToJson(arrId));
		defaultObj.classname = $.extend(true, {}, defaultObj.classname, ArrayToJson(arrClass));
		
		this.exec = function(){
			// model extend
			this.model = $.extend(true, {}, this.model, defaultObj);

			// model projection logic
			for(var key in this.model){
				switch(key.toLowerCase()){
					case 'id' :
					case 'classname' :
						targetChar = key == 'id' ? "#" : ".";
 
						modelVal.targetObj = this.model[key];


						for(var target in modelVal.targetObj){
							modelVal.attrObj = modelVal.targetObj[target];

							// add default attribute
							defaultTagObj.$obj = controllerVal.obj.find(targetChar + target);

							modelVal.attrObj = $.extend(true, {}, defaultTagObj, modelVal.attrObj);

							eval('defaultObj.' + key + '.' + target + ' = modelVal.attrObj');

							for(var attr in modelVal.attrObj){
								if(attr === "data"){
									modelVal.dataObj = modelVal.attrObj[attr];
									for(var e in modelVal.dataObj){
										defaultTagObj.$obj.data(e, modelVal.dataObj[e]);
									}
								}
								
								if(attr === "event"){
									modelVal.eventObj = modelVal.attrObj[attr];

									for(var e in modelVal.eventObj){
										
										if(typeof modelVal.eventObj[e] === "function"){
											$(document).on(e, targetChar + target, modelVal.eventObj[e]);
										}
									}
								}
							}
						}
						break;
					case controllerVal.alias :
						AliasTest(controllerVal, this.model[controllerVal.alias]);
						break;
				}
			};

			for(var key in this.model){
				switch(key.toLowerCase()){
					case 'immediately' : 
						if(typeof this.model[key] === "function"){
							this.model[key]();
						}
						break;
					
				}
			};
			
			// form projection
			FormProjection(controllerVal.obj, ['input', "select", "textarea"], mode);
		};

		// get define object by key name
		this.get = function(key){
			var rtn = GetSearchObject(defaultObj, key);
			
			if(rtn == null){
				return;
			}else{
				return rtn;
			}
		};

		// get jquery object key name
		this.getjq = function(key){			
			var o = GetSearchObject(defaultObj, key);

			if(typeof o === "object"){
				if(o.hasOwnProperty('$obj')){
					return o.$obj;
				}
			}

			return o;
		};


		function AliasTest(cv, vm){
			var ts = "";
			for(v in vm){
				ts = cv.alias + '.' + v;

				cv.obj.html(function(i, h){
					return h.replace(ts, vm[v]);
				});
			};
		}

		if(mode == "dev"){
			controllerVal.obj.css('position', 'relative')
							.css('border', '1px dashed red')
							.append('<span class="controllerLabel">' + controllerName + '</span>')
						    .find('.controllerLabel')
								.css('position','relative').css('top',0)
								.css('background','#000').css('color','#fff')
								.css('margin-right','5px');
		}
	};


	//SetController();

	return feel;
});