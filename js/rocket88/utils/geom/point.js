(function(rocket88) {
	"use strict";

	rocket88.Point = Class.extends({
		init: function(x, y) {
			this.set(x, y);
		},
		

		set: function(x, y) {
			this.x = x || 0;
			this.y = y || 0;

			return this;
		},
		

		abs: function() {
			this.x = rocket88.abs(this.x);
			this.y = rocket88.abs(this.y);

			return this;
		},


		add: function(vector) {
			this.x += vector.x;
			this.y += vector.y;

			return this;
		},


		subtract: function(vector) {
			this.x -= vector.x;
			this.y -= vector.y;

			return this;
		},


		multiply: function(value) {
			this.x *= value;
			this.y *= value;

			return this;
		},


		divide: function(value) {
			this.x /= value;
			this.y /= value;

			return this;
		},


		empty: function() {
			this.x = 0;
			this.y = 0;

			return this;
		},


		clone: function() {
			return new rocket88.Point(this.x, this.y);
		},


		copy: function(point) {
			this.x = point.x;
			this.y = point.y;

			return this;
		},


		toCss: function() {
			return "left:" + this.x.toFixed(12) +";top:" + this.y.toFixed(12) + ";";
		},
	});

	rocket88.Point.create = function(x, y) {
		return new rocket88.Point(x, y);
	};	
})( use("rocket88") );