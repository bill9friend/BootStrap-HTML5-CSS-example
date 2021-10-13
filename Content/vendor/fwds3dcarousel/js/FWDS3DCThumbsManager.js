/* thumbs manager */
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

}(window));