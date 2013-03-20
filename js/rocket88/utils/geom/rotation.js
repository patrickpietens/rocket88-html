rocket88.Rotation = Class.extend({

	init: function(x, y) {
		// Private properties
		this._degrees = 0;
		this._radians = 0;

		// Getters/setters
		this.__defineGetter__("degrees", function() { return this._degrees; });
		this.__defineSetter__("degrees", function(degrees) {
			this._degrees = degrees;
			this._radians = degreesToRadians(degrees);
		});

		this.__defineGetter__("radians", function() { return this._radians; });
		this.__defineSetter__("radians", function(radians) { 
			this._radians = radians;
			this._degrees = radiansToDegrees(radians);
		});
	}
});