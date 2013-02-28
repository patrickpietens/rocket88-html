var GameLayer = Layer.extend({
	ready: function() {
		this._super();

		var myPlayer = new Player();
		this.addGameObject(myPlayer);
	},
});