var GameLayer = Layer.extend({
	ready: function() {
		this._super();

		this._player = this.addGameObject(new Player());
		this._ground = this.addGameObject(new PhysicsObject("ground"));
		
		this._ground.physics.addBox(new Size(500, 10));
		this._ground.physics.isStatic = true;

		this._ground.transform.x = 250;
		this._ground.transform.y = 200;

		this._ground.collision.disable();
	},
});