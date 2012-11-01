/**
 * @author patrickpietens
 *
 */
 
var Sprite = Class.extend({

	// inheritDoc
	init: function()
	{
		this._image 			= null;
		this._spritesheet 		= null;

		this._x 				= 0;
		this._y 				= 0;
		this._width				= 0;
		this._height			= 0;
		this._rotation			= 0;
		this._scaleX			= 1;
		this._scaleY			= 1;

		this._horizontalFlipped = false;
		this._verticalFlipped 	= false;
		this._tiled 			= false;

		this._originalSize		= new Size();
		this._bounds 			= new Rectangle();
		this._cropRect 			= new Rectangle();
		this._anchorPoint		= new Point(0.5, 0.5);
		this._transformMatrix	= new Matrix();
	},


	createWithImage: function(image)
	{
		if(!this._image && !this._spritesheet)
		{
			this._image 	= image;

			this._width		= this._image.width;
			this._height	= this._image.height;

			this._cropRect 	= new Rectangle(0, 0, this._width, this._height);
			this._originalSize = new Size(this._width, this._height);
		}
	},


	createWithSpritesheet: function(spritesheet)
	{
		if(!this._image && !this._spritesheet)
		{
			this._spritesheet = spritesheet;
			this._image = this._spritesheet.image();

			var myFrame = this._spritesheet.firstFrame();
			this._setFrame(myFrame);
		}
	},
	

	_setFrame: function(frame)
	{
		this._width = frame.size().width();
		this._height = frame.size().height();

		this._cropRect 	= frame.clone(); 
		this._originalSize = new Size(this._width, this._height);
	},

	
	update: function()
	{
		this._bounds.origin().x((-1 / this._scaleX) * this._anchorPoint.x() * this._width);
		this._bounds.origin().y((-1 / this._scaleY) * this._anchorPoint.y() * this._height);

		this._bounds.size().width(this._width);
		this._bounds.size().height(this._height);
	},


	showFrame: function(name)
	{
		if(this._spritesheet)
		{
			var myFrame = this._spritesheet.getFrame(name);
			this._cropRect = myFrame.clone();

			this._bounds = myFrame.clone();
			this._bounds.center();
		}
	},


	cropRect: function(value)
	{
		if(value)
		{
			this._cropRect = value;
			return this;
		}

		return this._cropRect;
	},


	x: function(value)
	{		
		if(value)
		{
			this._x = value;
			return this;
		}

		return this._x;
	},


	y: function(value)
	{
		if(value)
		{
			this._y = value;
			return this;
		}

		return this._y;
	},


	width: function(value)
	{		
		if(value)
		{
			this._width = value;
			if(!this._tiled)
			{
				this._scaleX = value / this._originalSize.width();
			}

			return this;
		}

		return this._width;
	},


	height: function(value)
	{
		if(value)
		{
			this._height = value;
			if(!this._tiled)
			{
				this._scaleY = value / this._originalSize.height();
			}

			return this;
		}

		return this._height;
	},


	rotate: function(degrees)
	{
		if(degrees)
		{
			this._rotation = degrees;
			return this;
		}

		return this._rotation;
	},


	scaleX: function(value)
	{
		if(value)
		{
			if(!this._tiled)
			{
				this._scaleX = value;
				this._width = this._originalSize.width() * value;	
			}
			
			return this;
		}

		return this._scaleX;
	},


	scaleY: function(value)
	{
		if(value)
		{
			if(!this._tiled)
			{
				this._scaleY = value;
				this._height = this._originalSize.height() * value;
			}

			return this;
		}

		return this._scaleY;
	},


	flipHorizontal: function(value)
	{
		if(value!=undefined)
		{
			this._horizontalFlipped = value;
			return this;
		}

		return this._horizontalFlipped;
	},

	
	flipVertical: function(value)
	{
		if(value!=undefined)
		{
			this._verticalFlipped = value;
			return this;
		}

		return this._verticalFlipped;
	},


	tile: function(value)
	{
		if(value!=undefined)
		{
			this._tiled = value;
			if(this._tiled)
			{
				this._scaleX = 1;
				this._scaleY = 1;
			}
			else
			{
				this._scaleX = this._width / this._originalSize.width();
				this._scaleY = this._height / this._originalSize.height();
			}

			return this;
		}

		return this._tiled;
	},


	image: function()
	{
		return this._image;
	},
	

	spritesheet: function()
	{
		return this._spritesheet;
	},


	anchorPoint: function(value)
	{
		if(value)
		{
			this._anchorPoint = value;
			return this;
		}

		return this._anchorPoint;
	},


	transformMatrix: function()
	{
		var myLeft 	= this._bounds.origin().x();
		var myTop	= this._bounds.origin().y();

		var myFlipX = this._horizontalFlipped ? -1 : 1;
		var myFlipY = this._verticalFlipped ? -1 : 1;

		return this._transformMatrix.
							identity().
							translate(this._x, this._y).
							rotate(this._rotation * (Math.PI/180)).
							scale(this._scaleX, this._scaleY).
							scale(myFlipX, myFlipY);
	},


	bounds: function()
	{
		return this._bounds;
	},
});