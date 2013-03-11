 var GraphicComponent = Component.extend({

	init: function() {
		this._super("graphic");
	
		// Private properties
		this._sprite 		= undefined;	

		// Getters/setters
		this.__defineGetter__("renderer", function() { return this._renderer });
		this.__defineGetter__("sprite", function() { return this._sprite });
		this.__defineSetter__("sprite", function(sprite) { 
			if(this._sprite) {
				console.warn ("Replacing sprite: " + this._sprite.name + " with sprite: " + sprite.name)

				if(this._sprite.autoDispose) {
					this._sprite.dispose();
				}
			}

			this._sprite = sprite 
		});
	},
	
	update: function() {
		this._super();	

		if(this._sprite) {
			this._sprite.update();

			var myRenderer = Director.getInstance().renderer;
			myRenderer.draw(this._sprite);			
		}	
	},

	dispose: function() {
		this._super();
		this._sprite.dispose();
		this._sprite = null;
	}
});