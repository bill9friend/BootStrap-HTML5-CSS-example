/* FWDS3DCComboBoxSelector */
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
}(window));