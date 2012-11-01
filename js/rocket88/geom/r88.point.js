var Point = Class.extend({

	init: function(x, y)
	{
		
		this._x = x || 0;
		this._y = y || 0;
	},
	

	add: function(point)
	{
		this._x += point.x();
		this._y += point.y();
	},


	substract: function(point)
	{
		this._x -= point.x();
		this._y -= point.y();
	},


	multiply: function(value)
	{
		this._x *= value;
		this._y *= value;
	},


	distanceTo: function(point)
	{
		var myX = point.x() - this._x;
		var myY = point.y() - this._y;

		return Math.sqrt((myX * myX) + (myY * myY));
	},


	direction: function()
	{
		var myX = point.x() - this._x;
		var myY = point.y() - this._y;

   		return Math.atan2(myY, myX);
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


	clone: function()
	{
		return new Point(this._x, this._y);
	},


	toString: function()
	{
		return "[Point x=" + this._x + " y=" + this._y + "]";
	}	
});