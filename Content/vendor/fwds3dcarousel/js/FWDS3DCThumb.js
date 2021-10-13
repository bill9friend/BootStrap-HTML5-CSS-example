/* thumb */
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
}(window));