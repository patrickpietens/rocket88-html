 var Transform = Component.extend({

	init: function() {
		this._super("transform");		

		// Public properties
		this.origin 	= new Point(0, 0);
		this.rotation	= 0;
		this.scaleX		= 0;
		this.scaleY		= 0;

		// Private properties		
		this._scale		= 1.0;
		this._flippedX 	= false;
		this._flippedY 	= false;
		this._matrix 	= new Matrix();
		this._position	= new Point();

		// Getters/setters
		this.__defineGetter__("position", function() { return this._position });
		
		this.__defineGetter__("x", function() { return this._position.x });
		this.__defineSetter__("x", function(x) { 

			var myOldValue = this._position.x;
			this._position.x = x;
			
			this.dispatch("propertyChanged", "x", this._position.x, myOldValue);
		});

		this.__defineGetter__("y", function() { return this._position.y });
		this.__defineSetter__("y", function(y) { 

			var myOldValue = this._position.y;
			this._position.y = y;

			this.dispatch("propertyChanged", "y", this._position.y, myOldValue);
		})

		// Getters/setters
		this.__defineGetter__("matrix", function() {
		
			var myFlipX = this._flippedX ? -1 : 1;
			var myFlipY = this._flippedY ? -1 : 1;

			this._matrix.identity();
			this._matrix.translate(this._position.x, this._position.y);
			this._matrix.rotate(parseDegreesToRadians(this.rotation));

			this._matrix.scale(this.scaleX, this.scaleY);
			this._matrix.scale(myFlipX, myFlipY);
			this._matrix.translate(-1 * this.origin.x, -1 *this.origin.y);

			return this._matrix;
		});

		this.__defineGetter__("scale", function() { return this._scale });
		this.__defineSetter__("scale", function(scale) { 
			this._scale = scale;
			this.scaleX = scale;
			this.scaleY = scale;
		});
	},

	flipX: function () {
		this._flippedX = !this._flippedX;
	},

	flipY: function () {
		this._flippedY = !this._flippedY;
	}	
});

