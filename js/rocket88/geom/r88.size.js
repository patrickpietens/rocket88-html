var Size = Class.extend({

	init: function(width, height)
	{
		this._width = width || 0;
		this._height = height || 0;
	},
	
	
	width: function(value)
	{
		if(value)
		{
			this._width = value;
			return this;
		}
		
		return this._width;
	},
	
	
	height: function(value)
	{
		if(value)
		{
			this._height = value;
			return this;			
		}
		
		return this._height;
	},


	clone: function()
	{
		return new Size(this._width, this._height);
	},


	toString: function()
	{
		return "[Size width=" + this._width + " height=" + this._height + "]";
	}		
});