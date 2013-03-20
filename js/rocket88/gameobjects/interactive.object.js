rocket88.InteractiveObject = rocket88.PhysicsObject.extend({

	init: function(name) {
		this._super(name);

		// Private properties
		this._keys = new rocket88.KeysComponent();
		this.addComponent(this._keys);		

		// Getters
		this.__defineGetter__("keys", function() { return this._keys; });	

		// Set handlers
		this.keys.onKeyDown = delegate(this, this.onKeyDown);
		this.keys.onKeyUp = delegate(this, this.onKeyUp);
	},

	onKeyDown: function(keyCode) {
	},

	onKeyUp: function(keyCode) {
	},

	dispose: function() {
		this._super();
		this._keys = null;
	}
});