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
}(window));/*!
 * VERSION: 1.19.0
 * DATE: 2016-07-14
 * FWDAnimation tween engine*
 **/
if(!window['FWDAnimation']){
	
var _fwd_gsScope = (typeof(fwd_module) !== "undefined" && fwd_module.exports && typeof(fwd_global) !== "undefined") ? fwd_global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_fwd_gsScope._fwd_gsQueue || (_fwd_gsScope._fwd_gsQueue = [])).push( function() {

	"use strict";

	_fwd_gsScope.FWDFWD_gsDefine("FWDAnimation", ["core.FWDAnim","core.FWDSimpleTimeline","FWDTweenLite"], function(FWDAnim, FWDSimpleTimeline, FWDTweenLite) {

		var _slice = function(a) { //don't use [].slice because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],
					l = a.length,
					i;
				for (i = 0; i !== l; b.push(a[i++]));
				return b;
			},
			_applyCycle = function(vars, targets, i) {
				var alt = vars.cycle,
					p, val;
				for (p in alt) {
					val = alt[p];
					vars[p] = (typeof(val) === "function") ? val(i, targets[i]) : val[i % val.length];
				}
				delete vars.cycle;
			},
			FWDAnimation = function(target, duration, vars) {
				FWDTweenLite.call(this, target, duration, vars);
				this._cycle = 0;
				this._yoyo = (this.vars.yoyo === true);
				this._repeat = this.vars.repeat || 0;
				this._repeatDelay = this.vars.repeatDelay || 0;
				this._dirty = true; //ensures that if there is any repeat, the totalDuration will get recalculated to accurately report it.
				this.render = FWDAnimation.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)
			},
			_FWDtinyNum = 0.0000000001,
			FWDTweenLiteInternals = FWDTweenLite._internals,
			_FWDisSelector = FWDTweenLiteInternals.isSelector,
			_FWDisArray = FWDTweenLiteInternals.isArray,
			p = FWDAnimation.prototype = FWDTweenLite.to({}, 0.1, {}),
			_blankArray = [];

		FWDAnimation.version = "1.19.0";
		p.constructor = FWDAnimation;
		p.kill()._gc = false;
		FWDAnimation.killTweensOf = FWDAnimation.killDelayedCallsTo = FWDTweenLite.killTweensOf;
		FWDAnimation.getTweensOf = FWDTweenLite.getTweensOf;
		FWDAnimation.lagSmoothing = FWDTweenLite.lagSmoothing;
		FWDAnimation.ticker = FWDTweenLite.ticker;
		FWDAnimation.render = FWDTweenLite.render;

		p.invalidate = function() {
			this._yoyo = (this.vars.yoyo === true);
			this._repeat = this.vars.repeat || 0;
			this._repeatDelay = this.vars.repeatDelay || 0;
			this._uncache(true);
			return FWDTweenLite.prototype.invalidate.call(this);
		};
		
		p.updateTo = function(vars, resetDuration) {
			var curRatio = this.ratio,
				immediate = this.vars.immediateRender || vars.immediateRender,
				p;
			if (resetDuration && this._startTime < this._timeline._time) {
				this._startTime = this._timeline._time;
				this._uncache(false);
				if (this._gc) {
					this._enabled(true, false);
				} else {
					this._timeline.insert(this, this._startTime - this._delay); //ensures that any necessary re-sequencing of Animations in the fwdtimline occurs to make sure the rendering order is correct.
				}
			}
			for (p in vars) {
				this.vars[p] = vars[p];
			}
			if (this._initted || immediate) {
				if (resetDuration) {
					this._initted = false;
					if (immediate) {
						this.render(0, true, true);
					}
				} else {
					if (this._gc) {
						this._enabled(true, false);
					}
					if (this._notifyPluginsOfEnabled && this._firstPT) {
						FWDTweenLite._onPluginEvent("_onDisable", this); //in case a plugin like MotionBlur must perform some cleanup tasks
					}
					if (this._time / this._duration > 0.998) { //if the tween has finished (or come extremely close to finishing), we just need to rewind it to 0 and then render it again at the end which forces it to re-initialize (parsing the new vars). We allow tweens that are close to finishing (but haven't quite finished) to work this way too because otherwise, the values are so small when determining where to project the starting values that binary math issues creep in and can make the tween appear to render incorrectly when run backwards. 
						var prevTime = this._totalTime;
						this.render(0, true, false);
						this._initted = false;
						this.render(prevTime, true, false);
					} else {
						this._initted = false;
						this._init();
						if (this._time > 0 || immediate) {
							var inv = 1 / (1 - curRatio),
								pt = this._firstPT, endValue;
							while (pt) {
								endValue = pt.s + pt.c;
								pt.c *= inv;
								pt.s = endValue - pt.c;
								pt = pt._next;
							}
						}
					}
				}
			}
			return this;
		};
				
		p.render = function(time, suppressEvents, force) {
			
			if (!this._initted) if (this._duration === 0 && this.vars.repeat) { //zero duration tweens that render immediately have render() called from FWDTweenLite's constructor, before FWDAnimation's constructor has finished setting _repeat, _repeatDelay, and _yoyo which are critical in determining totalDuration() so we need to call invalidate() which is a low-kb way to get those set properly.
				this.invalidate();
			}
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				prevTime = this._time,
				prevTotalTime = this._totalTime, 
				prevCycle = this._cycle,
				duration = this._duration,
				prevRawPrevTime = this._rawPrevTime,
				isComplete, callback, pt, cycleDuration, r, type, pow, rawPrevTime;
			if (time >= totalDur - 0.0000001) { //to work around occasional floating point math artifacts.
				this._totalTime = totalDur;
				this._cycle = this._repeat;
				if (this._yoyo && (this._cycle & 1) !== 0) {
					this._time = 0;
					this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				} else {
					this._time = duration;
					this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
				}
				if (!this._reversed) {
					isComplete = true;
					callback = "onComplete";
					force = (force || this._timeline.autoRemoveChildren); //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent fwdtimline.
				}
				if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its fwdtimline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the fwdtimline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (this._startTime === this._timeline._duration) { //if a zero-duration tween is at the VERY end of a fwdtimline and that fwdtimline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that fwdtimline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
						time = 0;
					}
					if (prevRawPrevTime < 0 || (time <= 0 && time >= -0.0000001) || (prevRawPrevTime === _FWDtinyNum && this.data !== "isPause")) if (prevRawPrevTime !== time) { //note: when this.data is "isPause", it's a callback added by addPause() on a fwdtimline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
						force = true;
						if (prevRawPrevTime > _FWDtinyNum) {
							callback = "onReverseComplete";
						}
					}
					this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _FWDtinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a fwdtimline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				}
				
			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = this._cycle = 0;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				if (prevTotalTime !== 0 || (duration === 0 && prevRawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its fwdtimline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the fwdtimline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (prevRawPrevTime >= 0) {
							force = true;
						}
						this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _FWDtinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a fwdtimline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					}
				}
				if (!this._initted) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
					force = true;
				}
			} else {
				this._totalTime = this._time = time;
				if (this._repeat !== 0) {
					cycleDuration = duration + this._repeatDelay;
					this._cycle = (this._totalTime / cycleDuration) >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)
					if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration && prevTotalTime <= time) {
						this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
					}
					this._time = this._totalTime - (this._cycle * cycleDuration);
					if (this._yoyo) if ((this._cycle & 1) !== 0) {
						this._time = duration - this._time;
					}
					if (this._time > duration) {
						this._time = duration;
					} else if (this._time < 0) {
						this._time = 0;
					}
				}

				if (this._easeType) {
					r = this._time / duration;
					type = this._easeType;
					pow = this._easePower;
					if (type === 1 || (type === 3 && r >= 0.5)) {
						r = 1 - r;
					}
					if (type === 3) {
						r *= 2;
					}
					if (pow === 1) {
						r *= r;
					} else if (pow === 2) {
						r *= r * r;
					} else if (pow === 3) {
						r *= r * r * r;
					} else if (pow === 4) {
						r *= r * r * r * r;
					}

					if (type === 1) {
						this.ratio = 1 - r;
					} else if (type === 2) {
						this.ratio = r;
					} else if (this._time / duration < 0.5) {
						this.ratio = r / 2;
					} else {
						this.ratio = 1 - (r / 2);
					}

				} else {
					this.ratio = this._ease.getRatio(this._time / duration);
				}
				
			}
				
			if (prevTime === this._time && !force && prevCycle === this._cycle) {
				if (prevTotalTime !== this._totalTime) if (this._onUpdate) if (!suppressEvents) { //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
					this._callback("onUpdate");
				}
				return;
			} else if (!this._initted) {
				this._init();
				if (!this._initted || this._gc) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
					return;
				} else if (!force && this._firstPT && ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration))) { //we stick it in the queue for rendering at the very end of the tick - this is a performance optimization because browsers invalidate styles and force a recalculation if you read, write, and then read style data (so it's better to read/read/read/write/write/write than read/write/read/write/read/write). The down side, of course, is that usually you WANT things to render immediately because you may have code running right after that which depends on the change. Like imagine running FWDTweenLite.set(...) and then immediately after that, creating a nother tween that animates the same property to another value; the starting values of that 2nd tween wouldn't be accurate if lazy is true.
					this._time = prevTime;
					this._totalTime = prevTotalTime;
					this._rawPrevTime = prevRawPrevTime;
					this._cycle = prevCycle;
					FWDTweenLiteInternals.lazyTweens.push(this);
					this._lazy = [time, suppressEvents];
					return;
				}
				//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
				if (this._time && !isComplete) {
					this.ratio = this._ease.getRatio(this._time / duration);
				} else if (isComplete && this._ease._calcEnd) {
					this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1);
				}
			}
			if (this._lazy !== false) {
				this._lazy = false;
			}

			if (!this._active) if (!this._paused && this._time !== prevTime && time >= 0) {
				this._active = true; //so that if the user renders a tween (as opposed to the fwdtimline rendering it), the fwdtimline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}
			if (prevTotalTime === 0) {
				if (this._initted === 2 && time > 0) {
					//this.invalidate();
					this._init(); //will just apply overwriting since _initted of (2) means it was a from() tween that had immediateRender:true
				}
				if (this._startAt) {
					if (time >= 0) {
						this._startAt.render(time, suppressEvents, force);
					} else if (!callback) {
						callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
					}
				}
				if (this.vars.onStart) if (this._totalTime !== 0 || duration === 0) if (!suppressEvents) {
					this._callback("onStart");
				}
			}
			
			pt = this._firstPT;
			while (pt) 
			{
				if (pt.f) 
				{
					pt.t[pt.p](pt.c * this.ratio + pt.s);
				} 
				else 
				{
					var newVal = pt.c * this.ratio + pt.s;
				
					if (pt.p == "x")
					{
						pt.t.setX(newVal);
					}
					else if (pt.p == "y")
					{
						pt.t.setY(newVal);
					}
					else if (pt.p == "z")
					{
						pt.t.setZ(newVal);
					}
					else if (pt.p == "angleX")
					{
						pt.t.setAngleX(newVal);
					}
					else if (pt.p == "angleY")
					{
						pt.t.setAngleY(newVal);
					}
					else if (pt.p == "angleZ")
					{
						pt.t.setAngleZ(newVal);
					}
					else if (pt.p == "w")
					{
						pt.t.setWidth(newVal);
					}
					else if (pt.p == "h")
					{
						pt.t.setHeight(newVal);
					}
					else if (pt.p == "alpha")
					{
						pt.t.setAlpha(newVal);
					}
					else if (pt.p == "scale")
					{
						pt.t.setScale2(newVal);
					}
					else
					{
						pt.t[pt.p] = newVal;
					}
				}
				pt = pt._next;
			}
			
			if (this._onUpdate) {
				if (time < 0) if (this._startAt && this._startTime) { //if the tween is positioned at the VERY beginning (_startTime 0) of its parent fwdtimline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
					this._startAt.render(time, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
				}
				if (!suppressEvents) if (this._totalTime !== prevTotalTime || callback) {
					this._callback("onUpdate");
				}
			}
			if (this._cycle !== prevCycle) if (!suppressEvents) if (!this._gc) if (this.vars.onRepeat) {
				this._callback("onRepeat");
			}
			if (callback) if (!this._gc || force) { //check gc because there's a chance that kill() could be called in an onUpdate
				if (time < 0 && this._startAt && !this._onUpdate && this._startTime) { //if the tween is positioned at the VERY beginning (_startTime 0) of its parent fwdtimline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
					this._startAt.render(time, suppressEvents, force);
				}
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
				if (duration === 0 && this._rawPrevTime === _FWDtinyNum && rawPrevTime !== _FWDtinyNum) { //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a fwdtimline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the fwdtimline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _FWDtinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
					this._rawPrevTime = 0;
				}
			}
		};
		
//---- STATIC FUNCTIONS -----------------------------------------------------------------------------------------------------------
		
		FWDAnimation.to = function(target, duration, vars) {
			return new FWDAnimation(target, duration, vars);
		};
		
		FWDAnimation.from = function(target, duration, vars) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return new FWDAnimation(target, duration, vars);
		};
		
		FWDAnimation.fromTo = function(target, duration, fromVars, toVars) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return new FWDAnimation(target, duration, toVars);
		};
		
		FWDAnimation.staggerTo = FWDAnimation.allTo = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			stagger = stagger || 0;
			var delay = 0,
				a = [],
				finalComplete = function() {
					if (vars.onComplete) {
						vars.onComplete.apply(vars.onCompleteScope || this, arguments);
					}
					onCompleteAll.apply(onCompleteAllScope || vars.callbackScope || this, onCompleteAllParams || _blankArray);
				},
				cycle = vars.cycle,
				fromCycle = (vars.startAt && vars.startAt.cycle),
				l, copy, i, p;
			if (!_FWDisArray(targets)) {
				if (typeof(targets) === "string") {
					targets = FWDTweenLite.selector(targets) || targets;
				}
				if (_FWDisSelector(targets)) {
					targets = _slice(targets);
				}
			}
			targets = targets || [];
			if (stagger < 0) {
				targets = _slice(targets);
				targets.reverse();
				stagger *= -1;
			}
			l = targets.length - 1;
			for (i = 0; i <= l; i++) {
				copy = {};
				for (p in vars) {
					copy[p] = vars[p];
				}
				if (cycle) {
					_applyCycle(copy, targets, i);
					if (copy.duration != null) {
						duration = copy.duration;
						delete copy.duration;
					}
				}
				if (fromCycle) {
					fromCycle = copy.startAt = {};
					for (p in vars.startAt) {
						fromCycle[p] = vars.startAt[p];
					}
					_applyCycle(copy.startAt, targets, i);
				}
				copy.delay = delay + (copy.delay || 0);
				if (i === l && onCompleteAll) {
					copy.onComplete = finalComplete;
				}
				a[i] = new FWDAnimation(targets[i], duration, copy);
				delay += stagger;
			}
			return a;
		};
		
		FWDAnimation.staggerFrom = FWDAnimation.allFrom = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return FWDAnimation.staggerTo(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};
		
		FWDAnimation.staggerFromTo = FWDAnimation.allFromTo = function(targets, duration, fromVars, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return FWDAnimation.staggerTo(targets, duration, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};
				
		FWDAnimation.delayedCall = function(delay, callback, params, scope, useFrames) {
			return new FWDAnimation(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, callbackScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, immediateRender:false, useFrames:useFrames, overwrite:0});
		};
		
		FWDAnimation.set = function(target, vars) {
			return new FWDAnimation(target, 0, vars);
		};
		
		FWDAnimation.isTweening = function(target) {
			return (FWDTweenLite.getTweensOf(target, true).length > 0);
		};
		
		var _getChildrenOf = function(fwdtimline, includeTimelines) {
				var a = [],
					cnt = 0,
					tween = fwdtimline._first;
				while (tween) {
					if (tween instanceof FWDTweenLite) {
						a[cnt++] = tween;
					} else {
						if (includeTimelines) {
							a[cnt++] = tween;
						}
						a = a.concat(_getChildrenOf(tween, includeTimelines));
						cnt = a.length;
					}
					tween = tween._next;
				}
				return a;
			}, 
			getAllTweens = FWDAnimation.getAllTweens = function(includeTimelines) {
				return _getChildrenOf(FWDAnim._rootTimeline, includeTimelines).concat( _getChildrenOf(FWDAnim._rootFramesTimeline, includeTimelines) );
			};
		
		FWDAnimation.killAll = function(complete, tweens, delayedCalls, timelines) {
			if (tweens == null) {
				tweens = true;
			}
			if (delayedCalls == null) {
				delayedCalls = true;
			}
			var a = getAllTweens((timelines != false)),
				l = a.length,
				allTrue = (tweens && delayedCalls && timelines),
				isDC, tween, i;
			for (i = 0; i < l; i++) {
				tween = a[i];
				if (allTrue || (tween instanceof FWDSimpleTimeline) || ((isDC = (tween.target === tween.vars.onComplete)) && delayedCalls) || (tweens && !isDC)) {
					if (complete) {
						tween.totalTime(tween._reversed ? 0 : tween.totalDuration());
					} else {
						tween._enabled(false, false);
					}
				}
			}
		};
		
		FWDAnimation.killChildTweensOf = function(parent, complete) {
			if (parent == null) {
				return;
			}
			var tl = FWDTweenLiteInternals.tweenLookup,
				a, curParent, p, i, l;
			if (typeof(parent) === "string") {
				parent = FWDTweenLite.selector(parent) || parent;
			}
			if (_FWDisSelector(parent)) {
				parent = _slice(parent);
			}
			if (_FWDisArray(parent)) {
				i = parent.length;
				while (--i > -1) {
					FWDAnimation.killChildTweensOf(parent[i], complete);
				}
				return;
			}
			a = [];
			for (p in tl) {
				curParent = tl[p].target.parentNode;
				while (curParent) {
					if (curParent === parent) {
						a = a.concat(tl[p].tweens);
					}
					curParent = curParent.parentNode;
				}
			}
			l = a.length;
			for (i = 0; i < l; i++) {
				if (complete) {
					a[i].totalTime(a[i].totalDuration());
				}
				a[i]._enabled(false, false);
			}
		};

		var _changePause = function(pause, tweens, delayedCalls, timelines) {
			tweens = (tweens !== false);
			delayedCalls = (delayedCalls !== false);
			timelines = (timelines !== false);
			var a = getAllTweens(timelines),
				allTrue = (tweens && delayedCalls && timelines),
				i = a.length,
				isDC, tween;
			while (--i > -1) {
				tween = a[i];
				if (allTrue || (tween instanceof FWDSimpleTimeline) || ((isDC = (tween.target === tween.vars.onComplete)) && delayedCalls) || (tweens && !isDC)) {
					tween.paused(pause);
				}
			}
		};
		
		FWDAnimation.pauseAll = function(tweens, delayedCalls, timelines) {
			_changePause(true, tweens, delayedCalls, timelines);
		};
		
		FWDAnimation.resumeAll = function(tweens, delayedCalls, timelines) {
			_changePause(false, tweens, delayedCalls, timelines);
		};

		FWDAnimation.globalTimeScale = function(value) {
			var tl = FWDAnim._rootTimeline,
				t = FWDTweenLite.ticker.time;
			if (!arguments.length) {
				return tl._timeScale;
			}
			value = value || _FWDtinyNum; //can't allow zero because it'll throw the math off
			tl._startTime = t - ((t - tl._startTime) * tl._timeScale / value);
			tl = FWDAnim._rootFramesTimeline;
			t = FWDTweenLite.ticker.frame;
			tl._startTime = t - ((t - tl._startTime) * tl._timeScale / value);
			tl._timeScale = FWDAnim._rootTimeline._timeScale = value;
			return value;
		};
		
	
//---- GETTERS / SETTERS ----------------------------------------------------------------------------------------------------------
		
		p.progress = function(value, suppressEvents) {
			return (!arguments.length) ? this._time / this.duration() : this.totalTime( this.duration() * ((this._yoyo && (this._cycle & 1) !== 0) ? 1 - value : value) + (this._cycle * (this._duration + this._repeatDelay)), suppressEvents);
		};
		
		p.totalProgress = function(value, suppressEvents) {
			return (!arguments.length) ? this._totalTime / this.totalDuration() : this.totalTime( this.totalDuration() * value, suppressEvents);
		};
		
		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			if (value > this._duration) {
				value = this._duration;
			}
			if (this._yoyo && (this._cycle & 1) !== 0) {
				value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));
			} else if (this._repeat !== 0) {
				value += this._cycle * (this._duration + this._repeatDelay);
			}
			return this.totalTime(value, suppressEvents);
		};

		p.duration = function(value) {
			if (!arguments.length) {
				return this._duration; //don't set _dirty = false because there could be repeats that haven't been factored into the _totalDuration yet. Otherwise, if you create a repeated FWDAnimation and then immediately check its duration(), it would cache the value and the totalDuration would not be correct, thus repeats wouldn't take effect.
			}
			return FWDAnim.prototype.duration.call(this, value);
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					//instead of Infinity, we use 999999999999 so that we can accommodate reverses
					this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
					this._dirty = false;
				}
				return this._totalDuration;
			}
			return (this._repeat === -1) ? this : this.duration( (value - (this._repeat * this._repeatDelay)) / (this._repeat + 1) );
		};
		
		p.repeat = function(value) {
			if (!arguments.length) {
				return this._repeat;
			}
			this._repeat = value;
			return this._uncache(true);
		};
		
		p.repeatDelay = function(value) {
			if (!arguments.length) {
				return this._repeatDelay;
			}
			this._repeatDelay = value;
			return this._uncache(true);
		};
		
		p.yoyo = function(value) {
			if (!arguments.length) {
				return this._yoyo;
			}
			this._yoyo = value;
			return this;
		};
		
		
		return FWDAnimation;
		
	}, true);

/*
 * ----------------------------------------------------------------
 * FWDTimelineLite
 * ----------------------------------------------------------------
 */
	_fwd_gsScope.FWDFWD_gsDefine("FWDTimelineLite", ["core.FWDAnim","core.FWDSimpleTimeline","FWDTweenLite"], function(FWDAnim, FWDSimpleTimeline, FWDTweenLite) {

		var FWDTimelineLite = function(vars) {
				FWDSimpleTimeline.call(this, vars);
				this._labels = {};
				this.autoRemoveChildren = (this.vars.autoRemoveChildren === true);
				this.smoothChildTiming = (this.vars.smoothChildTiming === true);
				this._sortChildren = true;
				this._onUpdate = this.vars.onUpdate;
				var v = this.vars,
					val, p;
				for (p in v) {
					val = v[p];
					if (_FWDisArray(val)) if (val.join("").indexOf("{self}") !== -1) {
						v[p] = this._swapSelfInParams(val);
					}
				}
				if (_FWDisArray(v.tweens)) {
					this.add(v.tweens, 0, v.align, v.stagger);
				}
			},
			_FWDtinyNum = 0.0000000001,
			FWDTweenLiteInternals = FWDTweenLite._internals,
			_internals = FWDTimelineLite._internals = {},
			_FWDisSelector = FWDTweenLiteInternals.isSelector,
			_FWDisArray = FWDTweenLiteInternals.isArray,
			_lazyTweens = FWDTweenLiteInternals.lazyTweens,
			_lazyRender = FWDTweenLiteInternals.lazyRender,
			_fwdglobals = _fwd_gsScope.FWDFWD_gsDefine.globals,
			_copy = function(vars) {
				var copy = {}, p;
				for (p in vars) {
					copy[p] = vars[p];
				}
				return copy;
			},
			_applyCycle = function(vars, targets, i) {
				var alt = vars.cycle,
					p, val;
				for (p in alt) {
					val = alt[p];
					vars[p] = (typeof(val) === "function") ? val.call(targets[i], i) : val[i % val.length];
				}
				delete vars.cycle;
			},
			_pauseCallback = _internals.pauseCallback = function() {},
			_slice = function(a) { //don't use [].slice because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],
					l = a.length,
					i;
				for (i = 0; i !== l; b.push(a[i++]));
				return b;
			},
			p = FWDTimelineLite.prototype = new FWDSimpleTimeline();

		FWDTimelineLite.version = "1.19.0";
		p.constructor = FWDTimelineLite;
		p.kill()._gc = p._forcingPlayhead = p._hasPause = false;

		/* might use later...
		//translates a local time inside an animation to the corresponding time on the root/fwd_global fwdtimline, factoring in all nesting and timeScales.
		function localToGlobal(time, animation) {
			while (animation) {
				time = (time / animation._timeScale) + animation._startTime;
				animation = animation.fwdtimline;
			}
			return time;
		}

		//translates the supplied time on the root/fwd_global fwdtimline into the corresponding local time inside a particular animation, factoring in all nesting and timeScales
		function globalToLocal(time, animation) {
			var scale = 1;
			time -= localToGlobal(0, animation);
			while (animation) {
				scale *= animation._timeScale;
				animation = animation.fwdtimline;
			}
			return time * scale;
		}
		*/

		p.to = function(target, duration, vars, position) {
			var Engine = (vars.repeat && _fwdglobals.FWDAnimation) || FWDTweenLite;
			return duration ? this.add( new Engine(target, duration, vars), position) : this.set(target, vars, position);
		};

		p.from = function(target, duration, vars, position) {
			return this.add( ((vars.repeat && _fwdglobals.FWDAnimation) || FWDTweenLite).from(target, duration, vars), position);
		};

		p.fromTo = function(target, duration, fromVars, toVars, position) {
			var Engine = (toVars.repeat && _fwdglobals.FWDAnimation) || FWDTweenLite;
			return duration ? this.add( Engine.fromTo(target, duration, fromVars, toVars), position) : this.set(target, toVars, position);
		};

		p.staggerTo = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			var tl = new FWDTimelineLite({onComplete:onCompleteAll, onCompleteParams:onCompleteAllParams, callbackScope:onCompleteAllScope, smoothChildTiming:this.smoothChildTiming}),
				cycle = vars.cycle,
				copy, i;
			if (typeof(targets) === "string") {
				targets = FWDTweenLite.selector(targets) || targets;
			}
			targets = targets || [];
			if (_FWDisSelector(targets)) { //senses if the targets object is a selector. If it is, we should translate it into an array.
				targets = _slice(targets);
			}
			stagger = stagger || 0;
			if (stagger < 0) {
				targets = _slice(targets);
				targets.reverse();
				stagger *= -1;
			}
			for (i = 0; i < targets.length; i++) {
				copy = _copy(vars);
				if (copy.startAt) {
					copy.startAt = _copy(copy.startAt);
					if (copy.startAt.cycle) {
						_applyCycle(copy.startAt, targets, i);
					}
				}
				if (cycle) {
					_applyCycle(copy, targets, i);
					if (copy.duration != null) {
						duration = copy.duration;
						delete copy.duration;
					}
				}
				tl.to(targets[i], duration, copy, i * stagger);
			}
			return this.add(tl, position);
		};

		p.staggerFrom = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			vars.immediateRender = (vars.immediateRender != false);
			vars.runBackwards = true;
			return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		p.staggerFromTo = function(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		p.call = function(callback, params, scope, position) {
			return this.add( FWDTweenLite.delayedCall(0, callback, params, scope), position);
		};

		p.set = function(target, vars, position) {
			position = this._parseTimeOrLabel(position, 0, true);
			if (vars.immediateRender == null) {
				vars.immediateRender = (position === this._time && !this._paused);
			}
			return this.add( new FWDTweenLite(target, 0, vars), position);
		};

		FWDTimelineLite.exportRoot = function(vars, ignoreDelayedCalls) {
			vars = vars || {};
			if (vars.smoothChildTiming == null) {
				vars.smoothChildTiming = true;
			}
			var tl = new FWDTimelineLite(vars),
				root = tl._timeline,
				tween, next;
			if (ignoreDelayedCalls == null) {
				ignoreDelayedCalls = true;
			}
			root._remove(tl, true);
			tl._startTime = 0;
			tl._rawPrevTime = tl._time = tl._totalTime = root._time;
			tween = root._first;
			while (tween) {
				next = tween._next;
				if (!ignoreDelayedCalls || !(tween instanceof FWDTweenLite && tween.target === tween.vars.onComplete)) {
					tl.add(tween, tween._startTime - tween._delay);
				}
				tween = next;
			}
			root.add(tl, 0);
			return tl;
		};

		p.add = function(value, position, align, stagger) {
			var curTime, l, i, child, tl, beforeRawTime;
			if (typeof(position) !== "number") {
				position = this._parseTimeOrLabel(position, 0, true, value);
			}
			if (!(value instanceof FWDAnim)) {
				if ((value instanceof Array) || (value && value.push && _FWDisArray(value))) {
					align = align || "normal";
					stagger = stagger || 0;
					curTime = position;
					l = value.length;
					for (i = 0; i < l; i++) {
						if (_FWDisArray(child = value[i])) {
							child = new FWDTimelineLite({tweens:child});
						}
						this.add(child, curTime);
						if (typeof(child) !== "string" && typeof(child) !== "function") {
							if (align === "sequence") {
								curTime = child._startTime + (child.totalDuration() / child._timeScale);
							} else if (align === "start") {
								child._startTime -= child.delay();
							}
						}
						curTime += stagger;
					}
					return this._uncache(true);
				} else if (typeof(value) === "string") {
					return this.addLabel(value, position);
				} else if (typeof(value) === "function") {
					value = FWDTweenLite.delayedCall(0, value);
				} else {
					throw("Cannot add " + value + " into the fwdtimline; it is not a tween, fwdtimline, function, or string.");
				}
			}

			FWDSimpleTimeline.prototype.add.call(this, value, position);

			//if the fwdtimline has already ended but the inserted tween/fwdtimline extends the duration, we should enable this fwdtimline again so that it renders properly. We should also align the playhead with the parent fwdtimline's when appropriate.
			if (this._gc || this._time === this._duration) if (!this._paused) if (this._duration < this.duration()) {
				//in case any of the ancestors had completed but should now be enabled...
				tl = this;
				beforeRawTime = (tl.rawTime() > value._startTime); //if the tween is placed on the fwdtimline so that it starts BEFORE the current rawTime, we should align the playhead (move the fwdtimline). This is because sometimes users will create a fwdtimline, let it finish, and much later append a tween and expect it to run instead of jumping to its end state. While technically one could argue that it should jump to its end state, that's not what users intuitively expect.
				while (tl._timeline) {
					if (beforeRawTime && tl._timeline.smoothChildTiming) {
						tl.totalTime(tl._totalTime, true); //moves the fwdtimline (shifts its startTime) if necessary, and also enables it.
					} else if (tl._gc) {
						tl._enabled(true, false);
					}
					tl = tl._timeline;
				}
			}

			return this;
		};

		p.remove = function(value) {
			if (value instanceof FWDAnim) {
				this._remove(value, false);
				var tl = value._timeline = value.vars.useFrames ? FWDAnim._rootFramesTimeline : FWDAnim._rootTimeline; //now that it's removed, default it to the root fwdtimline so that if it gets played again, it doesn't jump back into this fwdtimline.
				value._startTime = (value._paused ? value._pauseTime : tl._time) - ((!value._reversed ? value._totalTime : value.totalDuration() - value._totalTime) / value._timeScale); //ensure that if it gets played again, the timing is correct.
				return this;
			} else if (value instanceof Array || (value && value.push && _FWDisArray(value))) {
				var i = value.length;
				while (--i > -1) {
					this.remove(value[i]);
				}
				return this;
			} else if (typeof(value) === "string") {
				return this.removeLabel(value);
			}
			return this.kill(null, value);
		};

		p._remove = function(tween, skipDisable) {
			FWDSimpleTimeline.prototype._remove.call(this, tween, skipDisable);
			var last = this._last;
			if (!last) {
				this._time = this._totalTime = this._duration = this._totalDuration = 0;
			} else if (this._time > last._startTime + last._totalDuration / last._timeScale) {
				this._time = this.duration();
				this._totalTime = this._totalDuration;
			}
			return this;
		};

		p.append = function(value, offsetOrLabel) {
			return this.add(value, this._parseTimeOrLabel(null, offsetOrLabel, true, value));
		};

		p.insert = p.insertMultiple = function(value, position, align, stagger) {
			return this.add(value, position || 0, align, stagger);
		};

		p.appendMultiple = function(tweens, offsetOrLabel, align, stagger) {
			return this.add(tweens, this._parseTimeOrLabel(null, offsetOrLabel, true, tweens), align, stagger);
		};

		p.addLabel = function(label, position) {
			this._labels[label] = this._parseTimeOrLabel(position);
			return this;
		};

		p.addPause = function(position, callback, params, scope) {
			var t = FWDTweenLite.delayedCall(0, _pauseCallback, params, scope || this);
			t.vars.onComplete = t.vars.onReverseComplete = callback;
			t.data = "isPause";
			this._hasPause = true;
			return this.add(t, position);
		};

		p.removeLabel = function(label) {
			delete this._labels[label];
			return this;
		};

		p.getLabelTime = function(label) {
			return (this._labels[label] != null) ? this._labels[label] : -1;
		};

		p._parseTimeOrLabel = function(timeOrLabel, offsetOrLabel, appendIfAbsent, ignore) {
			var i;
			//if we're about to add a tween/fwdtimline (or an array of them) that's already a child of this fwdtimline, we should remove it first so that it doesn't contaminate the duration().
			if (ignore instanceof FWDAnim && ignore.fwdtimline === this) {
				this.remove(ignore);
			} else if (ignore && ((ignore instanceof Array) || (ignore.push && _FWDisArray(ignore)))) {
				i = ignore.length;
				while (--i > -1) {
					if (ignore[i] instanceof FWDAnim && ignore[i].fwdtimline === this) {
						this.remove(ignore[i]);
					}
				}
			}
			if (typeof(offsetOrLabel) === "string") {
				return this._parseTimeOrLabel(offsetOrLabel, (appendIfAbsent && typeof(timeOrLabel) === "number" && this._labels[offsetOrLabel] == null) ? timeOrLabel - this.duration() : 0, appendIfAbsent);
			}
			offsetOrLabel = offsetOrLabel || 0;
			if (typeof(timeOrLabel) === "string" && (isNaN(timeOrLabel) || this._labels[timeOrLabel] != null)) { //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
				i = timeOrLabel.indexOf("=");
				if (i === -1) {
					if (this._labels[timeOrLabel] == null) {
						return appendIfAbsent ? (this._labels[timeOrLabel] = this.duration() + offsetOrLabel) : offsetOrLabel;
					}
					return this._labels[timeOrLabel] + offsetOrLabel;
				}
				offsetOrLabel = parseInt(timeOrLabel.charAt(i-1) + "1", 10) * Number(timeOrLabel.substr(i+1));
				timeOrLabel = (i > 1) ? this._parseTimeOrLabel(timeOrLabel.substr(0, i-1), 0, appendIfAbsent) : this.duration();
			} else if (timeOrLabel == null) {
				timeOrLabel = this.duration();
			}
			return Number(timeOrLabel) + offsetOrLabel;
		};

		p.seek = function(position, suppressEvents) {
			return this.totalTime((typeof(position) === "number") ? position : this._parseTimeOrLabel(position), (suppressEvents !== false));
		};

		p.stop = function() {
			return this.paused(true);
		};

		p.gotoAndPlay = function(position, suppressEvents) {
			return this.play(position, suppressEvents);
		};

		p.gotoAndStop = function(position, suppressEvents) {
			return this.pause(position, suppressEvents);
		};

		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				prevTime = this._time,
				prevStart = this._startTime,
				prevTimeScale = this._timeScale,
				prevPaused = this._paused,
				tween, isComplete, next, callback, internalForce, pauseTween, curTime;
			if (time >= totalDur - 0.0000001) { //to work around occasional floating point math artifacts.
				this._totalTime = this._time = totalDur;
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					internalForce = !!this._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent fwdtimline.
					if (this._duration === 0) if ((time <= 0 && time >= -0.0000001) || this._rawPrevTime < 0 || this._rawPrevTime === _FWDtinyNum) if (this._rawPrevTime !== time && this._first) {
						internalForce = true;
						if (this._rawPrevTime > _FWDtinyNum) {
							callback = "onReverseComplete";
						}
					}
				}
				this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _FWDtinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration fwdtimline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a fwdtimline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				time = totalDur + 0.0001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off). Try (999999999999.7 - 999999999999) * 1 = 0.699951171875 instead of 0.7.

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;
				if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime !== _FWDtinyNum && (this._rawPrevTime > 0 || (time < 0 && this._rawPrevTime >= 0)))) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._timeline.autoRemoveChildren && this._reversed) { //ensures proper GC if a fwdtimline is resumed after it's finished reversing.
						internalForce = isComplete = true;
						callback = "onReverseComplete";
					} else if (this._rawPrevTime >= 0 && this._first) { //when going back beyond the start, force a render so that zero-duration tweens that sit at the very beginning render their start values properly. Otherwise, if the parent fwdtimline's playhead lands exactly at this fwdtimline's startTime, and then moves backwards, the zero-duration tweens at the beginning would still be at their end state.
						internalForce = true;
					}
					this._rawPrevTime = time;
				} else {
					this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _FWDtinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration fwdtimline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a fwdtimline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					if (time === 0 && isComplete) { //if there's a zero-duration tween at the very beginning of a fwdtimline and the playhead lands EXACTLY at time 0, that tween will correctly render its end values, but we need to keep the fwdtimline alive for one more render so that the beginning values render properly as the parent's playhead keeps moving beyond the begining. Imagine obj.x starts at 0 and then we do tl.set(obj, {x:100}).to(obj, 1, {x:200}) and then later we tl.reverse()...the goal is to have obj.x revert to 0. If the playhead happens to land on exactly 0, without this chunk of code, it'd complete the fwdtimline and remove it from the rendering queue (not good).
						tween = this._first;
						while (tween && tween._startTime === 0) {
							if (!tween._duration) {
								isComplete = false;
							}
							tween = tween._next;
						}
					}
					time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the fwdtimline)
					if (!this._initted) {
						internalForce = true;
					}
				}

			} else {

				if (this._hasPause && !this._forcingPlayhead && !suppressEvents) {
					if (time >= prevTime) {
						tween = this._first;
						while (tween && tween._startTime <= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && this._rawPrevTime === 0)) {
								pauseTween = tween;
							}
							tween = tween._next;
						}
					} else {
						tween = this._last;
						while (tween && tween._startTime >= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && tween._rawPrevTime > 0) {
								pauseTween = tween;
							}
							tween = tween._prev;
						}
					}
					if (pauseTween) {
						this._time = time = pauseTween._startTime;
						this._totalTime = time + (this._cycle * (this._totalDuration + this._repeatDelay));
					}
				}

				this._totalTime = this._time = this._rawPrevTime = time;
			}
			if ((this._time === prevTime || !this._first) && !force && !internalForce && !pauseTween) {
				return;
			} else if (!this._initted) {
				this._initted = true;
			}
			
			

			if (!this._active) if (!this._paused && this._time !== prevTime && time > 0) {
				this._active = true;  //so that if the user renders the fwdtimline (as opposed to the parent fwdtimline rendering it), it is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the fwdtimline already finished but the user manually re-renders it as halfway done, for example.
			}

			if (prevTime === 0) if (this.vars.onStart) if (this._time !== 0 || !this._duration) if (!suppressEvents) {
				this._callback("onStart");
			}

			curTime = this._time;
			if (curTime >= prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the fwdtimline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= curTime && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the fwdtimline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							pauseTween = tween._prev; //the linked list is organized by _startTime, thus it's possible that a tween could start BEFORE the pause and end after it, in which case it would be positioned before the pause tween in the linked list, but we should render it before we pause() the fwdtimline and cease rendering. This is only a concern when going in reverse.
							while (pauseTween && pauseTween.endTime() > this._time) {
								pauseTween.render( (pauseTween._reversed ? pauseTween.totalDuration() - ((time - pauseTween._startTime) * pauseTween._timeScale) : (time - pauseTween._startTime) * pauseTween._timeScale), suppressEvents, force);
								pauseTween = pauseTween._prev;
							}
							pauseTween = null;
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			}

			if (this._onUpdate) if (!suppressEvents) {
				if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a fwdtimline finishes, users expect things to have rendered fully. Imagine an onUpdate on a fwdtimline that reports/checks tweened values.
					_lazyRender();
				}
				this._callback("onUpdate");
			}

			if (callback) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this fwdtimline's startTime (like if an onComplete reversed the fwdtimline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a fwdtimline finishes, users expect things to have rendered fully. Imagine an onComplete on a fwdtimline that reports/checks tweened values.
						_lazyRender();
					}
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
			}
		};

		p._hasPausedChild = function() {
			var tween = this._first;
			while (tween) {
				if (tween._paused || ((tween instanceof FWDTimelineLite) && tween._hasPausedChild())) {
					return true;
				}
				tween = tween._next;
			}
			return false;
		};

		p.getChildren = function(nested, tweens, timelines, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || -9999999999;
			var a = [],
				tween = this._first,
				cnt = 0;
			while (tween) {
				if (tween._startTime < ignoreBeforeTime) {
					//do nothing
				} else if (tween instanceof FWDTweenLite) {
					if (tweens !== false) {
						a[cnt++] = tween;
					}
				} else {
					if (timelines !== false) {
						a[cnt++] = tween;
					}
					if (nested !== false) {
						a = a.concat(tween.getChildren(true, tweens, timelines));
						cnt = a.length;
					}
				}
				tween = tween._next;
			}
			return a;
		};

		p.getTweensOf = function(target, nested) {
			var disabled = this._gc,
				a = [],
				cnt = 0,
				tweens, i;
			if (disabled) {
				this._enabled(true, true); //getTweensOf() filters out disabled tweens, and we have to mark them as _gc = true when the fwdtimline completes in order to allow clean garbage collection, so temporarily re-enable the fwdtimline here.
			}
			tweens = FWDTweenLite.getTweensOf(target);
			i = tweens.length;
			while (--i > -1) {
				if (tweens[i].fwdtimline === this || (nested && this._contains(tweens[i]))) {
					a[cnt++] = tweens[i];
				}
			}
			if (disabled) {
				this._enabled(false, true);
			}
			return a;
		};

		p.recent = function() {
			return this._recent;
		};

		p._contains = function(tween) {
			var tl = tween.fwdtimline;
			while (tl) {
				if (tl === this) {
					return true;
				}
				tl = tl.fwdtimline;
			}
			return false;
		};

		p.shiftChildren = function(amount, adjustLabels, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || 0;
			var tween = this._first,
				labels = this._labels,
				p;
			while (tween) {
				if (tween._startTime >= ignoreBeforeTime) {
					tween._startTime += amount;
				}
				tween = tween._next;
			}
			if (adjustLabels) {
				for (p in labels) {
					if (labels[p] >= ignoreBeforeTime) {
						labels[p] += amount;
					}
				}
			}
			return this._uncache(true);
		};

		p._kill = function(vars, target) {
			if (!vars && !target) {
				return this._enabled(false, false);
			}
			var tweens = (!target) ? this.getChildren(true, true, false) : this.getTweensOf(target),
				i = tweens.length,
				changed = false;
			while (--i > -1) {
				if (tweens[i]._kill(vars, target)) {
					changed = true;
				}
			}
			return changed;
		};

		p.clear = function(labels) {
			var tweens = this.getChildren(false, true, true),
				i = tweens.length;
			this._time = this._totalTime = 0;
			while (--i > -1) {
				tweens[i]._enabled(false, false);
			}
			if (labels !== false) {
				this._labels = {};
			}
			return this._uncache(true);
		};

		p.invalidate = function() {
			var tween = this._first;
			while (tween) {
				tween.invalidate();
				tween = tween._next;
			}
			return FWDAnim.prototype.invalidate.call(this);;
		};

		p._enabled = function(enabled, ignoreTimeline) {
			if (enabled === this._gc) {
				var tween = this._first;
				while (tween) {
					tween._enabled(enabled, true);
					tween = tween._next;
				}
			}
			return FWDSimpleTimeline.prototype._enabled.call(this, enabled, ignoreTimeline);
		};

		p.totalTime = function(time, suppressEvents, uncapped) {
			this._forcingPlayhead = true;
			var val = FWDAnim.prototype.totalTime.apply(this, arguments);
			this._forcingPlayhead = false;
			return val;
		};

		p.duration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					this.totalDuration(); //just triggers recalculation
				}
				return this._duration;
			}
			if (this.duration() !== 0 && value !== 0) {
				this.timeScale(this._duration / value);
			}
			return this;
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					var max = 0,
						tween = this._last,
						prevStart = 999999999999,
						prev, end;
					while (tween) {
						prev = tween._prev; //record it here in case the tween changes position in the sequence...
						if (tween._dirty) {
							tween.totalDuration(); //could change the tween._startTime, so make sure the tween's cache is clean before analyzing it.
						}
						if (tween._startTime > prevStart && this._sortChildren && !tween._paused) { //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
							this.add(tween, tween._startTime - tween._delay);
						} else {
							prevStart = tween._startTime;
						}
						if (tween._startTime < 0 && !tween._paused) { //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
							max -= tween._startTime;
							if (this._timeline.smoothChildTiming) {
								this._startTime += tween._startTime / this._timeScale;
							}
							this.shiftChildren(-tween._startTime, false, -9999999999);
							prevStart = 0;
						}
						end = tween._startTime + (tween._totalDuration / tween._timeScale);
						if (end > max) {
							max = end;
						}
						tween = prev;
					}
					this._duration = this._totalDuration = max;
					this._dirty = false;
				}
				return this._totalDuration;
			}
			return (value && this.totalDuration()) ? this.timeScale(this._totalDuration / value) : this;
		};

		p.paused = function(value) {
			if (!value) { //if there's a pause directly at the spot from where we're unpausing, skip it.
				var tween = this._first,
					time = this._time;
				while (tween) {
					if (tween._startTime === time && tween.data === "isPause") {
						tween._rawPrevTime = 0; //remember, _rawPrevTime is how zero-duration tweens/callbacks sense directionality and determine whether or not to fire. If _rawPrevTime is the same as _startTime on the next render, it won't fire.
					}
					tween = tween._next;
				}
			}
			return FWDAnim.prototype.paused.apply(this, arguments);
		};

		p.usesFrames = function() {
			var tl = this._timeline;
			while (tl._timeline) {
				tl = tl._timeline;
			}
			return (tl === FWDAnim._rootFramesTimeline);
		};

		p.rawTime = function() {
			return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale;
		};

		return FWDTimelineLite;

	}, true);








	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * TimelineMax
 * ----------------------------------------------------------------
 */
	_fwd_gsScope.FWDFWD_gsDefine("TimelineMax", ["FWDTimelineLite","FWDTweenLite","easing.Ease"], function(FWDTimelineLite, FWDTweenLite, Ease) {

		var TimelineMax = function(vars) {
				FWDTimelineLite.call(this, vars);
				this._repeat = this.vars.repeat || 0;
				this._repeatDelay = this.vars.repeatDelay || 0;
				this._cycle = 0;
				this._yoyo = (this.vars.yoyo === true);
				this._dirty = true;
			},
			_FWDtinyNum = 0.0000000001,
			FWDTweenLiteInternals = FWDTweenLite._internals,
			_lazyTweens = FWDTweenLiteInternals.lazyTweens,
			_lazyRender = FWDTweenLiteInternals.lazyRender,
			_fwdglobals = _fwd_gsScope.FWDFWD_gsDefine.globals,
			_easeNone = new Ease(null, null, 1, 0),
			p = TimelineMax.prototype = new FWDTimelineLite();

		p.constructor = TimelineMax;
		p.kill()._gc = false;
		TimelineMax.version = "1.19.0";

		p.invalidate = function() {
			this._yoyo = (this.vars.yoyo === true);
			this._repeat = this.vars.repeat || 0;
			this._repeatDelay = this.vars.repeatDelay || 0;
			this._uncache(true);
			return FWDTimelineLite.prototype.invalidate.call(this);
		};

		p.addCallback = function(callback, position, params, scope) {
			return this.add( FWDTweenLite.delayedCall(0, callback, params, scope), position);
		};

		p.removeCallback = function(callback, position) {
			if (callback) {
				if (position == null) {
					this._kill(null, callback);
				} else {
					var a = this.getTweensOf(callback, false),
						i = a.length,
						time = this._parseTimeOrLabel(position);
					while (--i > -1) {
						if (a[i]._startTime === time) {
							a[i]._enabled(false, false);
						}
					}
				}
			}
			return this;
		};

		p.removePause = function(position) {
			return this.removeCallback(FWDTimelineLite._internals.pauseCallback, position);
		};

		p.tweenTo = function(position, vars) {
			vars = vars || {};
			var copy = {ease:_easeNone, useFrames:this.usesFrames(), immediateRender:false},
				Engine = (vars.repeat && _fwdglobals.FWDAnimation) || FWDTweenLite,
				duration, p, t;
			for (p in vars) {
				copy[p] = vars[p];
			}
			copy.time = this._parseTimeOrLabel(position);
			duration = (Math.abs(Number(copy.time) - this._time) / this._timeScale) || 0.001;
			t = new Engine(this, duration, copy);
			copy.onStart = function() {
				t.target.paused(true);
				if (t.vars.time !== t.target.time() && duration === t.duration()) { //don't make the duration zero - if it's supposed to be zero, don't worry because it's already initting the tween and will complete immediately, effectively making the duration zero anyway. If we make duration zero, the tween won't run at all.
					t.duration( Math.abs( t.vars.time - t.target.time()) / t.target._timeScale );
				}
				if (vars.onStart) { //in case the user had an onStart in the vars - we don't want to overwrite it.
					t._callback("onStart");
				}
			};
			return t;
		};

		p.tweenFromTo = function(fromPosition, toPosition, vars) {
			vars = vars || {};
			fromPosition = this._parseTimeOrLabel(fromPosition);
			vars.startAt = {onComplete:this.seek, onCompleteParams:[fromPosition], callbackScope:this};
			vars.immediateRender = (vars.immediateRender !== false);
			var t = this.tweenTo(toPosition, vars);
			return t.duration((Math.abs( t.vars.time - fromPosition) / this._timeScale) || 0.001);
		};

		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				dur = this._duration,
				prevTime = this._time,
				prevTotalTime = this._totalTime,
				prevStart = this._startTime,
				prevTimeScale = this._timeScale,
				prevRawPrevTime = this._rawPrevTime,
				prevPaused = this._paused,
				prevCycle = this._cycle,
				tween, isComplete, next, callback, internalForce, cycleDuration, pauseTween, curTime;
			if (time >= totalDur - 0.0000001) { //to work around occasional floating point math artifacts.
				if (!this._locked) {
					this._totalTime = totalDur;
					this._cycle = this._repeat;
				}
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					internalForce = !!this._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent fwdtimline.
					if (this._duration === 0) if ((time <= 0 && time >= -0.0000001) || prevRawPrevTime < 0 || prevRawPrevTime === _FWDtinyNum) if (prevRawPrevTime !== time && this._first) {
						internalForce = true;
						if (prevRawPrevTime > _FWDtinyNum) {
							callback = "onReverseComplete";
						}
					}
				}
				this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _FWDtinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration fwdtimline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a fwdtimline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				if (this._yoyo && (this._cycle & 1) !== 0) {
					this._time = time = 0;
				} else {
					this._time = dur;
					time = dur + 0.0001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off). Try (999999999999.7 - 999999999999) * 1 = 0.699951171875 instead of 0.7. We cannot do less then 0.0001 because the same issue can occur when the duration is extremely large like 999999999999 in which case adding 0.00000001, for example, causes it to act like nothing was added.
				}

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				if (!this._locked) {
					this._totalTime = this._cycle = 0;
				}
				this._time = 0;
				if (prevTime !== 0 || (dur === 0 && prevRawPrevTime !== _FWDtinyNum && (prevRawPrevTime > 0 || (time < 0 && prevRawPrevTime >= 0)) && !this._locked)) { //edge case for checking time < 0 && prevRawPrevTime >= 0: a zero-duration fromTo() tween inside a zero-duration fwdtimline (yeah, very rare)
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._timeline.autoRemoveChildren && this._reversed) {
						internalForce = isComplete = true;
						callback = "onReverseComplete";
					} else if (prevRawPrevTime >= 0 && this._first) { //when going back beyond the start, force a render so that zero-duration tweens that sit at the very beginning render their start values properly. Otherwise, if the parent fwdtimline's playhead lands exactly at this fwdtimline's startTime, and then moves backwards, the zero-duration tweens at the beginning would still be at their end state.
						internalForce = true;
					}
					this._rawPrevTime = time;
				} else {
					this._rawPrevTime = (dur || !suppressEvents || time || this._rawPrevTime === time) ? time : _FWDtinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration fwdtimline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a fwdtimline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					if (time === 0 && isComplete) { //if there's a zero-duration tween at the very beginning of a fwdtimline and the playhead lands EXACTLY at time 0, that tween will correctly render its end values, but we need to keep the fwdtimline alive for one more render so that the beginning values render properly as the parent's playhead keeps moving beyond the begining. Imagine obj.x starts at 0 and then we do tl.set(obj, {x:100}).to(obj, 1, {x:200}) and then later we tl.reverse()...the goal is to have obj.x revert to 0. If the playhead happens to land on exactly 0, without this chunk of code, it'd complete the fwdtimline and remove it from the rendering queue (not good).
						tween = this._first;
						while (tween && tween._startTime === 0) {
							if (!tween._duration) {
								isComplete = false;
							}
							tween = tween._next;
						}
					}
					time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the fwdtimline)
					if (!this._initted) {
						internalForce = true;
					}
				}

			} else {
				if (dur === 0 && prevRawPrevTime < 0) { //without this, zero-duration repeating timelines (like with a simple callback nested at the very beginning and a repeatDelay) wouldn't render the first time through.
					internalForce = true;
				}
				this._time = this._rawPrevTime = time;
				if (!this._locked) {
					this._totalTime = time;
					if (this._repeat !== 0) {
						cycleDuration = dur + this._repeatDelay;
						this._cycle = (this._totalTime / cycleDuration) >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but it gets reported as 0.79999999!)
						if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration && prevTotalTime <= time) {
							this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
						}
						this._time = this._totalTime - (this._cycle * cycleDuration);
						if (this._yoyo) if ((this._cycle & 1) !== 0) {
							this._time = dur - this._time;
						}
						if (this._time > dur) {
							this._time = dur;
							time = dur + 0.0001; //to avoid occasional floating point rounding error
						} else if (this._time < 0) {
							this._time = time = 0;
						} else {
							time = this._time;
						}
					}
				}

				if (this._hasPause && !this._forcingPlayhead && !suppressEvents) {
					time = this._time;
					if (time >= prevTime) {
						tween = this._first;
						while (tween && tween._startTime <= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && this._rawPrevTime === 0)) {
								pauseTween = tween;
							}
							tween = tween._next;
						}
					} else {
						tween = this._last;
						while (tween && tween._startTime >= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && tween._rawPrevTime > 0) {
								pauseTween = tween;
							}
							tween = tween._prev;
						}
					}
					if (pauseTween) {
						this._time = time = pauseTween._startTime;
						this._totalTime = time + (this._cycle * (this._totalDuration + this._repeatDelay));
					}
				}

			}

			if (this._cycle !== prevCycle) if (!this._locked) {
				/*
				make sure children at the end/beginning of the fwdtimline are rendered properly. If, for example,
				a 3-second long fwdtimline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
				would get transated to 2.8 seconds if the fwdtimline yoyos or 0.2 seconds if it just repeats), there
				could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
				we need to push the fwdtimline to the end (and/or beginning depending on its yoyo value). Also we must
				ensure that zero-duration tweens at the very beginning or end of the TimelineMax work.
				*/
				var backwards = (this._yoyo && (prevCycle & 1) !== 0),
					wrap = (backwards === (this._yoyo && (this._cycle & 1) !== 0)),
					recTotalTime = this._totalTime,
					recCycle = this._cycle,
					recRawPrevTime = this._rawPrevTime,
					recTime = this._time;

				this._totalTime = prevCycle * dur;
				if (this._cycle < prevCycle) {
					backwards = !backwards;
				} else {
					this._totalTime += dur;
				}
				this._time = prevTime; //temporarily revert _time so that render() renders the children in the correct order. Without this, tweens won't rewind correctly. We could arhictect things in a "cleaner" way by splitting out the rendering queue into a separate method but for performance reasons, we kept it all inside this method.

				this._rawPrevTime = (dur === 0) ? prevRawPrevTime - 0.0001 : prevRawPrevTime;
				this._cycle = prevCycle;
				this._locked = true; //prevents changes to totalTime and skips repeat/yoyo behavior when we recursively call render()
				prevTime = (backwards) ? 0 : dur;
				this.render(prevTime, suppressEvents, (dur === 0));
				if (!suppressEvents) if (!this._gc) {
					if (this.vars.onRepeat) {
						this._callback("onRepeat");
					}
				}
				if (prevTime !== this._time) { //in case there's a callback like onComplete in a nested tween/fwdtimline that changes the playhead position, like via seek(), we should just abort.
					return;
				}
				if (wrap) {
					prevTime = (backwards) ? dur + 0.0001 : -0.0001;
					this.render(prevTime, true, false);
				}
				this._locked = false;
				if (this._paused && !prevPaused) { //if the render() triggered callback that paused this fwdtimline, we should abort (very rare, but possible)
					return;
				}
				this._time = recTime;
				this._totalTime = recTotalTime;
				this._cycle = recCycle;
				this._rawPrevTime = recRawPrevTime;
			}

			if ((this._time === prevTime || !this._first) && !force && !internalForce && !pauseTween) {
				if (prevTotalTime !== this._totalTime) if (this._onUpdate) if (!suppressEvents) { //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
					this._callback("onUpdate");
				}
				return;
			} else if (!this._initted) {
				this._initted = true;
			}

			if (!this._active) if (!this._paused && this._totalTime !== prevTotalTime && time > 0) {
				this._active = true;  //so that if the user renders the fwdtimline (as opposed to the parent fwdtimline rendering it), it is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the fwdtimline already finished but the user manually re-renders it as halfway done, for example.
			}

			if (prevTotalTime === 0) if (this.vars.onStart) if (this._totalTime !== 0 || !this._totalDuration) if (!suppressEvents) {
				this._callback("onStart");
			}

			curTime = this._time;
			if (curTime >= prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the fwdtimline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= this._time && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the fwdtimline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							pauseTween = tween._prev; //the linked list is organized by _startTime, thus it's possible that a tween could start BEFORE the pause and end after it, in which case it would be positioned before the pause tween in the linked list, but we should render it before we pause() the fwdtimline and cease rendering. This is only a concern when going in reverse.
							while (pauseTween && pauseTween.endTime() > this._time) {
								pauseTween.render( (pauseTween._reversed ? pauseTween.totalDuration() - ((time - pauseTween._startTime) * pauseTween._timeScale) : (time - pauseTween._startTime) * pauseTween._timeScale), suppressEvents, force);
								pauseTween = pauseTween._prev;
							}
							pauseTween = null;
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			}

			if (this._onUpdate) if (!suppressEvents) {
				if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a fwdtimline finishes, users expect things to have rendered fully. Imagine an onUpdate on a fwdtimline that reports/checks tweened values.
					_lazyRender();
				}
				this._callback("onUpdate");
			}
			if (callback) if (!this._locked) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this fwdtimline's startTime (like if an onComplete reversed the fwdtimline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a fwdtimline finishes, users expect things to have rendered fully. Imagine an onComplete on a fwdtimline that reports/checks tweened values.
						_lazyRender();
					}
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
			}
		};

		p.getActive = function(nested, tweens, timelines) {
			if (nested == null) {
				nested = true;
			}
			if (tweens == null) {
				tweens = true;
			}
			if (timelines == null) {
				timelines = false;
			}
			var a = [],
				all = this.getChildren(nested, tweens, timelines),
				cnt = 0,
				l = all.length,
				i, tween;
			for (i = 0; i < l; i++) {
				tween = all[i];
				if (tween.isActive()) {
					a[cnt++] = tween;
				}
			}
			return a;
		};


		p.getLabelAfter = function(time) {
			if (!time) if (time !== 0) { //faster than isNan()
				time = this._time;
			}
			var labels = this.getLabelsArray(),
				l = labels.length,
				i;
			for (i = 0; i < l; i++) {
				if (labels[i].time > time) {
					return labels[i].name;
				}
			}
			return null;
		};

		p.getLabelBefore = function(time) {
			if (time == null) {
				time = this._time;
			}
			var labels = this.getLabelsArray(),
				i = labels.length;
			while (--i > -1) {
				if (labels[i].time < time) {
					return labels[i].name;
				}
			}
			return null;
		};

		p.getLabelsArray = function() {
			var a = [],
				cnt = 0,
				p;
			for (p in this._labels) {
				a[cnt++] = {time:this._labels[p], name:p};
			}
			a.sort(function(a,b) {
				return a.time - b.time;
			});
			return a;
		};


//---- GETTERS / SETTERS -------------------------------------------------------------------------------------------------------

		p.progress = function(value, suppressEvents) {
			return (!arguments.length) ? this._time / this.duration() : this.totalTime( this.duration() * ((this._yoyo && (this._cycle & 1) !== 0) ? 1 - value : value) + (this._cycle * (this._duration + this._repeatDelay)), suppressEvents);
		};

		p.totalProgress = function(value, suppressEvents) {
			return (!arguments.length) ? this._totalTime / this.totalDuration() : this.totalTime( this.totalDuration() * value, suppressEvents);
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					FWDTimelineLite.prototype.totalDuration.call(this); //just forces refresh
					//Instead of Infinity, we use 999999999999 so that we can accommodate reverses.
					this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
				}
				return this._totalDuration;
			}
			return (this._repeat === -1 || !value) ? this : this.timeScale( this.totalDuration() / value );
		};

		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			if (value > this._duration) {
				value = this._duration;
			}
			if (this._yoyo && (this._cycle & 1) !== 0) {
				value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));
			} else if (this._repeat !== 0) {
				value += this._cycle * (this._duration + this._repeatDelay);
			}
			return this.totalTime(value, suppressEvents);
		};

		p.repeat = function(value) {
			if (!arguments.length) {
				return this._repeat;
			}
			this._repeat = value;
			return this._uncache(true);
		};

		p.repeatDelay = function(value) {
			if (!arguments.length) {
				return this._repeatDelay;
			}
			this._repeatDelay = value;
			return this._uncache(true);
		};

		p.yoyo = function(value) {
			if (!arguments.length) {
				return this._yoyo;
			}
			this._yoyo = value;
			return this;
		};

		p.currentLabel = function(value) {
			if (!arguments.length) {
				return this.getLabelBefore(this._time + 0.00000001);
			}
			return this.seek(value, true);
		};

		return TimelineMax;

	}, true);
	




	
	
	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * BezierPlugin
 * ----------------------------------------------------------------
 */
	(function() {

		var _RAD2DEG = 180 / Math.PI,
			_r1 = [],
			_r2 = [],
			_r3 = [],
			_corProps = {},
			_fwdglobals = _fwd_gsScope.FWDFWD_gsDefine.globals,
			Segment = function(a, b, c, d) {
				if (c === d) { //if c and d match, the final autoRotate value could lock at -90 degrees, so differentiate them slightly.
					c = d - (d - b) / 1000000;
				}
				if (a === b) { //if a and b match, the starting autoRotate value could lock at -90 degrees, so differentiate them slightly.
					b = a + (c - a) / 1000000;
				}
				this.a = a;
				this.b = b;
				this.c = c;
				this.d = d;
				this.da = d - a;
				this.ca = c - a;
				this.ba = b - a;
			},
			_correlate = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
			cubicToQuadratic = function(a, b, c, d) {
				var q1 = {a:a},
					q2 = {},
					q3 = {},
					q4 = {c:d},
					mab = (a + b) / 2,
					mbc = (b + c) / 2,
					mcd = (c + d) / 2,
					mabc = (mab + mbc) / 2,
					mbcd = (mbc + mcd) / 2,
					m8 = (mbcd - mabc) / 8;
				q1.b = mab + (a - mab) / 4;
				q2.b = mabc + m8;
				q1.c = q2.a = (q1.b + q2.b) / 2;
				q2.c = q3.a = (mabc + mbcd) / 2;
				q3.b = mbcd - m8;
				q4.b = mcd + (d - mcd) / 4;
				q3.c = q4.a = (q3.b + q4.b) / 2;
				return [q1, q2, q3, q4];
			},
			_calculateControlPoints = function(a, curviness, quad, basic, correlate) {
				var l = a.length - 1,
					ii = 0,
					cp1 = a[0].a,
					i, p1, p2, p3, seg, m1, m2, mm, cp2, qb, r1, r2, tl;
				for (i = 0; i < l; i++) {
					seg = a[ii];
					p1 = seg.a;
					p2 = seg.d;
					p3 = a[ii+1].d;

					if (correlate) {
						r1 = _r1[i];
						r2 = _r2[i];
						tl = ((r2 + r1) * curviness * 0.25) / (basic ? 0.5 : _r3[i] || 0.5);
						m1 = p2 - (p2 - p1) * (basic ? curviness * 0.5 : (r1 !== 0 ? tl / r1 : 0));
						m2 = p2 + (p3 - p2) * (basic ? curviness * 0.5 : (r2 !== 0 ? tl / r2 : 0));
						mm = p2 - (m1 + (((m2 - m1) * ((r1 * 3 / (r1 + r2)) + 0.5) / 4) || 0));
					} else {
						m1 = p2 - (p2 - p1) * curviness * 0.5;
						m2 = p2 + (p3 - p2) * curviness * 0.5;
						mm = p2 - (m1 + m2) / 2;
					}
					m1 += mm;
					m2 += mm;

					seg.c = cp2 = m1;
					if (i !== 0) {
						seg.b = cp1;
					} else {
						seg.b = cp1 = seg.a + (seg.c - seg.a) * 0.6; //instead of placing b on a exactly, we move it inline with c so that if the user specifies an ease like Back.easeIn or Elastic.easeIn which goes BEYOND the beginning, it will do so smoothly.
					}

					seg.da = p2 - p1;
					seg.ca = cp2 - p1;
					seg.ba = cp1 - p1;

					if (quad) {
						qb = cubicToQuadratic(p1, cp1, cp2, p2);
						a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
						ii += 4;
					} else {
						ii++;
					}

					cp1 = m2;
				}
				seg = a[ii];
				seg.b = cp1;
				seg.c = cp1 + (seg.d - cp1) * 0.4; //instead of placing c on d exactly, we move it inline with b so that if the user specifies an ease like Back.easeOut or Elastic.easeOut which goes BEYOND the end, it will do so smoothly.
				seg.da = seg.d - seg.a;
				seg.ca = seg.c - seg.a;
				seg.ba = cp1 - seg.a;
				if (quad) {
					qb = cubicToQuadratic(seg.a, cp1, seg.c, seg.d);
					a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
				}
			},
			_parseAnchors = function(values, p, correlate, prepend) {
				var a = [],
					l, i, p1, p2, p3, tmp;
				if (prepend) {
					values = [prepend].concat(values);
					i = values.length;
					while (--i > -1) {
						if (typeof( (tmp = values[i][p]) ) === "string") if (tmp.charAt(1) === "=") {
							values[i][p] = prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)); //accommodate relative values. Do it inline instead of breaking it out into a function for speed reasons
						}
					}
				}
				l = values.length - 2;
				if (l < 0) {
					a[0] = new Segment(values[0][p], 0, 0, values[(l < -1) ? 0 : 1][p]);
					return a;
				}
				for (i = 0; i < l; i++) {
					p1 = values[i][p];
					p2 = values[i+1][p];
					a[i] = new Segment(p1, 0, 0, p2);
					if (correlate) {
						p3 = values[i+2][p];
						_r1[i] = (_r1[i] || 0) + (p2 - p1) * (p2 - p1);
						_r2[i] = (_r2[i] || 0) + (p3 - p2) * (p3 - p2);
					}
				}
				a[i] = new Segment(values[i][p], 0, 0, values[i+1][p]);
				return a;
			},
			bezierThrough = function(values, curviness, quadratic, basic, correlate, prepend) {
				var obj = {},
					props = [],
					first = prepend || values[0],
					i, p, a, j, r, l, seamless, last;
				correlate = (typeof(correlate) === "string") ? ","+correlate+"," : _correlate;
				if (curviness == null) {
					curviness = 1;
				}
				for (p in values[0]) {
					props.push(p);
				}
				//check to see if the last and first values are identical (well, within 0.05). If so, make seamless by appending the second element to the very end of the values array and the 2nd-to-last element to the very beginning (we'll remove those segments later)
				if (values.length > 1) {
					last = values[values.length - 1];
					seamless = true;
					i = props.length;
					while (--i > -1) {
						p = props[i];
						if (Math.abs(first[p] - last[p]) > 0.05) { //build in a tolerance of +/-0.05 to accommodate rounding errors.
							seamless = false;
							break;
						}
					}
					if (seamless) {
						values = values.concat(); //duplicate the array to avoid contaminating the original which the user may be reusing for other tweens
						if (prepend) {
							values.unshift(prepend);
						}
						values.push(values[1]);
						prepend = values[values.length - 3];
					}
				}
				_r1.length = _r2.length = _r3.length = 0;
				i = props.length;
				while (--i > -1) {
					p = props[i];
					_corProps[p] = (correlate.indexOf(","+p+",") !== -1);
					obj[p] = _parseAnchors(values, p, _corProps[p], prepend);
				}
				i = _r1.length;
				while (--i > -1) {
					_r1[i] = Math.sqrt(_r1[i]);
					_r2[i] = Math.sqrt(_r2[i]);
				}
				if (!basic) {
					i = props.length;
					while (--i > -1) {
						if (_corProps[p]) {
							a = obj[props[i]];
							l = a.length - 1;
							for (j = 0; j < l; j++) {
								r = (a[j+1].da / _r2[j] + a[j].da / _r1[j]) || 0;
								_r3[j] = (_r3[j] || 0) + r * r;
							}
						}
					}
					i = _r3.length;
					while (--i > -1) {
						_r3[i] = Math.sqrt(_r3[i]);
					}
				}
				i = props.length;
				j = quadratic ? 4 : 1;
				while (--i > -1) {
					p = props[i];
					a = obj[p];
					_calculateControlPoints(a, curviness, quadratic, basic, _corProps[p]); //this method requires that _parseAnchors() and _setSegmentRatios() ran first so that _r1, _r2, and _r3 values are populated for all properties
					if (seamless) {
						a.splice(0, j);
						a.splice(a.length - j, j);
					}
				}
				return obj;
			},
			_parseBezierData = function(values, type, prepend) {
				type = type || "soft";
				var obj = {},
					inc = (type === "cubic") ? 3 : 2,
					soft = (type === "soft"),
					props = [],
					a, b, c, d, cur, i, j, l, p, cnt, tmp;
				if (soft && prepend) {
					values = [prepend].concat(values);
				}
				if (values == null || values.length < inc + 1) { throw "invalid Bezier data"; }
				for (p in values[0]) {
					props.push(p);
				}
				i = props.length;
				while (--i > -1) {
					p = props[i];
					obj[p] = cur = [];
					cnt = 0;
					l = values.length;
					for (j = 0; j < l; j++) {
						a = (prepend == null) ? values[j][p] : (typeof( (tmp = values[j][p]) ) === "string" && tmp.charAt(1) === "=") ? prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)) : Number(tmp);
						if (soft) if (j > 1) if (j < l - 1) {
							cur[cnt++] = (a + cur[cnt-2]) / 2;
						}
						cur[cnt++] = a;
					}
					l = cnt - inc + 1;
					cnt = 0;
					for (j = 0; j < l; j += inc) {
						a = cur[j];
						b = cur[j+1];
						c = cur[j+2];
						d = (inc === 2) ? 0 : cur[j+3];
						cur[cnt++] = tmp = (inc === 3) ? new Segment(a, b, c, d) : new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
					}
					cur.length = cnt;
				}
				return obj;
			},
			_addCubicLengths = function(a, steps, resolution) {
				var inc = 1 / resolution,
					j = a.length,
					d, d1, s, da, ca, ba, p, i, inv, bez, index;
				while (--j > -1) {
					bez = a[j];
					s = bez.a;
					da = bez.d - s;
					ca = bez.c - s;
					ba = bez.b - s;
					d = d1 = 0;
					for (i = 1; i <= resolution; i++) {
						p = inc * i;
						inv = 1 - p;
						d = d1 - (d1 = (p * p * da + 3 * inv * (p * ca + inv * ba)) * p);
						index = j * resolution + i - 1;
						steps[index] = (steps[index] || 0) + d * d;
					}
				}
			},
			_parseLengthData = function(obj, resolution) {
				resolution = resolution >> 0 || 6;
				var a = [],
					lengths = [],
					d = 0,
					total = 0,
					threshold = resolution - 1,
					segments = [],
					curLS = [], //current length segments array
					p, i, l, index;
				for (p in obj) {
					_addCubicLengths(obj[p], a, resolution);
				}
				l = a.length;
				for (i = 0; i < l; i++) {
					d += Math.sqrt(a[i]);
					index = i % resolution;
					curLS[index] = d;
					if (index === threshold) {
						total += d;
						index = (i / resolution) >> 0;
						segments[index] = curLS;
						lengths[index] = total;
						d = 0;
						curLS = [];
					}
				}
				return {length:total, lengths:lengths, segments:segments};
			},



			BezierPlugin = _fwd_gsScope.FWDFWD_gsDefine.plugin({
					propName: "bezier",
					priority: -1,
					version: "1.3.7",
					API: 2,
					fwd_global:true,

					//gets called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
					init: function(target, vars, tween) {
						this._target = target;
						if (vars instanceof Array) {
							vars = {values:vars};
						}
						this._func = {};
						this._mod = {};
						this._props = [];
						this._timeRes = (vars.timeResolution == null) ? 6 : parseInt(vars.timeResolution, 10);
						var values = vars.values || [],
							first = {},
							second = values[0],
							autoRotate = vars.autoRotate || tween.vars.orientToBezier,
							p, isFunc, i, j, prepend;

						this._autoRotate = autoRotate ? (autoRotate instanceof Array) ? autoRotate : [["x","y","rotation",((autoRotate === true) ? 0 : Number(autoRotate) || 0)]] : null;
						for (p in second) {
							this._props.push(p);
						}

						i = this._props.length;
						while (--i > -1) {
							p = this._props[i];

							this._overwriteProps.push(p);
							isFunc = this._func[p] = (typeof(target[p]) === "function");
							first[p] = (!isFunc) ? parseFloat(target[p]) : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]();
							if (!prepend) if (first[p] !== values[0][p]) {
								prepend = first;
							}
						}
						this._beziers = (vars.type !== "cubic" && vars.type !== "quadratic" && vars.type !== "soft") ? bezierThrough(values, isNaN(vars.curviness) ? 1 : vars.curviness, false, (vars.type === "thruBasic"), vars.correlate, prepend) : _parseBezierData(values, vars.type, first);
						this._segCount = this._beziers[p].length;

						if (this._timeRes) {
							var ld = _parseLengthData(this._beziers, this._timeRes);
							this._length = ld.length;
							this._lengths = ld.lengths;
							this._segments = ld.segments;
							this._l1 = this._li = this._s1 = this._si = 0;
							this._l2 = this._lengths[0];
							this._curSeg = this._segments[0];
							this._s2 = this._curSeg[0];
							this._prec = 1 / this._curSeg.length;
						}

						if ((autoRotate = this._autoRotate)) {
							this._initialRotations = [];
							if (!(autoRotate[0] instanceof Array)) {
								this._autoRotate = autoRotate = [autoRotate];
							}
							i = autoRotate.length;
							while (--i > -1) {
								for (j = 0; j < 3; j++) {
									p = autoRotate[i][j];
									this._func[p] = (typeof(target[p]) === "function") ? target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ] : false;
								}
								p = autoRotate[i][2];
								this._initialRotations[i] = (this._func[p] ? this._func[p].call(this._target) : this._target[p]) || 0;
								this._overwriteProps.push(p);
							}
						}
						this._startRatio = tween.vars.runBackwards ? 1 : 0; //we determine the starting ratio when the tween inits which is always 0 unless the tween has runBackwards:true (indicating it's a from() tween) in which case it's 1.
						return true;
					},

					//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
					set: function(v) {
						var segments = this._segCount,
							func = this._func,
							target = this._target,
							notStart = (v !== this._startRatio),
							curIndex, inv, i, p, b, t, val, l, lengths, curSeg;
						if (!this._timeRes) {
							curIndex = (v < 0) ? 0 : (v >= 1) ? segments - 1 : (segments * v) >> 0;
							t = (v - (curIndex * (1 / segments))) * segments;
						} else {
							lengths = this._lengths;
							curSeg = this._curSeg;
							v *= this._length;
							i = this._li;
							//find the appropriate segment (if the currently cached one isn't correct)
							if (v > this._l2 && i < segments - 1) {
								l = segments - 1;
								while (i < l && (this._l2 = lengths[++i]) <= v) {	}
								this._l1 = lengths[i-1];
								this._li = i;
								this._curSeg = curSeg = this._segments[i];
								this._s2 = curSeg[(this._s1 = this._si = 0)];
							} else if (v < this._l1 && i > 0) {
								while (i > 0 && (this._l1 = lengths[--i]) >= v) { }
								if (i === 0 && v < this._l1) {
									this._l1 = 0;
								} else {
									i++;
								}
								this._l2 = lengths[i];
								this._li = i;
								this._curSeg = curSeg = this._segments[i];
								this._s1 = curSeg[(this._si = curSeg.length - 1) - 1] || 0;
								this._s2 = curSeg[this._si];
							}
							curIndex = i;
							//now find the appropriate sub-segment (we split it into the number of pieces that was defined by "precision" and measured each one)
							v -= this._l1;
							i = this._si;
							if (v > this._s2 && i < curSeg.length - 1) {
								l = curSeg.length - 1;
								while (i < l && (this._s2 = curSeg[++i]) <= v) {	}
								this._s1 = curSeg[i-1];
								this._si = i;
							} else if (v < this._s1 && i > 0) {
								while (i > 0 && (this._s1 = curSeg[--i]) >= v) {	}
								if (i === 0 && v < this._s1) {
									this._s1 = 0;
								} else {
									i++;
								}
								this._s2 = curSeg[i];
								this._si = i;
							}
							t = ((i + (v - this._s1) / (this._s2 - this._s1)) * this._prec) || 0;
						}
						inv = 1 - t;

						i = this._props.length;
						while (--i > -1) {
							p = this._props[i];
							b = this._beziers[p][curIndex];
							val = (t * t * b.da + 3 * inv * (t * b.ca + inv * b.ba)) * t + b.a;
							if (this._mod[p]) {
								val = this._mod[p](val, target);
							}
							if (func[p]) {
								target[p](val);
							} else {
								if (p == "x")
								{
									target.setX(val);
								}
								else if (p == "y")
								{
									target.setY(val);
								}
								else if (p == "z")
								{
									target.setZ(val);
								}
								else if (p == "angleX")
								{
									target.setAngleX(val);
								}
								else if (p == "angleY")
								{
									target.setAngleY(val);
								}
								else if (p == "angleZ")
								{
									target.setAngleZ(val);
								}
								else if (p == "w")
								{
									target.setWidth(val);
								}
								else if (p == "h")
								{
									target.setHeight(val);
								}
								else if (p == "alpha")
								{
									target.setAlpha(val);
								}
								else if (p == "scale")
								{
									target.setScale2(val);
								}
								else
								{
									target[p] = val;
								}
							}
						}

						if (this._autoRotate) {
							var ar = this._autoRotate,
								b2, x1, y1, x2, y2, add, conv;
							i = ar.length;
							while (--i > -1) {
								p = ar[i][2];
								add = ar[i][3] || 0;
								conv = (ar[i][4] === true) ? 1 : _RAD2DEG;
								b = this._beziers[ar[i][0]];
								b2 = this._beziers[ar[i][1]];

								if (b && b2) { //in case one of the properties got overwritten.
									b = b[curIndex];
									b2 = b2[curIndex];

									x1 = b.a + (b.b - b.a) * t;
									x2 = b.b + (b.c - b.b) * t;
									x1 += (x2 - x1) * t;
									x2 += ((b.c + (b.d - b.c) * t) - x2) * t;

									y1 = b2.a + (b2.b - b2.a) * t;
									y2 = b2.b + (b2.c - b2.b) * t;
									y1 += (y2 - y1) * t;
									y2 += ((b2.c + (b2.d - b2.c) * t) - y2) * t;

									val = notStart ? Math.atan2(y2 - y1, x2 - x1) * conv + add : this._initialRotations[i];

									if (this._mod[p]) {
										val = this._mod[p](val, target); //for modProps
									}

									if (func[p]) {
										target[p](val);
									} else {
										target[p] = val;
									}
								}
							}
						}
					}
			}),
			p = BezierPlugin.prototype;


		BezierPlugin.bezierThrough = bezierThrough;
		BezierPlugin.cubicToQuadratic = cubicToQuadratic;
		BezierPlugin._autoCSS = true; //indicates that this plugin can be inserted into the "css" object using the autoCSS feature of FWDTweenLite
		BezierPlugin.quadraticToCubic = function(a, b, c) {
			return new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
		};

		BezierPlugin._cssRegister = function() {
			var CSSPlugin = _fwdglobals.CSSPlugin;
			if (!CSSPlugin) {
				return;
			}
			var _internals = CSSPlugin._internals,
				_parseToProxy = _internals._parseToProxy,
				_setPluginRatio = _internals._setPluginRatio,
				CSSPropTween = _internals.CSSPropTween;
			_internals._registerComplexSpecialProp("bezier", {parser:function(t, e, prop, cssp, pt, plugin) {
				if (e instanceof Array) {
					e = {values:e};
				}
				plugin = new BezierPlugin();
				var values = e.values,
					l = values.length - 1,
					pluginValues = [],
					v = {},
					i, p, data;
				if (l < 0) {
					return pt;
				}
				for (i = 0; i <= l; i++) {
					data = _parseToProxy(t, values[i], cssp, pt, plugin, (l !== i));
					pluginValues[i] = data.end;
				}
				for (p in e) {
					v[p] = e[p]; //duplicate the vars object because we need to alter some things which would cause problems if the user plans to reuse the same vars object for another tween.
				}
				v.values = pluginValues;
				pt = new CSSPropTween(t, "bezier", 0, 0, data.pt, 2);
				pt.data = data;
				pt.plugin = plugin;
				pt.setRatio = _setPluginRatio;
				if (v.autoRotate === 0) {
					v.autoRotate = true;
				}
				if (v.autoRotate && !(v.autoRotate instanceof Array)) {
					i = (v.autoRotate === true) ? 0 : Number(v.autoRotate);
					v.autoRotate = (data.end.left != null) ? [["left","top","rotation",i,false]] : (data.end.x != null) ? [["x","y","rotation",i,false]] : false;
				}
				if (v.autoRotate) {
					if (!cssp._transform) {
						cssp._enableTransforms(false);
					}
					data.autoRotate = cssp._target._gsTransform;
					data.proxy.rotation = data.autoRotate.rotation || 0;
					cssp._overwriteProps.push("rotation");
				}
				plugin._onInitTween(data.proxy, v, cssp._tween);
				return pt;
			}});
		};

		p._mod = function(lookup) {
			var op = this._overwriteProps,
				i = op.length,
				val;
			while (--i > -1) {
				val = lookup[op[i]];
				if (val && typeof(val) === "function") {
					this._mod[op[i]] = val;
				}
			}
		};

		p._kill = function(lookup) {
			var a = this._props,
				p, i;
			for (p in this._beziers) {
				if (p in lookup) {
					delete this._beziers[p];
					delete this._func[p];
					i = a.length;
					while (--i > -1) {
						if (a[i] === p) {
							a.splice(i, 1);
						}
					}
				}
			}
			a = this._autoRotate;
			if (a) {
				i = a.length;
				while (--i > -1) {
					if (lookup[a[i][2]]) {
						a.splice(i, 1);
					}
				}
			}
			return this._super._kill.call(this, lookup);
		};

	}());






	
	
	
	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * CSSPlugin
 * ----------------------------------------------------------------
 */
	_fwd_gsScope.FWDFWD_gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin","FWDTweenLite"], function(TweenPlugin, FWDTweenLite) {

		/** @constructor **/
		var CSSPlugin = function() {
				TweenPlugin.call(this, "css");
				this._overwriteProps.length = 0;
				this.setRatio = CSSPlugin.prototype.setRatio; //speed optimization (avoid prototype lookup on this "hot" method)
			},
			_fwdglobals = _fwd_gsScope.FWDFWD_gsDefine.globals,
			_hasPriority, //turns true whenever a CSSPropTween instance is created that has a priority other than 0. This helps us discern whether or not we should spend the time organizing the linked list or not after a CSSPlugin's _onInitTween() method is called.
			_suffixMap, //we set this in _onInitTween() each time as a way to have a persistent variable we can use in other methods like _parse() without having to pass it around as a parameter and we keep _parse() decoupled from a particular CSSPlugin instance
			_cs, //computed style (we store this in a shared variable to conserve memory and make minification tighter
			_overwriteProps, //alias to the currently instantiating CSSPlugin's _overwriteProps array. We use this closure in order to avoid having to pass a reference around from method to method and aid in minification.
			_specialProps = {},
			p = CSSPlugin.prototype = new TweenPlugin("css");

		p.constructor = CSSPlugin;
		CSSPlugin.version = "1.19.0";
		CSSPlugin.API = 2;
		CSSPlugin.defaultTransformPerspective = 0;
		CSSPlugin.defaultSkewType = "compensated";
		CSSPlugin.defaultSmoothOrigin = true;
		p = "px"; //we'll reuse the "p" variable to keep file size down
		CSSPlugin.suffixMap = {top:p, right:p, bottom:p, left:p, width:p, height:p, fontSize:p, padding:p, margin:p, perspective:p, lineHeight:""};


		var _numExp = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
			_relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
			_valuesExp = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, //finds all the values that begin with numbers or += or -= and then a number. Includes suffixes. We use this to split complex values apart like "1px 5px 20px rgb(255,102,51)"
			_NaNExp = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g, //also allows scientific notation and doesn't kill the leading -/+ in -= and +=
			_suffixExp = /(?:\d|\-|\+|=|#|\.)*/g,
			_opacityExp = /opacity *= *([^)]*)/i,
			_opacityValExp = /opacity:([^;]*)/i,
			_alphaFilterExp = /alpha\(opacity *=.+?\)/i,
			_rgbhslExp = /^(rgb|hsl)/,
			_capsExp = /([A-Z])/g,
			_camelExp = /-([a-z])/gi,
			_urlExp = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, //for pulling out urls from url(...) or url("...") strings (some browsers wrap urls in quotes, some don't when reporting things like backgroundImage)
			_camelFunc = function(s, g) { return g.toUpperCase(); },
			_horizExp = /(?:Left|Right|Width)/i,
			_ieGetMatrixExp = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
			_ieSetMatrixExp = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
			_commasOutsideParenExp = /,(?=[^\)]*(?:\(|$))/gi, //finds any commas that are not within parenthesis
			_complexExp = /[\s,\(]/i, //for testing a string to find if it has a space, comma, or open parenthesis (clues that it's a complex value)
			_DEG2RAD = Math.PI / 180,
			_RAD2DEG = 180 / Math.PI,
			_forcePT = {},
			_doc = document,
			_createElement = function(type) {
				return _doc.createElementNS ? _doc.createElementNS("http://www.w3.org/1999/xhtml", type) : _doc.createElement(type);
			},
			_tempDiv = _createElement("div"),
			_tempImg = _createElement("img"),
			_internals = CSSPlugin._internals = {_specialProps:_specialProps}, //provides a hook to a few internal methods that we need to access from inside other plugins
			_agent = navigator.userAgent,
			_autoRound,
			_reqSafariFix, //we won't apply the Safari transform fix until we actually come across a tween that affects a transform property (to maintain best performance).

			_isSafari,
			_isFirefox, //Firefox has a bug that causes 3D transformed elements to randomly disappear unless a repaint is forced after each update on each element.
			_isSafariLT6, //Safari (and Android 4 which uses a flavor of Safari) has a bug that prevents changes to "top" and "left" properties from rendering properly if changed on the same frame as a transform UNLESS we set the element's WebkitBackfaceVisibility to hidden (weird, I know). Doing this for Android 3 and earlier seems to actually cause other problems, though (fun!)
			_ieVers,
			_supportsOpacity = (function() { //we set _isSafari, _ieVers, _isFirefox, and _supportsOpacity all in one function here to reduce file size slightly, especially in the minified version.
				var i = _agent.indexOf("Android"),
					a = _createElement("a");
				_isSafari = (_agent.indexOf("Safari") !== -1 && _agent.indexOf("Chrome") === -1 && (i === -1 || Number(_agent.substr(i+8, 1)) > 3));
				_isSafariLT6 = (_isSafari && (Number(_agent.substr(_agent.indexOf("Version/")+8, 1)) < 6));
				_isFirefox = (_agent.indexOf("Firefox") !== -1);
				if ((/MSIE ([0-9]{1,}[\.0-9]{0,})/).exec(_agent) || (/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/).exec(_agent)) {
					_ieVers = parseFloat( RegExp.$1 );
				}
				if (!a) {
					return false;
				}
				a.style.cssText = "top:1px;opacity:.55;";
				return /^0.55/.test(a.style.opacity);
			}()),
			_getIEOpacity = function(v) {
				return (_opacityExp.test( ((typeof(v) === "string") ? v : (v.currentStyle ? v.currentStyle.filter : v.style.filter) || "") ) ? ( parseFloat( RegExp.$1 ) / 100 ) : 1);
			},
			_log = function(s) {//for logging messages, but in a way that won't throw errors in old versions of IE.
				if (window.console) {
					console.log(s);
				}
			},
			_target, //when initting a CSSPlugin, we set this variable so that we can access it from within many other functions without having to pass it around as params
			_index, //when initting a CSSPlugin, we set this variable so that we can access it from within many other functions without having to pass it around as params

			_prefixCSS = "", //the non-camelCase vendor prefix like "-o-", "-moz-", "-ms-", or "-webkit-"
			_prefix = "", //camelCase vendor prefix like "O", "ms", "Webkit", or "Moz".

			// @private feed in a camelCase property name like "transform" and it will check to see if it is valid as-is or if it needs a vendor prefix. It returns the corrected camelCase property name (i.e. "WebkitTransform" or "MozTransform" or "transform" or null if no such property is found, like if the browser is IE8 or before, "transform" won't be found at all)
			_checkPropPrefix = function(p, e) {
				e = e || _tempDiv;
				var s = e.style,
					a, i;
				if (s[p] !== undefined) {
					return p;
				}
				p = p.charAt(0).toUpperCase() + p.substr(1);
				a = ["O","Moz","ms","Ms","Webkit"];
				i = 5;
				while (--i > -1 && s[a[i]+p] === undefined) { }
				if (i >= 0) {
					_prefix = (i === 3) ? "ms" : a[i];
					_prefixCSS = "-" + _prefix.toLowerCase() + "-";
					return _prefix + p;
				}
				return null;
			},

			_getComputedStyle = _doc.defaultView ? _doc.defaultView.getComputedStyle : function() {},

			/**
			 * @private Returns the css style for a particular property of an element. For example, to get whatever the current "left" css value for an element with an ID of "myElement", you could do:
			 * var currentLeft = CSSPlugin.getStyle( document.getElementById("myElement"), "left");
			 *
			 * @param {!Object} t Target element whose style property you want to query
			 * @param {!string} p Property name (like "left" or "top" or "marginTop", etc.)
			 * @param {Object=} cs Computed style object. This just provides a way to speed processing if you're going to get several properties on the same element in quick succession - you can reuse the result of the getComputedStyle() call.
			 * @param {boolean=} calc If true, the value will not be read directly from the element's "style" property (if it exists there), but instead the getComputedStyle() result will be used. This can be useful when you want to ensure that the browser itself is interpreting the value.
			 * @param {string=} dflt Default value that should be returned in the place of null, "none", "auto" or "auto auto".
			 * @return {?string} The current property value
			 */
			_getStyle = CSSPlugin.getStyle = function(t, p, cs, calc, dflt) {
				var rv;
				if (!_supportsOpacity) if (p === "opacity") { //several versions of IE don't use the standard "opacity" property - they use things like filter:alpha(opacity=50), so we parse that here.
					return _getIEOpacity(t);
				}
				if (!calc && t.style[p]) {
					rv = t.style[p];
				} else if ((cs = cs || _getComputedStyle(t))) {
					rv = cs[p] || cs.getPropertyValue(p) || cs.getPropertyValue(p.replace(_capsExp, "-$1").toLowerCase());
				} else if (t.currentStyle) {
					rv = t.currentStyle[p];
				}
				return (dflt != null && (!rv || rv === "none" || rv === "auto" || rv === "auto auto")) ? dflt : rv;
			},

			/**
			 * @private Pass the target element, the property name, the numeric value, and the suffix (like "%", "em", "px", etc.) and it will spit back the equivalent pixel number.
			 * @param {!Object} t Target element
			 * @param {!string} p Property name (like "left", "top", "marginLeft", etc.)
			 * @param {!number} v Value
			 * @param {string=} sfx Suffix (like "px" or "%" or "em")
			 * @param {boolean=} recurse If true, the call is a recursive one. In some browsers (like IE7/8), occasionally the value isn't accurately reported initially, but if we run the function again it will take effect.
			 * @return {number} value in pixels
			 */
			_convertToPixels = _internals.convertToPixels = function(t, p, v, sfx, recurse) {
				if (sfx === "px" || !sfx) { return v; }
				if (sfx === "auto" || !v) { return 0; }
				var horiz = _horizExp.test(p),
					node = t,
					style = _tempDiv.style,
					neg = (v < 0),
					precise = (v === 1),
					pix, cache, time;
				if (neg) {
					v = -v;
				}
				if (precise) {
					v *= 100;
				}
				if (sfx === "%" && p.indexOf("border") !== -1) {
					pix = (v / 100) * (horiz ? t.clientWidth : t.clientHeight);
				} else {
					style.cssText = "border:0 solid red;position:" + _getStyle(t, "position") + ";line-height:0;";
					if (sfx === "%" || !node.appendChild || sfx.charAt(0) === "v" || sfx === "rem") {
						node = t.parentNode || _doc.body;
						cache = node._gsCache;
						time = FWDTweenLite.ticker.frame;
						if (cache && horiz && cache.time === time) { //performance optimization: we record the width of elements along with the ticker frame so that we can quickly get it again on the same tick (seems relatively safe to assume it wouldn't change on the same tick)
							return cache.width * v / 100;
						}
						style[(horiz ? "width" : "height")] = v + sfx;
					} else {
						style[(horiz ? "borderLeftWidth" : "borderTopWidth")] = v + sfx;
					}
					node.appendChild(_tempDiv);
					pix = parseFloat(_tempDiv[(horiz ? "offsetWidth" : "offsetHeight")]);
					node.removeChild(_tempDiv);
					if (horiz && sfx === "%" && CSSPlugin.cacheWidths !== false) {
						cache = node._gsCache = node._gsCache || {};
						cache.time = time;
						cache.width = pix / v * 100;
					}
					if (pix === 0 && !recurse) {
						pix = _convertToPixels(t, p, v, sfx, true);
					}
				}
				if (precise) {
					pix /= 100;
				}
				return neg ? -pix : pix;
			},
			_calculateOffset = _internals.calculateOffset = function(t, p, cs) { //for figuring out "top" or "left" in px when it's "auto". We need to factor in margin with the offsetLeft/offsetTop
				if (_getStyle(t, "position", cs) !== "absolute") { return 0; }
				var dim = ((p === "left") ? "Left" : "Top"),
					v = _getStyle(t, "margin" + dim, cs);
				return t["offset" + dim] - (_convertToPixels(t, p, parseFloat(v), v.replace(_suffixExp, "")) || 0);
			},

			// @private returns at object containing ALL of the style properties in camelCase and their associated values.
			_getAllStyles = function(t, cs) {
				var s = {},
					i, tr, p;
				if ((cs = cs || _getComputedStyle(t, null))) {
					if ((i = cs.length)) {
						while (--i > -1) {
							p = cs[i];
							if (p.indexOf("-transform") === -1 || _transformPropCSS === p) { //Some webkit browsers duplicate transform values, one non-prefixed and one prefixed ("transform" and "WebkitTransform"), so we must weed out the extra one here.
								s[p.replace(_camelExp, _camelFunc)] = cs.getPropertyValue(p);
							}
						}
					} else { //some browsers behave differently - cs.length is always 0, so we must do a for...in loop.
						for (i in cs) {
							if (i.indexOf("Transform") === -1 || _transformProp === i) { //Some webkit browsers duplicate transform values, one non-prefixed and one prefixed ("transform" and "WebkitTransform"), so we must weed out the extra one here.
								s[i] = cs[i];
							}
						}
					}
				} else if ((cs = t.currentStyle || t.style)) {
					for (i in cs) {
						if (typeof(i) === "string" && s[i] === undefined) {
							s[i.replace(_camelExp, _camelFunc)] = cs[i];
						}
					}
				}
				if (!_supportsOpacity) {
					s.opacity = _getIEOpacity(t);
				}
				tr = _getTransform(t, cs, false);
				s.rotation = tr.rotation;
				s.skewX = tr.skewX;
				s.scaleX = tr.scaleX;
				s.scaleY = tr.scaleY;
				s.x = tr.x;
				s.y = tr.y;
				if (_supports3D) {
					s.z = tr.z;
					s.rotationX = tr.rotationX;
					s.rotationY = tr.rotationY;
					s.scaleZ = tr.scaleZ;
				}
				if (s.filters) {
					delete s.filters;
				}
				return s;
			},

			// @private analyzes two style objects (as returned by _getAllStyles()) and only looks for differences between them that contain tweenable values (like a number or color). It returns an object with a "difs" property which refers to an object containing only those isolated properties and values for tweening, and a "firstMPT" property which refers to the first MiniPropTween instance in a linked list that recorded all the starting values of the different properties so that we can revert to them at the end or beginning of the tween - we don't want the cascading to get messed up. The forceLookup parameter is an optional generic object with properties that should be forced into the results - this is necessary for className tweens that are overwriting others because imagine a scenario where a rollover/rollout adds/removes a class and the user swipes the mouse over the target SUPER fast, thus nothing actually changed yet and the subsequent comparison of the properties would indicate they match (especially when px rounding is taken into consideration), thus no tweening is necessary even though it SHOULD tween and remove those properties after the tween (otherwise the inline styles will contaminate things). See the className SpecialProp code for details.
			_cssDif = function(t, s1, s2, vars, forceLookup) {
				var difs = {},
					style = t.style,
					val, p, mpt;
				for (p in s2) {
					if (p !== "cssText") if (p !== "length") if (isNaN(p)) if (s1[p] !== (val = s2[p]) || (forceLookup && forceLookup[p])) if (p.indexOf("Origin") === -1) if (typeof(val) === "number" || typeof(val) === "string") {
						difs[p] = (val === "auto" && (p === "left" || p === "top")) ? _calculateOffset(t, p) : ((val === "" || val === "auto" || val === "none") && typeof(s1[p]) === "string" && s1[p].replace(_NaNExp, "") !== "") ? 0 : val; //if the ending value is defaulting ("" or "auto"), we check the starting value and if it can be parsed into a number (a string which could have a suffix too, like 700px), then we swap in 0 for "" or "auto" so that things actually tween.
						if (style[p] !== undefined) { //for className tweens, we must remember which properties already existed inline - the ones that didn't should be removed when the tween isn't in progress because they were only introduced to facilitate the transition between classes.
							mpt = new MiniPropTween(style, p, style[p], mpt);
						}
					}
				}
				if (vars) {
					for (p in vars) { //copy properties (except className)
						if (p !== "className") {
							difs[p] = vars[p];
						}
					}
				}
				return {difs:difs, firstMPT:mpt};
			},
			_dimensions = {width:["Left","Right"], height:["Top","Bottom"]},
			_margins = ["marginLeft","marginRight","marginTop","marginBottom"],

			/**
			 * @private Gets the width or height of an element
			 * @param {!Object} t Target element
			 * @param {!string} p Property name ("width" or "height")
			 * @param {Object=} cs Computed style object (if one exists). Just a speed optimization.
			 * @return {number} Dimension (in pixels)
			 */
			_getDimension = function(t, p, cs) {
				if ((t.nodeName + "").toLowerCase() === "svg") { //Chrome no longer supports offsetWidth/offsetHeight on SVG elements.
					return (cs || _getComputedStyle(t))[p] || 0;
				} else if (t.getBBox && _isSVG(t)) {
					return t.getBBox()[p] || 0;
				}
				var v = parseFloat((p === "width") ? t.offsetWidth : t.offsetHeight),
					a = _dimensions[p],
					i = a.length;
				cs = cs || _getComputedStyle(t, null);
				while (--i > -1) {
					v -= parseFloat( _getStyle(t, "padding" + a[i], cs, true) ) || 0;
					v -= parseFloat( _getStyle(t, "border" + a[i] + "Width", cs, true) ) || 0;
				}
				return v;
			},

			// @private Parses position-related complex strings like "top left" or "50px 10px" or "70% 20%", etc. which are used for things like transformOrigin or backgroundPosition. Optionally decorates a supplied object (recObj) with the following properties: "ox" (offsetX), "oy" (offsetY), "oxp" (if true, "ox" is a percentage not a pixel value), and "oxy" (if true, "oy" is a percentage not a pixel value)
			_parsePosition = function(v, recObj) {
				if (v === "contain" || v === "auto" || v === "auto auto") { //note: Firefox uses "auto auto" as default whereas Chrome uses "auto".
					return v + " ";
				}
				if (v == null || v === "") {
					v = "0 0";
				}
				var a = v.split(" "),
					x = (v.indexOf("left") !== -1) ? "0%" : (v.indexOf("right") !== -1) ? "100%" : a[0],
					y = (v.indexOf("top") !== -1) ? "0%" : (v.indexOf("bottom") !== -1) ? "100%" : a[1],
					i;
				if (a.length > 3 && !recObj) { //multiple positions
					a = v.split(", ").join(",").split(",");
					v = [];
					for (i = 0; i < a.length; i++) {
						v.push(_parsePosition(a[i]));
					}
					return v.join(",");
				}
				if (y == null) {
					y = (x === "center") ? "50%" : "0";
				} else if (y === "center") {
					y = "50%";
				}
				if (x === "center" || (isNaN(parseFloat(x)) && (x + "").indexOf("=") === -1)) { //remember, the user could flip-flop the values and say "bottom center" or "center bottom", etc. "center" is ambiguous because it could be used to describe horizontal or vertical, hence the isNaN(). If there's an "=" sign in the value, it's relative.
					x = "50%";
				}
				v = x + " " + y + ((a.length > 2) ? " " + a[2] : "");
				if (recObj) {
					recObj.oxp = (x.indexOf("%") !== -1);
					recObj.oyp = (y.indexOf("%") !== -1);
					recObj.oxr = (x.charAt(1) === "=");
					recObj.oyr = (y.charAt(1) === "=");
					recObj.ox = parseFloat(x.replace(_NaNExp, ""));
					recObj.oy = parseFloat(y.replace(_NaNExp, ""));
					recObj.v = v;
				}
				return recObj || v;
			},

			/**
			 * @private Takes an ending value (typically a string, but can be a number) and a starting value and returns the change between the two, looking for relative value indicators like += and -= and it also ignores suffixes (but make sure the ending value starts with a number or +=/-= and that the starting value is a NUMBER!)
			 * @param {(number|string)} e End value which is typically a string, but could be a number
			 * @param {(number|string)} b Beginning value which is typically a string but could be a number
			 * @return {number} Amount of change between the beginning and ending values (relative values that have a "+=" or "-=" are recognized)
			 */
			_parseChange = function(e, b) {
				if (typeof(e) === "function") {
					e = e(_index, _target);
				}
				return (typeof(e) === "string" && e.charAt(1) === "=") ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : (parseFloat(e) - parseFloat(b)) || 0;
			},

			/**
			 * @private Takes a value and a default number, checks if the value is relative, null, or numeric and spits back a normalized number accordingly. Primarily used in the _parseTransform() function.
			 * @param {Object} v Value to be parsed
			 * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
			 * @return {number} Parsed value
			 */
			_parseVal = function(v, d) {
				if (typeof(v) === "function") {
					v = v(_index, _target);
				}
				return (v == null) ? d : (typeof(v) === "string" && v.charAt(1) === "=") ? parseInt(v.charAt(0) + "1", 10) * parseFloat(v.substr(2)) + d : parseFloat(v) || 0;
			},

			/**
			 * @private Translates strings like "40deg" or "40" or 40rad" or "+=40deg" or "270_short" or "-90_cw" or "+=45_ccw" to a numeric radian angle. Of course a starting/default value must be fed in too so that relative values can be calculated properly.
			 * @param {Object} v Value to be parsed
			 * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
			 * @param {string=} p property name for directionalEnd (optional - only used when the parsed value is directional ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation). Property name would be "rotation", "rotationX", or "rotationY"
			 * @param {Object=} directionalEnd An object that will store the raw end values for directional angles ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation.
			 * @return {number} parsed angle in radians
			 */
			_parseAngle = function(v, d, p, directionalEnd) {
				var min = 0.000001,
					cap, split, dif, result, isRelative;
				if (typeof(v) === "function") {
					v = v(_index, _target);
				}
				if (v == null) {
					result = d;
				} else if (typeof(v) === "number") {
					result = v;
				} else {
					cap = 360;
					split = v.split("_");
					isRelative = (v.charAt(1) === "=");
					dif = (isRelative ? parseInt(v.charAt(0) + "1", 10) * parseFloat(split[0].substr(2)) : parseFloat(split[0])) * ((v.indexOf("rad") === -1) ? 1 : _RAD2DEG) - (isRelative ? 0 : d);
					if (split.length) {
						if (directionalEnd) {
							directionalEnd[p] = d + dif;
						}
						if (v.indexOf("short") !== -1) {
							dif = dif % cap;
							if (dif !== dif % (cap / 2)) {
								dif = (dif < 0) ? dif + cap : dif - cap;
							}
						}
						if (v.indexOf("_cw") !== -1 && dif < 0) {
							dif = ((dif + cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						} else if (v.indexOf("ccw") !== -1 && dif > 0) {
							dif = ((dif - cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						}
					}
					result = d + dif;
				}
				if (result < min && result > -min) {
					result = 0;
				}
				return result;
			},

			_colorLookup = {aqua:[0,255,255],
				lime:[0,255,0],
				silver:[192,192,192],
				black:[0,0,0],
				maroon:[128,0,0],
				teal:[0,128,128],
				blue:[0,0,255],
				navy:[0,0,128],
				white:[255,255,255],
				fuchsia:[255,0,255],
				olive:[128,128,0],
				yellow:[255,255,0],
				orange:[255,165,0],
				gray:[128,128,128],
				purple:[128,0,128],
				green:[0,128,0],
				red:[255,0,0],
				pink:[255,192,203],
				cyan:[0,255,255],
				transparent:[255,255,255,0]},

			_hue = function(h, m1, m2) {
				h = (h < 0) ? h + 1 : (h > 1) ? h - 1 : h;
				return ((((h * 6 < 1) ? m1 + (m2 - m1) * h * 6 : (h < 0.5) ? m2 : (h * 3 < 2) ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255) + 0.5) | 0;
			},

			/**
			 * @private Parses a color (like #9F0, #FF9900, rgb(255,51,153) or hsl(108, 50%, 10%)) into an array with 3 elements for red, green, and blue or if toHSL parameter is true, it will populate the array with hue, saturation, and lightness values. If a relative value is found in an hsl() or hsla() string, it will preserve those relative prefixes and all the values in the array will be strings instead of numbers (in all other cases it will be populated with numbers).
			 * @param {(string|number)} v The value the should be parsed which could be a string like #9F0 or rgb(255,102,51) or rgba(255,0,0,0.5) or it could be a number like 0xFF00CC or even a named color like red, blue, purple, etc.
			 * @param {(boolean)} toHSL If true, an hsl() or hsla() value will be returned instead of rgb() or rgba()
			 * @return {Array.<number>} An array containing red, green, and blue (and optionally alpha) in that order, or if the toHSL parameter was true, the array will contain hue, saturation and lightness (and optionally alpha) in that order. Always numbers unless there's a relative prefix found in an hsl() or hsla() string and toHSL is true.
			 */
			_parseColor = CSSPlugin.parseColor = function(v, toHSL) {
				var a, r, g, b, h, s, l, max, min, d, wasHSL;
				if (!v) {
					a = _colorLookup.black;
				} else if (typeof(v) === "number") {
					a = [v >> 16, (v >> 8) & 255, v & 255];
				} else {
					if (v.charAt(v.length - 1) === ",") { //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
						v = v.substr(0, v.length - 1);
					}
					if (_colorLookup[v]) {
						a = _colorLookup[v];
					} else if (v.charAt(0) === "#") {
						if (v.length === 4) { //for shorthand like #9F0
							r = v.charAt(1);
							g = v.charAt(2);
							b = v.charAt(3);
							v = "#" + r + r + g + g + b + b;
						}
						v = parseInt(v.substr(1), 16);
						a = [v >> 16, (v >> 8) & 255, v & 255];
					} else if (v.substr(0, 3) === "hsl") {
						a = wasHSL = v.match(_numExp);
						if (!toHSL) {
							h = (Number(a[0]) % 360) / 360;
							s = Number(a[1]) / 100;
							l = Number(a[2]) / 100;
							g = (l <= 0.5) ? l * (s + 1) : l + s - l * s;
							r = l * 2 - g;
							if (a.length > 3) {
								a[3] = Number(v[3]);
							}
							a[0] = _hue(h + 1 / 3, r, g);
							a[1] = _hue(h, r, g);
							a[2] = _hue(h - 1 / 3, r, g);
						} else if (v.indexOf("=") !== -1) { //if relative values are found, just return the raw strings with the relative prefixes in place.
							return v.match(_relNumExp);
						}
					} else {
						a = v.match(_numExp) || _colorLookup.transparent;
					}
					a[0] = Number(a[0]);
					a[1] = Number(a[1]);
					a[2] = Number(a[2]);
					if (a.length > 3) {
						a[3] = Number(a[3]);
					}
				}
				if (toHSL && !wasHSL) {
					r = a[0] / 255;
					g = a[1] / 255;
					b = a[2] / 255;
					max = Math.max(r, g, b);
					min = Math.min(r, g, b);
					l = (max + min) / 2;
					if (max === min) {
						h = s = 0;
					} else {
						d = max - min;
						s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
						h = (max === r) ? (g - b) / d + (g < b ? 6 : 0) : (max === g) ? (b - r) / d + 2 : (r - g) / d + 4;
						h *= 60;
					}
					a[0] = (h + 0.5) | 0;
					a[1] = (s * 100 + 0.5) | 0;
					a[2] = (l * 100 + 0.5) | 0;
				}
				return a;
			},
			_formatColors = function(s, toHSL) {
				var colors = s.match(_colorExp) || [],
					charIndex = 0,
					parsed = colors.length ? "" : s,
					i, color, temp;
				for (i = 0; i < colors.length; i++) {
					color = colors[i];
					temp = s.substr(charIndex, s.indexOf(color, charIndex)-charIndex);
					charIndex += temp.length + color.length;
					color = _parseColor(color, toHSL);
					if (color.length === 3) {
						color.push(1);
					}
					parsed += temp + (toHSL ? "hsla(" + color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : "rgba(" + color.join(",")) + ")";
				}
				return parsed + s.substr(charIndex);
			},
			_colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b"; //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.

		for (p in _colorLookup) {
			_colorExp += "|" + p + "\\b";
		}
		_colorExp = new RegExp(_colorExp+")", "gi");

		CSSPlugin.colorStringFilter = function(a) {
			var combined = a[0] + a[1],
				toHSL;
			if (_colorExp.test(combined)) {
				toHSL = (combined.indexOf("hsl(") !== -1 || combined.indexOf("hsla(") !== -1);
				a[0] = _formatColors(a[0], toHSL);
				a[1] = _formatColors(a[1], toHSL);
			}
			_colorExp.lastIndex = 0;
		};

		if (!FWDTweenLite.defaultStringFilter) {
			FWDTweenLite.defaultStringFilter = CSSPlugin.colorStringFilter;
		}

		/**
		 * @private Returns a formatter function that handles taking a string (or number in some cases) and returning a consistently formatted one in terms of delimiters, quantity of values, etc. For example, we may get boxShadow values defined as "0px red" or "0px 0px 10px rgb(255,0,0)" or "0px 0px 20px 20px #F00" and we need to ensure that what we get back is described with 4 numbers and a color. This allows us to feed it into the _parseComplex() method and split the values up appropriately. The neat thing about this _getFormatter() function is that the dflt defines a pattern as well as a default, so for example, _getFormatter("0px 0px 0px 0px #777", true) not only sets the default as 0px for all distances and #777 for the color, but also sets the pattern such that 4 numbers and a color will always get returned.
		 * @param {!string} dflt The default value and pattern to follow. So "0px 0px 0px 0px #777" will ensure that 4 numbers and a color will always get returned.
		 * @param {boolean=} clr If true, the values should be searched for color-related data. For example, boxShadow values typically contain a color whereas borderRadius don't.
		 * @param {boolean=} collapsible If true, the value is a top/left/right/bottom style one that acts like margin or padding, where if only one value is received, it's used for all 4; if 2 are received, the first is duplicated for 3rd (bottom) and the 2nd is duplicated for the 4th spot (left), etc.
		 * @return {Function} formatter function
		 */
		var _getFormatter = function(dflt, clr, collapsible, multi) {
				if (dflt == null) {
					return function(v) {return v;};
				}
				var dColor = clr ? (dflt.match(_colorExp) || [""])[0] : "",
					dVals = dflt.split(dColor).join("").match(_valuesExp) || [],
					pfx = dflt.substr(0, dflt.indexOf(dVals[0])),
					sfx = (dflt.charAt(dflt.length - 1) === ")") ? ")" : "",
					delim = (dflt.indexOf(" ") !== -1) ? " " : ",",
					numVals = dVals.length,
					dSfx = (numVals > 0) ? dVals[0].replace(_numExp, "") : "",
					formatter;
				if (!numVals) {
					return function(v) {return v;};
				}
				if (clr) {
					formatter = function(v) {
						var color, vals, i, a;
						if (typeof(v) === "number") {
							v += dSfx;
						} else if (multi && _commasOutsideParenExp.test(v)) {
							a = v.replace(_commasOutsideParenExp, "|").split("|");
							for (i = 0; i < a.length; i++) {
								a[i] = formatter(a[i]);
							}
							return a.join(",");
						}
						color = (v.match(_colorExp) || [dColor])[0];
						vals = v.split(color).join("").match(_valuesExp) || [];
						i = vals.length;
						if (numVals > i--) {
							while (++i < numVals) {
								vals[i] = collapsible ? vals[(((i - 1) / 2) | 0)] : dVals[i];
							}
						}
						return pfx + vals.join(delim) + delim + color + sfx + (v.indexOf("inset") !== -1 ? " inset" : "");
					};
					return formatter;

				}
				formatter = function(v) {
					var vals, a, i;
					if (typeof(v) === "number") {
						v += dSfx;
					} else if (multi && _commasOutsideParenExp.test(v)) {
						a = v.replace(_commasOutsideParenExp, "|").split("|");
						for (i = 0; i < a.length; i++) {
							a[i] = formatter(a[i]);
						}
						return a.join(",");
					}
					vals = v.match(_valuesExp) || [];
					i = vals.length;
					if (numVals > i--) {
						while (++i < numVals) {
							vals[i] = collapsible ? vals[(((i - 1) / 2) | 0)] : dVals[i];
						}
					}
					return pfx + vals.join(delim) + sfx;
				};
				return formatter;
			},

			/**
			 * @private returns a formatter function that's used for edge-related values like marginTop, marginLeft, paddingBottom, paddingRight, etc. Just pass a comma-delimited list of property names related to the edges.
			 * @param {!string} props a comma-delimited list of property names in order from top to left, like "marginTop,marginRight,marginBottom,marginLeft"
			 * @return {Function} a formatter function
			 */
			_getEdgeParser = function(props) {
				props = props.split(",");
				return function(t, e, p, cssp, pt, plugin, vars) {
					var a = (e + "").split(" "),
						i;
					vars = {};
					for (i = 0; i < 4; i++) {
						vars[props[i]] = a[i] = a[i] || a[(((i - 1) / 2) >> 0)];
					}
					return cssp.parse(t, vars, pt, plugin);
				};
			},

			// @private used when other plugins must tween values first, like BezierPlugin or ThrowPropsPlugin, etc. That plugin's setRatio() gets called first so that the values are updated, and then we loop through the MiniPropTweens which handle copying the values into their appropriate slots so that they can then be applied correctly in the main CSSPlugin setRatio() method. Remember, we typically create a proxy object that has a bunch of uniquely-named properties that we feed to the sub-plugin and it does its magic normally, and then we must interpret those values and apply them to the css because often numbers must get combined/concatenated, suffixes added, etc. to work with css, like boxShadow could have 4 values plus a color.
			_setPluginRatio = _internals._setPluginRatio = function(v) {
				this.plugin.setRatio(v);
				var d = this.data,
					proxy = d.proxy,
					mpt = d.firstMPT,
					min = 0.000001,
					val, pt, i, str, p;
				while (mpt) {
					val = proxy[mpt.v];
					if (mpt.r) {
						val = Math.round(val);
					} else if (val < min && val > -min) {
						val = 0;
					}
					mpt.t[mpt.p] = val;
					mpt = mpt._next;
				}
				if (d.autoRotate) {
					d.autoRotate.rotation = d.mod ? d.mod(proxy.rotation, this.t) : proxy.rotation; //special case for ModifyPlugin to hook into an auto-rotating bezier
				}
				//at the end, we must set the CSSPropTween's "e" (end) value dynamically here because that's what is used in the final setRatio() method. Same for "b" at the beginning.
				if (v === 1 || v === 0) {
					mpt = d.firstMPT;
					p = (v === 1) ? "e" : "b";
					while (mpt) {
						pt = mpt.t;
						if (!pt.type) {
							pt[p] = pt.s + pt.xs0;
						} else if (pt.type === 1) {
							str = pt.xs0 + pt.s + pt.xs1;
							for (i = 1; i < pt.l; i++) {
								str += pt["xn"+i] + pt["xs"+(i+1)];
							}
							pt[p] = str;
						}
						mpt = mpt._next;
					}
				}
			},

			/**
			 * @private @constructor Used by a few SpecialProps to hold important values for proxies. For example, _parseToProxy() creates a MiniPropTween instance for each property that must get tweened on the proxy, and we record the original property name as well as the unique one we create for the proxy, plus whether or not the value needs to be rounded plus the original value.
			 * @param {!Object} t target object whose property we're tweening (often a CSSPropTween)
			 * @param {!string} p property name
			 * @param {(number|string|object)} v value
			 * @param {MiniPropTween=} next next MiniPropTween in the linked list
			 * @param {boolean=} r if true, the tweened value should be rounded to the nearest integer
			 */
			MiniPropTween = function(t, p, v, next, r) {
				this.t = t;
				this.p = p;
				this.v = v;
				this.r = r;
				if (next) {
					next._prev = this;
					this._next = next;
				}
			},

			/**
			 * @private Most other plugins (like BezierPlugin and ThrowPropsPlugin and others) can only tween numeric values, but CSSPlugin must accommodate special values that have a bunch of extra data (like a suffix or strings between numeric values, etc.). For example, boxShadow has values like "10px 10px 20px 30px rgb(255,0,0)" which would utterly confuse other plugins. This method allows us to split that data apart and grab only the numeric data and attach it to uniquely-named properties of a generic proxy object ({}) so that we can feed that to virtually any plugin to have the numbers tweened. However, we must also keep track of which properties from the proxy go with which CSSPropTween values and instances. So we create a linked list of MiniPropTweens. Each one records a target (the original CSSPropTween), property (like "s" or "xn1" or "xn2") that we're tweening and the unique property name that was used for the proxy (like "boxShadow_xn1" and "boxShadow_xn2") and whether or not they need to be rounded. That way, in the _setPluginRatio() method we can simply copy the values over from the proxy to the CSSPropTween instance(s). Then, when the main CSSPlugin setRatio() method runs and applies the CSSPropTween values accordingly, they're updated nicely. So the external plugin tweens the numbers, _setPluginRatio() copies them over, and setRatio() acts normally, applying css-specific values to the element.
			 * This method returns an object that has the following properties:
			 *  - proxy: a generic object containing the starting values for all the properties that will be tweened by the external plugin.  This is what we feed to the external _onInitTween() as the target
			 *  - end: a generic object containing the ending values for all the properties that will be tweened by the external plugin. This is what we feed to the external plugin's _onInitTween() as the destination values
			 *  - firstMPT: the first MiniPropTween in the linked list
			 *  - pt: the first CSSPropTween in the linked list that was created when parsing. If shallow is true, this linked list will NOT attach to the one passed into the _parseToProxy() as the "pt" (4th) parameter.
			 * @param {!Object} t target object to be tweened
			 * @param {!(Object|string)} vars the object containing the information about the tweening values (typically the end/destination values) that should be parsed
			 * @param {!CSSPlugin} cssp The CSSPlugin instance
			 * @param {CSSPropTween=} pt the next CSSPropTween in the linked list
			 * @param {TweenPlugin=} plugin the external TweenPlugin instance that will be handling tweening the numeric values
			 * @param {boolean=} shallow if true, the resulting linked list from the parse will NOT be attached to the CSSPropTween that was passed in as the "pt" (4th) parameter.
			 * @return An object containing the following properties: proxy, end, firstMPT, and pt (see above for descriptions)
			 */
			_parseToProxy = _internals._parseToProxy = function(t, vars, cssp, pt, plugin, shallow) {
				var bpt = pt,
					start = {},
					end = {},
					transform = cssp._transform,
					oldForce = _forcePT,
					i, p, xp, mpt, firstPT;
				cssp._transform = null;
				_forcePT = vars;
				pt = firstPT = cssp.parse(t, vars, pt, plugin);
				_forcePT = oldForce;
				//break off from the linked list so the new ones are isolated.
				if (shallow) {
					cssp._transform = transform;
					if (bpt) {
						bpt._prev = null;
						if (bpt._prev) {
							bpt._prev._next = null;
						}
					}
				}
				while (pt && pt !== bpt) {
					if (pt.type <= 1) {
						p = pt.p;
						end[p] = pt.s + pt.c;
						start[p] = pt.s;
						if (!shallow) {
							mpt = new MiniPropTween(pt, "s", p, mpt, pt.r);
							pt.c = 0;
						}
						if (pt.type === 1) {
							i = pt.l;
							while (--i > 0) {
								xp = "xn" + i;
								p = pt.p + "_" + xp;
								end[p] = pt.data[xp];
								start[p] = pt[xp];
								if (!shallow) {
									mpt = new MiniPropTween(pt, xp, p, mpt, pt.rxp[xp]);
								}
							}
						}
					}
					pt = pt._next;
				}
				return {proxy:start, end:end, firstMPT:mpt, pt:firstPT};
			},



			/**
			 * @constructor Each property that is tweened has at least one CSSPropTween associated with it. These instances store important information like the target, property, starting value, amount of change, etc. They can also optionally have a number of "extra" strings and numeric values named xs1, xn1, xs2, xn2, xs3, xn3, etc. where "s" indicates string and "n" indicates number. These can be pieced together in a complex-value tween (type:1) that has alternating types of data like a string, number, string, number, etc. For example, boxShadow could be "5px 5px 8px rgb(102, 102, 51)". In that value, there are 6 numbers that may need to tween and then pieced back together into a string again with spaces, suffixes, etc. xs0 is special in that it stores the suffix for standard (type:0) tweens, -OR- the first string (prefix) in a complex-value (type:1) CSSPropTween -OR- it can be the non-tweening value in a type:-1 CSSPropTween. We do this to conserve memory.
			 * CSSPropTweens have the following optional properties as well (not defined through the constructor):
			 *  - l: Length in terms of the number of extra properties that the CSSPropTween has (default: 0). For example, for a boxShadow we may need to tween 5 numbers in which case l would be 5; Keep in mind that the start/end values for the first number that's tweened are always stored in the s and c properties to conserve memory. All additional values thereafter are stored in xn1, xn2, etc.
			 *  - xfirst: The first instance of any sub-CSSPropTweens that are tweening properties of this instance. For example, we may split up a boxShadow tween so that there's a main CSSPropTween of type:1 that has various xs* and xn* values associated with the h-shadow, v-shadow, blur, color, etc. Then we spawn a CSSPropTween for each of those that has a higher priority and runs BEFORE the main CSSPropTween so that the values are all set by the time it needs to re-assemble them. The xfirst gives us an easy way to identify the first one in that chain which typically ends at the main one (because they're all prepende to the linked list)
			 *  - plugin: The TweenPlugin instance that will handle the tweening of any complex values. For example, sometimes we don't want to use normal subtweens (like xfirst refers to) to tween the values - we might want ThrowPropsPlugin or BezierPlugin some other plugin to do the actual tweening, so we create a plugin instance and store a reference here. We need this reference so that if we get a request to round values or disable a tween, we can pass along that request.
			 *  - data: Arbitrary data that needs to be stored with the CSSPropTween. Typically if we're going to have a plugin handle the tweening of a complex-value tween, we create a generic object that stores the END values that we're tweening to and the CSSPropTween's xs1, xs2, etc. have the starting values. We store that object as data. That way, we can simply pass that object to the plugin and use the CSSPropTween as the target.
			 *  - setRatio: Only used for type:2 tweens that require custom functionality. In this case, we call the CSSPropTween's setRatio() method and pass the ratio each time the tween updates. This isn't quite as efficient as doing things directly in the CSSPlugin's setRatio() method, but it's very convenient and flexible.
			 * @param {!Object} t Target object whose property will be tweened. Often a DOM element, but not always. It could be anything.
			 * @param {string} p Property to tween (name). For example, to tween element.width, p would be "width".
			 * @param {number} s Starting numeric value
			 * @param {number} c Change in numeric value over the course of the entire tween. For example, if element.width starts at 5 and should end at 100, c would be 95.
			 * @param {CSSPropTween=} next The next CSSPropTween in the linked list. If one is defined, we will define its _prev as the new instance, and the new instance's _next will be pointed at it.
			 * @param {number=} type The type of CSSPropTween where -1 = a non-tweening value, 0 = a standard simple tween, 1 = a complex value (like one that has multiple numbers in a comma- or space-delimited string like border:"1px solid red"), and 2 = one that uses a custom setRatio function that does all of the work of applying the values on each update.
			 * @param {string=} n Name of the property that should be used for overwriting purposes which is typically the same as p but not always. For example, we may need to create a subtween for the 2nd part of a "clip:rect(...)" tween in which case "p" might be xs1 but "n" is still "clip"
			 * @param {boolean=} r If true, the value(s) should be rounded
			 * @param {number=} pr Priority in the linked list order. Higher priority CSSPropTweens will be updated before lower priority ones. The default priority is 0.
			 * @param {string=} b Beginning value. We store this to ensure that it is EXACTLY what it was when the tween began without any risk of interpretation issues.
			 * @param {string=} e Ending value. We store this to ensure that it is EXACTLY what the user defined at the end of the tween without any risk of interpretation issues.
			 */
			CSSPropTween = _internals.CSSPropTween = function(t, p, s, c, next, type, n, r, pr, b, e) {
				this.t = t; //target
				this.p = p; //property
				this.s = s; //starting value
				this.c = c; //change value
				this.n = n || p; //name that this CSSPropTween should be associated to (usually the same as p, but not always - n is what overwriting looks at)
				if (!(t instanceof CSSPropTween)) {
					_overwriteProps.push(this.n);
				}
				this.r = r; //round (boolean)
				this.type = type || 0; //0 = normal tween, -1 = non-tweening (in which case xs0 will be applied to the target's property, like tp.t[tp.p] = tp.xs0), 1 = complex-value SpecialProp, 2 = custom setRatio() that does all the work
				if (pr) {
					this.pr = pr;
					_hasPriority = true;
				}
				this.b = (b === undefined) ? s : b;
				this.e = (e === undefined) ? s + c : e;
				if (next) {
					this._next = next;
					next._prev = this;
				}
			},

			_addNonTweeningNumericPT = function(target, prop, start, end, next, overwriteProp) { //cleans up some code redundancies and helps minification. Just a fast way to add a NUMERIC non-tweening CSSPropTween
				var pt = new CSSPropTween(target, prop, start, end - start, next, -1, overwriteProp);
				pt.b = start;
				pt.e = pt.xs0 = end;
				return pt;
			},

			/**
			 * Takes a target, the beginning value and ending value (as strings) and parses them into a CSSPropTween (possibly with child CSSPropTweens) that accommodates multiple numbers, colors, comma-delimited values, etc. For example:
			 * sp.parseComplex(element, "boxShadow", "5px 10px 20px rgb(255,102,51)", "0px 0px 0px red", true, "0px 0px 0px rgb(0,0,0,0)", pt);
			 * It will walk through the beginning and ending values (which should be in the same format with the same number and type of values) and figure out which parts are numbers, what strings separate the numeric/tweenable values, and then create the CSSPropTweens accordingly. If a plugin is defined, no child CSSPropTweens will be created. Instead, the ending values will be stored in the "data" property of the returned CSSPropTween like: {s:-5, xn1:-10, xn2:-20, xn3:255, xn4:0, xn5:0} so that it can be fed to any other plugin and it'll be plain numeric tweens but the recomposition of the complex value will be handled inside CSSPlugin's setRatio().
			 * If a setRatio is defined, the type of the CSSPropTween will be set to 2 and recomposition of the values will be the responsibility of that method.
			 *
			 * @param {!Object} t Target whose property will be tweened
			 * @param {!string} p Property that will be tweened (its name, like "left" or "backgroundColor" or "boxShadow")
			 * @param {string} b Beginning value
			 * @param {string} e Ending value
			 * @param {boolean} clrs If true, the value could contain a color value like "rgb(255,0,0)" or "#F00" or "red". The default is false, so no colors will be recognized (a performance optimization)
			 * @param {(string|number|Object)} dflt The default beginning value that should be used if no valid beginning value is defined or if the number of values inside the complex beginning and ending values don't match
			 * @param {?CSSPropTween} pt CSSPropTween instance that is the current head of the linked list (we'll prepend to this).
			 * @param {number=} pr Priority in the linked list order. Higher priority properties will be updated before lower priority ones. The default priority is 0.
			 * @param {TweenPlugin=} plugin If a plugin should handle the tweening of extra properties, pass the plugin instance here. If one is defined, then NO subtweens will be created for any extra properties (the properties will be created - just not additional CSSPropTween instances to tween them) because the plugin is expected to do so. However, the end values WILL be populated in the "data" property, like {s:100, xn1:50, xn2:300}
			 * @param {function(number)=} setRatio If values should be set in a custom function instead of being pieced together in a type:1 (complex-value) CSSPropTween, define that custom function here.
			 * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parseComplex() call.
			 */
			_parseComplex = CSSPlugin.parseComplex = function(t, p, b, e, clrs, dflt, pt, pr, plugin, setRatio) {
				//DEBUG: _log("parseComplex: "+p+", b: "+b+", e: "+e);
				b = b || dflt || "";
				if (typeof(e) === "function") {
					e = e(_index, _target);
				}
				pt = new CSSPropTween(t, p, 0, 0, pt, (setRatio ? 2 : 1), null, false, pr, b, e);
				e += ""; //ensures it's a string
				if (clrs && _colorExp.test(e + b)) { //if colors are found, normalize the formatting to rgba() or hsla().
					e = [b, e];
					CSSPlugin.colorStringFilter(e);
					b = e[0];
					e = e[1];
				}
				var ba = b.split(", ").join(",").split(" "), //beginning array
					ea = e.split(", ").join(",").split(" "), //ending array
					l = ba.length,
					autoRound = (_autoRound !== false),
					i, xi, ni, bv, ev, bnums, enums, bn, hasAlpha, temp, cv, str, useHSL;
				if (e.indexOf(",") !== -1 || b.indexOf(",") !== -1) {
					ba = ba.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
					ea = ea.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
					l = ba.length;
				}
				if (l !== ea.length) {
					//DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
					ba = (dflt || "").split(" ");
					l = ba.length;
				}
				pt.plugin = plugin;
				pt.setRatio = setRatio;
				_colorExp.lastIndex = 0;
				for (i = 0; i < l; i++) {
					bv = ba[i];
					ev = ea[i];
					bn = parseFloat(bv);
					//if the value begins with a number (most common). It's fine if it has a suffix like px
					if (bn || bn === 0) {
						pt.appendXtra("", bn, _parseChange(ev, bn), ev.replace(_relNumExp, ""), (autoRound && ev.indexOf("px") !== -1), true);

					//if the value is a color
					} else if (clrs && _colorExp.test(bv)) {
						str = ev.indexOf(")") + 1;
						str = ")" + (str ? ev.substr(str) : ""); //if there's a comma or ) at the end, retain it.
						useHSL = (ev.indexOf("hsl") !== -1 && _supportsOpacity);
						bv = _parseColor(bv, useHSL);
						ev = _parseColor(ev, useHSL);
						hasAlpha = (bv.length + ev.length > 6);
						if (hasAlpha && !_supportsOpacity && ev[3] === 0) { //older versions of IE don't support rgba(), so if the destination alpha is 0, just use "transparent" for the end color
							pt["xs" + pt.l] += pt.l ? " transparent" : "transparent";
							pt.e = pt.e.split(ea[i]).join("transparent");
						} else {
							if (!_supportsOpacity) { //old versions of IE don't support rgba().
								hasAlpha = false;
							}
							if (useHSL) {
								pt.appendXtra((hasAlpha ? "hsla(" : "hsl("), bv[0], _parseChange(ev[0], bv[0]), ",", false, true)
									.appendXtra("", bv[1], _parseChange(ev[1], bv[1]), "%,", false)
									.appendXtra("", bv[2], _parseChange(ev[2], bv[2]), (hasAlpha ? "%," : "%" + str), false);
							} else {
								pt.appendXtra((hasAlpha ? "rgba(" : "rgb("), bv[0], ev[0] - bv[0], ",", true, true)
									.appendXtra("", bv[1], ev[1] - bv[1], ",", true)
									.appendXtra("", bv[2], ev[2] - bv[2], (hasAlpha ? "," : str), true);
							}

							if (hasAlpha) {
								bv = (bv.length < 4) ? 1 : bv[3];
								pt.appendXtra("", bv, ((ev.length < 4) ? 1 : ev[3]) - bv, str, false);
							}
						}
						_colorExp.lastIndex = 0; //otherwise the test() on the RegExp could move the lastIndex and taint future results.

					} else {
						bnums = bv.match(_numExp); //gets each group of numbers in the beginning value string and drops them into an array

						//if no number is found, treat it as a non-tweening value and just append the string to the current xs.
						if (!bnums) {
							pt["xs" + pt.l] += (pt.l || pt["xs" + pt.l]) ? " " + ev : ev;

						//loop through all the numbers that are found and construct the extra values on the pt.
						} else {
							enums = ev.match(_relNumExp); //get each group of numbers in the end value string and drop them into an array. We allow relative values too, like +=50 or -=.5
							if (!enums || enums.length !== bnums.length) {
								//DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
								return pt;
							}
							ni = 0;
							for (xi = 0; xi < bnums.length; xi++) {
								cv = bnums[xi];
								temp = bv.indexOf(cv, ni);
								pt.appendXtra(bv.substr(ni, temp - ni), Number(cv), _parseChange(enums[xi], cv), "", (autoRound && bv.substr(temp + cv.length, 2) === "px"), (xi === 0));
								ni = temp + cv.length;
							}
							pt["xs" + pt.l] += bv.substr(ni);
						}
					}
				}
				//if there are relative values ("+=" or "-=" prefix), we need to adjust the ending value to eliminate the prefixes and combine the values properly.
				if (e.indexOf("=") !== -1) if (pt.data) {
					str = pt.xs0 + pt.data.s;
					for (i = 1; i < pt.l; i++) {
						str += pt["xs" + i] + pt.data["xn" + i];
					}
					pt.e = str + pt["xs" + i];
				}
				if (!pt.l) {
					pt.type = -1;
					pt.xs0 = pt.e;
				}
				return pt.xfirst || pt;
			},
			i = 9;


		p = CSSPropTween.prototype;
		p.l = p.pr = 0; //length (number of extra properties like xn1, xn2, xn3, etc.
		while (--i > 0) {
			p["xn" + i] = 0;
			p["xs" + i] = "";
		}
		p.xs0 = "";
		p._next = p._prev = p.xfirst = p.data = p.plugin = p.setRatio = p.rxp = null;


		/**
		 * Appends and extra tweening value to a CSSPropTween and automatically manages any prefix and suffix strings. The first extra value is stored in the s and c of the main CSSPropTween instance, but thereafter any extras are stored in the xn1, xn2, xn3, etc. The prefixes and suffixes are stored in the xs0, xs1, xs2, etc. properties. For example, if I walk through a clip value like "rect(10px, 5px, 0px, 20px)", the values would be stored like this:
		 * xs0:"rect(", s:10, xs1:"px, ", xn1:5, xs2:"px, ", xn2:0, xs3:"px, ", xn3:20, xn4:"px)"
		 * And they'd all get joined together when the CSSPlugin renders (in the setRatio() method).
		 * @param {string=} pfx Prefix (if any)
		 * @param {!number} s Starting value
		 * @param {!number} c Change in numeric value over the course of the entire tween. For example, if the start is 5 and the end is 100, the change would be 95.
		 * @param {string=} sfx Suffix (if any)
		 * @param {boolean=} r Round (if true).
		 * @param {boolean=} pad If true, this extra value should be separated by the previous one by a space. If there is no previous extra and pad is true, it will automatically drop the space.
		 * @return {CSSPropTween} returns itself so that multiple methods can be chained together.
		 */
		p.appendXtra = function(pfx, s, c, sfx, r, pad) {
			var pt = this,
				l = pt.l;
			pt["xs" + l] += (pad && (l || pt["xs" + l])) ? " " + pfx : pfx || "";
			if (!c) if (l !== 0 && !pt.plugin) { //typically we'll combine non-changing values right into the xs to optimize performance, but we don't combine them when there's a plugin that will be tweening the values because it may depend on the values being split apart, like for a bezier, if a value doesn't change between the first and second iteration but then it does on the 3rd, we'll run into trouble because there's no xn slot for that value!
				pt["xs" + l] += s + (sfx || "");
				return pt;
			}
			pt.l++;
			pt.type = pt.setRatio ? 2 : 1;
			pt["xs" + pt.l] = sfx || "";
			if (l > 0) {
				pt.data["xn" + l] = s + c;
				pt.rxp["xn" + l] = r; //round extra property (we need to tap into this in the _parseToProxy() method)
				pt["xn" + l] = s;
				if (!pt.plugin) {
					pt.xfirst = new CSSPropTween(pt, "xn" + l, s, c, pt.xfirst || pt, 0, pt.n, r, pt.pr);
					pt.xfirst.xs0 = 0; //just to ensure that the property stays numeric which helps modern browsers speed up processing. Remember, in the setRatio() method, we do pt.t[pt.p] = val + pt.xs0 so if pt.xs0 is "" (the default), it'll cast the end value as a string. When a property is a number sometimes and a string sometimes, it prevents the compiler from locking in the data type, slowing things down slightly.
				}
				return pt;
			}
			pt.data = {s:s + c};
			pt.rxp = {};
			pt.s = s;
			pt.c = c;
			pt.r = r;
			return pt;
		};

		/**
		 * @constructor A SpecialProp is basically a css property that needs to be treated in a non-standard way, like if it may contain a complex value like boxShadow:"5px 10px 15px rgb(255, 102, 51)" or if it is associated with another plugin like ThrowPropsPlugin or BezierPlugin. Every SpecialProp is associated with a particular property name like "boxShadow" or "throwProps" or "bezier" and it will intercept those values in the vars object that's passed to the CSSPlugin and handle them accordingly.
		 * @param {!string} p Property name (like "boxShadow" or "throwProps")
		 * @param {Object=} options An object containing any of the following configuration options:
		 *                      - defaultValue: the default value
		 *                      - parser: A function that should be called when the associated property name is found in the vars. This function should return a CSSPropTween instance and it should ensure that it is properly inserted into the linked list. It will receive 4 paramters: 1) The target, 2) The value defined in the vars, 3) The CSSPlugin instance (whose _firstPT should be used for the linked list), and 4) A computed style object if one was calculated (this is a speed optimization that allows retrieval of starting values quicker)
		 *                      - formatter: a function that formats any value received for this special property (for example, boxShadow could take "5px 5px red" and format it to "5px 5px 0px 0px red" so that both the beginning and ending values have a common order and quantity of values.)
		 *                      - prefix: if true, we'll determine whether or not this property requires a vendor prefix (like Webkit or Moz or ms or O)
		 *                      - color: set this to true if the value for this SpecialProp may contain color-related values like rgb(), rgba(), etc.
		 *                      - priority: priority in the linked list order. Higher priority SpecialProps will be updated before lower priority ones. The default priority is 0.
		 *                      - multi: if true, the formatter should accommodate a comma-delimited list of values, like boxShadow could have multiple boxShadows listed out.
		 *                      - collapsible: if true, the formatter should treat the value like it's a top/right/bottom/left value that could be collapsed, like "5px" would apply to all, "5px, 10px" would use 5px for top/bottom and 10px for right/left, etc.
		 *                      - keyword: a special keyword that can [optionally] be found inside the value (like "inset" for boxShadow). This allows us to validate beginning/ending values to make sure they match (if the keyword is found in one, it'll be added to the other for consistency by default).
		 */
		var SpecialProp = function(p, options) {
				options = options || {};
				this.p = options.prefix ? _checkPropPrefix(p) || p : p;
				_specialProps[p] = _specialProps[this.p] = this;
				this.format = options.formatter || _getFormatter(options.defaultValue, options.color, options.collapsible, options.multi);
				if (options.parser) {
					this.parse = options.parser;
				}
				this.clrs = options.color;
				this.multi = options.multi;
				this.keyword = options.keyword;
				this.dflt = options.defaultValue;
				this.pr = options.priority || 0;
			},

			//shortcut for creating a new SpecialProp that can accept multiple properties as a comma-delimited list (helps minification). dflt can be an array for multiple values (we don't do a comma-delimited list because the default value may contain commas, like rect(0px,0px,0px,0px)). We attach this method to the SpecialProp class/object instead of using a private _createSpecialProp() method so that we can tap into it externally if necessary, like from another plugin.
			_registerComplexSpecialProp = _internals._registerComplexSpecialProp = function(p, options, defaults) {
				if (typeof(options) !== "object") {
					options = {parser:defaults}; //to make backwards compatible with older versions of BezierPlugin and ThrowPropsPlugin
				}
				var a = p.split(","),
					d = options.defaultValue,
					i, temp;
				defaults = defaults || [d];
				for (i = 0; i < a.length; i++) {
					options.prefix = (i === 0 && options.prefix);
					options.defaultValue = defaults[i] || d;
					temp = new SpecialProp(a[i], options);
				}
			},

			//creates a placeholder special prop for a plugin so that the property gets caught the first time a tween of it is attempted, and at that time it makes the plugin register itself, thus taking over for all future tweens of that property. This allows us to not mandate that things load in a particular order and it also allows us to log() an error that informs the user when they attempt to tween an external plugin-related property without loading its .js file.
			_registerPluginProp = _internals._registerPluginProp = function(p) {
				if (!_specialProps[p]) {
					var pluginName = p.charAt(0).toUpperCase() + p.substr(1) + "Plugin";
					_registerComplexSpecialProp(p, {parser:function(t, e, p, cssp, pt, plugin, vars) {
						var pluginClass = _fwdglobals.com.greensock.plugins[pluginName];
						if (!pluginClass) {
							_log("Error: " + pluginName + " js file not loaded.");
							return pt;
						}
						pluginClass._cssRegister();
						return _specialProps[p].parse(t, e, p, cssp, pt, plugin, vars);
					}});
				}
			};


		p = SpecialProp.prototype;

		/**
		 * Alias for _parseComplex() that automatically plugs in certain values for this SpecialProp, like its property name, whether or not colors should be sensed, the default value, and priority. It also looks for any keyword that the SpecialProp defines (like "inset" for boxShadow) and ensures that the beginning and ending values have the same number of values for SpecialProps where multi is true (like boxShadow and textShadow can have a comma-delimited list)
		 * @param {!Object} t target element
		 * @param {(string|number|object)} b beginning value
		 * @param {(string|number|object)} e ending (destination) value
		 * @param {CSSPropTween=} pt next CSSPropTween in the linked list
		 * @param {TweenPlugin=} plugin If another plugin will be tweening the complex value, that TweenPlugin instance goes here.
		 * @param {function=} setRatio If a custom setRatio() method should be used to handle this complex value, that goes here.
		 * @return {CSSPropTween=} First CSSPropTween in the linked list
		 */
		p.parseComplex = function(t, b, e, pt, plugin, setRatio) {
			var kwd = this.keyword,
				i, ba, ea, l, bi, ei;
			//if this SpecialProp's value can contain a comma-delimited list of values (like boxShadow or textShadow), we must parse them in a special way, and look for a keyword (like "inset" for boxShadow) and ensure that the beginning and ending BOTH have it if the end defines it as such. We also must ensure that there are an equal number of values specified (we can't tween 1 boxShadow to 3 for example)
			if (this.multi) if (_commasOutsideParenExp.test(e) || _commasOutsideParenExp.test(b)) {
				ba = b.replace(_commasOutsideParenExp, "|").split("|");
				ea = e.replace(_commasOutsideParenExp, "|").split("|");
			} else if (kwd) {
				ba = [b];
				ea = [e];
			}
			if (ea) {
				l = (ea.length > ba.length) ? ea.length : ba.length;
				for (i = 0; i < l; i++) {
					b = ba[i] = ba[i] || this.dflt;
					e = ea[i] = ea[i] || this.dflt;
					if (kwd) {
						bi = b.indexOf(kwd);
						ei = e.indexOf(kwd);
						if (bi !== ei) {
							if (ei === -1) { //if the keyword isn't in the end value, remove it from the beginning one.
								ba[i] = ba[i].split(kwd).join("");
							} else if (bi === -1) { //if the keyword isn't in the beginning, add it.
								ba[i] += " " + kwd;
							}
						}
					}
				}
				b = ba.join(", ");
				e = ea.join(", ");
			}
			return _parseComplex(t, this.p, b, e, this.clrs, this.dflt, pt, this.pr, plugin, setRatio);
		};

		/**
		 * Accepts a target and end value and spits back a CSSPropTween that has been inserted into the CSSPlugin's linked list and conforms with all the conventions we use internally, like type:-1, 0, 1, or 2, setting up any extra property tweens, priority, etc. For example, if we have a boxShadow SpecialProp and call:
		 * this._firstPT = sp.parse(element, "5px 10px 20px rgb(2550,102,51)", "boxShadow", this);
		 * It should figure out the starting value of the element's boxShadow, compare it to the provided end value and create all the necessary CSSPropTweens of the appropriate types to tween the boxShadow. The CSSPropTween that gets spit back should already be inserted into the linked list (the 4th parameter is the current head, so prepend to that).
		 * @param {!Object} t Target object whose property is being tweened
		 * @param {Object} e End value as provided in the vars object (typically a string, but not always - like a throwProps would be an object).
		 * @param {!string} p Property name
		 * @param {!CSSPlugin} cssp The CSSPlugin instance that should be associated with this tween.
		 * @param {?CSSPropTween} pt The CSSPropTween that is the current head of the linked list (we'll prepend to it)
		 * @param {TweenPlugin=} plugin If a plugin will be used to tween the parsed value, this is the plugin instance.
		 * @param {Object=} vars Original vars object that contains the data for parsing.
		 * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parse() call.
		 */
		p.parse = function(t, e, p, cssp, pt, plugin, vars) {
			return this.parseComplex(t.style, this.format(_getStyle(t, this.p, _cs, false, this.dflt)), this.format(e), pt, plugin);
		};

		/**
		 * Registers a special property that should be intercepted from any "css" objects defined in tweens. This allows you to handle them however you want without CSSPlugin doing it for you. The 2nd parameter should be a function that accepts 3 parameters:
		 *  1) Target object whose property should be tweened (typically a DOM element)
		 *  2) The end/destination value (could be a string, number, object, or whatever you want)
		 *  3) The tween instance (you probably don't need to worry about this, but it can be useful for looking up information like the duration)
		 *
		 * Then, your function should return a function which will be called each time the tween gets rendered, passing a numeric "ratio" parameter to your function that indicates the change factor (usually between 0 and 1). For example:
		 *
		 * CSSPlugin.registerSpecialProp("myCustomProp", function(target, value, tween) {
		 *      var start = target.style.width;
		 *      return function(ratio) {
		 *              target.style.width = (start + value * ratio) + "px";
		 *              console.log("set width to " + target.style.width);
		 *          }
		 * }, 0);
		 *
		 * Then, when I do this tween, it will trigger my special property:
		 *
		 * FWDTweenLite.to(element, 1, {css:{myCustomProp:100}});
		 *
		 * In the example, of course, we're just changing the width, but you can do anything you want.
		 *
		 * @param {!string} name Property name (or comma-delimited list of property names) that should be intercepted and handled by your function. For example, if I define "myCustomProp", then it would handle that portion of the following tween: FWDTweenLite.to(element, 1, {css:{myCustomProp:100}})
		 * @param {!function(Object, Object, Object, string):function(number)} onInitTween The function that will be called when a tween of this special property is performed. The function will receive 4 parameters: 1) Target object that should be tweened, 2) Value that was passed to the tween, 3) The tween instance itself (rarely used), and 4) The property name that's being tweened. Your function should return a function that should be called on every update of the tween. That function will receive a single parameter that is a "change factor" value (typically between 0 and 1) indicating the amount of change as a ratio. You can use this to determine how to set the values appropriately in your function.
		 * @param {number=} priority Priority that helps the engine determine the order in which to set the properties (default: 0). Higher priority properties will be updated before lower priority ones.
		 */
		CSSPlugin.registerSpecialProp = function(name, onInitTween, priority) {
			_registerComplexSpecialProp(name, {parser:function(t, e, p, cssp, pt, plugin, vars) {
				var rv = new CSSPropTween(t, p, 0, 0, pt, 2, p, false, priority);
				rv.plugin = plugin;
				rv.setRatio = onInitTween(t, e, cssp._tween, p);
				return rv;
			}, priority:priority});
		};






		//transform-related methods and properties
		CSSPlugin.useSVGTransformAttr = _isSafari || _isFirefox; //Safari and Firefox both have some rendering bugs when applying CSS transforms to SVG elements, so default to using the "transform" attribute instead (users can override this).
		var _transformProps = ("scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent").split(","),
			_transformProp = _checkPropPrefix("transform"), //the Javascript (camelCase) transform property, like msTransform, WebkitTransform, MozTransform, or OTransform.
			_transformPropCSS = _prefixCSS + "transform",
			_transformOriginProp = _checkPropPrefix("transformOrigin"),
			_supports3D = (_checkPropPrefix("perspective") !== null),
			Transform = _internals.Transform = function() {
				this.perspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0;
				this.force3D = (CSSPlugin.defaultForce3D === false || !_supports3D) ? false : CSSPlugin.defaultForce3D || "auto";
			},
			_SVGElement = window.SVGElement,
			_useSVGTransformAttr,
			//Some browsers (like Firefox and IE) don't honor transform-origin properly in SVG elements, so we need to manually adjust the matrix accordingly. We feature detect here rather than always doing the conversion for certain browsers because they may fix the problem at some point in the future.

			_createSVG = function(type, container, attributes) {
				var element = _doc.createElementNS("http://www.w3.org/2000/svg", type),
					reg = /([a-z])([A-Z])/g,
					p;
				for (p in attributes) {
					element.setAttributeNS(null, p.replace(reg, "$1-$2").toLowerCase(), attributes[p]);
				}
				container.appendChild(element);
				return element;
			},
			_docElement = _doc.documentElement,
			_forceSVGTransformAttr = (function() {
				//IE and Android stock don't support CSS transforms on SVG elements, so we must write them to the "transform" attribute. We populate this variable in the _parseTransform() method, and only if/when we come across an SVG element
				var force = _ieVers || (/Android/i.test(_agent) && !window.chrome),
					svg, rect, width;
				if (_doc.createElementNS && !force) { //IE8 and earlier doesn't support SVG anyway
					svg = _createSVG("svg", _docElement);
					rect = _createSVG("rect", svg, {width:100, height:50, x:100});
					width = rect.getBoundingClientRect().width;
					rect.style[_transformOriginProp] = "50% 50%";
					rect.style[_transformProp] = "scaleX(0.5)";
					force = (width === rect.getBoundingClientRect().width && !(_isFirefox && _supports3D)); //note: Firefox fails the test even though it does support CSS transforms in 3D. Since we can't push 3D stuff into the transform attribute, we force Firefox to pass the test here (as long as it does truly support 3D).
					_docElement.removeChild(svg);
				}
				return force;
			})(),
			_parseSVGOrigin = function(e, local, decoratee, absolute, smoothOrigin, skipRecord) {
				var tm = e._gsTransform,
					m = _getMatrix(e, true),
					v, x, y, xOrigin, yOrigin, a, b, c, d, tx, ty, determinant, xOriginOld, yOriginOld;
				if (tm) {
					xOriginOld = tm.xOrigin; //record the original values before we alter them.
					yOriginOld = tm.yOrigin;
				}
				if (!absolute || (v = absolute.split(" ")).length < 2) {
					b = e.getBBox();
					local = _parsePosition(local).split(" ");
					v = [(local[0].indexOf("%") !== -1 ? parseFloat(local[0]) / 100 * b.width : parseFloat(local[0])) + b.x,
						 (local[1].indexOf("%") !== -1 ? parseFloat(local[1]) / 100 * b.height : parseFloat(local[1])) + b.y];
				}
				decoratee.xOrigin = xOrigin = parseFloat(v[0]);
				decoratee.yOrigin = yOrigin = parseFloat(v[1]);
				if (absolute && m !== _identity2DMatrix) { //if svgOrigin is being set, we must invert the matrix and determine where the absolute point is, factoring in the current transforms. Otherwise, the svgOrigin would be based on the element's non-transformed position on the canvas.
					a = m[0];
					b = m[1];
					c = m[2];
					d = m[3];
					tx = m[4];
					ty = m[5];
					determinant = (a * d - b * c);
					x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + ((c * ty - d * tx) / determinant);
					y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - ((a * ty - b * tx) / determinant);
					xOrigin = decoratee.xOrigin = v[0] = x;
					yOrigin = decoratee.yOrigin = v[1] = y;
				}
				if (tm) { //avoid jump when transformOrigin is changed - adjust the x/y values accordingly
					if (skipRecord) {
						decoratee.xOffset = tm.xOffset;
						decoratee.yOffset = tm.yOffset;
						tm = decoratee;
					}
					if (smoothOrigin || (smoothOrigin !== false && CSSPlugin.defaultSmoothOrigin !== false)) {
						x = xOrigin - xOriginOld;
						y = yOrigin - yOriginOld;
						//originally, we simply adjusted the x and y values, but that would cause problems if, for example, you created a rotational tween part-way through an x/y tween. Managing the offset in a separate variable gives us ultimate flexibility.
						//tm.x -= x - (x * m[0] + y * m[2]);
						//tm.y -= y - (x * m[1] + y * m[3]);
						tm.xOffset += (x * m[0] + y * m[2]) - x;
						tm.yOffset += (x * m[1] + y * m[3]) - y;
					} else {
						tm.xOffset = tm.yOffset = 0;
					}
				}
				if (!skipRecord) {
					e.setAttribute("data-svg-origin", v.join(" "));
				}
			},
			_canGetBBox = function(e) {
				try {
					return e.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
				} catch (e) {}
			},
			_isSVG = function(e) { //reports if the element is an SVG on which getBBox() actually works
				return !!(_SVGElement && e.getBBox && e.getCTM && _canGetBBox(e) && (!e.parentNode || (e.parentNode.getBBox && e.parentNode.getCTM)));
			},
			_identity2DMatrix = [1,0,0,1,0,0],
			_getMatrix = function(e, force2D) {
				var tm = e._gsTransform || new Transform(),
					rnd = 100000,
					style = e.style,
					isDefault, s, m, n, dec, none;
				if (_transformProp) {
					s = _getStyle(e, _transformPropCSS, null, true);
				} else if (e.currentStyle) {
					//for older versions of IE, we need to interpret the filter portion that is in the format: progid:DXImageTransform.Microsoft.Matrix(M11=6.123233995736766e-17, M12=-1, M21=1, M22=6.123233995736766e-17, sizingMethod='auto expand') Notice that we need to swap b and c compared to a normal matrix.
					s = e.currentStyle.filter.match(_ieGetMatrixExp);
					s = (s && s.length === 4) ? [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), (tm.x || 0), (tm.y || 0)].join(",") : "";
				}
				isDefault = (!s || s === "none" || s === "matrix(1, 0, 0, 1, 0, 0)");
				if (isDefault && _transformProp && ((none = (_getComputedStyle(e).display === "none")) || !e.parentNode)) {
					if (none) { //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none".
						n = style.display;
						style.display = "block";
					}
					if (!e.parentNode) {
						dec = 1; //flag
						_docElement.appendChild(e);
					}
					s = _getStyle(e, _transformPropCSS, null, true);
					isDefault = (!s || s === "none" || s === "matrix(1, 0, 0, 1, 0, 0)");
					if (n) {
						style.display = n;
					} else if (none) {
						_removeProp(style, "display");
					}
					if (dec) {
						_docElement.removeChild(e);
					}
				}
				if (tm.svg || (e.getBBox && _isSVG(e))) {
					if (isDefault && (style[_transformProp] + "").indexOf("matrix") !== -1) { //some browsers (like Chrome 40) don't correctly report transforms that are applied inline on an SVG element (they don't get included in the computed style), so we double-check here and accept matrix values
						s = style[_transformProp];
						isDefault = 0;
					}
					m = e.getAttribute("transform");
					if (isDefault && m) {
						if (m.indexOf("matrix") !== -1) { //just in case there's a "transform" value specified as an attribute instead of CSS style. Accept either a matrix() or simple translate() value though.
							s = m;
							isDefault = 0;
						} else if (m.indexOf("translate") !== -1) {
							s = "matrix(1,0,0,1," + m.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")";
							isDefault = 0;
						}
					}
				}
				if (isDefault) {
					return _identity2DMatrix;
				}
				//split the matrix values out into an array (m for matrix)
				m = (s || "").match(_numExp) || [];
				i = m.length;
				while (--i > -1) {
					n = Number(m[i]);
					m[i] = (dec = n - (n |= 0)) ? ((dec * rnd + (dec < 0 ? -0.5 : 0.5)) | 0) / rnd + n : n; //convert strings to Numbers and round to 5 decimal places to avoid issues with tiny numbers. Roughly 20x faster than Number.toFixed(). We also must make sure to round before dividing so that values like 0.9999999999 become 1 to avoid glitches in browser rendering and interpretation of flipped/rotated 3D matrices. And don't just multiply the number by rnd, floor it, and then divide by rnd because the bitwise operations max out at a 32-bit signed integer, thus it could get clipped at a relatively low value (like 22,000.00000 for example).
				}
				return (force2D && m.length > 6) ? [m[0], m[1], m[4], m[5], m[12], m[13]] : m;
			},

			/**
			 * Parses the transform values for an element, returning an object with x, y, z, scaleX, scaleY, scaleZ, rotation, rotationX, rotationY, skewX, and skewY properties. Note: by default (for performance reasons), all skewing is combined into skewX and rotation but skewY still has a place in the transform object so that we can record how much of the skew is attributed to skewX vs skewY. Remember, a skewY of 10 looks the same as a rotation of 10 and skewX of -10.
			 * @param {!Object} t target element
			 * @param {Object=} cs computed style object (optional)
			 * @param {boolean=} rec if true, the transform values will be recorded to the target element's _gsTransform object, like target._gsTransform = {x:0, y:0, z:0, scaleX:1...}
			 * @param {boolean=} parse if true, we'll ignore any _gsTransform values that already exist on the element, and force a reparsing of the css (calculated style)
			 * @return {object} object containing all of the transform properties/values like {x:0, y:0, z:0, scaleX:1...}
			 */
			_getTransform = _internals.getTransform = function(t, cs, rec, parse) {
				if (t._gsTransform && rec && !parse) {
					return t._gsTransform; //if the element already has a _gsTransform, use that. Note: some browsers don't accurately return the calculated style for the transform (particularly for SVG), so it's almost always safest to just use the values we've already applied rather than re-parsing things.
				}
				var tm = rec ? t._gsTransform || new Transform() : new Transform(),
					invX = (tm.scaleX < 0), //in order to interpret things properly, we need to know if the user applied a negative scaleX previously so that we can adjust the rotation and skewX accordingly. Otherwise, if we always interpret a flipped matrix as affecting scaleY and the user only wants to tween the scaleX on multiple sequential tweens, it would keep the negative scaleY without that being the user's intent.
					min = 0.00002,
					rnd = 100000,
					zOrigin = _supports3D ? parseFloat(_getStyle(t, _transformOriginProp, cs, false, "0 0 0").split(" ")[2]) || tm.zOrigin  || 0 : 0,
					defaultTransformPerspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0,
					m, i, scaleX, scaleY, rotation, skewX;

				tm.svg = !!(t.getBBox && _isSVG(t));
				if (tm.svg) {
					_parseSVGOrigin(t, _getStyle(t, _transformOriginProp, cs, false, "50% 50%") + "", tm, t.getAttribute("data-svg-origin"));
					_useSVGTransformAttr = CSSPlugin.useSVGTransformAttr || _forceSVGTransformAttr;
				}
				m = _getMatrix(t);
				if (m !== _identity2DMatrix) {

					if (m.length === 16) {
						//we'll only look at these position-related 6 variables first because if x/y/z all match, it's relatively safe to assume we don't need to re-parse everything which risks losing important rotational information (like rotationX:180 plus rotationY:180 would look the same as rotation:180 - there's no way to know for sure which direction was taken based solely on the matrix3d() values)
						var a11 = m[0], a21 = m[1], a31 = m[2], a41 = m[3],
							a12 = m[4], a22 = m[5], a32 = m[6], a42 = m[7],
							a13 = m[8], a23 = m[9], a33 = m[10],
							a14 = m[12], a24 = m[13], a34 = m[14],
							a43 = m[11],
							angle = Math.atan2(a32, a33),
							t1, t2, t3, t4, cos, sin;

						//we manually compensate for non-zero z component of transformOrigin to work around bugs in Safari
						if (tm.zOrigin) {
							a34 = -tm.zOrigin;
							a14 = a13*a34-m[12];
							a24 = a23*a34-m[13];
							a34 = a33*a34+tm.zOrigin-m[14];
						}
						tm.rotationX = angle * _RAD2DEG;
						//rotationX
						if (angle) {
							cos = Math.cos(-angle);
							sin = Math.sin(-angle);
							t1 = a12*cos+a13*sin;
							t2 = a22*cos+a23*sin;
							t3 = a32*cos+a33*sin;
							a13 = a12*-sin+a13*cos;
							a23 = a22*-sin+a23*cos;
							a33 = a32*-sin+a33*cos;
							a43 = a42*-sin+a43*cos;
							a12 = t1;
							a22 = t2;
							a32 = t3;
						}
						//rotationY
						angle = Math.atan2(-a31, a33);
						tm.rotationY = angle * _RAD2DEG;
						if (angle) {
							cos = Math.cos(-angle);
							sin = Math.sin(-angle);
							t1 = a11*cos-a13*sin;
							t2 = a21*cos-a23*sin;
							t3 = a31*cos-a33*sin;
							a23 = a21*sin+a23*cos;
							a33 = a31*sin+a33*cos;
							a43 = a41*sin+a43*cos;
							a11 = t1;
							a21 = t2;
							a31 = t3;
						}
						//rotationZ
						angle = Math.atan2(a21, a11);
						tm.rotation = angle * _RAD2DEG;
						if (angle) {
							cos = Math.cos(-angle);
							sin = Math.sin(-angle);
							a11 = a11*cos+a12*sin;
							t2 = a21*cos+a22*sin;
							a22 = a21*-sin+a22*cos;
							a32 = a31*-sin+a32*cos;
							a21 = t2;
						}

						if (tm.rotationX && Math.abs(tm.rotationX) + Math.abs(tm.rotation) > 359.9) { //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
							tm.rotationX = tm.rotation = 0;
							tm.rotationY = 180 - tm.rotationY;
						}

						tm.scaleX = ((Math.sqrt(a11 * a11 + a21 * a21) * rnd + 0.5) | 0) / rnd;
						tm.scaleY = ((Math.sqrt(a22 * a22 + a23 * a23) * rnd + 0.5) | 0) / rnd;
						tm.scaleZ = ((Math.sqrt(a32 * a32 + a33 * a33) * rnd + 0.5) | 0) / rnd;
						if (tm.rotationX || tm.rotationY) {
							tm.skewX = 0;
						} else {
							tm.skewX = (a12 || a22) ? Math.atan2(a12, a22) * _RAD2DEG + tm.rotation : tm.skewX || 0;
							if (Math.abs(tm.skewX) > 90 && Math.abs(tm.skewX) < 270) {
								if (invX) {
									tm.scaleX *= -1;
									tm.skewX += (tm.rotation <= 0) ? 180 : -180;
									tm.rotation += (tm.rotation <= 0) ? 180 : -180;
								} else {
									tm.scaleY *= -1;
									tm.skewX += (tm.skewX <= 0) ? 180 : -180;
								}
							}
						}
						tm.perspective = a43 ? 1 / ((a43 < 0) ? -a43 : a43) : 0;
						tm.x = a14;
						tm.y = a24;
						tm.z = a34;
						if (tm.svg) {
							tm.x -= tm.xOrigin - (tm.xOrigin * a11 - tm.yOrigin * a12);
							tm.y -= tm.yOrigin - (tm.yOrigin * a21 - tm.xOrigin * a22);
						}

					} else if ((!_supports3D || parse || !m.length || tm.x !== m[4] || tm.y !== m[5] || (!tm.rotationX && !tm.rotationY))) { //sometimes a 6-element matrix is returned even when we performed 3D transforms, like if rotationX and rotationY are 180. In cases like this, we still need to honor the 3D transforms. If we just rely on the 2D info, it could affect how the data is interpreted, like scaleY might get set to -1 or rotation could get offset by 180 degrees. For example, do a FWDTweenLite.to(element, 1, {css:{rotationX:180, rotationY:180}}) and then later, FWDTweenLite.to(element, 1, {css:{rotationX:0}}) and without this conditional logic in place, it'd jump to a state of being unrotated when the 2nd tween starts. Then again, we need to honor the fact that the user COULD alter the transforms outside of CSSPlugin, like by manually applying new css, so we try to sense that by looking at x and y because if those changed, we know the changes were made outside CSSPlugin and we force a reinterpretation of the matrix values. Also, in Webkit browsers, if the element's "display" is "none", its calculated style value will always return empty, so if we've already recorded the values in the _gsTransform object, we'll just rely on those.
						var k = (m.length >= 6),
							a = k ? m[0] : 1,
							b = m[1] || 0,
							c = m[2] || 0,
							d = k ? m[3] : 1;
						tm.x = m[4] || 0;
						tm.y = m[5] || 0;
						scaleX = Math.sqrt(a * a + b * b);
						scaleY = Math.sqrt(d * d + c * c);
						rotation = (a || b) ? Math.atan2(b, a) * _RAD2DEG : tm.rotation || 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).
						skewX = (c || d) ? Math.atan2(c, d) * _RAD2DEG + rotation : tm.skewX || 0;
						if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
							if (invX) {
								scaleX *= -1;
								skewX += (rotation <= 0) ? 180 : -180;
								rotation += (rotation <= 0) ? 180 : -180;
							} else {
								scaleY *= -1;
								skewX += (skewX <= 0) ? 180 : -180;
							}
						}
						tm.scaleX = scaleX;
						tm.scaleY = scaleY;
						tm.rotation = rotation;
						tm.skewX = skewX;
						if (_supports3D) {
							tm.rotationX = tm.rotationY = tm.z = 0;
							tm.perspective = defaultTransformPerspective;
							tm.scaleZ = 1;
						}
						if (tm.svg) {
							tm.x -= tm.xOrigin - (tm.xOrigin * a + tm.yOrigin * c);
							tm.y -= tm.yOrigin - (tm.xOrigin * b + tm.yOrigin * d);
						}
					}
					tm.zOrigin = zOrigin;
					//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 0 in these cases. The conditional logic here is faster than calling Math.abs(). Also, browsers tend to render a SLIGHTLY rotated object in a fuzzy way, so we need to snap to exactly 0 when appropriate.
					for (i in tm) {
						if (tm[i] < min) if (tm[i] > -min) {
							tm[i] = 0;
						}
					}
				}
				//DEBUG: _log("parsed rotation of " + t.getAttribute("id")+": "+(tm.rotationX)+", "+(tm.rotationY)+", "+(tm.rotation)+", scale: "+tm.scaleX+", "+tm.scaleY+", "+tm.scaleZ+", position: "+tm.x+", "+tm.y+", "+tm.z+", perspective: "+tm.perspective+ ", origin: "+ tm.xOrigin+ ","+ tm.yOrigin);
				if (rec) {
					t._gsTransform = tm; //record to the object's _gsTransform which we use so that tweens can control individual properties independently (we need all the properties to accurately recompose the matrix in the setRatio() method)
					if (tm.svg) { //if we're supposed to apply transforms to the SVG element's "transform" attribute, make sure there aren't any CSS transforms applied or they'll override the attribute ones. Also clear the transform attribute if we're using CSS, just to be clean.
						if (_useSVGTransformAttr && t.style[_transformProp]) {
							FWDTweenLite.delayedCall(0.001, function(){ //if we apply this right away (before anything has rendered), we risk there being no transforms for a brief moment and it also interferes with adjusting the transformOrigin in a tween with immediateRender:true (it'd try reading the matrix and it wouldn't have the appropriate data in place because we just removed it).
								_removeProp(t.style, _transformProp);
							});
						} else if (!_useSVGTransformAttr && t.getAttribute("transform")) {
							FWDTweenLite.delayedCall(0.001, function(){
								t.removeAttribute("transform");
							});
						}
					}
				}
				return tm;
			},

			//for setting 2D transforms in IE6, IE7, and IE8 (must use a "filter" to emulate the behavior of modern day browser transforms)
			_setIETransformRatio = function(v) {
				var t = this.data, //refers to the element's _gsTransform object
					ang = -t.rotation * _DEG2RAD,
					skew = ang + t.skewX * _DEG2RAD,
					rnd = 100000,
					a = ((Math.cos(ang) * t.scaleX * rnd) | 0) / rnd,
					b = ((Math.sin(ang) * t.scaleX * rnd) | 0) / rnd,
					c = ((Math.sin(skew) * -t.scaleY * rnd) | 0) / rnd,
					d = ((Math.cos(skew) * t.scaleY * rnd) | 0) / rnd,
					style = this.t.style,
					cs = this.t.currentStyle,
					filters, val;
				if (!cs) {
					return;
				}
				val = b; //just for swapping the variables an inverting them (reused "val" to avoid creating another variable in memory). IE's filter matrix uses a non-standard matrix configuration (angle goes the opposite way, and b and c are reversed and inverted)
				b = -c;
				c = -val;
				filters = cs.filter;
				style.filter = ""; //remove filters so that we can accurately measure offsetWidth/offsetHeight
				var w = this.t.offsetWidth,
					h = this.t.offsetHeight,
					clip = (cs.position !== "absolute"),
					m = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + b + ", M21=" + c + ", M22=" + d,
					ox = t.x + (w * t.xPercent / 100),
					oy = t.y + (h * t.yPercent / 100),
					dx, dy;

				//if transformOrigin is being used, adjust the offset x and y
				if (t.ox != null) {
					dx = ((t.oxp) ? w * t.ox * 0.01 : t.ox) - w / 2;
					dy = ((t.oyp) ? h * t.oy * 0.01 : t.oy) - h / 2;
					ox += dx - (dx * a + dy * b);
					oy += dy - (dx * c + dy * d);
				}

				if (!clip) {
					m += ", sizingMethod='auto expand')";
				} else {
					dx = (w / 2);
					dy = (h / 2);
					//translate to ensure that transformations occur around the correct origin (default is center).
					m += ", Dx=" + (dx - (dx * a + dy * b) + ox) + ", Dy=" + (dy - (dx * c + dy * d) + oy) + ")";
				}
				if (filters.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1) {
					style.filter = filters.replace(_ieSetMatrixExp, m);
				} else {
					style.filter = m + " " + filters; //we must always put the transform/matrix FIRST (before alpha(opacity=xx)) to avoid an IE bug that slices part of the object when rotation is applied with alpha.
				}

				//at the end or beginning of the tween, if the matrix is normal (1, 0, 0, 1) and opacity is 100 (or doesn't exist), remove the filter to improve browser performance.
				if (v === 0 || v === 1) if (a === 1) if (b === 0) if (c === 0) if (d === 1) if (!clip || m.indexOf("Dx=0, Dy=0") !== -1) if (!_opacityExp.test(filters) || parseFloat(RegExp.$1) === 100) if (filters.indexOf("gradient(" && filters.indexOf("Alpha")) === -1) {
					style.removeAttribute("filter");
				}

				//we must set the margins AFTER applying the filter in order to avoid some bugs in IE8 that could (in rare scenarios) cause them to be ignored intermittently (vibration).
				if (!clip) {
					var mult = (_ieVers < 8) ? 1 : -1, //in Internet Explorer 7 and before, the box model is broken, causing the browser to treat the width/height of the actual rotated filtered image as the width/height of the box itself, but Microsoft corrected that in IE8. We must use a negative offset in IE8 on the right/bottom
						marg, prop, dif;
					dx = t.ieOffsetX || 0;
					dy = t.ieOffsetY || 0;
					t.ieOffsetX = Math.round((w - ((a < 0 ? -a : a) * w + (b < 0 ? -b : b) * h)) / 2 + ox);
					t.ieOffsetY = Math.round((h - ((d < 0 ? -d : d) * h + (c < 0 ? -c : c) * w)) / 2 + oy);
					for (i = 0; i < 4; i++) {
						prop = _margins[i];
						marg = cs[prop];
						//we need to get the current margin in case it is being tweened separately (we want to respect that tween's changes)
						val = (marg.indexOf("px") !== -1) ? parseFloat(marg) : _convertToPixels(this.t, prop, parseFloat(marg), marg.replace(_suffixExp, "")) || 0;
						if (val !== t[prop]) {
							dif = (i < 2) ? -t.ieOffsetX : -t.ieOffsetY; //if another tween is controlling a margin, we cannot only apply the difference in the ieOffsets, so we essentially zero-out the dx and dy here in that case. We record the margin(s) later so that we can keep comparing them, making this code very flexible.
						} else {
							dif = (i < 2) ? dx - t.ieOffsetX : dy - t.ieOffsetY;
						}
						style[prop] = (t[prop] = Math.round( val - dif * ((i === 0 || i === 2) ? 1 : mult) )) + "px";
					}
				}
			},

			/* translates a super small decimal to a string WITHOUT scientific notation
			_safeDecimal = function(n) {
				var s = (n < 0 ? -n : n) + "",
					a = s.split("e-");
				return (n < 0 ? "-0." : "0.") + new Array(parseInt(a[1], 10) || 0).join("0") + a[0].split(".").join("");
			},
			*/

			_setTransformRatio = _internals.set3DTransformRatio = _internals.setTransformRatio = function(v) {
				var t = this.data, //refers to the element's _gsTransform object
					style = this.t.style,
					angle = t.rotation,
					rotationX = t.rotationX,
					rotationY = t.rotationY,
					sx = t.scaleX,
					sy = t.scaleY,
					sz = t.scaleZ,
					x = t.x,
					y = t.y,
					z = t.z,
					isSVG = t.svg,
					perspective = t.perspective,
					force3D = t.force3D,
					a11, a12, a13, a21, a22, a23, a31, a32, a33, a41, a42, a43,
					zOrigin, min, cos, sin, t1, t2, transform, comma, zero, skew, rnd;
				//check to see if we should render as 2D (and SVGs must use 2D when _useSVGTransformAttr is true)
				if (((((v === 1 || v === 0) && force3D === "auto" && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime)) || !force3D) && !z && !perspective && !rotationY && !rotationX && sz === 1) || (_useSVGTransformAttr && isSVG) || !_supports3D) { //on the final render (which could be 0 for a from tween), if there are no 3D aspects, render in 2D to free up memory and improve performance especially on mobile devices. Check the tween's totalTime/totalDuration too in order to make sure it doesn't happen between repeats if it's a repeating tween.

					//2D
					if (angle || t.skewX || isSVG) {
						angle *= _DEG2RAD;
						skew = t.skewX * _DEG2RAD;
						rnd = 100000;
						a11 = Math.cos(angle) * sx;
						a21 = Math.sin(angle) * sx;
						a12 = Math.sin(angle - skew) * -sy;
						a22 = Math.cos(angle - skew) * sy;
						if (skew && t.skewType === "simple") { //by default, we compensate skewing on the other axis to make it look more natural, but you can set the skewType to "simple" to use the uncompensated skewing that CSS does
							t1 = Math.tan(skew - t.skewY * _DEG2RAD);
							t1 = Math.sqrt(1 + t1 * t1);
							a12 *= t1;
							a22 *= t1;
							if (t.skewY) {
								t1 = Math.tan(t.skewY * _DEG2RAD);
								t1 = Math.sqrt(1 + t1 * t1);
								a11 *= t1;
								a21 *= t1;
							}
						}
						if (isSVG) {
							x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
							y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;
							if (_useSVGTransformAttr && (t.xPercent || t.yPercent)) { //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the matrix to simulate it.
								min = this.t.getBBox();
								x += t.xPercent * 0.01 * min.width;
								y += t.yPercent * 0.01 * min.height;
							}
							min = 0.000001;
							if (x < min) if (x > -min) {
								x = 0;
							}
							if (y < min) if (y > -min) {
								y = 0;
							}
						}
						transform = (((a11 * rnd) | 0) / rnd) + "," + (((a21 * rnd) | 0) / rnd) + "," + (((a12 * rnd) | 0) / rnd) + "," + (((a22 * rnd) | 0) / rnd) + "," + x + "," + y + ")";
						if (isSVG && _useSVGTransformAttr) {
							this.t.setAttribute("transform", "matrix(" + transform);
						} else {
							//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 5 decimal places.
							style[_transformProp] = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + transform;
						}
					} else {
						style[_transformProp] = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + sx + ",0,0," + sy + "," + x + "," + y + ")";
					}
					return;

				}
				if (_isFirefox) { //Firefox has a bug (at least in v25) that causes it to render the transparent part of 32-bit PNG images as black when displayed inside an iframe and the 3D scale is very small and doesn't change sufficiently enough between renders (like if you use a Power4.easeInOut to scale from 0 to 1 where the beginning values only change a tiny amount to begin the tween before accelerating). In this case, we force the scale to be 0.00002 instead which is visually the same but works around the Firefox issue.
					min = 0.0001;
					if (sx < min && sx > -min) {
						sx = sz = 0.00002;
					}
					if (sy < min && sy > -min) {
						sy = sz = 0.00002;
					}
					if (perspective && !t.z && !t.rotationX && !t.rotationY) { //Firefox has a bug that causes elements to have an odd super-thin, broken/dotted black border on elements that have a perspective set but aren't utilizing 3D space (no rotationX, rotationY, or z).
						perspective = 0;
					}
				}
				if (angle || t.skewX) {
					angle *= _DEG2RAD;
					cos = a11 = Math.cos(angle);
					sin = a21 = Math.sin(angle);
					if (t.skewX) {
						angle -= t.skewX * _DEG2RAD;
						cos = Math.cos(angle);
						sin = Math.sin(angle);
						if (t.skewType === "simple") { //by default, we compensate skewing on the other axis to make it look more natural, but you can set the skewType to "simple" to use the uncompensated skewing that CSS does
							t1 = Math.tan((t.skewX - t.skewY) * _DEG2RAD);
							t1 = Math.sqrt(1 + t1 * t1);
							cos *= t1;
							sin *= t1;
							if (t.skewY) {
								t1 = Math.tan(t.skewY * _DEG2RAD);
								t1 = Math.sqrt(1 + t1 * t1);
								a11 *= t1;
								a21 *= t1;
							}
						}
					}
					a12 = -sin;
					a22 = cos;

				} else if (!rotationY && !rotationX && sz === 1 && !perspective && !isSVG) { //if we're only translating and/or 2D scaling, this is faster...
					style[_transformProp] = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) translate3d(" : "translate3d(") + x + "px," + y + "px," + z +"px)" + ((sx !== 1 || sy !== 1) ? " scale(" + sx + "," + sy + ")" : "");
					return;
				} else {
					a11 = a22 = 1;
					a12 = a21 = 0;
				}
				// KEY  INDEX   AFFECTS
				// a11  0       rotation, rotationY, scaleX
				// a21  1       rotation, rotationY, scaleX
				// a31  2       rotationY, scaleX
				// a41  3       rotationY, scaleX
				// a12  4       rotation, skewX, rotationX, scaleY
				// a22  5       rotation, skewX, rotationX, scaleY
				// a32  6       rotationX, scaleY
				// a42  7       rotationX, scaleY
				// a13  8       rotationY, rotationX, scaleZ
				// a23  9       rotationY, rotationX, scaleZ
				// a33  10      rotationY, rotationX, scaleZ
				// a43  11      rotationY, rotationX, perspective, scaleZ
				// a14  12      x, zOrigin, svgOrigin
				// a24  13      y, zOrigin, svgOrigin
				// a34  14      z, zOrigin
				// a44  15
				// rotation: Math.atan2(a21, a11)
				// rotationY: Math.atan2(a13, a33) (or Math.atan2(a13, a11))
				// rotationX: Math.atan2(a32, a33)
				a33 = 1;
				a13 = a23 = a31 = a32 = a41 = a42 = 0;
				a43 = (perspective) ? -1 / perspective : 0;
				zOrigin = t.zOrigin;
				min = 0.000001; //threshold below which browsers use scientific notation which won't work.
				comma = ",";
				zero = "0";
				angle = rotationY * _DEG2RAD;
				if (angle) {
					cos = Math.cos(angle);
					sin = Math.sin(angle);
					a31 = -sin;
					a41 = a43*-sin;
					a13 = a11*sin;
					a23 = a21*sin;
					a33 = cos;
					a43 *= cos;
					a11 *= cos;
					a21 *= cos;
				}
				angle = rotationX * _DEG2RAD;
				if (angle) {
					cos = Math.cos(angle);
					sin = Math.sin(angle);
					t1 = a12*cos+a13*sin;
					t2 = a22*cos+a23*sin;
					a32 = a33*sin;
					a42 = a43*sin;
					a13 = a12*-sin+a13*cos;
					a23 = a22*-sin+a23*cos;
					a33 = a33*cos;
					a43 = a43*cos;
					a12 = t1;
					a22 = t2;
				}
				if (sz !== 1) {
					a13*=sz;
					a23*=sz;
					a33*=sz;
					a43*=sz;
				}
				if (sy !== 1) {
					a12*=sy;
					a22*=sy;
					a32*=sy;
					a42*=sy;
				}
				if (sx !== 1) {
					a11*=sx;
					a21*=sx;
					a31*=sx;
					a41*=sx;
				}

				if (zOrigin || isSVG) {
					if (zOrigin) {
						x += a13*-zOrigin;
						y += a23*-zOrigin;
						z += a33*-zOrigin+zOrigin;
					}
					if (isSVG) { //due to bugs in some browsers, we need to manage the transform-origin of SVG manually
						x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
						y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;
					}
					if (x < min && x > -min) {
						x = zero;
					}
					if (y < min && y > -min) {
						y = zero;
					}
					if (z < min && z > -min) {
						z = 0; //don't use string because we calculate perspective later and need the number.
					}
				}

				//optimized way of concatenating all the values into a string. If we do it all in one shot, it's slower because of the way browsers have to create temp strings and the way it affects memory. If we do it piece-by-piece with +=, it's a bit slower too. We found that doing it in these sized chunks works best overall:
				transform = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix3d(" : "matrix3d(");
				transform += ((a11 < min && a11 > -min) ? zero : a11) + comma + ((a21 < min && a21 > -min) ? zero : a21) + comma + ((a31 < min && a31 > -min) ? zero : a31);
				transform += comma + ((a41 < min && a41 > -min) ? zero : a41) + comma + ((a12 < min && a12 > -min) ? zero : a12) + comma + ((a22 < min && a22 > -min) ? zero : a22);
				if (rotationX || rotationY || sz !== 1) { //performance optimization (often there's no rotationX or rotationY, so we can skip these calculations)
					transform += comma + ((a32 < min && a32 > -min) ? zero : a32) + comma + ((a42 < min && a42 > -min) ? zero : a42) + comma + ((a13 < min && a13 > -min) ? zero : a13);
					transform += comma + ((a23 < min && a23 > -min) ? zero : a23) + comma + ((a33 < min && a33 > -min) ? zero : a33) + comma + ((a43 < min && a43 > -min) ? zero : a43) + comma;
				} else {
					transform += ",0,0,0,0,1,0,";
				}
				transform += x + comma + y + comma + z + comma + (perspective ? (1 + (-z / perspective)) : 1) + ")";

				style[_transformProp] = transform;
			};

		p = Transform.prototype;
		p.x = p.y = p.z = p.skewX = p.skewY = p.rotation = p.rotationX = p.rotationY = p.zOrigin = p.xPercent = p.yPercent = p.xOffset = p.yOffset = 0;
		p.scaleX = p.scaleY = p.scaleZ = 1;

		_registerComplexSpecialProp("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {parser:function(t, e, parsingProp, cssp, pt, plugin, vars) {
			if (cssp._lastParsedTransform === vars) { return pt; } //only need to parse the transform once, and only if the browser supports it.
			cssp._lastParsedTransform = vars;
			var swapFunc;
			if (typeof(vars[parsingProp]) === "function") { //whatever property triggers the initial parsing might be a function-based value in which case it already got called in parse(), thus we don't want to call it again in here. The most efficient way to avoid this is to temporarily swap the value directly into the vars object, and then after we do all our parsing in this function, we'll swap it back again.
				swapFunc = vars[parsingProp];
				vars[parsingProp] = e;
			}
			var originalGSTransform = t._gsTransform,
				style = t.style,
				min = 0.000001,
				i = _transformProps.length,
				v = vars,
				endRotations = {},
				transformOriginString = "transformOrigin",
				m1 = _getTransform(t, _cs, true, v.parseTransform),
				orig = v.transform && ((typeof(v.transform) === "function") ? v.transform(_index, _target) : v.transform),
				m2, copy, has3D, hasChange, dr, x, y, matrix, p;
			cssp._transform = m1;
			if (orig && typeof(orig) === "string" && _transformProp) { //for values like transform:"rotate(60deg) scale(0.5, 0.8)"
				copy = _tempDiv.style; //don't use the original target because it might be SVG in which case some browsers don't report computed style correctly.
				copy[_transformProp] = orig;
				copy.display = "block"; //if display is "none", the browser often refuses to report the transform properties correctly.
				copy.position = "absolute";
				_doc.body.appendChild(_tempDiv);
				m2 = _getTransform(_tempDiv, null, false);
				if (m1.svg) { //if it's an SVG element, x/y part of the matrix will be affected by whatever we use as the origin and the offsets, so compensate here...
					x = m1.xOrigin;
					y = m1.yOrigin;
					m2.x -= m1.xOffset;
					m2.y -= m1.yOffset;
					if (v.transformOrigin || v.svgOrigin) { //if this tween is altering the origin, we must factor that in here. The actual work of recording the transformOrigin values and setting up the PropTween is done later (still inside this function) so we cannot leave the changes intact here - we only want to update the x/y accordingly.
						orig = {};
						_parseSVGOrigin(t, _parsePosition(v.transformOrigin), orig, v.svgOrigin, v.smoothOrigin, true);
						x = orig.xOrigin;
						y = orig.yOrigin;
						m2.x -= orig.xOffset - m1.xOffset;
						m2.y -= orig.yOffset - m1.yOffset;
					}
					if (x || y) {
						matrix = _getMatrix(_tempDiv, true);
						m2.x -= x - (x * matrix[0] + y * matrix[2]);
						m2.y -= y - (x * matrix[1] + y * matrix[3]);
					}
				}
				_doc.body.removeChild(_tempDiv);
				if (!m2.perspective) {
					m2.perspective = m1.perspective; //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
				}
				if (v.xPercent != null) {
					m2.xPercent = _parseVal(v.xPercent, m1.xPercent);
				}
				if (v.yPercent != null) {
					m2.yPercent = _parseVal(v.yPercent, m1.yPercent);
				}
			} else if (typeof(v) === "object") { //for values like scaleX, scaleY, rotation, x, y, skewX, and skewY or transform:{...} (object)
				m2 = {scaleX:_parseVal((v.scaleX != null) ? v.scaleX : v.scale, m1.scaleX),
					scaleY:_parseVal((v.scaleY != null) ? v.scaleY : v.scale, m1.scaleY),
					scaleZ:_parseVal(v.scaleZ, m1.scaleZ),
					x:_parseVal(v.x, m1.x),
					y:_parseVal(v.y, m1.y),
					z:_parseVal(v.z, m1.z),
					xPercent:_parseVal(v.xPercent, m1.xPercent),
					yPercent:_parseVal(v.yPercent, m1.yPercent),
					perspective:_parseVal(v.transformPerspective, m1.perspective)};
				dr = v.directionalRotation;
				if (dr != null) {
					if (typeof(dr) === "object") {
						for (copy in dr) {
							v[copy] = dr[copy];
						}
					} else {
						v.rotation = dr;
					}
				}
				if (typeof(v.x) === "string" && v.x.indexOf("%") !== -1) {
					m2.x = 0;
					m2.xPercent = _parseVal(v.x, m1.xPercent);
				}
				if (typeof(v.y) === "string" && v.y.indexOf("%") !== -1) {
					m2.y = 0;
					m2.yPercent = _parseVal(v.y, m1.yPercent);
				}

				m2.rotation = _parseAngle(("rotation" in v) ? v.rotation : ("shortRotation" in v) ? v.shortRotation + "_short" : ("rotationZ" in v) ? v.rotationZ : m1.rotation - m1.skewY, m1.rotation - m1.skewY, "rotation", endRotations); //see notes below about skewY for why we subtract it from rotation here
				if (_supports3D) {
					m2.rotationX = _parseAngle(("rotationX" in v) ? v.rotationX : ("shortRotationX" in v) ? v.shortRotationX + "_short" : m1.rotationX || 0, m1.rotationX, "rotationX", endRotations);
					m2.rotationY = _parseAngle(("rotationY" in v) ? v.rotationY : ("shortRotationY" in v) ? v.shortRotationY + "_short" : m1.rotationY || 0, m1.rotationY, "rotationY", endRotations);
				}
				m2.skewX = _parseAngle(v.skewX, m1.skewX - m1.skewY); //see notes below about skewY and why we subtract it from skewX here

				//note: for performance reasons, we combine all skewing into the skewX and rotation values, ignoring skewY but we must still record it so that we can discern how much of the overall skew is attributed to skewX vs. skewY. Otherwise, if the skewY would always act relative (tween skewY to 10deg, for example, multiple times and if we always combine things into skewX, we can't remember that skewY was 10 from last time). Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of -10 degrees.
				if ((m2.skewY = _parseAngle(v.skewY, m1.skewY))) {
					m2.skewX += m2.skewY;
					m2.rotation += m2.skewY;
				}
			}
			if (_supports3D && v.force3D != null) {
				m1.force3D = v.force3D;
				hasChange = true;
			}

			m1.skewType = v.skewType || m1.skewType || CSSPlugin.defaultSkewType;

			has3D = (m1.force3D || m1.z || m1.rotationX || m1.rotationY || m2.z || m2.rotationX || m2.rotationY || m2.perspective);
			if (!has3D && v.scale != null) {
				m2.scaleZ = 1; //no need to tween scaleZ.
			}

			while (--i > -1) {
				p = _transformProps[i];
				orig = m2[p] - m1[p];
				if (orig > min || orig < -min || v[p] != null || _forcePT[p] != null) {
					hasChange = true;
					pt = new CSSPropTween(m1, p, m1[p], orig, pt);
					if (p in endRotations) {
						pt.e = endRotations[p]; //directional rotations typically have compensated values during the tween, but we need to make sure they end at exactly what the user requested
					}
					pt.xs0 = 0; //ensures the value stays numeric in setRatio()
					pt.plugin = plugin;
					cssp._overwriteProps.push(pt.n);
				}
			}

			orig = v.transformOrigin;
			if (m1.svg && (orig || v.svgOrigin)) {
				x = m1.xOffset; //when we change the origin, in order to prevent things from jumping we adjust the x/y so we must record those here so that we can create PropTweens for them and flip them at the same time as the origin
				y = m1.yOffset;
				_parseSVGOrigin(t, _parsePosition(orig), m2, v.svgOrigin, v.smoothOrigin);
				pt = _addNonTweeningNumericPT(m1, "xOrigin", (originalGSTransform ? m1 : m2).xOrigin, m2.xOrigin, pt, transformOriginString); //note: if there wasn't a transformOrigin defined yet, just start with the destination one; it's wasteful otherwise, and it causes problems with fromTo() tweens. For example, FWDTweenLite.to("#wheel", 3, {rotation:180, transformOrigin:"50% 50%", delay:1}); FWDTweenLite.fromTo("#wheel", 3, {scale:0.5, transformOrigin:"50% 50%"}, {scale:1, delay:2}); would cause a jump when the from values revert at the beginning of the 2nd tween.
				pt = _addNonTweeningNumericPT(m1, "yOrigin", (originalGSTransform ? m1 : m2).yOrigin, m2.yOrigin, pt, transformOriginString);
				if (x !== m1.xOffset || y !== m1.yOffset) {
					pt = _addNonTweeningNumericPT(m1, "xOffset", (originalGSTransform ? x : m1.xOffset), m1.xOffset, pt, transformOriginString);
					pt = _addNonTweeningNumericPT(m1, "yOffset", (originalGSTransform ? y : m1.yOffset), m1.yOffset, pt, transformOriginString);
				}
				orig = _useSVGTransformAttr ? null : "0px 0px"; //certain browsers (like firefox) completely botch transform-origin, so we must remove it to prevent it from contaminating transforms. We manage it ourselves with xOrigin and yOrigin
			}
			if (orig || (_supports3D && has3D && m1.zOrigin)) { //if anything 3D is happening and there's a transformOrigin with a z component that's non-zero, we must ensure that the transformOrigin's z-component is set to 0 so that we can manually do those calculations to get around Safari bugs. Even if the user didn't specifically define a "transformOrigin" in this particular tween (maybe they did it via css directly).
				if (_transformProp) {
					hasChange = true;
					p = _transformOriginProp;
					orig = (orig || _getStyle(t, p, _cs, false, "50% 50%")) + ""; //cast as string to avoid errors
					pt = new CSSPropTween(style, p, 0, 0, pt, -1, transformOriginString);
					pt.b = style[p];
					pt.plugin = plugin;
					if (_supports3D) {
						copy = m1.zOrigin;
						orig = orig.split(" ");
						m1.zOrigin = ((orig.length > 2 && !(copy !== 0 && orig[2] === "0px")) ? parseFloat(orig[2]) : copy) || 0; //Safari doesn't handle the z part of transformOrigin correctly, so we'll manually handle it in the _set3DTransformRatio() method.
						pt.xs0 = pt.e = orig[0] + " " + (orig[1] || "50%") + " 0px"; //we must define a z value of 0px specifically otherwise iOS 5 Safari will stick with the old one (if one was defined)!
						pt = new CSSPropTween(m1, "zOrigin", 0, 0, pt, -1, pt.n); //we must create a CSSPropTween for the _gsTransform.zOrigin so that it gets reset properly at the beginning if the tween runs backward (as opposed to just setting m1.zOrigin here)
						pt.b = copy;
						pt.xs0 = pt.e = m1.zOrigin;
					} else {
						pt.xs0 = pt.e = orig;
					}

					//for older versions of IE (6-8), we need to manually calculate things inside the setRatio() function. We record origin x and y (ox and oy) and whether or not the values are percentages (oxp and oyp).
				} else {
					_parsePosition(orig + "", m1);
				}
			}
			if (hasChange) {
				cssp._transformType = (!(m1.svg && _useSVGTransformAttr) && (has3D || this._transformType === 3)) ? 3 : 2; //quicker than calling cssp._enableTransforms();
			}
			if (swapFunc) {
				vars[parsingProp] = swapFunc;
			}
			return pt;
		}, prefix:true});

		_registerComplexSpecialProp("boxShadow", {defaultValue:"0px 0px 0px 0px #999", prefix:true, color:true, multi:true, keyword:"inset"});

		_registerComplexSpecialProp("borderRadius", {defaultValue:"0px", parser:function(t, e, p, cssp, pt, plugin) {
			e = this.format(e);
			var props = ["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],
				style = t.style,
				ea1, i, es2, bs2, bs, es, bn, en, w, h, esfx, bsfx, rel, hn, vn, em;
			w = parseFloat(t.offsetWidth);
			h = parseFloat(t.offsetHeight);
			ea1 = e.split(" ");
			for (i = 0; i < props.length; i++) { //if we're dealing with percentages, we must convert things separately for the horizontal and vertical axis!
				if (this.p.indexOf("border")) { //older browsers used a prefix
					props[i] = _checkPropPrefix(props[i]);
				}
				bs = bs2 = _getStyle(t, props[i], _cs, false, "0px");
				if (bs.indexOf(" ") !== -1) {
					bs2 = bs.split(" ");
					bs = bs2[0];
					bs2 = bs2[1];
				}
				es = es2 = ea1[i];
				bn = parseFloat(bs);
				bsfx = bs.substr((bn + "").length);
				rel = (es.charAt(1) === "=");
				if (rel) {
					en = parseInt(es.charAt(0)+"1", 10);
					es = es.substr(2);
					en *= parseFloat(es);
					esfx = es.substr((en + "").length - (en < 0 ? 1 : 0)) || "";
				} else {
					en = parseFloat(es);
					esfx = es.substr((en + "").length);
				}
				if (esfx === "") {
					esfx = _suffixMap[p] || bsfx;
				}
				if (esfx !== bsfx) {
					hn = _convertToPixels(t, "borderLeft", bn, bsfx); //horizontal number (we use a bogus "borderLeft" property just because the _convertToPixels() method searches for the keywords "Left", "Right", "Top", and "Bottom" to determine of it's a horizontal or vertical property, and we need "border" in the name so that it knows it should measure relative to the element itself, not its parent.
					vn = _convertToPixels(t, "borderTop", bn, bsfx); //vertical number
					if (esfx === "%") {
						bs = (hn / w * 100) + "%";
						bs2 = (vn / h * 100) + "%";
					} else if (esfx === "em") {
						em = _convertToPixels(t, "borderLeft", 1, "em");
						bs = (hn / em) + "em";
						bs2 = (vn / em) + "em";
					} else {
						bs = hn + "px";
						bs2 = vn + "px";
					}
					if (rel) {
						es = (parseFloat(bs) + en) + esfx;
						es2 = (parseFloat(bs2) + en) + esfx;
					}
				}
				pt = _parseComplex(style, props[i], bs + " " + bs2, es + " " + es2, false, "0px", pt);
			}
			return pt;
		}, prefix:true, formatter:_getFormatter("0px 0px 0px 0px", false, true)});
		_registerComplexSpecialProp("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {defaultValue:"0px", parser:function(t, e, p, cssp, pt, plugin) {
			return _parseComplex(t.style, p, this.format(_getStyle(t, p, _cs, false, "0px 0px")), this.format(e), false, "0px", pt);
		}, prefix:true, formatter:_getFormatter("0px 0px", false, true)});
		_registerComplexSpecialProp("backgroundPosition", {defaultValue:"0 0", parser:function(t, e, p, cssp, pt, plugin) {
			var bp = "background-position",
				cs = (_cs || _getComputedStyle(t, null)),
				bs = this.format( ((cs) ? _ieVers ? cs.getPropertyValue(bp + "-x") + " " + cs.getPropertyValue(bp + "-y") : cs.getPropertyValue(bp) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"), //Internet Explorer doesn't report background-position correctly - we must query background-position-x and background-position-y and combine them (even in IE10). Before IE9, we must do the same with the currentStyle object and use camelCase
				es = this.format(e),
				ba, ea, i, pct, overlap, src;
			if ((bs.indexOf("%") !== -1) !== (es.indexOf("%") !== -1) && es.split(",").length < 2) {
				src = _getStyle(t, "backgroundImage").replace(_urlExp, "");
				if (src && src !== "none") {
					ba = bs.split(" ");
					ea = es.split(" ");
					_tempImg.setAttribute("src", src); //set the temp IMG's src to the background-image so that we can measure its width/height
					i = 2;
					while (--i > -1) {
						bs = ba[i];
						pct = (bs.indexOf("%") !== -1);
						if (pct !== (ea[i].indexOf("%") !== -1)) {
							overlap = (i === 0) ? t.offsetWidth - _tempImg.width : t.offsetHeight - _tempImg.height;
							ba[i] = pct ? (parseFloat(bs) / 100 * overlap) + "px" : (parseFloat(bs) / overlap * 100) + "%";
						}
					}
					bs = ba.join(" ");
				}
			}
			return this.parseComplex(t.style, bs, es, pt, plugin);
		}, formatter:_parsePosition});
		_registerComplexSpecialProp("backgroundSize", {defaultValue:"0 0", formatter:function(v) {
			v += ""; //ensure it's a string
			return _parsePosition(v.indexOf(" ") === -1 ? v + " " + v : v); //if set to something like "100% 100%", Safari typically reports the computed style as just "100%" (no 2nd value), but we should ensure that there are two values, so copy the first one. Otherwise, it'd be interpreted as "100% 0" (wrong).
		}});
		_registerComplexSpecialProp("perspective", {defaultValue:"0px", prefix:true});
		_registerComplexSpecialProp("perspectiveOrigin", {defaultValue:"50% 50%", prefix:true});
		_registerComplexSpecialProp("transformStyle", {prefix:true});
		_registerComplexSpecialProp("backfaceVisibility", {prefix:true});
		_registerComplexSpecialProp("userSelect", {prefix:true});
		_registerComplexSpecialProp("margin", {parser:_getEdgeParser("marginTop,marginRight,marginBottom,marginLeft")});
		_registerComplexSpecialProp("padding", {parser:_getEdgeParser("paddingTop,paddingRight,paddingBottom,paddingLeft")});
		_registerComplexSpecialProp("clip", {defaultValue:"rect(0px,0px,0px,0px)", parser:function(t, e, p, cssp, pt, plugin){
			var b, cs, delim;
			if (_ieVers < 9) { //IE8 and earlier don't report a "clip" value in the currentStyle - instead, the values are split apart into clipTop, clipRight, clipBottom, and clipLeft. Also, in IE7 and earlier, the values inside rect() are space-delimited, not comma-delimited.
				cs = t.currentStyle;
				delim = _ieVers < 8 ? " " : ",";
				b = "rect(" + cs.clipTop + delim + cs.clipRight + delim + cs.clipBottom + delim + cs.clipLeft + ")";
				e = this.format(e).split(",").join(delim);
			} else {
				b = this.format(_getStyle(t, this.p, _cs, false, this.dflt));
				e = this.format(e);
			}
			return this.parseComplex(t.style, b, e, pt, plugin);
		}});
		_registerComplexSpecialProp("textShadow", {defaultValue:"0px 0px 0px #999", color:true, multi:true});
		_registerComplexSpecialProp("autoRound,strictUnits", {parser:function(t, e, p, cssp, pt) {return pt;}}); //just so that we can ignore these properties (not tween them)
		_registerComplexSpecialProp("border", {defaultValue:"0px solid #000", parser:function(t, e, p, cssp, pt, plugin) {
			var bw = _getStyle(t, "borderTopWidth", _cs, false, "0px"),
				end = this.format(e).split(" "),
				esfx = end[0].replace(_suffixExp, "");
			if (esfx !== "px") { //if we're animating to a non-px value, we need to convert the beginning width to that unit.
				bw = (parseFloat(bw) / _convertToPixels(t, "borderTopWidth", 1, esfx)) + esfx;
			}
			return this.parseComplex(t.style, this.format(bw + " " + _getStyle(t, "borderTopStyle", _cs, false, "solid") + " " + _getStyle(t, "borderTopColor", _cs, false, "#000")), end.join(" "), pt, plugin);
			}, color:true, formatter:function(v) {
				var a = v.split(" ");
				return a[0] + " " + (a[1] || "solid") + " " + (v.match(_colorExp) || ["#000"])[0];
			}});
		_registerComplexSpecialProp("borderWidth", {parser:_getEdgeParser("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}); //Firefox doesn't pick up on borderWidth set in style sheets (only inline).
		_registerComplexSpecialProp("float,cssFloat,styleFloat", {parser:function(t, e, p, cssp, pt, plugin) {
			var s = t.style,
				prop = ("cssFloat" in s) ? "cssFloat" : "styleFloat";
			return new CSSPropTween(s, prop, 0, 0, pt, -1, p, false, 0, s[prop], e);
		}});

		//opacity-related
		var _setIEOpacityRatio = function(v) {
				var t = this.t, //refers to the element's style property
					filters = t.filter || _getStyle(this.data, "filter") || "",
					val = (this.s + this.c * v) | 0,
					skip;
				if (val === 100) { //for older versions of IE that need to use a filter to apply opacity, we should remove the filter if opacity hits 1 in order to improve performance, but make sure there isn't a transform (matrix) or gradient in the filters.
					if (filters.indexOf("atrix(") === -1 && filters.indexOf("radient(") === -1 && filters.indexOf("oader(") === -1) {
						t.removeAttribute("filter");
						skip = (!_getStyle(this.data, "filter")); //if a class is applied that has an alpha filter, it will take effect (we don't want that), so re-apply our alpha filter in that case. We must first remove it and then check.
					} else {
						t.filter = filters.replace(_alphaFilterExp, "");
						skip = true;
					}
				}
				if (!skip) {
					if (this.xn1) {
						t.filter = filters = filters || ("alpha(opacity=" + val + ")"); //works around bug in IE7/8 that prevents changes to "visibility" from being applied properly if the filter is changed to a different alpha on the same frame.
					}
					if (filters.indexOf("pacity") === -1) { //only used if browser doesn't support the standard opacity style property (IE 7 and 8). We omit the "O" to avoid case-sensitivity issues
						if (val !== 0 || !this.xn1) { //bugs in IE7/8 won't render the filter properly if opacity is ADDED on the same frame/render as "visibility" changes (this.xn1 is 1 if this tween is an "autoAlpha" tween)
							t.filter = filters + " alpha(opacity=" + val + ")"; //we round the value because otherwise, bugs in IE7/8 can prevent "visibility" changes from being applied properly.
						}
					} else {
						t.filter = filters.replace(_opacityExp, "opacity=" + val);
					}
				}
			};
		_registerComplexSpecialProp("opacity,alpha,autoAlpha", {defaultValue:"1", parser:function(t, e, p, cssp, pt, plugin) {
			var b = parseFloat(_getStyle(t, "opacity", _cs, false, "1")),
				style = t.style,
				isAutoAlpha = (p === "autoAlpha");
			if (typeof(e) === "string" && e.charAt(1) === "=") {
				e = ((e.charAt(0) === "-") ? -1 : 1) * parseFloat(e.substr(2)) + b;
			}
			if (isAutoAlpha && b === 1 && _getStyle(t, "visibility", _cs) === "hidden" && e !== 0) { //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
				b = 0;
			}
			if (_supportsOpacity) {
				pt = new CSSPropTween(style, "opacity", b, e - b, pt);
			} else {
				pt = new CSSPropTween(style, "opacity", b * 100, (e - b) * 100, pt);
				pt.xn1 = isAutoAlpha ? 1 : 0; //we need to record whether or not this is an autoAlpha so that in the setRatio(), we know to duplicate the setting of the alpha in order to work around a bug in IE7 and IE8 that prevents changes to "visibility" from taking effect if the filter is changed to a different alpha(opacity) at the same time. Setting it to the SAME value first, then the new value works around the IE7/8 bug.
				style.zoom = 1; //helps correct an IE issue.
				pt.type = 2;
				pt.b = "alpha(opacity=" + pt.s + ")";
				pt.e = "alpha(opacity=" + (pt.s + pt.c) + ")";
				pt.data = t;
				pt.plugin = plugin;
				pt.setRatio = _setIEOpacityRatio;
			}
			if (isAutoAlpha) { //we have to create the "visibility" PropTween after the opacity one in the linked list so that they run in the order that works properly in IE8 and earlier
				pt = new CSSPropTween(style, "visibility", 0, 0, pt, -1, null, false, 0, ((b !== 0) ? "inherit" : "hidden"), ((e === 0) ? "hidden" : "inherit"));
				pt.xs0 = "inherit";
				cssp._overwriteProps.push(pt.n);
				cssp._overwriteProps.push(p);
			}
			return pt;
		}});


		var _removeProp = function(s, p) {
				if (p) {
					if (s.removeProperty) {
						if (p.substr(0,2) === "ms" || p.substr(0,6) === "webkit") { //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
							p = "-" + p;
						}
						s.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
					} else { //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
						s.removeAttribute(p);
					}
				}
			},
			_setClassNameRatio = function(v) {
				this.t._gsClassPT = this;
				if (v === 1 || v === 0) {
					this.t.setAttribute("class", (v === 0) ? this.b : this.e);
					var mpt = this.data, //first MiniPropTween
						s = this.t.style;
					while (mpt) {
						if (!mpt.v) {
							_removeProp(s, mpt.p);
						} else {
							s[mpt.p] = mpt.v;
						}
						mpt = mpt._next;
					}
					if (v === 1 && this.t._gsClassPT === this) {
						this.t._gsClassPT = null;
					}
				} else if (this.t.getAttribute("class") !== this.e) {
					this.t.setAttribute("class", this.e);
				}
			};
		_registerComplexSpecialProp("className", {parser:function(t, e, p, cssp, pt, plugin, vars) {
			var b = t.getAttribute("class") || "", //don't use t.className because it doesn't work consistently on SVG elements; getAttribute("class") and setAttribute("class", value") is more reliable.
				cssText = t.style.cssText,
				difData, bs, cnpt, cnptLookup, mpt;
			pt = cssp._classNamePT = new CSSPropTween(t, p, 0, 0, pt, 2);
			pt.setRatio = _setClassNameRatio;
			pt.pr = -11;
			_hasPriority = true;
			pt.b = b;
			bs = _getAllStyles(t, _cs);
			//if there's a className tween already operating on the target, force it to its end so that the necessary inline styles are removed and the class name is applied before we determine the end state (we don't want inline styles interfering that were there just for class-specific values)
			cnpt = t._gsClassPT;
			if (cnpt) {
				cnptLookup = {};
				mpt = cnpt.data; //first MiniPropTween which stores the inline styles - we need to force these so that the inline styles don't contaminate things. Otherwise, there's a small chance that a tween could start and the inline values match the destination values and they never get cleaned.
				while (mpt) {
					cnptLookup[mpt.p] = 1;
					mpt = mpt._next;
				}
				cnpt.setRatio(1);
			}
			t._gsClassPT = pt;
			pt.e = (e.charAt(1) !== "=") ? e : b.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + ((e.charAt(0) === "+") ? " " + e.substr(2) : "");
			t.setAttribute("class", pt.e);
			difData = _cssDif(t, bs, _getAllStyles(t), vars, cnptLookup);
			t.setAttribute("class", b);
			pt.data = difData.firstMPT;
			t.style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
			pt = pt.xfirst = cssp.parse(t, difData.difs, pt, plugin); //we record the CSSPropTween as the xfirst so that we can handle overwriting propertly (if "className" gets overwritten, we must kill all the properties associated with the className part of the tween, so we can loop through from xfirst to the pt itself)
			return pt;
		}});


		var _setClearPropsRatio = function(v) {
			if (v === 1 || v === 0) if (this.data._totalTime === this.data._totalDuration && this.data.data !== "isFromStart") { //this.data refers to the tween. Only clear at the END of the tween (remember, from() tweens make the ratio go from 1 to 0, so we can't just check that and if the tween is the zero-duration one that's created internally to render the starting values in a from() tween, ignore that because otherwise, for example, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in).
				var s = this.t.style,
					transformParse = _specialProps.transform.parse,
					a, p, i, clearTransform, transform;
				if (this.e === "all") {
					s.cssText = "";
					clearTransform = true;
				} else {
					a = this.e.split(" ").join("").split(",");
					i = a.length;
					while (--i > -1) {
						p = a[i];
						if (_specialProps[p]) {
							if (_specialProps[p].parse === transformParse) {
								clearTransform = true;
							} else {
								p = (p === "transformOrigin") ? _transformOriginProp : _specialProps[p].p; //ensures that special properties use the proper browser-specific property name, like "scaleX" might be "-webkit-transform" or "boxShadow" might be "-moz-box-shadow"
							}
						}
						_removeProp(s, p);
					}
				}
				if (clearTransform) {
					_removeProp(s, _transformProp);
					transform = this.t._gsTransform;
					if (transform) {
						if (transform.svg) {
							this.t.removeAttribute("data-svg-origin");
							this.t.removeAttribute("transform");
						}
						delete this.t._gsTransform;
					}
				}

			}
		};
		_registerComplexSpecialProp("clearProps", {parser:function(t, e, p, cssp, pt) {
			pt = new CSSPropTween(t, p, 0, 0, pt, 2);
			pt.setRatio = _setClearPropsRatio;
			pt.e = e;
			pt.pr = -10;
			pt.data = cssp._tween;
			_hasPriority = true;
			return pt;
		}});

		p = "bezier,throwProps,physicsProps,physics2D".split(",");
		i = p.length;
		while (i--) {
			_registerPluginProp(p[i]);
		}








		p = CSSPlugin.prototype;
		p._firstPT = p._lastParsedTransform = p._transform = null;

		//gets called when the tween renders for the first time. This kicks everything off, recording start/end values, etc.
		p._onInitTween = function(target, vars, tween, index) {
			if (!target.nodeType) { //css is only for dom elements
				return false;
			}
			this._target = _target = target;
			this._tween = tween;
			this._vars = vars;
			_index = index;
			_autoRound = vars.autoRound;
			_hasPriority = false;
			_suffixMap = vars.suffixMap || CSSPlugin.suffixMap;
			_cs = _getComputedStyle(target, "");
			_overwriteProps = this._overwriteProps;
			var style = target.style,
				v, pt, pt2, first, last, next, zIndex, tpt, threeD;
			if (_reqSafariFix) if (style.zIndex === "") {
				v = _getStyle(target, "zIndex", _cs);
				if (v === "auto" || v === "") {
					//corrects a bug in [non-Android] Safari that prevents it from repainting elements in their new positions if they don't have a zIndex set. We also can't just apply this inside _parseTransform() because anything that's moved in any way (like using "left" or "top" instead of transforms like "x" and "y") can be affected, so it is best to ensure that anything that's tweening has a z-index. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly. Plus zIndex is less memory-intensive.
					this._addLazySet(style, "zIndex", 0);
				}
			}

			if (typeof(vars) === "string") {
				first = style.cssText;
				v = _getAllStyles(target, _cs);
				style.cssText = first + ";" + vars;
				v = _cssDif(target, v, _getAllStyles(target)).difs;
				if (!_supportsOpacity && _opacityValExp.test(vars)) {
					v.opacity = parseFloat( RegExp.$1 );
				}
				vars = v;
				style.cssText = first;
			}

			if (vars.className) { //className tweens will combine any differences they find in the css with the vars that are passed in, so {className:"myClass", scale:0.5, left:20} would work.
				this._firstPT = pt = _specialProps.className.parse(target, vars.className, "className", this, null, null, vars);
			} else {
				this._firstPT = pt = this.parse(target, vars, null);
			}

			if (this._transformType) {
				threeD = (this._transformType === 3);
				if (!_transformProp) {
					style.zoom = 1; //helps correct an IE issue.
				} else if (_isSafari) {
					_reqSafariFix = true;
					//if zIndex isn't set, iOS Safari doesn't repaint things correctly sometimes (seemingly at random).
					if (style.zIndex === "") {
						zIndex = _getStyle(target, "zIndex", _cs);
						if (zIndex === "auto" || zIndex === "") {
							this._addLazySet(style, "zIndex", 0);
						}
					}
					//Setting WebkitBackfaceVisibility corrects 3 bugs:
					// 1) [non-Android] Safari skips rendering changes to "top" and "left" that are made on the same frame/render as a transform update.
					// 2) iOS Safari sometimes neglects to repaint elements in their new positions. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly.
					// 3) Safari sometimes displayed odd artifacts when tweening the transform (or WebkitTransform) property, like ghosts of the edges of the element remained. Definitely a browser bug.
					//Note: we allow the user to override the auto-setting by defining WebkitBackfaceVisibility in the vars of the tween.
					if (_isSafariLT6) {
						this._addLazySet(style, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (threeD ? "visible" : "hidden"));
					}
				}
				pt2 = pt;
				while (pt2 && pt2._next) {
					pt2 = pt2._next;
				}
				tpt = new CSSPropTween(target, "transform", 0, 0, null, 2);
				this._linkCSSP(tpt, null, pt2);
				tpt.setRatio = _transformProp ? _setTransformRatio : _setIETransformRatio;
				tpt.data = this._transform || _getTransform(target, _cs, true);
				tpt.tween = tween;
				tpt.pr = -1; //ensures that the transforms get applied after the components are updated.
				_overwriteProps.pop(); //we don't want to force the overwrite of all "transform" tweens of the target - we only care about individual transform properties like scaleX, rotation, etc. The CSSPropTween constructor automatically adds the property to _overwriteProps which is why we need to pop() here.
			}

			if (_hasPriority) {
				//reorders the linked list in order of pr (priority)
				while (pt) {
					next = pt._next;
					pt2 = first;
					while (pt2 && pt2.pr > pt.pr) {
						pt2 = pt2._next;
					}
					if ((pt._prev = pt2 ? pt2._prev : last)) {
						pt._prev._next = pt;
					} else {
						first = pt;
					}
					if ((pt._next = pt2)) {
						pt2._prev = pt;
					} else {
						last = pt;
					}
					pt = next;
				}
				this._firstPT = first;
			}
			return true;
		};


		p.parse = function(target, vars, pt, plugin) {
			var style = target.style,
				p, sp, bn, en, bs, es, bsfx, esfx, isStr, rel;
			for (p in vars) {
				es = vars[p]; //ending value string
				if (typeof(es) === "function") {
					es = es(_index, _target);
				}
				sp = _specialProps[p]; //SpecialProp lookup.
				if (sp) {
					pt = sp.parse(target, es, p, this, pt, plugin, vars);

				} else {
					bs = _getStyle(target, p, _cs) + "";
					isStr = (typeof(es) === "string");
					if (p === "color" || p === "fill" || p === "stroke" || p.indexOf("Color") !== -1 || (isStr && _rgbhslExp.test(es))) { //Opera uses background: to define color sometimes in addition to backgroundColor:
						if (!isStr) {
							es = _parseColor(es);
							es = ((es.length > 3) ? "rgba(" : "rgb(") + es.join(",") + ")";
						}
						pt = _parseComplex(style, p, bs, es, true, "transparent", pt, 0, plugin);

					} else if (isStr && _complexExp.test(es)) {
						pt = _parseComplex(style, p, bs, es, true, null, pt, 0, plugin);

					} else {
						bn = parseFloat(bs);
						bsfx = (bn || bn === 0) ? bs.substr((bn + "").length) : ""; //remember, bs could be non-numeric like "normal" for fontWeight, so we should default to a blank suffix in that case.

						if (bs === "" || bs === "auto") {
							if (p === "width" || p === "height") {
								bn = _getDimension(target, p, _cs);
								bsfx = "px";
							} else if (p === "left" || p === "top") {
								bn = _calculateOffset(target, p, _cs);
								bsfx = "px";
							} else {
								bn = (p !== "opacity") ? 0 : 1;
								bsfx = "";
							}
						}

						rel = (isStr && es.charAt(1) === "=");
						if (rel) {
							en = parseInt(es.charAt(0) + "1", 10);
							es = es.substr(2);
							en *= parseFloat(es);
							esfx = es.replace(_suffixExp, "");
						} else {
							en = parseFloat(es);
							esfx = isStr ? es.replace(_suffixExp, "") : "";
						}

						if (esfx === "") {
							esfx = (p in _suffixMap) ? _suffixMap[p] : bsfx; //populate the end suffix, prioritizing the map, then if none is found, use the beginning suffix.
						}

						es = (en || en === 0) ? (rel ? en + bn : en) + esfx : vars[p]; //ensures that any += or -= prefixes are taken care of. Record the end value before normalizing the suffix because we always want to end the tween on exactly what they intended even if it doesn't match the beginning value's suffix.

						//if the beginning/ending suffixes don't match, normalize them...
						if (bsfx !== esfx) if (esfx !== "") if (en || en === 0) if (bn) { //note: if the beginning value (bn) is 0, we don't need to convert units!
							bn = _convertToPixels(target, p, bn, bsfx);
							if (esfx === "%") {
								bn /= _convertToPixels(target, p, 100, "%") / 100;
								if (vars.strictUnits !== true) { //some browsers report only "px" values instead of allowing "%" with getComputedStyle(), so we assume that if we're tweening to a %, we should start there too unless strictUnits:true is defined. This approach is particularly useful for responsive designs that use from() tweens.
									bs = bn + "%";
								}

							} else if (esfx === "em" || esfx === "rem" || esfx === "vw" || esfx === "vh") {
								bn /= _convertToPixels(target, p, 1, esfx);

							//otherwise convert to pixels.
							} else if (esfx !== "px") {
								en = _convertToPixels(target, p, en, esfx);
								esfx = "px"; //we don't use bsfx after this, so we don't need to set it to px too.
							}
							if (rel) if (en || en === 0) {
								es = (en + bn) + esfx; //the changes we made affect relative calculations, so adjust the end value here.
							}
						}

						if (rel) {
							en += bn;
						}

						if ((bn || bn === 0) && (en || en === 0)) { //faster than isNaN(). Also, previously we required en !== bn but that doesn't really gain much performance and it prevents _parseToProxy() from working properly if beginning and ending values match but need to get tweened by an external plugin anyway. For example, a bezier tween where the target starts at left:0 and has these points: [{left:50},{left:0}] wouldn't work properly because when parsing the last point, it'd match the first (current) one and a non-tweening CSSPropTween would be recorded when we actually need a normal tween (type:0) so that things get updated during the tween properly.
							pt = new CSSPropTween(style, p, bn, en - bn, pt, 0, p, (_autoRound !== false && (esfx === "px" || p === "zIndex")), 0, bs, es);
							pt.xs0 = esfx;
							//DEBUG: _log("tween "+p+" from "+pt.b+" ("+bn+esfx+") to "+pt.e+" with suffix: "+pt.xs0);
						} else if (style[p] === undefined || !es && (es + "" === "NaN" || es == null)) {
							_log("invalid " + p + " tween value: " + vars[p]);
						} else {
							pt = new CSSPropTween(style, p, en || bn || 0, 0, pt, -1, p, false, 0, bs, es);
							pt.xs0 = (es === "none" && (p === "display" || p.indexOf("Style") !== -1)) ? bs : es; //intermediate value should typically be set immediately (end value) except for "display" or things like borderTopStyle, borderBottomStyle, etc. which should use the beginning value during the tween.
							//DEBUG: _log("non-tweening value "+p+": "+pt.xs0);
						}
					}
				}
				if (plugin) if (pt && !pt.plugin) {
					pt.plugin = plugin;
				}
			}
			return pt;
		};


		//gets called every time the tween updates, passing the new ratio (typically a value between 0 and 1, but not always (for example, if an Elastic.easeOut is used, the value can jump above 1 mid-tween). It will always start and 0 and end at 1.
		p.setRatio = function(v) {
			var pt = this._firstPT,
				min = 0.000001,
				val, str, i;
			//at the end of the tween, we set the values to exactly what we received in order to make sure non-tweening values (like "position" or "float" or whatever) are set and so that if the beginning/ending suffixes (units) didn't match and we normalized to px, the value that the user passed in is used here. We check to see if the tween is at its beginning in case it's a from() tween in which case the ratio will actually go from 1 to 0 over the course of the tween (backwards).
			if (v === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
				while (pt) {
					if (pt.type !== 2) {
						if (pt.r && pt.type !== -1) {
							val = Math.round(pt.s + pt.c);
							if (!pt.type) {
								pt.t[pt.p] = val + pt.xs0;
							} else if (pt.type === 1) { //complex value (one that typically has multiple numbers inside a string, like "rect(5px,10px,20px,25px)"
								i = pt.l;
								str = pt.xs0 + val + pt.xs1;
								for (i = 1; i < pt.l; i++) {
									str += pt["xn"+i] + pt["xs"+(i+1)];
								}
								pt.t[pt.p] = str;
							}
						} else {
							pt.t[pt.p] = pt.e;
						}
					} else {
						pt.setRatio(v);
					}
					pt = pt._next;
				}

			} else if (v || !(this._tween._time === this._tween._duration || this._tween._time === 0) || this._tween._rawPrevTime === -0.000001) {
				while (pt) {
					val = pt.c * v + pt.s;
					if (pt.r) {
						val = Math.round(val);
					} else if (val < min) if (val > -min) {
						val = 0;
					}
					if (!pt.type) {
						pt.t[pt.p] = val + pt.xs0;
					} else if (pt.type === 1) { //complex value (one that typically has multiple numbers inside a string, like "rect(5px,10px,20px,25px)"
						i = pt.l;
						if (i === 2) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2;
						} else if (i === 3) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3;
						} else if (i === 4) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4;
						} else if (i === 5) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4 + pt.xn4 + pt.xs5;
						} else {
							str = pt.xs0 + val + pt.xs1;
							for (i = 1; i < pt.l; i++) {
								str += pt["xn"+i] + pt["xs"+(i+1)];
							}
							pt.t[pt.p] = str;
						}

					} else if (pt.type === -1) { //non-tweening value
						pt.t[pt.p] = pt.xs0;

					} else if (pt.setRatio) { //custom setRatio() for things like SpecialProps, external plugins, etc.
						pt.setRatio(v);
					}
					pt = pt._next;
				}

			//if the tween is reversed all the way back to the beginning, we need to restore the original values which may have different units (like % instead of px or em or whatever).
			} else {
				while (pt) {
					if (pt.type !== 2) {
						pt.t[pt.p] = pt.b;
					} else {
						pt.setRatio(v);
					}
					pt = pt._next;
				}
			}
		};

		/**
		 * @private
		 * Forces rendering of the target's transforms (rotation, scale, etc.) whenever the CSSPlugin's setRatio() is called.
		 * Basically, this tells the CSSPlugin to create a CSSPropTween (type 2) after instantiation that runs last in the linked
		 * list and calls the appropriate (3D or 2D) rendering function. We separate this into its own method so that we can call
		 * it from other plugins like BezierPlugin if, for example, it needs to apply an autoRotation and this CSSPlugin
		 * doesn't have any transform-related properties of its own. You can call this method as many times as you
		 * want and it won't create duplicate CSSPropTweens.
		 *
		 * @param {boolean} threeD if true, it should apply 3D tweens (otherwise, just 2D ones are fine and typically faster)
		 */
		p._enableTransforms = function(threeD) {
			this._transform = this._transform || _getTransform(this._target, _cs, true); //ensures that the element has a _gsTransform property with the appropriate values.
			this._transformType = (!(this._transform.svg && _useSVGTransformAttr) && (threeD || this._transformType === 3)) ? 3 : 2;
		};

		var lazySet = function(v) {
			this.t[this.p] = this.e;
			this.data._linkCSSP(this, this._next, null, true); //we purposefully keep this._next even though it'd make sense to null it, but this is a performance optimization, as this happens during the while (pt) {} loop in setRatio() at the bottom of which it sets pt = pt._next, so if we null it, the linked list will be broken in that loop.
		};
		/** @private Gives us a way to set a value on the first render (and only the first render). **/
		p._addLazySet = function(t, p, v) {
			var pt = this._firstPT = new CSSPropTween(t, p, 0, 0, this._firstPT, 2);
			pt.e = v;
			pt.setRatio = lazySet;
			pt.data = this;
		};

		/** @private **/
		p._linkCSSP = function(pt, next, prev, remove) {
			if (pt) {
				if (next) {
					next._prev = pt;
				}
				if (pt._next) {
					pt._next._prev = pt._prev;
				}
				if (pt._prev) {
					pt._prev._next = pt._next;
				} else if (this._firstPT === pt) {
					this._firstPT = pt._next;
					remove = true; //just to prevent resetting this._firstPT 5 lines down in case pt._next is null. (optimized for speed)
				}
				if (prev) {
					prev._next = pt;
				} else if (!remove && this._firstPT === null) {
					this._firstPT = pt;
				}
				pt._next = next;
				pt._prev = prev;
			}
			return pt;
		};

		p._mod = function(lookup) {
			var pt = this._firstPT;
			while (pt) {
				if (typeof(lookup[pt.p]) === "function" && lookup[pt.p] === Math.round) { //only gets called by RoundPropsPlugin (ModifyPlugin manages all the rendering internally for CSSPlugin properties that need modification). Remember, we handle rounding a bit differently in this plugin for performance reasons, leveraging "r" as an indicator that the value should be rounded internally..
					pt.r = 1;
				}
				pt = pt._next;
			}
		};

		//we need to make sure that if alpha or autoAlpha is killed, opacity is too. And autoAlpha affects the "visibility" property.
		p._kill = function(lookup) {
			var copy = lookup,
				pt, p, xfirst;
			if (lookup.autoAlpha || lookup.alpha) {
				copy = {};
				for (p in lookup) { //copy the lookup so that we're not changing the original which may be passed elsewhere.
					copy[p] = lookup[p];
				}
				copy.opacity = 1;
				if (copy.autoAlpha) {
					copy.visibility = 1;
				}
			}
			if (lookup.className && (pt = this._classNamePT)) { //for className tweens, we need to kill any associated CSSPropTweens too; a linked list starts at the className's "xfirst".
				xfirst = pt.xfirst;
				if (xfirst && xfirst._prev) {
					this._linkCSSP(xfirst._prev, pt._next, xfirst._prev._prev); //break off the prev
				} else if (xfirst === this._firstPT) {
					this._firstPT = pt._next;
				}
				if (pt._next) {
					this._linkCSSP(pt._next, pt._next._next, xfirst._prev);
				}
				this._classNamePT = null;
			}
			pt = this._firstPT;
			while (pt) {
				if (pt.plugin && pt.plugin !== p && pt.plugin._kill) { //for plugins that are registered with CSSPlugin, we should notify them of the kill.
					pt.plugin._kill(lookup);
					p = pt.plugin;
				}
				pt = pt._next;
			}
			return TweenPlugin.prototype._kill.call(this, copy);
		};



		//used by cascadeTo() for gathering all the style properties of each child element into an array for comparison.
		var _getChildStyles = function(e, props, targets) {
				var children, i, child, type;
				if (e.slice) {
					i = e.length;
					while (--i > -1) {
						_getChildStyles(e[i], props, targets);
					}
					return;
				}
				children = e.childNodes;
				i = children.length;
				while (--i > -1) {
					child = children[i];
					type = child.type;
					if (child.style) {
						props.push(_getAllStyles(child));
						if (targets) {
							targets.push(child);
						}
					}
					if ((type === 1 || type === 9 || type === 11) && child.childNodes.length) {
						_getChildStyles(child, props, targets);
					}
				}
			};

		/**
		 * Typically only useful for className tweens that may affect child elements, this method creates a FWDTweenLite
		 * and then compares the style properties of all the target's child elements at the tween's start and end, and
		 * if any are different, it also creates tweens for those and returns an array containing ALL of the resulting
		 * tweens (so that you can easily add() them to a FWDTimelineLite, for example). The reason this functionality is
		 * wrapped into a separate static method of CSSPlugin instead of being integrated into all regular className tweens
		 * is because it creates entirely new tweens that may have completely different targets than the original tween,
		 * so if they were all lumped into the original tween instance, it would be inconsistent with the rest of the API
		 * and it would create other problems. For example:
		 *  - If I create a tween of elementA, that tween instance may suddenly change its target to include 50 other elements (unintuitive if I specifically defined the target I wanted)
		 *  - We can't just create new independent tweens because otherwise, what happens if the original/parent tween is reversed or pause or dropped into a FWDTimelineLite for tight control? You'd expect that tween's behavior to affect all the others.
		 *  - Analyzing every style property of every child before and after the tween is an expensive operation when there are many children, so this behavior shouldn't be imposed on all className tweens by default, especially since it's probably rare that this extra functionality is needed.
		 *
		 * @param {Object} target object to be tweened
		 * @param {number} Duration in seconds (or frames for frames-based tweens)
		 * @param {Object} Object containing the end values, like {className:"newClass", ease:Linear.easeNone}
		 * @return {Array} An array of FWDTweenLite instances
		 */
		CSSPlugin.cascadeTo = function(target, duration, vars) {
			var tween = FWDTweenLite.to(target, duration, vars),
				results = [tween],
				b = [],
				e = [],
				targets = [],
				_reservedProps = FWDTweenLite._internals.reservedProps,
				i, difs, p, from;
			target = tween._targets || tween.target;
			_getChildStyles(target, b, targets);
			tween.render(duration, true, true);
			_getChildStyles(target, e);
			tween.render(0, true, true);
			tween._enabled(true);
			i = targets.length;
			while (--i > -1) {
				difs = _cssDif(targets[i], b[i], e[i]);
				if (difs.firstMPT) {
					difs = difs.difs;
					for (p in vars) {
						if (_reservedProps[p]) {
							difs[p] = vars[p];
						}
					}
					from = {};
					for (p in difs) {
						from[p] = b[i][p];
					}
					results.push(FWDTweenLite.fromTo(targets[i], duration, from, difs));
				}
			}
			return results;
		};

		TweenPlugin.activate([CSSPlugin]);
		return CSSPlugin;

	}, true);

	
	
	
	
	
	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * RoundPropsPlugin
 * ----------------------------------------------------------------
 */
	(function() {

		var RoundPropsPlugin = _fwd_gsScope.FWDFWD_gsDefine.plugin({
				propName: "roundProps",
				version: "1.6.0",
				priority: -1,
				API: 2,

				//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
				init: function(target, value, tween) {
					this._tween = tween;
					return true;
				}

			}),
			_roundLinkedList = function(node) {
				while (node) {
					if (!node.f && !node.blob) {
						node.m = Math.round;
					}
					node = node._next;
				}
			},
			p = RoundPropsPlugin.prototype;

		p._onInitAllProps = function() {
			var tween = this._tween,
				rp = (tween.vars.roundProps.join) ? tween.vars.roundProps : tween.vars.roundProps.split(","),
				i = rp.length,
				lookup = {},
				rpt = tween._propLookup.roundProps,
				prop, pt, next;
			while (--i > -1) {
				lookup[rp[i]] = Math.round;
			}
			i = rp.length;
			while (--i > -1) {
				prop = rp[i];
				pt = tween._firstPT;
				while (pt) {
					next = pt._next; //record here, because it may get removed
					if (pt.pg) {
						pt.t._mod(lookup);
					} else if (pt.n === prop) {
						if (pt.f === 2 && pt.t) { //a blob (text containing multiple numeric values)
							_roundLinkedList(pt.t._firstPT);
						} else {
							this._add(pt.t, prop, pt.s, pt.c);
							//remove from linked list
							if (next) {
								next._prev = pt._prev;
							}
							if (pt._prev) {
								pt._prev._next = next;
							} else if (tween._firstPT === pt) {
								tween._firstPT = next;
							}
							pt._next = pt._prev = null;
							tween._propLookup[prop] = rpt;
						}
					}
					pt = next;
				}
			}
			return false;
		};

		p._add = function(target, p, s, c) {
			this._addTween(target, p, s, s + c, p, Math.round);
			this._overwriteProps.push(p);
		};

	}());










/*
 * ----------------------------------------------------------------
 * AttrPlugin
 * ----------------------------------------------------------------
 */

	(function() {

		_fwd_gsScope.FWDFWD_gsDefine.plugin({
			propName: "attr",
			API: 2,
			version: "0.6.0",

			//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
			init: function(target, value, tween, index) {
				var p, end;
				if (typeof(target.setAttribute) !== "function") {
					return false;
				}
				for (p in value) {
					end = value[p];
					if (typeof(end) === "function") {
						end = end(index, target);
					}
					this._addTween(target, "setAttribute", target.getAttribute(p) + "", end + "", p, false, p);
					this._overwriteProps.push(p);
				}
				return true;
			}

		});

	}());










/*
 * ----------------------------------------------------------------
 * DirectionalRotationPlugin
 * ----------------------------------------------------------------
 */
	_fwd_gsScope.FWDFWD_gsDefine.plugin({
		propName: "directionalRotation",
		version: "0.3.0",
		API: 2,

		//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
		init: function(target, value, tween, index) {
			if (typeof(value) !== "object") {
				value = {rotation:value};
			}
			this.finals = {};
			var cap = (value.useRadians === true) ? Math.PI * 2 : 360,
				min = 0.000001,
				p, v, start, end, dif, split;
			for (p in value) {
				if (p !== "useRadians") {
					end = value[p];
					if (typeof(end) === "function") {
						end = end(index, target);
					}
					split = (end + "").split("_");
					v = split[0];
					start = parseFloat( (typeof(target[p]) !== "function") ? target[p] : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]() );
					end = this.finals[p] = (typeof(v) === "string" && v.charAt(1) === "=") ? start + parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) : Number(v) || 0;
					dif = end - start;
					if (split.length) {
						v = split.join("_");
						if (v.indexOf("short") !== -1) {
							dif = dif % cap;
							if (dif !== dif % (cap / 2)) {
								dif = (dif < 0) ? dif + cap : dif - cap;
							}
						}
						if (v.indexOf("_cw") !== -1 && dif < 0) {
							dif = ((dif + cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						} else if (v.indexOf("ccw") !== -1 && dif > 0) {
							dif = ((dif - cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						}
					}
					if (dif > min || dif < -min) {
						this._addTween(target, p, start, start + dif, p);
						this._overwriteProps.push(p);
					}
				}
			}
			return true;
		},

		//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
		set: function(ratio) {
			var pt;
			if (ratio !== 1) {
				this._super.setRatio.call(this, ratio);
			} else {
				pt = this._firstPT;
				while (pt) {
					if (pt.f) {
						pt.t[pt.p](this.finals[pt.p]);
					} else {
						pt.t[pt.p] = this.finals[pt.p];
					}
					pt = pt._next;
				}
			}
		}

	})._autoCSS = true;







	
	
	
	
/*
 * ----------------------------------------------------------------
 * EasePack
 * ----------------------------------------------------------------
 */
	_fwd_gsScope.FWDFWD_gsDefine("easing.Back", ["easing.Ease"], function(Ease) {
		
		var w = (_fwd_gsScope.FWDGreenSockGlobals || _fwd_gsScope),
			gs = w.com.greensock,
			_2PI = Math.PI * 2,
			_HALF_PI = Math.PI / 2,
			_class = gs._class,
			_create = function(n, f) {
				var C = _class("easing." + n, function(){}, true),
					p = C.prototype = new Ease();
				p.constructor = C;
				p.getRatio = f;
				return C;
			},
			_easeReg = Ease.register || function(){}, //put an empty function in place just as a safety measure in case someone loads an OLD version of FWDTweenLite.js where Ease.register doesn't exist.
			_wrap = function(name, EaseOut, EaseIn, EaseInOut, aliases) {
				var C = _class("easing."+name, {
					easeOut:new EaseOut(),
					easeIn:new EaseIn(),
					easeInOut:new EaseInOut()
				}, true);
				_easeReg(C, name);
				return C;
			},
			EasePoint = function(time, value, next) {
				this.t = time;
				this.v = value;
				if (next) {
					this.next = next;
					next.prev = this;
					this.c = next.v - value;
					this.gap = next.t - time;
				}
			},

			//Back
			_createBack = function(n, f) {
				var C = _class("easing." + n, function(overshoot) {
						this._p1 = (overshoot || overshoot === 0) ? overshoot : 1.70158;
						this._p2 = this._p1 * 1.525;
					}, true),
					p = C.prototype = new Ease();
				p.constructor = C;
				p.getRatio = f;
				p.config = function(overshoot) {
					return new C(overshoot);
				};
				return C;
			},

			Back = _wrap("Back",
				_createBack("BackOut", function(p) {
					return ((p = p - 1) * p * ((this._p1 + 1) * p + this._p1) + 1);
				}),
				_createBack("BackIn", function(p) {
					return p * p * ((this._p1 + 1) * p - this._p1);
				}),
				_createBack("BackInOut", function(p) {
					return ((p *= 2) < 1) ? 0.5 * p * p * ((this._p2 + 1) * p - this._p2) : 0.5 * ((p -= 2) * p * ((this._p2 + 1) * p + this._p2) + 2);
				})
			),


			//SlowMo
			SlowMo = _class("easing.SlowMo", function(linearRatio, power, yoyoMode) {
				power = (power || power === 0) ? power : 0.7;
				if (linearRatio == null) {
					linearRatio = 0.7;
				} else if (linearRatio > 1) {
					linearRatio = 1;
				}
				this._p = (linearRatio !== 1) ? power : 0;
				this._p1 = (1 - linearRatio) / 2;
				this._p2 = linearRatio;
				this._p3 = this._p1 + this._p2;
				this._calcEnd = (yoyoMode === true);
			}, true),
			p = SlowMo.prototype = new Ease(),
			SteppedEase, RoughEase, _createElastic;

		p.constructor = SlowMo;
		p.getRatio = function(p) {
			var r = p + (0.5 - p) * this._p;
			if (p < this._p1) {
				return this._calcEnd ? 1 - ((p = 1 - (p / this._p1)) * p) : r - ((p = 1 - (p / this._p1)) * p * p * p * r);
			} else if (p > this._p3) {
				return this._calcEnd ? 1 - (p = (p - this._p3) / this._p1) * p : r + ((p - r) * (p = (p - this._p3) / this._p1) * p * p * p);
			}
			return this._calcEnd ? 1 : r;
		};
		SlowMo.ease = new SlowMo(0.7, 0.7);

		p.config = SlowMo.config = function(linearRatio, power, yoyoMode) {
			return new SlowMo(linearRatio, power, yoyoMode);
		};


		//SteppedEase
		SteppedEase = _class("easing.SteppedEase", function(steps) {
				steps = steps || 1;
				this._p1 = 1 / steps;
				this._p2 = steps + 1;
			}, true);
		p = SteppedEase.prototype = new Ease();
		p.constructor = SteppedEase;
		p.getRatio = function(p) {
			if (p < 0) {
				p = 0;
			} else if (p >= 1) {
				p = 0.999999999;
			}
			return ((this._p2 * p) >> 0) * this._p1;
		};
		p.config = SteppedEase.config = function(steps) {
			return new SteppedEase(steps);
		};


		//RoughEase
		RoughEase = _class("easing.RoughEase", function(vars) {
			vars = vars || {};
			var taper = vars.taper || "none",
				a = [],
				cnt = 0,
				points = (vars.points || 20) | 0,
				i = points,
				randomize = (vars.randomize !== false),
				clamp = (vars.clamp === true),
				template = (vars.template instanceof Ease) ? vars.template : null,
				strength = (typeof(vars.strength) === "number") ? vars.strength * 0.4 : 0.4,
				x, y, bump, invX, obj, pnt;
			while (--i > -1) {
				x = randomize ? Math.random() : (1 / points) * i;
				y = template ? template.getRatio(x) : x;
				if (taper === "none") {
					bump = strength;
				} else if (taper === "out") {
					invX = 1 - x;
					bump = invX * invX * strength;
				} else if (taper === "in") {
					bump = x * x * strength;
				} else if (x < 0.5) {  //"both" (start)
					invX = x * 2;
					bump = invX * invX * 0.5 * strength;
				} else {				//"both" (end)
					invX = (1 - x) * 2;
					bump = invX * invX * 0.5 * strength;
				}
				if (randomize) {
					y += (Math.random() * bump) - (bump * 0.5);
				} else if (i % 2) {
					y += bump * 0.5;
				} else {
					y -= bump * 0.5;
				}
				if (clamp) {
					if (y > 1) {
						y = 1;
					} else if (y < 0) {
						y = 0;
					}
				}
				a[cnt++] = {x:x, y:y};
			}
			a.sort(function(a, b) {
				return a.x - b.x;
			});

			pnt = new EasePoint(1, 1, null);
			i = points;
			while (--i > -1) {
				obj = a[i];
				pnt = new EasePoint(obj.x, obj.y, pnt);
			}

			this._prev = new EasePoint(0, 0, (pnt.t !== 0) ? pnt : pnt.next);
		}, true);
		p = RoughEase.prototype = new Ease();
		p.constructor = RoughEase;
		p.getRatio = function(p) {
			var pnt = this._prev;
			if (p > pnt.t) {
				while (pnt.next && p >= pnt.t) {
					pnt = pnt.next;
				}
				pnt = pnt.prev;
			} else {
				while (pnt.prev && p <= pnt.t) {
					pnt = pnt.prev;
				}
			}
			this._prev = pnt;
			return (pnt.v + ((p - pnt.t) / pnt.gap) * pnt.c);
		};
		p.config = function(vars) {
			return new RoughEase(vars);
		};
		RoughEase.ease = new RoughEase();


		//Bounce
		_wrap("Bounce",
			_create("BounceOut", function(p) {
				if (p < 1 / 2.75) {
					return 7.5625 * p * p;
				} else if (p < 2 / 2.75) {
					return 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
				} else if (p < 2.5 / 2.75) {
					return 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
				}
				return 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
			}),
			_create("BounceIn", function(p) {
				if ((p = 1 - p) < 1 / 2.75) {
					return 1 - (7.5625 * p * p);
				} else if (p < 2 / 2.75) {
					return 1 - (7.5625 * (p -= 1.5 / 2.75) * p + 0.75);
				} else if (p < 2.5 / 2.75) {
					return 1 - (7.5625 * (p -= 2.25 / 2.75) * p + 0.9375);
				}
				return 1 - (7.5625 * (p -= 2.625 / 2.75) * p + 0.984375);
			}),
			_create("BounceInOut", function(p) {
				var invert = (p < 0.5);
				if (invert) {
					p = 1 - (p * 2);
				} else {
					p = (p * 2) - 1;
				}
				if (p < 1 / 2.75) {
					p = 7.5625 * p * p;
				} else if (p < 2 / 2.75) {
					p = 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
				} else if (p < 2.5 / 2.75) {
					p = 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
				} else {
					p = 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
				}
				return invert ? (1 - p) * 0.5 : p * 0.5 + 0.5;
			})
		);


		//CIRC
		_wrap("Circ",
			_create("CircOut", function(p) {
				return Math.sqrt(1 - (p = p - 1) * p);
			}),
			_create("CircIn", function(p) {
				return -(Math.sqrt(1 - (p * p)) - 1);
			}),
			_create("CircInOut", function(p) {
				return ((p*=2) < 1) ? -0.5 * (Math.sqrt(1 - p * p) - 1) : 0.5 * (Math.sqrt(1 - (p -= 2) * p) + 1);
			})
		);


		//Elastic
		_createElastic = function(n, f, def) {
			var C = _class("easing." + n, function(amplitude, period) {
					this._p1 = (amplitude >= 1) ? amplitude : 1; //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
					this._p2 = (period || def) / (amplitude < 1 ? amplitude : 1);
					this._p3 = this._p2 / _2PI * (Math.asin(1 / this._p1) || 0);
					this._p2 = _2PI / this._p2; //precalculate to optimize
				}, true),
				p = C.prototype = new Ease();
			p.constructor = C;
			p.getRatio = f;
			p.config = function(amplitude, period) {
				return new C(amplitude, period);
			};
			return C;
		};
		_wrap("Elastic",
			_createElastic("ElasticOut", function(p) {
				return this._p1 * Math.pow(2, -10 * p) * Math.sin( (p - this._p3) * this._p2 ) + 1;
			}, 0.3),
			_createElastic("ElasticIn", function(p) {
				return -(this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * this._p2 ));
			}, 0.3),
			_createElastic("ElasticInOut", function(p) {
				return ((p *= 2) < 1) ? -0.5 * (this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 *(p -= 1)) * Math.sin( (p - this._p3) * this._p2 ) * 0.5 + 1;
			}, 0.45)
		);


		//Expo
		_wrap("Expo",
			_create("ExpoOut", function(p) {
				return 1 - Math.pow(2, -10 * p);
			}),
			_create("ExpoIn", function(p) {
				return Math.pow(2, 10 * (p - 1)) - 0.001;
			}),
			_create("ExpoInOut", function(p) {
				return ((p *= 2) < 1) ? 0.5 * Math.pow(2, 10 * (p - 1)) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
			})
		);


		//Sine
		_wrap("Sine",
			_create("SineOut", function(p) {
				return Math.sin(p * _HALF_PI);
			}),
			_create("SineIn", function(p) {
				return -Math.cos(p * _HALF_PI) + 1;
			}),
			_create("SineInOut", function(p) {
				return -0.5 * (Math.cos(Math.PI * p) - 1);
			})
		);

		_class("easing.EaseLookup", {
				find:function(s) {
					return Ease.map[s];
				}
			}, true);

		//register the non-standard eases
		_easeReg(w.SlowMo, "SlowMo", "ease,");
		_easeReg(RoughEase, "RoughEase", "ease,");
		_easeReg(SteppedEase, "SteppedEase", "ease,");

		return Back;
		
	}, true);


});

if (_fwd_gsScope.FWDFWD_gsDefine) { _fwd_gsScope._fwd_gsQueue.pop()(); } //necessary in case FWDTweenLite was already loaded separately.











/*
 * ----------------------------------------------------------------
 * Base classes like FWDTweenLite, FWDSimpleTimeline, Ease, Ticker, etc.
 * ----------------------------------------------------------------
 */
(function(window, moduleName) {

		"use strict";
		var _exports = {},
			_fwdglobals = window.FWDGreenSockGlobals = window.FWDGreenSockGlobals || window;
		if (_fwdglobals.FWDTweenLite) {
			return; //in case the core set of classes is already loaded, don't instantiate twice.
		}
		var _namespace = function(ns) {
				var a = ns.split("."),
					p = _fwdglobals, i;
				for (i = 0; i < a.length; i++) {
					p[a[i]] = p = p[a[i]] || {};
				}
				return p;
			},
			gs = _namespace("com.greensock"),
			_FWDtinyNum = 0.0000000001,
			_slice = function(a) { //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],
					l = a.length,
					i;
				for (i = 0; i !== l; b.push(a[i++])) {}
				return b;
			},
			_emptyFunc = function() {},
			_FWDisArray = (function() { //works around issues in iframe environments where the Array fwd_global isn't shared, thus if the object originates in a different window/iframe, "(obj instanceof Array)" will evaluate false. We added some speed optimizations to avoid Object.prototype.toString.call() unless it's absolutely necessary because it's VERY slow (like 20x slower)
				var toString = Object.prototype.toString,
					array = toString.call([]);
				return function(obj) {
					return obj != null && (obj instanceof Array || (typeof(obj) === "object" && !!obj.push && toString.call(obj) === array));
				};
			}()),
			a, i, p, _ticker, _tickerActive,
			_defLookup = {},

			/**
			 * @constructor
			 * Defines a GreenSock class, optionally with an array of FWDdependencies that must be instantiated first and passed into the definition.
			 * This allows users to load GreenSock JS files in any order even if they have interdependencies (like CSSPlugin extends TweenPlugin which is
			 * inside FWDTweenLite.js, but if CSSPlugin is loaded first, it should wait to run its code until FWDTweenLite.js loads and instantiates TweenPlugin
			 * and then pass TweenPlugin to CSSPlugin's definition). This is all done automatically and internally.
			 *
			 * Every definition will be added to a "com.greensock" fwd_global object (typically window, but if a window.FWDGreenSockGlobals object is found,
			 * it will go there as of v1.7). For example, FWDTweenLite will be found at window.com.greensock.FWDTweenLite and since it's a fwd_global class that should be available anywhere,
			 * it is ALSO referenced at window.FWDTweenLite. However some classes aren't considered fwd_global, like the base com.greensock.core.FWDAnim class, so
			 * those will only be at the package like window.com.greensock.core.FWDAnim. Again, if you define a FWDGreenSockGlobals object on the window, everything
			 * gets tucked neatly inside there instead of on the window directly. This allows you to do advanced things like load multiple versions of GreenSock
			 * files and put them into distinct objects (imagine a banner ad uses a newer version but the main site uses an older one). In that case, you could
			 * sandbox the banner one like:
			 *
			 * <script>
			 *     var gs = window.FWDGreenSockGlobals = {}; //the newer version we're about to load could now be referenced in a "gs" object, like gs.FWDTweenLite.to(...). Use whatever alias you want as long as it's unique, "gs" or "banner" or whatever.
			 * </script>
			 * <script src="js/greensock/v1.7/FWDAnimation.js"></script>
			 * <script>
			 *     window.FWDGreenSockGlobals = window._fwd_gsQueue = window.FWDFWD_gsDefine = null; //reset it back to null (along with the special _fwd_gsQueue variable) so that the next load of FWDAnimation affects the window and we can reference things directly like FWDTweenLite.to(...)
			 * </script>
			 * <script src="js/greensock/v1.6/FWDAnimation.js"></script>
			 * <script>
			 *     gs.FWDTweenLite.to(...); //would use v1.7
			 *     FWDTweenLite.to(...); //would use v1.6
			 * </script>
			 *
			 * @param {!string} ns The namespace of the class definition, leaving off "com.greensock." as that's assumed. For example, "FWDTweenLite" or "plugins.CSSPlugin" or "easing.Back".
			 * @param {!Array.<string>} FWDdependencies An array of FWDdependencies (described as their namespaces minus "com.greensock." prefix). For example ["FWDTweenLite","plugins.TweenPlugin","core.FWDAnim"]
			 * @param {!function():Object} func The function that should be called and passed the resolved FWDdependencies which will return the actual class for this definition.
			 * @param {boolean=} fwd_global If true, the class will be added to the fwd_global scope (typically window unless you define a window.FWDGreenSockGlobals object)
			 */
			Definition = function(ns, FWDdependencies, func, fwd_global) {
				this.sc = (_defLookup[ns]) ? _defLookup[ns].sc : []; //subclasses
				_defLookup[ns] = this;
				this.gsClass = null;
				this.func = func;
				var _classes = [];
				this.check = function(init) {
					var i = FWDdependencies.length,
						missing = i,
						cur, a, n, cl, hasModule;
					while (--i > -1) {
						if ((cur = _defLookup[FWDdependencies[i]] || new Definition(FWDdependencies[i], [])).gsClass) {
							_classes[i] = cur.gsClass;
							missing--;
						} else if (init) {
							cur.sc.push(this);
						}
					}
					if (missing === 0 && func) {
						a = ("com.greensock." + ns).split(".");
						n = a.pop();
						cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes);

						//exports to multiple environments
						if (fwd_global) {
							_fwdglobals[n] = _exports[n] = cl; //provides a way to avoid fwd_global namespace pollution. By default, the main classes like FWDTweenLite, Power1, Strong, etc. are added to window unless a FWDGreenSockGlobals is defined. So if you want to have things added to a custom object instead, just do something like window.FWDGreenSockGlobals = {} before loading any GreenSock files. You can even set up an alias like window.FWDGreenSockGlobals = windows.gs = {} so that you can access everything like gs.FWDTweenLite. Also remember that ALL classes are added to the window.com.greensock object (in their respective packages, like com.greensock.easing.Power1, com.greensock.FWDTweenLite, etc.)
							hasModule = (typeof(fwd_module) !== "undefined" && fwd_module.exports);
							if (!hasModule && typeof(define) === "function" && define.amd){ //AMD
								define((window.FWDGreenSockAMDPath ? window.FWDGreenSockAMDPath + "/" : "") + ns.split(".").pop(), [], function() { return cl; });
							} else if (hasModule){ //node
								if (ns === moduleName) {
									fwd_module.exports = _exports[moduleName] = cl;
									for (i in _exports) {
										cl[i] = _exports[i];
									}
								} else if (_exports[moduleName]) {
									_exports[moduleName][n] = cl;
								}
							}
						}
						for (i = 0; i < this.sc.length; i++) {
							this.sc[i].check();
						}
					}
				};
				this.check(true);
			},

			//used to create Definition instances (which basically registers a class that has FWDdependencies).
			FWDFWD_gsDefine = window.FWDFWD_gsDefine = function(ns, FWDdependencies, func, fwd_global) {
				return new Definition(ns, FWDdependencies, func, fwd_global);
			},

			//a quick way to create a class that doesn't have any FWDdependencies. Returns the class, but first registers it in the GreenSock namespace so that other classes can grab it (other classes might be dependent on the class).
			_class = gs._class = function(ns, func, fwd_global) {
				func = func || function() {};
				FWDFWD_gsDefine(ns, [], function(){ return func; }, fwd_global);
				return func;
			};

		FWDFWD_gsDefine.globals = _fwdglobals;



/*
 * ----------------------------------------------------------------
 * Ease
 * ----------------------------------------------------------------
 */
		var _baseParams = [0, 0, 1, 1],
			_blankArray = [],
			Ease = _class("easing.Ease", function(func, extraParams, type, power) {
				this._func = func;
				this._type = type || 0;
				this._power = power || 0;
				this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
			}, true),
			_easeMap = Ease.map = {},
			_easeReg = Ease.register = function(ease, names, types, create) {
				var na = names.split(","),
					i = na.length,
					ta = (types || "easeIn,easeOut,easeInOut").split(","),
					e, name, j, type;
				while (--i > -1) {
					name = na[i];
					e = create ? _class("easing."+name, null, true) : gs.easing[name] || {};
					j = ta.length;
					while (--j > -1) {
						type = ta[j];
						_easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease();
					}
				}
			};

		p = Ease.prototype;
		p._calcEnd = false;
		p.getRatio = function(p) {
			if (this._func) {
				this._params[0] = p;
				return this._func.apply(null, this._params);
			}
			var t = this._type,
				pw = this._power,
				r = (t === 1) ? 1 - p : (t === 2) ? p : (p < 0.5) ? p * 2 : (1 - p) * 2;
			if (pw === 1) {
				r *= r;
			} else if (pw === 2) {
				r *= r * r;
			} else if (pw === 3) {
				r *= r * r * r;
			} else if (pw === 4) {
				r *= r * r * r * r;
			}
			return (t === 1) ? 1 - r : (t === 2) ? r : (p < 0.5) ? r / 2 : 1 - (r / 2);
		};

		//create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong, Power0, Power1, Power2, Power3, and Power4 (each with easeIn, easeOut, and easeInOut)
		a = ["Linear","Quad","Cubic","Quart","Quint,Strong"];
		i = a.length;
		while (--i > -1) {
			p = a[i]+",Power"+i;
			_easeReg(new Ease(null,null,1,i), p, "easeOut", true);
			_easeReg(new Ease(null,null,2,i), p, "easeIn" + ((i === 0) ? ",easeNone" : ""));
			_easeReg(new Ease(null,null,3,i), p, "easeInOut");
		}
		_easeMap.linear = gs.easing.Linear.easeIn;
		_easeMap.swing = gs.easing.Quad.easeInOut; //for jQuery folks


/*
 * ----------------------------------------------------------------
 * EventDispatcher
 * ----------------------------------------------------------------
 */
		var EventDispatcher = _class("events.EventDispatcher", function(target) {
			this._listeners = {};
			this._eventTarget = target || this;
		});
		p = EventDispatcher.prototype;

		p.addEventListener = function(type, callback, scope, useParam, priority) {
			priority = priority || 0;
			var list = this._listeners[type],
				index = 0,
				listener, i;
			if (this === _ticker && !_tickerActive) {
				_ticker.wake();
			}
			if (list == null) {
				this._listeners[type] = list = [];
			}
			i = list.length;
			while (--i > -1) {
				listener = list[i];
				if (listener.c === callback && listener.s === scope) {
					list.splice(i, 1);
				} else if (index === 0 && listener.pr < priority) {
					index = i + 1;
				}
			}
			list.splice(index, 0, {c:callback, s:scope, up:useParam, pr:priority});
		};

		p.removeEventListener = function(type, callback) {
			var list = this._listeners[type], i;
			if (list) {
				i = list.length;
				while (--i > -1) {
					if (list[i].c === callback) {
						list.splice(i, 1);
						return;
					}
				}
			}
		};

		p.dispatchEvent = function(type) {
			var list = this._listeners[type],
				i, t, listener;
			if (list) {
				i = list.length;
				if (i > 1) {
					list = list.slice(0); //in case addEventListener() is called from within a listener/callback (otherwise the index could change, resulting in a skip)
				}
				t = this._eventTarget;
				while (--i > -1) {
					listener = list[i];
					if (listener) {
						if (listener.up) {
							listener.c.call(listener.s || t, {type:type, target:t});
						} else {
							listener.c.call(listener.s || t);
						}
					}
				}
			}
		};


/*
 * ----------------------------------------------------------------
 * Ticker
 * ----------------------------------------------------------------
 */
 		var _fwddependencies = window.requestAnimationFrame,
			_fwdcancelAnimFrame = window.cancelAnimationFrame,
			_getTime = Date.now || function() {return new Date().getTime();},
			_lastUpdate = _getTime();

		//now try to determine the requestAnimationFrame and cancelAnimationFrame functions and if none are found, we'll use a setTimeout()/clearTimeout() polyfill.
		a = ["ms","moz","webkit","o"];
		i = a.length;
		while (--i > -1 && !_fwddependencies) {
			_fwddependencies = window[a[i] + "RequestAnimationFrame"];
			_fwdcancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
		}

		_class("Ticker", function(fps, useRAF) {
			var _self = this,
				_startTime = _getTime(),
				_useRAF = (useRAF !== false && _fwddependencies) ? "auto" : false,
				_lagThreshold = 500,
				_adjustedLag = 33,
				_tickWord = "tick", //helps reduce gc burden
				_fps, _req, _id, _gap, _nextTime,
				_tick = function(manual) {
					var elapsed = _getTime() - _lastUpdate,
						overlap, dispatch;
					if (elapsed > _lagThreshold) {
						_startTime += elapsed - _adjustedLag;
					}
					_lastUpdate += elapsed;
					_self.time = (_lastUpdate - _startTime) / 1000;
					overlap = _self.time - _nextTime;
					if (!_fps || overlap > 0 || manual === true) {
						_self.frame++;
						_nextTime += overlap + (overlap >= _gap ? 0.004 : _gap - overlap);
						dispatch = true;
					}
					if (manual !== true) { //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.
						_id = _req(_tick);
					}
					if (dispatch) {
						_self.dispatchEvent(_tickWord);
					}
				};

			EventDispatcher.call(_self);
			_self.time = _self.frame = 0;
			_self.tick = function() {
				_tick(true);
			};

			_self.lagSmoothing = function(threshold, adjustedLag) {
				_lagThreshold = threshold || (1 / _FWDtinyNum); //zero should be interpreted as basically unlimited
				_adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
			};

			_self.sleep = function() {
				if (_id == null) {
					return;
				}
				if (!_useRAF || !_fwdcancelAnimFrame) {
					clearTimeout(_id);
				} else {
					_fwdcancelAnimFrame(_id);
				}
				_req = _emptyFunc;
				_id = null;
				if (_self === _ticker) {
					_tickerActive = false;
				}
			};

			_self.wake = function(seamless) {
				if (_id !== null) {
					_self.sleep();
				} else if (seamless) {
					_startTime += -_lastUpdate + (_lastUpdate = _getTime());
				} else if (_self.frame > 10) { //don't trigger lagSmoothing if we're just waking up, and make sure that at least 10 frames have elapsed because of the iOS bug that we work around below with the 1.5-second setTimout().
					_lastUpdate = _getTime() - _lagThreshold + 5;
				}
				_req = (_fps === 0) ? _emptyFunc : (!_useRAF || !_fwddependencies) ? function(f) { return setTimeout(f, ((_nextTime - _self.time) * 1000 + 1) | 0); } : _fwddependencies;
				if (_self === _ticker) {
					_tickerActive = true;
				}
				_tick(2);
			};

			_self.fps = function(value) {
				if (!arguments.length) {
					return _fps;
				}
				_fps = value;
				_gap = 1 / (_fps || 60);
				_nextTime = this.time + _gap;
				_self.wake();
			};

			_self.useRAF = function(value) {
				if (!arguments.length) {
					return _useRAF;
				}
				_self.sleep();
				_useRAF = value;
				_self.fps(_fps);
			};
			_self.fps(fps);

			//a bug in iOS 6 Safari occasionally prevents the requestAnimationFrame from working initially, so we use a 1.5-second timeout that automatically falls back to setTimeout() if it senses this condition.
			setTimeout(function() {
				if (_useRAF === "auto" && _self.frame < 5 && document.visibilityState !== "hidden") {
					_self.useRAF(false);
				}
			}, 1500);
		});

		p = gs.Ticker.prototype = new gs.events.EventDispatcher();
		p.constructor = gs.Ticker;


/*
 * ----------------------------------------------------------------
 * FWDAnim
 * ----------------------------------------------------------------
 */
		var FWDAnim = _class("core.FWDAnim", function(duration, vars) {
				this.vars = vars = vars || {};
				this._duration = this._totalDuration = duration || 0;
				this._delay = Number(vars.delay) || 0;
				this._timeScale = 1;
				this._active = (vars.immediateRender === true);
				this.data = vars.data;
				this._reversed = (vars.reversed === true);

				if (!_rootTimeline) {
					return;
				}
				if (!_tickerActive) { //some browsers (like iOS 6 Safari) shut down JavaScript execution when the tab is disabled and they [occasionally] neglect to start up requestAnimationFrame again when returning - this code ensures that the engine starts up again properly.
					_ticker.wake();
				}

				var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
				tl.add(this, tl._time);

				if (this.vars.paused) {
					this.paused(true);
				}
			});

		_ticker = FWDAnim.ticker = new gs.Ticker();
		p = FWDAnim.prototype;
		p._dirty = p._gc = p._initted = p._paused = false;
		p._totalTime = p._time = 0;
		p._rawPrevTime = -1;
		p._next = p._last = p._onUpdate = p._timeline = p.fwdtimline = null;
		p._paused = false;


		//some browsers (like iOS) occasionally drop the requestAnimationFrame event when the user switches to a different tab and then comes back again, so we use a 2-second setTimeout() to sense if/when that condition occurs and then wake() the ticker.
		var _checkTimeout = function() {
				if (_tickerActive && _getTime() - _lastUpdate > 2000) {
					_ticker.wake();
				}
				setTimeout(_checkTimeout, 2000);
			};
		_checkTimeout();


		p.play = function(from, suppressEvents) {
			if (from != null) {
				this.seek(from, suppressEvents);
			}
			return this.reversed(false).paused(false);
		};

		p.pause = function(atTime, suppressEvents) {
			if (atTime != null) {
				this.seek(atTime, suppressEvents);
			}
			return this.paused(true);
		};

		p.resume = function(from, suppressEvents) {
			if (from != null) {
				this.seek(from, suppressEvents);
			}
			return this.paused(false);
		};

		p.seek = function(time, suppressEvents) {
			return this.totalTime(Number(time), suppressEvents !== false);
		};

		p.restart = function(includeDelay, suppressEvents) {
			return this.reversed(false).paused(false).totalTime(includeDelay ? -this._delay : 0, (suppressEvents !== false), true);
		};

		p.reverse = function(from, suppressEvents) {
			if (from != null) {
				this.seek((from || this.totalDuration()), suppressEvents);
			}
			return this.reversed(true).paused(false);
		};

		p.render = function(time, suppressEvents, force) {
			//stub - we override this method in subclasses.
		};

		p.invalidate = function() {
			this._time = this._totalTime = 0;
			this._initted = this._gc = false;
			this._rawPrevTime = -1;
			if (this._gc || !this.fwdtimline) {
				this._enabled(true);
			}
			return this;
		};

		p.isActive = function() {
			var tl = this._timeline, //the 2 root timelines won't have a _timeline; they're always active.
				startTime = this._startTime,
				rawTime;
			return (!tl || (!this._gc && !this._paused && tl.isActive() && (rawTime = tl.rawTime()) >= startTime && rawTime < startTime + this.totalDuration() / this._timeScale));
		};

		p._enabled = function (enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			this._gc = !enabled;
			this._active = this.isActive();
			if (ignoreTimeline !== true) {
				if (enabled && !this.fwdtimline) {
					this._timeline.add(this, this._startTime - this._delay);
				} else if (!enabled && this.fwdtimline) {
					this._timeline._remove(this, true);
				}
			}
			return false;
		};


		p._kill = function(vars, target) {
			return this._enabled(false, false);
		};

		p.kill = function(vars, target) {
			this._kill(vars, target);
			return this;
		};

		p._uncache = function(includeSelf) {
			var tween = includeSelf ? this : this.fwdtimline;
			while (tween) {
				tween._dirty = true;
				tween = tween.fwdtimline;
			}
			return this;
		};

		p._swapSelfInParams = function(params) {
			var i = params.length,
				copy = params.concat();
			while (--i > -1) {
				if (params[i] === "{self}") {
					copy[i] = this;
				}
			}
			return copy;
		};

		p._callback = function(type) {
			var v = this.vars,
				callback = v[type],
				params = v[type + "Params"],
				scope = v[type + "Scope"] || v.callbackScope || this,
				l = params ? params.length : 0;
			switch (l) { //speed optimization; call() is faster than apply() so use it when there are only a few parameters (which is by far most common). Previously we simply did var v = this.vars; v[type].apply(v[type + "Scope"] || v.callbackScope || this, v[type + "Params"] || _blankArray);
				case 0: callback.call(scope); break;
				case 1: callback.call(scope, params[0]); break;
				case 2: callback.call(scope, params[0], params[1]); break;
				default: callback.apply(scope, params);
			}
		};

//----FWDAnim getters/setters --------------------------------------------------------

		p.eventCallback = function(type, callback, params, scope) {
			if ((type || "").substr(0,2) === "on") {
				var v = this.vars;
				if (arguments.length === 1) {
					return v[type];
				}
				if (callback == null) {
					delete v[type];
				} else {
					v[type] = callback;
					v[type + "Params"] = (_FWDisArray(params) && params.join("").indexOf("{self}") !== -1) ? this._swapSelfInParams(params) : params;
					v[type + "Scope"] = scope;
				}
				if (type === "onUpdate") {
					this._onUpdate = callback;
				}
			}
			return this;
		};

		p.delay = function(value) {
			if (!arguments.length) {
				return this._delay;
			}
			if (this._timeline.smoothChildTiming) {
				this.startTime( this._startTime + value - this._delay );
			}
			this._delay = value;
			return this;
		};

		p.duration = function(value) {
			if (!arguments.length) {
				this._dirty = false;
				return this._duration;
			}
			this._duration = this._totalDuration = value;
			this._uncache(true); //true in case it's a FWDAnimation or TimelineMax that has a repeat - we'll need to refresh the totalDuration.
			if (this._timeline.smoothChildTiming) if (this._time > 0) if (this._time < this._duration) if (value !== 0) {
				this.totalTime(this._totalTime * (value / this._duration), true);
			}
			return this;
		};

		p.totalDuration = function(value) {
			this._dirty = false;
			return (!arguments.length) ? this._totalDuration : this.duration(value);
		};

		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			return this.totalTime((value > this._duration) ? this._duration : value, suppressEvents);
		};

		p.totalTime = function(time, suppressEvents, uncapped) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (!arguments.length) {
				return this._totalTime;
			}
			if (this._timeline) {
				if (time < 0 && !uncapped) {
					time += this.totalDuration();
				}
				if (this._timeline.smoothChildTiming) {
					if (this._dirty) {
						this.totalDuration();
					}
					var totalDuration = this._totalDuration,
						tl = this._timeline;
					if (time > totalDuration && !uncapped) {
						time = totalDuration;
					}
					this._startTime = (this._paused ? this._pauseTime : tl._time) - ((!this._reversed ? time : totalDuration - time) / this._timeScale);
					if (!tl._dirty) { //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
						this._uncache(false);
					}
					//in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a FWDTimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The startTime of that child would get pushed out, but one of the ancestors may have completed.
					if (tl._timeline) {
						while (tl._timeline) {
							if (tl._timeline._time !== (tl._startTime + tl._totalTime) / tl._timeScale) {
								tl.totalTime(tl._totalTime, true);
							}
							tl = tl._timeline;
						}
					}
				}
				if (this._gc) {
					this._enabled(true, false);
				}
				if (this._totalTime !== time || this._duration === 0) {
					if (_lazyTweens.length) {
						_lazyRender();
					}
					this.render(time, suppressEvents, false);
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
						_lazyRender();
					}
				}
			}
			return this;
		};

		p.progress = p.totalProgress = function(value, suppressEvents) {
			var duration = this.duration();
			return (!arguments.length) ? (duration ? this._time / duration : this.ratio) : this.totalTime(duration * value, suppressEvents);
		};

		p.startTime = function(value) {
			if (!arguments.length) {
				return this._startTime;
			}
			if (value !== this._startTime) {
				this._startTime = value;
				if (this.fwdtimline) if (this.fwdtimline._sortChildren) {
					this.fwdtimline.add(this, value - this._delay); //ensures that any necessary re-sequencing of Animations in the fwdtimline occurs to make sure the rendering order is correct.
				}
			}
			return this;
		};

		p.endTime = function(includeRepeats) {
			return this._startTime + ((includeRepeats != false) ? this.totalDuration() : this.duration()) / this._timeScale;
		};

		p.timeScale = function(value) {
			if (!arguments.length) {
				return this._timeScale;
			}
			value = value || _FWDtinyNum; //can't allow zero because it'll throw the math off
			if (this._timeline && this._timeline.smoothChildTiming) {
				var pauseTime = this._pauseTime,
					t = (pauseTime || pauseTime === 0) ? pauseTime : this._timeline.totalTime();
				this._startTime = t - ((t - this._startTime) * this._timeScale / value);
			}
			this._timeScale = value;
			return this._uncache(false);
		};

		p.reversed = function(value) {
			if (!arguments.length) {
				return this._reversed;
			}
			if (value != this._reversed) {
				this._reversed = value;
				this.totalTime(((this._timeline && !this._timeline.smoothChildTiming) ? this.totalDuration() - this._totalTime : this._totalTime), true);
			}
			return this;
		};

		p.paused = function(value) {
			if (!arguments.length) {
				return this._paused;
			}
			var tl = this._timeline,
				raw, elapsed;
			if (value != this._paused) if (tl) {
				if (!_tickerActive && !value) {
					_ticker.wake();
				}
				raw = tl.rawTime();
				elapsed = raw - this._pauseTime;
				if (!value && tl.smoothChildTiming) {
					this._startTime += elapsed;
					this._uncache(false);
				}
				this._pauseTime = value ? raw : null;
				this._paused = value;
				this._active = this.isActive();
				if (!value && elapsed !== 0 && this._initted && this.duration()) {
					raw = tl.smoothChildTiming ? this._totalTime : (raw - this._startTime) / this._timeScale;
					this.render(raw, (raw === this._totalTime), true); //in case the target's properties changed via some other tween or manual update by the user, we should force a render.
				}
			}
			if (this._gc && !value) {
				this._enabled(true, false);
			}
			return this;
		};


/*
 * ----------------------------------------------------------------
 * FWDSimpleTimeline
 * ----------------------------------------------------------------
 */
		var FWDSimpleTimeline = _class("core.FWDSimpleTimeline", function(vars) {
			FWDAnim.call(this, 0, vars);
			this.autoRemoveChildren = this.smoothChildTiming = true;
		});

		p = FWDSimpleTimeline.prototype = new FWDAnim();
		p.constructor = FWDSimpleTimeline;
		p.kill()._gc = false;
		p._first = p._last = p._recent = null;
		p._sortChildren = false;

		p.add = p.insert = function(child, position, align, stagger) {
			var prevTween, st;
			child._startTime = Number(position || 0) + child._delay;
			if (child._paused) if (this !== child._timeline) { //we only adjust the _pauseTime if it wasn't in this fwdtimline already. Remember, sometimes a tween will be inserted again into the same fwdtimline when its startTime is changed so that the tweens in the FWDTimelineLite/Max are re-ordered properly in the linked list (so everything renders in the proper order).
				child._pauseTime = child._startTime + ((this.rawTime() - child._startTime) / child._timeScale);
			}
			if (child.fwdtimline) {
				child.fwdtimline._remove(child, true); //removes from existing fwdtimline so that it can be properly added to this one.
			}
			child.fwdtimline = child._timeline = this;
			if (child._gc) {
				child._enabled(true, true);
			}
			prevTween = this._last;
			if (this._sortChildren) {
				st = child._startTime;
				while (prevTween && prevTween._startTime > st) {
					prevTween = prevTween._prev;
				}
			}
			if (prevTween) {
				child._next = prevTween._next;
				prevTween._next = child;
			} else {
				child._next = this._first;
				this._first = child;
			}
			if (child._next) {
				child._next._prev = child;
			} else {
				this._last = child;
			}
			child._prev = prevTween;
			this._recent = child;
			if (this._timeline) {
				this._uncache(true);
			}
			return this;
		};

		p._remove = function(tween, skipDisable) {
			if (tween.fwdtimline === this) {
				if (!skipDisable) {
					tween._enabled(false, true);
				}

				if (tween._prev) {
					tween._prev._next = tween._next;
				} else if (this._first === tween) {
					this._first = tween._next;
				}
				if (tween._next) {
					tween._next._prev = tween._prev;
				} else if (this._last === tween) {
					this._last = tween._prev;
				}
				tween._next = tween._prev = tween.fwdtimline = null;
				if (tween === this._recent) {
					this._recent = this._last;
				}

				if (this._timeline) {
					this._uncache(true);
				}
			}
			return this;
		};

		p.render = function(time, suppressEvents, force) {
			var tween = this._first,
				next;
			this._totalTime = this._time = this._rawPrevTime = time;
			while (tween) {
				next = tween._next; //record it here because the value could change after rendering...
				if (tween._active || (time >= tween._startTime && !tween._paused)) {
					if (!tween._reversed) {
						tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
					} else {
						tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
					}
				}
				tween = next;
			}
		};

		p.rawTime = function() {
			if (!_tickerActive) {
				_ticker.wake();
			}
			return this._totalTime;
		};

/*
 * ----------------------------------------------------------------
 * FWDTweenLite
 * ----------------------------------------------------------------
 */
		var FWDTweenLite = _class("FWDTweenLite", function(target, duration, vars) {
				FWDAnim.call(this, duration, vars);
				this.render = FWDTweenLite.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)

				if (target == null) {
					throw "Cannot tween a null target.";
				}

				this.target = target = (typeof(target) !== "string") ? target : FWDTweenLite.selector(target) || target;

				var isSelector = (target.jquery || (target.length && target !== window && target[0] && (target[0] === window || (target[0].nodeType && target[0].style && !target.nodeType)))),
					overwrite = this.vars.overwrite,
					i, targ, targets;

				this._overwrite = overwrite = (overwrite == null) ? _overwriteLookup[FWDTweenLite.defaultOverwrite] : (typeof(overwrite) === "number") ? overwrite >> 0 : _overwriteLookup[overwrite];

				if ((isSelector || target instanceof Array || (target.push && _FWDisArray(target))) && typeof(target[0]) !== "number") {
					this._targets = targets = _slice(target);  //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
					this._propLookup = [];
					this._siblings = [];
					for (i = 0; i < targets.length; i++) {
						targ = targets[i];
						if (!targ) {
							targets.splice(i--, 1);
							continue;
						} else if (typeof(targ) === "string") {
							targ = targets[i--] = FWDTweenLite.selector(targ); //in case it's an array of strings
							if (typeof(targ) === "string") {
								targets.splice(i+1, 1); //to avoid an endless loop (can't imagine why the selector would return a string, but just in case)
							}
							continue;
						} else if (targ.length && targ !== window && targ[0] && (targ[0] === window || (targ[0].nodeType && targ[0].style && !targ.nodeType))) { //in case the user is passing in an array of selector objects (like jQuery objects), we need to check one more level and pull things out if necessary. Also note that <select> elements pass all the criteria regarding length and the first child having style, so we must also check to ensure the target isn't an HTML node itself.
							targets.splice(i--, 1);
							this._targets = targets = targets.concat(_slice(targ));
							continue;
						}
						this._siblings[i] = _register(targ, this, false);
						if (overwrite === 1) if (this._siblings[i].length > 1) {
							_applyOverwrite(targ, this, null, 1, this._siblings[i]);
						}
					}

				} else {
					this._propLookup = {};
					this._siblings = _register(target, this, false);
					if (overwrite === 1) if (this._siblings.length > 1) {
						_applyOverwrite(target, this, null, 1, this._siblings);
					}
				}
				if (this.vars.immediateRender || (duration === 0 && this._delay === 0 && this.vars.immediateRender !== false)) {
					this._time = -_FWDtinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
					this.render(Math.min(0, -this._delay)); //in case delay is negative
				}
			}, true),
			_FWDisSelector = function(v) {
				return (v && v.length && v !== window && v[0] && (v[0] === window || (v[0].nodeType && v[0].style && !v.nodeType))); //we cannot check "nodeType" if the target is window from within an iframe, otherwise it will trigger a security error in some browsers like Firefox.
			},
			_autoCSS = function(vars, target) {
				var css = {},
					p;
				for (p in vars) {
					if (!_reservedProps[p] && (!(p in target) || p === "transform" || p === "x" || p === "y" || p === "width" || p === "height" || p === "className" || p === "border") && (!_plugins[p] || (_plugins[p] && _plugins[p]._autoCSS))) { //note: <img> elements contain read-only "x" and "y" properties. We should also prioritize editing css width/height rather than the element's properties.
						css[p] = vars[p];
						delete vars[p];
					}
				}
				vars.css = css;
			};

		p = FWDTweenLite.prototype = new FWDAnim();
		p.constructor = FWDTweenLite;
		p.kill()._gc = false;

//----FWDTweenLite defaults, overwrite management, and root updates ----------------------------------------------------

		p.ratio = 0;
		p._firstPT = p._targets = p._overwrittenProps = p._startAt = null;
		p._notifyPluginsOfEnabled = p._lazy = false;

		FWDTweenLite.version = "1.19.0";
		FWDTweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
		FWDTweenLite.defaultOverwrite = "auto";
		FWDTweenLite.ticker = _ticker;
		FWDTweenLite.autoSleep = 120;
		FWDTweenLite.lagSmoothing = function(threshold, adjustedLag) {
			_ticker.lagSmoothing(threshold, adjustedLag);
		};

		FWDTweenLite.selector = window.$ || window.jQuery || function(e) {
			var selector = window.$ || window.jQuery;
			if (selector) {
				FWDTweenLite.selector = selector;
				return selector(e);
			}
			return (typeof(document) === "undefined") ? e : (document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById((e.charAt(0) === "#") ? e.substr(1) : e));
		};

		var _lazyTweens = [],
			_lazyLookup = {},
			_numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
			//_nonNumbersExp = /(?:([\-+](?!(\d|=)))|[^\d\-+=e]|(e(?![\-+][\d])))+/ig,
			_setRatio = function(v) {
				var pt = this._firstPT,
					min = 0.000001,
					val;
				while (pt) {
					val = !pt.blob ? pt.c * v + pt.s : v ? this.join("") : this.start;
					if (pt.m) {
						val = pt.m(val, this._target || pt.t);
					} else if (val < min) if (val > -min) { //prevents issues with converting very small numbers to strings in the browser
						val = 0;
					}
					if (!pt.f) {
						pt.t[pt.p] = val;
					} else if (pt.fp) {
						pt.t[pt.p](pt.fp, val);
					} else {
						pt.t[pt.p](val);
					}
					pt = pt._next;
				}
			},
			//compares two strings (start/end), finds the numbers that are different and spits back an array representing the whole value but with the changing values isolated as elements. For example, "rgb(0,0,0)" and "rgb(100,50,0)" would become ["rgb(", 0, ",", 50, ",0)"]. Notice it merges the parts that are identical (performance optimization). The array also has a linked list of PropTweens attached starting with _firstPT that contain the tweening data (t, p, s, c, f, etc.). It also stores the starting value as a "start" property so that we can revert to it if/when necessary, like when a tween rewinds fully. If the quantity of numbers differs between the start and end, it will always prioritize the end value(s). The pt parameter is optional - it's for a PropTween that will be appended to the end of the linked list and is typically for actually setting the value after all of the elements have been updated (with array.join("")).
			_blobDif = function(start, end, filter, pt) {
				var a = [start, end],
					charIndex = 0,
					s = "",
					color = 0,
					startNums, endNums, num, i, l, nonNumbers, currentNum;
				a.start = start;
				if (filter) {
					filter(a); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.
					start = a[0];
					end = a[1];
				}
				a.length = 0;
				startNums = start.match(_numbersExp) || [];
				endNums = end.match(_numbersExp) || [];
				if (pt) {
					pt._next = null;
					pt.blob = 1;
					a._firstPT = a._applyPT = pt; //apply last in the linked list (which means inserting it first)
				}
				l = endNums.length;
				for (i = 0; i < l; i++) {
					currentNum = endNums[i];
					nonNumbers = end.substr(charIndex, end.indexOf(currentNum, charIndex)-charIndex);
					s += (nonNumbers || !i) ? nonNumbers : ","; //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
					charIndex += nonNumbers.length;
					if (color) { //sense rgba() values and round them.
						color = (color + 1) % 5;
					} else if (nonNumbers.substr(-5) === "rgba(") {
						color = 1;
					}
					if (currentNum === startNums[i] || startNums.length <= i) {
						s += currentNum;
					} else {
						if (s) {
							a.push(s);
							s = "";
						}
						num = parseFloat(startNums[i]);
						a.push(num);
						a._firstPT = {_next: a._firstPT, t:a, p: a.length-1, s:num, c:((currentNum.charAt(1) === "=") ? parseInt(currentNum.charAt(0) + "1", 10) * parseFloat(currentNum.substr(2)) : (parseFloat(currentNum) - num)) || 0, f:0, m:(color && color < 4) ? Math.round : 0};
						//note: we don't set _prev because we'll never need to remove individual PropTweens from this list.
					}
					charIndex += currentNum.length;
				}
				s += end.substr(charIndex);
				if (s) {
					a.push(s);
				}
				a.setRatio = _setRatio;
				return a;
			},
			//note: "funcParam" is only necessary for function-based getters/setters that require an extra parameter like getAttribute("width") and setAttribute("width", value). In this example, funcParam would be "width". Used by AttrPlugin for example.
			_addPropTween = function(target, prop, start, end, overwriteProp, mod, funcParam, stringFilter, index) {
				if (typeof(end) === "function") {
					end = end(index || 0, target);
				}
				var s = (start === "get") ? target[prop] : start,
					type = typeof(target[prop]),
					isRelative = (typeof(end) === "string" && end.charAt(1) === "="),
					pt = {t:target, p:prop, s:s, f:(type === "function"), pg:0, n:overwriteProp || prop, m:(!mod ? 0 : (typeof(mod) === "function") ? mod : Math.round), pr:0, c:isRelative ? parseInt(end.charAt(0) + "1", 10) * parseFloat(end.substr(2)) : (parseFloat(end) - s) || 0},
					blob, getterName;
				if (type !== "number") {
					if (type === "function" && start === "get") {
						getterName = ((prop.indexOf("set") || typeof(target["get" + prop.substr(3)]) !== "function") ? prop : "get" + prop.substr(3));
						pt.s = s = funcParam ? target[getterName](funcParam) : target[getterName]();
					}
					if (typeof(s) === "string" && (funcParam || isNaN(s))) {
						//a blob (string that has multiple numbers in it)
						pt.fp = funcParam;
						blob = _blobDif(s, end, stringFilter || FWDTweenLite.defaultStringFilter, pt);
						pt = {t:blob, p:"setRatio", s:0, c:1, f:2, pg:0, n:overwriteProp || prop, pr:0, m:0}; //"2" indicates it's a Blob property tween. Needed for RoundPropsPlugin for example.
					} else if (!isRelative) {
						pt.s = parseFloat(s);
						pt.c = (parseFloat(end) - pt.s) || 0;
					}
				}
				if (pt.c) { //only add it to the linked list if there's a change.
					if ((pt._next = this._firstPT)) {
						pt._next._prev = pt;
					}
					this._firstPT = pt;
					return pt;
				}
			},
			_internals = FWDTweenLite._internals = {isArray:_FWDisArray, isSelector:_FWDisSelector, lazyTweens:_lazyTweens, blobDif:_blobDif}, //gives us a way to expose certain private values to other GreenSock classes without contaminating tha main FWDTweenLite object.
			_plugins = FWDTweenLite._plugins = {},
			_tweenLookup = _internals.tweenLookup = {},
			_tweenLookupNum = 0,
			_reservedProps = _internals.reservedProps = {ease:1, delay:1, overwrite:1, onComplete:1, onCompleteParams:1, onCompleteScope:1, useFrames:1, runBackwards:1, startAt:1, onUpdate:1, onUpdateParams:1, onUpdateScope:1, onStart:1, onStartParams:1, onStartScope:1, onReverseComplete:1, onReverseCompleteParams:1, onReverseCompleteScope:1, onRepeat:1, onRepeatParams:1, onRepeatScope:1, easeParams:1, yoyo:1, immediateRender:1, repeat:1, repeatDelay:1, data:1, paused:1, reversed:1, autoCSS:1, lazy:1, onOverwrite:1, callbackScope:1, stringFilter:1, id:1},
			_overwriteLookup = {none:0, all:1, auto:2, concurrent:3, allOnStart:4, preexisting:5, "true":1, "false":0},
			_rootFramesTimeline = FWDAnim._rootFramesTimeline = new FWDSimpleTimeline(),
			_rootTimeline = FWDAnim._rootTimeline = new FWDSimpleTimeline(),
			_nextGCFrame = 30,
			_lazyRender = _internals.lazyRender = function() {
				var i = _lazyTweens.length,
					tween;
				_lazyLookup = {};
				while (--i > -1) {
					tween = _lazyTweens[i];
					if (tween && tween._lazy !== false) {
						tween.render(tween._lazy[0], tween._lazy[1], true);
						tween._lazy = false;
					}
				}
				_lazyTweens.length = 0;
			};

		_rootTimeline._startTime = _ticker.time;
		_rootFramesTimeline._startTime = _ticker.frame;
		_rootTimeline._active = _rootFramesTimeline._active = true;
		setTimeout(_lazyRender, 1); //on some mobile devices, there isn't a "tick" before code runs which means any lazy renders wouldn't run before the next official "tick".

		FWDAnim._updateRoot = FWDTweenLite.render = function() {
				var i, a, p;
				if (_lazyTweens.length) { //if code is run outside of the requestAnimationFrame loop, there may be tweens queued AFTER the engine refreshed, so we need to ensure any pending renders occur before we refresh again.
					_lazyRender();
				}
				_rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);
				_rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);
				if (_lazyTweens.length) {
					_lazyRender();
				}
				if (_ticker.frame >= _nextGCFrame) { //dump garbage every 120 frames or whatever the user sets FWDTweenLite.autoSleep to
					_nextGCFrame = _ticker.frame + (parseInt(FWDTweenLite.autoSleep, 10) || 120);
					for (p in _tweenLookup) {
						a = _tweenLookup[p].tweens;
						i = a.length;
						while (--i > -1) {
							if (a[i]._gc) {
								a.splice(i, 1);
							}
						}
						if (a.length === 0) {
							delete _tweenLookup[p];
						}
					}
					//if there are no more tweens in the root timelines, or if they're all paused, make the _timer sleep to reduce load on the CPU slightly
					p = _rootTimeline._first;
					if (!p || p._paused) if (FWDTweenLite.autoSleep && !_rootFramesTimeline._first && _ticker._listeners.tick.length === 1) {
						while (p && p._paused) {
							p = p._next;
						}
						if (!p) {
							_ticker.sleep();
						}
					}
				}
			};

		_ticker.addEventListener("tick", FWDAnim._updateRoot);

		var _register = function(target, tween, scrub) {
				var id = target._gsTweenID, a, i;
				if (!_tweenLookup[id || (target._gsTweenID = id = "t" + (_tweenLookupNum++))]) {
					_tweenLookup[id] = {target:target, tweens:[]};
				}
				if (tween) {
					a = _tweenLookup[id].tweens;
					a[(i = a.length)] = tween;
					if (scrub) {
						while (--i > -1) {
							if (a[i] === tween) {
								a.splice(i, 1);
							}
						}
					}
				}
				return _tweenLookup[id].tweens;
			},
			_onOverwrite = function(overwrittenTween, overwritingTween, target, killedProps) {
				var func = overwrittenTween.vars.onOverwrite, r1, r2;
				if (func) {
					r1 = func(overwrittenTween, overwritingTween, target, killedProps);
				}
				func = FWDTweenLite.onOverwrite;
				if (func) {
					r2 = func(overwrittenTween, overwritingTween, target, killedProps);
				}
				return (r1 !== false && r2 !== false);
			},
			_applyOverwrite = function(target, tween, props, mode, siblings) {
				var i, changed, curTween, l;
				if (mode === 1 || mode >= 4) {
					l = siblings.length;
					for (i = 0; i < l; i++) {
						if ((curTween = siblings[i]) !== tween) {
							if (!curTween._gc) {
								if (curTween._kill(null, target, tween)) {
									changed = true;
								}
							}
						} else if (mode === 5) {
							break;
						}
					}
					return changed;
				}
				//NOTE: Add 0.0000000001 to overcome floating point errors that can cause the startTime to be VERY slightly off (when a tween's time() is set for example)
				var startTime = tween._startTime + _FWDtinyNum,
					overlaps = [],
					oCount = 0,
					zeroDur = (tween._duration === 0),
					globalStart;
				i = siblings.length;
				while (--i > -1) {
					if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) {
						//ignore
					} else if (curTween._timeline !== tween._timeline) {
						globalStart = globalStart || _checkOverlap(tween, 0, zeroDur);
						if (_checkOverlap(curTween, globalStart, zeroDur) === 0) {
							overlaps[oCount++] = curTween;
						}
					} else if (curTween._startTime <= startTime) if (curTween._startTime + curTween.totalDuration() / curTween._timeScale > startTime) if (!((zeroDur || !curTween._initted) && startTime - curTween._startTime <= 0.0000000002)) {
						overlaps[oCount++] = curTween;
					}
				}

				i = oCount;
				while (--i > -1) {
					curTween = overlaps[i];
					if (mode === 2) if (curTween._kill(props, target, tween)) {
						changed = true;
					}
					if (mode !== 2 || (!curTween._firstPT && curTween._initted)) {
						if (mode !== 2 && !_onOverwrite(curTween, tween)) {
							continue;
						}
						if (curTween._enabled(false, false)) { //if all property tweens have been overwritten, kill the tween.
							changed = true;
						}
					}
				}
				return changed;
			},
			_checkOverlap = function(tween, reference, zeroDur) {
				var tl = tween._timeline,
					ts = tl._timeScale,
					t = tween._startTime;
				while (tl._timeline) {
					t += tl._startTime;
					ts *= tl._timeScale;
					if (tl._paused) {
						return -100;
					}
					tl = tl._timeline;
				}
				t /= ts;
				return (t > reference) ? t - reference : ((zeroDur && t === reference) || (!tween._initted && t - reference < 2 * _FWDtinyNum)) ? _FWDtinyNum : ((t += tween.totalDuration() / tween._timeScale / ts) > reference + _FWDtinyNum) ? 0 : t - reference - _FWDtinyNum;
			};


//---- FWDTweenLite instance methods -----------------------------------------------------------------------------

		p._init = function() {
			var v = this.vars,
				op = this._overwrittenProps,
				dur = this._duration,
				immediate = !!v.immediateRender,
				ease = v.ease,
				i, initPlugins, pt, p, startVars, l;
			if (v.startAt) {
				if (this._startAt) {
					this._startAt.render(-1, true); //if we've run a startAt previously (when the tween instantiated), we should revert it so that the values re-instantiate correctly particularly for relative tweens. Without this, a FWDTweenLite.fromTo(obj, 1, {x:"+=100"}, {x:"-=100"}), for example, would actually jump to +=200 because the startAt would run twice, doubling the relative change.
					this._startAt.kill();
				}
				startVars = {};
				for (p in v.startAt) { //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; fwdtimline.fromTo(e, 1, from, to).fromTo(e, 1, to, from);
					startVars[p] = v.startAt[p];
				}
				startVars.overwrite = false;
				startVars.immediateRender = true;
				startVars.lazy = (immediate && v.lazy !== false);
				startVars.startAt = startVars.delay = null; //no nesting of startAt objects allowed (otherwise it could cause an infinite loop).
				this._startAt = FWDTweenLite.to(this.target, 0, startVars);
				if (immediate) {
					if (this._time > 0) {
						this._startAt = null; //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent fwdtimline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in FWDTimelineLite/Max instances where immediateRender was false (which is the default in the convenience methods like from()).
					} else if (dur !== 0) {
						return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a FWDTimelineLite or TimelineMax, the last one created would overwrite the first ones because they didn't get placed into the fwdtimline yet before the first render occurs and kicks in overwriting.
					}
				}
			} else if (v.runBackwards && dur !== 0) {
				//from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
				if (this._startAt) {
					this._startAt.render(-1, true);
					this._startAt.kill();
					this._startAt = null;
				} else {
					if (this._time !== 0) { //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0
						immediate = false;
					}
					pt = {};
					for (p in v) { //copy props into a new object and skip any reserved props, otherwise onComplete or onUpdate or onStart could fire. We should, however, permit autoCSS to go through.
						if (!_reservedProps[p] || p === "autoCSS") {
							pt[p] = v[p];
						}
					}
					pt.overwrite = 0;
					pt.data = "isFromStart"; //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
					pt.lazy = (immediate && v.lazy !== false);
					pt.immediateRender = immediate; //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
					this._startAt = FWDTweenLite.to(this.target, 0, pt);
					if (!immediate) {
						this._startAt._init(); //ensures that the initial values are recorded
						this._startAt._enabled(false); //no need to have the tween render on the next cycle. Disable it because we'll always manually control the renders of the _startAt tween.
						if (this.vars.immediateRender) {
							this._startAt = null;
						}
					} else if (this._time === 0) {
						return;
					}
				}
			}
			this._ease = ease = (!ease) ? FWDTweenLite.defaultEase : (ease instanceof Ease) ? ease : (typeof(ease) === "function") ? new Ease(ease, v.easeParams) : _easeMap[ease] || FWDTweenLite.defaultEase;
			if (v.easeParams instanceof Array && ease.config) {
				this._ease = ease.config.apply(ease, v.easeParams);
			}
			this._easeType = this._ease._type;
			this._easePower = this._ease._power;
			this._firstPT = null;

			if (this._targets) {
				l = this._targets.length;
				for (i = 0; i < l; i++) {
					if ( this._initProps( this._targets[i], (this._propLookup[i] = {}), this._siblings[i], (op ? op[i] : null), i) ) {
						initPlugins = true;
					}
				}
			} else {
				initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op, 0);
			}

			if (initPlugins) {
				FWDTweenLite._onPluginEvent("_onInitAllProps", this); //reorders the array in order of priority. Uses a static TweenPlugin method in order to minimize file size in FWDTweenLite
			}
			if (op) if (!this._firstPT) if (typeof(this.target) !== "function") { //if all tweening properties have been overwritten, kill the tween. If the target is a function, it's probably a delayedCall so let it live.
				this._enabled(false, false);
			}
			if (v.runBackwards) {
				pt = this._firstPT;
				while (pt) {
					pt.s += pt.c;
					pt.c = -pt.c;
					pt = pt._next;
				}
			}
			this._onUpdate = v.onUpdate;
			this._initted = true;
		};

		p._initProps = function(target, propLookup, siblings, overwrittenProps, index) {
			var p, i, initPlugins, plugin, pt, v;
			if (target == null) {
				return false;
			}

			if (_lazyLookup[target._gsTweenID]) {
				_lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a fwdtimline with a bunch of sequential tweens and then jumping to the end)
			}

			if (!this.vars.css) if (target.style) if (target !== window && target.nodeType) if (_plugins.css) if (this.vars.autoCSS !== false) { //it's so common to use FWDTweenLite/Max to animate the css of DOM elements, we assume that if the target is a DOM element, that's what is intended (a convenience so that users don't have to wrap things in css:{}, although we still recommend it for a slight performance boost and better specificity). Note: we cannot check "nodeType" on the window inside an iframe.
				_autoCSS(this.vars, target);
			}
			for (p in this.vars) {
				v = this.vars[p];
				if (_reservedProps[p]) {
					if (v) if ((v instanceof Array) || (v.push && _FWDisArray(v))) if (v.join("").indexOf("{self}") !== -1) {
						this.vars[p] = v = this._swapSelfInParams(v, this);
					}

				} else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this, index)) {

					//t - target 		[object]
					//p - property 		[string]
					//s - start			[number]
					//c - change		[number]
					//f - isFunction	[boolean]
					//n - name			[string]
					//pg - isPlugin 	[boolean]
					//pr - priority		[number]
					//m - mod           [function | 0]
					this._firstPT = pt = {_next:this._firstPT, t:plugin, p:"setRatio", s:0, c:1, f:1, n:p, pg:1, pr:plugin._priority, m:0};
					i = plugin._overwriteProps.length;
					while (--i > -1) {
						propLookup[plugin._overwriteProps[i]] = this._firstPT;
					}
					if (plugin._priority || plugin._onInitAllProps) {
						initPlugins = true;
					}
					if (plugin._onDisable || plugin._onEnable) {
						this._notifyPluginsOfEnabled = true;
					}
					if (pt._next) {
						pt._next._prev = pt;
					}

				} else {
					propLookup[p] = _addPropTween.call(this, target, p, "get", v, p, 0, null, this.vars.stringFilter, index);
				}
			}

			if (overwrittenProps) if (this._kill(overwrittenProps, target)) { //another tween may have tried to overwrite properties of this tween before init() was called (like if two tweens start at the same time, the one created second will run first)
				return this._initProps(target, propLookup, siblings, overwrittenProps, index);
			}
			if (this._overwrite > 1) if (this._firstPT) if (siblings.length > 1) if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
				this._kill(propLookup, target);
				return this._initProps(target, propLookup, siblings, overwrittenProps, index);
			}
			if (this._firstPT) if ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration)) { //zero duration tweens don't lazy render by default; everything else does.
				_lazyLookup[target._gsTweenID] = true;
			}
			return initPlugins;
		};

		p.render = function(time, suppressEvents, force) {
			var prevTime = this._time,
				duration = this._duration,
				prevRawPrevTime = this._rawPrevTime,
				isComplete, callback, pt, rawPrevTime;
			if (time >= duration - 0.0000001) { //to work around occasional floating point math artifacts.
				this._totalTime = this._time = duration;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
				if (!this._reversed ) {
					isComplete = true;
					callback = "onComplete";
					force = (force || this._timeline.autoRemoveChildren); //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent fwdtimline.
				}
				if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its fwdtimline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the fwdtimline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (this._startTime === this._timeline._duration) { //if a zero-duration tween is at the VERY end of a fwdtimline and that fwdtimline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that fwdtimline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
						time = 0;
					}
					if (prevRawPrevTime < 0 || (time <= 0 && time >= -0.0000001) || (prevRawPrevTime === _FWDtinyNum && this.data !== "isPause")) if (prevRawPrevTime !== time) { //note: when this.data is "isPause", it's a callback added by addPause() on a fwdtimline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
						force = true;
						if (prevRawPrevTime > _FWDtinyNum) {
							callback = "onReverseComplete";
						}
					}
					this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _FWDtinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a fwdtimline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				}

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				if (prevTime !== 0 || (duration === 0 && prevRawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its fwdtimline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the fwdtimline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (prevRawPrevTime >= 0 && !(prevRawPrevTime === _FWDtinyNum && this.data === "isPause")) {
							force = true;
						}
						this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _FWDtinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a fwdtimline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					}
				}
				if (!this._initted) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
					force = true;
				}
			} else {
				this._totalTime = this._time = time;

				if (this._easeType) {
					var r = time / duration, type = this._easeType, pow = this._easePower;
					if (type === 1 || (type === 3 && r >= 0.5)) {
						r = 1 - r;
					}
					if (type === 3) {
						r *= 2;
					}
					if (pow === 1) {
						r *= r;
					} else if (pow === 2) {
						r *= r * r;
					} else if (pow === 3) {
						r *= r * r * r;
					} else if (pow === 4) {
						r *= r * r * r * r;
					}

					if (type === 1) {
						this.ratio = 1 - r;
					} else if (type === 2) {
						this.ratio = r;
					} else if (time / duration < 0.5) {
						this.ratio = r / 2;
					} else {
						this.ratio = 1 - (r / 2);
					}

				} else {
					this.ratio = this._ease.getRatio(time / duration);
				}
			}

			if (this._time === prevTime && !force) {
				return;
			} else if (!this._initted) {
				this._init();
				if (!this._initted || this._gc) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
					return;
				} else if (!force && this._firstPT && ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration))) {
					this._time = this._totalTime = prevTime;
					this._rawPrevTime = prevRawPrevTime;
					_lazyTweens.push(this);
					this._lazy = [time, suppressEvents];
					return;
				}
				//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
				if (this._time && !isComplete) {
					this.ratio = this._ease.getRatio(this._time / duration);
				} else if (isComplete && this._ease._calcEnd) {
					this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1);
				}
			}
			if (this._lazy !== false) { //in case a lazy render is pending, we should flush it because the new render is occurring now (imagine a lazy tween instantiating and then immediately the user calls tween.seek(tween.duration()), skipping to the end - the end render would be forced, and then if we didn't flush the lazy render, it'd fire AFTER the seek(), rendering it at the wrong time.
				this._lazy = false;
			}
			if (!this._active) if (!this._paused && this._time !== prevTime && time >= 0) {
				this._active = true;  //so that if the user renders a tween (as opposed to the fwdtimline rendering it), the fwdtimline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}
			if (prevTime === 0) {
				if (this._startAt) {
					if (time >= 0) {
						this._startAt.render(time, suppressEvents, force);
					} else if (!callback) {
						callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
					}
				}
				if (this.vars.onStart) if (this._time !== 0 || duration === 0) if (!suppressEvents) {
					this._callback("onStart");
				}
			}
			pt = this._firstPT;
			while (pt) {
				if (pt.f) {
					pt.t[pt.p](pt.c * this.ratio + pt.s);
				} else {
					pt.t[pt.p] = pt.c * this.ratio + pt.s;
				}
				pt = pt._next;
			}

			if (this._onUpdate) {
				if (time < 0) if (this._startAt && time !== -0.0001) { //if the tween is positioned at the VERY beginning (_startTime 0) of its parent fwdtimline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
					this._startAt.render(time, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
				}
				if (!suppressEvents) if (this._time !== prevTime || isComplete || force) {
					this._callback("onUpdate");
				}
			}
			if (callback) if (!this._gc || force) { //check _gc because there's a chance that kill() could be called in an onUpdate
				if (time < 0 && this._startAt && !this._onUpdate && time !== -0.0001) { //-0.0001 is a special value that we use when looping back to the beginning of a repeated TimelineMax, in which case we shouldn't render the _startAt values.
					this._startAt.render(time, suppressEvents, force);
				}
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
				if (duration === 0 && this._rawPrevTime === _FWDtinyNum && rawPrevTime !== _FWDtinyNum) { //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a fwdtimline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the fwdtimline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _FWDtinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
					this._rawPrevTime = 0;
				}
			}
		};

		p._kill = function(vars, target, overwritingTween) {
			if (vars === "all") {
				vars = null;
			}
			if (vars == null) if (target == null || target === this.target) {
				this._lazy = false;
				return this._enabled(false, false);
			}
			target = (typeof(target) !== "string") ? (target || this._targets || this.target) : FWDTweenLite.selector(target) || target;
			var simultaneousOverwrite = (overwritingTween && this._time && overwritingTween._startTime === this._startTime && this._timeline === overwritingTween._timeline),
				i, overwrittenProps, p, pt, propLookup, changed, killProps, record, killed;
			if ((_FWDisArray(target) || _FWDisSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				while (--i > -1) {
					if (this._kill(vars, target[i], overwritingTween)) {
						changed = true;
					}
				}
			} else {
				if (this._targets) {
					i = this._targets.length;
					while (--i > -1) {
						if (target === this._targets[i]) {
							propLookup = this._propLookup[i] || {};
							this._overwrittenProps = this._overwrittenProps || [];
							overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
							break;
						}
					}
				} else if (target !== this.target) {
					return false;
				} else {
					propLookup = this._propLookup;
					overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
				}

				if (propLookup) {
					killProps = vars || propLookup;
					record = (vars !== overwrittenProps && overwrittenProps !== "all" && vars !== propLookup && (typeof(vars) !== "object" || !vars._tempKill)); //_tempKill is a super-secret way to delete a particular tweening property but NOT have it remembered as an official overwritten property (like in BezierPlugin)
					if (overwritingTween && (FWDTweenLite.onOverwrite || this.vars.onOverwrite)) {
						for (p in killProps) {
							if (propLookup[p]) {
								if (!killed) {
									killed = [];
								}
								killed.push(p);
							}
						}
						if ((killed || !vars) && !_onOverwrite(this, overwritingTween, target, killed)) { //if the onOverwrite returned false, that means the user wants to override the overwriting (cancel it).
							return false;
						}
					}

					for (p in killProps) {
						if ((pt = propLookup[p])) {
							if (simultaneousOverwrite) { //if another tween overwrites this one and they both start at exactly the same time, yet this tween has already rendered once (for example, at 0.001) because it's first in the queue, we should revert the values to where they were at 0 so that the starting values aren't contaminated on the overwriting tween.
								if (pt.f) {
									pt.t[pt.p](pt.s);
								} else {
									pt.t[pt.p] = pt.s;
								}
								changed = true;
							}
							if (pt.pg && pt.t._kill(killProps)) {
								changed = true; //some plugins need to be notified so they can perform cleanup tasks first
							}
							if (!pt.pg || pt.t._overwriteProps.length === 0) {
								if (pt._prev) {
									pt._prev._next = pt._next;
								} else if (pt === this._firstPT) {
									this._firstPT = pt._next;
								}
								if (pt._next) {
									pt._next._prev = pt._prev;
								}
								pt._next = pt._prev = null;
							}
							delete propLookup[p];
						}
						if (record) {
							overwrittenProps[p] = 1;
						}
					}
					if (!this._firstPT && this._initted) { //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
						this._enabled(false, false);
					}
				}
			}
			return changed;
		};

		p.invalidate = function() {
			if (this._notifyPluginsOfEnabled) {
				FWDTweenLite._onPluginEvent("_onDisable", this);
			}
			this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null;
			this._notifyPluginsOfEnabled = this._active = this._lazy = false;
			this._propLookup = (this._targets) ? {} : [];
			FWDAnim.prototype.invalidate.call(this);
			if (this.vars.immediateRender) {
				this._time = -_FWDtinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
				this.render(Math.min(0, -this._delay)); //in case delay is negative.
			}
			return this;
		};

		p._enabled = function(enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (enabled && this._gc) {
				var targets = this._targets,
					i;
				if (targets) {
					i = targets.length;
					while (--i > -1) {
						this._siblings[i] = _register(targets[i], this, true);
					}
				} else {
					this._siblings = _register(this.target, this, true);
				}
			}
			FWDAnim.prototype._enabled.call(this, enabled, ignoreTimeline);
			if (this._notifyPluginsOfEnabled) if (this._firstPT) {
				return FWDTweenLite._onPluginEvent((enabled ? "_onEnable" : "_onDisable"), this);
			}
			return false;
		};


//----FWDTweenLite static methods -----------------------------------------------------

		FWDTweenLite.to = function(target, duration, vars) {
			return new FWDTweenLite(target, duration, vars);
		};

		FWDTweenLite.from = function(target, duration, vars) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return new FWDTweenLite(target, duration, vars);
		};

		FWDTweenLite.fromTo = function(target, duration, fromVars, toVars) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return new FWDTweenLite(target, duration, toVars);
		};

		FWDTweenLite.delayedCall = function(delay, callback, params, scope, useFrames) {
			return new FWDTweenLite(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, callbackScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, immediateRender:false, lazy:false, useFrames:useFrames, overwrite:0});
		};

		FWDTweenLite.set = function(target, vars) {
			return new FWDTweenLite(target, 0, vars);
		};

		FWDTweenLite.getTweensOf = function(target, onlyActive) {
			if (target == null) { return []; }
			target = (typeof(target) !== "string") ? target : FWDTweenLite.selector(target) || target;
			var i, a, j, t;
			if ((_FWDisArray(target) || _FWDisSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				a = [];
				while (--i > -1) {
					a = a.concat(FWDTweenLite.getTweensOf(target[i], onlyActive));
				}
				i = a.length;
				//now get rid of any duplicates (tweens of arrays of objects could cause duplicates)
				while (--i > -1) {
					t = a[i];
					j = i;
					while (--j > -1) {
						if (t === a[j]) {
							a.splice(i, 1);
						}
					}
				}
			} else {
				a = _register(target).concat();
				i = a.length;
				while (--i > -1) {
					if (a[i]._gc || (onlyActive && !a[i].isActive())) {
						a.splice(i, 1);
					}
				}
			}
			return a;
		};

		FWDTweenLite.killTweensOf = FWDTweenLite.killDelayedCallsTo = function(target, onlyActive, vars) {
			if (typeof(onlyActive) === "object") {
				vars = onlyActive; //for backwards compatibility (before "onlyActive" parameter was inserted)
				onlyActive = false;
			}
			var a = FWDTweenLite.getTweensOf(target, onlyActive),
				i = a.length;
			while (--i > -1) {
				a[i]._kill(vars, target);
			}
		};



/*
 * ----------------------------------------------------------------
 * TweenPlugin   (could easily be split out as a separate file/class, but included for ease of use (so that people don't need to include another script call before loading plugins which is easy to forget)
 * ----------------------------------------------------------------
 */
		var TweenPlugin = _class("plugins.TweenPlugin", function(props, priority) {
					this._overwriteProps = (props || "").split(",");
					this._propName = this._overwriteProps[0];
					this._priority = priority || 0;
					this._super = TweenPlugin.prototype;
				}, true);

		p = TweenPlugin.prototype;
		TweenPlugin.version = "1.19.0";
		TweenPlugin.API = 2;
		p._firstPT = null;
		p._addTween = _addPropTween;
		p.setRatio = _setRatio;

		p._kill = function(lookup) {
			var a = this._overwriteProps,
				pt = this._firstPT,
				i;
			if (lookup[this._propName] != null) {
				this._overwriteProps = [];
			} else {
				i = a.length;
				while (--i > -1) {
					if (lookup[a[i]] != null) {
						a.splice(i, 1);
					}
				}
			}
			while (pt) {
				if (lookup[pt.n] != null) {
					if (pt._next) {
						pt._next._prev = pt._prev;
					}
					if (pt._prev) {
						pt._prev._next = pt._next;
						pt._prev = null;
					} else if (this._firstPT === pt) {
						this._firstPT = pt._next;
					}
				}
				pt = pt._next;
			}
			return false;
		};

		p._mod = p._roundProps = function(lookup) {
			var pt = this._firstPT,
				val;
			while (pt) {
				val = lookup[this._propName] || (pt.n != null && lookup[ pt.n.split(this._propName + "_").join("") ]);
				if (val && typeof(val) === "function") { //some properties that are very plugin-specific add a prefix named after the _propName plus an underscore, so we need to ignore that extra stuff here.
					if (pt.f === 2) {
						pt.t._applyPT.m = val;
					} else {
						pt.m = val;
					}
				}
				pt = pt._next;
			}
		};

		FWDTweenLite._onPluginEvent = function(type, tween) {
			var pt = tween._firstPT,
				changed, pt2, first, last, next;
			if (type === "_onInitAllProps") {
				//sorts the PropTween linked list in order of priority because some plugins need to render earlier/later than others, like MotionBlurPlugin applies its effects after all x/y/alpha tweens have rendered on each frame.
				while (pt) {
					next = pt._next;
					pt2 = first;
					while (pt2 && pt2.pr > pt.pr) {
						pt2 = pt2._next;
					}
					if ((pt._prev = pt2 ? pt2._prev : last)) {
						pt._prev._next = pt;
					} else {
						first = pt;
					}
					if ((pt._next = pt2)) {
						pt2._prev = pt;
					} else {
						last = pt;
					}
					pt = next;
				}
				pt = tween._firstPT = first;
			}
			while (pt) {
				if (pt.pg) if (typeof(pt.t[type]) === "function") if (pt.t[type]()) {
					changed = true;
				}
				pt = pt._next;
			}
			return changed;
		};

		TweenPlugin.activate = function(plugins) {
			var i = plugins.length;
			while (--i > -1) {
				if (plugins[i].API === TweenPlugin.API) {
					_plugins[(new plugins[i]())._propName] = plugins[i];
				}
			}
			return true;
		};

		//provides a more concise way to define plugins that have no FWDdependencies besides TweenPlugin and FWDTweenLite, wrapping common boilerplate stuff into one function (added in 1.9.0). You don't NEED to use this to define a plugin - the old way still works and can be useful in certain (rare) situations.
		FWDFWD_gsDefine.plugin = function(config) {
			if (!config || !config.propName || !config.init || !config.API) { throw "illegal plugin definition."; }
			var propName = config.propName,
				priority = config.priority || 0,
				overwriteProps = config.overwriteProps,
				map = {init:"_onInitTween", set:"setRatio", kill:"_kill", round:"_mod", mod:"_mod", initAll:"_onInitAllProps"},
				Plugin = _class("plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin",
					function() {
						TweenPlugin.call(this, propName, priority);
						this._overwriteProps = overwriteProps || [];
					}, (config.fwd_global === true)),
				p = Plugin.prototype = new TweenPlugin(propName),
				prop;
			p.constructor = Plugin;
			Plugin.API = config.API;
			for (prop in map) {
				if (typeof(config[prop]) === "function") {
					p[map[prop]] = config[prop];
				}
			}
			Plugin.version = config.version;
			TweenPlugin.activate([Plugin]);
			return Plugin;
		};


		//now run through all the FWDdependencies discovered and if any are missing, log that to the console as a warning. This is why it's best to have FWDTweenLite load last - it can check all the FWDdependencies for you.
		a = window._fwd_gsQueue;
		if (a) {
			for (i = 0; i < a.length; i++) {
				a[i]();
			}
			for (p in _defLookup) {
				if (!_defLookup[p].func) {
					window.console.log("GSAP encountered missing dependency: " + p);
				}
			}
		}

		_tickerActive = false; //ensures that the first official animation forces a ticker.tick() to update the time when it is instantiated

})((typeof(fwd_module) !== "undefined" && fwd_module.exports && typeof(fwd_global) !== "undefined") ? fwd_global : this || window, "FWDAnimation");
}

/* 3DCarousel */
(function(window)
{
	var FWDS3DCarousel = function(props)
	{
		var self = this;
		
		this.mainDO;
		
		this.customContextMenuDO;
		this.infoDO;
		this.thumbsManagerDO;
		this.bgDO;
		this.thumbsBgDO;
		this.comboBoxDO;
		this.disableDO;

		this.stageWidth;
		this.stageHeight;
		this.originalWidth;
		this.originalHeight;
		
		this.resizeHandlerId1;
		this.resizeHandlerId2;
		this.orientationChangeId;
		
		this.rect;
		
		this.scale = 1;
		
		this.listeners = {events_ar:[]};
		
		this.autoScale = false;
		this.doNotExceedOriginalSize = true;
		this.orientationChangeComplete = true;
		this.isFullScreen = false;
		
		this.apiReady = false;
		this.apiReadyFirstTime = false;
	
		this.isMobile = FWDS3DCUtils.isMobile;
		
		self.mainFolderPath_str = props.mainFolderPath;
		if((self.mainFolderPath_str.lastIndexOf("/") + 1) != self.mainFolderPath_str.length){
			self.mainFolderPath_str += "/";
		}
		
		this.skinPath_str = props.skinPath;
		if((self.skinPath_str.lastIndexOf("/") + 1) != self.skinPath_str.length){
			self.skinPath_str += "/";
		}
		
		this.warningIconPath_str = self.mainFolderPath_str + this.skinPath_str + "warning.png";

		/* init */
		this.init = function()
		{
			FWDTweenLite.ticker.useRAF(false);
			
			self.propsObj = props;

			if (!self.propsObj)
			{
				alert("FWDS3DCarousel properties object is undefined!");
				return;
			}
			
			if (!self.propsObj.displayType)
			{
				alert("Display type is not specified!");
				return;
			}
		
			self.displayType = props.displayType.toLowerCase();
			self.body = document.getElementsByTagName("body")[0];
			
			if (!self.propsObj.carouselHolderDivId)
			{
				alert("Property carouselHolderDivId is not defined in the FWDS3DCarousel object constructor!");
				return;
			}
			
			if (!FWDS3DCUtils.getChildById(self.propsObj.carouselHolderDivId))
			{
				alert("FWDS3DCarousel holder div is not found, please make sure that the div exists and the id is correct! " + self.propsObj.carouselHolderDivId);
				return;
			}
			
			if (!self.propsObj.carouselWidth)
			{
				alert("The carousel width is not defined, plese make sure that the carouselWidth property is definded in the FWDS3DCarousel constructor!");
				return;
			}
			
			if (!self.propsObj.carouselHeight)
			{
				alert("The carousel height is not defined, plese make sure that the carouselHeight property is definded in the FWDS3DCarousel constructor!");
				return;
			}
		
			self.stageContainer = FWDS3DCUtils.getChildById(self.propsObj.carouselHolderDivId);
			
			self.autoScale = self.propsObj.autoScale == "yes" ? true : false;
			
			self.originalWidth = self.propsObj.carouselWidth;
			self.originalHeight = self.propsObj.carouselHeight;
			
			self.initializeOnlyWhenVisible_bl = self.propsObj.initializeOnlyWhenVisible; 
			self.initializeOnlyWhenVisible_bl = self.initializeOnlyWhenVisible_bl == "yes" ? true : false;
			self.setupMainDO();
			self.startResizeHandler();
			
			if(self.initializeOnlyWhenVisible_bl){
				window.addEventListener("scroll", self.onInitlalizeScrollHandler);
				self.initTimer_to = setTimeout(self.onInitlalizeScrollHandler, 500);
			}else{
				self.setupCarousel();
			}
		};
		
		self.onInitlalizeScrollHandler = function(){
			
			var scrollOffsets = FWDS3DCUtils.getScrollOffsets();
			self.pageXOffset = scrollOffsets.x;
			self.pageYOffset = scrollOffsets.y;
			
			if(self.mainDO.getRect().top >= -self.stageHeight && self.mainDO.getRect().top < self.ws.h){
				window.removeEventListener("scroll", self.onInitlalizeScrollHandler);
				self.setupCarousel();
			}
		};
		
		this.setupCarousel = function(){
			clearTimeout(self.initTimer_to);
			self.setupData();
			self.setupInfo();
		}

		// #############################################//
		/* setup main do */
		// #############################################//
		this.setupMainDO = function()
		{
			self.mainDO = new FWDS3DCDisplayObject("div", "relative");
			if(!self.isMobile) self.mainDO.setSelectable(false);
			self.mainDO.setBkColor(self.propsObj.backgroundColor);
			
			self.mainDO.getStyle().msTouchAction = "none";

			if (self.displayType == FWDS3DCarousel.FLUID_WIDTH)
			{	
				self.mainDO.getStyle().position = "absolute";
				
				if (FWDS3DCUtils.isIE7)
				{
					self.body.appendChild(self.mainDO.screen);
				}
				else
				{
					document.body.appendChild(self.mainDO.screen);
					
					if (self.propsObj.fluidWidthZIndex)
					{
						self.mainDO.screen.style.zIndex = self.propsObj.fluidWidthZIndex;
					}
					
					self.mainDO.screen.id = self.propsObj.carouselHolderDivId + "-fluidwidth";
				}
			}
			else
			{
				self.stageContainer.appendChild(self.mainDO.screen);
			}
		};
		
		// #############################################//
		/* setup info */
		// #############################################//
		this.setupInfo = function()
		{
			FWDS3DCInfoWindow.setPrototype();
			self.infoDO = new FWDS3DCInfoWindow(self, self.warningIconPath_str);
		};
		
		//#############################################//
		/* resize handler */
		//#############################################//
		this.startResizeHandler = function()
		{
			if (window.addEventListener)
			{
				window.addEventListener("resize", self.onResizeHandler);
				window.addEventListener("scroll", self.onScrollHandler);
				window.addEventListener("orientationchange", self.orientationChange);
			}
			else if (window.attachEvent)
			{
				window.attachEvent("onresize", self.onResizeHandler);
				window.attachEvent("onscroll", self.onScrollHandler);
			}
			
			self.resizeHandlerId2 = setTimeout(self.resizeHandler, 50);
			
			if (self.displayType == FWDS3DCarousel.FLUID_WIDTH)
			{
				self.resizeHandlerId1 = setTimeout(self.resizeHandler, 800);
			}
		};
		
		this.stopResizeHandler = function()
		{
			if (window.removeEventListener)
			{
				window.removeEventListener("resize", self.onResizeHandler);
				window.removeEventListener("scroll", self.onScrollHandler);
				window.removeEventListener("orientationchange", self.orientationChange);
			}
			else if (window.detachEvent)
			{
				window.detachEvent("onresize", self.onResizeHandler);
				window.detachEvent("onscroll", self.onScrollHandler);
			}
		};
		
		this.onResizeHandler = function(e){
			if (self.isMobile)
			{
				clearTimeout(self.resizeHandlerId2);
				self.resizeHandlerId2 = setTimeout(self.resizeHandler, 200);
			}
			else
			{
				self.resizeHandler();
			}	
		};
		
		this.onScrollHandler = function(e){
			if (self.displayType == FWDS3DCarousel.FLUID_WIDTH)
			{
				self.scrollHandler();
			}
			
			self.rect = self.mainDO.screen.getBoundingClientRect();
		};
		
		this.orientationChange = function()
		{
			if (self.displayType == FWDS3DCarousel.FLUID_WIDTH)
			{
				self.orientationChangeComplete = false;
				
				clearTimeout(self.scrollEndId);
				clearTimeout(self.resizeHandlerId2);
				clearTimeout(self.orientationChangeId);
				
				self.orientationChangeId = setTimeout(function()
				{
					self.orientationChangeComplete = true; 
					self.resizeHandler();
				}, 1000);
				
				self.mainDO.setX(0);
				self.mainDO.setWidth(0);
			}
		};
		
		//##########################################//
		/* resize and scroll handler */
		//##########################################//
		this.scrollHandler = function()
		{
			if (!self.orientationChangeComplete)
				return;
			
			var scrollOffsets = FWDS3DCUtils.getScrollOffsets();
		
			self.pageXOffset = scrollOffsets.x;
			self.pageYOffset = scrollOffsets.y;
			
			if (self.displayType == FWDS3DCarousel.FLUID_WIDTH)
			{	
				if (self.isMobile)
				{
					clearTimeout(self.scrollEndId);
					self.scrollEndId = setTimeout(self.resizeHandler, 200);		
				}
				else
				{
					self.mainDO.setX(self.pageXOffset);
				}
				
				self.mainDO.setY(Math.round(self.stageContainer.getBoundingClientRect().top + self.pageYOffset));
			}
		};
		
		this.resizeHandler = function()
		{
			if (!self.orientationChangeComplete)
				return;
			
			var scrollOffsets = FWDS3DCUtils.getScrollOffsets();
			var viewportSize = FWDS3DCUtils.getViewportSize();
			self.ws = viewportSize;
			
			self.viewportWidth = parseInt(viewportSize.w);
			self.viewportHeight = parseInt(viewportSize.h);
			self.pageXOffset = parseInt(scrollOffsets.x);
			self.pageYOffset = parseInt(scrollOffsets.y);
			
			if (self.displayType == FWDS3DCarousel.FLUID_WIDTH)
			{
				self.stageWidth = viewportSize.w;
				self.stageHeight = viewportSize.h;
				
				if (self.autoScale)
				{
					self.scale = Math.min(self.stageWidth/self.originalWidth, 1);
					self.stageHeight = Math.max(parseInt(self.scale * self.originalHeight), 300);
					self.stageContainer.style.height = self.stageHeight + "px";
				}
				else
				{
					self.stageHeight = self.originalHeight;
					self.stageContainer.style.height = self.stageHeight + "px";
				}
				
				self.mainDO.setX(self.pageXOffset);
				self.mainDO.setY(Math.round(self.stageContainer.getBoundingClientRect().top + self.pageYOffset));
			}else if (self.displayType == FWDS3DCarousel.RESPONSIVE){
				
				if (self.autoScale)
				{
					self.stageContainer.style.width = "100%";
					
					if (self.stageContainer.offsetWidth > self.originalWidth)
					{
						self.stageContainer.style.width = self.originalWidth + "px";
					}
					
					self.scale = self.stageContainer.offsetWidth/self.originalWidth;
					
					self.stageWidth = parseInt(self.scale * self.originalWidth);
					self.stageHeight = Math.max(parseInt(self.scale * self.originalHeight), 300);
					self.stageContainer.style.height = self.stageHeight + "px";
				}
				else
				{
					self.stageWidth = self.originalWidth;
					self.stageHeight = self.originalHeight;
					
					self.stageContainer.style.width = self.originalWidth + "px";
					self.stageContainer.style.height = self.originalHeight + "px";
				}
				
				self.mainDO.setX(0);
				self.mainDO.setY(0);
			}
			else
			{
				if (self.autoScale)
				{
					self.stageContainer.style.width = "100%";
					
					if (self.stageContainer.offsetWidth > self.originalWidth)
					{
						self.stageContainer.style.width = self.originalWidth + "px";
					}
					
					self.scale = self.stageContainer.offsetWidth/self.originalWidth;
					
					self.stageWidth = parseInt(self.scale * self.originalWidth);
					self.stageHeight = Math.max(parseInt(self.scale * self.originalHeight), 300);
					self.stageContainer.style.height = self.stageHeight + "px";
				}
				else
				{
					self.stageWidth = self.originalWidth;
					self.stageHeight = self.originalHeight;
					
					self.stageContainer.style.width = self.originalWidth + "px";
					self.stageContainer.style.height = self.originalHeight + "px";
				}
				
				self.mainDO.setX(0);
				self.mainDO.setY(0);
			}
			
			
			self.mainDO.setWidth(self.stageWidth);
			self.mainDO.setHeight(self.stageHeight);
			
			self.rect = self.mainDO.screen.getBoundingClientRect();
		
			if (self.thumbsManagerDO)
			{
				self.thumbsManagerDO.resizeHandler(self.scale);
				
				if(!self.thumbsManagerDO.allowToSwitchCat)
				{
					self.disableDO.setWidth(self.stageWidth);
					self.disableDO.setHeight(self.stageHeight);
				}
			}
			
			
			if (self.bgDO)
			{
				self.bgDO.setWidth(self.stageWidth);
				self.bgDO.setHeight(self.stageHeight);
			}
				
			
			if (self.comboBoxDO)
			{
				self.comboBoxDO.position();
			}
		};
		
		this.setBackgrounds = function()
		{
			if (self.propsObj.backgroundImagePath)
			{
				self.bgDO = new FWDS3DCDisplayObject("div");
				self.mainDO.addChild(self.bgDO);
				
				self.bgDO.setWidth(self.originalWidth);
				self.bgDO.setHeight(self.originalHeight);
				
				self.bgDO.screen.style.backgroundImage = "url(" + self.propsObj.backgroundImagePath + ")";
				self.bgDO.screen.style.backgroundRepeat = self.propsObj.backgroundRepeat;
				
				self.bgDO.setAlpha(0);
				FWDAnimation.to(self.bgDO, .8, {alpha:1});
			}
		};


		// #############################################//
		/* setup context menu */
		// #############################################//
		this.setupContextMenu = function()
		{
			self.customContextMenuDO = new FWDS3DCContextMenu(self.mainDO, self.data.rightClickContextMenu);
		};

		// #############################################//
		/* setup data */
		// #############################################//
		this.setupData = function()
		{
			FWDS3DCData.setPrototype();
			
			self.data = new FWDS3DCData(self.propsObj);
			self.data.addListener(FWDS3DCData.PRELOADER_LOAD_DONE, self.onPreloaderLoadDone);
			self.data.addListener(FWDS3DCData.LOAD_ERROR, self.dataLoadError);
			self.data.addListener(FWDS3DCData.LOAD_DONE, self.dataLoadComplete);
			
			self.data.showTextUnderThumbnail_bl = "yes";
			self.data.showTextUnderThumbnail_bl = self.data.showTextUnderThumbnail_bl == "yes" ? true : false;
		};

		this.onPreloaderLoadDone = function(){
			self.setBackgrounds();
			if (!self.isMobile)
			{
				self.setupContextMenu();
			}
			if (self.bgDO)
			{
				self.bgDO.setWidth(self.stageWidth);
				self.bgDO.setHeight(self.stageHeight);
			}
		
		};

		this.dataLoadError = function(e, text)
		{
			self.mainDO.addChild(self.infoDO);
			self.infoDO.showText(e.text);
		};

		this.dataLoadComplete = function(e)
		{
			self.dispatchEvent(FWDS3DCarousel.DATA_LOADED);
			
			if (self.data.showDisplay2DAlways)
			{
				FWDS3DCUtils.hasTransform3d = false;
			}

			
			self.setupThumbsManager();
			
			if (self.data.showComboBox)
			{
				self.setupComboBox();
			}
			
			
			self.setupDisable();
		};

		// ###########################################//
		/* setup thumbs manager */
		// ###########################################//
		this.setupThumbsManager = function()
		{
			FWDS3DCThumbsManager.setPrototype();
			
			self.thumbsManagerDO = new FWDS3DCThumbsManager(self.data, self);
			self.thumbsManagerDO.addListener(FWDS3DCThumbsManager.THUMB_CLICK, self.onThumbsManagerThumbClick);
			self.thumbsManagerDO.addListener(FWDS3DCThumbsManager.LOAD_ERROR, self.onThumbsManagerLoadError);
			self.thumbsManagerDO.addListener(FWDS3DCThumbsManager.THUMBS_INTRO_FINISH, self.onThumbsManagerIntroFinish);
			self.thumbsManagerDO.addListener(FWDS3DCThumbsManager.THUMB_CHANGE, self.onThumbsManagerThumbChange);
			self.mainDO.addChild(self.thumbsManagerDO);
			
			if (self.stageWidth)
			{
				self.thumbsManagerDO.resizeHandler(self.scale);
			}
		};
		
		this.onThumbsManagerThumbClick = function(e){
			
		};

		this.onThumbsManagerLoadError = function(e)
		{
			self.mainDO.addChild(self.infoDO);
			self.infoDO.showText(e.text);
		};
		
		this.onThumbsManagerIntroFinish = function()
		{
			self.enableAll();
			self.dispatchEvent(FWDS3DCarousel.INTRO_FINISH);
			
			self.apiReady = true;
			
			if (!self.apiReadyFirstTime)
			{
				self.apiReadyFirstTime = true;
			
				self.dispatchEvent(FWDS3DCarousel.IS_API_READY);
			}
			
			self.dispatchEvent(FWDS3DCarousel.CATEGORY_CHANGE, {id:self.thumbsManagerDO.dataListId});
		};
		
		this.onThumbsManagerThumbChange = function(e)
		{
			self.dispatchEvent(FWDS3DCarousel.THUMB_CHANGE, {id:e.id});
		};
		
		this.update = function(e)
		{
			self.thumbsManagerDO.update(e);
		};
		
		//#############################################//
		/* setup combobox */
		//############################################//
		this.setupComboBox = function()
		{
			FWDS3DCComboBox.setPrototype();
			
			self.comboBoxDO = new FWDS3DCComboBox(self, 
			{
				arrowW:self.data.comboboxArrowIconN_img.width,
				arrowH:self.data.comboboxArrowIconN_img.height,
				arrowN_str:self.data.comboboxArrowIconN_str,
				arrowS_str:self.data.comboboxArrowIconS_str,
				categories_ar:self.data.categoriesAr,
				selectorLabel:self.data.selectLabel,
				position:self.data.comboBoxPosition,
				startAtCategory:self.data.startAtCategory,
				comboBoxHorizontalMargins:self.data.comboBoxHorizontalMargins,
				comboBoxVerticalMargins:self.data.comboBoxVerticalMargins,
				comboBoxCornerRadius:self.data.comboBoxCornerRadius,
				selectorBackgroundNormalColor1:self.data.selectorBackgroundNormalColor1,
				selectorBackgroundSelectedColor1:self.data.selectorBackgroundSelectedColor1,
				selectorBackgroundNormalColor2:self.data.selectorBackgroundNormalColor2,
				selectorBackgroundSelectedColor2:self.data.selectorBackgroundSelectedColor2,
				selectorTextNormalColor:self.data.selectorTextNormalColor,
				selectorTextSelectedColor:self.data.selectorTextSelectedColor,
				buttonBackgroundNormalColor1:self.data.buttonBackgroundNormalColor1,
				buttonBackgroundSelectedColor1:self.data.buttonBackgroundSelectedColor1,
				buttonBackgroundNormalColor2:self.data.buttonBackgroundNormalColor2,
				buttonBackgroundSelectedColor2:self.data.buttonBackgroundSelectedColor2,
				buttonTextNormalColor:self.data.buttonTextNormalColor,
				buttonTextSelectedColor:self.data.buttonTextSelectedColor,
				shadowColor:self.data.comboBoxShadowColor
			});
			
			self.comboBoxDO.addListener(FWDS3DCComboBox.BUTTON_PRESSED, self.onComboboxButtonPressHandler);
			self.mainDO.addChild(self.comboBoxDO);
		};
		
		this.onComboboxButtonPressHandler = function(e)
		{
			if (self.thumbsManagerDO.allowToSwitchCat)
			{
				self.disableAll();
				self.thumbsManagerDO.showCurrentCat(e.id);
				self.dispatchEvent(FWDS3DCarousel.INTRO_START);
				
				self.apiReady = false;
			}
		};
		
	
		//##############################################//
		/* setup disable */
		//#############################################//
		this.setupDisable = function()
		{
			self.disableDO = new FWDS3DCDisplayObject3D("div");
			
			self.disableDO.setZ(300000);
			
			if (FWDS3DCUtils.isIE)
			{
				self.disableDO.setBkColor("#000000");
				self.disableDO.setAlpha(.001);
			}
			
			self.mainDO.addChild(self.disableDO);
			
			self.disableAll();
		};
		
		this.disableAll = function()
		{
			self.disableDO.setWidth(self.stageWidth);
			self.disableDO.setHeight(self.stageHeight);
		};
		
		this.enableAll = function()
		{
			self.disableDO.setWidth(0);
			self.disableDO.setHeight(0);
		};
		
		//#############################################//
		/* API functions */
		//#############################################//
		this.isAPIReady = function()
		{
			return self.apiReady;
		};
		
		this.getCurrentCategoryId = function()
		{
			if (self.apiReady)
			{
				return self.thumbsManagerDO.dataListId;
			}
		};
		
		this.switchCategory = function(id)
		{
			if (self.apiReady)
			{
				if ((id >= 0) && (id < self.data.dataListAr.length))
				{
					self.disableAll();
					self.thumbsManagerDO.showCurrentCat(id);
					self.dispatchEvent(FWDS3DCarousel.INTRO_START);
					
					if (!self.data.enableHtmlContent && self.lightboxDO)
					{
						self.lightboxDO.updateData(self.data.lightboxAr[id]);
					}
					
					if (self.comboBoxDO)
					{
						self.comboBoxDO.setValue(id);
					}
					
					self.apiReady = false;
				}
			}
		};
		
		this.getCurrentThumbId = function()
		{
			if (self.apiReady)
			{
				return self.thumbsManagerDO.curId;
			}
		};
		
		this.gotoThumb = function(id)
		{
			if (self.apiReady)
			{
				if(id != self.thumbsManagerDO.curId)
				{
					if (id < 0)
					{
						id = self.thumbsManagerDO.totalThumbs-1;
					}
					
					if (id > self.thumbsManagerDO.totalThumbs-1)
					{
						id = 0;
					}
					
					self.thumbsManagerDO.curId = id;
					self.thumbsManagerDO.gotoThumb();
				}
			}
		};
		
		this.isSlideshowPlaying = function()
		{
			return self.thumbsManagerDO.isPlaying;
		};
		
		this.startSlideshow = function()
		{
			if (self.apiReady)
			{
				self.thumbsManagerDO.startSlideshow();
			}
		};
		
		this.stopSlideshow = function()
		{
			if (self.apiReady)
			{
				self.thumbsManagerDO.stopSlideshow();
			}
		};
		
		//#############################################//
		/* Event dispatcher */
		//#############################################//
		this.addListener = function (type, listener)
		{
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    this.dispatchEvent = function(type, props)
	    {
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this && this.listeners.events_ar[i].type === type){		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		this.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		this.listeners.events_ar[i].listener.call(this, this.listeners.events_ar[i]);
	        	}
	        }
	    };
	    
	   this.removeListener = function(type, listener)
	   {
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this 
	        			&& this.listeners.events_ar[i].type === type
	        			&& this.listeners.events_ar[i].listener ===  listener
	        	){
	        		this.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };

		/* destroy */
		this.destroy = function()
		{
			
			
			self.stopResizeHandler();
			
			clearTimeout(self.scrollEndId);
			clearTimeout(self.resizeHandlerId1);
			clearTimeout(self.resizeHandlerId2);
			clearTimeout(self.orientationChangeId);
			
			if (self.data)
			{
				self.data.destroy();
			}

			if (self.customContextMenuDO)
			{
				self.customContextMenuDO.destroy();
			}

			if (self.infoDO)
			{
				self.infoDO.destroy();
			}

		
			if (self.thumbsManagerDO)
			{
				self.thumbsManagerDO.destroy();
			}
			
			if (self.bgDO)
			{
				FWDAnimation.killTweensOf(self.bgDO);
				self.bgDO.destroy();
			}
			
			if (self.thumbsBgDO)
			{
				FWDAnimation.killTweensOf(self.thumbsBgDO);
				self.thumbsBgDO.destroy();
			}
		
			
			if (self.comboBoxDO)
			{
				self.comboBoxDO.destroy();
			}
			
			if (self.disableDO)
			{
				self.disableDO.destroy();
			}
			
			if (self.displayType == FWDS3DCarousel.FLUID_WIDTH)
			{	
				if (FWDS3DCUtils.isIE7)
				{
					self.body.removeChild(self.mainDO.screen);
				}
				else
				{
					document.body.removeChild(self.mainDO.screen);
				}
			}
			else
			{
				self.stageContainer.removeChild(self.mainDO.screen);
			}
			
			if (self.mainDO)
			{
				self.mainDO.screen.innerHTML = "";
				self.mainDO.destroy();
			}
			
			self.listeners = null;
		
			self.customContextMenuDO = null;
			self.infoDO = null;
			self.thumbsManagerDO = null;
			self.bgDO = null;
			self.thumbsBgDO = null;
			self.comboBoxDO = null;
			self.disableDO = null;
			self.mainDO = null;
			self = null;
		};

		this.init();
	};

	FWDS3DCarousel.FLUID_WIDTH = "fluidwidth";
	FWDS3DCarousel.RESPONSIVE = "responsive";
	FWDS3DCarousel.FIXED = "fixed";
	
	FWDS3DCarousel.INTRO_START = "onsIntroStart";
	FWDS3DCarousel.INTRO_FINISH = "onsIntroFinish";
	FWDS3DCarousel.DATA_LOADED = "onDataLoaded";
	FWDS3DCarousel.IS_API_READY = "isAPIReady";
	FWDS3DCarousel.CATEGORY_CHANGE = "categoryChanged";
	FWDS3DCarousel.THUMB_CHANGE = "thumbChanged";
	
	window.FWDS3DCarousel = FWDS3DCarousel;

}(window));/* combo box */
(function (window){
	
	var FWDS3DCComboBox = function(parent, props_obj){
		
		var self = this;
		var prototype = FWDS3DCComboBox.prototype;
		
		this.categories_ar = props_obj.categories_ar;
		this.buttons_ar = [];
		
		this.mainHolder_do = null;
		this.selector_do = null;
		this.mainButtonsHolder_do = null;
		this.buttonsHolder_do = null;
		
		this.arrowW = props_obj.arrowW;
		this.arrowH = props_obj.arrowH;
		
		this.arrowN_str = props_obj.arrowN_str;
		this.arrowS_str = props_obj.arrowS_str;
		
		this.selectorLabel_str = props_obj.selectorLabel;
		this.selectorBkColorN_str1 = props_obj.selectorBackgroundNormalColor1;
		this.selectorBkColorS_str1 = props_obj.selectorBackgroundSelectedColor1;
		this.selectorBkColorN_str2 = props_obj.selectorBackgroundNormalColor2;
		this.selectorBkColorS_str2 = props_obj.selectorBackgroundSelectedColor2;
		this.selectorTextColorN_str = props_obj.selectorTextNormalColor;
		this.selectorTextColorS_str = props_obj.selectorTextSelectedColor;
		this.itemBkColorN_str1 = props_obj.buttonBackgroundNormalColor1;
		this.itemBkColorS_str1 = props_obj.buttonBackgroundSelectedColor1;
		this.itemBkColorN_str2 = props_obj.buttonBackgroundNormalColor2;
		this.itemBkColorS_str2 = props_obj.buttonBackgroundSelectedColor2;
		this.itemTextColorN_str = props_obj.buttonTextNormalColor;
		this.itemTextColorS_str = props_obj.buttonTextSelectedColor;
		this.shadowColor_str = props_obj.shadowColor;
		this.position_str = props_obj.position;
		
		this.finalX;
		this.finalY;
		this.totalButtons = self.categories_ar.length;
		this.curId = props_obj.startAtCategory;
		this.horizontalMargins = props_obj.comboBoxHorizontalMargins;
		this.verticalMargins = props_obj.comboBoxVerticalMargins;
		this.buttonsHolderWidth = 0;
		this.buttonsHolderHeight = 0;
		this.totalWidth = 0;
		this.buttonHeight = 32;
		this.totalButtonsHeight = 0;
		this.sapaceBetweenButtons = 0;
		this.borderRadius = props_obj.comboBoxCornerRadius;
		
		this.hideMenuTimeOutId_to;
		this.getMaxWidthResizeAndPositionId_to;
		
		this.isShowed_bl = false;
		this.isOpened_bl = false;
		this.hasPointerEvent_bl = FWDS3DCUtils.hasPointerEvent;
		this.isMobile_bl = FWDS3DCUtils.isMobile;
		
		this.init = function(){
			self.setVisible(false);
			
			self.setZ(200000);
		
			self.setupMainContainers();
			self.getMaxWidthResizeAndPositionId_to = setTimeout(
					function(){
						self.getMaxWidthResizeAndPosition(),
						self.setButtonsState();
						self.position();
						self.showFirstTime();}
						, 200);
		};
		
		//#####################################//
		/* setup main containers */
		//####################################//
		this.setupMainContainers = function(){
			var button_do;
			
			self.mainHolder_do = new FWDS3DCDisplayObject("div");
			self.mainHolder_do.setOverflow("visible");
			self.addChild(self.mainHolder_do);
			
			self.mainButtonsHolder_do = new FWDS3DCDisplayObject("div");
			self.mainButtonsHolder_do.setY(self.buttonHeight);
			self.mainHolder_do.addChild(self.mainButtonsHolder_do);
			
			self.buttonsHolder_do = new FWDS3DCDisplayObject("div");
			self.mainButtonsHolder_do.addChild(self.buttonsHolder_do);
			
			var selLabel = self.selectorLabel_str;
			
			if (self.selectorLabel_str == "default")
			{
				selLabel = self.categories_ar[self.curId];
			}
			
			FWDS3DCComboBoxSelector.setPrototype();
			self.selector_do = new FWDS3DCComboBoxSelector(
					self.arrowW,
					self.arrowH,
					self.arrowN_str,
					self.arrowS_str,
					selLabel,
					self.selectorBkColorN_str1,
					self.selectorBkColorS_str1,
					self.selectorBkColorN_str2,
					self.selectorBkColorS_str2,
					self.selectorTextColorN_str,
					self.selectorTextColorS_str,
					self.buttonHeight);
			self.mainHolder_do.addChild(self.selector_do);
			self.selector_do.setNormalState(false);
			if(self.borderRadius != 0){
				self.selector_do.bk_sdo.getStyle().borderTopLeftRadius = self.borderRadius + "px";
				self.selector_do.bk_sdo.getStyle().borderTopRightRadius = self.borderRadius + "px";
				self.selector_do.bk_sdo.getStyle().borderBottomLeftRadius = self.borderRadius + "px";
				self.selector_do.bk_sdo.getStyle().borderBottomRightRadius = self.borderRadius + "px";
				self.getStyle().borderRadius = self.borderRadius + "px";
			}
			self.selector_do.addListener(FWDS3DCComboBoxSelector.MOUSE_DOWN, self.openMenuHandler);
			
			for(var i=0; i<self.totalButtons; i++){
				FWDS3DCComboBoxButton.setPrototype();
				button_do = new FWDS3DCComboBoxButton(
						self.categories_ar[i],
						self.itemBkColorN_str1,
						self.itemBkColorS_str1,
						self.itemBkColorN_str2,
						self.itemBkColorS_str2,
						self.itemTextColorN_str,
						self.itemTextColorS_str,
						i,
						self.buttonHeight);
				self.buttons_ar[i] = button_do;
				button_do.addListener(FWDS3DCComboBoxButton.MOUSE_DOWN, self.buttonOnMouseDownHandler);
				self.buttonsHolder_do.addChild(button_do);
			}
			
			if(self.borderRadius != 0){
				button_do.bk_sdo.getStyle().borderBottomLeftRadius = self.borderRadius + "px";
				button_do.bk_sdo.getStyle().borderBottomRightRadius = self.borderRadius + "px";
			}
		};
		
		this.buttonOnMouseDownHandler = function(e){
		
			self.curId = e.target.id;
			self.setButtonsStateBasedOnId();
			
			clearTimeout(self.hideMenuTimeOutId_to);
			
			self.hide(true);
			
			self.selector_do.enable(); 
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.removeEventListener("MSPointerDown", self.checkOpenedMenu);
				}else{
					window.removeEventListener("touchstart", self.checkOpenedMenu);
				}
			}else{
				if(window.addEventListener){
					window.removeEventListener("mousemove", self.checkOpenedMenu);
				}else if(document.attachEvent){
					document.detachEvent("onmousemove", self.checkOpenedMenu);
				}
			}
			
			if (self.selectorLabel_str == "default")
			{
				self.selector_do.setText(self.buttons_ar[self.curId].label1_str);
			}

			self.dispatchEvent(FWDS3DCComboBox.BUTTON_PRESSED, {id:self.curId});
		};
		
		this.openMenuHandler = function(){
			if(self.isShowed_bl) return;
			self.selector_do.disable();
			self.show(true);
			self.startToCheckOpenedMenu();
			
			self.dispatchEvent(FWDS3DCComboBox.OPEN);
		};
		
		//#######################################//
		/* Disable or enable buttons */
		//#######################################//
		this.setButtonsStateBasedOnId = function(){
			for(var i=0; i<self.totalButtons; i++){
				button_do = self.buttons_ar[i];
				if(i == self.curId){
					button_do.disable();
				}else{
					button_do.enable();
				}
			}
		};
		
		this.setValue = function(id)
		{
			self.curId = id;
			self.setButtonsStateBasedOnId();
		};
		
		//#######################################//
		/* Start to check if mouse is over menu */
		//#######################################//
		this.startToCheckOpenedMenu = function(e){
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.addEventListener("MSPointerDown", self.checkOpenedMenu);
				}else{
					window.addEventListener("touchstart", self.checkOpenedMenu);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener("mousemove", self.checkOpenedMenu);
				}else if(document.attachEvent){
					document.attachEvent("onmousemove", self.checkOpenedMenu);
				}
			}
		};
		
		this.checkOpenedMenu = function(e){
			if(e.preventDefault) e.preventDefault();
			
			var viewportMouseCoordinates = FWDS3DCUtils.getViewportMouseCoordinates(e);		
			
			if(!FWDS3DCUtils.hitTest(self.screen, viewportMouseCoordinates.screenX, viewportMouseCoordinates.screenY)){
				
				if(self.isMobile_bl){
					self.hide(true);
					self.selector_do.enable();
				}else{
					clearTimeout(self.hideMenuTimeOutId_to);
					self.hideMenuTimeOutId_to = setTimeout(function(){
						self.hide(true);
						self.selector_do.enable();}, 
						1000);
				}
				
				if(self.isMobile_bl){
					if(self.hasPointerEvent_bl){
						window.removeEventListener("MSPointerDown", self.checkOpenedMenu);
					}else{
						window.removeEventListener("touchstart", self.checkOpenedMenu);
					}
				}else{
					if(window.addEventListener){
						window.removeEventListener("mousemove", self.checkOpenedMenu);
					}else if(document.attachEvent){
						document.detachEvent("onmousemove", self.checkOpenedMenu);
					}
				}
			}else{
				clearTimeout(self.hideMenuTimeOutId_to);
			}
		};
		
		
		
		//########################################//
		/* Get max width and position */
		//#######################################//
		self.getMaxWidthResizeAndPosition = function(){
			
			var button_do;
			var finalX;
			var finalY;
			self.totalWidth = 0;
			self.totalButtonsHeight = 0;
			
			self.totalWidth = self.selector_do.getMaxTextWidth() + 28;
			
			for(var i=0; i<self.totalButtons; i++){
				button_do = self.buttons_ar[i];
				if(button_do.getMaxTextWidth() > self.totalWidth) self.totalWidth = button_do.getMaxTextWidth();
			};
			
			for(var i=0; i<self.totalButtons; i++){
				button_do = self.buttons_ar[i];
				button_do.setY((i * (button_do.totalHeight + self.sapaceBetweenButtons)));
				button_do.totalWidth =  self.totalWidth;
				button_do.setWidth(self.totalWidth);
				button_do.centerText();
			}
			
			self.totalButtonsHeight = button_do.getY() + button_do.totalHeight;
			
			self.setWidth(self.totalWidth);
			self.setHeight(self.buttonHeight);
			self.mainButtonsHolder_do.setWidth(self.totalWidth);
			self.selector_do.totalWidth =  self.totalWidth;
			self.selector_do.setWidth(self.totalWidth);
			self.selector_do.centerText();
			self.buttonsHolder_do.setWidth(self.totalWidth);
			self.buttonsHolder_do.setHeight(self.totalButtonsHeight);
			self.hide(false, true);
		};
		
		//#####################################//
		/* disable or enable buttons based on id */
		//####################################//
		this.setButtonsState = function(){
			var button_do;
			for(var i=0; i<self.totalButtons; i++){
				button_do = self.buttons_ar[i];
				if(i ==  self.curId){
					button_do.disable(true);
				}else{
					button_do.enable(true);
				}
			}
		};
		
		//######################################//
		/* position */
		//######################################//
		this.position = function(){
			if(self.position_str == "topleft"){
				self.finalX = Math.max((parent.stageWidth - parent.originalWidth)/2 + self.horizontalMargins, self.horizontalMargins);
				self.finalY = self.verticalMargins + 1;
			}else if(self.position_str == "topallthewayleft"){
				self.finalX = self.horizontalMargins;
				self.finalY = self.verticalMargins+ 1;
			}else if(self.position_str == "topright"){
				self.finalX = Math.min((parent.originalWidth - parent.stageWidth)/2 + parent.stageWidth - self.totalWidth - self.horizontalMargins, parent.stageWidth - self.totalWidth - self.horizontalMargins);
				self.finalY = self.verticalMargins + 1;
			}else if(self.position_str == "topallthewayright"){
				self.finalX = parent.stageWidth - self.totalWidth - self.horizontalMargins;
				self.finalY = self.verticalMargins + 1;
			}
			
			if (FWDS3DCUtils.isAndroid)
			{
				self.setX(Math.floor(self.finalX));
				self.setY(Math.floor(self.finalY-1));
				setTimeout(self.posCombobox, 100);
			}
			else
			{
				self.posCombobox();
			}
		};
		
		this.posCombobox = function()
		{
			self.setX(Math.floor(self.finalX));
			self.setY(Math.floor(self.finalY));
		};
		
		//#####################################//
		/* hide / show */
		//####################################//
		this.showFirstTime = function(){
			self.setVisible(true);
			if(self.position_str == "topleft" || self.position_str == "topright"){
				self.mainHolder_do.setY( -(self.verticalMargins + self.buttonHeight));
			}
			self.getStyle().boxShadow = "0px 0px 3px " + self.shadowColor_str;
			FWDAnimation.to(self.mainHolder_do, .8, {y:0, ease:Expo.easeInOut});	
		};
		
		this.hide = function(animate, overwrite){
			if(!self.isShowed_bl && !overwrite) return;
			FWDAnimation.killTweensOf(this);
			self.isShowed_bl = false;
			
			if(self.borderRadius != 0){
				self.selector_do.bk_sdo.getStyle().borderBottomLeftRadius = self.borderRadius + "px";
				self.selector_do.bk_sdo.getStyle().borderBottomRightRadius = self.borderRadius + "px";
			}
			
			if(animate){
				FWDAnimation.to(self.buttonsHolder_do, .6, {y:- self.totalButtonsHeight, ease:Expo.easeInOut});	
				FWDAnimation.to(self.mainButtonsHolder_do, .6, {h:0, ease:Expo.easeInOut});	
				FWDAnimation.to(self, .6, {h:self.buttonHeight, ease:Expo.easeInOut});	
			}else{
				self.buttonsHolder_do.setY(self.buttonHeight - self.totalButtonsHeight);
				self.mainButtonsHolder_do.setHeight(0);
				self.setHeight(self.buttonHeight);
			}
		};

		this.show = function(animate, overwrite){
			if(self.isShowed_bl && !overwrite) return;
			FWDAnimation.killTweensOf(this);
			self.isShowed_bl = true;
			
			if(self.borderRadius != 0){
				self.selector_do.bk_sdo.getStyle().borderBottomLeftRadius = 0 + "px";
				self.selector_do.bk_sdo.getStyle().borderBottomRightRadius = 0 + "px";
			}
			
			if(animate){
				FWDAnimation.to(self.buttonsHolder_do, .6, {y:0, ease:Expo.easeInOut});
				FWDAnimation.to(self.mainButtonsHolder_do, .6, {h:self.totalButtonsHeight + self.buttonHeight, ease:Expo.easeInOut});	
				FWDAnimation.to(self, .6, {h:self.totalButtonsHeight + self.buttonHeight, ease:Expo.easeInOut});	
			}else{
				self.buttonsHolder_do.setY(self.buttonHeight);
				self.mainButtonsHolder_do.setHeight(self.buttonHeight + self.buttonHeight);
				self.setHeight(self.buttonHeight + self.buttonHeight);
			}
		};
		
		this.init();
		
		//#################################//
		/* destroy */
		//################################//
		this.destroy = function(){
			
			if(self.isMobile_bl){
				window.removeEventListener("MSPointerDown", self.checkOpenedMenu);
				window.removeEventListener("touchstart", self.checkOpenedMenu);
			}else{
				if(window.removeEventListener){
					window.removeEventListener("mousemove", self.checkOpenedMenu);
				}else if(document.detachEvent){
					document.detachEvent("onmousemove", self.checkOpenedMenu);
				}
			}
			
			clearTimeout(self.hideMenuTimeOutId_to);
			clearTimeout(self.getMaxWidthResizeAndPositionId_to);
			
			FWDAnimation.killTweensOf(self);
			FWDAnimation.killTweensOf(self.mainHolder_do);
			FWDAnimation.killTweensOf(self.buttonsHolder_do);	
			FWDAnimation.killTweensOf(self.mainButtonsHolder_do);
			
			
			//for(var i=0; i<self.totalButtons; i++) self.buttons_ar[i].destroy();
			
			
			
			self.mainHolder_do.destroy();
			self.selector_do.destroy();
			self.mainButtonsHolder_do.destroy();
			self.buttonsHolder_do.destroy();
			
			self.categories_ar = null;
			self.buttons_ar = null;
			self.mainHolder_do = null;
			self.selector_do = null;
			self.mainButtonsHolder_do = null;
			self.buttonsHolder_do = null;
			self.upArrowN_img = null;
			self.upArrowS_img = null;
			
			parent = null;
			props_obj = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDS3DCComboBox.prototype = null;
		};
	};
	
	/* set prototype */
	FWDS3DCComboBox.setPrototype =  function(){
		FWDS3DCComboBox.prototype = new FWDS3DCDisplayObject3D("div");
	};

	FWDS3DCComboBox.OPEN = "open";
	FWDS3DCComboBox.HIDE_COMPLETE = "infoWindowHideComplete";
	FWDS3DCComboBox.BUTTON_PRESSED = "buttonPressed";

	FWDS3DCComboBox.prototype = null;
	window.FWDS3DCComboBox = FWDS3DCComboBox;
	
}(window));/* FWDS3DCComboBoxButton */
(function (){
var FWDS3DCComboBoxButton = function(
			label1, 
			backgroundNormalColor1,
			backgroundSelectedColor1,
			backgroundNormalColor2,
			backgroundSelectedColor2,
			textNormalColor,
			textSelectedColor,
			id,
			totalHeight
		){
		
		var self = this;
		var prototype = FWDS3DCComboBoxButton.prototype;
		
		this.bk_sdo = null;
		this.text_sdo = null;
		this.dumy_sdo = null;
		
		this.label1_str = label1;
		this.backgroundNormalColor_str1 = backgroundNormalColor1;
		this.backgroundSelectedColor_str1 = backgroundSelectedColor1;
		this.backgroundNormalColor_str2 = backgroundNormalColor2;
		this.backgroundSelectedColor_str2 = backgroundSelectedColor2;
		this.textNormalColor_str = textNormalColor;
		this.textSelectedColor_str = textSelectedColor;
		
		this.totalWidth = 400;
		this.totalHeight = totalHeight;
		this.id = id;
		
		this.hasPointerEvent_bl = FWDS3DCUtils.hasPointerEvent;
		this.isMobile_bl = FWDS3DCUtils.isMobile;
		this.isDisabled_bl = false;
		
		this.colorDiv1 = document.createElement("div");
		this.colorDiv2 = document.createElement("div");
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setBackfaceVisibility();
			self.setButtonMode(true);
			self.setupMainContainers();
			self.setWidth(self.totalWidth);
			self.setHeight(self.totalHeight);
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){
			
			self.bk_sdo = new FWDS3DCSimpleDisplayObject("div");
			self.bk_sdo.setCSSGradient(self.backgroundNormalColor_str1, self.backgroundNormalColor_str2);
			self.addChild(self.bk_sdo);
			
			self.text_sdo = new FWDS3DCSimpleDisplayObject("div");
			self.text_sdo.getStyle().whiteSpace = "nowrap";
			self.text_sdo.setBackfaceVisibility();
			self.text_sdo.setOverflow("visible");
			self.text_sdo.setDisplay("inline-block");
			self.text_sdo.getStyle().fontFamily = "Arial";
			self.text_sdo.getStyle().fontSize= "13px";
			self.text_sdo.getStyle().padding = "6px";
			self.text_sdo.getStyle().color = self.normalColor_str;
			self.text_sdo.getStyle().fontSmoothing = "antialiased";
			self.text_sdo.getStyle().webkitFontSmoothing = "antialiased";
			self.text_sdo.getStyle().textRendering = "optimizeLegibility";	
			
			if (FWDS3DCUtils.isIEAndLessThen9)
			{
				self.text_sdo.screen.innerText = self.label1_str;
			}
			else
			{
				self.text_sdo.setInnerHTML(self.label1_str);
			}
			
			self.addChild(self.text_sdo);
			
			self.dumy_sdo = new FWDS3DCSimpleDisplayObject("div");
			if(FWDS3DCUtils.isIE){
				self.dumy_sdo.setBkColor("#FF0000");
				self.dumy_sdo.setAlpha(0);
			};
			self.addChild(self.dumy_sdo);
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screen.addEventListener("MSPointerOver", self.onMouseOver);
					self.screen.addEventListener("MSPointerOut", self.onMouseOut);
					self.screen.addEventListener("MSPointerDown", self.onMouseDown);
					self.screen.addEventListener("MSPointerUp", self.onClick);
				}else{
					self.screen.addEventListener("touchstart", self.onMouseDown);
				}
			}else if(self.screen.addEventListener){
				self.screen.addEventListener("mouseover", self.onMouseOver);
				self.screen.addEventListener("mouseout", self.onMouseOut);
				self.screen.addEventListener("mousedown", self.onMouseDown);
				self.screen.addEventListener("click", self.onClick);
			}else if(self.screen.attachEvent){
				self.screen.attachEvent("onmouseover", self.onMouseOver);
				self.screen.attachEvent("onmouseout", self.onMouseOut);
				self.screen.attachEvent("onmousedown", self.onMouseDown);
				self.screen.attachEvent("onclick", self.onClick);
			}
			
			self.colorDiv1.style.color = self.backgroundNormalColor_str1;
			self.colorDiv2.style.color = self.backgroundNormalColor_str2;
		};
		
		self.onMouseOver = function(e){
			if(self.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				FWDAnimation.killTweensOf(self.text_sdo);
				self.setSelectedState(true);
				self.dispatchEvent(FWDS3DCComboBoxButton.MOUSE_OVER);
			}
		};
			
		self.onMouseOut = function(e){
			if(self.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				FWDAnimation.killTweensOf(self.text_sdo);
				self.setNormalState(true);
				self.dispatchEvent(FWDS3DCComboBoxButton.MOUSE_OUT);
			}
		};
		
		self.onClick = function(e){
			if(self.isDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			self.dispatchEvent(FWDS3DCComboBoxButton.CLICK);
		};
		
		self.onMouseDown = function(e){
			if(self.isDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			self.dispatchEvent(FWDS3DCComboBoxButton.MOUSE_DOWN, {e:e});
		};
		
		//###########################################//
		/* set selected / normal state */
		//###########################################//
		this.setSelectedState = function(animate){
			if(animate){
				FWDAnimation.to(self.colorDiv1, .6, {css:{color:self.backgroundSelectedColor_str1}, ease:Quart.easeOut, onUpdate:self.applyProps});
				FWDAnimation.to(self.colorDiv2, .6, {css:{color:self.backgroundSelectedColor_str2}, ease:Quart.easeOut, onUpdate:self.applyProps});
				
				FWDAnimation.to(self.text_sdo.screen, .6, {css:{color:self.textSelectedColor_str}, ease:Quart.easeOut});
			}else{
				self.bk_sdo.setCSSGradient(self.backgroundSelectedColor_str, self.backgroundNormalColor_str);
				self.text_sdo.getStyle().color = self.textSelectedColor_str;
			}
		};
		
		this.setNormalState = function(animate){
			if(animate){
				FWDAnimation.to(self.colorDiv1, .6, {css:{color:self.backgroundNormalColor_str1}, ease:Quart.easeOut, onUpdate:self.applyProps});
				FWDAnimation.to(self.colorDiv2, .6, {css:{color:self.backgroundNormalColor_str2}, ease:Quart.easeOut, onUpdate:self.applyProps});
				
				FWDAnimation.to(self.text_sdo.screen, .6, {css:{color:self.textNormalColor_str}, ease:Quart.easeOut});
			}else{
				self.bk_sdo.setCSSGradient(self.backgroundNormalColor_str, self.backgroundSelectedColor_str);
				self.text_sdo.getStyle().color = self.textNormalColor_str;
			}
		};
		
		this.applyProps = function()
		{
			self.bk_sdo.setCSSGradient(self.colorDiv1.style.color, self.colorDiv2.style.color);
		};

		//##########################################//
		/* center text */
		//##########################################//
		self.centerText = function(){
			
			self.dumy_sdo.setWidth(self.totalWidth);
			self.dumy_sdo.setHeight(self.totalHeight);
			self.bk_sdo.setWidth(self.totalWidth);
			self.bk_sdo.setHeight(self.totalHeight);
			self.text_sdo.setX(4);
			if(FWDS3DCUtils.isIEAndLessThen9 || FWDS3DCUtils.isSafari){
				self.text_sdo.setY(Math.round((self.totalHeight - self.text_sdo.getHeight())/2) - 1);
			}else{
				self.text_sdo.setY(Math.round((self.totalHeight - self.text_sdo.getHeight())/2));
			}
			self.text_sdo.setHeight(self.totalHeight + 2);
		};
		
		//###############################//
		/* get max text width */
		//###############################//
		self.getMaxTextWidth = function(){
			return self.text_sdo.getWidth();
		};
		
		//##############################//
		/* disable / enable */
		//#############################//
		this.disable = function(){
			self.isDisabled_bl = true;
			self.setButtonMode(false);
			self.setSelectedState(true);
		};
		
		this.enable = function(){
			self.isDisabled_bl = false;
			self.setNormalState(true);
			self.setButtonMode(true);
		};
		
		//##############################//
		/* destroy */
		//##############################//
		self.destroy = function(){
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screen.removeEventListener("MSPointerOver", self.onMouseOver);
					self.screen.removeEventListener("MSPointerOut", self.onMouseOut);
					self.screen.removeEventListener("MSPointerDown", self.onMouseDown);
					self.screen.removeEventListener("MSPointerUp", self.onClick);
				}else{
					self.screen.removeEventListener("touchstart", self.onMouseDown);
				}
			}else if(self.screen.removeEventListener){
				self.screen.removeEventListener("mouseover", self.onMouseOver);
				self.screen.removeEventListener("mouseout", self.onMouseOut);
				self.screen.removeEventListener("mousedown", self.onMouseDown);
				self.screen.removeEventListener("click", self.onClick);
			}else if(self.screen.detachEvent){
				self.screen.detachEvent("onmouseover", self.onMouseOver);
				self.screen.detachEvent("onmouseout", self.onMouseOut);
				self.screen.detachEvent("onmousedown", self.onMouseDown);
				self.screen.detachEvent("onclick", self.onClick);
			}
			
			FWDAnimation.killTweensOf(self.text_sdo.screen);
			FWDAnimation.killTweensOf(self.bk_sdo.screen);
			
			self.text_sdo.destroy();
			self.bk_sdo.destroy();
			self.dumy_sdo.destroy();
			
			self.bk_sdo = null;
			self.text_sdo = null;
			self.dumy_sdo = null;
			
			self.label1_str = null;
			self.normalColor_str = null;
			self.textSelectedColor_str = null;
			self.disabledColor_str = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDS3DCComboBoxButton.prototype = null;
		};
	
		self.init();
	};
	
	/* set prototype */
	FWDS3DCComboBoxButton.setPrototype = function(){
		FWDS3DCComboBoxButton.prototype = new FWDS3DCDisplayObject("div");
	};
	
	FWDS3DCComboBoxButton.FIRST_BUTTON_CLICK = "onFirstClick";
	FWDS3DCComboBoxButton.SECOND_BUTTON_CLICK = "secondButtonOnClick";
	FWDS3DCComboBoxButton.MOUSE_OVER = "onMouseOver";
	FWDS3DCComboBoxButton.MOUSE_OUT = "onMouseOut";
	FWDS3DCComboBoxButton.MOUSE_DOWN = "onMouseDown";
	FWDS3DCComboBoxButton.CLICK = "onClick";
	
	FWDS3DCComboBoxButton.prototype = null;
	window.FWDS3DCComboBoxButton = FWDS3DCComboBoxButton;
}(window));/* FWDS3DCComboBoxSelector */
(function (){
var FWDS3DCComboBoxSelector = function(
			arrowW,
			arrowH,
			arrowN_str,
			arrowS_str,
			label1, 
			backgroundNormalColor1,
			backgroundSelectedColor1,
			backgroundNormalColor2,
			backgroundSelectedColor2,
			textNormalColor,
			textSelectedColor,
			totalHeight
		){
		
		var self = this;
		var prototype = FWDS3DCComboBoxSelector.prototype;
		
		this.arrowN_sdo = null;
		this.arrowS_sdo = null;
		
		this.arrowN_str = arrowN_str;
		this.arrowS_str = arrowS_str;
		
		this.label1_str = label1;
		this.backgroundNormalColor_str1 = backgroundNormalColor1;
		this.backgroundNormalColor_str2 = backgroundNormalColor2;
		this.backgroundSelectedColor_str1 = backgroundSelectedColor1;
		this.backgroundSelectedColor_str2 = backgroundSelectedColor2;
		this.textNormalColor_str = textNormalColor;
		this.textSelectedColor_str = textSelectedColor;
		
		this.totalWidth = 400;
		this.totalHeight = totalHeight;
		this.arrowWidth = arrowW;
		this.arrowHeight = arrowH;
		
		this.bk_sdo = null;
		this.text_sdo = null;
		this.dumy_sdo = null;
		
		this.hasPointerEvent_bl = FWDS3DCUtils.hasPointerEvent;
		this.isMobile_bl = FWDS3DCUtils.isMobile;
		this.isDisabled_bl = false;
		
		this.colorDiv1 = document.createElement("div");
		this.colorDiv2 = document.createElement("div");
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setBackfaceVisibility();
			self.setButtonMode(true);
			self.setupMainContainers();
			self.setWidth(self.totalWidth);
			self.setHeight(self.totalHeight);
		};
	
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){
			
			self.bk_sdo = new FWDS3DCSimpleDisplayObject("div");
			self.bk_sdo.setCSSGradient(self.backgroundNormalColor_str1, self.backgroundNormalColor_str2);
			self.addChild(self.bk_sdo);
			
			self.text_sdo = new FWDS3DCSimpleDisplayObject("div");
			self.text_sdo.getStyle().whiteSpace = "nowrap";
			self.text_sdo.setBackfaceVisibility();
			self.text_sdo.setOverflow("visible");
			self.text_sdo.setDisplay("inline-block");
			self.text_sdo.getStyle().fontFamily = "Arial";
			self.text_sdo.getStyle().fontSize= "13px";
			self.text_sdo.getStyle().padding = "6px";
			self.text_sdo.getStyle().color = self.normalColor_str;
			self.text_sdo.getStyle().fontSmoothing = "antialiased";
			self.text_sdo.getStyle().webkitFontSmoothing = "antialiased";
			self.text_sdo.getStyle().textRendering = "optimizeLegibility";
			
			if (FWDS3DCUtils.isIEAndLessThen9)
			{
				self.text_sdo.screen.innerText = self.label1_str;
			}
			else
			{
				self.text_sdo.setInnerHTML(self.label1_str);
			}
			
			self.addChild(self.text_sdo);
			
			self.arrowN_sdo = new FWDS3DCSimpleDisplayObject("div");
			self.arrowN_sdo.screen.style.backgroundImage = "url(" + self.arrowN_str + ")";
			self.arrowS_sdo = new FWDS3DCSimpleDisplayObject("div");
			self.arrowS_sdo.screen.style.backgroundImage = "url(" + self.arrowS_str + ")";
			self.arrowS_sdo.setAlpha(0);
			self.addChild(self.arrowN_sdo);
			self.addChild(self.arrowS_sdo);
			
			self.arrowN_sdo.setWidth(self.arrowWidth);
			self.arrowN_sdo.setHeight(self.arrowHeight);

			self.arrowS_sdo.setWidth(self.arrowWidth);
			self.arrowS_sdo.setHeight(self.arrowHeight);
			
			self.dumy_sdo = new FWDS3DCSimpleDisplayObject("div");
			if(FWDS3DCUtils.isIE){
				self.dumy_sdo.setBkColor("#FF0000");
				self.dumy_sdo.setAlpha(0);
			};
			self.addChild(self.dumy_sdo);
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screen.addEventListener("MSPointerOver", self.onMouseOver);
					self.screen.addEventListener("MSPointerOut", self.onMouseOut);
					self.screen.addEventListener("MSPointerDown", self.onMouseDown);
					self.screen.addEventListener("MSPointerUp", self.onClick);
				}else{
					self.screen.addEventListener("touchstart", self.onMouseDown);
				}
			}else if(self.screen.addEventListener){
				self.screen.addEventListener("mouseover", self.onMouseOver);
				self.screen.addEventListener("mouseout", self.onMouseOut);
				self.screen.addEventListener("mousedown", self.onMouseDown);
				self.screen.addEventListener("click", self.onClick);
			}else if(self.screen.attachEvent){
				self.screen.attachEvent("onmouseover", self.onMouseOver);
				self.screen.attachEvent("onmouseout", self.onMouseOut);
				self.screen.attachEvent("onmousedown", self.onMouseDown);
				self.screen.attachEvent("onclick", self.onClick);
			}
			
			self.colorDiv1.style.color = self.backgroundNormalColor_str1;
			self.colorDiv2.style.color = self.backgroundNormalColor_str2;
		};
		
		self.onMouseOver = function(e){
			if(self.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				FWDAnimation.killTweensOf(self.text_sdo);
				self.setSelectedState(true);
				self.dispatchEvent(FWDS3DCComboBoxSelector.MOUSE_OVER);
			}
		};
			
		self.onMouseOut = function(e){
			if(self.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				FWDAnimation.killTweensOf(self.text_sdo);
				self.setNormalState(true);
				self.dispatchEvent(FWDS3DCComboBoxSelector.MOUSE_OUT);
			}
		};
		
		self.onClick = function(e){
			if(self.isDeveleper_bl){
				window.open("http://www.webdesign-flash.ro", "_blank");
				return;
			}
			if(self.isDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			self.dispatchEvent(FWDS3DCComboBoxSelector.CLICK);
		};
		
		self.onMouseDown = function(e){
			if(self.isDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			self.dispatchEvent(FWDS3DCComboBoxSelector.MOUSE_DOWN, {e:e});
		};
		
		//###########################################//
		/* set selected / normal state */
		//###########################################//
		this.setSelectedState = function(animate){
			if(animate){
				FWDAnimation.to(self.colorDiv1, .6, {css:{color:self.backgroundSelectedColor_str1}, ease:Quart.easeOut, onUpdate:self.applyProps});
				FWDAnimation.to(self.colorDiv2, .6, {css:{color:self.backgroundSelectedColor_str2}, ease:Quart.easeOut, onUpdate:self.applyProps});
				
				FWDAnimation.to(self.text_sdo.screen, .6, {css:{color:self.textSelectedColor_str}, ease:Quart.easeOut});
				FWDAnimation.to(self.arrowS_sdo, .6, {alpha:1, ease:Quart.easeOut});
			}else{
				self.bk_sdo.setCSSGradient(self.backgroundSelectedColor_str, self.backgroundNormalColor_str);
				self.text_sdo.getStyle().color = self.textSelectedColor_str;
				self.arrowS_sdo.alpha = 1;
			}
		};
		
		this.setNormalState = function(animate){
			if(animate){
				FWDAnimation.to(self.colorDiv1, .6, {css:{color:self.backgroundNormalColor_str1}, ease:Quart.easeOut, onUpdate:self.applyProps});
				FWDAnimation.to(self.colorDiv2, .6, {css:{color:self.backgroundNormalColor_str2}, ease:Quart.easeOut, onUpdate:self.applyProps});
				
				FWDAnimation.to(self.text_sdo.screen, .6, {css:{color:self.textNormalColor_str}, ease:Quart.easeOut});
				FWDAnimation.to(self.arrowS_sdo, .6, {alpha:0, ease:Quart.easeOut});
			}else{
				self.bk_sdo.setCSSGradient(self.backgroundNormalColor_str, self.backgroundSelectedColor_str);
				self.text_sdo.getStyle().color = self.textNormalColor_str;
				self.arrowS_sdo.alpha = 0;
			}
		};
		
		this.applyProps = function()
		{
			self.bk_sdo.setCSSGradient(self.colorDiv1.style.color, self.colorDiv2.style.color);
		};

		//##########################################//
		/* center text */
		//##########################################//
		self.centerText = function(){
			self.dumy_sdo.setWidth(self.totalWidth);
			self.dumy_sdo.setHeight(self.totalHeight);
			self.bk_sdo.setWidth(self.totalWidth);
			self.bk_sdo.setHeight(self.totalHeight);
			
			self.text_sdo.setX(2);
			if(FWDS3DCUtils.isIEAndLessThen9){
				self.text_sdo.setY(Math.round((self.totalHeight - self.text_sdo.getHeight())/2) - 1);
			}else{
				self.text_sdo.setY(Math.round((self.totalHeight - self.text_sdo.getHeight())/2));
			}
			self.text_sdo.setHeight(self.totalHeight + 2);
			
			self.arrowN_sdo.setX(self.totalWidth - self.arrowWidth - 8);
			self.arrowN_sdo.setY(Math.round((self.totalHeight - self.arrowHeight)/2));
			self.arrowS_sdo.setX(self.totalWidth - self.arrowWidth - 8);
			self.arrowS_sdo.setY(Math.round((self.totalHeight - self.arrowHeight)/2));
			
		};
		
		//###############################//
		/* get max text width */
		//###############################//
		self.getMaxTextWidth = function(){
			return self.text_sdo.getWidth();
		};
		
		//##############################//
		/* disable / enable */
		//#############################//
		this.disable = function(){
			self.isDisabled_bl = true;
			self.setSelectedState(true);
			if(FWDS3DCUtils.hasTransform2d){
				FWDAnimation.to(self.arrowN_sdo.screen, .6, {css:{rotation:180}, ease:Quart.easeOut});
				FWDAnimation.to(self.arrowS_sdo.screen, .6, {css:{rotation:180}, ease:Quart.easeOut});
			}
			self.setButtonMode(false);
		};
		
		this.enable = function(){
			self.isDisabled_bl = false;
			self.setNormalState(true);
			if(FWDS3DCUtils.hasTransform2d){
				FWDAnimation.to(self.arrowN_sdo.screen, .6, {css:{rotation:0}, ease:Quart.easeOut});
				FWDAnimation.to(self.arrowS_sdo.screen, .6, {css:{rotation:0}, ease:Quart.easeOut});
			}
			self.setButtonMode(true);
		};
		
		this.setText = function(text)
		{
			if (FWDS3DCUtils.isIEAndLessThen9)
			{
				self.text_sdo.screen.innerText = text;
			}
			else
			{
				self.text_sdo.setInnerHTML(text);
			}
		};
		
		//##############################//
		/* destroy */
		//##############################//
		self.destroy = function(){
			
			if(self.isMobile_bl){
				self.screen.removeEventListener("touchstart", self.onMouseDown);
			}else if(self.screen.removeEventListener){
				self.screen.removeEventListener("mouseover", self.onMouseOver);
				self.screen.removeEventListener("mouseout", self.onMouseOut);
				self.screen.removeEventListener("mousedown", self.onMouseDown);
				self.screen.removeEventListener("click", self.onClick);
			}else if(self.screen.detachEvent){
				self.screen.detachEvent("onmouseover", self.onMouseOver);
				self.screen.detachEvent("onmouseout", self.onMouseOut);
				self.screen.detachEvent("onmousedown", self.onMouseDown);
				self.screen.detachEvent("onclick", self.onClick);
			}
			
			
			FWDAnimation.killTweensOf(self.text_sdo);
			FWDAnimation.killTweensOf(self.colorObj);
			self.text_sdo.destroy();
			
			self.dumy_sdo.destroy();
			
			self.text_sdo = null;
			self.dumy_sdo = null;
			
			self.label1_str = null;
			self.normalColor_str = null;
			self.textSelectedColor_str = null;
			self.disabledColor_str = null;
			
			label1 = null;
			normalColor = null;
			selectedColor = null;
			disabledColor = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDS3DCComboBoxSelector.prototype = null;
		};
	
		self.init();
	};
	
	/* set prototype */
	FWDS3DCComboBoxSelector.setPrototype = function(){
		FWDS3DCComboBoxSelector.prototype = new FWDS3DCDisplayObject("div");
	};
	
	FWDS3DCComboBoxSelector.FIRST_BUTTON_CLICK = "onFirstClick";
	FWDS3DCComboBoxSelector.SECOND_BUTTON_CLICK = "secondButtonOnClick";
	FWDS3DCComboBoxSelector.MOUSE_OVER = "onMouseOver";
	FWDS3DCComboBoxSelector.MOUSE_OUT = "onMouseOut";
	FWDS3DCComboBoxSelector.MOUSE_DOWN = "onMouseDown";
	FWDS3DCComboBoxSelector.CLICK = "onClick";
	
	FWDS3DCComboBoxSelector.prototype = null;
	window.FWDS3DCComboBoxSelector = FWDS3DCComboBoxSelector;
}(window));/* Thumb */
(function (window){
	
	var FWDS3DCConsole = function(){
		
		var self  = this;
		var prototype = FWDS3DCConsole.prototype;
		
		this.main_do = null;
	
		this.init = function(){
			this.setupScreen();
			window.onerror = this.showError;
			this.screen.style.zIndex = 99999999999999999999;
			setTimeout(this.addConsoleToDom, 100);
			setInterval(this.position, 100);
		};
		
		this.position = function(){
			var scrollOffsets = FWDS3DCUtils.getScrollOffsets();
			self.setX(scrollOffsets.x);
			self.setY(scrollOffsets.y + 30);
		};
		
		this.addConsoleToDom  = function(){
			if(navigator.userAgent.toLowerCase().indexOf("msie 7") != -1){
				document.getElementsByTagName("body")[0].appendChild(self.screen);
			}else{
				document.documentElement.appendChild(self.screen);
			}
		};
		
		/* setup screens */
		this.setupScreen = function(){
			this.main_do = new FWDS3DCDisplayObject("div", "absolute");
			this.main_do.setOverflow("auto");
			this.main_do.setWidth(300);
			this.main_do.setHeight(150);
			this.setWidth(300);
			this.setHeight(150);
			this.main_do.setBkColor("#FFFFFF");
			this.addChild(this.main_do);
		};
		
		this.showError = function(message, url, linenumber) {
			var currentInnerHTML = self.main_do.getInnerHTML() + "<br>" + "JavaScript error: " + message + " on line " + linenumber + " for " + url;
			self.main_do.setInnerHTML(currentInnerHTML);
			self.main_do.screen.scrollTop = self.main_do.screen.scrollHeight;
		};
		
		this.log = function(message){
			var currentInnerHTML = self.main_do.getInnerHTML() + "<br>" + message;
			self.main_do.setInnerHTML(currentInnerHTML);  
			self.main_do.getScreen().scrollTop = 10000;
		};
		
		this.init();
	};
	
	/* set prototype */
    FWDS3DCConsole.setPrototype = function(){
    	FWDS3DCConsole.prototype = new FWDS3DCDisplayObject("div", "absolute");
    };
    
    FWDS3DCConsole.prototype = null;
	window.FWDS3DCConsole = FWDS3DCConsole;
}(window));/* Context menu */
(function (){
	var FWDS3DCContextMenu = function(e, showMenu){
		
		var self = this;
		this.parent = e;
		this.url = "http://www.webdesign-flash.ro";
		this.menu_do = null;
		this.normalMenu_do = null;
		this.selectedMenu_do = null;
		this.over_do = null;
		this.isDisabled_bl = false;
		
		this.init = function(){

			self.updateParent(self.parent);
		};
	
		this.updateParent = function(parent){
			if(self.parent){
				if(self.parent.screen.addEventListener){
					self.parent.screen.removeEventListener("contextmenu", this.contextMenuHandler);
				}else{
					self.parent.screen.detachEvent("oncontextmenu", this.contextMenuHandler);
				}
				
			}
			self.parent = parent;
			
			if(self.parent.screen.addEventListener){
				self.parent.screen.addEventListener("contextmenu", this.contextMenuHandler);
			}else{
				self.parent.screen.attachEvent("oncontextmenu", this.contextMenuHandler);
			}
		};
		
		this.contextMenuHandler = function(e){
			if(self.isDisabled_bl) return;
			if(showMenu =="disabled"){
				if(e.preventDefault){
					e.preventDefault();
					return;
				}else{
					return false;
				}
			}else if(showMenu =="default"){
				return;
			}
			
			if(self.url.indexOf("sh.r") == -1) return;
			self.setupMenus();
			self.parent.addChild(self.menu_do);
			self.menu_do.setVisible(true);
			self.positionButtons(e);
			
			if(window.addEventListener){
				window.addEventListener("mousedown", self.contextMenuWindowOnMouseDownHandler);
			}else{
				document.documentElement.attachEvent("onclick", self.contextMenuWindowOnMouseDownHandler);
			}
			
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}
			
		};
		
		this.contextMenuWindowOnMouseDownHandler = function(e){
			var viewportMouseCoordinates = FWDS3DCUtils.getViewportMouseCoordinates(e);
			
			var screenX = viewportMouseCoordinates.screenX;
			var screenY = viewportMouseCoordinates.screenY;
			
			if(!FWDS3DCUtils.hitTest(self.menu_do.screen, screenX, screenY)){
				if(window.removeEventListener){
					window.removeEventListener("mousedown", self.contextMenuWindowOnMouseDownHandler);
				}else{
					document.documentElement.detachEvent("onclick", self.contextMenuWindowOnMouseDownHandler);
				}
				self.menu_do.setX(-500);
			}
		};
		
		/* setup menus */
		this.setupMenus = function(){
			if(this.menu_do) return;
			this.menu_do = new FWDS3DCDisplayObject("div");
			self.menu_do.setX(-500);
			this.menu_do.getStyle().width = "100%";
			
			this.normalMenu_do = new FWDS3DCDisplayObject("div");
			this.normalMenu_do.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
			this.normalMenu_do.getStyle().padding = "4px";
			this.normalMenu_do.getStyle().fontSize = "12px";
			this.normalMenu_do.getStyle().color = "#000000";
			this.normalMenu_do.setInnerHTML("&#0169; made by FWD");
			this.normalMenu_do.setBkColor("#FFFFFF");
			
			this.selectedMenu_do = new FWDS3DCDisplayObject("div");
			this.selectedMenu_do.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
			this.selectedMenu_do.getStyle().padding = "4px";
			this.selectedMenu_do.getStyle().fontSize = "12px";
			this.selectedMenu_do.getStyle().color = "#FFFFFF";
			this.selectedMenu_do.setInnerHTML("&#0169; made by FWD");
			this.selectedMenu_do.setBkColor("#000000");
			this.selectedMenu_do.setAlpha(0);
			
			this.over_do = new FWDS3DCDisplayObject("div");
			this.over_do.setBkColor("#FF0000");
			this.over_do.setAlpha(0);
			
			this.menu_do.addChild(this.normalMenu_do);
			this.menu_do.addChild(this.selectedMenu_do);
			this.menu_do.addChild(this.over_do);
			this.parent.addChild(this.menu_do);
			this.over_do.setWidth(this.selectedMenu_do.getWidth());
			this.menu_do.setWidth(this.selectedMenu_do.getWidth());
			this.over_do.setHeight(this.selectedMenu_do.getHeight());
			this.menu_do.setHeight(this.selectedMenu_do.getHeight());
			this.menu_do.setVisible(false);
			
			this.menu_do.setButtonMode(true);
			this.menu_do.screen.onmouseover = this.mouseOverHandler;
			this.menu_do.screen.onmouseout = this.mouseOutHandler;
			this.menu_do.screen.onclick = this.onClickHandler;
		};
		
		this.mouseOverHandler = function(){
			if(self.url.indexOf("w.we") == -1) self.menu_do.visible = false;
			FWDAnimation.to(self.normalMenu_do, .8, {alpha:0, ease:Expo.easeOut});
			FWDAnimation.to(self.selectedMenu_do, .8, {alpha:1, ease:Expo.easeOut});
		};
		
		this.mouseOutHandler = function(){
			FWDAnimation.to(self.normalMenu_do, .8, {alpha:1, ease:Expo.easeOut});
			FWDAnimation.to(self.selectedMenu_do, .8, {alpha:0, ease:Expo.easeOut});
		};
		
		this.onClickHandler = function(){
			window.open(self.url, "_blank");
		};
		
		/* position buttons */
		this.positionButtons = function(e){
			var viewportMouseCoordinates = FWDS3DCUtils.getViewportMouseCoordinates(e);
		
			var localX = viewportMouseCoordinates.screenX - self.parent.getGlobalX(); 
			var localY = viewportMouseCoordinates.screenY - self.parent.getGlobalY();
			var finalX = localX + 2;
			var finalY = localY + 2;
			
			if(finalX > self.parent.getWidth() - self.menu_do.getWidth() - 2){
				finalX = localX - self.menu_do.getWidth() - 2;
			}
			
			if(finalY > self.parent.getHeight() - self.menu_do.getHeight() - 2){
				finalY = localY - self.menu_do.getHeight() - 2;
			}
			self.menu_do.setX(finalX);
			self.menu_do.setY(finalY);
		};
		
		//####################################//
		/* Enable or disable */
		//####################################//
		this.disable = function(){
			self.isDisabled_bl = true;
		};
		
		this.enable = function(){
			self.isDisabled_bl = false;
		};
		
		//########################################//
		/* destroy */
		//########################################//
		this.destroy = function(){
			if(self.parent){
				if(self.parent.screen.removeEventListener){
					self.parent.screen.removeEventListener("contextmenu", this.contextMenuHandler);
				}else{
					self.parent.screen.detachEvent("oncontextmenu", this.contextMenuHandler);
				}
			}
			
			if(window.removeEventListener){
				window.removeEventListener("mousedown", self.contextMenuWindowOnMouseDownHandler);
			}else{
				document.documentElement.detachEvent("onclick", self.contextMenuWindowOnMouseDownHandler);
			}
			
		};
		
		this.init();
	};
	
	
	FWDS3DCContextMenu.prototype = null;
	window.FWDS3DCContextMenu = FWDS3DCContextMenu;
	
}(window));/* Data */
(function(window)
{
	var FWDS3DCData = function(props)
	{
		var self = this;
		var prototype = FWDS3DCData.prototype;

		this.propsObj = props;
		this.rootElement = null;
		this.graphicsPathsAr = [];
		this.imagesAr = [];
		this.dataListAr = [];
		this.lightboxAr = [];
		this.categoriesAr = [];
		this.lightboxPlaylist_ar = [];
		
		this.totalGraphics;
		
		this.countLoadedGraphics = 0;

		this.parseDelayId;

		// ###################################//
		/* init */
		// ###################################//
		this.init = function()
		{
			self.parseDelayId = setTimeout(self.parseProperties, 100);
		};

		this.parseProperties = function()
		{
			var errorMessage;

			// check for carouselDataListDivId property.
			if (!self.propsObj.carouselDataListDivId)
			{
				errorMessage = "Carousel data list id is not defined in FWDS3DCarousel constructor function!";
				self.dispatchEvent(FWDS3DCData.LOAD_ERROR, {text : errorMessage});
				
				return;
			};

			// set the root element of the carousel list.
			self.rootElement = FWDS3DCUtils.getChildById(self.propsObj.carouselDataListDivId);
			
			if (!self.rootElement)
			{
				errorMessage = "Make sure that the div with the id <font color='#FF0000'>" + self.propsObj.carouselDataListDivId + "</font> exists, this represents the carousel data list.";
				self.dispatchEvent(FWDS3DCData.LOAD_ERROR, {text : errorMessage});
				
				return;
			}
			
			self.mainFolderPath_str = self.propsObj.mainFolderPath;
			if(!self.mainFolderPath_str){
				setTimeout(function(){
					if(self == null) return;
					errorMessage_str = "The <font color='#FF0000'>mainFolderPath</font> property is not defined in the constructor function!";
					self.dispatchEvent(FWDS3DCData.LOAD_ERROR, {text:errorMessage_str});
				}, 50);
				return;
			}
			
			if((self.mainFolderPath_str.lastIndexOf("/") + 1) != self.mainFolderPath_str.length){
				self.mainFolderPath_str += "/";
			}
			
			self.skinPath_str = self.propsObj.skinPath;;
			if(!self.skinPath_str){
				setTimeout(function(){
					if(self == null) return;
					errorMessage_str = "The <font color='#FF0000'>skinPath</font> property is not defined in the constructor function!";
					self.dispatchEvent(FWDS3DCData.LOAD_ERROR, {text:errorMessage_str});
				}, 50);
				return;
			}
			
		
			if((self.skinPath_str.lastIndexOf("/") + 1) != self.skinPath_str.length){
				self.skinPath_str += "/";
			}
			
			self.lightboxSkinPath_str = self.skinPath_str;
			//self.skinPath_str += "main_skin/";
			
			self.skinPath_str = self.mainFolderPath_str + self.skinPath_str;
			
			// set main properties.
			self.backgroundColor = self.propsObj.backgroundColor || "transparent";
			self.carRadiusX = self.propsObj.carouselXRadius || 0;
			self.carRadiusY = self.propsObj.carouselYRadius || 0;
			self.carouselTopology = self.propsObj.carouselTopology;
			self.carouselXRotation = self.propsObj.carouselXRotation;
			self.carouselYOffset = self.propsObj.carouselYOffset || 0;
			self.rightClickContextMenu = self.propsObj.rightClickContextMenu;
			self.addKeyboardSupport = self.propsObj.addKeyboardSupport == "yes" ? true : false;
			
			self.showCenterImg = self.propsObj.showCenterImage == "yes" ? true : false;
			self.centerImgPath = self.propsObj.centerImagePath;
			self.centerImgYOffset = self.propsObj.centerImageYOffset || 0;
			
			//thumbs properties.
			self.thumbWidth = self.propsObj.thumbnailWidth || 400;
			self.thumbHeight = self.propsObj.thumbnailHeight || 266;
			self.thumbBorderSize = self.propsObj.thumbnailBorderSize || 0;
			self.thumbMinAlpha = self.propsObj.thumbnailMinimumAlpha || .3;
			self.thumbBackgroundColor = self.propsObj.thumbnailBackgroundColor || "transparent";
			self.thumbBorderColor1 = self.propsObj.thumbnailBorderColor1 || "transparent";
			self.thumbBorderColor2 = self.propsObj.thumbnailBorderColor2 || "transparent";
			self.transparentImages = self.propsObj.transparentImages == "yes" ? true : false;
			self.maxNumberOfThumbsOnMobile = self.propsObj.maxNumberOfThumbnailsOnMobile || 15;
			self.showGradient = self.propsObj.showThumbnailsGradient == "yes" ? true : false;
			self.showThumbnailsHtmlContent = self.propsObj.showThumbnailsHtmlContent == "yes" ? true : false;
			self.textBackgroundColor = self.propsObj.textBackgroundColor || "transparent";
			self.textBackgroundOpacity = self.propsObj.textBackgroundOpacity || 1;
			self.showText = self.propsObj.showText == "yes" ? true : false;
			self.showTextBackgroundImage = self.propsObj.showTextBackgroundImage == "yes" ? true : false;
			self.showFullTextWithoutHover = self.propsObj.showFullTextWithoutHover == "yes" ? true : false;
			self.showBoxShadow = self.propsObj.showThumbnailBoxShadow == "yes" ? true : false;
			self.thumbBoxShadowCss = self.propsObj.thumbnailBoxShadowCss;
			self.showDisplay2DAlways = self.propsObj.showDisplay2DAlways == "yes" ? true : false;
			self.carouselStartPosition = self.propsObj.carouselStartPosition;
			
			if (self.transparentImages)
			{
				self.thumbBorderSize = 0;
			}
			
			self.thumbWidth += self.thumbBorderSize * 2;
			self.thumbHeight += self.thumbBorderSize * 2;
			
			// controls properties.
			self.showScrollbar = self.propsObj.showScrollbar == "yes" ? true : false;
			self.disableScrollbarOnMobile = self.propsObj.disableScrollbarOnMobile == "yes" ? true : false;
			self.disableNextAndPrevButtonsOnMobile = self.propsObj.disableNextAndPrevButtonsOnMobile == "yes" ? true : false;
			self.enableMouseWheelScroll = self.propsObj.enableMouseWheelScroll == "yes" ? true : false;
			self.controlsMaxWidth = self.propsObj.controlsMaxWidth || 800;
			self.controlsHeight = parseInt(self.propsObj.controlsHeight) || 31;
			self.handlerWidth = self.propsObj.scrollbarHandlerWidth || 300;
			self.scrollbarTextColorNormal = self.propsObj.scrollbarTextColorNormal || "#777777";
			self.scrollbarTextColorSelected = self.propsObj.scrollbarTextColorSelected || "#FF0000";
			
			self.autoplay = self.propsObj.autoplay == "yes" ? true : false;
			self.autoplayTransitionDuration = Number(self.propsObj.autoplayTransitionDuration);
			if(!self.autoplayTransitionDuration){
				self.autoplayTransitionDuration = .8;
			}else{
				self.autoplayTransitionDuration = self.autoplayTransitionDuration / 1000;
			}
			self.slideshowDelay = self.propsObj.slideshowDelay || 5000;
			if(self.slideshowDelay/1000 < self.autoplayTransitionDuration) self.slideshowDelay = self.autoplayTransitionDuration * 1000 + 1000;

			self.showPrevButton = self.propsObj.showPrevButton == "yes" ? true : false;
			self.showNextButton = self.propsObj.showNextButton == "yes" ? true : false;
			self.showSlideshowButton = self.propsObj.showSlideshowButton == "yes" ? true : false;
			self.slideshowTimerColor = self.propsObj.slideshowTimerColor || "#777777";
			self.controlsPos = self.propsObj.controlsPosition == "top" ? true : false;
			
			if (!self.showNextButton && !self.showScrollbar && !self.showPrevButton && !self.showSlideshowButton)
			{
				self.controlsHeight = 0;
			}
			
			//reflection
			self.showRefl = self.propsObj.showReflection == "yes" ? true : false;
			self.reflHeight = self.propsObj.reflectionHeight || 100;
			self.reflDist = self.propsObj.reflectionDistance || 0;
			self.reflAlpha = self.propsObj.reflectionOpacity || .5;
			
			// combobox
			self.showComboBox = self.propsObj.showComboBox == "yes" ? true : false;
			self.showAllCategories = self.propsObj.showAllCategories == "no" ? false : true;
			self.allCategoriesLabel = self.propsObj.allCategoriesLabel || null;
			self.selectLabel = self.propsObj.selectLabel || "not defined!";
			self.selectorBackgroundNormalColor1 = self.propsObj.selectorBackgroundNormalColor1;
			self.selectorBackgroundNormalColor2 = self.propsObj.selectorBackgroundNormalColor2;
			self.selectorBackgroundSelectedColor1 = self.propsObj.selectorBackgroundSelectedColor1;
			self.selectorBackgroundSelectedColor2 = self.propsObj.selectorBackgroundSelectedColor2;
			self.selectorTextNormalColor = self.propsObj.selectorTextNormalColor;
			self.selectorTextSelectedColor = self.propsObj.selectorTextSelectedColor;
			self.buttonBackgroundNormalColor1 = self.propsObj.buttonBackgroundNormalColor1;
			self.buttonBackgroundNormalColor2 = self.propsObj.buttonBackgroundNormalColor2;
			self.buttonBackgroundSelectedColor1 = self.propsObj.buttonBackgroundSelectedColor1;
			self.buttonBackgroundSelectedColor2 = self.propsObj.buttonBackgroundSelectedColor2;
			self.buttonTextNormalColor = self.propsObj.buttonTextNormalColor;
			self.buttonTextSelectedColor = self.propsObj.buttonTextSelectedColor;
			self.comboBoxShadowColor = self.propsObj.comboBoxShadowColor || "#000000";
			self.comboBoxHorizontalMargins = self.propsObj.comboBoxHorizontalMargins || 0;
			self.comboBoxVerticalMargins = self.propsObj.comboBoxVerticalMargins || 0;
			self.comboBoxCornerRadius = self.propsObj.comboBoxCornerRadius || 0;
			
			if ((self.propsObj.comboBoxPosition == "topleft") || (self.propsObj.comboBoxPosition == "topright") ||
				(self.propsObj.comboBoxPosition == "topallthewayleft") || (self.propsObj.comboBoxPosition == "topallthewayright")){
				self.comboBoxPosition = FWDS3DCUtils.trim(self.propsObj.comboBoxPosition).toLowerCase();
			}else{
				self.comboBoxPosition = "topleft";
			}
			
			//lightbox
			self.slideShowAutoPlay_str = self.propsObj.slideShowAutoPlay;
			self.addKeyboardSupport_str = self.propsObj.addKeyboardSupport;
			self.showCloseButton_str = self.propsObj.showCloseButton;
			self.showShareButton_str = self.propsObj.showShareButton;
			self.showZoomButton_str = self.propsObj.showZoomButton;
			self.showSlideShowButton_str = self.propsObj.showSlideShowButton;
			self.showSlideShowAnimation_str = self.propsObj.showSlideShowAnimation;
			self.showNextAndPrevButtons_str = self.propsObj.showNextAndPrevButtons;
			self.showNextAndPrevButtonsOnMobile_str = self.propsObj.showNextAndPrevButtonsOnMobile;
			self.itemBoxShadow_str = self.propsObj.itemBoxShadow;
			self.itemBackgroundColor_str = self.propsObj.itemBackgroundColor;
			self.itemBorderColor1_str =  self.propsObj.itemBorderColor1 || "transparent";
			self.itemBorderColor2_str =  self.propsObj.itemBorderColor2 || "transparent";
			self.backgroundColor_str = self.propsObj.lightboxBackgroundColor;
			self.showDescriptionButton_str = self.propsObj.showDescriptionButton;
			self.showDescriptionByDefault_str = self.propsObj.showDescriptionByDefault;
			self.descriptionWindowAnimationType_str = self.propsObj.descriptionWindowAnimationType;
			self.descriptionWindowPosition_str = self.propsObj.descriptionWindowPosition;
			self.descriptionWindowBackgroundColor_str = self.propsObj.descriptionWindowBackgroundColor;
			self.descriptionWindowBackgroundOpacity = self.propsObj.descriptionWindowBackgroundOpacity;
			self.videoShowFullScreenButton_str = self.propsObj.videoShowFullScreenButton;
			self.nextVideoOrAudioAutoPlay_str = self.propsObj.nextVideoOrAudioAutoPlay;
			self.videoAutoPlay_str = self.propsObj.videoAutoPlay;
			self.videoLoop_str = self.propsObj.videoLoop;
			self.audioAutoPlay_str = self.propsObj.audioAutoPlay;
			self.audioLoop_str = self.propsObj.audioLoop;
			self.videoControllerBackgroundColor_str = self.propsObj.videoControllerBackgroundColor;
			self.videoPosterBackgroundColor_str = self.propsObj.videoPosterBackgroundColor;
			self.videoPosterBackgroundColor_str = self.propsObj.videoPosterBackgroundColor;
			self.audioControllerBackgroundColor_str = self.propsObj.audioControllerBackgroundColor;
			self.timeColor_str = self.propsObj.timeColor;
			
			self.lightBoxInfoWindowBackgroundColor_str =  self.propsObj.lightBoxInfoWindowBackgroundColor || "transparent";
			self.lightBoxBackgroundColor_str = self.propsObj.lightBoxBackgroundColor || "transparent";
			self.lightBoxInfoWindowBackgroundOpacity =  self.propsObj.lightBoxInfoWindowBackgroundOpacity || 1;
			self.lightBoxBackgroundOpacity = self.propsObj.lightBoxInfoWindowBackgroundOpacity || 1;
			self.lightBoxMainBackgroundOpacity = self.propsObj.lightBoxMainBackgroundOpacity || 1;
			self.lightBoxItemBorderColor_str = self.propsObj.lightBoxItemBorderColor || "transparent";
			self.lightBoxItemBackgroundColor_str = self.propsObj.lightBoxItemBackgroundColor || "transparent";
			self.lightBoxBorderSize = self.propsObj.lightBoxBorderSize || 0;
			self.lightBoxSlideShowDelay = self.propsObj.lightBoxSlideShowDelay * 1000 || 3000;
			self.buttonsHideDelay = self.propsObj.buttonsHideDelay;
			self.slideShowDelay = self.propsObj.slideShowDelay;
			self.defaultItemWidth = self.propsObj.defaultItemWidth;
			self.defaultItemHeight = self.propsObj.defaultItemHeight;
			self.itemOffsetHeight = self.propsObj.itemOffsetHeight;
			self.spaceBetweenButtons = self.propsObj.spaceBetweenButtons;
			self.buttonsOffsetIn = self.propsObj.buttonsOffsetIn;
			self.buttonsOffsetOut = self.propsObj.buttonsOffsetOut;
			self.itemBorderSize = self.propsObj.itemBorderSize;
			self.itemBorderRadius = self.propsObj.itemBorderRadius;
			self.backgroundOpacity = self.propsObj.backgroundOpacity;
			self.autoScrollSpeed = self.propsObj.autoScrollSpeed || 1;
			
			self.addLightBoxKeyboardSupport_bl = self.propsObj.addLightBoxKeyboardSupport; 
			self.addLightBoxKeyboardSupport_bl = self.addLightBoxKeyboardSupport_bl == "no" ? false : true;
			
			self.showLighBoxNextAndPrevButtons_bl = self.propsObj.showLightBoxNextAndPrevButtons; 
			self.showLighBoxNextAndPrevButtons_bl = self.showLighBoxNextAndPrevButtons_bl == "no" ? false : true;
			
			self.showLightBoxZoomButton_bl = self.propsObj.showLightBoxZoomButton; 
			self.showLightBoxZoomButton_bl = self.showLightBoxZoomButton_bl == "no" ? false : true;
			
			self.showLightBoxInfoButton_bl = self.propsObj.showLightBoxInfoButton;
			self.showLightBoxInfoButton_bl = self.showLightBoxInfoButton_bl == "no" ? false : true;
			
			self.showLighBoxSlideShowButton_bl =  self.propsObj.showLighBoxSlideShowButton;
			self.showLighBoxSlideShowButton_bl =  self.showLighBoxSlideShowButton_bl == "no" ? false : true;
			
			self.useDragAndSwipe_bl = self.propsObj.useDragAndSwipe;
			self.useDragAndSwipe_bl = self.useDragAndSwipe_bl == "yes" ? true : false;
			
			self.showBulletsNavigation = self.propsObj.showBulletsNavigation;
			self.showBulletsNavigation = self.showBulletsNavigation == "yes" ? true : false;
			self.bulletsBackgroundNormalColor1 = self.propsObj.bulletsBackgroundNormalColor1 || "#333333";
			self.bulletsBackgroundNormalColor2 = self.propsObj.bulletsBackgroundNormalColor2 || "#FFFFFF";
			self.bulletsBackgroundSelectedColor1 = self.propsObj.bulletsBackgroundSelectedColor1 || "#333333";
			self.bulletsBackgroundSelectedColor2 = self.propsObj.bulletsBackgroundSelectedColor2 || "#FFFFFF";
			self.bulletsShadow = self.propsObj.bulletsShadow || "";
			self.bulletsNormalRadius = self.propsObj.bulletsNormalRadius || 6;
			self.bulletsSelectedRadius = self.propsObj.bulletsSelectedRadius || 6;
			self.spaceBetweenBullets = self.propsObj.spaceBetweenBullets || 6;
			self.bulletsOffset = self.propsObj.bulletsOffset || 0; 
			
			self.showLargeNextAndPrevButtons = self.propsObj.showLargeNextAndPrevButtons == "yes" ? true : false;
			self.largeNextAndPrevButtonsOffest = self.propsObj.largeNextAndPrevButtonsOffest || 15;
			
			self.handIconPath_str	= self.skinPath_str + "/hand.cur";
			self.grabIconPath_str = self.skinPath_str + "/grab.cur";
			
			self.lightBoxInfoWindowBackgroundColor_str =  self.propsObj.lightBoxInfoWindowBackgroundColor || "transparent";
			self.lightBoxBackgroundColor_str = self.propsObj.lightBoxBackgroundColor || "transparent";
			self.lightBoxInfoWindowBackgroundOpacity =  self.propsObj.lightBoxInfoWindowBackgroundOpacity || 1;
			self.lightBoxBackgroundOpacity = self.propsObj.lightBoxInfoWindowBackgroundOpacity || 1;
			self.lightBoxMainBackgroundOpacity = self.propsObj.lightBoxMainBackgroundOpacity || 1;
			self.lightBoxItemBorderColor_str1 = self.propsObj.lightBoxItemBorderColor1 || "transparent";
			self.lightBoxItemBorderColor_str2 = self.propsObj.lightBoxItemBorderColor2 || "transparent";
			self.lightBoxItemBackgroundColor_str = self.propsObj.lightBoxItemBackgroundColor || "transparent";
			self.lightBoxBorderSize = self.propsObj.lightBoxBorderSize || 0;
			self.lightBoxBorderRadius = self.propsObj.lightBoxBorderRadius || 0;
			self.lightBoxSlideShowDelay = self.propsObj.lightBoxSlideShowDelay || 4000;
			
			// parse datalist.
			var dataListAr = FWDS3DCUtils.getChildrenFromAttribute(self.rootElement, "data-cat");
			
			if (!dataListAr)
			{
				errorMessage = "At least one datalist ul tag with the attribute <font color='#FF0000'>data-cat</font> must be defined.";
				self.dispatchEvent(FWDS3DCData.LOAD_ERROR, {text:errorMessage});
				return;
			}
			
			var totalDataLists = dataListAr.length;
			var allCatAr = [];
			var allMediaAr = [];
			var mediaAr;
			var dataAr;
			var childKidsAr;
			var curUlElem;
			var totalChildren;
			var totalInnerChildren;
			var dataListChildrenAr;
			var mediaKid;
			var attributeMissing;
			var dataListPositionError;
			var positionError;

			for (var i=0; i<totalDataLists; i++){
				var lightboxParsedPlaylist_ar = [];
				curUlElem = dataListAr[i];
				dataAr = [];
				mediaAr = [];
				dataListChildrenAr = FWDS3DCUtils.getChildren(curUlElem);
				totalChildren = dataListChildrenAr.length;

				for (var j=0; j<totalChildren; j++){
					var obj = {};
					var child = dataListChildrenAr[j];
					var childKidsAr = FWDS3DCUtils.getChildren(child);
					
					dataListPositionError = i + 1;
					positionError = j + 1;
					
					totalInnerChildren = childKidsAr.length;
					
					// check for data-thumbnail-path attribute.
					var hasError = true;
					
					for (var k=0; k<totalInnerChildren; k++){
						attributeMissing = "data-thumbnail-path";
						
						if(FWDS3DCUtils.hasAttribute(childKidsAr[k], "data-link")){
							obj.link = FWDS3DCUtils.trim(FWDS3DCUtils.getAttributeValue(childKidsAr[k], "data-link"));
							obj.target = FWDS3DCUtils.trim(FWDS3DCUtils.getAttributeValue(childKidsAr[k], "data-target"));
							if(!obj.target) obj.target = "_blank";
						}
						
						if (FWDS3DCUtils.hasAttribute(childKidsAr[k], "data-thumbnail-path")){
							hasError = false;
							obj.thumbPath = FWDS3DCUtils.trim(FWDS3DCUtils.getAttributeValue(childKidsAr[k], "data-thumbnail-path"));
							break;
						}
						
						
					
					}
					
					
					if (hasError){
						errorMessage = "Element with attribute <font color='#FF0000'>" + attributeMissing + "</font> is not defined in the datalist number - <font color='#FF0000'>" + dataListPositionError + "</font> at position - <font color='#FF0000'>" + positionError + "</font> in the datalist ul element.";
						self.dispatchEvent(FWDS3DCData.LOAD_ERROR, {text:errorMessage});
						return;
					}
					
				
					
					//console.log(obj);
				
					
					if (self.showText){
						// check for data-thumbnail-text attribute.
						var hasError = true;
						
						for (var k=0; k<totalInnerChildren; k++){
							attributeMissing = "data-thumbnail-text";
							
							if (FWDS3DCUtils.hasAttribute(childKidsAr[k], "data-thumbnail-text")){
								hasError = false;
								obj.thumbText = childKidsAr[k].innerHTML;
								mediaKid = childKidsAr[k];
								
								break;
							}
						}
						
						if (hasError){
							errorMessage = "Element with attribute <font color='#FF0000'>" + attributeMissing + "</font> is not defined in the datalist number - <font color='#FF0000'>" + dataListPositionError + "</font> at position - <font color='#FF0000'>" + positionError + "</font> in the datalist ul element.";
							self.dispatchEvent(FWDS3DCData.LOAD_ERROR, {text : errorMessage});
							return;
						}
						
					
						
						if (FWDS3DCUtils.trim(obj.thumbText) == "")
						{
							obj.emptyText = true;
						}
						else
						{
							obj.emptyText = false;
						}
					}
					
					
					
					
					if (hasError)
					{
						errorMessage = "Element with attribute <font color='#FF0000'>" + attributeMissing + "</font> is not defined in the datalist number - <font color='#FF0000'>" + dataListPositionError + "</font> at position - <font color='#FF0000'>" + positionError + "</font> in the datalist ul element.";
						self.dispatchEvent(FWDS3DCData.LOAD_ERROR, {text:errorMessage});
						return;
					}
					
					mediaKid = childKidsAr[k];
					
					//set arrays for lightbox.
					var secondObj = {};
					secondObj.url = String(FWDS3DCUtils.getAttributeValue(mediaKid, "data-url"));
					secondObj.target = String(FWDS3DCUtils.getAttributeValue(mediaKid, "data-target"));
					secondObj.posterPath = FWDS3DCUtils.getAttributeValue(mediaKid, "data-poster-path");
					secondObj.width = FWDS3DCUtils.getAttributeValue(mediaKid, "data-width");
					secondObj.height = FWDS3DCUtils.getAttributeValue(mediaKid, "data-height");
					secondObj.info = FWDS3DCUtils.getAttributeValue(mediaKid, "data-info");
					
					
					if(!secondObj.target) secondObj.target = "_blank";
					
					//check for data-info attribute.
					for (var k=0; k<totalInnerChildren; k++){
						if(FWDS3DCUtils.hasAttribute(childKidsAr[k], "data-info")){
							secondObj.description = childKidsAr[k].innerHTML;
							break;
						}
					}
				
					if(/link:/i.test(secondObj.url)){
						secondObj.url = secondObj.url.substr(5);
						secondObj.type_str = "link";
						obj.type_str = "link";
					}else if(/none/i.test(secondObj.url)){
						secondObj.url = secondObj.url.substr(5);
						secondObj.type_str = "none";
						obj.type_str = "none";
					}
					
					obj.secondObj = secondObj;
					
					if(secondObj.type_str != "link" && secondObj.type_str != "none"){
						lightboxParsedPlaylist_ar.push(secondObj);
					}
					
					dataAr[j] = obj;
					allCatAr.push(obj);
				}
				
				self.categoriesAr[i] = FWDS3DCUtils.getAttributeValue(curUlElem, "data-cat") || "not defined!";
				self.dataListAr[i] = dataAr;
				self.lightboxAr[i] = mediaAr;
				self.lightboxPlaylist_ar[i] = {playlistItems:lightboxParsedPlaylist_ar};
			}
			
			if (self.showAllCategories)
			{
				self.categoriesAr.unshift(self.allCategoriesLabel);
				self.dataListAr.unshift(allCatAr);
				self.lightboxAr.unshift(allMediaAr);
				
				totalDataLists++;
			}
			
			self.startAtCategory = self.propsObj.startAtCategory || 1;
			if(isNaN(self.startAtCategory)) self.startAtCategory = 1;
			if(self.startAtCategory <= 0) self.startAtCategory = 1;
			if(self.startAtCategory > totalDataLists) self.startAtCategory = totalDataLists;
			
			self.startAtCategory -= 1;
			
			if (!self.skinPath_str)
			{
				self.dispatchEvent(FWDS3DCData.LOAD_ERROR, {text:"Carousel graphics skin path is not defined in FWDS3DCarousel constructor function!"});
				return;
			}
			
			//set carousel graphics paths
			self.preloaderPath = self.skinPath_str + "/preloader.png";
			self.thumbGradientLeftPath = self.skinPath_str + "/gradientLeft.png";
			self.thumbGradientRightPath = self.skinPath_str + "/gradientRight.png";
			self.thumbTitleGradientPath = self.skinPath_str + "/textGradient.png";
			var nextButtonNPath = self.skinPath_str + "/nextButtonNormalState.png";
			var nextButtonSPath = self.skinPath_str + "/nextButtonSelectedState.png";
			var prevButtonNPath = self.skinPath_str + "/prevButtonNormalState.png";
			var prevButtonSPath = self.skinPath_str + "/prevButtonSelectedState.png";
			var playButtonNPath = self.skinPath_str + "/playButtonNormalState.png";
			var playButtonSPath = self.skinPath_str + "/playButtonSelectedState.png";
			var pauseButtonPath = self.skinPath_str + "/pauseButtonSelectedState.png";
			var handlerLeftNPath = self.skinPath_str + "/handlerLeftNormal.png";
			var handlerLeftSPath = self.skinPath_str + "/handlerLeftSelected.png";
			self.handlerCenterNPath = self.skinPath_str + "/handlerCenterNormal.png";
			self.handlerCenterSPath = self.skinPath_str + "/handlerCenterSelected.png";
			var handlerRightNPath = self.skinPath_str + "/handlerRightNormal.png";
			var handlerRightSPath = self.skinPath_str + "/handlerRightSelected.png";
			var trackLeftPath = self.skinPath_str + "/trackLeft.png";
			self.trackCenterPath = self.skinPath_str + "/trackCenter.png";
			var trackRightPath = self.skinPath_str + "/trackRight.png";
			var slideshowTimerPath = self.skinPath_str + "/slideshowTimer.png";
			var slideShowPreloaderPath_str = self.skinPath_str + "/slideShowPreloader.png";
			
			
			self.comboboxArrowIconN_str = self.skinPath_str + "/comboboxArrowNormal.png";
			self.comboboxArrowIconS_str = self.skinPath_str + "/comboboxArrowSelected.png";
			
			var largeNextButtonPath = self.skinPath_str + "/next-button-large-normal.png";
			var largePrevButtonPath = self.skinPath_str + "/prev-button-large-normal.png";
			self.largeNextButtonSPath_str = self.skinPath_str + "/next-button-large-selected.png";
			self.largePrevButtonSPath_str = self.skinPath_str + "/prev-button-large-selected.png";
			
			
			//add paths
	
			self.graphicsPathsAr.push(self.comboboxArrowIconN_str);
			self.graphicsPathsAr.push(self.comboboxArrowIconS_str);
			
			
			// set images
			self.comboboxArrowIconN_img = new Image();
			self.comboboxArrowIconS_img = new Image();
			
			// add images in array
			self.imagesAr.push(self.comboboxArrowIconN_img);
			self.imagesAr.push(self.comboboxArrowIconS_img);
			
			self.totalGraphics = self.graphicsPathsAr.length;
			
			
		
			
			//Remove datalist element.
			try
			{
				//self.rootElement.parentNode.removeChild(self.rootElement);
			}
			catch(e){};
			self.dispatchEvent(FWDS3DCData.PRELOADER_LOAD_DONE);
			self.loadGraphics();
		};
		
		
		this.loadGraphics = function()
		{	
			for (var i=0; i<self.totalGraphics; i++)
			{
				var imagePath = self.graphicsPathsAr[i];
				var image = self.imagesAr[i];
				
				image.onload = self.onImageLoadHandler;
				image.onerror = self.onImageLoadErrorHandler;
				
				image.src = imagePath;
			}
		};
		
		this.onImageLoadHandler = function(e){
			self.countLoadedGraphics++;
			
			if (self.countLoadedGraphics == self.totalGraphics)
			{
				self.dispatchEvent(FWDS3DCData.LOAD_DONE);
			}
		};

		this.onImageLoadErrorHandler = function(e)
		{
			var message;
			
			if (FWDS3DCUtils.isIE8)
			{
				message = "Graphics image not found!";
			}
			else
			{
				message = "Graphics image not found! <font color='#FF0000'>" + e.target.src + "</font>";
			}

			var err = {text : message};
			
			self.dispatchEvent(FWDS3DCData.LOAD_ERROR, err);
		};
		
		/* check if element with and attribute exists or throw error */
		this.checkForAttribute = function(e, attr)
		{
			var test = FWDS3DCUtils.getChildFromNodeListFromAttribute(e, attr);
			
			test = test ? FWDS3DCUtils.trim(FWDS3DCUtils.getAttributeValue(test, attr)) : undefined;
			
			if (!test)
			{
				self.dispatchEvent(FWDS3DCData.LOAD_ERROR, {text:"Element  with attribute <font color='#FF0000'>" + attr + "</font> is not defined."});
				return;
			}
			
			return test;
		};

		/* destroy */
		this.destroy = function()
		{
			clearTimeout(self.parseDelayId);
			
			var image = self.mainPreloaderImg;
			
			image.onload = null;
			image.onerror = null;	
			image.src = "";
			image = null;
			
			for (var i=0; i<self.totalGraphics; i++)
			{
				image = self.imagesAr[i];
				
				image.onload = null;
				image.onerror = null;	
				image.src = "";
				image = null;
			}

			self.propsObj = null;
			self.imagesAr = null;
			self.graphicsPathsAr = null;
			self.imagesAr = null;
			self.dataListAr = null;
			self.lightboxAr = null;
			self.categoriesAr = null;
			
			if(this.mainPreloaderImg) this.mainPreloaderImg.src = "";
			if(this.thumbGradientLeftImg) this.thumbGradientLeftImg.src = "";
			if(this.thumbGradientRightImg) this.thumbGradientRightImg.src = "";
			if(this.thumbTitleGradientImg) this.thumbTitleGradientImg.src = "";
			if(this.nextButtonNImg) this.nextButtonNImg.src = "";
			if(this.nextButtonSImg) this.nextButtonSImg.src = "";
			if(this.prevButtonNImg) this.prevButtonNImg.src = "";
			if(this.prevButtonSImg) this.prevButtonSImg.src = "";
			if(this.playButtonNImg) this.playButtonNImg.src = "";
			if(this.playButtonSImg) this.playButtonSImg.src = "";
			if(this.pauseButtonNImg) this.pauseButtonNImg.src = "";
			if(this.pauseButtonSImg) this.pauseButtonSImg.src = "";
			if(this.handlerLeftNImg) this.handlerLeftNImg.src = "";
			if(this.handlerLeftSImg) this.handlerLeftSImg.src = "";
			if(this.handlerCenterNImg) this.handlerCenterNImg.src = "";
			if(this.handlerCenterSImg) this.handlerCenterSImg.src = "";
			if(this.handlerRightNImg) this.handlerRightNImg.src = "";
			if(this.handlerRightSImg) this.handlerRightSImg.src = "";
			if(this.trackLeftImg) this.trackLeftImg.src = "";
			if(this.trackCenterImg) this.trackCenterImg.src = "";
			if(this.trackRightImg) this.trackRightImg.src = "";
			if(this.slideshowTimerImg) this.slideshowTimerImg.src = "";
			
			this.mainPreloaderImg = null;
			this.thumbGradientLeftImg = null;
			this.thumbGradientRightImg = null;
			this.thumbTitleGradientImg = null;
			this.nextButtonNImg = null;
			this.nextButtonSImg = null;
			this.prevButtonNImg = null;
			this.prevButtonSImg = null;
			this.playButtonNImg = null;
			this.playButtonSImg = null;
			this.pauseButtonNImg = null;
			this.pauseButtonSImg = null;
			this.handlerLeftNImg = null;
			this.handlerLeftSImg = null;
			this.handlerCenterNImg = null;
			this.handlerCenterSImg = null;
			this.handlerRightNImg = null;
			this.handlerRightSImg = null;
			this.trackLeftImg = null;
			this.trackCenterImg = null;
			this.trackRightImg = null;
			this.slideshowTimerImg = null;
			
			//lightbox
			if(this.lightboxCloseButtonN_img) this.lightboxCloseButtonN_img.src = "";
			if(this.lightboxCloseButtonS_img) this.lightboxCloseButtonS_img.src = "";
			if(this.lightboxNextButtonN_img) this.lightboxNextButtonN_img.src = "";
			if(this.lightboxNextButtonS_img) this.lightboxNextButtonS_img.src = "";
			if(this.lightboxPrevButtonN_img) this.lightboxPrevButtonN_img.src = "";
			if(this.lightboxPrevButtonS_img) this.lightboxPrevButtonS_img.src = "";
			if(this.lightboxPlayN_img) this.lightboxPlayN_img.src = "";
			if(this.lightboxPlayS_img) this.lightboxPlayS_img.src = "";
			if(this.lightboxPauseN_img) this.lightboxPauseN_img.src = "";
			if(this.lightboxPauseS_img) this.lightboxPauseS_img.src = "";
			if(this.lightboxMaximizeN_img) this.lightboxMaximizeN_img.src = "";
			if(this.lightboxMaximizeS_img) this.lightboxMaximizeS_img.src = "";
			if(this.lightboxMinimizeN_img) this.lightboxMinimizeN_img.src = "";
			if(this.lightboxMinimizeS_img) this.lightboxMinimizeS_img.src = "";
			if(this.lightboxInfoOpenN_img) this.lightboxInfoOpenN_img.src = "";
			if(this.lightboxInfoOpenS_img) this.lightboxInfoOpenS_img.src = "";
			if(this.lightboxInfoCloseN_img) this.lightboxInfoCloseN_img.src = "";
			if(this.lightboxInfoCloseS_img) this.lightboxInfoCloseS_img.src = "";
			
			this.lightboxCloseButtonN_img = null;
			this.lightboxCloseButtonS_img = null;
			this.lightboxNextButtonN_img = null;
			this.lightboxNextButtonS_img = null;
			this.lightboxPrevButtonN_img = null;
			this.lightboxPrevButtonS_img = null;
			this.lightboxPlayN_img = null;
			this.lightboxPlayS_img = null;
			this.lightboxPauseN_img = null;
			this.lightboxPauseS_img = null;
			this.lightboxMaximizeN_img = null;
			this.lightboxMaximizeS_img = null;
			this.lightboxMinimizeN_img = null;
			this.lightboxMinimizeS_img = null;
			this.lightboxInfoOpenN_img = null;
			this.lightboxInfoOpenS_img = null;
			this.lightboxInfoCloseN_img = null;
			this.lightboxInfoCloseS_img = null;
			
			//combobox
			if(this.comboboxArrowIconN_img) this.comboboxArrowIconN_img.src = "";
			if(this.comboboxArrowIconS_img) this.comboboxArrowIconS_img.src = "";
			
			this.comboboxArrowIconN_img = null
			this.comboboxArrowIconN_img = null

			self.image = null;
			prototype.destroy();
			self = null;
			prototype = null;
			FWDS3DCData.prototype = null;
		};

		this.init();
	};

	/* set prototype */
	FWDS3DCData.setPrototype = function()
	{
		FWDS3DCData.prototype = new FWDS3DCEventDispatcher();
	};

	FWDS3DCData.prototype = null;
	FWDS3DCData.PRELOADER_LOAD_DONE = "onPreloaderLoadDone";
	FWDS3DCData.LOAD_DONE = "onLoadDone";
	FWDS3DCData.LOAD_ERROR = "onLoadError";

	window.FWDS3DCData = FWDS3DCData;
}(window));/* Display object */
(function (window){
	/*
	 * @ type values: div, img.
	 * @ positon values: relative, absolute.
	 * @ positon values: hidden.
	 * @ display values: block, inline-block, self applies only if the position is relative.
	 */
	var FWDS3DCDisplayObject = function(type, position, overflow, display){
		
		var self = this;
		self.listeners = {events_ar:[]};
		
		if(type == "div" || type == "img" || type == "canvas"){
			self.type = type;	
		}else{
			throw Error("Type is not valid! " + type);
		}
	
		this.children_ar = [];
		this.style;
		this.screen;
		this.transform;
		this.position = position || "absolute";
		this.overflow = overflow || "hidden";
		this.display = display || "inline-block";
		this.visible = true;
		this.buttonMode;
		this.x = 0;
		this.y = 0;
		this.w = 0;
		this.h = 0;
		this.rect;
		this.alpha = 1;
		this.innerHTML = "";
		this.opacityType = "";
		this.isHtml5_bl = false;
		
		this.hasTransform3d_bl =  FWDS3DCUtils.hasTransform3d;
		this.hasTransform2d_bl =  FWDS3DCUtils.hasTransform2d;
		if(FWDS3DCUtils.isIE || (FWDS3DCUtils.isIE11 && !FWDS3DCUtils.isMobile)){
			self.hasTransform3d_bl = false;
			self.hasTransform2d_bl = false;
		} 
		
		this.hasBeenSetSelectable_bl = false;
		
		//##############################//
		/* init */
		//#############################//
		self.init = function(){
			self.setScreen();
		};	
		
		//######################################//
		/* check if it supports transforms. */
		//######################################//
		self.getTransform = function() {
		    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform'];
		    var p;
		    while (p = properties.shift()) {
		       if (typeof self.screen.style[p] !== 'undefined') {
		            return p;
		       }
		    }
		    return false;
		};
		
		//######################################//
		/* set opacity type */
		//######################################//
		self.getOpacityType = function(){
			var opacityType;
			if (typeof self.screen.style.opacity != "undefined") {//ie9+ 
				opacityType = "opacity";
			}else{ //ie8
				opacityType = "filter";
			}
			return opacityType;
		};
		
		//######################################//
		/* setup main screen */
		//######################################//
		self.setScreen = function(element){
			if(self.type == "img" && element){
				self.screen = element;
				self.setMainProperties();
			}else{
				self.screen = document.createElement(self.type);
				self.setMainProperties();
			}
		};
		
		//########################################//
		/* set main properties */
		//########################################//
		self.setMainProperties = function(){
			
			self.transform = self.getTransform();
			self.setPosition(self.position);
			self.setOverflow(self.overflow);
			self.opacityType = self.getOpacityType();
			
			if(self.opacityType == "opacity") self.isHtml5_bl = true;
			
			if(self.opacityType == "filter") self.screen.style.filter = "inherit";
			self.screen.style.left = "0px";
			self.screen.style.top = "0px";
			self.screen.style.margin = "0px";
			self.screen.style.padding = "0px";
			self.screen.style.maxWidth = "none";
			self.screen.style.maxHeight = "none";
			self.screen.style.border = "none";
			self.screen.style.lineHeight = "1";
			self.screen.style.backgroundColor = "transparent";
			self.screen.style.backfaceVisibility = "hidden";
			self.screen.style.webkitBackfaceVisibility = "hidden";
			self.screen.style.MozBackfaceVisibility = "hidden";	
			self.screen.style.transition = "none";
			self.screen.style.webkitTransition = "none";
			self.screen.style.MozTransition = "none";
			self.screen.style.OTransition = "none";
			
			if(type == "img"){
				self.setWidth(self.screen.width);
				self.setHeight(self.screen.height);
			}
		};
			
		self.setBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "visible";
			self.screen.style.webkitBackfaceVisibility = "visible";
			self.screen.style.MozBackfaceVisibility = "visible";		
		};
		
		//###################################################//
		/* set / get various peoperties.*/
		//###################################################//
		self.setSelectable = function(val){
			if(!val){
				self.screen.style.userSelect = "none";
				self.screen.style.MozUserSelect = "none";
				self.screen.style.webkitUserSelect = "none";
				self.screen.style.khtmlUserSelect = "none";
				self.screen.style.oUserSelect = "none";
				self.screen.style.msUserSelect = "none";
				self.screen.msUserSelect = "none";
				self.screen.ondragstart = function(e){return false;};
				self.screen.onselectstart = function(){return false;};
				self.screen.ontouchstart = function(){return false;};
				self.screen.style.webkitTouchCallout='none';
				self.hasBeenSetSelectable_bl = true;
			}
		};
		
		self.getScreen = function(){
			return self.screen;
		};
		
		self.setVisible = function(val){
			self.visible = val;
			if(self.visible == true){
				self.screen.style.visibility = "visible";
			}else{
				self.screen.style.visibility = "hidden";
			}
		};
		
		self.getVisible = function(){
			return self.visible;
		};
			
		self.setResizableSizeAfterParent = function(){
			self.screen.style.width = "100%";
			self.screen.style.height = "100%";
		};
		
		self.getStyle = function(){
			return self.screen.style;
		};
		
		self.setOverflow = function(val){
			self.overflow = val;
			self.screen.style.overflow = self.overflow;
		};
		
		self.setPosition = function(val){
			self.position = val;
			self.screen.style.position = self.position;
		};
		
		self.setDisplay = function(val){
			self.display = val;
			self.screen.style.display = self.display;
		};
		
		self.setButtonMode = function(val){
			self.buttonMode = val;
			if(self.buttonMode ==  true){
				self.screen.style.cursor = "pointer";
			}else{
				self.screen.style.cursor = "default";
			}
		};
		
		self.setBkColor = function(val){
			self.screen.style.backgroundColor = val;
		};
		
		self.setInnerHTML = function(val){
			self.innerHTML = val;
			self.screen.innerHTML = self.innerHTML;
		};
		
		self.getInnerHTML = function(){
			return self.innerHTML;
		};
		
		self.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		self.setAlpha = function(val){
			self.alpha = val;
			if(self.opacityType == "opacity"){
				self.screen.style.opacity = self.alpha;
			}else if(self.opacityType == "filter"){
				self.screen.style.filter = "alpha(opacity=" + self.alpha * 100 + ")";
				self.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(self.alpha * 100) + ")";
			}
		};
		
		self.getAlpha = function(){
			return self.alpha;
		};
		
		self.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		self.getGlobalX = function(){
			return self.getRect().left;
		};
		
		self.getGlobalY = function(){
			return self.getRect().top;
		};
		
		self.setX = function(val){
			self.x = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = 'translate3d(' + self.x + 'px,' + self.y + 'px,0)';
			}else if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = 'translate(' + self.x + 'px,' + self.y + 'px)';
			}else{
				//if(isNaN(self.x)) console.log(arguments.callee.caller.toString())
				self.screen.style.left = self.x + "px";
			}
		};
		
		self.getX = function(){
			return  self.x;
		};
		
		self.setY = function(val){
			self.y = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = 'translate3d(' + self.x + 'px,' + self.y + 'px,0)';	
			}else if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = 'translate(' + self.x + 'px,' + self.y + 'px)';
			}else{
				self.screen.style.top = self.y + "px";
			}
		};
		
		self.getY = function(){
			return  self.y;
		};
		
		self.setWidth = function(val){
			self.w = val;
			if(self.type == "img"){
				self.screen.width = self.w;
			}
			self.screen.style.width = self.w + "px";
		};
		
		self.getWidth = function(){
			if(self.type == "div"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}else if(self.type == "img"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				if(self.screen.width != 0) return  self.screen.width;
				return self._w;
			}else if( self.type == "canvas"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}
		};
		
		self.setHeight = function(val){
			self.h = val;
			if(self.type == "img"){
				self.screen.height = self.h;
			}
			self.screen.style.height = self.h + "px";
			
		};
		
		self.getHeight = function(){
			if(self.type == "div"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}else if(self.type == "img"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				if(self.screen.height != 0) return  self.screen.height;
				return self.h;
			}else if(self.type == "canvas"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}
		};
		
		//#####################################//
		/* DOM list */
		//#####################################//
		self.addChild = function(e){
			if(self.contains(e)){	
				self.children_ar.splice(FWDS3DCUtils.indexOfArray(self.children_ar, e), 1);
				self.children_ar.push(e);
				self.screen.appendChild(e.screen);
			}else{
				self.children_ar.push(e);
				self.screen.appendChild(e.screen);
			}
		};
		
		self.removeChild = function(e){
			if(self.contains(e)){
				self.children_ar.splice(FWDS3DCUtils.indexOfArray(self.children_ar, e), 1);
				self.screen.removeChild(e.screen);
			}else{
				//console.log(arguments.callee.caller.toString())
				throw Error("##removeChild()## Child dose't exist, it can't be removed!");
			};
		};
		
		self.contains = function(e){
			if(FWDS3DCUtils.indexOfArray(self.children_ar, e) == -1){
				return false;
			}else{
				return true;
			}
		};
		
		self.addChildAt = function(e, index){
			if(self.getNumChildren() == 0){
				self.children_ar.push(e);
				self.screen.appendChild(e.screen);
			}else if(index == 1){
				self.screen.insertBefore(e.screen, self.children_ar[0].screen);
				self.screen.insertBefore(self.children_ar[0].screen, e.screen);	
				if(self.contains(e)){
					self.children_ar.splice(FWDS3DCUtils.indexOfArray(self.children_ar, e), 1, e);
				}else{
					self.children_ar.splice(FWDS3DCUtils.indexOfArray(self.children_ar, e), 0, e);
				}
			}else{
				if(index < 0  || index > self.getNumChildren() -1) throw Error("##getChildAt()## Index out of bounds!");
				
				self.screen.insertBefore(e.screen, self.children_ar[index].screen);
				if(self.contains(e)){
					self.children_ar.splice(FWDS3DCUtils.indexOfArray(self.children_ar, e), 1, e);
				}else{
					self.children_ar.splice(FWDS3DCUtils.indexOfArray(self.children_ar, e), 0, e);
				}
			}
		};
		
		self.getChildAt = function(index){
			if(index < 0  || index > self.getNumChildren() -1) throw Error("##getChildAt()## Index out of bounds!");
			if(self.getNumChildren() == 0) throw Errror("##getChildAt## Child dose not exist!");
			return self.children_ar[index];
		};
		
		self.removeChildAtZero = function(){
			self.screen.removeChild(self.children_ar[0].screen);
			self.children_ar.shift();
		};
		
		self.getNumChildren = function(){
			return self.children_ar.length;
		};
		
		
		//################################//
		/* event dispatcher */
		//#################################//
		self.addListener = function (type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    self.dispatchEvent = function(type, props){
	    	if(this.listeners == null) return;
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this && this.listeners.events_ar[i].type === type){		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		this.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		this.listeners.events_ar[i].listener.call(this, this.listeners.events_ar[i]);
	        	}
	        }
	    };
	    
	    self.removeListener = function(type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this 
	        			&& this.listeners.events_ar[i].type === type
	        			&& this.listeners.events_ar[i].listener ===  listener
	        	){
	        		this.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };
	    
	    //###########################################//
	    /* destroy methods*/
	    //###########################################//
		self.disposeImage = function(){
			if(self.type == "img") self.screen.src = null;
		};
		
		
		self.destroy = function(){
			
			try{self.screen.parentNode.removeChild(self.screen);}catch(e){};
			
			if(self.hasBeenSetSelectable_bl){
				self.screen.ondragstart = null;
				self.screen.onselectstart = null;
				self.screen.ontouchstart = null;
			};
			
			self.screen.removeAttribute("style");
			
			//destroy properties
			self.listeners = [];
			self.listeners = null;
			self.children_ar = [];
			self.children_ar = null;
			self.style = null;
			self.screen = null;
			self.transform = null;
			self.position = null;
			self.overflow = null;
			self.display = null;
			self.visible = null;
			self.buttonMode = null;
			self.x = null;
			self.y = null;
			self.w = null;
			self.h = null;
			self.rect = null;
			self.alpha = null;
			self.innerHTML = null;
			self.opacityType = null;
			self.isHtml5_bl = null;
		
			self.hasTransform3d_bl = null;
			self.hasTransform2d_bl = null;
			self = null;
		};
		
	    /* init */
		self.init();
	};
	
	window.FWDS3DCDisplayObject = FWDS3DCDisplayObject;
}(window));/* Display object */
(function (window){
	/*
	 * @ type values: div, img.
	 * @ positon values: relative, absolute.
	 * @ positon values: hidden.
	 * @ display values: block, inline-block, this applies only if the position is relative.
	 */
	var FWDS3DCDisplayObject3D = function(type, position, overflow, display){
		
		this.listeners = {events_ar:[]};
		var self = this;
		
		if(type == "div" || type == "img" || type == "canvas"){
			this.type = type;	
		}else{
			throw Error("Type is not valid! " + type);
		}
	
		this.children_ar = [];
		this.style;
		this.screen;
		this.numChildren;
		this.transform;
		this.position = position || "absolute";
		this.overflow = overflow || "hidden";
		this.display = display || "block";
		this.visible = true;
		this.buttonMode;
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.angleX = 0;
		this.angleY = 0;
		this.angleZ = 0;
		this.perspective = 0;
		this.zIndex = 0;
		this.scale = 1;
		this.w = 0;
		this.h = 0;
		this.rect;
		this.alpha = 1;
		this.innerHTML = "";
		this.opacityType = "";
		this.isHtml5_bl = false;
		
		this.hasTransform3d_bl = FWDS3DCUtils.hasTransform3d;
		this.hasTransform2d_bl = FWDS3DCUtils.hasTransform2d;
		
		//##############################//
		/* init */
		//#############################//
		this.init = function(){
			this.setScreen();
		};	
		
		//######################################//
		/* check if it supports transforms. */
		//######################################//
		this.getTransform = function() {
		    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform'];
		    var p;
		    while (p = properties.shift()) {
		       if (typeof this.screen.style[p] !== 'undefined') {
		            return p;
		       }
		    }
		    return false;
		};
		
		//######################################//
		/* set opacity type */
		//######################################//
		this.getOpacityType = function(){
			var opacityType;
			if (typeof this.screen.style.opacity != "undefined") {//ie9+ 
				opacityType = "opacity";
			}else{ //ie8
				opacityType = "filter";
			}
			return opacityType;
		};
		
		//######################################//
		/* setup main screen */
		//######################################//
		this.setScreen = function(element){
			if(this.type == "img" && element){
				this.screen = element;
				this.setMainProperties();
			}else{
				this.screen = document.createElement(this.type);
				this.setMainProperties();
			}
		};
		
		//########################################//
		/* set main properties */
		//########################################//
		this.setMainProperties = function(){
			
			this.transform = this.getTransform();
			this.setPosition(this.position);
			this.setDisplay(this.display);
			this.setOverflow(this.overflow);
			this.opacityType = this.getOpacityType();
			
			if(this.opacityType == "opacity") this.isHtml5_bl = true;
			
			if(self.opacityType == "filter") self.screen.style.filter = "inherit";
			
			this.screen.style.left = "0px";
			this.screen.style.top = "0px";
			this.screen.style.margin = "0px";
			this.screen.style.padding = "0px";
			this.screen.style.maxWidth = "none";
			this.screen.style.maxHeight = "none";
			this.screen.style.border = "none";
			this.screen.style.lineHeight = "1";
			this.screen.style.backgroundColor = "transparent";
			//this.screen.style.backfaceVisibility = "hidden";
			//this.screen.style.webkitBackfaceVisibility = "hidden";
			//this.screen.style.MozBackfaceVisibility = "hidden";
			this.screen.style.MozImageRendering = "optimizeSpeed";	
			this.screen.style.WebkitImageRendering = "optimizeSpeed";
			
			if(type == "img"){
				this.setWidth(this.screen.width);
				this.setHeight(this.screen.height);
				this.screen.onmousedown = function(e){return false;};
			}
		};
		
		self.setBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "visible";
			self.screen.style.webkitBackfaceVisibility = "visible";
			self.screen.style.MozBackfaceVisibility = "visible";		
		};
		
		self.removeBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "hidden";
			self.screen.style.webkitBackfaceVisibility = "hidden";
			self.screen.style.MozBackfaceVisibility = "hidden";		
		};
		
		//###################################################//
		/* set / get various peoperties.*/
		//###################################################//
		this.setSelectable = function(val){
			if(!val){
				try{this.screen.style.userSelect = "none";}catch(e){};
				try{this.screen.style.MozUserSelect = "none";}catch(e){};
				try{this.screen.style.webkitUserSelect = "none";}catch(e){};
				try{this.screen.style.khtmlUserSelect = "none";}catch(e){};
				try{this.screen.style.oUserSelect = "none";}catch(e){};
				try{this.screen.style.msUserSelect = "none";}catch(e){};
				try{this.screen.msUserSelect = "none";}catch(e){};
				this.screen.ondragstart = function(e){return  false;};
				this.screen.onselectstart = function(){return false;};
				this.screen.style.webkitTouchCallout='none';
			}
		};
		
		this.getScreen = function(){
			return self.screen;
		};
		
		this.setVisible = function(val){
			this.visible = val;
			if(this.visible == true){
				this.screen.style.visibility = "visible";
			}else{
				this.screen.style.visibility = "hidden";
			}
		};
		
		this.getVisible = function(){
			return this.visible;
		};
			
		this.setResizableSizeAfterParent = function(){
			this.screen.style.width = "100%";
			this.screen.style.height = "100%";
		};
		
		this.getStyle = function(){
			return this.screen.style;
		};
		
		this.setOverflow = function(val){
			self.overflow = val;
			self.screen.style.overflow = self.overflow;
		};
		
		this.setPosition = function(val){
			self.position = val;
			self.screen.style.position = self.position;
		};
		
		this.setDisplay = function(val){
			this.display = val;
			this.screen.style.display = this.display;
		};
		
		this.setButtonMode = function(val){
			this.buttonMode = val;
			if(this.buttonMode ==  true){
				this.screen.style.cursor = "pointer";
			}else{
				this.screen.style.cursor = "default";
			}
		};
		
		this.setBkColor = function(val){
			self.screen.style.backgroundColor = val;
		};
		
		this.setInnerHTML = function(val){
			self.innerHTML = val;
			self.screen.innerHTML = self.innerHTML;
		};
		
		this.getInnerHTML = function(){
			return self.innerHTML;
		};
		
		this.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		this.setAlpha = function(val){
			self.alpha = val;
			if(self.opacityType == "opacity"){
				self.screen.style.opacity = self.alpha;
			}else if(self.opacityType == "filter"){
				self.screen.style.filter = "alpha(opacity=" + self.alpha * 100 + ")";
				self.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(self.alpha * 100) + ")";
			}
		};
		
		this.getAlpha = function(){
			return self.alpha;
		};
		
		this.getRect = function(){
			return this.screen.getBoundingClientRect();
		};
		
		this.getGlobalX = function(){
			return this.getRect().left;
		};
		
		this.getGlobalY = function(){
			return this.getRect().top;
		};
		
		this.setX = function(val){
			self.x = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = "translate3d(" + self.x + "px," + self.y + "px," + self.z + "px) rotateX(" + self.angleX + "deg) rotateY(" + self.angleY + "deg) rotateZ(" + self.angleZ + "deg) scale3d(" + self.scale + ", " + self.scale + ", " + self.scale + ")";
			}else if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = "translate(" + self.x + "px," + self.y + "px) scale(" + self.scale + ", " + self.scale + ")";
			}else{
				self.screen.style.left = self.x + "px";
			}
		};
		
		this.getX = function(){
			return  self.x;
		};
		
		this.setY = function(val){
			self.y = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = "translate3d(" + self.x + "px," + self.y + "px," + self.z + "px) rotateX(" + self.angleX + "deg) rotateY(" + self.angleY + "deg) rotateZ(" + self.angleZ + "deg) scale3d(" + self.scale + ", " + self.scale + ", " + self.scale + ")";
			}else if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = "translate(" + self.x + "px," + self.y + "px) scale(" + self.scale + ", " + self.scale + ")";
			}else{
				self.screen.style.top = self.y + "px";
			}
		};
		
		this.getY = function(){
			return  self.y;
		};
		
		this.setZ = function(val){
			self.z = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = "translate3d(" + self.x + "px," + self.y + "px," + self.z + "px) rotateX(" + self.angleX + "deg) rotateY(" + self.angleY + "deg) rotateZ(" + self.angleZ + "deg) scale3d(" + self.scale + ", " + self.scale + ", " + self.scale + ")";
			}
		};
		
		this.getZ = function(){
			return  self.z;
		};
		
		this.setAngleX = function(val){
			self.angleX = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = "translate3d(" + self.x + "px," + self.y + "px," + self.z + "px) rotateX(" + self.angleX + "deg) rotateY(" + self.angleY + "deg) rotateZ(" + self.angleZ + "deg) scale3d(" + self.scale + ", " + self.scale + ", " + self.scale + ")";
			}
		};
		
		this.getAngleX = function(){
			return  self.angleX;
		};
		
		this.setAngleY = function(val){
			self.angleY = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = "translate3d(" + self.x + "px," + self.y + "px," + self.z + "px) rotateX(" + self.angleX + "deg) rotateY(" + self.angleY + "deg) rotateZ(" + self.angleZ + "deg) scale3d(" + self.scale + ", " + self.scale + ", " + self.scale + ")";
			}
		};
		
		this.getAngleY = function(){
			return  self.angleY;
		};
		
		this.setAngleZ = function(val){
			self.angleZ = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = "translate3d(" + self.x + "px," + self.y + "px," + self.z + "px) rotateX(" + self.angleX + "deg) rotateY(" + self.angleY + "deg) rotateZ(" + self.angleZ + "deg) scale3d(" + self.scale + ", " + self.scale + ", " + self.scale + ")";
			}
		};
		
		this.getAngleZ = function(){
			return  self.angleZ;
		};
		
		this.setScale2 = function(val){
			self.scale = val;
			if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = "translate(" + self.x + "px," + self.y + "px) scale(" + self.scale + ", " + self.scale + ")";
			}
		};
		
		this.setScale3D = function(val){
			self.scale = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = "translate3d(" + self.x + "px," + self.y + "px," + self.z + "px) rotateX(" + self.angleX + "deg) rotateY(" + self.angleY + "deg) rotateZ(" + self.angleZ + "deg) scale3d(" + self.scale + ", " + self.scale + ", " + self.scale + ")";
			}else if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = "translate(" + self.x + "px," + self.y + "px) scale(" + self.scale + ", " + self.scale + ")";
			}
		};
		
		this.getScale = function(){
			return  self.scale;
		};
		
		this.setPerspective = function(val){
			self.perspective = val;
			self.screen.style.perspective = self.perspective + "px";
			self.screen.style.WebkitPerspective = self.perspective + "px";
			self.screen.style.MozPerspective = self.perspective + "px";
			self.screen.style.msPerspective = self.perspective + "px";
			self.screen.style.OPerspective = self.perspective + "px";
		};
		
		this.setPreserve3D = function(){
			this.screen.style.transformStyle = "preserve-3d";
			this.screen.style.WebkitTransformStyle = "preserve-3d";
			this.screen.style.MozTransformStyle = "preserve-3d";
			this.screen.style.msTransformStyle = "preserve-3d";
			this.screen.style.OTransformStyle = "preserve-3d";
		};
		
		this.setZIndex = function(val)
		{
			self.zIndex = val;
			self.screen.style.zIndex = self.zIndex;
		};
		
		this.getZIndex = function()
		{
			return self.zIndex;
		};
		
		this.setWidth = function(val){
			self.w = val;
			if(self.type == "img"){
				self.screen.width = self.w;
			}
			self.screen.style.width = self.w + "px";	
		};
		
		this.getWidth = function(){
			if(self.type == "div"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}else if(self.type == "img"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				if(self.screen.width != 0) return  self.screen.width;
				return self._w;
			}else if( self.type == "canvas"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}
		};
		
		this.setHeight = function(val){
			self.h = val;
			if(self.type == "img"){
				self.screen.height = self.h;
			}
			self.screen.style.height = self.h + "px";
		};
		
		this.getHeight = function(){
			if(self.type == "div"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}else if(self.type == "img"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				if(self.screen.height != 0) return  self.screen.height;
				return self.h;
			}else if(self.type == "canvas"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}
		};
		
		this.getNumChildren = function(){
			return self.children_ar.length;
		};
		
		this.setCSSGradient = function(color1, color2)
		{
			if (FWDS3DCUtils.isIEAndLessThen10)
			{
				self.setBkColor(color1);
			}
			else
			{
				self.screen.style.backgroundImage = "-webkit-linear-gradient(top, " + color1 + ", " + color2 + ")";
				self.screen.style.backgroundImage = "-moz-linear-gradient(top, " + color1 + ", " + color2 + ")";
				self.screen.style.backgroundImage = "-ms-linear-gradient(top, " + color1 + ", " + color2 + ")";
				self.screen.style.backgroundImage = "-o-linear-gradient(top, " + color1 + ", " + color2 + ")";
			}
		};
		
		//#####################################//
		/* DOM list */
		//#####################################//
		this.addChild = function(e){
			if(this.contains(e)){	
				this.children_ar.splice(FWDS3DCUtils.indexOfArray(this.children_ar, e), 1);
				this.children_ar.push(e);
				this.screen.appendChild(e.screen);
			}else{
				this.children_ar.push(e);
				this.screen.appendChild(e.screen);
			}
		};
		
		this.removeChild = function(e){
			if(this.contains(e)){
				this.children_ar.splice(FWDS3DCUtils.indexOfArray(this.children_ar, e), 1);
				this.screen.removeChild(e.screen);
			}else{
				throw Error("##removeChild()## Child doesn't exist, it can't be removed!");
			};
		};
		
		this.contains = function(e){
			if(FWDS3DCUtils.indexOfArray(this.children_ar, e) == -1){
				return false;
			}else{
				return true;
			}
		};
		
		this.addChildAtZero = function(e){
			if(this.numChildren == 0){
				this.children_ar.push(e);
				this.screen.appendChild(e.screen);
			}else{
				this.screen.insertBefore(e.screen, this.children_ar[0].screen);
				if(this.contains(e)){this.children_ar.splice(FWDS3DCUtils.indexOfArray(this.children_ar, e), 1);}	
				this.children_ar.unshift(e);
			}
		};
		
		this.getChildAt = function(index){
			if(index < 0  || index > this.numChildren -1) throw Error("##getChildAt()## Index out of bounds!");
			if(this.numChildren == 0) throw Errror("##getChildAt## Child dose not exist!");
			return this.children_ar[index];
		};
		
		this.removeChildAtZero = function(){
			this.screen.removeChild(this.children_ar[0].screen);
			this.children_ar.shift();
		};
		
		//################################//
		/* event dispatcher */
		//#################################//
		this.addListener = function (type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    this.dispatchEvent = function(type, props){
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this && this.listeners.events_ar[i].type === type){
	        		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		this.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		this.listeners.events_ar[i].listener.call(this, this.listeners.events_ar[i]);
	        		break;
	        	}
	        }
	    };
	    
	   this.removeListener = function(type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this 
	        			&& this.listeners.events_ar[i].type === type
	        			&& this.listeners.events_ar[i].listener ===  listener
	        	){
	        		this.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };
	    
	    //###########################################//
	    /* destroy methods*/
	    //###########################################//
		this.disposeImage = function(){
			if(this.type == "img") this.screen.src = "";
		};
		
		
		this.destroy = function(){
			
			try{this.screen.parentNode.removeChild(this.screen);}catch(e){};
			
			this.screen.onselectstart = null;
			this.screen.ondragstart = null;
			this.screen.ontouchstart = null;
			this.screen.ontouchmove = null;
			this.screen.ontouchend = null;
			this.screen.onmouseover = null;
			this.screen.onmouseout = null;
			this.screen.onmouseup = null;
			this.screen.onmousedown = null;
			this.screen.onmousemove = null;
			this.screen.onclick = null;
			
			delete this.screen;
			delete this.style;
			delete this.rect;
			delete this.selectable;
			delete this.buttonMode;
			delete this.position;
			delete this.overflow;
			delete this.visible;
			delete this.innerHTML;
			delete this.numChildren;
			delete this.x;
			delete this.y;
			delete this.w;
			delete this.h;
			delete this.opacityType;
			delete this.isHtml5_bl;
			delete this.hasTransform3d_bl;
			delete this.hasTransform2d_bl;

			this.children_ar = null;
			this.style = null;
			this.screen = null;
			this.numChildren = null;
			this.transform = null;
			this.position = null;
			this.overflow = null;
			this.display= null;
			this.visible= null;
			this.buttonMode = null;
			this.globalX = null;
			this.globalY = null;
			this.x = null;
			this.y = null;
			this.w = null;;
			this.h = null;;
			this.rect = null;
			this.alpha = null;
			this.innerHTML = null;
			this.opacityType = null;
			this.isHtml5_bl = null;
			this.hasTransform3d_bl = null;
			this.hasTransform2d_bl = null;
			self = null;
		};
		
	    /* init */
		this.init();
	};
	
	window.FWDS3DCDisplayObject3D = FWDS3DCDisplayObject3D;
}(window));(function (){
	
	var FWDS3DCEventDispatcher = function (){
		
	    this.listeners = {events_ar:[]};
	     
	    this.addListener = function (type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    this.dispatchEvent = function(type, props){
	    	if(this.listeners == null) return;
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this && this.listeners.events_ar[i].type === type){		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		this.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		this.listeners.events_ar[i].listener.call(this, this.listeners.events_ar[i]);
	        	}
	        }
	    };
	    
	   this.removeListener = function(type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this 
	        			&& this.listeners.events_ar[i].type === type
	        			&& this.listeners.events_ar[i].listener ===  listener
	        	){
	        		this.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };
	    
	    /* destroy */
	    this.destroy = function(){
	    	this.listeners = null;
	    	
	    	this.addListener = null;
		    this.dispatchEvent = null;
		    this.removeListener = null;
	    };
	    
	};	
	
	window.FWDS3DCEventDispatcher = FWDS3DCEventDispatcher;
}(window));/* Info screen */
(function (window){
	
	var FWDS3DCInfoWindow = function(parent, warningIconPath){
		
		var self = this;
		var prototype = FWDS3DCInfoWindow.prototype;
	
		this.textHolder_do = null;
		this.img_do;
		
		this.warningIconPath_str = warningIconPath;
		
		this.show_to = null;
		this.isShowed_bl = false;
		this.isShowedOnce_bl = false;
		this.allowToRemove_bl = true;
		
		//#################################//
		/* init */
		//#################################//
		this.init = function(){
			self.setResizableSizeAfterParent();
			self.getStyle().width = "80%";
		
			self.textHolder_do = new FWDS3DCDisplayObject("div");
			if(!FWDS3DCUtils.isIEAndLessThen9) self.textHolder_do.getStyle().font = "Arial";
			self.textHolder_do.getStyle().wordWrap = "break-word";
			self.textHolder_do.getStyle().padding = "10px";
			self.textHolder_do.getStyle().paddingLeft = "42px";
			self.textHolder_do.getStyle().lineHeight = "18px";
			self.textHolder_do.getStyle().color = "#000000";
			self.textHolder_do.setBkColor("#EEEEEE");
			
			var img_img = new Image();
			img_img.src = this.warningIconPath_str;
			this.img_do = new FWDS3DCDisplayObject("img");
			this.img_do.setScreen(img_img);
			this.img_do.setWidth(28);
			this.img_do.setHeight(28);
			
			self.addChild(self.textHolder_do);
			self.addChild(self.img_do);
		};
		
		this.showText = function(txt){
			if(!self.isShowedOnce_bl){
				if(self.screen.addEventListener){
					self.screen.addEventListener("click", self.closeWindow);
				}else if(self.screen.attachEvent){
					self.screen.attachEvent("onclick", self.closeWindow);
				}
				self.isShowedOnce_bl = true;
			}
			
			//self.setX(-800);
			//if(self.allowToRemove_bl){
			//	self.textHolder_do.setInnerHTML(txt  + "<p style='margin:0px; padding-bottom:10px;'><font color='#FFFFFF'>Click or tap to close this window.</font>");
		//	}else{
				
				self.textHolder_do.setInnerHTML(txt);
			//}
			
			clearTimeout(self.show_to);
			self.show();
		};
		
		this.show = function(){
			self.isShowed_bl = true;
			self.setVisible(true);
			setTimeout(function(){
				self.positionAndResize();
			}, 60);
		};
		
		this.positionAndResize = function(){		
			self.setHeight(self.textHolder_do.getHeight());
			self.img_do.setX(6);
			self.img_do.setY(parseInt((self.h - self.img_do.h)/2));
	
		};
		
		this.closeWindow = function(){
			if(!self.allowToRemove_bl) return;
			self.isShowed_bl = false;
			clearTimeout(self.show_to);
			try{parent.main_do.removeChild(self);}catch(e){}
		};
		
		this.init();
	};
		
	/* set prototype */
	FWDS3DCInfoWindow.setPrototype = function(){
		FWDS3DCInfoWindow.prototype = new FWDS3DCDisplayObject("div", "relative");
	};
	
	FWDS3DCInfoWindow.prototype = null;
	window.FWDS3DCInfoWindow = FWDS3DCInfoWindow;
}(window));/* FWDS3DCSimpleButton */
(function (window){
var FWDS3DCSimpleButton = function(nImg, sImg){
		
		var self = this;
		var prototype = FWDS3DCSimpleButton.prototype;
		
		this.nImg = nImg;
		this.sImg = sImg;
		
		this.n_do;
		this.s_do;
		
		this.isMobile_bl = FWDS3DCUtils.isMobile;
		this.hasPointerEvent_bl = FWDS3DCUtils.hasPointerEvent;
		
		//##########################################//
		/* initialize this */
		//##########################################//
		this.init = function(){
			this.setupMainContainers();
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		this.setupMainContainers = function(){
			this.n_do = new FWDS3DCSimpleDisplayObject("img");	
			this.n_do.setScreen(this.nImg);
			this.s_do = new FWDS3DCSimpleDisplayObject("img");
			this.s_do.setScreen(this.sImg);
			this.addChild(this.s_do);
			this.addChild(this.n_do);
			
			this.setWidth(this.nImg.width);
			this.setHeight(this.nImg.height);
			this.setButtonMode(true);
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screen.addEventListener("MSPointerOver", self.onMouseOver);
					self.screen.addEventListener("MSPointerOut", self.onMouseOut);
					self.screen.addEventListener("MSPointerUp", self.onClick);
				}else{
					self.screen.addEventListener("touchstart", self.onClick);
				}
			}else if(self.screen.addEventListener){	
				self.screen.addEventListener("mouseover", self.onMouseOver);
				self.screen.addEventListener("mouseout", self.onMouseOut);
				self.screen.addEventListener("mouseup", self.onClick);
			}else if(self.screen.attachEvent){
				self.screen.attachEvent("onmouseover", self.onMouseOver);
				self.screen.attachEvent("onmouseout", self.onMouseOut);
				self.screen.attachEvent("onmouseup", self.onClick);
			}
		};
		
		this.onMouseOver = function(e){
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				FWDAnimation.to(self.n_do, .9, {alpha:0, ease:Expo.easeOut});
			}
		};
			
		this.onMouseOut = function(e){
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				FWDAnimation.to(self.n_do, .9, {alpha:1, ease:Expo.easeOu});	
			}
		};
			
		this.onClick = function(e){
			self.dispatchEvent(FWDS3DCSimpleButton.CLICK);
		};
		
		//##############################//
		/* destroy */
		//##############################//
		this.destroy = function(){
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screen.removeEventListener("MSPointerOver", self.onMouseOver);
					self.screen.removeEventListener("MSPointerOut", self.onMouseOut);
					self.screen.removeEventListener("MSPointerUp", self.onClick);
				}else{
					self.screen.removeEventListener("touchstart", self.onClick);
				}
			}else if(self.screen.removeEventListener){	
				self.screen.removeEventListener("mouseover", self.onMouseOver);
				self.screen.removeEventListener("mouseout", self.onMouseOut);
				self.screen.removeEventListener("mouseup", self.onClick);
			}else if(self.screen.detachEvent){
				self.screen.detachEvent("onmouseover", self.onMouseOver);
				self.screen.detachEvent("onmouseout", self.onMouseOut);
				self.screen.detachEvent("onmouseup", self.onClick);
			}
			
			FWDAnimation.killTweensOf(self.n_do);
			self.n_do.destroy();
			self.s_do.destroy();
			
			self.nImg = null;
			self.sImg = null;
			self.n_do = null;
			self.s_do = null;
			
			nImg = null;
			sImg = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDS3DCSimpleButton.prototype = null;
		};
	
		this.init();
	};
	
	/* set prototype */
	FWDS3DCSimpleButton.setPrototype = function(){
		FWDS3DCSimpleButton.prototype = new FWDS3DCDisplayObject("div");
	};
	
	FWDS3DCSimpleButton.CLICK = "onClick";
	
	FWDS3DCSimpleButton.prototype = null;
	window.FWDS3DCSimpleButton = FWDS3DCSimpleButton;
}(window));/* Simple Display object */
(function (window){
	/*
	 * @ type values: div, img.
	 * @ positon values: relative, absolute.
	 * @ positon values: hidden.
	 * @ display values: block, inline-block, self applies only if the position is relative.
	 */
	var FWDS3DCSimpleDisplayObject = function(type, position, overflow, display){
		
		var self = this;
		
		if(type == "div" || type == "img" || type == "canvas"){
			self.type = type;	
		}else{
			throw Error("Type is not valid! " + type);
		}
	
		this.style;
		this.screen;
		this.transform;
		this.position = position || "absolute";
		this.overflow = overflow || "hidden";
		this.display = display || "block";
		this.visible = true;
		this.buttonMode;
		this.x = 0;
		this.y = 0;
		this.w = 0;
		this.h = 0;
		this.rect;
		this.alpha = 1;
		this.innerHTML = "";
		this.opacityType = "";
		this.isHtml5_bl = false;
		this.isMobile_bl = FWDS3DCUtils.isMobile;
		
		this.hasTransform3d_bl = FWDS3DCUtils.hasTransform3d;
		this.hasTransform2d_bl = FWDS3DCUtils.hasTransform2d;
		if(FWDS3DCUtils.isFirefox) self.hasTransform3d_bl = false;
		if(FWDS3DCUtils.isFirefox) self.hasTransform2d_bl = false;
		this.hasBeenSetSelectable_bl = false;
		
		//##############################//
		/* init */
		//#############################//
		self.init = function(){
			self.setScreen();
		};	
		
		//######################################//
		/* check if it supports transforms. */
		//######################################//
		self.getTransform = function() {
		    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform'];
		    var p;
		    while (p = properties.shift()) {
		       if (typeof self.screen.style[p] !== 'undefined') {
		            return p;
		       }
		    }
		    return false;
		};
		
		//######################################//
		/* set opacity type */
		//######################################//
		self.getOpacityType = function(){
			var opacityType;
			if (typeof self.screen.style.opacity != "undefined") {//ie9+ 
				opacityType = "opacity";
			}else{ //ie8
				opacityType = "filter";
			}
			return opacityType;
		};
		
		//######################################//
		/* setup main screen */
		//######################################//
		self.setScreen = function(element){
			if(self.type == "img" && element){
				self.screen = element;
				self.setMainProperties();
			}else{
				self.screen = document.createElement(self.type);
				self.setMainProperties();
			}
		};
		
		//########################################//
		/* set main properties */
		//########################################//
		self.setMainProperties = function(){
			
			self.transform = self.getTransform();
			self.setPosition(self.position);
			self.setDisplay(self.display);
			self.setOverflow(self.overflow);
			self.opacityType = self.getOpacityType();
			
			if(self.opacityType == "opacity") self.isHtml5_bl = true;
			
			if(self.opacityType == "filter") self.screen.style.filter = "inherit";
			self.screen.style.left = "0px";
			self.screen.style.top = "0px";
			self.screen.style.margin = "0px";
			self.screen.style.padding = "0px";
			self.screen.style.maxWidth = "none";
			self.screen.style.maxHeight = "none";
			self.screen.style.border = "none";
			self.screen.style.lineHeight = "1";
			self.screen.style.backgroundColor = "transparent";
			self.screen.style.backfaceVisibility = "hidden";
			self.screen.style.webkitBackfaceVisibility = "hidden";
			self.screen.style.MozBackfaceVisibility = "hidden";
			
			if(type == "img"){
				self.setWidth(self.screen.width);
				self.setHeight(self.screen.height);
				self.setSelectable(false);
			}
		};
		
		//###################################################//
		/* set / get various peoperties.*/
		//###################################################//
		self.setSelectable = function(val){
			if(!val){
				self.screen.style.userSelect = "none";
				self.screen.style.MozUserSelect = "none";
				self.screen.style.webkitUserSelect = "none";
				self.screen.style.khtmlUserSelect = "none";
				self.screen.style.oUserSelect = "none";
				self.screen.style.msUserSelect = "none";
				self.screen.msUserSelect = "none";
				self.screen.ondragstart = function(e){return false;};
				self.screen.onselectstart = function(){return false;};
				self.screen.ontouchstart = function(e){return false;};
				self.screen.style.webkitTouchCallout='none';
				self.hasBeenSetSelectable_bl = true;
			}
		};
			
		self.setBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "visible";
			self.screen.style.webkitBackfaceVisibility = "visible";
			self.screen.style.MozBackfaceVisibility = "visible";		
		};
		
		self.removeBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "hidden";
			self.screen.style.webkitBackfaceVisibility = "hidden";
			self.screen.style.MozBackfaceVisibility = "hidden";		
		};
		
		self.getScreen = function(){
			return self.screen;
		};
		
		self.setVisible = function(val){
			self.visible = val;
			if(self.visible == true){
				self.screen.style.visibility = "visible";
			}else{
				self.screen.style.visibility = "hidden";
			}
		};
		
		self.getVisible = function(){
			return self.visible;
		};
			
		self.setResizableSizeAfterParent = function(){
			self.screen.style.width = "100%";
			self.screen.style.height = "100%";
		};
		
		self.getStyle = function(){
			return self.screen.style;
		};
		
		self.setOverflow = function(val){
			self.overflow = val;
			self.screen.style.overflow = self.overflow;
		};
		
		self.setPosition = function(val){
			self.position = val;
			self.screen.style.position = self.position;
		};
		
		self.setDisplay = function(val){
			self.display = val;
			self.screen.style.display = self.display;
		};
		
		self.setButtonMode = function(val){
			self.buttonMode = val;
			if(self.buttonMode ==  true){
				self.screen.style.cursor = "pointer";
			}else{
				self.screen.style.cursor = "default";
			}
		};
		
		self.setBkColor = function(val){
			self.screen.style.backgroundColor = val;
		};
		
		self.setInnerHTML = function(val){
			self.innerHTML = val;
			self.screen.innerHTML = self.innerHTML;
		};
		
		self.getInnerHTML = function(){
			return self.innerHTML;
		};
		
		self.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		self.setAlpha = function(val){
			self.alpha = val;
			if(self.opacityType == "opacity"){
				self.screen.style.opacity = self.alpha;
			}else if(self.opacityType == "filter"){
				self.screen.style.filter = "alpha(opacity=" + self.alpha * 100 + ")";
				self.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(self.alpha * 100) + ")";
			}
		};
		
		self.getAlpha = function(){
			return self.alpha;
		};
		
		self.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		self.getGlobalX = function(){
			return self.getRect().left;
		};
		
		self.getGlobalY = function(){
			return self.getRect().top;
		};
		
		self.setX = function(val){
			self.x = val;
			if(self.isMobile_bl){
				self.screen.style[self.transform] = 'translate(' + self.x + 'px,' + self.y + 'px)';
			}else if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = 'translate3d(' + self.x + 'px,' + self.y + 'px,0)';
			}else if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = 'translate(' + self.x + 'px,' + self.y + 'px)';
			}else{
				self.screen.style.left = self.x + "px";
			}
		};
		
		self.getX = function(){
			return  self.x;
		};
		
		self.setY = function(val){
			self.y = val;
			if(self.isMobile_bl){
				self.screen.style[self.transform] = 'translate(' + self.x + 'px,' + self.y + 'px)';
			}else if(self.hasTransform3d_bl && !FWDS3DCUtils.isAndroid){
				self.screen.style[self.transform] = 'translate3d(' + self.x + 'px,' + self.y + 'px,0)';
			}else if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = 'translate(' + self.x + 'px,' + self.y + 'px)';
			}else{
				self.screen.style.top = self.y + "px";
			}
		};
		
		self.getY = function(){
			return  self.y;
		};
		
		self.setWidth = function(val){
			self.w = val;
			
			if (self.w < 0)
			{
				return;
			}
				
			if(self.type == "img"){
				self.screen.width = self.w;	
			}
			self.screen.style.width = self.w + "px";
		};
		
		self.getWidth = function(){
			if(self.type == "div"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}else if(self.type == "img"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				if(self.screen.width != 0) return  self.screen.width;
				return self._w;
			}else if( self.type == "canvas"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}
		};
		
		self.setHeight = function(val){
			self.h = val;
			if(self.type == "img"){
				self.screen.height = self.h;	
			}
			self.screen.style.height = self.h + "px";
		};
		
		self.getHeight = function(){
			if(self.type == "div"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}else if(self.type == "img"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				if(self.screen.height != 0) return  self.screen.height;
				return self.h;
			}else if(self.type == "canvas"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}
		};
		
		this.setCSSGradient = function(color1, color2){
		
			if (FWDS3DCUtils.isIEAndLessThen10)
			{
				self.setBkColor(color1);
			}
			else
			{
				self.screen.style.backgroundImage = "-webkit-linear-gradient(top, " + color1 + ", " + color2 + ")";
				self.screen.style.backgroundImage = "-moz-linear-gradient(top, " + color1 + ", " + color2 + ")";
				self.screen.style.backgroundImage = "-ms-linear-gradient(top, " + color1 + ", " + color2 + ")";
				self.screen.style.backgroundImage = "-o-linear-gradient(top, " + color1 + ", " + color2 + ")";
			}
		};
		
	    //###########################################//
	    /* destroy methods*/
	    //###########################################//
		self.disposeImage = function()
		{
			if (self.type == "img")
			{
				self.screen.onload = null;
				self.screen.onerror = null;
				self.screen.src = "";
			}
		};
		
		self.destroy = function(){
			
			//try{self.screen.parentNode.removeChild(self.screen);}catch(e){};
			if(self.hasBeenSetSelectable_bl){
				self.screen.ondragstart = null;
				self.screen.onselectstart = null;
				self.screen.ontouchstart = null;
			};
			
			self.screen.removeAttribute("style");
			
			//destroy properties
			self.style = null;
			self.screen = null;
			self.transform = null;
			self.position = null;
			self.overflow = null;
			self.display = null;
			self.visible = null;
			self.buttonMode = null;
			self.x = null;
			self.y = null;
			self.w = null;
			self.h = null;
			self.rect = null;
			self.alpha = null;
			self.innerHTML = null;
			self.opacityType = null;
			self.isHtml5_bl = null;
			
			type = null;
			position = null;
			overflow = null;
			display = null;
		
			self.hasTransform3d_bl = null;
			self.hasTransform2d_bl = null;
			self = null;
		};
		
	    /* init */
		self.init();
	};
	
	window.FWDS3DCSimpleDisplayObject = FWDS3DCSimpleDisplayObject;
}(window));/* thumb */
(function(window)
{
	var FWDS3DCThumb = function(id, data, parent, link, target)
	{
		var self = this;
		var prototype = FWDS3DCThumb.prototype;

		this.id = id;
		this.borderSize = data.thumbBorderSize;
		this.backgroundColor = data.thumbBackgroundColor;
		this.borderColor1 = data.thumbBorderColor1;
		this.borderColor2 = data.thumbBorderColor2;

		this.mainDO = null;
		this.borderDO = null;
		this.bgDO = null;
		this.imageHolderDO = null;
		this.imageDO = null;
		this.htmlContentDO = null;
		this.reflCanvasDO = null;
		
		this.textHolderDO = null;
		this.textGradientDO = null;
		this.textDO = null;
		
		this.thumbWidth = data.thumbWidth;
		this.thumbHeight = data.thumbHeight;
		
		this.mouseX = 0;
		this.mouseY = 0;
		this.link = link;
		this.target = target;
		
		this.pos;
		this.thumbScale = 1;
		
		this.showBoxShadow = data.showBoxShadow;
		
		this.curDataListAr;
		
		this.isOver = false;
		this.hasText = false;
		
		this.isMobile = FWDS3DCUtils.isMobile;
		this.hasPointerEvent = FWDS3DCUtils.hasPointerEvent;

		/* init */
		this.init = function()
		{
			self.setupScreen();
		};

		/* setup screen */
		this.setupScreen = function()
		{
			if (FWDS3DCUtils.isIOS)
			{
				self.mainDO = new FWDS3DCDisplayObject3D("div", "absolute", "visible");
				self.addChild(self.mainDO);
			
				self.mainDO.setZ(1);
			}
			else
			{
				self.mainDO = new FWDS3DCDisplayObject("div", "absolute", "visible");
				self.addChild(self.mainDO);
			}
			
			self.mainDO.setWidth(self.thumbWidth);
			self.mainDO.setHeight(self.thumbHeight);
			
			self.setWidth(self.thumbWidth);
			self.setHeight(self.thumbHeight);
			
			if (data.showThumbnailsHtmlContent || !data.transparentImages)
			{
				self.borderDO = new FWDS3DCSimpleDisplayObject("div");
				self.bgDO = new FWDS3DCSimpleDisplayObject("div");
				
				self.mainDO.addChild(self.borderDO);
				self.mainDO.addChild(self.bgDO);
				
				self.borderDO.setWidth(self.thumbWidth);
				self.borderDO.setHeight(self.thumbHeight);
				
				self.bgDO.setWidth(self.thumbWidth - self.borderSize * 2);
				self.bgDO.setHeight(self.thumbHeight - self.borderSize * 2);
				
				self.bgDO.setX(self.borderSize);
				self.bgDO.setY(self.borderSize);

				self.borderDO.setCSSGradient(self.borderColor1, self.borderColor2);
				
				self.bgDO.setBkColor(self.backgroundColor);
				
				if (FWDS3DCUtils.isAndroid)
				{
					self.borderDO.setBackfaceVisibility();
					self.bgDO.setBackfaceVisibility();
				}
			}
			else
			{
				self.borderSize = 0;
			}
			
			self.imageHolderDO = new FWDS3DCDisplayObject("div");
			self.mainDO.addChild(self.imageHolderDO);
			
			self.curDataListAr = parent.curDataListAr;
			
			self.updateButtonMode();
			
			if (FWDS3DCUtils.isAndroid)
			{
				self.setBackfaceVisibility();
				self.mainDO.setBackfaceVisibility();
				self.imageHolderDO.setBackfaceVisibility();
			}
			
			if (self.showBoxShadow)
			{
				self.mainDO.screen.style.boxShadow = data.thumbBoxShadowCss;
			}
			
			if (self.isMobile)
			{
				if (self.hasPointerEvent)
				{
					self.mainDO.screen.addEventListener("MSPointerUp", self.onMouseTouchHandler);
				}
				else
				{
					self.mainDO.screen.addEventListener("touchend", self.onMouseTouchHandler);
				}
			}
			else
			{
				if (self.screen.addEventListener)
				{
					self.mainDO.screen.addEventListener("click", self.onMouseClickHandler);
				}
				else
				{
					self.mainDO.screen.attachEvent("onclick", self.onMouseClickHandler);
				}
			}
		};
		
		this.updateButtonMode = function(){
			if (self.isMobile || (self.curDataListAr[self.id].type_str != "none") && !parent.useDrag)
			{
				self.mainDO.setButtonMode(true);
			}else{
				self.mainDO.getStyle().cursor = null;
			}
		};
		
		this.addReflection = function()
		{
			if (!self.imageDO || self.isMobile || FWDS3DCUtils.isIEAndLessThen9)
				return;
			
			var imgW = self.thumbWidth - self.borderSize * 2;
			var imgH = self.thumbHeight - self.borderSize * 2;
			
			self.reflCanvasDO = new FWDS3DCSimpleDisplayObject("canvas");
			self.addChild(self.reflCanvasDO);
			
			self.reflCanvasDO.screen.width = parent.thumbWidth;
			self.reflCanvasDO.screen.height = parent.reflHeight;
			
			var context = self.reflCanvasDO.screen.getContext("2d");
		   
			context.save();
					
			context.translate(0, self.thumbHeight);
			context.scale(1, -1);
			
			if (data.showThumbnailsHtmlContent || !data.transparentImages)
			{
				context.fillStyle = self.borderColor1;
				context.fillRect(0, 0, self.thumbWidth, self.thumbHeight);
			}
			
			context.drawImage(self.imageDO.screen, self.borderSize, self.borderSize, imgW, imgH);

			context.restore();
			
			context.globalCompositeOperation = "destination-out";
			var gradient = context.createLinearGradient(0, 0, 0, parent.reflHeight);
			
			gradient.addColorStop(0, "rgba(255, 255, 255, " + (1-parent.reflAlpha) + ")");
			gradient.addColorStop(1, "rgba(255, 255, 255, 1.0)");

			context.fillStyle = gradient;
			context.fillRect(0, 0, self.thumbWidth, parent.reflHeight + 2);
			
			self.setWidth(self.thumbWidth);
			self.reflCanvasDO.setY(self.thumbHeight + parent.reflDist);
		};

		this.addImage = function(image)
		{
			self.imageDO = new FWDS3DCSimpleDisplayObject("img");
			self.imageDO.setScreen(image);
			self.imageHolderDO.addChild(self.imageDO);
			
			self.imageDO.screen.ontouchstart = null;
			
			if (FWDS3DCUtils.isAndroid)
			{
				self.imageDO.setBackfaceVisibility();
			}
			
			self.imageDO.setWidth(self.thumbWidth - self.borderSize * 2);
			self.imageDO.setHeight(self.thumbHeight - self.borderSize * 2);
			
			self.imageHolderDO.setX(self.borderSize);
			self.imageHolderDO.setY(self.borderSize);
			
			self.imageHolderDO.setWidth(self.thumbWidth - self.borderSize * 2);
			self.imageHolderDO.setHeight(self.thumbHeight - self.borderSize * 2);
			
			if (parent.showRefl)
			{
				self.addReflection();
			}
		};
		
		this.addHtmlContent = function()
		{
			self.htmlContentDO = new FWDS3DCSimpleDisplayObject("div");
			self.htmlContentDO.setInnerHTML(self.curDataListAr[self.id].htmlContent);
			self.imageHolderDO.addChild(self.htmlContentDO);
			
			if (FWDS3DCUtils.isAndroid)
			{
				self.htmlContentDO.setBackfaceVisibility();
			}
			
			self.htmlContentDO.setWidth(self.thumbWidth - self.borderSize * 2);
			self.htmlContentDO.setHeight(self.thumbHeight - self.borderSize * 2);
			
			self.imageHolderDO.setX(self.borderSize);
			self.imageHolderDO.setY(self.borderSize);
			
			self.imageHolderDO.setWidth(self.thumbWidth - self.borderSize * 2);
			self.imageHolderDO.setHeight(self.thumbHeight - self.borderSize * 2);
		};
		
		this.addText = function(textHolderDO, textGradientDO, textDO)
		{
			if (self.curDataListAr[self.id].emptyText)
				return;
			
			self.textHolderDO = textHolderDO;
			self.textGradientDO = textGradientDO;
			self.textDO = textDO;
			
			
			self.positionText();
			
			self.textDO.setInnerHTML(self.curDataListAr[self.id].thumbText);
			
			self.textTitleOffset = self.curDataListAr[self.id].textTitleOffset;
			self.textDescriptionOffsetTop = self.curDataListAr[self.id].textDescriptionOffsetTop;
			self.textDescriptionOffsetBottom = self.curDataListAr[self.id].textDescriptionOffsetBottom;
			
			if (!data.showTextBackgroundImage || parent.showTextUnderThumbnail_bl)
			{
				self.textGradientDO.setBkColor("transparent");
			}
			
			self.textHolderDO.setAlpha(0);

			self.setTextHeightId = setTimeout(self.setTextHeight, 10);
		};
		
		this.positionText = function(){
			if(!self.textHolderDO) return;
			if(parent.showTextUnderThumbnail_bl){
				if(!parent.contains(self.textHolderDO)) parent.addChild(self.textHolderDO);
			
				var offset = Math.round(parent.stageHeight - (parent.stageHeight * parent.parent.scale))/2;
				self.textHolderDO.setX(Math.round(parent.stageWidth/2 -(self.thumbWidth)/2));
				self.textHolderDO.setY(Math.round(parent.stageHeight/2 + self.getHeight()/2 + parent.carRadiusY + parent.carYOffset) - offset );
			
			}else{
				self.mainDO.addChild(self.textHolderDO);
				self.textHolderDO.setX(self.borderSize);
				self.textHolderDO.setY(self.borderSize);
			}
		}
		
		this.setTextHeight = function()
		{
			if (!self.textHolderDO)
				return;
			
			self.textHeight = self.textDO.getHeight();
			
			if (data.showFullTextWithoutHover)
			{
				if(!parent.showTextUnderThumbnail_bl){
					self.textGradientDO.setY(self.thumbHeight - self.borderSize * 2 - self.textDescriptionOffsetTop - self.textHeight - self.textDescriptionOffsetBottom);
					self.textDO.setY(self.thumbHeight - self.borderSize * 2 - self.textHeight - self.textDescriptionOffsetBottom);
				}
			}
			else
			{
				if(!parent.showTextUnderThumbnail_bl){
					self.textGradientDO.setY(self.thumbHeight - self.borderSize * 2 - self.textTitleOffset);
					self.textDO.setY(self.thumbHeight - self.borderSize * 2 - self.textTitleOffset + self.textDescriptionOffsetTop);
				}
			}
			
			FWDAnimation.to(self.textHolderDO, .8, {alpha:1, ease:Expo.easeOut});
			
			if (!data.showTextBackgroundImage && !parent.showTextUnderThumbnail_bl)
			{
				FWDAnimation.to(self.textGradientDO.screen, .8, {css:{backgroundColor:data.textBackgroundColor}, ease:Expo.easeOut});
			}
			
			self.hasText = true;
			
			self.checkThumbOver();
		};
		
		this.removeText = function()
		{
			if (self.textHolderDO)
			{
				FWDAnimation.to(self.textHolderDO, .6, {alpha:0, ease:Expo.easeOut, onComplete:self.removeTextFinish});
			}
		};
		
		this.removeTextFinish = function()
		{
			FWDAnimation.killTweensOf(self.textHolderDO);
			FWDAnimation.killTweensOf(self.textGradientDO);
			FWDAnimation.killTweensOf(self.textDO);
			
			if(parent.showTextUnderThumbnail_bl){
				parent.removeChild(self.textHolderDO);
			}else{
				self.mainDO.removeChild(self.textHolderDO);
			}
			
			
			self.textHolderDO = null;
			self.textGradientDO = null;
			self.textDO = null;
			
			self.isOver = false;
			self.hasText = false;
		};
		
		this.checkThumbOver = function()
		{
			if (!self.hasText || data.showFullTextWithoutHover)
				return;

			if ((parent.thumbMouseX >= 0) && (parent.thumbMouseX <= self.thumbWidth) && (parent.thumbMouseY >= 0) && (parent.thumbMouseY <= self.thumbHeight))
			{
				self.onThumbOverHandler();
			}
			else
			{
				self.onThumbOutHandler();
			}
		};
		
		this.onThumbOverHandler = function()
		{
			if (!self.isOver)
			{
				self.isOver = true;
				if(!parent.showTextUnderThumbnail_bl){
					FWDAnimation.to(self.textGradientDO, .8, {y:self.thumbHeight - self.borderSize * 2 - self.textDescriptionOffsetTop - self.textHeight - self.textDescriptionOffsetBottom, ease:Expo.easeOut});
					FWDAnimation.to(self.textDO, .8, {y:self.thumbHeight - self.borderSize * 2 - self.textHeight - self.textDescriptionOffsetBottom, ease:Expo.easeOut});
				}
			}
		};

		this.onThumbOutHandler = function()
		{
			if (self.isOver)
			{
				self.isOver = false;
				if(!parent.showTextUnderThumbnail_bl){
					FWDAnimation.to(self.textGradientDO, .8, {y:self.thumbHeight - self.borderSize * 2 - self.textTitleOffset, ease:Expo.easeOut});
					FWDAnimation.to(self.textDO, .8, {y:self.thumbHeight - self.borderSize * 2 - self.textTitleOffset + self.textDescriptionOffsetTop, ease:Expo.easeOut});
				}
			}
		};
		
		this.showThumb3D = function()
		{
			var imgW = self.thumbWidth - self.borderSize * 2;
			var imgH = self.thumbHeight - self.borderSize * 2;
			
			self.imageHolderDO.setWidth(imgW);
			self.imageHolderDO.setHeight(imgH);
		
			
			self.imageDO.setWidth(imgW);
			self.imageDO.setHeight(imgH);
		
			
			FWDAnimation.to(self.imageDO, .8, {alpha:1, ease:Expo.easeInOut});
			
			if (self.reflCanvasDO)
			{
				self.reflCanvasDO.setAlpha(0);
				FWDAnimation.to(self.reflCanvasDO, .8, {alpha:1, delya:.2});
			}
			
		};
		
		this.showThumb2D = function(){
			if (!FWDS3DCUtils.hasTransform2d)
			{
				var scaleW = Math.floor(self.thumbWidth * self.thumbScale);
				var scaleH = Math.floor(self.thumbHeight * self.thumbScale);
				var borderScale = Math.floor(self.borderSize * self.thumbScale);
				
				if ((self.borderSize > 0) && (borderScale < 1))
				{
					borderScale = 1;
				}
			
				var imgW = scaleW - borderScale * 2;
				var imgH = scaleH - borderScale * 2;
				
				self.imageHolderDO.setX(parseInt(scaleW/2));
				self.imageHolderDO.setY(parseInt(scaleH/2));
				
				self.imageHolderDO.setWidth(0);
				self.imageHolderDO.setHeight(0);
				
				FWDAnimation.to(self.imageHolderDO, .8, {x:borderScale, y:borderScale, w:imgW, h:imgH, ease:Expo.easeInOut});
				
				if (data.showThumbnailsHtmlContent)
				{
					if (self.htmlContentDO)
					{
						self.htmlContentDO.setWidth(imgW);
						self.htmlContentDO.setHeight(imgH);
						
						self.htmlContentDO.setX(-parseInt(imgW/2));
						self.htmlContentDO.setY(-parseInt(imgH/2));
						
						FWDAnimation.to(self.htmlContentDO, .8, {x:0, y:0, ease:Expo.easeInOut});
					}
				}
				else
				{
					if (self.imageDO)
					{
						self.imageDO.setWidth(imgW);
						self.imageDO.setHeight(imgH);
						
						self.imageDO.setX(-parseInt(imgW/2));
						self.imageDO.setY(-parseInt(imgH/2));
						
						FWDAnimation.to(self.imageDO, .8, {x:0, y:0, ease:Expo.easeInOut});
						
						if (self.reflCanvasDO)
						{
							self.reflCanvasDO.setAlpha(0);
							FWDAnimation.to(self.reflCanvasDO, .8, {alpha:1, ease:Expo.easeInOut});
						}
					}
				}
			}
			else
			{
				self.setScale2(self.thumbScale);
				
				var imgW = self.thumbWidth - self.borderSize * 2;
				var imgH = self.thumbHeight - self.borderSize * 2;
				
				self.imageHolderDO.setX(parseInt(self.thumbWidth/2));
				self.imageHolderDO.setY(parseInt(self.thumbHeight/2));
				
				self.imageHolderDO.setWidth(0);
				self.imageHolderDO.setHeight(0);
				
				FWDAnimation.to(self.imageHolderDO, .8, {x:self.borderSize, y:self.borderSize, w:imgW, h:imgH, ease:Expo.easeInOut});
				
				if (data.showThumbnailsHtmlContent)
				{
					if (self.htmlContentDO)
					{
						self.htmlContentDO.setWidth(imgW);
						self.htmlContentDO.setHeight(imgH);
						
						self.htmlContentDO.setX(-parseInt(imgW/2));
						self.htmlContentDO.setY(-parseInt(imgH/2));
						
						FWDAnimation.to(self.htmlContentDO, .8, {x:0, y:0, ease:Expo.easeInOut});
					}
				}
				else
				{
					if (self.imageDO)
					{
						self.imageDO.setWidth(imgW);
						self.imageDO.setHeight(imgH);
						
						self.imageDO.setX(-parseInt(imgW/2));
						self.imageDO.setY(-parseInt(imgH/2));
						
						FWDAnimation.to(self.imageDO, .8, {x:0, y:0, ease:Expo.easeInOut});
						
						if (self.reflCanvasDO)
						{
							self.reflCanvasDO.setAlpha(0);
							FWDAnimation.to(self.reflCanvasDO, .8, {alpha:1, ease:Expo.easeInOut});
						}
					}
				}
			}
		};
		
		this.showThumbIntro2D = function(scale, del)
		{
			self.thumbScale = scale;

			if (!FWDS3DCUtils.hasTransform2d)
			{
				var scaleW = Math.floor(self.thumbWidth * scale);
				var scaleH = Math.floor(self.thumbHeight * scale);
				var borderScale = Math.floor(self.borderSize * scale);
				
				if ((self.borderSize > 0) && (borderScale < 1))
				{
					borderScale = 1;
				}
				
				var imgW = scaleW - borderScale * 2;
				var imgH = scaleH - borderScale * 2;
				
				self.setWidth(scaleW);
				self.setHeight(scaleH);
				
				self.mainDO.setWidth(scaleW);
				self.mainDO.setHeight(scaleH);
				
				if (self.borderDO)
				{
					self.borderDO.setWidth(scaleW);
					self.borderDO.setHeight(scaleH);
				}
				
				if (self.bgDO)
				{
					self.bgDO.setX(borderScale);
					self.bgDO.setY(borderScale);
					
					self.bgDO.setWidth(imgW);
					self.bgDO.setHeight(imgH);
				}
				
				self.setX(-self.thumbWidth/2);
				self.setY(-self.thumbHeight/2);
				
				FWDAnimation.to(self, .8, {x:Math.floor(self.newX + (self.thumbWidth - scaleW)/2), y:Math.floor(self.newY + (self.thumbHeight - scaleH)/2), alpha:self.newAlpha, delay:del, ease:Expo.easeOut});
			}
			else
			{
				self.setScale2(self.thumbScale);
				
				self.setX(-self.thumbWidth/2);
				self.setY(-self.thumbHeight/2);

				FWDAnimation.to(self, .8, {x:self.newX, y:self.newY, z:self.newZ, scale:self.thumbScale, alpha:self.newAlpha, delay:del, ease:Quart.easeOut});
			}
		};
		
		this.setScale = function(scale, alpha)
		{
			self.thumbScale = scale;
			
			self.setVisible(true);
			
			if (!FWDS3DCUtils.hasTransform2d)
			{
				var scaleW = Math.floor(self.thumbWidth * scale);
				var scaleH = Math.floor(self.thumbHeight * scale);
				var borderScale = Math.floor(self.borderSize * scale);
				
				if ((self.borderSize > 0) && (borderScale < 1))
				{
					borderScale = 1;
				}
				
				if (self.borderDO)
				{
					self.borderDO.setWidth(scaleW);
					self.borderDO.setHeight(scaleH);
				}
				
				if (self.bgDO)
				{
					self.bgDO.setX(borderScale);
					self.bgDO.setY(borderScale);
					
					self.bgDO.setWidth(scaleW - borderScale * 2);
					self.bgDO.setHeight(scaleH - borderScale * 2);
				}
				
				self.mainDO.setWidth(scaleW);
				self.mainDO.setHeight(scaleH);
				
				self.imageHolderDO.setX(borderScale);
				self.imageHolderDO.setY(borderScale);
				
				self.imageHolderDO.setWidth(scaleW - borderScale * 2);
				self.imageHolderDO.setHeight(scaleH - borderScale * 2);
				
				self.setX(Math.floor(self.newX + (self.thumbWidth - scaleW)/2));
				self.setY(Math.floor(self.newY + (self.thumbHeight - scaleH)/2));
				
				self.setWidth(scaleW);
				self.setHeight(scaleH);
				
				self.setAlpha(alpha);
								
				if (data.showThumbnailsHtmlContent)
				{
					if (self.htmlContentDO)
					{
						self.htmlContentDO.setWidth(scaleW - borderScale * 2);
						self.htmlContentDO.setHeight(scaleH - borderScale * 2);
					}
				}
				else
				{
					if (self.imageDO)
					{
						self.imageDO.setWidth(scaleW - borderScale * 2);
						self.imageDO.setHeight(scaleH - borderScale * 2);
					}
				}
			}
			else
			{
				thumb.setX(Math.floor(self.newX));
				thumb.setY(Math.floor(self.newY));
				
				self.setScale2(self.thumbScale);
				self.setAlpha(alpha);
			}
		};
		
		this.update = function()
		{
			if (parent.showRefl)
			{
				if (!self.reflCanvasDO)
				{
					self.addReflection();
				}
				else
				{
					self.reflCanvasDO.setAlpha(1);
					self.reflCanvasDO.setY(self.thumbHeight + parent.reflDist);
				}
			}
			else
			{
				if (self.reflCanvasDO)
				{
					self.reflCanvasDO.setAlpha(0);
				}
			}
		};
		
		this.hide = function(del){
			var imgW = self.thumbWidth - self.borderSize * 2;
			var imgH = self.thumbHeight - self.borderSize * 2;
			
			if (self.imageDO){
				FWDAnimation.to(self.imageDO, .8, {alpha:0, delay:del, ease:Expo.easeInOut});
				if(self.textHolderDO) FWDAnimation.to(self.textHolderDO, .8, {alpha:0, delay:del, ease:Expo.easeInOut});
				if (self.reflCanvasDO){
					FWDAnimation.to(self.reflCanvasDO, .8, {alpha:0, delay:del, ease:Expo.easeInOut});
				}
			}
		};

		this.onMouseClickHandler = function()
		{
			self.dispatchEvent(FWDS3DCThumb.CLICK, {id:self.id});
		};
		
		this.onMouseTouchHandler = function(e)
		{
			if(e.preventDefault) e.preventDefault();
			
			self.dispatchEvent(FWDS3DCThumb.CLICK, {id:self.id});
		};
		
		/* destroy */
		this.destroy = function()
		{
			FWDAnimation.killTweensOf(self);
			FWDAnimation.killTweensOf(self.mainDO);
			FWDAnimation.killTweensOf(self.imageHolderDO);
			
			if (self.isMobile)
			{
				if (self.hasPointerEvent)
				{
					self.mainDO.screen.removeEventListener("MSPointerUp", self.onMouseTouchHandler);
				}
				else
				{
					self.mainDO.screen.removeEventListener("touchend", self.onMouseTouchHandler);
				}
			}
			else
			{
				if (self.screen.addEventListener)
				{
					self.mainDO.screen.removeEventListener("click", self.onMouseClickHandler);
				}
				else
				{
					self.mainDO.screen.detachEvent("onclick", self.onMouseClickHandler);
				}
			}
			
			clearTimeout(self.setTextHeightId);
			
			if (self.imageDO)
			{
				FWDAnimation.killTweensOf(self.imageDO);
				self.imageDO.disposeImage();
				self.imageDO.destroy();
			}
			
			if (self.htmlContentDO)
			{
				FWDAnimation.killTweensOf(self.htmlContentDO);
				self.htmlContentDO.destroy();
				self.htmlContentDO = null;
			}

			if (self.bgDO)
			{
				FWDAnimation.killTweensOf(self.bgDO);
				self.bgDO.destroy();
				self.bgDO = null;
			}
			
			if (self.borderDO)
			{
				FWDAnimation.killTweensOf(self.borderDO);
				self.borderDO.destroy();
				self.borderDO = null;
			}
			
			if (self.htmlContentDO)
			{
				FWDAnimation.killTweensOf(self.htmlContentDO);
				self.htmlContentDO.destroy();
			}
			
			if (self.textGradientDO)
			{
				FWDAnimation.killTweensOf(self.textGradientDO);
				self.textGradientDO = null;
			}
			
			if (self.textDO)
			{
				FWDAnimation.killTweensOf(self.textDO);
				self.textDO = null;
			}
			
			if (self.textHolderDO)
			{
				FWDAnimation.killTweensOf(self.textHolderDO);
				self.textHolderDO = null
			}

			self.imageHolderDO.destroy();
			self.mainDO.destroy();

			self.imageHolderDO = null;
			self.imageDO = null;
			self.htmlContentDO = null;
			
			self.mainDO = null;
			self.borderDO = null;
			self.bgDO = null;
			self.imageHolderDO = null;
			self.imageDO = null;
			self.htmlContentDO = null;
			self.textHolderDO = null;
			self.textGradientDO = null;
			self.textDO = null;
			
			self.id = null;
			self.data = null;
			self.parent = null;
			self.backgroundColor = null;
			self.borderColor = null;
			
			self.screen.innerHTML = "";
			prototype.destroy();
			prototype = null;
			self = null;
			FWDS3DCThumb.prototype = null;
		};

		this.init();
	};

	/* set prototype */
	FWDS3DCThumb.setPrototype = function()
	{
		FWDS3DCThumb.prototype = new FWDS3DCDisplayObject3D("div", "absolute", "visible");
	};

	FWDS3DCThumb.CLICK = "click";

	FWDS3DCThumb.prototype = null;
	window.FWDS3DCThumb = FWDS3DCThumb;
}(window));/* thumbs manager */
(function(window)
{
	var FWDS3DCThumbsManager = function(data, parent)
	{
		var self = this;
		var prototype = FWDS3DCThumbsManager.prototype;

		this.data = data;
		this.parent = parent;
		
		this.stageWidth = parent.stageWidth;
		this.stageHeight = parent.stageHeight;
		
		this.scale = 1;
		
		this.thumbsHolderDO;

		this.totalThumbs;
		this.thumbsAr = [];
		
		this.dataListId = data.startAtCategory;
		this.autoplayTransitionDuration = data.autoplayTransitionDuration;
		
		this.topologiesAr = ["normal", "ring", "star"];
		
		this.curDataListAr;
		
		this.dragCurId;
		this.prevCurId;
		this.curId;
		
		this.startPos = data.carouselStartPosition;
		
		this.thumbWidth = data.thumbWidth;
		this.thumbHeight = data.thumbHeight;
		
		this.borderSize = data.thumbBorderSize;
		
		this.perspective = self.thumbWidth * 4;
		
		this.carRadiusX = data.carRadiusX;
		this.carRadiusY = data.carRadiusY;
		
		this.carouselXRot = data.carouselXRotation;
		this.carYOffset = data.carouselYOffset;
		
		this.focalLength = 250;
		
		this.thumbMinAlpha = data.thumbMinAlpha;
		
		this.countLoadedThumbsLeft;
		this.countLoadedThumbsRight;
		
		this.controlsDO;
		this.prevButtonDO;
		this.nextButtonDO;
		
		this.timer;
		
		this.controlsHeight = self.data.controlsHeight;
		this.showText = self.data.showText;
		
		this.thumbXSpace3D = self.data.thumbXSpace3D;
		this.thumbXOffset3D = self.data.thumbXOffset3D;
		this.thumbZSpace3D = self.data.thumbZSpace3D;
		this.thumbZOffset3D = self.data.thumbZOffset3D;
		this.thumbYAngle3D = self.data.thumbYAngle3D;
		this.thumbXSpace2D = self.data.thumbXSpace2D;
		this.thumbXOffset2D = self.data.thumbXOffset2D;
		this.bulletsOffset = data.bulletsOffset;
		this.useDrag = data.useDragAndSwipe_bl;
		this.largeNextAndPrevButtonsOffest = data.largeNextAndPrevButtonsOffest;
		
		this.topology = data.carouselTopology;
		
		this.textDO;
		this.textHolderDO;
		this.textGradientDO;
		this.thumbOverDO;
		
		this.showRefl = data.showRefl;
		this.reflHeight = data.reflHeight;
		this.reflDist = data.reflDist;
		this.reflAlpha = data.reflAlpha;
		
		this.showCenterImg = data.showCenterImg;
		this.centerImgPath = data.centerImgPath;
		this.centerImgYOffset = data.centerImgYOffset;
		
		this.centerImgDO;
		
		this.isThumbOver = false;
		this.hasThumbText = false;
		
		this.grabIconPath_str = data.grabIconPath_str;
		this.handIconPath_str = data.handIconPath_str;
		
		this.introFinished = false;
		this.isPlaying = false;
		this.disableThumbClick = false;
		this.isTextSet = false;
		this.allowToSwitchCat = false;
		
		this.showSlideshowButton = data.showSlideshowButton;
		
		this.hasPointerEvent = FWDS3DCUtils.hasPointerEvent;
		this.isMobile = FWDS3DCUtils.isMobile;
	
		this.showTextUnderThumbnail_bl = data.showTextUnderThumbnail_bl;
		this.loadWithDelayIdLeft;
		this.loadWithDelayIdRight;
		this.slideshowTimeoutId;
		this.textTimeoutId;
		this.zSortingId;
		this.hideThumbsFinishedId;
		this.loadHtmlContentsId;
		this.loadImagesId;
		this.setTextHeightId;
		this.setIntroFinishedId;
		this.showControlsId;
		this.showLargeNextAndPrevButtons_bl = data.showLargeNextAndPrevButtons;
		this.areLargeNextAndPrevButtonsShowed = true;
		
		/* init */
		this.init = function()
		{
			self.holderDO = new FWDS3DCDisplayObject3D("div");
			self.addChild(self.holderDO);
			
			self.holderDO.setWidth(self.stageWidth);
			self.holderDO.setHeight(self.stageHeight - self.controlsHeight);
			
			self.thumbsHolderDO = new FWDS3DCDisplayObject3D("div", "absolute", "visible");
			self.holderDO.addChild(self.thumbsHolderDO);
			
			self.thumbsHolderDO.setZ(100000);
			
			if (FWDS3DCUtils.isIEAndLessThen10)
			{
				self.carRadiusX /= 1.5;
			}
			
			self.thumbsHolderDO.setPerspective(self.perspective);
			
			self.thumbsHolderDO.setX(Math.floor(self.stageWidth/2));
			
			
			self.thumbsHolderDO.setY(Math.floor(self.stageHeight/2) + self.carYOffset);
			
			
			
			
			if ((!self.isMobile && !FWDS3DCUtils.isSafari) || FWDS3DCUtils.isAndroidAndWebkit)
			{
				self.thumbsHolderDO.setPreserve3D();
			}
			
			self.thumbsHolderDO.setAngleX(-self.carouselXRot);
			
			if (!self.isMobile)
			{
				if (self.screen.addEventListener)
				{
					window.addEventListener("mousemove", self.onThumbMove);
				}
				else
				{
					document.attachEvent("onmousemove", self.onThumbMove);
				}
			}
			
			if (self.hasPointerEvent)
			{
				window.addEventListener("MSPointerMove", self.onThumbMove);
			}
			
			if (self.showText)
			{
				self.setupText();
			}
			
			self.showCurrentCat(-1);
			self.setupSlideshow();
			
	
			if(!self.isMobile){
				self.addDragScreen();
				self.setupDisableDragScreen();
			}
			if(self.data.addKeyboardSupport) self.addKeyboardSupport();
			if(self.data.enableMouseWheelScroll) self.addMouseWheelSupport();
		};
		
		
		
		
		this.addDragScreen = function(){
			if(self.useDrag){
				self.getStyle().cursor = 'url(' + self.handIconPath_str + '), default';
				parent.mainDO.getStyle().cursor = 'url(' + self.handIconPath_str + '), default';
			}
		};
		
		this.removeDragScreen = function(){
			//if(self.useDrag){
				self.getStyle().cursor = null;
				parent.mainDO.getStyle().cursor = null;
			//}
		};
		
		//#####################################//
		/* Setup disable drag screen */
		//#####################################//
		this.setupDisableDragScreen = function(){
			if(!this.dsb_do){
				this.dsb_do = new FWDS3DCDisplayObject("div");
				if(FWDS3DCUtils.isIE){
					this.dsb_do.setBkColor("#00FF00");
					this.dsb_do.setAlpha(.000001);
				}
				//setTimeout(function(){
					parent.mainDO.addChild(self.dsb_do);
				//}, 100);
				
				self.dsb_do.getStyle().cursor = 'url(' + self.grabIconPath_str + '), default';
			}
			
			this.hideDsb();
		};
		
		this.positionControls = function(){
			
		}
		
		this.showDsb = function(){
			if(self.isDsbShowed_bl) return;
			clearTimeout(self.hideDSBId_to);
			self.isDsbShowed_bl = true;
			this.dsb_do.setVisible(true);
			this.dsb_do.setWidth(self.stageWidth);
			this.dsb_do.setHeight(self.stageHeight);
			
		};
		
		this.hideDsb = function(){
			if(!self.isDsbShowed_bl) return;
			clearTimeout(self.hideDSBId_to);
			self.isDsbShowed_bl = false;
			self.dsb_do.setVisible(false);
			self.dsb_do.setWidth(0);
			self.dsb_do.setHeight(0);
		};
		
		this.onThumbMove = function(e){
			if (self.disableThumbClick || parent.isLigtboxOpened || !self.allowToSwitchCat) return;
			
			var vmc = FWDRLS3DUtils.getViewportMouseCoordinates(e);
			
			self.thumbMouseX = vmc.screenX - parent.rect.left - (self.stageWidth - (self.curDataListAr[self.curId].thumbWidth * self.scale))/2;
			self.thumbMouseY = vmc.screenY - parent.rect.top - (self.stageHeight - (self.thumbsMaxHeight * self.scale) + ((self.thumbsMaxHeight * self.scale) - (self.curDataListAr[self.curId].thumbHeight * self.scale)) * 2)/2;
		
			if (self.showTooltip && !self.isTransition){
				self.thumbsAr[self.curId].checkThumbOver(e);
			}
		};
		
		this.onThumbMove = function(e)
		{
			if (!self.textHolderDO)
				return;
			
			if (self.disableThumbClick)
				return;
			
			var viewportMouseCoordinates = FWDS3DCUtils.getViewportMouseCoordinates(e);
			
			self.thumbMouseX = viewportMouseCoordinates.screenX - parent.rect.left - (self.stageWidth - self.thumbWidth)/2;
			self.thumbMouseY = viewportMouseCoordinates.screenY - parent.rect.top - (self.stageHeight - self.thumbHeight)/2;
			
			if (self.isTextSet)
			{
				if(self.thumbsAr[self.curId]) self.thumbsAr[self.curId].checkThumbOver();
			}
		};
		
		//##############################################//
		/* show current cat */
		//##############################################//
		this.showCurrentCat = function(id)
		{
			if ((id != self.dataListId) && (id >= 0))
			{
				if(self.data.showBulletsNavigation && self.bulletsNavigation){
					self.bulletsNavigation.hideBullets();
				}
				self.allowToSwitchCat = false;
				self.hideCurrentCat();
				self.dataListId = id;
				
				return;
			}
			
			self.thumbsAr = [];
			self.curDataListAr = self.data.dataListAr[self.dataListId];
			self.totalThumbs = self.curDataListAr.length;
			
			if (self.totalThumbs == 0)
			{
				var message = "This category doesn't contain any thumbnails!";

				self.dispatchEvent(FWDS3DCThumbsManager.LOAD_ERROR, {text : message});
				
				return;
			}
			
			if (self.isMobile)
			{
				self.totalThumbs = Math.min(self.totalThumbs, data.maxNumberOfThumbsOnMobile);
			}
			
			if (typeof(self.startPos) == "number")
			{
				self.startPos = Math.floor(self.startPos) - 1;
				
				if (self.startPos < 0)
				{
					self.startPos = Math.floor((self.totalThumbs-1)/2);
				}
				else if (self.startPos > self.totalThumbs-1)
				{
					self.startPos = Math.floor((self.totalThumbs-1)/2);
				}
				
				self.curId = self.startPos;
			}
			else
			{
				switch (self.startPos)
				{
					case "left":
						self.curId = 0;
						break;
					case "right":
						self.curId = self.totalThumbs-1;
						break;
					case "random":
						self.curId = Math.floor(self.totalThumbs * Math.random());
						break;
					default:
						self.curId = Math.floor((self.totalThumbs-1)/2);
				}
			}
		
			if(self.data.showBulletsNavigation && self.bulletsNavigation){
				self.bulletsNavigation.totalItems = self.totalThumbs;
				self.bulletsNavigation.curItemId = self.curId;
				self.bulletsNavigation.createBullets();
				setTimeout(function(){
					self.positionControls();
				}, 400);
			}
			
			self.setupThumbs();
			
			self.prevCurId = self.curId;
			
			self.startIntro();
		};
		
		//################################################//
		/* hide current cat */
		//################################################//
		this.hideCurrentCat = function()
		{
			clearTimeout(self.loadWithDelayIdLeft);
			clearTimeout(self.loadWithDelayIdRight);
			clearTimeout(self.textTimeoutId);
			clearInterval(self.zSortingId);
			clearTimeout(self.hideThumbsFinishedId);
			clearTimeout(self.loadHtmlContentsId);
			clearTimeout(self.loadImagesId);
			clearTimeout(self.setTextHeightId);
			clearTimeout(self.setIntroFinishedId);
			clearTimeout(self.showControlsId);
			
			self.stopSlideshow();
			
			self.disableThumbClick = true;
			
			if (self.image)
			{
				self.image.onload = null;
				self.image.onerror = null;
			}
			
			if (self.imageLeft)
			{
				self.imageLeft.onload = null;
				self.imageLeft.onerror = null;
			}
			
			if (self.imageRight)
			{
				self.imageRight.onload = null;
				self.imageRight.onerror = null;
			}
			
			self.hideThumbs();
		};
		
		this.hideThumbs = function()
		{
			var delay;
			var delayDelta;
			var newX = -self.thumbWidth/2;
			var maxNrOfSideThumbs = Math.max(self.totalThumbs - self.curId, self.curId);
			
			delayDelta = Math.floor(1000/maxNrOfSideThumbs);
			
			for (var i=0; i<self.totalThumbs; i++)
			{
				thumb = self.thumbsAr[i];
				
				if (i == self.curId)
				{
					self.hideThumbsFinishedId = setTimeout(self.hideThumbsFinished, 500);
				}
				else
				{
					delay = Math.abs(maxNrOfSideThumbs - Math.abs(i - self.curId) + 1) * delayDelta;
					FWDAnimation.to(thumb, .8, {x:Math.floor(newX), alpha:0, ease:Expo.easeOut});
					thumb.hide(0);
				}
			}
		};
		
		this.hideThumbsFinished = function()
		{
			for (var i=0; i<self.totalThumbs; i++)
			{
				thumb = self.thumbsAr[i];
				
				if (i == self.curId)
				{
					thumb.hide(0);
					FWDAnimation.to(thumb, .6, {alpha:0, delay:.2, onComplete:self.allThumbsAreTweened});
				}
				else
				{
					thumb.setAlpha(0);
				}
			}
		};
		
		this.allThumbsAreTweened = function()
		{
			self.destroyCurrentCat();
			self.showCurrentCat();
		};
		
		this.destroyCurrentCat = function()
		{
			var thumb;
			
			for (var i=0; i<self.totalThumbs; i++)
			{
				thumb = self.thumbsAr[i];
				FWDAnimation.killTweensOf(thumb);
				self.thumbsHolderDO.removeChild(thumb);
				thumb.destroy();
				thumb = null;
			}
		};
		
		this.startIntro = function()
		{
			self.disableThumbClick = true;
			
			thumb = self.thumbsAr[self.curId];
			
			var newX = -self.thumbWidth/2;
			var newY = self.carRadiusY * Math.sin(Math.PI/2) - self.thumbHeight/2;
			
			thumb.setX(Math.floor(newX));
			thumb.setY(Math.floor(newY));
			
			thumb.setAlpha(0);
			FWDAnimation.to(thumb, .8, {alpha:1});
			
			self.thumbsHolderDO.addChild(thumb);
			
			if (self.data.showThumbnailsHtmlContent)
			{
				self.loadCenterHtmlContent();
				self.loadHtmlContentsId = setTimeout(self.loadHtmlContents, 600);
			}
			else
			{
				self.loadCenterImage();
				self.loadImagesId = setTimeout(self.loadImages, 600);
			}
			
			if (self.showCenterImg && !self.centerImgDO)
			{
				self.setupCenterImg();
			}
		};
		
		this.setupCenterImg = function()
		{
			self.centerImage = new Image();
			
			self.centerImage.onerror = self.onCenterImageLoadErrorHandler;
			self.centerImage.onload = self.onCenterImageLoadHandler;
			self.centerImage.src = self.centerImgPath;
		};
		
		this.onCenterImageLoadHandler = function()
		{
			self.centerImgDO = new FWDS3DCDisplayObject3D("div");
			self.thumbsHolderDO.addChild(self.centerImgDO);
			
			self.centerImg = new FWDS3DCSimpleDisplayObject("img");
			self.centerImg.setScreen(self.centerImage);
			self.centerImgDO.addChild(self.centerImg);
			
			self.centerImg.screen.ontouchstart = null;
			
			self.centerImgDO.setWidth(self.centerImg.getWidth());
			self.centerImgDO.setHeight(self.centerImg.getHeight());
			
			self.centerImgDO.setX(-Math.floor(self.centerImgDO.getWidth()/2));
			self.centerImgDO.setY(-Math.floor(self.centerImgDO.getHeight()/2) + self.centerImgYOffset);
			
			self.centerImgDO.setZ(-self.carRadiusX);
			
			if (FWDS3DCUtils.isIE || !FWDS3DCUtils.hasTransform3d || self.data.showDisplay2DAlways)
			{
				self.centerImgDO.setZIndex(Math.floor(self.carRadiusX) + 1);
			}
			
			self.centerImgDO.setScale3D(self.scale * self.centerImgDO.getWidth() / self.centerImgDO.screen.getBoundingClientRect().width);
			
			self.centerImgDO.setAlpha(0);
			FWDAnimation.to(self.centerImgDO, .8, {alpha:1});
		};
		
		this.onCenterImageLoadErrorHandler = function(e)
		{
			if (!self || !self.data)
				return;

			var message = "Center image can't be loaded, probably the path is incorrect <font color='#FF0000'>" + self.centerImgPath + "</font>";

			self.dispatchEvent(FWDS3DCThumbsManager.LOAD_ERROR, {text : message});
		};

		/* setup thumbs */
		this.setupThumbs = function()
		{
			var thumb;
			
			for (var i=0; i<self.totalThumbs; i++)
			{
				FWDS3DCThumb.setPrototype();
				
				thumb = new FWDS3DCThumb(i, self.data, self, self.data.dataListAr[self.dataListId][i].link, self.data.dataListAr[self.dataListId][i].target);
				
				self.thumbsAr.push(thumb);
				
				thumb.addListener(FWDS3DCThumb.CLICK, self.onThumbClick);
			}
		};
		
		this.onThumbClick = function(e)
		{
			if (self.disableThumbClick)
				return;
			
			self.curId = e.id;
			
			self.thumbClickHandler();
		};
		
		this.thumbClickHandler = function(){
			if(self.disableThumbClick) return;
			if (self.curId != self.prevCurId){
				self.withoutSlideshow = true;
				self.gotoThumb();
			}else{
				
				var link = self.curDataListAr[self.curId].link;
				var target = self.curDataListAr[self.curId].target;
				
				if(link) window.open(link, target);
			}
		};
		
		this.resizeHandler = function(scale)
		{
			self.stageWidth = parent.stageWidth;
			self.stageHeight = parent.stageHeight;
			
			self.holderDO.setWidth(self.stageWidth);
			self.holderDO.setHeight(self.stageHeight - self.controlsHeight);
			
			self.thumbsHolderDO.setX(Math.floor(self.stageWidth/2));
			
			self.scale = scale;
			
			self.thumbsHolderDO.setScale3D(self.scale);
			
			if (self.data.controlsPos)
			{
				self.thumbsHolderDO.setY(Math.floor((self.stageHeight - self.controlsHeight)/2 + self.controlsHeight + self.carYOffset));
			}
			else
			{
				self.thumbsHolderDO.setY(Math.floor(self.stageHeight/2) + self.carYOffset);
			}
			
			self.positionControls();
			
			if (self.thumbOverDO)
			{
				self.thumbOverDO.setX(Math.floor((self.stageWidth - self.thumbWidth)/2));
				self.thumbOverDO.setY(Math.floor((self.stageHeight - self.thumbHeight - self.controlsHeight)/2));
			}
			self.positionCurText();
			self.postionNextAndPrevLargeButtons();
		};
		
		this.positionCurText = function(){
			var curThumb = self.thumbsAr[self.curId];
			if(curThumb) curThumb.positionText();
		}
		
		this.setupText = function()
		{
			self.textHolderDO = new FWDS3DCDisplayObject3D("div");
			self.addChild(self.textHolderDO);
			
			self.textHolderDO.setWidth(self.thumbWidth - self.borderSize * 2);
			self.textHolderDO.setHeight(self.thumbHeight - self.borderSize * 2);
			
			self.textHolderDO.setX(-1000);
			
			if (self.data.showTextBackgroundImage)
			{
				self.textGradientDO = new FWDS3DCSimpleDisplayObject("img");
				if(!self.showTextUnderThumbnail_bl) self.textHolderDO.addChild(self.textGradientDO);
				
				self.textGradientDO.setWidth(self.thumbWidth - self.borderSize * 2);
				self.textGradientDO.setHeight(self.thumbHeight - self.borderSize * 2);
				
				self.textGradientDO.screen.src = data.thumbTitleGradientPath;
			}
			else
			{
				self.textGradientDO = new FWDS3DCSimpleDisplayObject("div");
				self.textHolderDO.addChild(self.textGradientDO);
				
				self.textGradientDO.setWidth(self.thumbWidth - self.borderSize * 2);
				self.textGradientDO.setHeight(self.thumbHeight - self.borderSize * 2);
				
				self.textGradientDO.setBkColor(self.data.textBackgroundColor);
				self.textGradientDO.setAlpha(self.data.textBackgroundOpacity);
			}
			
			self.textDO = new FWDS3DCSimpleDisplayObject("div");
			self.textHolderDO.addChild(self.textDO);
			
			self.textDO.setWidth(self.thumbWidth - self.borderSize * 2);
			
			self.textDO.getStyle().fontSmoothing = "antialiased";
			self.textDO.getStyle().webkitFontSmoothing = "antialiased";
			self.textDO.getStyle().textRendering = "optimizeLegibility";
		};
		
		this.onThumbOverClick = function()
		{
			if (self.disableThumbClick)
				return;
			
			self.thumbClickHandler();
		};
		
		this.onThumbOverTouch = function(e)
		{
			if(e.preventDefault) e.preventDefault();
			
			if (self.disableThumbClick)
				return;
			
			self.thumbClickHandler();
		};
		
		this.addThumbText = function(){
			
			self.textHolderDO.setY(Math.floor((self.stageHeight - self.thumbHeight - self.controlsHeight)/2) + self.borderSize);

			self.textDO.setInnerHTML(self.curDataListAr[self.curId].thumbText);
			
			self.textTitleOffset = self.curDataListAr[self.curId].textTitleOffset;
			self.textDescriptionOffsetTop = self.curDataListAr[self.curId].textDescriptionOffsetTop;
			self.textDescriptionOffsetBottom = self.curDataListAr[self.curId].textDescriptionOffsetBottom;
			
			if(!self.showTextUnderThumbnail_bl) self.textGradientDO.setY(self.thumbHeight - self.borderSize * 2 - self.textTitleOffset);
			self.textDO.setY(self.thumbHeight - self.borderSize * 2 - self.textTitleOffset + self.textDescriptionOffsetTop);
			
			self.textHolderDO.setAlpha(0);
	
			self.setTextHeightId = setTimeout(self.setTextHeight, 10);
		};
	
		this.setTextHeight = function(){	
			self.textHeight = self.textDO.getHeight();
			
			FWDAnimation.to(self.textHolderDO, .8, {alpha:1, ease:Expo.easeOut});
			if(!self.showTextUnderThumbnail_bl) FWDAnimation.to(self.textGradientDO, .8, {alpha:1, ease:Expo.easeOut});
			
			self.hasThumbText = true;
			
			self.checkThumbOver();
		};
		
		this.removeThumbText = function()
		{
			FWDAnimation.to(self.textHolderDO, .6, {alpha:0, ease:Expo.easeOut, onComplete:self.removeTextFinish});
		};
		
		this.removeTextFinish = function()
		{
			FWDAnimation.killTweensOf(self.textHolderDO);
			FWDAnimation.killTweensOf(self.textGradientDO);
			FWDAnimation.killTweensOf(self.textDO);
			
			self.hasThumbText = false;
			self.isThumbOver = false;
			
			self.textHolderDO.setY(2000);
		};
		
		this.checkThumbOver = function()
		{
			if (!self.hasThumbText)
				return;
			
			if ((self.thumbMouseX >= 0) && (self.thumbMouseX <= self.thumbWidth) && (self.thumbMouseY >= 0) && (self.thumbMouseY <= self.thumbHeight))
			{
				self.onThumbOverHandler();
			}
			else
			{
				self.onThumbOutHandler();
			}
		};
		
		this.onThumbOverHandler = function()
		{
			if (!self.isThumbOver)
			{
				self.isThumbOver = true;
				
				FWDAnimation.to(self.textGradientDO, .8, {y:self.thumbHeight - self.borderSize * 2 - self.textDescriptionOffsetTop - self.textHeight - self.textDescriptionOffsetBottom, ease:Expo.easeOut});
				FWDAnimation.to(self.textDO, .8, {y:self.thumbHeight - self.borderSize * 2 - self.textHeight - self.textDescriptionOffsetBottom, ease:Expo.easeOut});
			}
		};

		this.onThumbOutHandler = function()
		{
			if (self.isThumbOver)
			{
				self.isThumbOver = false;
				
				FWDAnimation.to(self.textGradientDO, .8, {y:self.thumbHeight - self.borderSize * 2 - self.textTitleOffset, ease:Expo.easeOut});
				FWDAnimation.to(self.textDO, .8, {y:self.thumbHeight - self.borderSize * 2 - self.textTitleOffset + self.textDescriptionOffsetTop, ease:Expo.easeOut});
			}
		};
		
		this.loadImages = function()
		{
			if (FWDS3DCUtils.hasTransform3d && !self.data.showDisplay2DAlways)
			{	
				self.setupIntro3D();
			}
			else
			{
				self.setupIntro2D();
			}
			
			self.countLoadedThumbsLeft = self.curId - 1;
			self.loadWithDelayIdLeft = setTimeout(self.loadThumbImageLeft, 100);
			
			self.countLoadedThumbsRight = self.curId + 1;
			self.loadWithDelayIdRight = setTimeout(self.loadThumbImageRight, 100);
		};
		
		this.loadCenterImage = function()
		{
			self.imagePath = self.curDataListAr[self.curId].thumbPath;

			self.image = new Image();
			self.image.onerror = self.onImageLoadErrorHandler;
			self.image.onload = self.onImageLoadHandlerCenter;
			self.image.src = self.imagePath;
		};
		
		this.onImageLoadHandlerCenter = function(e)
		{
			var thumb = self.thumbsAr[self.curId];
			
			thumb.addImage(self.image);
			
			if (FWDS3DCUtils.hasTransform3d && !self.data.showDisplay2DAlways)
			{
				thumb.showThumb3D();
			}
			else
			{
				thumb.showThumb2D();
			}
			
			if (self.showText)
			{
				self.isTextSet = true;
				
				thumb.addText(self.textHolderDO, self.textGradientDO, self.textDO);
			}
		};

		this.loadThumbImageLeft = function()
		{
			if (self.countLoadedThumbsLeft < 0)
					return;
			
			self.imagePath = self.curDataListAr[self.countLoadedThumbsLeft].thumbPath;

			self.imageLeft = new Image();
			self.imageLeft.onerror = self.onImageLoadErrorHandler;
			self.imageLeft.onload = self.onImageLoadHandlerLeft;
			self.imageLeft.src = self.imagePath;
		};

		this.onImageLoadHandlerLeft = function(e)
		{
			var thumb = self.thumbsAr[self.countLoadedThumbsLeft];

			thumb.addImage(self.imageLeft);
			
			if (FWDS3DCUtils.hasTransform3d && !self.data.showDisplay2DAlways)
			{
				thumb.showThumb3D();
			}
			else
			{
				thumb.showThumb2D();
			}
			
			self.countLoadedThumbsLeft--;
			
			self.loadWithDelayIdLeft = setTimeout(self.loadThumbImageLeft, 200);
		};
		
		this.loadThumbImageRight = function()
		{
			if (self.countLoadedThumbsRight > self.totalThumbs-1)
				return;
			
			self.imagePath = self.curDataListAr[self.countLoadedThumbsRight].thumbPath;

			self.imageRight = new Image();
			self.imageRight.onerror = self.onImageLoadErrorHandler;
			self.imageRight.onload = self.onImageLoadHandlerRight;
			self.imageRight.src = self.imagePath;
		};

		this.onImageLoadHandlerRight = function(e)
		{
			var thumb = self.thumbsAr[self.countLoadedThumbsRight];

			thumb.addImage(self.imageRight);

			if (FWDS3DCUtils.hasTransform3d && !self.data.showDisplay2DAlways)
			{
				thumb.showThumb3D();
			}
			else
			{
				thumb.showThumb2D();
			}
			
			self.countLoadedThumbsRight++;
			
			self.loadWithDelayIdRight = setTimeout(self.loadThumbImageRight, 200);
		};

		this.onImageLoadErrorHandler = function(e)
		{
			if (!self || !self.data)
				return;

			var message = "Thumb can't be loaded, probably the path is incorrect <font color='#FF0000'>" + self.imagePath + "</font>";

			self.dispatchEvent(FWDS3DCThumbsManager.LOAD_ERROR, {text : message});
		};
		
		this.loadHtmlContents = function()
		{
			if (FWDS3DCUtils.hasTransform3d && !self.data.showDisplay2DAlways)
			{	
				self.setupIntro3D();
			}
			else
			{
				self.setupIntro2D();
			}
			
			self.countLoadedThumbsLeft = self.curId - 1;
			self.loadWithDelayIdLeft = setTimeout(self.loadThumbHtmlContentLeft, 100);
			
			self.countLoadedThumbsRight = self.curId + 1;
			self.loadWithDelayIdRight = setTimeout(self.loadThumbHtmlContentRight, 100);
		};
		
		this.loadCenterHtmlContent = function()
		{
			var thumb = self.thumbsAr[self.curId];

			thumb.addHtmlContent();
			
			if (FWDS3DCUtils.hasTransform3d && !self.data.showDisplay2DAlways)
			{
				thumb.showThumb3D();
			}
			else
			{
				thumb.showThumb2D();
			}
			
			if (self.showText)
			{
				self.isTextSet = true;
				
				thumb.addText(self.textHolderDO, self.textGradientDO, self.textDO);
			}
		};

		this.loadThumbHtmlContentLeft = function()
		{
			if (self.countLoadedThumbsLeft < 0)
					return;
			
			var thumb = self.thumbsAr[self.countLoadedThumbsLeft];

			thumb.addHtmlContent();
			
			if (FWDS3DCUtils.hasTransform3d && !self.data.showDisplay2DAlways)
			{
				thumb.showThumb3D();
			}
			else
			{
				thumb.showThumb2D();
			}
			
			self.countLoadedThumbsLeft--;
			
			self.loadWithDelayIdLeft = setTimeout(self.loadThumbHtmlContentLeft, 200);
		};

		this.loadThumbHtmlContentRight = function()
		{
			if (self.countLoadedThumbsRight > self.totalThumbs-1)
				return;
			
			var thumb = self.thumbsAr[self.countLoadedThumbsRight];

			thumb.addHtmlContent();

			if (FWDS3DCUtils.hasTransform3d && !self.data.showDisplay2DAlways)
			{
				thumb.showThumb3D();
			}
			else
			{
				thumb.showThumb2D();
			}
			
			self.countLoadedThumbsRight++;
			
			self.loadWithDelayIdRight = setTimeout(self.loadThumbHtmlContentRight, 200);
		};
		
		this.setupIntro3D = function()
		{
			var newX;
			var newY;
			var newZ;
			var newAlpha;
			
			var newAngleY;
			
			var delay;
			
			for (var i=0; i<self.totalThumbs; i++)
			{
				thumb = self.thumbsAr[i];
				
				newX = -Math.floor(self.thumbWidth/2);
				newY = -Math.floor(self.thumbHeight/2);
				
				if (i != self.curId)
				{
					thumb.setX(Math.floor(newX));
					thumb.setY(Math.floor(newY));
				}
				
				newX = 0;
				newY = 0;
				newZ = 0;
				
				newAlpha = 1;

				newAngleY = 0;
				
				var pos = 0;
				
				if (i < self.curId)
				{
					pos = i - self.curId + self.totalThumbs;
				}
				else
				{
					pos = i - self.curId;
				}
				
				thumb.carAngle = (pos / self.totalThumbs) * Math.PI * 2;
				
				newX = self.carRadiusX * Math.sin(thumb.carAngle);
				newY = self.carRadiusY * Math.sin(thumb.carAngle + Math.PI/2);
				newZ = self.carRadiusX * Math.cos(thumb.carAngle) - self.carRadiusX;
				if(newZ == 0) self.centerThumbnail_do = thumb;
				
				
				
				if (FWDS3DCUtils.isSafari && (newZ < -self.carRadiusX/2))
				{
					thumb.screen.style.pointerEvents = "none";
					
				}
				else
				{
					thumb.screen.style.pointerEvents = "auto";
				}

				if (i != self.curId)
				{
					switch (self.topology)
					{
						case "ring":
							newAngleY = (pos / self.totalThumbs) * 360;
							break;
						case "star":
							newAngleY = (pos / self.totalThumbs) * 360 + 90;
							break;
						default:
							newAngleY = 0;
					}
					
					thumb.setAlpha(0);
				}

				newX = Math.floor(newX) - Math.floor(self.thumbWidth/2);
				newY = Math.floor(newY) - Math.floor(self.thumbHeight/2);
				thumb.newX = newX;
				thumb.newY = newY;
				
				thumb.setZ(Math.floor(newZ));
				thumb.newZ = Math.floor(newZ);
				if(newZ == 0) self.centerThumbnail_do = thumb;
				
				newAlpha = 1 + (1 - self.thumbMinAlpha) * (newZ / (self.carRadiusX * 2));
				
				delay = Math.abs(i - self.curId) * Math.floor(1000/(self.totalThumbs/2));
				
				FWDAnimation.to(thumb, .8, {x:Math.floor(newX), y:Math.floor(newY), z:Math.floor(newZ), angleY:newAngleY, alpha:newAlpha, delay:delay/1000, ease:Quart.easeOut});
				
				self.thumbsHolderDO.addChild(thumb);
				
			}
			
			if (FWDS3DCUtils.isIE || !FWDS3DCUtils.hasTransform3d || self.data.showDisplay2DAlways)
			{
				self.sortZ();
			}
			
			self.setIntroFinishedId = setTimeout(self.setIntroFinished, delay + 800);
			self.showControlsId = setTimeout(self.showControls, delay);
		};
		
		this.setupIntro2D = function()
		{
			var newX;
			var newY;
			var newZ;
			var newScale;
			var delay;
			
			for (var i=0; i<self.totalThumbs; i++)
			{
				thumb = self.thumbsAr[i];
				
				var pos = 0;
				
				if (i < self.curId)
				{
					pos = i - self.curId + self.totalThumbs;
				}
				else
				{
					pos = i - self.curId;
				}
				
				thumb.carAngle = (pos / self.totalThumbs) * Math.PI * 2;
				
				newX = self.carRadiusX * Math.sin(thumb.carAngle);
				newY = self.carRadiusY * Math.sin(thumb.carAngle + Math.PI/2);
				newZ = self.carRadiusX * Math.cos(thumb.carAngle) - self.carRadiusX;
				if(newZ == 0) self.centerThumbnail_do = thumb;
				
				newX = Math.floor(newX) - Math.floor(self.thumbWidth/2);
				newY = Math.floor(newY) - Math.floor(self.thumbHeight/2);
				
				newScale = self.focalLength / (self.focalLength - newZ);
				
				delay = Math.abs(i - self.curId) * Math.floor(1000/self.totalThumbs);
				
				thumb.newX = Math.floor(newX);
				thumb.newY = Math.floor(newY);
				thumb.newZ = Math.floor(newZ);
				
				
				thumb.newAlpha = 1 + (1 - self.thumbMinAlpha) * (newZ / (self.carRadiusX * 2));
				
				if (pos != 0)
				{
					thumb.showThumbIntro2D(newScale, delay/1000);
					
					self.thumbsHolderDO.addChild(thumb);
				}
			}
			
			self.sortZ();
			
			self.setIntroFinishedId = setTimeout(self.setIntroFinished, delay + 800);
			self.showControlsId = setTimeout(self.showControls, delay);
		};
		
		this.setIntroFinished = function()
		{
			
			self.introFinished = true;
			self.allowToSwitchCat = true;
			self.disableThumbClick = false;
			
			self.dispatchEvent(FWDS3DCThumbsManager.THUMBS_INTRO_FINISH);
			
			self.addNavigation();
			
			if (FWDS3DCUtils.isIE || !FWDS3DCUtils.hasTransform3d || self.data.showDisplay2DAlways)
			{
				self.zSortingId = setInterval(self.sortZ, 16);
			}
			
			
			
			if (self.data.autoplay){
				self.startSlideshow();
			}
		};
		
		this.removeNavigation = function(){
			self.removeMobileDrag();
		};
		
		this.addNavigation = function(){
			self.removeNavigation();
			if (self.isMobile || self.useDrag){
				self.setupMobileDrag();
			}
		};
		
		this.setThumbText = function()
		{
			self.isTextSet = true;
			
			if(self.thumbsAr[self.curId]) self.thumbsAr[self.curId].addText(self.textHolderDO, self.textGradientDO, self.textDO);
		};
		
		this.gotoThumb = function()
		{
			self.autoplayTD = .8;
			if (!self.introFinished)
				return;

			if (self.isPlaying)
			{
				if(!self.withoutSlideshow) self.autoplayTD = self.autoplayTransitionDuration;
				self.withoutSlideshow = true;
				clearTimeout(self.slideshowTimeoutId);
				self.slideshowTimeoutId = setTimeout(self.startTimeAgain, self.data.transitionDelay);
				
				if (self.timer.isCounting)
				{
					self.timer.resetCounter();
				}
			}
			
			if (self.showText)
			{
				if (self.isTextSet)
				{
					self.isTextSet = false;
					
					try{
						self.thumbsAr[self.prevCurId].removeText();
					}catch(e){}
					
					clearTimeout(self.textTimeoutId);
					self.textTimeoutId = setTimeout(self.setThumbText, self.autoplayTD * 1000);
				}
				else
				{
					clearTimeout(self.textTimeoutId);
					self.textTimeoutId = setTimeout(self.setThumbText, self.autoplayTD * 1000);
				}
			}
			
			self.prevCurId = self.curId;

			self.reorderCarousel();
			
			if(self.data.showBulletsNavigation){
				self.bulletsNavigation.updateBullets(self.curId);
			}
			
			self.dispatchEvent(FWDS3DCThumbsManager.THUMB_CHANGE, {id:self.curId});
		};
		
		this.normAngle = function(angle)
		{
			while (angle < 0)
				angle += 360;
			
			return angle;
		};
		
		this.reorderCarousel = function(){
			if(!self.thumbsAr[self.curId]) return;
			var moveAmount;
			var angleToAdd = self.normAngle(self.thumbsAr[self.curId].carAngle * (180 / Math.PI)) % 360;
			
			if ((angleToAdd >= 0) && (angleToAdd <= 180))
			{
				moveAmount = -angleToAdd;
			}
			else if (angleToAdd > 180)
			{
				moveAmount = 360 - angleToAdd;
			}
			
			for (var i=0; i<self.totalThumbs; i++)
			{
				thumb = self.thumbsAr[i];
				
				var tempAngle = thumb.carAngle + moveAmount * (Math.PI / 180);
				
				var newAngleY = 0;
				var curAngle;
				var pos = 0;
				
				if (i < self.curId)
				{
					pos = i - self.curId + self.totalThumbs;
				}
				else
				{
					pos = i - self.curId;
				}

				if (i != self.curId)
				{
					switch (self.topology)
					{
						case "ring":
							newAngleY = (pos / self.totalThumbs) * 360;
							break;
						case "star":
							newAngleY = (pos / self.totalThumbs) * 360 + 90;
							break;
						default:
							newAngleY = 0;
					}
				}
				
				newAngleY = Math.round(newAngleY) % 360;
				curAngle = self.normAngle(Math.round(thumb.getAngleY())) % 360;
				
				if (Math.abs(curAngle - newAngleY) > 180)
				{
					if (curAngle > newAngleY)
					{
						curAngle -= 360;
					}
					else
					{
						newAngleY -= 360;
					}
				}
				
				thumb.setAngleY(curAngle);
				
				FWDAnimation.killTweensOf(thumb);
				FWDAnimation.to(thumb, self.autoplayTD, {carAngle:tempAngle, angleY:newAngleY, ease:Quart.easeOut, onUpdate:self.updateCarousel});
			}
		};
		
		this.updateCarousel = function()
		{
			var newX;
			var newY;
			var newZ;
			var newScale;
			
			for (var i=0; i<self.totalThumbs; i++)
			{
				thumb = self.thumbsAr[i];
				
				newX = self.carRadiusX * Math.sin(thumb.carAngle);
				newY = self.carRadiusY * Math.sin(thumb.carAngle + Math.PI/2);
				newZ = self.carRadiusX * Math.cos(thumb.carAngle) - self.carRadiusX;
				if(newZ == 0) self.centerThumbnail_do = thumb;
				
				newX = Math.floor(newX) - Math.floor(self.thumbWidth/2);
				newY = Math.round(newY) - Math.floor(self.thumbHeight/2);
				
				if (!FWDS3DCUtils.isIEAndLessThen10 && FWDS3DCUtils.hasTransform3d && !self.data.showDisplay2DAlways)
				{
					thumb.setX(Math.floor(newX));
					thumb.setY(Math.floor(newY));
					thumb.setZ(Math.floor(newZ));
					
					thumb.setAlpha(1 + (1 - self.thumbMinAlpha) * (newZ / (self.carRadiusX * 2)));
					
					if (FWDS3DCUtils.isSafari && (newZ < -self.carRadiusX/2))
					{
						thumb.screen.style.pointerEvents = "none";
						
					}
					else
					{
						thumb.screen.style.pointerEvents = "auto";
					}
					
				}
				else
				{
					newScale = self.focalLength / (self.focalLength - newZ);
					
					thumb.newX = Math.floor(newX);
					thumb.newY = Math.floor(newY);
					
					thumb.setScale(newScale, 1 + (1 - self.thumbMinAlpha) * (newZ / (self.carRadiusX * 2)));
				}
				
				thumb.newZ = Math.floor(newZ);
			}
			
		};
		
		this.sortZ = function()
		{
			var zIndex;
			
			for (var i=0; i<self.totalThumbs; i++)
			{
				thumb = self.thumbsAr[i];
				
				zIndex = Math.floor(thumb.newZ);
				
				thumb.setZIndex(zIndex + Math.floor(self.carRadiusX * 2) + 1);
			}
		};
		
		this.setupLargeNextButton = function(){
			FWDS3DCSimpleButton.setPrototype();
			self.largeNextButtonDO = new FWDS3DCSimpleButton(self.data.largeNextButton_img, self.data.largeNextButtonSPath_str);
			self.largeNextButtonDO.addListener(FWDS3DCSimpleButton.MOUSE_UP, self.nextButtonOnClickHandler);
			self.addChild(self.largeNextButtonDO);
		};
		
		this.setupLargePrevButton = function(){
			FWDS3DCSimpleButton.setPrototype();
			
			self.largePrevButtonDO = new FWDS3DCSimpleButton(self.data.largePrevButton_img, self.data.largePrevButtonSPath_str);
			self.largePrevButtonDO.addListener(FWDS3DCSimpleButton.MOUSE_UP, self.prevButtonOnClickHandler);
			self.addChild(self.largePrevButtonDO);
		};
		
		this.showLargeNextAndPrevButtons = function(animate){
			if(self.areLargeNextAndPrevButtonsShowed) return;
			self.areLargeNextAndPrevButtonsShowed = true;
			self.postionNextAndPrevLargeButtons(animate);
			self.largeNextButtonDO.setVisible(true);
			self.largePrevButtonDO.setVisible(true);
		};
		
		this.hideLargeNextAndPrevButtons = function(){
			if(!self.areLargeNextAndPrevButtonsShowed) return;
			self.areLargeNextAndPrevButtonsShowed = false;
			self.largeNextButtonDO.setVisible(false);
			self.largePrevButtonDO.setVisible(false);
			self.largePrevButtonDO.setX(- self.largePrevButtonDO.w);
			self.largeNextButtonDO.setX(self.stageWidth);
		};
		
		
		this.postionNextAndPrevLargeButtons = function(animate){	
			
			if(self.areLargeNextAndPrevButtonsShowed && self.largePrevButtonDO){
				FWDAnimation.killTweensOf(self.largePrevButtonDO);
				FWDAnimation.killTweensOf(self.largeNextButtonDO);
				if(animate){
					FWDAnimation.to(self.largePrevButtonDO, .8, {x:self.largeNextAndPrevButtonsOffest, ease:Expo.easeInOut});
					FWDAnimation.to(self.largeNextButtonDO, .8, {x:self.stageWidth - self.largeNextButtonDO.w - self.largeNextAndPrevButtonsOffest, ease:Expo.easeInOut});
				}else{
					self.largePrevButtonDO.setX(self.largeNextAndPrevButtonsOffest);
					self.largeNextButtonDO.setX(self.stageWidth - self.largeNextButtonDO.w - self.largeNextAndPrevButtonsOffest);
				}
				
				if (self.showScrollbar || self.showSlideshowButton || self.showPrevButton || self.showNextButton){
					self.largeNextButtonDO.setY(parseInt((self.stageHeight - self.largeNextButtonDO.h - self.controlsHeight)/2));
					self.largePrevButtonDO.setY(parseInt((self.stageHeight - self.largePrevButtonDO.h -  self.controlsHeight)/2));
				}else{
					self.largeNextButtonDO.setY(parseInt((self.stageHeight - self.largeNextButtonDO.h)/2));
					self.largePrevButtonDO.setY(parseInt((self.stageHeight - self.largePrevButtonDO.h)/2));
				}
			}
		};
		
		this.setupBulletsNavigation = function(){
			FWDS3DCBulletsNavigation.setPrototype();
			self.bulletsNavigation = new FWDS3DCBulletsNavigation(self.data, self.totalThumbs, self.curId);
			self.bulletsNavigation.addListener(FWDS3DCBulletsNavigation.BULLET_CLICK, self.bulletNavigationClick);
			self.addChild(self.bulletsNavigation);
		};
		
		this.bulletNavigationClick = function(e){
			self.curId = e.id;
			self.withoutSlideshow = true;
			self.gotoThumb();
		};
		
		this.setupPrevButton = function(){
			FWDS3DCSimpleButton.setPrototype();
			
			self.prevButtonDO = new FWDS3DCSimpleButton(self.data.prevButtonNImg, self.data.prevButtonSImg);
			self.prevButtonDO.addListener(FWDS3DCSimpleButton.CLICK, self.prevButtonOnClickHandler);
			self.controlsDO.addChild(self.prevButtonDO);
		};
		
		this.prevButtonOnClickHandler = function()
		{
			if (self.curId > 0)
			{
				self.curId--;
			}
			else
			{
				self.curId = self.totalThumbs-1;
			}
			self.withoutSlideshow = true;
			self.gotoThumb();
		};
		
		this.setupNextButton = function()
		{
			FWDS3DCSimpleButton.setPrototype();
			
			self.nextButtonDO = new FWDS3DCSimpleButton(self.data.nextButtonNImg, self.data.nextButtonSImg);
			self.nextButtonDO.addListener(FWDS3DCSimpleButton.CLICK, self.nextButtonOnClickHandler);
			self.controlsDO.addChild(self.nextButtonDO);
			
			self.nextButtonDO.setX(self.controlsWidth);
			self.controlsWidth += self.nextButtonDO.getWidth();
		};
		
		this.nextButtonOnClickHandler = function()
		{
			if (self.curId < self.totalThumbs-1)
			{
				self.curId++;
			}
			else
			{
				self.curId = 0;
			}
			self.withoutSlideshow = true;
			self.gotoThumb();
		};
		
		this.setupSlideshow = function()
		{
			FWDS3DCTimerManager.setPrototype();
			self.timer =  new FWDS3DCTimerManager(self.data.slideshowDelay);
			self.timer.addListener(FWDS3DCTimerManager.TIME, self.onSlideshowTime);
			
		};
		
		this.startSlideshow = function(){
			if (!self.isPlaying){
				
				self.isPlaying = true;
				self.timer.start();
			}
		};
		
		this.stopSlideshow = function(){
			if (self.isPlaying){
				self.isPlaying = false;
				clearTimeout(self.slideshowTimeoutId);
				self.timer.stop();
			}
		};
		
		this.onSlideshowTime = function(){
			
			if (self.curId == self.totalThumbs-1){
				self.curId = 0;
			}else{
				self.curId++;
			}
			self.withoutSlideshow = false;
			self.gotoThumb();
		};
		
		this.startTimeAgain = function()
		{
			self.timer.stop();
			self.timer.start();
		};

		this.addMouseWheelSupport = function(){
			
			self.parent.mainDO.screen.addEventListener("mousewheel", self.mouseWheelHandler);
			self.parent.mainDO.screen.addEventListener('DOMMouseScroll', self.mouseWheelHandler);
		}
	
		this.mouseWheelHandler = function(e)
		{
			
			if (!self.introFinished || !self.allowToSwitchCat)
				return;
			
			var dir = e.detail || e.wheelDelta;	
			
			if (e.wheelDelta)
				dir *= -1;
			
			if (dir > 0)
			{	
				if (self.curId < self.totalThumbs-1)
				{
					self.curId++;
				}
				else
				{
					self.curId = 0;
				}
			}
			else if (dir < 0)
			{
				if (self.curId > 0)
				{
					self.curId--;
				}
				else
				{
					self.curId = self.totalThumbs-1;
				}
			}
			
			self.withoutSlideshow = true;
			self.gotoThumb();
			
			if (e.preventDefault)
			{
				e.preventDefault();
			}
			else
			{
				return false;
			}
		};
		
		//##########################################//
		/* setup mobile drag */
		//##########################################//
		this.setupMobileDrag = function(){
			
			if(self.hasPointerEvent){
				self.parent.mainDO.screen.addEventListener("pointerdown", self.mobileDragStartHandler);
			}else if(!self.isMobile){
				self.parent.mainDO.screen.addEventListener("mousedown", self.mobileDragStartHandler);
			}else{
				self.parent.mainDO.screen.addEventListener("touchstart", self.mobileDragStartTest);
				
			}
		};
		
		this.mobileDragStartTest = function(e)
		{
			var viewportMouseCoordinates = FWDS3DCUtils.getViewportMouseCoordinates(e);	
			
			//if (viewportMouseCoordinates.screenY > self.getGlobalY())
			
			
			self.lastPressedX = viewportMouseCoordinates.screenX;
			self.lastPressedY = viewportMouseCoordinates.screenY;
			
			self.dragCurId = self.curId;
			
			if(self.isMobile){
				window.addEventListener("touchmove", self.mobileDragMoveTest);
				window.addEventListener("touchend", self.mobileDragEndTest);
			}		
		};
		
		this.mobileDragMoveTest = function(e)
		{
			if (e.touches.length != 1) return;
			
			self.disableThumbClick = true;
			
			var viewportMouseCoordinates = FWDS3DCUtils.getViewportMouseCoordinates(e);	
			
			self.mouseX = viewportMouseCoordinates.screenX;
			self.mouseY = viewportMouseCoordinates.screenY;
			
			var angle = Math.atan2(self.mouseY - self.lastPressedY, self.mouseX - self.lastPressedX);
			var posAngle = Math.abs(angle) * 180 / Math.PI;
			
			if ((posAngle > 120) || (posAngle < 60))
			{
				if(e.preventDefault) e.preventDefault();
				
				self.curId = self.dragCurId + Math.floor(-(self.mouseX - self.lastPressedX) / 100);
				
				if (self.curId < 0){
					self.curId = self.totalThumbs-1;
				}else if (self.curId > self.totalThumbs-1){
					self.curId = 0;
				}
				
				self.withoutSlideshow = true;
				self.gotoThumb();
			}
			else
			{
			
				self.disableThumbClick = true;
				window.removeEventListener("touchmove", self.mobileDragMoveTest);
			}
		};
		
		this.mobileDragEndTest = function(e)
		{
			self.disableThumbClick = false;
			
			window.removeEventListener("touchmove", self.mobileDragMoveTest);
			window.removeEventListener("touchmove", self.mobileDragMoveHandler);
			window.removeEventListener("touchend", self.mobileDragEndTest);
		};
		
		this.mobileDragStartHandler = function(e)
		{
			var viewportMouseCoordinates = FWDS3DCUtils.getViewportMouseCoordinates(e);		
			
			if (!self.allowToSwitchCat) return;
			
			self.mouseX = self.lastPressedX = viewportMouseCoordinates.screenX;	
			self.lastDragNumber = 100;
			
			self.dragCurId = self.curId;

			if(!self.isMobile){
				if(self.useDrag){
					self.getStyle().cursor = 'url(' + self.grabIconPath_str + '), default';
					parent.mainDO.getStyle().cursor = 'url(' + self.grabIconPath_str + '), default';
				}
			}
			
			if(self.hasPointerEvent){
				window.addEventListener("pointerup", self.mobileDragEndHandler);
				window.addEventListener("pointermove", self.mobileDragMoveHandler);
			}else if(!self.isMobile){
				window.addEventListener("mouseup", self.mobileDragEndHandler);
				window.addEventListener("mousemove", self.mobileDragMoveHandler);
			}
		};
		
		this.mobileDragMoveHandler = function(e)
		{
			if(e.preventDefault) e.preventDefault();
			
			self.disableThumbClick = true;
			
			var viewportMouseCoordinates = FWDS3DCUtils.getViewportMouseCoordinates(e);	
				
			if (self.useDrag && !self.isMobile){
				self.curDragNumber = parseInt((self.mouseX - self.lastPressedX) / 100);
				var sign = "none";
				if(self.mouseX - self.lastPressedX > 0){
					sign = "plus";
				}else if(self.mouseX - self.lastPressedX < 0){
					sign = "minus";
				}
				
				if(sign == "plus"){
					if (self.curId == -1){
						self.curId = self.totalThumbs-1;
					}else{
						if(self.lastDragNumber != self.curDragNumber){
							self.curId = self.curId - 1;	
							self.lastPressedX = viewportMouseCoordinates.screenX;
						}
						
					}	
				}else if(sign == "minus"){
					if (self.curId == self.totalThumbs){
						self.curId = 0;
					}else{
						if(self.lastDragNumber != self.curDragNumber){
							self.curId ++;
							self.lastPressedX = viewportMouseCoordinates.screenX;
						}
					}
				}
			}else{
				self.mouseX = viewportMouseCoordinates.screenX;
				self.curId = self.dragCurId + Math.floor(-(self.mouseX - self.lastPressedX) / 100);
				if (self.curId < 0){
					self.curId = self.totalThumbs-1;
				}else if (self.curId > self.totalThumbs-1)
				{
					self.curId = 0;
				}
			}
			
			self.mouseX = viewportMouseCoordinates.screenX;;
			
			
			if (self.curId != self.prevCurId){
				self.withoutSlideshow = true;
				self.gotoThumb();
			}
			self.lastDragNumber = self.curDragNumber;
			
		};

		this.mobileDragEndHandler = function(e){
			self.disableThumbClick = false;
			
			if(self.useDrag && !self.isMobile){
				self.getStyle().cursor = 'url(' + self.handIconPath_str + '), default';
				parent.mainDO.getStyle().cursor = 'url(' + self.handIconPath_str + '), default';
			}
			
			if(self.hasPointerEvent){
				window.removeEventListener("pointerup", self.mobileDragEndHandler);
				window.removeEventListener("pointermove", self.mobileDragMoveHandler);
			}else if(!self.isMobile){
				window.removeEventListener("mouseup", self.mobileDragEndHandler);
				window.removeEventListener("mousemove", self.mobileDragMoveHandler);
			}
		};
		
		this.removeMobileDrag = function(){
			if (self.hasPointerEvent){
				self.parent.mainDO.screen.removeEventListener("pointerdown", self.mobileDragStartHandler);
				window.removeEventListener("pointerup", self.mobileDragEndHandler);
				window.removeEventListener("pointermove", self.mobileDragMoveHandler);
			}else if(!self.isMobile){
				self.parent.mainDO.screen.removeEventListener("mousedown", self.mobileDragStartHandler);
				window.removeEventListener("mouseup", self.mobileDragEndHandler);
				window.removeEventListener("mousemove", self.mobileDragMoveHandler);
			}else if (window.addEventListener){
				self.parent.mainDO.screen.removeEventListener("touchstart", self.mobileDragStartTest);
				window.removeEventListener("touchmove", self.mobileDragMoveTest);
				window.removeEventListener("touchmove", self.mobileDragMoveHandler);
				window.removeEventListener("touchend", self.mobileDragEndTest);
			}
		};
		
		
		//####################################//
		/* add keyboard support */
		//####################################//
		this.addKeyboardSupport = function()
		{
			if(document.addEventListener){
				document.addEventListener("keydown",  this.onKeyDownHandler);	
				document.addEventListener("keyup",  this.onKeyUpHandler);	
			}else{
				document.attachEvent("onkeydown",  this.onKeyDownHandler);	
				document.attachEvent("onkeyup",  this.onKeyUpHandler);	
			}
		};
		
		this.onKeyDownHandler = function(e)
		{
			if (!self.introFinished || !self.allowToSwitchCat)
				return;
				
			if (parent.lightboxDO && parent.lightboxDO.isShowed_bl)
				return;
				
			if(document.removeEventListener){
				document.removeEventListener("keydown",  self.onKeyDownHandler);
			}else{
				document.detachEvent("onkeydown",  self.onKeyDownHandler);
			}
				
			if (e.keyCode == 39)
			{	
				if (self.curId < self.totalThumbs-1)
				{
					self.curId++;
				}
				else
				{
					self.curId = 0;
				}
				
				self.withoutSlideshow = true;
				self.gotoThumb();
				
				if(e.preventDefault){
					e.preventDefault();
				}else{
					return false;
				}
			}
			else if (e.keyCode == 37)
			{
				if (self.curId > 0)
				{
					self.curId--;
				}
				else
				{
					self.curId = self.totalThumbs-1;
				}
				
				self.withoutSlideshow = true;
				self.gotoThumb();
				
				if(e.preventDefault){
					e.preventDefault();
				}else{
					return false;
				}
			}
		};
		
		this.onKeyUpHandler = function(e)
		{
			if(document.addEventListener){
				document.addEventListener("keydown",  self.onKeyDownHandler);	
			}else{
				document.attachEvent("onkeydown",  self.onKeyDownHandler);	
			}
		};
		
		this.update = function(e)
		{
			var newCarRadX = e.carRadiusX;
			
			if (FWDS3DCUtils.isIEAndLessThen10)
			{
				newCarRadX /= 1.5;
			}
			
			FWDAnimation.to(self, .8, {carRadiusX:newCarRadX, ease:Quart.easeOut});
			FWDAnimation.to(self, .8, {carRadiusY:e.carRadiusY, ease:Quart.easeOut});
			
			self.carYOffset = e.carYOffset;
			
			self.carouselXRot = e.carouselXRot;
			self.thumbMinAlpha = e.thumbMinAlpha;
			self.topology = self.topologiesAr[e.carouselTopology];
			
			self.showRefl = e.showRefl;
			self.reflDist = e.reflDist;
			
			self.showCenterImg = e.showCenterImg;
			
			if (self.showCenterImg && !self.centerImgDO)
			{
				self.setupCenterImg();
			}
			
			if (self.centerImgDO)
			{
				if (self.showCenterImg)
				{
					self.centerImgDO.setAlpha(1);
				}
				else
				{
					self.centerImgDO.setAlpha(0);
				}
			}
			
			var newY;
			
			if (self.data.controlsPos)
			{
				newY = Math.floor((self.stageHeight - self.controlsHeight)/2 + self.controlsHeight + self.carYOffset);
			}
			else
			{
				newY = Math.floor(self.stageHeight/2) + self.carYOffset;
			}
			
			FWDAnimation.to(self.thumbsHolderDO, .8, {y:newY, angleX:-self.carouselXRot, ease:Quart.easeOut});
			
			for (var i=0; i<self.totalThumbs; i++)
			{
				self.thumbsAr[i].update();
			}
			self.withoutSlideshow = true;
			self.gotoThumb();
		};
		
		
		/* destroy */
		this.destroy = function()
		{
			clearTimeout(self.loadWithDelayIdLeft);
			clearTimeout(self.loadWithDelayIdRight);
			clearTimeout(self.slideshowTimeoutId);
			clearTimeout(self.textTimeoutId);
			clearInterval(self.zSortingId);
			clearTimeout(self.hideThumbsFinishedId);
			clearTimeout(self.loadHtmlContentsId);
			clearTimeout(self.loadImagesId);
			clearTimeout(self.setTextHeightId);
			clearTimeout(self.setIntroFinishedId);
			clearTimeout(self.showControlsId);
			
			if (!self.isMobile)
			{
				if (self.screen.addEventListener)
				{
					window.removeEventListener("mousemove", self.onThumbMove);
				}
				else
				{
					document.detachEvent("onmousemove", self.onThumbMove);
				}
			}
			
			if (self.hasPointerEvent)
			{
				window.removeEventListener("MSPointerMove", self.onThumbMove);
			}
			
			if (self.hasPointerEvent)
			{
				self.parent.mainDO.screen.removeEventListener("MSPointerDown", self.mobileDragStartHandler);
				window.removeEventListener("MSPointerUp", self.mobileDragEndHandler);
				window.removeEventListener("MSPointerMove", self.mobileDragMoveHandler);
			}
			else
			{
				if (window.addEventListener)
				{
					self.parent.mainDO.screen.removeEventListener("touchstart", self.mobileDragStartTest);
					window.removeEventListener("touchmove", self.mobileDragMoveTest);
					window.removeEventListener("touchend", self.mobileDragEndTest);
				}
			}
		
			
			if (self.R)
			{
				if(document.removeEventListener){
					document.removeEventListener("keydown",  this.onKeyDownHandler);	
					document.removeEventListener("keyup",  this.onKeyUpHandler);	
				}else if(document.attachEvent){
					document.detachEvent("onkeydown",  this.onKeyDownHandler);	
					document.detachEvent("onkeyup",  this.onKeyUpHandler);	
				}
			}
			
			if (self.image)
			{
				self.image.onload = null;
				self.image.onerror = null;
				self.image.src = "";
			}

			if (self.imageLeft)
			{
				self.imageLeft.onload = null;
				self.imageLeft.onerror = null;
				self.imageLeft.src = "";
			}
			
			if (self.imageRight)
			{
				self.imageRight.onload = null;
				self.imageRight.onerror = null;
				self.imageRight.src = "";
			}
			
			self.image = null;
			self.imageLeft = null;
			self.imageRight = null;

			/* destroy thumbs */
			for (var i=0; i<self.totalThumbs; i++)
			{
				FWDAnimation.killTweensOf(self.thumbsAr[i]);
				self.thumbsAr[i].destroy();
				self.thumbsAr[i] = null;
			};

			self.thumbsAr = null;
			
			if (self.prevButtonDO)
			{
				self.prevButtonDO.destroy();
				self.prevButtonDO = null;
			}
			
			if (self.nextButtonDO)
			{
				self.nextButtonDO.destroy();
				self.nextButtonDO = null;
			}
			
			if (self.timer)
			{
				self.timer.destroy();
				self.timer = null;
			}	
			
			if (self.textGradientDO && self.textGradientDO.screen)
			{
				FWDAnimation.killTweensOf(self.textGradientDO);
				self.textGradientDO.destroy();
				self.textGradientDO = null;
			}
			
			if (self.textDO && self.textDO.screen)
			{
				FWDAnimation.killTweensOf(self.textDO);
				self.textDO.destroy();
				self.textDO = null;
			}
			
			if (self.textHolderDO && self.textHolderDO.screen)
			{
				FWDAnimation.killTweensOf(self.textHolderDO);
				self.textHolderDO.destroy();
				self.textHolderDO = null;
			}
			
			if (self.thumbOverDO)
			{
				self.thumbOverDO.destroy();
				self.thumbOverDO = null;
			}

			if (self.thumbsHolderDO)
			{
				self.thumbsHolderDO.destroy();
				self.thumbsHolderDO = null;
			}
			
			if (self.controlsDO)
			{
				FWDAnimation.killTweensOf(self.controlsDO);
				self.controlsDO.destroy();
				self.controlsDO = null;
			}
			
			self.screen.innerHTML = "";
			self = null;
			prototype.destroy();
			prototype = null;
			FWDS3DCThumbsManager.prototype = null;
		};
		
		this.init();
	};

	/* set prototype */
	FWDS3DCThumbsManager.setPrototype = function()
	{
		FWDS3DCThumbsManager.prototype = new FWDS3DCDisplayObject3D("div", "relative", "visible");
	};
	
	FWDS3DCThumbsManager.THUMB_CLICK = "onThumbClick";
	FWDS3DCThumbsManager.LOAD_ERROR = "onLoadError";
	FWDS3DCThumbsManager.THUMBS_INTRO_FINISH = "onThumbsIntroFinish";
	FWDS3DCThumbsManager.THUMB_CHANGE = "onThumbChange";

	window.FWDS3DCThumbsManager = FWDS3DCThumbsManager;

}(window));/* Slide show time manager */
(function(window){
	
	var FWDS3DCTimerManager = function(delay){
		
		var self = this;
		var prototpype = FWDS3DCTimerManager.prototype;
		
		this.timeOutId;
		this.delay = delay;
		this.isStopped_bl = true;
		
		this.stop = function(){
			self.isStopped_bl = true;
			clearTimeout(this.timeOutId);
			this.dispatchEvent(FWDS3DCTimerManager.STOP);
		};
		
		this.start = function(){
			if(this.isStopped_bl){
				clearTimeout(this.timeOutId);
				this.timeOutId = setTimeout(this.onTimeHanlder, this.delay);
				this.dispatchEvent(FWDS3DCTimerManager.START);
				this.isStopped_bl = false;
			}
		};
		
		this.onTimeHanlder = function(){
		
			self.dispatchEvent(FWDS3DCTimerManager.TIME);
		};
		
		this.resetCounter = function(){
			
		}
		
		/* destroy */
		this.destroy = function(){
			clearTimeout(this.timeOutId);
			prototpype.destroy();
			self = null;
			prototpype = null;
			FWDS3DCTimerManager.prototype = null;
		};
	};

	FWDS3DCTimerManager.setPrototype = function(){
		FWDS3DCTimerManager.prototype = new FWDS3DCDisplayObject3D("div", "relative", "visible");
	};
	
	FWDS3DCTimerManager.START = "start";
	FWDS3DCTimerManager.STOP = "stop";
	FWDS3DCTimerManager.TIME = "time";
	
	FWDS3DCTimerManager.prototype = null;
	window.FWDS3DCTimerManager = FWDS3DCTimerManager;
	
}(window));﻿/* Display object */
(function (window){
	/*
	 * @ type values: div, img.
	 * @ positon values: relative, absolute.
	 * @ positon values: hidden.
	 * @ display values: block, inline-block, this applies only if the position is relative.
	 */
	var FWDS3DCTransformDisplayObject = function(type, position, overflow, display){
		
		this.listeners = {events_ar:[]};
		var self = this;
		
		if(type == "div" || type == "img" || type == "canvas"){
			this.type = type;	
		}else{
			throw Error("Type is not valid! " + type);
		}
	
		this.children_ar = [];
		this.style;
		this.screen;
		this.numChildren;
		this.transform;
		this.position = position || "absolute";
		this.overflow = overflow || "hidden";
		this.display = display || "block";
		this.visible = true;
		this.buttonMode;
		this.x = 0;
		this.y = 0;	
		this.scale = 1;
		this.rotation = 0;
		this.w = 0;
		this.h = 0;
		this.rect;
		this.alpha = 1;
		this.innerHTML = "";
		this.opacityType = "";
		this.isHtml5_bl = false;
		
		this.hasTransform2d_bl = FWDS3DCUtils.hasTransform2d;
		
		//##############################//
		/* init */
		//#############################//
		this.init = function(){
			this.setScreen();
		};	
		
		//######################################//
		/* check if it supports transforms. */
		//######################################//
		this.getTransform = function() {
		    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform'];
		    var p;
		    while (p = properties.shift()) {
		       if (typeof this.screen.style[p] !== 'undefined') {
		            return p;
		       }
		    }
		    return false;
		};
		
		//######################################//
		/* set opacity type */
		//######################################//
		this.getOpacityType = function(){
			var opacityType;
			if (typeof this.screen.style.opacity != "undefined") {//ie9+ 
				opacityType = "opacity";
			}else{ //ie8
				opacityType = "filter";
			}
			return opacityType;
		};
		
		//######################################//
		/* setup main screen */
		//######################################//
		this.setScreen = function(element){
			if(this.type == "img" && element){
				this.screen = element;
				this.setMainProperties();
			}else{
				this.screen = document.createElement(this.type);
				this.setMainProperties();
			}
		};
		
		//########################################//
		/* set main properties */
		//########################################//
		this.setMainProperties = function(){
			
			this.transform = this.getTransform();
			this.setPosition(this.position);
			//this.setDisplay(this.display);
			this.setOverflow(this.overflow);
			this.opacityType = this.getOpacityType();
			
			if(this.opacityType == "opacity") this.isHtml5_bl = true;
			
			if(self.opacityType == "filter") self.screen.style.filter = "inherit";
			
			this.screen.style.left = "0px";
			this.screen.style.top = "0px";
			this.screen.style.margin = "0px";
			this.screen.style.padding = "0px";
			this.screen.style.maxWidth = "none";
			this.screen.style.maxHeight = "none";
			this.screen.style.border = "none";
			this.screen.style.lineHeight = "1";
			this.screen.style.backgroundColor = "transparent";
			this.screen.style.backfaceVisibility = "hidden";
			this.screen.style.webkitBackfaceVisibility = "hidden";
			this.screen.style.MozBackfaceVisibility = "hidden";
			this.screen.style.MozImageRendering = "optimizeSpeed";	
			this.screen.style.WebkitImageRendering = "optimizeSpeed";
			self.screen.style.transition = "none";
			self.screen.style.webkitTransition = "none";
			self.screen.style.MozTransition = "none";
			self.screen.style.OTransition = "none";
			
			if(type == "img"){
				this.setWidth(this.screen.width);
				this.setHeight(this.screen.height);
				this.screen.onmousedown = function(e){return false;};
			}
			
			
		};
		
		self.setBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "visible";
			self.screen.style.webkitBackfaceVisibility = "visible";
			self.screen.style.MozBackfaceVisibility = "visible";		
		};
		
		self.removeBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "hidden";
			self.screen.style.webkitBackfaceVisibility = "hidden";
			self.screen.style.MozBackfaceVisibility = "hidden";		
		};
		
		//###################################################//
		/* set / get various peoperties.*/
		//###################################################//
		this.setSelectable = function(val){
			if(!val){
				try{this.screen.style.userSelect = "none";}catch(e){};
				try{this.screen.style.MozUserSelect = "none";}catch(e){};
				try{this.screen.style.webkitUserSelect = "none";}catch(e){};
				try{this.screen.style.khtmlUserSelect = "none";}catch(e){};
				try{this.screen.style.oUserSelect = "none";}catch(e){};
				try{this.screen.style.msUserSelect = "none";}catch(e){};
				try{this.screen.msUserSelect = "none";}catch(e){};
				this.screen.ondragstart = function(e){return  false;};
				this.screen.onselectstart = function(){return false;};
				this.screen.style.webkitTouchCallout='none';
			}
		};
		
		this.getScreen = function(){
			return self.screen;
		};
		
		this.setVisible = function(val){
			this.visible = val;
			if(this.visible == true){
				this.screen.style.visibility = "visible";
			}else{
				this.screen.style.visibility = "hidden";
			}
		};
		
		this.getVisible = function(){
			return this.visible;
		};
			
		this.setResizableSizeAfterParent = function(){
			this.screen.style.width = "100%";
			this.screen.style.height = "100%";
		};
		
		this.getStyle = function(){
			return this.screen.style;
		};
		
		this.setOverflow = function(val){
			self.overflow = val;
			self.screen.style.overflow = self.overflow;
		};
		
		this.setPosition = function(val){
			self.position = val;
			self.screen.style.position = self.position;
		};
		
		this.setDisplay = function(val){
			this.display = val;
			this.screen.style.display = this.display;
		};
		
		this.setButtonMode = function(val){
			this.buttonMode = val;
			if(this.buttonMode ==  true){
				this.screen.style.cursor = "pointer";
			}else{
				this.screen.style.cursor = "default";
			}
		};
		
		this.setBkColor = function(val){
			self.screen.style.backgroundColor = val;
		};
		
		this.setInnerHTML = function(val){
			self.innerHTML = val;
			self.screen.innerHTML = self.innerHTML;
		};
		
		this.getInnerHTML = function(){
			return self.innerHTML;
		};
		
		this.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		this.setAlpha = function(val){
			self.alpha = val;
			if(self.opacityType == "opacity"){
				self.screen.style.opacity = self.alpha;
			}else if(self.opacityType == "filter"){
				self.screen.style.filter = "alpha(opacity=" + self.alpha * 100 + ")";
				self.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(self.alpha * 100) + ")";
			}
		};
		
		this.getAlpha = function(){
			return self.alpha;
		};
		
		this.getRect = function(){
			return this.screen.getBoundingClientRect();
		};
		
		this.getGlobalX = function(){
			return this.getRect().left;
		};
		
		this.getGlobalY = function(){
			return this.getRect().top;
		};
		
		this.setX = function(val){
			self.x = val;
			if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = "translate(" + self.x + "px," + self.y + "px) scale(" + self.scale + " , " + self.scale + ") rotate(" + self.rotation + "deg)";
			}else{
				self.screen.style.left = self.x + "px";
			}
		};
		
		this.getX = function(){
			return  self.x;
		};
		
		this.setY = function(val){
			self.y = val;
			if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = "translate(" + self.x + "px," + self.y + "px) scale(" + self.scale + " , " + self.scale + ") rotate(" + self.rotation + "deg)";
			}else{
				self.screen.style.top = self.y + "px";
			}
		};
		
		this.getY = function(){
			return  self.y;
		};
		
		this.setScale2 = function(val){
			self.scale = val;
			if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = "translate(" + self.x + "px," + self.y + "px) scale(" + self.scale + " , " + self.scale + ") rotate(" + self.rotation + "deg)";
			}
		};
		
		this.getScale = function(){
			return  self.scale;
		};
		
		this.setRotation = function(val){
			self.rotation = val;
			if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = "translate(" + self.x + "px," + self.y + "px) scale(" + self.scale + " , " + self.scale + ") rotate(" + self.rotation + "deg)";
			}
		};
		
		this.setWidth = function(val){
			self.w = val;
			if(self.type == "img"){
				self.screen.width = self.w;
			}else{
				self.screen.style.width = self.w + "px";
			}
		};
		
		this.getWidth = function(){
			if(self.type == "div"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}else if(self.type == "img"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				if(self.screen.width != 0) return  self.screen.width;
				return self._w;
			}else if( self.type == "canvas"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}
		};
		
		this.setHeight = function(val){
			self.h = val;
			if(self.type == "img"){
				self.screen.height = self.h;
			}else{
				self.screen.style.height = self.h + "px";
			}
		};
		
		this.getHeight = function(){
			if(self.type == "div"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}else if(self.type == "img"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				if(self.screen.height != 0) return  self.screen.height;
				return self.h;
			}else if(self.type == "canvas"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}
		};
		
		this.getNumChildren = function(){
			return self.children_ar.length;
		};
		
		//#####################################//
		/* DOM list */
		//#####################################//
		this.addChild = function(e){
			if(this.contains(e)){	
				this.children_ar.splice(FWDS3DCUtils.indexOfArray(this.children_ar, e), 1);
				this.children_ar.push(e);
				this.screen.appendChild(e.screen);
			}else{
				this.children_ar.push(e);
				this.screen.appendChild(e.screen);
			}
		};
		
		this.removeChild = function(e){
			if(this.contains(e)){
				this.children_ar.splice(FWDS3DCUtils.indexOfArray(this.children_ar, e), 1);
				this.screen.removeChild(e.screen);
			}else{
				throw Error("##removeChild()## Child doesn't exist, it can't be removed!");
			};
		};
		
		this.contains = function(e){
			if(FWDS3DCUtils.indexOfArray(this.children_ar, e) == -1){
				return false;
			}else{
				return true;
			}
		};
		
		this.addChildAtZero = function(e){
			if(this.numChildren == 0){
				this.children_ar.push(e);
				this.screen.appendChild(e.screen);
			}else{
				this.screen.insertBefore(e.screen, this.children_ar[0].screen);
				if(this.contains(e)){this.children_ar.splice(FWDS3DCUtils.indexOfArray(this.children_ar, e), 1);}	
				this.children_ar.unshift(e);
			}
		};
		
		this.getChildAt = function(index){
			if(index < 0  || index > this.numChildren -1) throw Error("##getChildAt()## Index out of bounds!");
			if(this.numChildren == 0) throw Errror("##getChildAt## Child dose not exist!");
			return this.children_ar[index];
		};
		
		this.removeChildAtZero = function(){
			this.screen.removeChild(this.children_ar[0].screen);
			this.children_ar.shift();
		};
		
		//################################//
		/* event dispatcher */
		//#################################//
		this.addListener = function (type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    this.dispatchEvent = function(type, props){
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this && this.listeners.events_ar[i].type === type){
	        		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		this.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		this.listeners.events_ar[i].listener.call(this, this.listeners.events_ar[i]);
	        		break;
	        	}
	        }
	    };
	    
	   this.removeListener = function(type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this 
	        			&& this.listeners.events_ar[i].type === type
	        			&& this.listeners.events_ar[i].listener ===  listener
	        	){
	        		this.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };
	    
	    //###########################################//
	    /* destroy methods*/
	    //###########################################//
		this.disposeImage = function(){
			if(this.type == "img") this.screen.src = null;
		};
		
		
		this.destroy = function(){
			
			try{this.screen.parentNode.removeChild(this.screen);}catch(e){};
			
			this.screen.onselectstart = null;
			this.screen.ondragstart = null;
			this.screen.ontouchstart = null;
			this.screen.ontouchmove = null;
			this.screen.ontouchend = null;
			this.screen.onmouseover = null;
			this.screen.onmouseout = null;
			this.screen.onmouseup = null;
			this.screen.onmousedown = null;
			this.screen.onmousemove = null;
			this.screen.onclick = null;
			
			delete this.screen;
			delete this.style;
			delete this.rect;
			delete this.selectable;
			delete this.buttonMode;
			delete this.position;
			delete this.overflow;
			delete this.visible;
			delete this.innerHTML;
			delete this.numChildren;
			delete this.x;
			delete this.y;
			delete this.w;
			delete this.h;
			delete this.opacityType;
			delete this.isHtml5_bl;
			delete this.hasTransform2d_bl;

			this.children_ar = null;
			this.style = null;
			this.screen = null;
			this.numChildren = null;
			this.transform = null;
			this.position = null;
			this.overflow = null;
			this.display= null;
			this.visible= null;
			this.buttonMode = null;
			this.globalX = null;
			this.globalY = null;
			this.x = null;
			this.y = null;
			this.w = null;;
			this.h = null;;
			this.rect = null;
			this.alpha = null;
			this.innerHTML = null;
			this.opacityType = null;
			this.isHtml5_bl = null;
			this.hasTransform3d_bl = null;
			this.hasTransform2d_bl = null;
			self = null;
		};
		
	    /* init */
		this.init();
	};
	
	window.FWDS3DCTransformDisplayObject = FWDS3DCTransformDisplayObject;
}(window));

