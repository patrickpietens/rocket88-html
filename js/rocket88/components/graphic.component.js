(function(rocket88) {
	"use strict";

	rocket88.GraphicComponent = rocket88.Component.extends({
		init: function(name) {
			this._super(name || "graphic.component");
			
			this.needsRender = false;
			this.visible = true;

			this._sprite = undefined;
		},
		

		update: function() {
			this._super();	
			if(!!this._sprite) {
				this._sprite.update();
			}	
		},


		dispose: function() {
			this._super();
			if(this._sprite && this._sprite.autoDispose) {
				this._sprite.dispose();
			}

			delete this._sprite;
		},


	    defineProperties: function() {
	    	this._super();

			var myProperties = {
				needsDisplay: {
					enumerable: true, 
					get: function() { return this._needDisplay; }
				},

		    	sprite: {
					enumerable: true, 
		    		get: function() { return this._sprite; },
		    		set: function(sprite) {
						if(!!this._sprite && this._sprite.autoDispose) {
							this._sprite.dispose();
						}

						this._sprite = sprite 	    			
		    		}
		    	}				
			};

			Object.defineProperties(this, myProperties);
		},
	});
})( use("rocket88") );