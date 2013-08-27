(function(rocket88) {
	"use strict";

	rocket88.ScreenComponent = rocket88.Component.extends({
		init: function(name) {
			this._super(name || "screen.Component");

			this._paintRect = new rocket88.Rectangle();
			this._transformMatrix = new rocket88.Matrix();
			this._topLeft = new rocket88.Vector();
			this._topRight = new rocket88.Vector();

			this.visible = true;
			this.alpha = 1.0;
		},
		

		ready: function() {
			this._super();
			this._gameobject = this.parent;
		},


		update: function() {
			this._super();

			this.getTransformation();
			this.getPaintRectangle();

			this._visibleOnStage = this._gameobject.graphic.sprite.visible;
		},


		getTransformation: function() {
			var myLayer = this._gameobject.layer,
				mySprite = this._gameobject.graphic.sprite;

			this._transformMatrix.identity();
			this._transformMatrix.multiply(myLayer.transform.matrix);
			this._transformMatrix.multiply(this._gameobject.transform.matrix);
			this._transformMatrix.multiply(mySprite.transform.matrix);
		},


		getPaintRectangle: function() {
			var myBounds = this._gameobject.graphic.sprite.bounds;

			this._topLeft.set(myBounds.left, myBounds.top);
			this._topLeft.rotate(this._transformMatrix).abs();

			this._topRight.set(myBounds.right, myBounds.top);
			this._topRight.rotate(this._transformMatrix).abs();

			var myX = rocket88.max(this._topLeft.x, this._topRight.x),
				myY = rocket88.max(this._topLeft.y, this._topRight.y),
				myWidth = myX << 1,
				myHeight = myY << 1;

			myX = -myX + this._transformMatrix.tx;
			myY = -myY + this._transformMatrix.ty;

			this._paintRect.set(myX, myY, myWidth, myHeight);
		},


		dispose: function() {
			this._super();

			delete this._transformMatrix;
			delete this._topRight;
			delete this._topLeft;
			delete this._gameobject;
			delete this._paintRect;
		},


	    defineProperties: function() {
	    	this._super();
	    	
	    	var myProperties = {
	    		paintRect: {
	    			enumerable: true,
	    			get: function() { return this._paintRect; }
	    		},

				transformMatrix: {
					enumerable: true, 
					get: function() { return this._transformMatrix; }
				},
	    	};

	    	Object.defineProperties(this, myProperties);
		},	
	});
})( use("rocket88") );