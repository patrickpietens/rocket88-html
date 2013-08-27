(function(rocket88) {
	"use strict";

	rocket88.CanvasRenderer = rocket88.Renderer.extends({
		init: function(stage) {
			this._super("canvas.renderer", stage.target);

			if(stage.target.tagName.toLowerCase()!="canvas") {
				throw ReferenceError("Required property 'target' must be a canvas object");
			}

			this._context = stage.target.getContext("2d");
			this._center = new rocket88.Point();
			this._center.x = this._context.canvas.width >> 1;
			this._center.y = this._context.canvas.height >> 1;

			this.immediateMode = false;
		},


		prerender: function() {
			this._super();

			this._context.setTransform(1, 0, 0, 1, 0, 0);
			this._context.clearRect(0, 0, this._target.width, this._target.height);

			this._context.beginPath();
			this._context.strokeStyle = "gray";

			this._context.moveTo(400.5, 0);
			this._context.lineTo(400.5, 600);

			this._context.moveTo(0, 300.5);
			this._context.lineTo(800, 300.5);

			this._context.stroke();
		},


		bufferObject: function(gameobject) {
			if(this.immediateMode) {
				this.drawObject(gameobject);
				return;
			}

			this._super(gameobject);
		},


		drawObject: function(gameobject) {
			var mySprite = gameobject.graphic.sprite,
				myImage = rocket88.assetStore.getAsset(mySprite.url),
				myTransformMatrix = gameobject.screen.transformMatrix;

			var mySource = mySprite.sourceRect,
				myTarget = mySprite.bounds;

			// Reset context
			this._context.setTransform(1, 0, 0, 1, this._center.x, this._center.y);

			// Transform context according transformation matrix from the gameobject
			this._context.transform(
				myTransformMatrix.a, 
				myTransformMatrix.b, 
				myTransformMatrix.c, 
				myTransformMatrix.d, 
				myTransformMatrix.tx, 
				myTransformMatrix.ty);
		
			// Set opacity of the context
			this._context.globalAlpha = gameobject.screen.alpha;
		
			// Draw image to screen
			this._context.drawImage(
				myImage, 		
			
				// Source
				mySource.origin.x, mySource.origin.y, 
				mySource.size.width, mySource.size.height,

				// Destination
				myTarget.origin.x, myTarget.origin.y, 
				myTarget.size.width, myTarget.size.height);

			// Draw debug shapes
			this.drawDebug(gameobject);
		},

		
		drawDebug: function(gameobject) {
			var myPaintRect = gameobject.screen.paintRect,
				myBounds = gameobject.graphic.sprite.bounds,
				myTransformMatrix = gameobject.screen.transformMatrix;

			// Draw center
			this._context.beginPath();
			this._context.moveTo(0, -25);
			this._context.strokeStyle = "yellow";
			this._context.lineTo(0, 0);
			this._context.stroke();

			this._context.beginPath();
			this._context.moveTo(0, 0);
			this._context.strokeStyle = "green";
			this._context.lineTo(25, 0);
			this._context.stroke();

			// Draw sprite bounds
			this._context.beginPath();
			this._context.strokeStyle = "blue";
			this._context.rect(myBounds.origin.x, myBounds.origin.y, myBounds.size.width, myBounds.size.height);
			this._context.stroke();

			// Draw paint rectangle
			this._context.setTransform(1, 0, 0, 1, this._center.x, this._center.y);
			this._context.beginPath();
			this._context.strokeStyle = "red";
			this._context.rect(myPaintRect.origin.x, myPaintRect.origin.y, myPaintRect.size.width, myPaintRect.size.height);
			this._context.stroke();
		},


	    defineProperties: function() {
	    	this._super();
	    	
	    	Object.defineProperties(this, {
	    		context: {
					enumerable: true, 
	    			get: function() { return this._context; } 
	    		}
	    	});
		},
	});
})( use("rocket88") );