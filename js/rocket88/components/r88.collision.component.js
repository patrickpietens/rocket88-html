 var CollisionComponent = Component.extend({

	init: function() {
		this._super("collision");

		this._contacts = "";
		this._groups = "";
	},

	beginContact: function(gameobject) {
		this._contacts += "|" + gameobject.name; 
		if(gameobject.group) {
			this._groups += "|" + gameobject.group;
		}
	},

	endContact: function(gameobject) {
		this._contacts = this._contacts.replace("|" + gameobject.name, ""); 
		if(gameobject.group) {
			this._groups = this._groups.replace("|" + gameobject.group, ""); 
		}
	},

	onCollision: function(gameobject, position, impact) {
	},

	touches: function(name) {
		return this._contacts.indexOf(name) > -1;
	},

	touchesGroup: function(name) {
		return this._groups.indexOf(name) > -1;
	},

	dispose: function() {
		this._super();
		this._contacts = null;
	}
});