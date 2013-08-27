(function(rocket88) {
	"use strict";

	rocket88.Size = Class.extends({
		init: function(width, height) {
			this.set(width, height);
		},


		set: function(width, height) {
			this.width = width || 0;
			this.height = height || 0;

			return this;
		},
		

		empty: function() {
			this.width = 0;
			this.height = 0;

			return this;
		},


		clone: function() {
			return new rocket88.Size(this.width, this.height);
		},


		copy: function(size) {
			this.width = size.width;
			this.height = size.height;

			return this;
		},


		toString: function() {
			return "[size width=" + this.width + " height=" + this.height + "]";
		},


		toCss: function () {
			return "width:" + this.width.toFixed(12) + ";height:" + this.height.toFixed(12) + ";";
		},


		defineProperties: function() {
			Object.defineProperties(this, {
				isEmpty: { 
					enumerable: true, 
					get: function() { return this.width==0 && this.height==0; }
				}
			});
		},
	});

	rocket88.Size.create = function(width, height) {
		return new rocket88.Size(width, height);
	};
})( use("rocket88") );
