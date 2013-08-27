(function(rocket88) {
	"use strict";

	rocket88.InteractiveGameObject = rocket88.GameObject.extends({
		init: function(name) {
			this._super(name);

			this._keys = new rocket88.KeysComponent();
			this._mouse = new rocket88.MouseComponent();

			this.addComponent(this._keys);		
		},


		dispose: function() {
			this._super();

			this._keys.dispose();
			this._mouse.dispose();

			delete this._keys;
			delete this._mouse;
		},


	    defineProperties: function() {
	    	this._super();
	    	
	    	var myProperties = {
	    		keys: {
					enumerable: true, 
	    			get: function() { return this._keys; } 
	    		},

		    	mouse: {
					enumerable: true, 
		    		get: function() { return this._mouse; } 
		    	}
		    };

		    Object.defineProperties(this, myProperties);
		},
	});
})( use("rocket88") );