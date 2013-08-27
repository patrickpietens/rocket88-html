(function(rocket88) {
	"use strict";

	rocket88.CollisionSolver = rocket88.Object.extends({
		init: function(name) {	
			this._super(name || "collision.solver");
			this._cameraMatrix = new rocket88.Matrix();
		},


		update: function() {
			this._super();

			var myCamera = this.layer.scene.camera,
				myMatrix = myCamera.transform.matrix;

			this._cameraMatrix.identity();
			this._cameraMatrix.multiply(myMatrix);
			this._cameraMatrix.inverse();
		},


		addObject: function(gameobject) {
			var myMatrix = gameobject.transform.matrix;
			myMatrix.multiply(this._cameraMatrix);
		},


		test: function(gameobject) {
		},


		raycast: function(gameobject) {

		},
		

		testBoxBox: function(boxA, boxB) {
		},


		testBoxPoint: function(box, point) {
		},


		textCirclePoint: function(circle, point) {
		},


		testBoxCircle: function(box, circle) {
		},


		dispose: function() {
			this._super();

			delete this._camera;
		}
	});
})( use("rocket88") );