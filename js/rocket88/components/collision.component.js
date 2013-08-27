(function(rocket88) {
	"use strict";

	rocket88.CollisionComponent = rocket88.Component.extends({
		init: function(name) {
			this._super(name || "collision.component");
		},


		ready: function() {
			this._super();
			
			this._gameobject = this.parent;
			this._collisionSolver = this._gameobject.layer.collisionSolver;
		},


		update: function() {
			this._super();
			this._collisionSolver.addObject(this._gameobject);
		},


		test: function() {
		},


		raycast: function() {
		},


		dispose: function() {
			this._super();

			delete this._gameobject;
			delete this._collisionSolver;
		}
	});
})( use("rocket88") );
