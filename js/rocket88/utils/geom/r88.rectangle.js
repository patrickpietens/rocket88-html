var Rectangle = Class.extend({

	init: function(x, y, width, height) {

		// Public properties
		this.origin 	= new Point(x, y);
		this.size 		= new Size(width, height);

		// Getters/setters
		this.__defineGetter__("top", function() { return this.origin.y });
		this.__defineGetter__("right", function() { return this.origin.x + this.size.width });
		this.__defineGetter__("bottom", function() { return this.origin.y + this.size.height });
		this.__defineGetter__("left", function() { return this.origin.x });
		this.__defineGetter__("isEmpty", function() { return this.size.isEmpty });
	},
	
	center: function() {
		this.origin.x(-0.5 * this.size.width());
		this.origin.y(-0.5 * this.size.height());		
	},

	contains: function(point) {
		var myHorizontal = point.x() > this.left() && point.x() < this.right();
		var myVertical	 = point.y() > this.top() && point.y() < this.bottom();

		return myHorizontal && myVertical;
	},

	inflate: function(size) {
		this.origin.x(this.origin.x() - size.width());
		this.size.width(this.size.width() + size.width() * 2);

		this.origin.y(this.origin.y() - size.height());
		this.size.height(this.size.height() + size.height() * 2);
	},

	deflate: function(size) {
		this.origin.x(this.origin.x() + size.width());
		this.size.width(this.size.width() - size.width() * 2);

		this.origin.y(this.origin.y() + size.height());
		this.size.height(this.size.height() - size.height() * 2);
	},

	empty: function() {
		this.origin.x = 0;
		this.origin.y = 0;
		this.size.empty();
	},

	clone: function() {
		return new Rectangle(this.origin.x, this.origin.y, this.size.width, this.size.height);
	},

	toString: function() {
		return "[rectangle x=" + this.origin.x + " y=" + this.origin.y + " width=" + this.size.width + " height=" + this.size.height + "]";
	},

	toCss: function() {
		return this.origin.toCss() + this.size.toCss();
	}
});