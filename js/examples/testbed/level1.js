var Level1 = Scene.extend({
	
	ready: function(name) {
		this._super(name);
		this.addLayer(new GameLayer());
	},
});