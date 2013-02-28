var b2Vec2 = Box2D.Common.Math.b2Vec2;

var Point = Class.extend({

	init: function(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	},
	
	add: function(point) {
		this.x += point.x();
		this.y += point.y();
	},

	substract: function(point) {
		this.x -= point.x();
		this.y -= point.y();
	},

	multiply: function(value) {
		this.x *= value;
		this.y *= value;
	},

	distanceTo: function(point) {
		var myX = point.x() - this.x;
		var myY = point.y() - this.y;

		return Math.sqrt((myX * myX) + (myY * myY));
	},

	direction: function() {
		var myX = point.x() - this.x;
		var myY = point.y() - this.y;

   		return Math.atan2(myY, myX);
	},
	
	clone: function() {
		return new Point(this.x, this.y);
	},

	toString: function() {
		return "[point x=" + this.x + " y=" + this.y + "]";
	},

	toCss: function() {
		return "left:" + this.x.toFixed(12) +";top:" + this.y.toFixed(12) + ";";
	},

	toB2Vec2: function() {
		var myScale = 1 / 30;
		return new b2Vec2(this.x * myScale, this.y * myScale);
	}
});