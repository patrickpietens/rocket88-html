/**
 * @author patrickpietens
 *
 */
 
var Level1 = Scene.extend({

	// Constructor
	create: function()	
	{
		this._super();

		var myLayer = new GameLayer("gamelayer");
		this.addLayer(myLayer);

        var myCamera = new ChaseCamera();
        this.camera(myCamera);
    },
	
	
	// inheritDoc
	ready: function()
	{
		this._super();
	}
});