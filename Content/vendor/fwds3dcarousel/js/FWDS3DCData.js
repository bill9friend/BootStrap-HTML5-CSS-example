/* Data */
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
}(window));