(function(rocket88) {
	"use strict";

	rocket88.Spritesheet = Class.extends({
		init: function(data) {
			if(!data) {
				console.assert(!rocket88.showErrors, "Required argument 'data' is missing");
				return;
			}

			// Private properties
			this._rawData = data;
			this._disposed = false;
			this._firstFrame = undefined;
			this._animations = new Object()
			this._frames = new Object();

			var self = this;
			function parseData() {
				for (var name in data.frames) {
					var myFrame = data.frames[name].frame;

					var myRect = new rocket88.Rectangle(myFrame.x, myFrame.y, myFrame.w, myFrame.h);
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
					self._animations[myName] = new rocket88.LinkedList();
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
	        if(!!this._disposed && rocket88.showErrors) {
	        	console.error("Unable to dispose object: " + this.name);	
	        }

			console.info(this.type + ": " + this._name + " is disposed");	
			
			delete this._rawData;
			delete this._firstFrame;			
			delete this._animations;
			delete this._frames;
		},


		defineProperties: function() {
	        var myProperties = {
	        	isDisposed: {
					enumerable: true, 
		            get: function() { return this._disposed; } 
	        	},

				rawData: {
					enumerable: true, 
		            get: function() { return this._rawData; } 
	        	},

		        frames: {
					enumerable: true, 
	    	        get: function() { return this._frames; } 
	        	},

		        firstFrame: {
					enumerable: true, 
	        	    get: function() { return this._firstFrame; } 
	        	},

		        animations: {
					enumerable: true, 
		            get: function() {
						var myNames = new Array();
						for (var name in this._animations) {
							myNames.push(name);
						}

						return myNames;
					}
				}	 
	        };

	        Object.defineProperties(this, myProperties);
	    },
	});
})( use("rocket88") );