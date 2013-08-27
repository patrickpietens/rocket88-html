(function(rocket88) {
	"use strict";

	rocket88.Vector = rocket88.Point.extends({
		init: function(x, y) {
			this._super(x, y);
		},


		distance: function(vector) {
 			var myX = this.x - vector._x;
            var myY = this.y - vector._y;

            return Math.sqrt(myX * myX + myY * myY);			
		},


		direction: function() {
			var myX = point.x - this.x,
				myY = point.y - this.y;

	   		return Math.atan2(myY, myX);
		},


		dot: function(vector) {
 			return this.x * vector.x + this.y * vector.y;			
		},


		cross: function(vector) {
 			return this.x * vector.x - this.y * vector.y;			
		},


		unit: function() {
			return this.divide(this.length);
		},


		normalize: function() { 
			var myInversed = 1 / this.length;
			this.x *= myInversed;
			this.y *= myInversed;

			return this;
		},
 

		rotate: function(matrix) {
			var myX = this.x * matrix.a + this.y * matrix.b,
				myY = this.x * matrix.c + this.y * matrix.d;

			this.x = myX;
			this.y = myY;

			return this;
		},


		translate: function(matrix) {
			this.x += matrix.tx;
			this.y += matrix.ty;

			return this;
		},


		transform: function(matrix) {
			this.rotate(matrix);
			this.translate(matrix);

			return this;
		},


		clone: function() {
			return new rocket88.Vector(this.x, this.y);
		},


		copy: function(vector) {
			this.x = vector.x;
			this.y = vector.y;

			return this;
		},


		defineProperties: function() {
			var myProperties = {
				length: {
					enumerable: true, 
					get: function() { return Math.sqrt(this.x * this.x + this.y * this.y); }
				},
			}			

			Object.defineProperties(this, myProperties);
		}
	});

	rocket88.Vector.create = function(x, y) {
		return new rocket88.Vector(x, y);
	};
})( use("rocket88") );