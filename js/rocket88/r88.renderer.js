var Renderer = Class.extend({
	init: function(target) {
		if(!target) {
			throw ReferenceError("Required parameter 'target' is missing");
		}

		// Private properties
		this._target 			= target;
		this._transformMatrix 	= new Matrix();
		this._cameraMatrix 	  	= new Matrix();

		this._camera			= undefined;
		this._renderedGameObject= undefined;
		this._renderedLayer		= undefined;

		// Public properties
		this.backgroundColor 	= undefined;

		// Getters
		this.__defineGetter__("target", function() { return this._target; });
		this.__defineGetter__("transformMatrix", function() { return this._transformMatrix; });
		this.__defineGetter__("type", function() { return "renderer"; });		

		// Setters
		this.__defineSetter__("camera", function(camera) { 

			this._camera = camera;
			this._cameraMatrix = camera.transform.matrix.clone();

        	this._cameraMatrix.tx 	*= -1;
    	    this._cameraMatrix.ty 	*= -1;
		});

		this.__defineSetter__("renderedLayer", function(layer) {
			this._renderedLayer = layer;
			/*if (layer.depth!=0.0) {
				var myFocalLength = myCamera.focalLength();
				this._transform.scale = myFocalLength / (myFocalLength + this._depth);

				this._transform.x *= myScale;
				this._transform.y *= myScale;
			}*/
		});

		this.__defineSetter__("renderedGameObject", function(gameobject) {
			this._renderedGameObject = gameobject;
		});
	},

	ready: function() {
	},

	prepare: function() {
	},

	draw: function(sprite) {		
		this.calculateTransformation(sprite);
	},

	finish: function() {
	},

	calculateTransformation: function (sprite) {

		// Calculate the transform matrix
		this._transformMatrix.identity();
		
		// Add layer transformation
		this._transformMatrix.multiply(this._cameraMatrix);

		// Add game transformation
		this._transformMatrix.multiply(this._renderedGameObject.transform.matrix);

		// Add sprite transformation
		this._transformMatrix.multiply(sprite.transform.matrix);

		return this._transformMatrix;
	},

	dispose: function() {
		this._super();

		this._cameraMatrix = null;
		this._origin = null;
		this._target = null;
		this._transformMatrix = null;
	}
});