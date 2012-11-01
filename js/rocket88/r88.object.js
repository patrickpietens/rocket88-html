/**
 * @author patrickpietens
 *
 */

var EightyEightObject = Class.extend({

	// Constructor
	init: function(name)
	{
		// Object that holds all private properties
		this.userData = new Object();
		
		// Private properties
		this._createdAt = new Date().getTime();
		this._name = name || "Object_" + Math.round((Math.random() * this._createdAt));
		this._autoDestroy = true;
		this._isReady = false;
		this._isDestroyed = false;
		this._world = null;
		this._renderer = null;
	},

	
	// Inject properties in the object
	inject: function(values)
	{
		if (values)
		{
			this._world = values.world;
			this._renderer = values.renderer;	
		}		
	},
	
	
	// Executes when the object is added to the game engine
	create: function(name)
	{
	},


	// Executes when the object is completely initiatized: 
	// All properties are injected and set and the game is ready to run.
	ready: function()
	{
		if(this._world.debugMode())
		{
			console.info("EightyEightObject '" + this.name() + "' is ready");	
		}
			
		this._isReady = true;
	},
	

	// Executes every render tick of the game engine
	update: function()
	{
	},
	
	
	// Number that represents the timestamp the object was created
	createdAt: function()
	{
		return this._createdAt;
	},
	
	
	// String that represents the name of the object
	name: function()
	{
		return this._name;
	},
	
	
	// Boolean indi
	autoDestroy: function(value)
	{
		if(value)
		{
			this._autoDestroy = value;
		}
		else
		{
			return this._autoDestroy;
		}		
	},
	
	
	// Boolean that indicates that the object is ready
	isReady: function()
	{
		return this._isReady;
	},
	
	
	// Boolean that indicates that the object is destroyed
	isDestroyed: function()
	{
		return this._isDestroyed;
	},
	
	
	// Director of the game
	world: function()
	{
		return this._world;
	},
	
	
	// Renderer of the game
	renderer: function()
	{
		return this._renderer;
	},
	
	
	// Destroys the object
	destroy: function()
	{
		if(this._world.debugMode())
		{
			console.info("Destroying EightyEightObject '" + this.name() + "'");	
		}

        if(this._isDestroyed)
        {
            this._name = null;
            this._world = null;
            this._renderer = null;
        }

        this._destroyed = true;
    }
});