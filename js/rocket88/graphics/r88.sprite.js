var Sprite = Class.extend({

	// inheritDoc
	init: function(url, spritesheet) {

		if(!url) {
			console.assert(!Rocket88.showErrors, "Required argument 'url' is missing");
			return;
		}

		// Private properties
		this._assetStore	= Rocket88.assetStore;
		this._currentFrame	= undefined;
		this._disposed 		= false;
		this._spritesheet	= spritesheet;
		this._url	 		= url;

		//this._bounds		= new Rectangle;
		this._size			= new Size();
		this._transform		= new Transform();

		// Public properties
		this.cropRect 		= undefined;
		this.className		= undefined;
		this.alpha			= 1.0;	
		this.tiled 			= false;

		// Getters/Setters
		this.__defineGetter__("currentFrame", function() { return this._currentFrame; });
		this.__defineGetter__("disposed", function() { return this._disposed; });
		this.__defineGetter__("spritesheet", function() { return this._spritesheet; });
		this.__defineGetter__("size", function() { return this._size; });
		this.__defineGetter__("transform", function() { return this._transform; });
		this.__defineGetter__("url", function() { return this._url; });

		if(this._assetStore.hasAsset(url)) {
		}

		if(this._spritesheet) {
			this._size = this._spritesheet.firstFrame.size.clone();
			this.cropRect = this._spritesheet.firstFrame.clone();
		}
	},
	
	update: function() {

	},
	
	showFrame: function(name) {
		if(!this._spritesheet && Rocket88.showWarnings) {
			console.error("Unable to set frame on sprite: " + this._url + " Sprite doesn't have spritesheet");
		}

		var myFrame = this._spritesheet.frameByName(name);
		this.cropRect = myFrame.clone();
	},

	toCss: function() {
		return "-moz-opacity:" + this.alpha + ";-webkit-opacity:" + this.alpha + ";-o-opacity:" + this.alpha + ";opacity:" + this.alpha + ";";
	},

	dispose: function () {
        if(this._disposed && Rocket88.showErrors) {
        	console.error("Unable to dispose object: " + this.name);	
        }

		console.info("sprite: " + this._url + " is disposed");	

		this._disposed = true;
		this._assetStore = null;
		this._url = null;
		this._size = null;
		this._spritesheet = null;
		this._transform = null;

		this.className = null;
		this.cropRect = null;
	}
});