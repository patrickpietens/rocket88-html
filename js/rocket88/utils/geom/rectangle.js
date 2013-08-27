(function(rocket88) {
	"use strict";

	rocket88.Rectangle = Class.extends({
		init: function(x, y, width, height) {			
			this._topLeft = new rocket88.Point();
			this._size = new rocket88.Size();

			this.set(x, y, width, height);
		},


		set: function(x, y, width, height) {
			this._topLeft.set(x, y);
			this._size.set(width, height);

			return this;
		},

		
		center: function() {
			this._topLeft.x = -this._size.width >> 1;
			this._topLeft.y = -this._size.height >> 1;	
		},


		contains: function(point) {
			var myHorizontal = point.x > this.left && point.x < this.right;
			var myVertical = point.y > this.top && point.y < this.bottom;

			return myHorizontal && myVertical;
		},


		union: function(rectangle) {
			this._topLeft.x = rocket88.min(this._topLeft.x, rectangle._topLeft.x);
			this._topLeft.y = rocket88.min(this._topLeft.y, rectangle._topLeft.y);
			
			var myRight = rocket88.max(this.right, rectangle.right);
			this.size.width = myRight - this._topLeft.x;

			var myBottom = rocket88.max(this.right, rectangle.right);
			this.size.height = myRight - this._topLeft.y;
		},


		inflate: function(size) {
			this._topLeft.x(this._topLeft.x - size.width);
			this._size.width(this._size.width + size.width * 2);

			this._topLeft.y(this._topLeft.y - size.height);
			this._size.height(this._size.height + size.height * 2);
		},


		deflate: function(size) {
			this._topLeft.x(this._topLeft.x + size.width);
			this._size.width(this._size.width - size.width * 2);

			this._topLeft.y(this._topLeft.y + size.height);
			this._size.height(this._size.height - size.height * 2);
		},


		intersects: function(rectangle) {
			return !(rectangle.left > this.right || 
           			 rectangle.right < this.left || 
           			 rectangle.top > this.bottom ||
           			 rectangle.bottom < this.top);			
		},


		empty: function() {
			this._topLeft.empty();
			this._size.empty();
		},


		clone: function() {
			return new rocket88.Rectangle(this._topLeft.x, this._topLeft.y, this._size.width, this._size.height);
		},


		copy: function(rectangle) {
			this._topLeft.x = rectangle.left;
			this._topLeft.y = rectangle.top;
			this._size.width = rectangle.size.width;
			this._size.height = rectangle.size.height;

			return this;
		},


		toCss: function() {
			return this._topLeft.toCss() + this._size.toCss();
		},


		defineProperties: function() {
			var myProperties = {
				origin: {
					enumerable: true, 
					get: function() { return this._topLeft; }
				},

				size: {
					enumerable: true, 
					get: function() { return this._size; }
				},

				top: {
					enumerable: true,
					get: function() { return this._topLeft.y; }
				},

				right: {
					enumerable: true,
					get: function() { return this._topLeft.x + this._size.width; }
				},	

				bottom: {
					enumerable: true,
					get: function() { return this._topLeft.y + this._size.height; }
				},	

				left: {
					enumerable: true,
					get: function() { return this._topLeft.x; }
				},
			};

			Object.defineProperties(this, myProperties);
		},
	});

	rocket88.Rectangle.create = function(x, y, width, height) {
		return new rocket88.Rectangle(x, y, width, height);
	};
})( use("rocket88") );