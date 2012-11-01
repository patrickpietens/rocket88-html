/**
 * @author patrickpietens
 *
 */
 
var Spritesheet = Class.extend({

	// inheritDoc
	init: function()
	{
		this._data = null;
		this._image	= null;
		this._firstFrame = null;

		this._animations = new Array()
		this._frames = new Object();
	},


	createWithImageAndData: function(image, data)
	{
		this._image = image;
		this._data = data;
		
		this._parseData();
	},


	_parseData: function()
	{
		for (var name in this._data.frames)		
		{
			var myFrame = this._data.frames[name].frame;

			var myRect = new Rectangle(myFrame.x, myFrame.y, myFrame.w, myFrame.h);
			this._addFrame(name, myRect);
		}
	},


	_addFrame: function(name, frame)
	{
		// Add frame
		this._frames[name] = frame;
		if(!this._firstFrame)
		{
			this._firstFrame = frame;
		}

		// Add animation
		var myRegExp = /(-|_)*(\d+)(\.[a-zA-Z]{3,4})$/;
		var myName = name.replace(myRegExp, "");

		if(!this._animations[myName])
		{
			this._animations[myName] = new LinkedList();
		}

		this._animations[myName].add(frame);
	},


	hasAnimation: function(name)
	{
		return this._animations[name] != null;
	},


	animations: function()
	{
		var myNames = new Array();
		for (var name in this._animations)
		{
			myNames.push(name);
		}

		return myNames;
	},


	getAnimation: function(name)
	{
		return this._animations[name];
	},


	frames: function()
	{
		return this._frames;
	},


	getFrame: function(name)
	{
		return this._frames[name];
	},


	firstFrame: function()
	{
		return this._firstFrame;
	},


	image: function()
	{
		return this._image;
	},


	data: function()
	{
		return this._data;
	}
});