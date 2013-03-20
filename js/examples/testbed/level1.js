var Level1 = rocket88.Scene.extend({
	
	ready: function(name) {
		this._super(name);
		
		this.gameLayer = new GameLayer();
		this.addLayer(this.gameLayer);

		var myPlayer = this.gameLayer.player;
		rocket88.director.camera = new rocket88.ChaseCamera(myPlayer);
	},
});