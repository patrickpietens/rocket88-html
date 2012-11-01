var Rectangle = Class.extend({

	// inheritDoc
	init: function(x, y, width, height)
	{
		this._origin 	= new Point(x, y);
		this._size 		= new Size(width, height);
	},
	
	
	center: function()
	{
		this._origin.x(-0.5 * this._size.width());
		this._origin.y(-0.5 * this._size.height());		
	},


	contains: function(point)
	{
		var myHorizontal = point.x() > this.left() && point.x() < this.right();
		var myVertical	 = point.y() > this.top() && point.y() < this.bottom();

		return myHorizontal && myVertical;
	},


	inflate: function(size)
	{
		this._origin.x(this._origin.x() - size.width());
		this._size.width(this._size.width() + size.width() * 2);

		this._origin.y(this._origin.y() - size.height());
		this._size.height(this._size.height() + size.height() * 2);
	},


	deflate: function(size)
	{
		this._origin.x(this._origin.x() + size.width());
		this._size.width(this._size.width() - size.width() * 2);

		this._origin.y(this._origin.y() + size.height());
		this._size.height(this._size.height() - size.height() * 2);
	},


	origin: function()
	{
		return this._origin;
	},


	size: function()
	{
		return this._size;
	},
	
	
	// The y coordinate of the top-left corner of the rectangle
	top: function()
	{
		return this._origin.y();
	},


	// The x coordinate of the top-left corner of the rectangle
	left: function()
	{
		return this._origin.x();
	},


	// The sum of the x and width properties
	right: function()
	{
		return this._origin.x() + this._size.width();
	},


	// The sum of the y and height properties
	bottom: function()
	{
		return this._origin.y() + this._size.height();
	},	


	clone: function()
	{
		return new Rectangle(this._origin.x(), this._origin.y(), this._size.width(), this._size.height());
	},


	toString: function()
	{
		return "[Rectangle x=" + this._origin.x() + " y=" + this._origin.y() + " width=" + this._size.width() + " height=" + this._size.height() + "]";
	}		
});