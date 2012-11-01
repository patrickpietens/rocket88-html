/**
 * @author patrickpietens
 *
 */
 
var TransformExtension = Extension.extend({

	init: function()
	{
		this._super("transform");		

		this._x 				= 0;
		this._y 				= 0;
		this._rotation			= 0;
		this._scaleX			= 0;
		this._scaleY			= 0;		

		this._transformMatrix	= new Matrix();
	},
	
	
	update: function()
	{
		this._super();			
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


	rotation: function(degrees)
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
			this._scaleX = value;
			return this;
		}

		return this._scaleX;
	},


	scaleY: function(value)
	{
		if(value)
		{
			this._scaleY = value;
			return this;
		}

		return this._scaleY;
	},


	transformMatrix: function()
	{
		return this._transformMatrix.
							identity().
							translate(this._x, this._y).
							rotate(this._rotation * (Math.PI/180)).
							scale(this._scaleX, this._scaleY);
	}
});