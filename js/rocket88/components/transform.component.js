rocket88.TransformComponent = rocket88.Component.extend({

	init: function() {
		this._super("transform");		

		// Public properties
		this.origin 	= new rocket88.Point(0, 0);		
		this.scaleX		= 0;
		this.scaleY		= 0;

		// Private properties	
		this._scale		= 1.0;
		this._flippedX 	= false;
		this._flippedY 	= false;
		this._position	= new rocket88.Point();
		this._rotation	= new rocket88.Rotation();	
		this._matrix 	= new rocket88.Matrix();

		// Getters/setters				
		this.__defineGetter__("degrees", function() { return this._rotation.degrees; });
		this.__defineSetter__("degrees", function(degrees) { 
			var myOldValue = this._rotation;
			this._rotation.degrees = degrees;		

			this.onTransform("rotation", this._rotation, myOldValue);
		});

		this.__defineGetter__("radians", function() { return this._rotation.radians; });
		this.__defineSetter__("radians", function(radians) { 
			var myOldValue = this._rotation;
			this._rotation.radians = radians;
			
			this.onTransform("rotation", this._rotation, myOldValue);
		});

		this.__defineGetter__("x", function() { return this._position.x });
		this.__defineSetter__("x", function(x) { 
			var myOldValue = this._position.x;
			this._position.x = x;
			
			this.onTransform("position", this._position, myOldValue);
		});

		this.__defineGetter__("y", function() { return this._position.y });
		this.__defineSetter__("y", function(y) { 
			var myOldValue = this._position.y;
			this._position.y = y;

			this.onTransform("position", this._position, myOldValue);
		})

		this.__defineGetter__("scale", function() { return this._scale });
		this.__defineSetter__("scale", function(scale) { 
			this._scale = scale;
			this.scaleX = scale;
			this.scaleY = scale;
		});

		this.__defineGetter__("position", function() { return this._position });
		this.__defineGetter__("rotation", function() { return this._rotation; });

		this.__defineGetter__("matrix", function() {
			var myFlipX = this._flippedX ? -1 : 1,
				myFlipY = this._flippedY ? -1 : 1;

			this._matrix.identity();
			this._matrix.translate(this._position.x, this._position.y);
			this._matrix.rotate(this._rotation.radians);

			this._matrix.scale(this.scaleX, this.scaleY);
			this._matrix.scale(myFlipX, myFlipY);
			this._matrix.translate(-1 * this.origin.x, -1 *this.origin.y);

			return this._matrix;
		});
	},

	flipX: function(direction) {
		this._flippedX = !this._flippedX;
		if(direction!=undefined) {
			this._flippedX = direction;
		}
	},

	flipY: function(direction) {
		this._flippedY = !this._flippedY;
		if(direction!=undefined) {
			this._flippedY = direction;
		}
	},

	onTransform: function(property, oldValue, newValue) {
	}	
});

