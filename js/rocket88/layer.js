(function(rocket88) {
	"use strict";

	rocket88.Layer = rocket88.ObjectContainer.extends({
		init: function(name) {	
			this._super(name);
			
			this._type = "layer";
			this._transform = new rocket88.TransformComponent()

			this._collisionSolver = new rocket88.CollisionSolver();
			this._collisionSolver.layer = this;

			this.depth = 0;
		},


		ready: function() {
			this._super();
			this._collisionSolver.ready();
		},


		update: function() {
	        this.calculateTransform();
	        this._collisionSolver.update();

			var myNode = this._children.head;
			while (myNode) {

				var myGameObject = myNode.data;
				myGameObject.update();
				myGameObject.draw();

				myNode = myNode.next;
			}
		},


		calculateTransform: function() {
			var myCamera = this.scene.camera;

			this._transform.x = -1 * myCamera.transform.x * myCamera.zoom;
			this._transform.y = -1 * myCamera.transform.y * myCamera.zoom;
			this._transform.scale = myCamera.zoom;			

			if (this.depth!=0) {
				var myFocalLength = myCamera.focalLength,
					myScale = myFocalLength / (myFocalLength + this.depth);

				this._transform.x *= myScale;
				this._transform.y *= myScale;
			}
		},


		dispose: function() {
			this._super();	
			delete this._collisionSolver;
		},


		defineProperties: function() {
			this._super();

			var myProperties = {
				scene: {
					enumerable: true, 
					get: function() { return this.parent; }
				},
				
				collisionSolver: {
					enumerable: true, 
					get: function() { return this._collisionSolver; },
					set: function(camera) {
						if(!!this._collisionSolver && this._collisionSolver.autoDispose) {
							this._collisionSolver.dispose();
						}

						this._collisionSolver = collisionSolver;
					}
				},

		    	transform: {
					enumerable: true, 
		    		get: function() { return this._transform; } 
		    	},				
			};

			Object.defineProperties(this, myProperties);
		},
	});
})( use("rocket88") );