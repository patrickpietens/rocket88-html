 var CollisionComponent = Component.extend({

	init: function() {
		this._super("collision");
		this._contacts = {};
	},

	beginContact: function(gameobject) {
		this._contacts[gameobject.name] = gameobject; 
	},

	endContact: function(gameobject) {
		delete this._contacts[gameobject.name];
	},

	onCollision: function(gameobject, position, impact) {
	},

	hasContact: function(name) {
		return this._contacts[name]!=undefined;
	},

	dispose: function() {
		this._super();
		this._contacts = null;
	}
});