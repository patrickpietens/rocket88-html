var Spritesheet = Class.extend({

	// inheritDoc
	init: function(data) {
		if(!data) {
			console.assert(!Rocket88.showErrors, "Required argument 'data' is missing");
			return;
		}

		// Private properties
		this._rawData 		= data;
		this._disposed		= false;
		this._firstFrame 	= undefined;
		this._animations 	= new Object()
		this._frames 		= new Object();

		// Getters
		this.__defineGetter__("isDisposed", function () { return this._disposed });
		this.__defineGetter__("rawData", function () { return this._rawData });
		this.__defineGetter__("frames", function () { return this._frames });
		this.__defineGetter__("firstFrame", function () { return this._firstFrame });
		this.__defineGetter__("animations", function () { 
			var myNames = new Array();
			for (var name in this._animations) {
				myNames.push(name);
			}

			return myNames;
		});

		var self = this;

		// Private functions
		function parseData() {
			for (var name in data.frames)		
			{
				var myFrame = data.frames[name].frame;

				var myRect = new Rectangle(myFrame.x, myFrame.y, myFrame.w, myFrame.h);
				addFrame(name, myRect);
			}			
		}

		function addFrame(name, frame) {
			self._frames[name] = frame;

			if(!self._firstFrame) {
				self._firstFrame = frame;
			}

			var myRegExp = /(-|_)*(\d+)(\.[a-zA-Z]{3,4})$/;
			var myName = name.replace(myRegExp, "");

			if(!self._animations[myName]) {
				self._animations[myName] = new LinkedList();
			}

			self._animations[myName].add(name);
		}

		parseData();
	},

	hasAnimation: function(name) {
		return this._animations[name] != null;
	},

	animationByName: function(name) {
		return this._animations[name];
	},

	hasFrame: function(name) {
		return this._frames[name] != null;
	},

	frameByName: function(name) {
		return this._frames[name];
	},

	dispose: function() {
        if(this._disposed && Rocket88.showErrors) {
        	console.error("Unable to dispose object: " + this.name);	
        }

		console.info(this.type + ": " + this._name + " is disposed");	
		
		this._rawData = null;
		this._firstFrame = null;			
		this._animations = null;
		this._frames = null;
	}
});