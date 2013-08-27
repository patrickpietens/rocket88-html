(function(rocket88) {
	"use strict";

	rocket88.Director = Class.extends({
		init: function(target) {		
			if(!!window.director) {
				throw ReferenceError("Houston, we have a problem. Director is a singleton class. Use director to get a reference.");
			}

			console.log("This game utilises the Rocket88 engine");
			window.director = this;

			this._type = "director";
			this._accumulator = 0;
			this._crashed = false;
			this._currentScene = null;
			this._currentTime = new Date().getTime();
			this._frameTime = 1000 / 60;
			this._paused = false;
			this._stage = new rocket88.Stage(target);
			this._renderer = new rocket88.CanvasRenderer(this._stage);

			rocket88.director = this;
			rocket88.assetStore = new rocket88.AssetStore();
			rocket88.assetLoader = new rocket88.AssetLoader();

			rocket88.showWarnings = true;
			rocket88.showErrors	= true;
			rocket88.drawPaintRectangles = false;

			rocket88.version = "0.11";
			rocket88.authors = "Patrick Pietens";			
		},


		updateWithFixedTimestep: function() {	
			if (!this._paused && !this._crashed) {		
				requestAnimationFrame(delegate(this, this.updateWithFixedTimestep));

				// Set local properties
				var myNow = new Date().getTime();
				var myTimestep = myNow - this._currentTime;

				// Update the time & accumulator
				this._accumulator += myTimestep;
				this._currentTime = myNow;

				// Render the scene according the time accumulator
				while(this._accumulator >= this._frameTime) {
					this._accumulator -= this._frameTime;
					this.update();
				}		
			}
		},


		update: function() {
			this._frame++;

			this._renderer.prerender();
			this._currentScene.update();
			this._renderer.render();
		},


		liftOff: function() {
			if(!this._currentScene) {
	            throw ReferenceError("Houston, we have a problem. Required argument 'scene' is missing");
	            return this;
	        }

			if(!this._renderer) {
				throw ReferenceError("Houston, we have a problem. Required argument 'renderer' is missing");
				return this;
			}
			
			this._currentScene.ready();
			this._renderer.ready();

			console.info("director: we have a lift off!");	 

			this._paused = false;
			this.updateWithFixedTimestep();

			return this;
		},


		land: function() {
			this._paused = true;
			return this;
		},	


		crash: function() {
	        if(!!this._crashed) {
	        	throw ReferenceError("Houston, we have a problem. Unable to crash Rocket88 game");	
	        	return this;
	        }

			console.info("director: Rocket88 crashed to the ground");

			this._currentScene.dispose();
			this._stage.dispose();
			this._renderer.dispose();

			this._currentTime 	= 0;
			this._paused 		= false;
			this._crashed		= true;

			delete this._currentTime;
			delete this._currentScene;
			delete this._renderer;
			delete this._stage;

			return this;
		},


		toString: function() {
			return "[" + this.type + " running=" + !this._paused + " crashed="+ this._crashed +"]";
		},


		defineProperties: function() {
			var myProperties = {
				type: {
					enumerable: true, 
					get: function() { 
						return "director"; 
					}
				},

				isCrashed: {
					enumerable: true, 
					get: function() { return this._crashed; }
				},

				stage: {
					enumerable: true,
					get: function() { return this._stage; }
				},

				renderer: {
					enumerable: true, 
					get: function() { return this._renderer; },
					set: function(renderer) {
						if(!!this._renderer && this._renderer.autoDispose) {
							this._renderer.dispose();
						}

						this._renderer = renderer;
					}
				},

				scene: {
					enumerable: true, 
					get: function() { return this._currentScene; },
					set: function(scene) {
						if(!!this._currentScene && this._currentScene.autoDispose) {
							this._currentScene.dispose();
						}

						this._currentScene = scene;
					}
				},
			};

			Object.defineProperties(this, myProperties);
		},
	});
})( use("rocket88") );