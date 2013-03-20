rocket88.Size = Class.extend({

	init: function(width, height) {
		this.width = width || 0;
		this.height = height || 0;

		this.__defineGetter__("isEmpty", function() { return this.width==0 && this.height==0; })
	},

	empty: function() {
		this.width = 0;
		this.height = 0;
	},

	clone: function() {
		return new rocket88.Size(this.width, this.height);
	},

	toString: function() {
		return "[size width=" + this.width + " height=" + this.height + "]";
	},

	toCss: function () {
		return "width:" + this.width.toFixed(12) + ";height:" + this.height.toFixed(12) + ";";
	}
});