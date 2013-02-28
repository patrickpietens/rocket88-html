var Level1 = Scene.extend({
	ready: function(name) {
		this._super(name);

		var myLayer1 = new GameLayer();
		this.addLayer(myLayer1);
	},
});