var b2Vec2 			= Box2D.Common.Math.b2Vec2,
	b2FixtureDef 	= Box2D.Dynamics.b2FixtureDef,
	b2PolygonShape 	= Box2D.Collision.Shapes.b2PolygonShape,
	b2CircleShape 	= Box2D.Collision.Shapes.b2CircleShape,
	b2Body 			= Box2D.Dynamics.b2Body,
	b2BodyDef 		= Box2D.Dynamics.b2BodyDef;

var PhysicsComponent = Component.extend({

	init: function() {
		this._super("physics");		

		// Private properties
		this._body 			= undefined;
		this._reusableVector= new b2Vec2();

		this._damping 		= 0.35;
		this._density 		= 1.0;
		this._friction 		= 0.5;
		this._restitution 	= 0.35;	

		// Public properties
		this.isPlatform		= false;

		// Getters/setters
		this.__defineGetter__("body", function() { return this._body; });

		this.__defineGetter__("isStatic", function() { return this.body.GetType()==b2Body.b2_staticBody; });
		this.__defineSetter__("isStatic", function(isStatic) { 
			this.setType(isStatic ? "static" : "dynamic");
		});

		this.__defineGetter__("isKinematic", function() { return this.body.GetType()==b2Body.b2_kinematicBody; });
		this.__defineSetter__("isKinematic", function(isKinematic) { 
			this.setType(isKinematic ? "kinematic" : "dynamic");
		});

		this.__defineGetter__("isBullet", function() { return this.body.IsBullet(); });
		this.__defineSetter__("isBullet", function(isBullet) { 
			this.SetBullet(isBullet);
		});

		this.__defineGetter__("isFixedRotation", function() { return this.body.IsFixedRotation(); });
		this.__defineSetter__("isFixedRotation", function(isFixedRotation) { 
			this.SetFixedRotation(isFixedRotation);
		});

		this.__defineGetter__("isTrigger", function() { return this.body.GetFixtureList().IsSensor(); });
		this.__defineSetter__("isTrigger", function(isTrigger) { 
			this._body.GetFixtureList().SetSensor(isTrigger);
		});
	},

	ready: function() {
		this._super();
	
		// Create body definition
		var myBody 			  = new b2BodyDef();
		myBody.userData 	  = this.gameobject;
		myBody.bullet 		  = false;
		myBody.fixedRotation  = false;

		var myScale = 1 / 30;
		myBody.position.x 	  = this.gameobject.transform.position.x * myScale;
		myBody.position.y 	  = this.gameobject.transform.position.y * myScale;
		myBody.angle 		  = this.gameobject.transform.rotation.radians;

		myBody.angularDamping = this._damping;
		myBody.linearDamping  = this._damping;
		myBody.type 		  = b2Body.b2_dynamicBody;	

		// Create body
		this._body = this.director.scene.world.CreateBody(myBody);
	},

	addCircle: function(radius) {
		var myScale  = 1 / 30,
			myRadius = radius * myScale,
			myShape  = new b2CircleShape(radius * myScale);

		this.createFixture(myShape);
	},

	addBox: function(size) {
		var myScale 	= 1 / 30,
     		myWidth 	= size.width >> 1,
     		myHeight 	= size.height >> 1,
       		myShape = new b2PolygonShape();

       	myShape.SetAsBox(myWidth * myScale, myHeight * myScale);
		this.createFixture(myShape);
	},

	addPolygon: function() {
	},

	createFixture: function(shape) {
    	var myFixture 		  = new b2FixtureDef();
		myFixture.userData 	  = this.gameobject;
		myFixture.shape 	  = shape;

		myFixture.density 	  = this._density;
		myFixture.friction 	  = this._friction;
		myFixture.restitution = this._restitution;
		myFixture.isSensor 	  = this._isTrigger;

    	this._body.CreateFixture(myFixture);
	},	

	setType: function(type) {
		var myIsKinematic 	= type=="kinematic",
			myIsStatic 		= type=="static";

		this._body.SetType(b2Body.b2_dynamicBody);
		if (myIsKinematic) {
			this._body.SetType(b2Body.b2_kinematicBody);
		} 
		else if(myIsStatic) {
			this._body.SetType(b2Body.b2_staticBody);	
		}		
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