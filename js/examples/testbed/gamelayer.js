var GameLayer = rocket88.Layer.extend({
	ready: function() {
		this._super();

		this.player = this.addGameObject(new Player());
		this.ground = this.addGameObject(new rocket88.PhysicsObject("ground"));		

		this.ground.group = 2;
		this.ground.collisions.disable();
		this.ground.physics.addBox(new rocket88.Size(2000, 10));
		this.ground.physics.isStatic = true;
		this.ground.transform.x = 1000;
		this.ground.transform.y = 300;
	},
});