var b2ContactListener = Box2D.Dynamics.b2ContactListener,
	b2WorldManifold = Box2D.Collision.b2WorldManifold;

var CollisionSolver = Class.extend({ 
	init: function() {

		this._collisions = null;
		this._listener = new b2ContactListener();

		this._listener.BeginContact = delegate(this, this.beginContact);
		this._listener.PreSolve = delegate(this, this.preSolve);
		this._listener.PostSolve = delegate(this, this.postSolve);

		this.__defineGetter__("listener", function() { return this._listener; });
	},

	prepare: function() {
		this._collisions = new Object();
	},

	beginContact: function(contact) {
		var myName = this.getContactName(contact),
			myCollision = this._collisions[myName];

		if(myCollision==undefined) {
			var myGameObjectA = contact.GetFixtureA().GetUserData(),
				myGameObjectB = contact.GetFixtureB().GetUserData();

			myCollision = [myGameObjectA, myGameObjectB];;
			this._collisions[myName] = myCollision;
		}
	},
	
	preSolve: function(contact, manifold) {
		var myName = this.getContactName(contact),
			myCollision = this._collisions[myName];
		
		if(myCollision) {
			var manifold = new b2WorldManifold();
			contact.GetWorldManifold(manifold);

			var myPosition = manifold.m_points[0];
			myCollision.position = new Point(myPosition.x * 30, myPosition.y * 30);
		}		
	},

	postSolve: function(contact, impulse) {
		var myName = this.getContactName(contact),
			myCollision = this._collisions[myName];
		
		if(myCollision) {
			myCollision.impact = impulse.normalImpulses[0];
		}		
	},

	finish: function() {
		for(var name in this._collisions) {
			var myCollision = this._collisions[name],
				myGameObjectA = myCollision[0],
				myGameObjectB = myCollision[1];

			if(myGameObjectA.collision.enabled) {
				myGameObjectA.collision.onCollision(myGameObjectB, myCollision.position, myCollision.impact);
			}

			if(myGameObjectB.collision.enabled) {
				myGameObjectB.collision.onCollision(myGameObjectA, myCollision.position, myCollision.impact);
			}			
		}

		this._collisions = null;
	},

	getContactName: function(contact) {
		var myGameObjectA = contact.GetFixtureA().GetUserData(),
			myGameObjectB = contact.GetFixtureB().GetUserData();

		return myGameObjectA.name + ".vs." + myGameObjectB.name;
	},

	dispose: function() {
		this._collisions = null;
		this._listener = null;
	}
});