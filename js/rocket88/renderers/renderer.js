(function(rocket88) {
	"use strict";

	rocket88.Renderer = rocket88.Object.extends({
		init: function(name, target) {
			this._super(name);

			if(!target) {
				throw ReferenceError("Required parameter 'target' is missing");
			}

			this._type = "renderer";
			this._target = target;
			this._buffer = new rocket88.LinkedList();
		},


		prerender: function() {
			this._buffer.empty();
			return this;
		},


		bufferObject: function(gameobject) {
			var myBounds = rocket88.director.stage.bounds,
				myPaintRect = gameobject.screen.paintRect;

			// Check if the gameobject needs to be rendered
			if(gameobject.screen.visible && myPaintRect.intersects(myBounds)) {
				this._buffer.add(gameobject);
			}

			return this;
		},


		render: function() {
			var myNode = this._buffer.head;
			while (myNode) {
				this.drawObject(myNode.data);
				myNode = myNode.next;
			}	

			return this;		
		},


		drawObject: function(gameobject) {
			return this;
		},


		dispose: function() {
			this._super();

			delete this._origin;
			delete this._target;
			delete this._buffer;
		},


	    defineProperties: function() {
	    	this._super();
	    	
	    	var myProperties = {
	    		target: {
					enumerable: true, 
	    			get: function() { return this._target; } 
	    		},

	    		transformMatrix: {
					enumerable: true, 
	    			get: function() { return this._transformMatrix; } 
	    		}
	    	};

	    	Object.defineProperties(this, myProperties);
		},
	});
})( use("rocket88") );