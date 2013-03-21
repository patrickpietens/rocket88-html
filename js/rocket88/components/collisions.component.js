rocket88.CollisionComponent = rocket88.Component.extend({

	init: function() {
		this._super("collision.component");

		this._contacts = "";
		this._groups = 0;
	},

	beginContact: function(gameobject) {
		this._contacts += "|" + gameobject.name; 
		this._groups |= gameobject.group;
	},

	endContact: function(gameobject) {
		this._contacts = this._contacts.replace("|" + gameobject.name, ""); 
		this._groups &= ~gameobject.group;
	},

	onCollision: function(gameobject, position, impact) {
	},

	touches: function(name) {
		return this._contacts.indexOf(name) > -1;
	},

	touchesGroup: function(group) {
		return this._groups & group;
	},

	dispose: function() {
		this._super();
		this._contacts = null;
	}
});