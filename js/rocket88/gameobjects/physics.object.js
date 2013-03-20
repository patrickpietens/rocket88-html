rocket88.PhysicsObject = rocket88.GameObject.extend({
	
	init: function(name) {
		this._super(name);

		// Private properties
		this._reusableVector = new b2Vec2();

		this._physics = new rocket88.PhysicsComponent();
		this._physics.gameobject = this;

		this._collisions = new rocket88.CollisionComponent();
		this._collisions.gameobject = this;

		this._joints = new rocket88.JointsComponent();
		this._joints.gameobject = this;

		// Getters
		this.__defineGetter__("physics", function() { return this._physics; });	
		this.__defineGetter__("collisions", function() { return this._collisions; });	
		this.__defineGetter__("joints", function() { return this._joints; });	

		// Handlers
		this.transform.onTransform = delegate(this, this.onTransform);
		this.collisions.onCollision = delegate(this, this.onCollision);
	},

	ready: function() {
		this._super();

		this._physics.ready();
		this._collisions.ready();		
	},

	update: function() {
		this._super();

		var myPosition = this._physics.body.GetPosition();
		this._transform.position.x = myPosition.x * 30;
		this._transform.position.y = myPosition.y * 30;			

		this._transform.rotation.radians = this._physics.body.GetAngle();
	},

	onTransform: function(property, newValue, oldValue) {
		var myScale = 1 / 30;

		this._reusableVector.x = this.transform.position.x * myScale;
		this._reusableVector.y = this.transform.position.y * myScale;

		var myRotation = this.transform.rotation.radians;
		this._physics.body.SetPositionAndAngle(this._reusableVector, myRotation); 
	},

	onCollision: function(gameobject, position, impact) {
	},

	dispose: function() {
		this._super();

		this._physics.dispose();
		this._collisions.dispose();

		this._physics = null;
		this._collisions = null;
	}
});