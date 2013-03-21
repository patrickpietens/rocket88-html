var b2DebugDraw = b2DebugDraw || Box2D.Dynamics.b2DebugDraw;

rocket88.CanvasRenderer = rocket88.Renderer.extend({

	init: function(target) {
		this._super("canvas.renderer", target);

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
		if(rocket88.director.debugMode) {

			this.backgroundColor = "#cccccc";

			var myDebugDraw = new b2DebugDraw();
			myDebugDraw.SetSprite(this._context);
			myDebugDraw.SetDrawScale(30);
			myDebugDraw.SetFillAlpha(1.0);
			myDebugDraw.SetLineThickness(1.0);
			myDebugDraw.SetFlags(b2DebugDraw.e_shapeBit|b2DebugDraw.e_jointBit);
			
			rocket88.director.scene.world.SetDebugDraw(myDebugDraw);		
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

		if(!rocket88.assetStore.hasAsset(sprite.url)) {
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

		var myImage = rocket88.assetStore.getAsset(sprite.url);
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