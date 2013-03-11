var Object88 = EventDispatcher.extend({

	// Executes when the object is instantiated
	init: function(name) {
		this._super();

		// Private properties
		this._createdAt 	= new Date().getTime();
		this._name 			= name || "unnamed" + Math.round((Math.random() * this._createdAt));
		this._ready 		= false;
		this._disposed	 	= false;

		this._director		= Director.getInstance();
		this._assetStore	= AssetStore.getInstance();
		this._assetLoader	= AssetLoader.getInstance();

		// Public properties
		this.autoDispose 	= true;
		this.tag			= 0;

	    // Getters
	    this.__defineGetter__("type", function() { return "Object88"; });
	    this.__defineGetter__("name", function() { return this._name; });
	    this.__defineGetter__("createdAt", function() { return this._createdAt; });
	    this.__defineGetter__("isReady", function() { return this._ready; });
	    this.__defineGetter__("isDisposed", function() { return this._disposed; });

	   	this.__defineGetter__("director", function() { return this._director });
	    this.__defineGetter__("assetStore", function() { return this._assetStore });	   	
	},

	// All properties are injected and set and the game is ready to run.
	ready: function() {
		this._ready = true;

		console.info(this.type + ": " + this._name + " is ready");	

		this.dispatch("ready", this);
	},
	
	// Executes every render tick
	update: function() {	
		if(!this._ready) {
			return;
		}
	},
	
	// Clones the object
	clone: function(name) {
		var myClone = new Object88(name);
		return myClone;
	},

	// String representation of the object
	toString: function() {
		return "[" + this.type + " name=\"" + this._name + "\" isReady=" + this._ready + " isDisposed=" + this._disposed	 + "]";
	},

	// Destroys the object
	dispose: function() {
		this._super();
		
        if(this._disposed) {
        	console.assert(!Rocket88.showErrors, "Unable to dispose object: " + this.name);	
        }

		this.dispatch("disposed", this);
		console.info(this.type + ": " + this._name + " is disposed");	
		
		this._assetStore = null;	
		this._director = null;
		this._name = null;
        this._world = null;
        this._disposed = true;
    },
});