var Rocket88 = Class.extend({

	// Executes when the object is instantiated
	init: function(renderer, debugMode) {		
		if(!renderer) {
			throw ReferenceError("Houston, we have a problem. Required argument 'renderer' is missing");
		}

		// Author information
		this.version = "0.1",
		this.authors = "Patrick Pietens"

		console.log("This game utilises the Rocket88 engine v" + this.version);

		if(debugMode) {
			this._stats = new Stats();
			this._stats.domElement.style.position = "absolute";
			this._stats.domElement.style.top = "0px";
			this._stats.domElement.style.left = "0px";
			
			document.body.appendChild(this._stats.domElement);			
		}

		Rocket88 = this;

		// Private properties
		this._accumulator 	= 0;
		this._crashed		= false;
		this._currentScene 	= null;
		this._currentTime 	= new Date().getTime();
		this._frame 		= 0;
		this._frameTime 	= 1000 / 60;
		this._paused 		= false;

		this._assetStore 	= new AssetStore();
		this._renderer 		= renderer;
		
		// Public properties
		this.debugMode	 	= debugMode;
		this.showWarnings 	= debugMode;
		this.showErrors	 	= debugMode;

	    // Getters
		this.__defineGetter__("type", function(){ return "Rocket88" });
		this.__defineGetter__("assetStore", function(){ return this._assetStore });
		this.__defineGetter__("crashed", function(){ return this._crashed });
		this.__defineGetter__("renderer", function(){ return this._renderer });
		this.__defineGetter__("scene", function(){ return this._currentScene });

		// Setters
		this.__defineSetter__("scene", function(scene) {
			
			// Destroy previous scene
			if(this._currentScene && this._currentScene.autoDestroy) {
				this._currentScene.destroy();
			}
			
			// Create the scene
			scene.ready();			

			// Set the scene
			this._currentScene = scene;
			this._renderer.ready();
		});
	},
		
	// Updates the scene using a fixed timestep
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

	// Executes every render tick
	update: function() {
		this._frame++;

		this._renderer.prepare();
		this._currentScene.update();
		this._renderer.camera = this._currentScene.camera;
		this._renderer.finish();

		if(this._stats) {
			this._stats.update();
		}
	},

	// Starts running the game. This function will resume the game after it is paused
	liftOff: function() {
		if(!this._currentScene) {
            throw ReferenceError("Houston, we have a problem. Rocket88 requires a scene before lifting off");
            return false;
        }
		
		console.info("Houston, we have a lift off!");	 

		this._paused = false;
		this.updateWithFixedTimestep();

		return true;
	},

	// Pauses the game
	land: function() {
		this._paused = true;
	},	

	crash: function() {
        if(this._crashed) {
        	throw ReferenceError("Houston, we have a problem. Unable to crash Rocket88 game");	
        	return false;
        }

		console.info("Houston, Rocket88 crashed to the ground");

		this._currentScene.dispose();
		Rocket88.assetStore.dispose();

		this._currentScene 	= null;
		this._currentTime 	= 0;
		this._frame 		= 0;
		this._paused 		= false;
		this._renderer 		= null;
		this._crashed		= true;

		return true;
	},

	// String representation of the game
	toString: function() {
		return "[" + this.type + " running=" + !this._paused + " crashed="+ this._crashed +"]";
	},
});
