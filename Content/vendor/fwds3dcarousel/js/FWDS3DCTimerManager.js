/* Slide show time manager */
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
	
}(window));