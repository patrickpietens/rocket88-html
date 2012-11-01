/**
 * @author patrickpietens
 *
 */

var Rocket88 = Class.extend({

	init: function(canvas, debugMode, renderer)
	{
		if(!canvas)
		{
			throw ReferenceError("'Houston we have a problem': Required parameter 'canvas' is missing");
		}
		
		// Private properties
		this._origin = new Point(canvas.width * 0.5, canvas.height * 0.5);

		this._accumulator = 0;
		this._currentScene = null;
		this._currentTime = new Date().getTime();
		this._debugMode = debugMode || false;
		this._frameTime = 1000 / 60;			
		this._paused = false;

		switch(renderer)
		{
			default:
				console.warn("Optional parameter 'renderer' is missing, using default CanvasRenderer");
			
			case "canvas":
				this._renderer = new CanvasRenderer(canvas);
				break;
		}
	},
		

	// Starts running the game. This function will resume the game after it is paused
	// NOTE: it will fail when their isn't scene found
	takeOff: function()
	{
		if(!this._currentScene)
		{
            console.error("'Houston we have a problem': Rocket'88 requires a scene before taking off");
            return false;
        }
		
		this._paused = false;
		this.updateWithFixedTimestep();

		return true;
	},

	
	// Pauses the game
	land: function()
	{
		this._paused = true;
	},
	
	
	// Updates the scene using a fixed timestep
	updateWithFixedTimestep: function()
	{
		if (!this._paused)
		{		
			requestAnimationFrame(function() { this.updateWithFixedTimestep() }.bind(this));

			// Set local properties
			var myNow = new Date().getTime();
			var myTimestep = myNow - this._currentTime;

			// Update the time & accumulator
			this._accumulator += myTimestep;
			this._currentTime = myNow;

			// Render the scene according the time accumulator
			while (this._accumulator >= this._frameTime)
			{
				this._accumulator -= this._frameTime;
				this.update();
			}		
			
		}
	},
	
	
	//  inheritDoc
	update: function()
	{
		this._currentScene.update();
	},
	
	
	// Scene that represents the currentScene
	scene: function(scene)
	{
		// Sets the scene
		if(scene)
		{
			// Destroy previous scene
			if(this._currentScene && this._currentScene.autoDestroy)
			{
				this._currentScene.destroy();
			}
			
			// Set injection map
			var myMap = 
			{
				debugMode: this._debugMode,
				world: this,
				name: "currentScene",
				renderer: this._renderer	
			};
			
			// Create the scene
			scene.inject(myMap);
			scene.create();
			scene.ready();			

			// Set the scene
			this._currentScene = scene;
		}
		
		// Returns the current scene
		return this._currentScene;
	},
	
	
	origin: function(value)
	{
		if(value)
		{
			this._origin = value;
			return this;
		}

		return this._origin;
	},


	// The renderer of the game
	renderer: function()
	{
		return this._renderer;
	},
	
	
	debugMode: function()
	{
		return this._debugMode;
	}
});