/**
 * @author patrickpietens
 *
 */
 
var AnimatedSprite = Sprite.extend({

	// inheritDoc
	init: function()
	{
		this._super();

		this._currentAnimation	= null;
		this._currentFrame		= null;

		this._isRunning			= false;
		this._reversed 			= false;
		this._loop 				= true;
	},
	
	
	update: function()
	{
		if(this._isRunning && this._spritesheet)
		{
			if(this._reversed)
			{
				this._previousFrame();
			}
			else
			{
				this._nextFrame();
			}

			this._setFrame(this._currentFrame.userData);			
		}

		this._super();
	},


	_nextFrame: function()
	{
		if(this._currentFrame.next)
		{
			this._currentFrame = this._currentFrame.next;
		}
		else if(this._loop)
		{
			this._currentFrame = this._currentAnimation.head();	
		}
	},


	_previousFrame: function()
	{
		if(this._currentFrame.prev)
		{
			this._currentFrame = this._currentFrame.prev;
		}
		else if(this._loop)
		{
			this._currentFrame = this._currentAnimation.tail();	
		}
	},


	play: function(animation)
	{
		this._isRunning = true;

		this._currentAnimation 	= this._spritesheet.getAnimation(animation);
		if(this._reversed)
		{
			this._currentFrame	= this._currentAnimation.tail();	
		}
		else
		{
			this._currentFrame	= this._currentAnimation.head();
		}

		this._setFrame(this._currentFrame.userData);

		return this;
	},


	stop: function()
	{
		this._isRunning	= false;
		return this;
	},
	

	isRunning: function()
	{
		return this._isRunning;
	},


	loop: function(value)
	{
		if(value!=undefined)
		{
			this._loop = value;
			return this;
		}

		return this._loop;
	},


	reverse: function(value)
	{
		if(value!=undefined)
		{
			this._reversed = value;
			return this;
		}

		return this._reversed;
	}
});