(function(rocket88) {
	"use strict";

	rocket88.AnimatedSprite = rocket88.Sprite.extends({

		init: function(url, spritesheet) {
			this._super(url, spritesheet);
			if(!spritesheet) {
				console.assert(!rocket88.showErrors, "Required argument 'spritesheet' is missing");
				return;
			}

			this._super(url, spritesheet);

			// Public properties
			this.loop = true;
			this.reverse = false;

			// Private properties
			this._framerate	= 60;
			this._accumulator = 60 / 60;
			this._tick = 0;

			this._currentAnimationName = undefined;
			this._currentAnimation = undefined;
			this._running = false;
			this._stopAtTheEndOfCurrentAnimation = false;
		},

			
		update: function() {
			this._super();

			var self = this;
			if(this._running && !!this._spritesheet) {

				this._tick++;
				if (this._tick>=this._accumulator) {
					this._tick = 0;

					if(this._reversed) {
						prevFrame();
					}
					else if(this._stopAtTheEndOfCurrentAnimation) {
						this.stop();
					}
					else {
						nextFrame();
					}

					this.showFrame(this._currentFrame.data);			
				}
			}


			function nextFrame() {
				if(self._currentFrame.next) {
					self._currentFrame = self._currentFrame.next;
				}
				else if(self._stopAtTheEndOfCurrentAnimation){
					self.stop();
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
			if(this._currentAnimationName==animation) {
				return this;
			}

			this._running = true;
			this._stopAtTheEndOfCurrentAnimation = false;
			this._currentAnimationName = animation;

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
			this._running = false;
			this._stopAtTheEndOfCurrentAnimation = false;

			if(this._currentAnimation) {
				this._currentFrame = this._currentAnimation.head;	
				this.showFrame(this._currentFrame.data);
			}

			this._currentAnimationName = undefined;
			this._currentAnimation = undefined;

			return this;
		},


		stopAtTheEndOfCurrentAnimation: function() {
			this._stopAtTheEndOfCurrentAnimation = true;
		},


		dispose: function() {
			this._super();
			delete this._currentAnimation;
		},


	    defineProperties: function() {
	        this._super();
	        
	        var myProperties = {
	        	currentAnimation: {
					enumerable: true, 
		            get: function() { return this._currentAnimation; } 
		        },

		        isRunning: {
					enumerable: true, 
		            get: function() { return this._isRunning; } 
		        },

		        framerate: {
					enumerable: true, 
		            get: function() { return this._framerate; },
		            set: function(framerate) {
						this._framerate = framerate;
						this._accumulator = 60 / framerate;	            	
		            }
		        },
		    };

		    Object.defineProperties(this, myProperties);
	    },
	});
})( use("rocket88") );