(function(rocket88) {
	"use strict";

	rocket88.HTMLRenderer = rocket88.Renderer.extends({
		init: function(target) {
			this._super("html.renderer", target);

			if(target.tagName.toLowerCase()!="div") {
				throw new ReferenceError("Required property 'target' must be a div object");
			}

			this._labelCss = "display: inline-block;" +
							 "background-color:white;" +
							 "padding:2px;" +
							 "font-family:Helvetica;" +
							 "font-size:11px;" +
							 "color:black";
		},


		prerender: function() {
			this._target.style.position = "relative";
			this._htmlString = "";
		},


		draw: function(sprite) {
			this._super(sprite);

			var myCss = this.transformMatrix.toCss() + sprite.toCss();
			var myHtml = "<div id='" + this._renderedGameObject.name + "' style='" + myCss + "'></div>";
			
			this._htmlString += myHtml;
		},


		finish: function() {
			this.target.innerHTML = this._htmlString;
		}
	});
})( use("rocket88") );