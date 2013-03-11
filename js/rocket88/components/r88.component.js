var Component = Object88.extend({

	init: function(name) {
		this._super(name);
		
		// Private properties
		this._enabled 	= true;

		// Public properties
		this.gameobject = undefined;

		// Getters
		this.__defineGetter__("type", function() { return "component"; });
		this.__defineGetter__("enabled", function() { return this._enabled; });
	},
	
	ready: function() {
	},

	enable: function () {
		this._enabled = true;
	},

	disable: function () {
		this._enabled = false;
	},

	dispose: function() {
		this._super();
		this.gameObject = null;
	}
});