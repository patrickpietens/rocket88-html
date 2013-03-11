var AssetLoader = Class.extend({

	init: function() {
		this._assetStore = AssetStore.getInstance();
	},

	load: function(path, type) {

	},

	dispose: function() {
		this._super();

		this._assetStore = null;
	}
});

AssetLoader.getInstance = function() {
	var myInstance = AssetLoader.instance;
	if(myInstance==undefined) {
		myInstance = new AssetLoader();
	}

	return myInstance;
}
