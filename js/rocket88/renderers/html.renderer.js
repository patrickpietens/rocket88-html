rocket88.HTMLRenderer = rocket88.Renderer.extend({
	init: function(target) {
		this._super(target);

		if(target.tagName.toLowerCase()!="div") {
			throw new ReferenceError("Required property 'target' must be a div object");
		}
	},

	prepare: function() {
		this._target.style.position = "relative";
		this._htmlString = "";
	},

	draw: function(sprite) {
		this._super(sprite);
		
		var myWidth 	= sprite.cropRect.size.width;
		var myHeight 	= sprite.cropRect.size.height;
		var myLeft 		= -myWidth >> 1;
		var myTop 		= -myHeight >> 1;

		var myCss = "";
		myCss += "position:absolute;";
		myCss += "left:" + myLeft + "px;top:" + myTop + "px;";
		myCss += "width:" + myWidth + "px;height:" + myHeight + "px;";
		myCss += "background-image:url(" + sprite.url + ");";
		myCss += "background-position:" + -1 * sprite.cropRect.origin.x + "px " + -1 * sprite.cropRect.origin.y + "px;";
		myCss += this.transformMatrix.toCss();
		myCss += sprite.toCss();

		this._htmlString += "<div id=" + this._renderedGameObject.name + " style='" + myCss + "'></div>";			
	},

	finish: function() {
		this.target.innerHTML = this._htmlString;
	}
});