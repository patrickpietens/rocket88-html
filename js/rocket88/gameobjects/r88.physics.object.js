var PhysicsObject = GameObject.extend({
	init: function(name) {
		this._super(name);

		// Private properties
		this._reusableVector = new b2Vec2();

		this._physics = new PhysicsComponent();
		this._physics.gameobject = this;

		this._collision = new CollisionComponent();
		this._collision.gameobject = this;

		// Getters
		this.__defineGetter__("physics", function() { return this._physics; });	
		this.__defineGetter__("collision", function() { return this._collision; });	

		// Handlers
		this.transform.onTransform = delegate(this, this.onTransform);
	},

	ready: function() {
		this._super();

		this._physics.ready();
		this._collision.ready();		
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
	}
});