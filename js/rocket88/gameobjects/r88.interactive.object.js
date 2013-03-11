var InteractiveObject = PhysicsObject.extend({

	init: function(name) {
		this._super(name);

		// Private properties
		this._keys = new KeysComponent();
		this.addComponent(this._keys);		

		// Getters
		this.__defineGetter__("keys", function() { return this._keys; });	
	}
});