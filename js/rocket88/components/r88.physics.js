var b2Vec2 			= Box2D.Common.Math.b2Vec2;
var b2FixtureDef 	= Box2D.Dynamics.b2FixtureDef;
var b2PolygonShape 	= Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape 	= Box2D.Collision.Shapes.b2CircleShape
var b2Body 			= Box2D.Dynamics.b2Body;
var b2BodyDef 		= Box2D.Dynamics.b2BodyDef

var Physics = Component.extend({

	init: function() {
		this._super("physics");		

		// Private properties
		this._body 			= undefined;
		this._reusableVector= new b2Vec2();

		this._damping 		= 0.35;
		this._density 		= 1.0;
		this._friction 		= 0.5;
		this._restitution 	= 0.35;	

		this._fixedRotation = false;
		this._isLocked 		= false;
		this._isBullet 		= false;
		this._isKinematic 	= false;
		this._isStatic 		= false;
		this._isTrigger 	= false;

		this.__defineGetter__("body", function() { return this._body; });
	},

	createBody: function(shape) {
		if(!this.isReady) {
			console.assert(!Rocket88.showErrors, "Bodies can be created when the component isReady");
		}

		var myScale = 1 / 30;

		// Create fixture definition
    	var myFixture 		  = new b2FixtureDef();
		myFixture.userData 	  = this.gameobject;
		myFixture.shape 	  = shape;

		myFixture.density 	  = this._density;
		myFixture.friction 	  = this._friction;
		myFixture.restitution = this._restitution;
		myFixture.isSensor 	  = this._isTrigger;
		
		// Create body definition
		var myBody 			  = new b2BodyDef();
		myBody.userData 	  = this.gameobject;
		myBody.bullet 		  = false;
		myBody.fixedRotation  = this._fixedRotation;

		myBody.position.x 	  = this.gameobject.transform.position.x * myScale;
		myBody.position.y 	  = this.gameobject.transform.position.y * myScale;
		myBody.angle 		  = this.gameobject.transform.rotation;
		myBody.angularDamping = this._damping;
		myBody.linearDamping  = this._damping;

		// Set type
		myBody.type = b2Body.b2_dynamicBody;	
		if (this._isKinematic) {
			myBody.type = b2Body.b2_kinematicBody;
		} 
		else if(this._isStatic) {
			myBody.type = b2Body.b2_staticBody;	
		}		

		// Create body
		this._body = this.gameobject.layer.scene.world.CreateBody(myBody);
    	this._body.CreateFixture(myFixture);
	},

	setAsCircle: function(radius) {
		var myScale  = 1 / 30;
		
		var myRadius = radius * myScale;
		var myShape  = new b2CircleShape(radius * myScale);

		this.createBody(myShape);
	},

	setAsBox: function(size) {
		var myScale 	= 1 / 30;

     	var myWidth 	= size.width >> 1;
     	var myHeight 	= size.height >> 1;

       	var myShape 	= new b2PolygonShape();
       	myShape.SetAsBox(myWidth * myScale, myHeight * myScale);

		this.createBody(myShape);
	},

	applyForce: function(x, y) {
		if (this.isReady) {
			this._reusableVector.x = x;
			this._reusableVector.y = y;

			this._body.ApplyForce(this._reusableVector, this._body.GetPosition());
		}
	},

	applyImpulse: function(x, y) {
		if (this.isReady) {
			this._reusableVector.x = x;
			this._reusableVector.y = y;

			this._body.ApplyImpulse(this._reusableVector, this._body.GetPosition());
		}
	},

	applyTorque: function(torque) {
		if (this.isReady) {
			this._body.ApplyTorque(torque);
		}
	},
});