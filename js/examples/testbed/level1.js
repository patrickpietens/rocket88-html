var Level1 = rocket88.Scene.extend({

	ready: function(name) {
		this._super(name);
		
		this.gameLayer = this.addLayer(new GameLayer());
		//this.camera = new rocket88.ChaseCamera(this.gameLayer.player);
	},
});