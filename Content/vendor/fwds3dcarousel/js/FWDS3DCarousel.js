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

}(window));