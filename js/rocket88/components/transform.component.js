(function(rocket88) {
	"use strict";

	rocket88.TransformComponent = rocket88.Component.extends({
		init: function(name) {
			this._super(name || "transform.component");		

			this._scale	= 1.0;
			this._flippedX = false;
			this._flippedY = false;
			this._position = new rocket88.Point();
			this._rotation = new rocket88.Rotation();	
			this._matrix = new rocket88.Matrix();
			this._changed = true;

			this.scaleX	= 0;
			this.scaleY	= 0;
			this.snapToPixels = true;
		},


		update: function() {
			this._super();
			this._changed = false;
		},


		flipX: function(direction) {
			this._flippedX = !this._flippedX;
			this._changed = true;

			if(!!direction) {
				this._flippedX = direction;
			}

			return this;
		},


		flipY: function(direction) {
			this._flippedY = !this._flippedY;
			this._changed = true;

			if(!!direction) {
				this._flippedY = direction;
			}

			return this;
		},


		dispose: function() {
			this._super();

			delete this._scale;
			delete this._flippedX;
			delete this._flippedY;
			delete this._position;
			delete this._rotation;
			delete this._matrix;
			
			delete this.origin;
			delete this.scaleX;
			delete this.scaleY;
		},


	    defineProperties: function() {
	    	this._super();

			Object.defineProperties(this, {
				changed: {
					enumerable: true, 
					get: function() { return this._changed; }
				},
				
				position: {
					enumerable: true, 
					get: function() { return this._position; }
				},
				
				rotation: {
					enumerable: true, 
					get: function() { return this._rotation; }
				},

				degrees: {
					enumerable: true, 
					get: function() { return this._rotation.degrees; },
					set: function(degrees) { 
						this._changed = this._changed || this._rotation.degrees != degrees;
						this._rotation.degrees = degrees;		
					}
				},

				radians: {
					enumerable: true, 
					get: function() { return this._rotation.radians; },
					set: function(radians) { 
						this._changed = this._changed || this._rotation.radians != radians;
						this._rotation.radians = radians;
					}
				},

				x: {
					enumerable: true, 
					get: function() { 
						return this.snapToPixels ? (0.5 + this._matrix.tx) | 0 : this._matrix.tx;
					},
					set: function(x) { 
						this._changed = this._changed || this._position.x != x;
						this._position.x = x;
					}
				},

				y: {
					enumerable: true, 
					get: function() { 
						return this.snapToPixels ? (0.5 + this._matrix.ty) | 0 : this._matrix.ty;
					},
					set: function(y) { 
						this._changed = this._changed || this._position.y != y;
						this._position.y = y;
					}
				},

				scale: {
					enumerable: true, 
					get: function() { return this._scale; },
					set: function(scale) { 
						this._changed = this._changed || this._scale != scale;
						this._scale = scale;

						this.scaleX = scale;
						this.scaleY = scale;
					}
				},

				matrix: {
					enumerable: true, 
					get: function() { 
						var myFlipX = this._flippedX ? -1 : 1,
							myFlipY = this._flippedY ? -1 : 1;

						this._matrix.identity();

						this._matrix.translate(this._position.x, this._position.y);
						this._matrix.rotate(this._rotation.radians);
						this._matrix.scale(this.scaleX, this.scaleY);
						this._matrix.scale(myFlipX, myFlipY);
						
						return this._matrix;
					}
				},
			});
		}
	});
})( use("rocket88") );