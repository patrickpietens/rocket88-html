(function(rocket88) {
	"use strict";

	rocket88.Stage = rocket88.Object.extends({
		init: function(target) {
			this._super();

			this._target = target;
			this._bounds = new rocket88.Rectangle(0, 0, this._target.width, this._target.height);
			this._bounds.center();
		},


		dispose: function() {
			this._super();

			delete this._target;
			delete this._bounds;
		},


		defineProperties: function() {
			var myProperties = {
				target: {
					enumerable: true,
					get: function() { return this._target }
				},

				bounds: {
					enumerable: true,
					get: function() { return this._bounds }
				}
			};

			Object.defineProperties(this, myProperties);
		}
	});
})( use("rocket88") );