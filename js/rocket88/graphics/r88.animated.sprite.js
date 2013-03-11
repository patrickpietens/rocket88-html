/**
 * @author patrickpietens
 *
 */
 
var AnimatedSprite = Sprite.extend({

	// inheritDoc
	init: function(url, spritesheet)
	{
		this._super(url, spritesheet);

		if(!spritesheet) {
			console.assert(!Rocket88.showErrors, "Required argument 'spritesheet' is missing");
			return;
		}

		this._super(url, spritesheet);

		// Private properties
		this._currentAnimation	= undefined;
		this._running			= false;

		// Public properties
		this.loop 				= true;
		this.reverse 			= false;

		// Getters
		this.__defineGetter__("currentAnimation", function() { return this._currentAnimation; });
		this.__defineGetter__("isRunning", function() { return this._running; });
	},
		
	update: function() {
		this._super();

		var self = this;

		if(this._running && this._spritesheet) {
			if(this._reversed) {
				prevFrame();
			}
			else {
				nextFrame();
			}

			this.showFrame(this._currentFrame.data);			
		}

		function nextFrame() {
			if(self._currentFrame.next) {
				self._currentFrame = self._currentFrame.next;
			}
			else if(self.loop) {
				self._currentFrame = self._currentAnimation.head;	
			}
		}

		function prevFrame() {
			if(self._currentFrame.prev) {
				self._currentFrame = self._currentFrame.prev;
			}
			else if(self.loop) {
				self._currentFrame = self._currentAnimation.tail;	
			}
		}	
	},

	play: function(animation) {
		this._running = true;

		this._currentAnimation 	= this.spritesheet.animationByName(animation);		
		if(this._reversed) {
			this._currentFrame	= this._currentAnimation.tail;	
		}
		else {
			this._currentFrame	= this._currentAnimation.head;
		}

		this.showFrame(this._currentFrame.data);

		return this;
	},

	stop: function() {
		this._running	= false;
		return this;
	},

	dispose: function() {
		this._super();

		this._currentAnimation = null;
	}
});