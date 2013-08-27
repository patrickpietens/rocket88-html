(function(rocket88) {
	"use strict";

	rocket88.Sprite = rocket88.Object.extends({
		init: function(url, spritesheet) {
			if(!url) {
				console.assert(!rocket88.showErrors, "Required argument 'url' is missing");
				return;
			}

			this._url = url;
			this._currentFrame = undefined;
			this._disposed = false;
			this._transform = new rocket88.TransformComponent();
			this._sourceRect = new rocket88.Rectangle();
			this._bounds = new rocket88.Rectangle();
			this._AABB = new rocket88.Rectangle();

			if(!!spritesheet) {
				var myData = rocket88.assetStore.getAsset(spritesheet);
				this._spritesheet  = new rocket88.Spritesheet(myData);

				var mySource = this._spritesheet.firstFrame;
				this._sourceRect.copy(mySource);

				this._bounds.copy(mySource);
				this._bounds.center();
			}
		},


		showFrame: function(name) {
			if(!this._spritesheet && rocket88.showWarnings) {
				console.error("Unable to set frame on sprite: " + this._url + " Sprite doesn't have spritesheet");
			}

			var mySource = this._spritesheet.frameByName(name);
			this._sourceRect.copy(mySource);

			this._bounds.copy(mySource);
			this._bounds.center();
		},


		toCss: function() {
			var myWidth = this.bounds.size.width,
				myHeight = this.bounds.size.height,
				myLeft = -1 * myWidth >> 1,
				myTop = -1 * myHeight >> 1;

			var myCss = "position:absolute;" +
						"left:" + myLeft + "px;top:" + myTop + "px;" +
						"width:" + myWidth + "px;height:" + myHeight + "px;" +
						"background-image:url(" + this.url + ");" +
						"background-position:" + -1 * this.bounds.origin.x + "px " + -1 * this.bounds.origin.y + "px;" +
						"-moz-opacity:" + this.alpha + ";-webkit-opacity:" + this.alpha + ";-o-opacity:" + this.alpha + ";opacity:" + this.alpha + ";";

			return myCss;
		},


		dispose: function () {
	        if(this._disposed && rocket88.showErrors) {
	        	console.error("Unable to dispose object: " + this.name);	
	        }

			console.info("sprite: " + this._url + " is disposed");	

			delete this._url;
			delete this._spritesheet;
			delete this._transform;
			delete this._sourceRect;
			delete this._bounds;
			delete this._AABB;

			this._disposed = true;
		},


	    defineProperties: function() {
	        var myProperties = { 
	        	currentFrame: {
					enumerable: true, 
	            	get: function() { return this._currentFrame; } 
	        	},

		        isDisposed: { 
					enumerable: true, 
	            	get: function() { return this._disposed; } 
	        	},

		        spritesheet: { 
					enumerable: true, 
	            	get: function() { return this._spritesheet; } 
	        	},	        	

		        size: { 
					enumerable: true, 
	            	get: function() { return this._size; } 
	        	},

		        transform: { 
					enumerable: true, 
	            	get: function() { return this._transform; } 
	        	},

		        url: { 
					enumerable: true, 
	            	get: function() { return this._url; } 
	        	},

	        	sourceRect: {
	        		enumerable: true,
	        		get: function() { return this._sourceRect; }
	        	},

	        	bounds: {
	        		enumerable: true,
	        		get: function() { return this._bounds; }
	        	},
	        };

	        Object.defineProperties(this, myProperties)
	    },
	});
})( use("rocket88") );