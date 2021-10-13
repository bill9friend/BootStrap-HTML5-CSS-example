//FWDS3DCUtils
(function (window){
	
	var FWDS3DCUtils = function(){};
	
	FWDS3DCUtils.dumy = document.createElement("div");
	
	//###################################//
	/* String */
	//###################################//
	FWDS3DCUtils.trim = function(str){
		return str.replace(/\s/gi, "");
	};
	
	FWDS3DCUtils.splitAndTrim = function(str, trim_bl){
		var array = str.split(",");
		var length = array.length;
		for(var i=0; i<length; i++){
			if(trim_bl) array[i] = FWDS3DCUtils.trim(array[i]);
		};
		return array;
	};

	//#############################################//
	//Array //
	//#############################################//
	FWDS3DCUtils.indexOfArray = function(array, prop){
		var length = array.length;
		for(var i=0; i<length; i++){
			if(array[i] === prop) return i;
		};
		return -1;
	};
	
	FWDS3DCUtils.randomizeArray = function(aArray) {
		var randomizedArray = [];
		var copyArray = aArray.concat();
			
		var length = copyArray.length;
		for(var i=0; i< length; i++) {
				var index = Math.floor(Math.random() * copyArray.length);
				randomizedArray.push(copyArray[index]);
				copyArray.splice(index,1);
			}
		return randomizedArray;
	};
	
	FWDS3DCUtils.removeArrayDuplicates = function(arr, key){ 
		var newArr = [],
	        origLen = arr.length,
	        found,
	        x, y;

	    for (x = 0; x < origLen; x++) {
	        found = undefined;
	        for (y = 0; y < newArr.length; y++) {
	            if(arr[x][key] === newArr[y][key]) { 
	              found = true;
	              break;
	            }
	        }
	        if(!found) newArr.push(arr[x]);    
	    }
	    return newArr;
	};
	

	//#############################################//
	/*DOM manipulation */
	//#############################################//
	FWDS3DCUtils.parent = function (e, n){
		if(n === undefined) n = 1;
		while(n-- && e) e = e.parentNode;
		if(!e || e.nodeType !== 1) return null;
		return e;
	};
	
	FWDS3DCUtils.sibling = function(e, n){
		while (e && n !== 0){
			if(n > 0){
				if(e.nextElementSibling){
					 e = e.nextElementSibling;	 
				}else{
					for(var e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling);
				}
				n--;
			}else{
				if(e.previousElementSibling){
					 e = e.previousElementSibling;	 
				}else{
					for(var e = e.previousSibling; e && e.nodeType !== 1; e = e.previousSibling);
				}
				n++;
			}
		}
		return e;
	};
	
	FWDS3DCUtils.getChildAt = function (e, n){
		var kids = FWDS3DCUtils.getChildren(e);
		if(n < 0) n += kids.length;
		if(n < 0) return null;
		return kids[n];
	};
	
	FWDS3DCUtils.getChildById = function(id){
		return document.getElementById(id) || undefined;
	};
	
	FWDS3DCUtils.getChildren = function(e, allNodesTypes){
		var kids = [];
		for(var c = e.firstChild; c != null; c = c.nextSibling){
			if(allNodesTypes){
				kids.push(c);
			}else if(c.nodeType === 1){
				kids.push(c);
			}
		}
		return kids;
	};
	
	FWDS3DCUtils.getChildrenFromAttribute = function(e, attr, allNodesTypes){
		var kids = [];
		for(var c = e.firstChild; c != null; c = c.nextSibling){
			if(allNodesTypes && FWDS3DCUtils.hasAttribute(c, attr)){
				kids.push(c);
			}else if(c.nodeType === 1 && FWDS3DCUtils.hasAttribute(c, attr)){
				kids.push(c);
			}
		}
		return kids.length == 0 ? undefined : kids;
	};
	
	FWDS3DCUtils.getChildFromNodeListFromAttribute = function(e, attr, allNodesTypes){
		for(var c = e.firstChild; c != null; c = c.nextSibling){
			if(allNodesTypes && FWDS3DCUtils.hasAttribute(c, attr)){
				return c;
			}else if(c.nodeType === 1 && FWDS3DCUtils.hasAttribute(c, attr)){
				return c;
			}
		}
		return undefined;
	};
	
	FWDS3DCUtils.getAttributeValue = function(e, attr){
		if(!FWDS3DCUtils.hasAttribute(e, attr)) return undefined;
		return e.getAttribute(attr);	
	};
	
	FWDS3DCUtils.hasAttribute = function(e, attr){
		if(e.hasAttribute){
			return e.hasAttribute(attr); 
		}else {
			var test = e.getAttribute(attr);
			return  test ? true : false;
		}
	};
	
	FWDS3DCUtils.insertNodeAt = function(parent, child, n){
		var children = FWDS3DCUtils.children(parent);
		if(n < 0 || n > children.length){
			throw new Error("invalid index!");
		}else {
			parent.insertBefore(child, children[n]);
		};
	};
	
	FWDS3DCUtils.hasCanvas = function(){
		return Boolean(document.createElement("canvas"));
	};
	
	//###################################//
	/* DOM geometry */
	//##################################//
	FWDS3DCUtils.hitTest = function(target, x, y){
		var hit = false;
		if(!target) throw Error("Hit test target is null!");
		var rect = target.getBoundingClientRect();
		
		if(x >= rect.left && x <= rect.left +(rect.right - rect.left) && y >= rect.top && y <= rect.top + (rect.bottom - rect.top)) return true;
		return false;
	};
	
	FWDS3DCUtils.getScrollOffsets = function(){
		//all browsers
		if(window.pageXOffset != null) return{x:window.pageXOffset, y:window.pageYOffset};
		
		//ie7/ie8
		if(document.compatMode == "CSS1Compat"){
			return({x:document.documentElement.scrollLeft, y:document.documentElement.scrollTop});
		}
	};
	
	FWDS3DCUtils.getViewportSize = function(){
		if(FWDS3DCUtils.hasPointerEvent && navigator.msMaxTouchPoints > 1){
			return {w:document.documentElement.clientWidth || window.innerWidth, h:document.documentElement.clientHeight || window.innerHeight};
		}
		
		if(FWDS3DCUtils.isMobile) return {w:window.innerWidth, h:window.innerHeight};
		return {w:document.documentElement.clientWidth || window.innerWidth, h:document.documentElement.clientHeight || window.innerHeight};
	};
	
	FWDS3DCUtils.getViewportMouseCoordinates = function(e){
		var offsets = FWDS3DCUtils.getScrollOffsets();
		
		if(e.touches){
			return{
				screenX:e.touches[0] == undefined ? e.touches.pageX - offsets.x :e.touches[0].pageX - offsets.x,
				screenY:e.touches[0] == undefined ? e.touches.pageY - offsets.y :e.touches[0].pageY - offsets.y
			};
		}
		
		return{
			screenX: e.clientX == undefined ? e.pageX - offsets.x : e.clientX,
			screenY: e.clientY == undefined ? e.pageY - offsets.y : e.clientY
		};
	};
	
	
	//###################################//
	/* Browsers test */
	//##################################//
	FWDS3DCUtils.hasPointerEvent = (function(){
		return Boolean(window.navigator.msPointerEnabled) || Boolean(window.navigator.pointerEnabled);
	}());
	
	FWDS3DCUtils.isMobile = (function (){
		if((FWDS3DCUtils.hasPointerEvent && navigator.msMaxTouchPoints > 1) || (FWDS3DCUtils.hasPointerEvent && navigator.maxTouchPoints > 1)) return true;
		var agents = ['android', 'webos', 'iphone', 'ipad', 'blackberry', 'kfsowi'];
	    for(i in agents) {
	    	 if(String(navigator.userAgent).toLowerCase().indexOf(String(agents[i]).toLowerCase()) != -1) {
	            return true;
	        }
	    }
	    return false;
	}());
	
	FWDS3DCUtils.isAndroid = (function(){
		 return (navigator.userAgent.toLowerCase().indexOf("android".toLowerCase()) != -1);
	}());
	
	FWDS3DCUtils.isChrome = (function(){
		return navigator.userAgent.toLowerCase().indexOf('chrome') != -1;
	}());
	
	FWDS3DCUtils.isSafari = (function(){
		return navigator.userAgent.toLowerCase().indexOf('safari') != -1 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1;
	}());
	
	FWDS3DCUtils.isOpera = (function(){
		return navigator.userAgent.toLowerCase().indexOf('opera') != -1 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1;
	}());
	
	FWDS3DCUtils.isFirefox = (function(){
		return navigator.userAgent.toLowerCase().indexOf('firefox') != -1;
	}());
	
	FWDS3DCUtils.isIE = (function(){
		var isIE = Boolean(navigator.userAgent.toLowerCase().indexOf('msie') != -1) || Boolean(navigator.userAgent.toLowerCase().indexOf('edge') != -1);
		return Boolean(isIE || document.documentElement.msRequestFullscreen);
	}());
	
	FWDS3DCUtils.isIE11 = (function(){
		return Boolean(!FWDS3DCUtils.isIE && document.documentElement.msRequestFullscreen);
	}());
	
	FWDS3DCUtils.isIEAndLessThen9 = (function(){
		return navigator.userAgent.toLowerCase().indexOf("msie 7") != -1 || navigator.userAgent.toLowerCase().indexOf("msie 8") != -1;
	}());
	
	FWDS3DCUtils.isIEAndLessThen10 = (function(){
		return navigator.userAgent.toLowerCase().indexOf("msie 7") != -1 
		|| navigator.userAgent.toLowerCase().indexOf("msie 8") != -1
		|| navigator.userAgent.toLowerCase().indexOf("msie 9") != -1;
	}());
	
	FWDS3DCUtils.isIE7 = (function(){
		return navigator.userAgent.toLowerCase().indexOf("msie 7") != -1;
	}());
	
	FWDS3DCUtils.isIOS = (function(){
		return navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
	}());
	
	FWDS3DCUtils.isIphone = (function(){
		return navigator.userAgent.match(/(iPhone|iPod)/g);
	}());
	
	FWDS3DCUtils.isApple = (function(){
		return navigator.appVersion.toLowerCase().indexOf('mac') != -1;
	}());
	
	FWDS3DCUtils.isLocal = (function(){
		return location.href.indexOf('file:') != -1;
	}());
	
	FWDS3DCUtils.hasFullScreen = (function(){
		return FWDS3DCUtils.dumy.requestFullScreen || FWDS3DCUtils.dumy.mozRequestFullScreen || FWDS3DCUtils.dumy.webkitRequestFullScreen || FWDS3DCUtils.dumy.msieRequestFullScreen;
	}());
	
	FWDS3DCUtils.isAndroidAndWebkit = (function(){
		return  (FWDS3DCUtils.isOpera || FWDS3DCUtils.isChrome) && FWDS3DCUtils.isAndroid;
	}());
	
	function get3d(){
	    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform', 'KhtmlTransform'];
	    var p;
	    var position;
	    while (p = properties.shift()) {
	       if (typeof FWDS3DCUtils.dumy.style[p] !== 'undefined') {
	    	   FWDS3DCUtils.dumy.style.position = "absolute";
	    	   position = FWDS3DCUtils.dumy.getBoundingClientRect().left;
	    	   FWDS3DCUtils.dumy.style[p] = 'translate3d(500px, 0px, 0px)';
	    	   position = Math.abs(FWDS3DCUtils.dumy.getBoundingClientRect().left - position);
	    	   
	           if(position > 100 && position < 900){
	        	   try{document.documentElement.removeChild(FWDS3DCUtils.dumy);}catch(e){}
	        	   return true;
	           }
	       }
	    }
	    try{document.documentElement.removeChild(FWDS3DCUtils.dumy);}catch(e){}
	    return false;
	};
	
	function get2d(){
	    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform', 'KhtmlTransform'];
	    var p;
	    while (p = properties.shift()) {
	       if (typeof FWDS3DCUtils.dumy.style[p] !== 'undefined') {
	    	   return true;
	       }
	    }
	    try{document.documentElement.removeChild(FWDS3DCUtils.dumy);}catch(e){}
	    return false;
	};	
	
	//###############################################//
	/* various utils */
	//###############################################//
	FWDS3DCUtils.onReady =  function(callbalk){
		if (document.addEventListener) {
			document.addEventListener( "DOMContentLoaded", function(){
				FWDS3DCUtils.checkIfHasTransofrms();
				callbalk();
			});
		}else{
			document.onreadystatechange = function () {
				FWDS3DCUtils.checkIfHasTransofrms();
				if (document.readyState == "complete") callbalk();
			};
		 }
	};
	
	FWDS3DCUtils.checkIfHasTransofrms = function(){
		document.documentElement.appendChild(FWDS3DCUtils.dumy);
		FWDS3DCUtils.hasTransform3d = get3d();
		FWDS3DCUtils.hasTransform2d = get2d();
		FWDS3DCUtils.isReadyMethodCalled_bl = true;
	};
	
	FWDS3DCUtils.disableElementSelection = function(e){
		try{e.style.userSelect = "none";}catch(e){};
		try{e.style.MozUserSelect = "none";}catch(e){};
		try{e.style.webkitUserSelect = "none";}catch(e){};
		try{e.style.khtmlUserSelect = "none";}catch(e){};
		try{e.style.oUserSelect = "none";}catch(e){};
		try{e.style.msUserSelect = "none";}catch(e){};
		try{e.msUserSelect = "none";}catch(e){};
		e.onselectstart = function(){return false;};
	};
	
	FWDS3DCUtils.getSearchArgs = function(){
		var args = {};
		var query = location.href.substr(location.href.indexOf("?") + 1);
		
		var pairs = query.split("&");
		
		for(var i=0; i< pairs.length; i++){
			var pos = pairs[i].indexOf("=");
			var name = pairs[i].substring(0,pos);
			var value = pairs[i].substring(pos + 1);
			value = decodeURIComponent(value);
			args[name] = value;
		}
		return args;
	};
	
	FWDS3DCUtils.getHashArgs = function(string){
		var args = {};
		var query = string.substr(string.indexOf("#") + 1) || location.hash.substring(1);
		var pairs = query.split("&");
		for(var i=0; i< pairs.length; i++){
			var pos = pairs[i].indexOf("=");
			var name = pairs[i].substring(0,pos);
			var value = pairs[i].substring(pos + 1);
			value = decodeURIComponent(value);
			args[name] = value;
		}
		return args;
	};
	
	
	FWDS3DCUtils.isReadyMethodCalled_bl = false;
	
	window.FWDS3DCUtils = FWDS3DCUtils;
}(window));

