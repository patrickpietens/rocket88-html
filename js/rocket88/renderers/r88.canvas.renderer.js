var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

var CanvasRenderer = Renderer.extend({

	init: function(target) {
		this._super(target);

		if(target.tagName.toLowerCase()!="canvas") {
			throw ReferenceError("Required property 'target' must be a canvas object");
		}

		// Private properties
		this._context = target.getContext("2d");

		// Getters
		this.__defineGetter__("context", function() { return this._context; });		
	},

	ready: function() {
		this._super();
		
		// Setup debug drawing
		var myDirector = Director.getInstance();
		if(myDirector.debugMode) {
			this.backgroundColor = "#cccccc";

			var myDebugDraw = new b2DebugDraw();
			myDebugDraw.SetSprite(this._context);
			myDebugDraw.SetDrawScale(30);
			myDebugDraw.SetFillAlpha(1.0);
			myDebugDraw.SetLineThickness(1.0);
			myDebugDraw.SetFlags(b2DebugDraw.e_shapeBit|b2DebugDraw.e_jointBit);
			
			var myDirector = Director.getInstance();
			myDirector.scene.world.SetDebugDraw(myDebugDraw);		
		}
	},

	prepare: function() {
		this._super();

        // Set the backgroundColor
		if (this.backgroundColor) {

			this._context.fillStyle = "#cccccc";
			this._context.fillRect(0, 0, this._target.width, this._target.height);
		}
		else {
			this._context.clearRect(0, 0, this._target.width, this._target.height);
		}
	},

	// Draws a sprite to the renderer
	draw: function(sprite) {
		this._super(sprite);

		var myDirector = Director.getInstance();
		var myAssetStore = AssetStore.getInstance();

		if(!myAssetStore.hasAsset(sprite.url)) {
			console.assert(!myDirector.showErrors, "Unable to find sprite:" + sprite.url + " at the AssetStore");
			return;
		}

		// Save context
		this._context.save();		

		var myWidth 	= sprite.cropRect.size.width;
		var myHeight 	= sprite.cropRect.size.height;
		var myLeft 		= -myWidth >> 1;
		var myTop 		= -myHeight >> 1;

		// Transform canvas context
		this._context.transform(
			this.transformMatrix.a, 
			this.transformMatrix.b, 
			this.transformMatrix.c, 
			this.transformMatrix.d, 
			this.transformMatrix.tx, 
			this.transformMatrix.ty);
		
		this._context.globalAlpha = sprite.alpha;

		var myImage = myAssetStore.assetForPath(sprite.url);
		this._context.drawImage(
			myImage, 		
		
			// Source
			sprite.cropRect.origin.x, sprite.cropRect.origin.y, 
			myWidth, myHeight,

			// Destination
			myLeft, myTop, 
			myWidth, myHeight);

		// Restore the context to its original state
    	this._context.restore();
	}
});