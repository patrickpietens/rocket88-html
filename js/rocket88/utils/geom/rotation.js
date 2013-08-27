(function(rocket88) {
	"use strict";

	rocket88.Rotation = Class.extends({
		init: function() {
			this._degrees = 0;
			this._radians = 0;
		},


		defineProperties: function() {
			var myProperties = {
				degrees: { 
					get: function() { return this._degrees; },
					set: function(degrees) {
						this._degrees = degrees;
						this._radians = degreesToRadians(degrees);
					},
				},

				radians: { 
					get: function() { return this._radians; },
					set: function(radians) { 
						this._radians = radians;
						this._degrees = radiansToDegrees(radians);
					},
				}
			};

			Object.defineProperties(this, myProperties)
		},
	});

	rocket88.Rotation.create = function() {
		return new rocket88.Rotation();
	};
})( use("rocket88") );