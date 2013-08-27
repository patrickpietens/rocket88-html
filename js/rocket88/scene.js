(function(rocket88) {
	"use strict";

	rocket88.Scene = rocket88.ObjectContainer.extends({	
		init: function(name) {
			this._super(name);

			this._type = "scene";
			this._camera = new rocket88.Camera();
		},


		update: function() {
			this._camera.update();
			this._super();
		},


		dispose: function() {
			this._super();
	        delete this._camera;
		},


		defineProperties: function() {
			this._super();

			var myProperties = {
	    		director: { 
					enumerable: true, 
	    			get: function() { return this.parent; } 
	    		},

				camera: {
					enumerable: true, 
					get: function() { return this._camera; },
					set: function(camera) {
						if(!!this._camera && this._camera.autoDispose) {
							this._camera.dispose();
						}

						this._camera = camera;
					}
				}
	    	};

	    	Object.defineProperties(this, myProperties);
		},		
	});
})( use("rocket88") );
