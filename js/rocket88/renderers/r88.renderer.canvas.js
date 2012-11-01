var CanvasRenderer = Class.extend({

	// inheritDoc
	init: function(canvas)
	{
		this._backgroundColor = null;
		this._transformMatrix = new Matrix();

		this._canvas = canvas;
		this._context = canvas.getContext("2d");
	},
	
	
	// Clears the canvas
	clear: function()
	{
		var myCanvas = this._canvas;
		var myContext = this._context;
		var myColor = this._backgroundColor;

        // Set the backgroundColor
		if (myColor!=null)
		{
			myContext.fillStyle = myColor;
			myContext.fillRect(0, 0, myCanvas.width, myCanvas.height);
		}
		else
		{
			myContext.clearRect(0, 0, myCanvas.width, myCanvas.height);
		}
	},
	
	
	// Draws a sprite to the renderer
	drawSprite: function(sprite, gameObject)
	{
		// Get the context of the canvas
		var myContext = this._context;

		// Store the current transformation matrix of the canvas its context
		myContext.save();		

		var myWorld = gameObject.world();
        var myLayer = gameObject.layer();
        var myScene = myLayer.scene();
        var myCamera = myScene.camera();

		// Calculate the transform matrix
		this._transformMatrix.
			// Reset 
			identity().

			// Set origin of the game world to its center
			translate(myWorld.origin().x(), myWorld.origin().y()).

			// Add layer transformation
			multiply(myLayer.transformMatrix()).

			// Add game transformation
			multiply(gameObject.transform().transformMatrix()).

			// Add sprite tansformation
			multiply(sprite.transformMatrix());

		// Transform canvas context
		myContext.transform(
	        this._transformMatrix.a(),
	        this._transformMatrix.b(),
	        this._transformMatrix.c(),
	        this._transformMatrix.d(),
	        this._transformMatrix.tx(),
	        this._transformMatrix.ty()
		);

 		// Draw sprite to canvas
 		var myCropRect 	= sprite.cropRect();
 		var myBounds	= sprite.bounds();

		if(!sprite.tile())
		{
			myContext.drawImage(
				sprite.image(), 		
			
				// Source
				myCropRect.origin().x(), myCropRect.origin().y(), 
				myCropRect.size().width(), myCropRect.size().height(),

				// Destination
				myBounds.origin().x(), myBounds.origin().y(), 
				myCropRect.size().width(), myCropRect.size().height()
			);
		}

		// Tile sprite
		else
		{
 			myContext.fillStyle = myContext.createPattern(sprite.image(), "repeat");
    		myContext.fillRect(
    			myBounds.origin().x(), myBounds.origin().y(),
    			myBounds.size().width(), myBounds.size().height()
    		);			
		}

		// Restore the context to its original state
    	myContext.restore();
	},
	
	
	// Renders the canvas after all sprite are drawn
	render: function()
	{
	},
	
	
	// Sets the backgroundcolor of the canvas
	backgroundColor: function(value)
	{
		if(value)
		{
			this._backgroundColor = value;
		}

		return this._backgroundColor;
	},
});