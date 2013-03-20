rocket88.AssetStore = Class.extend({

	init: function() {
		if(rocket88.assetStore) {
			throw ReferenceError("Houston, we have a problem. AssetStore is a singleton class. Use rocket88.assetStore method to get a reference.");
		}

		rocket88.AssetStore.instance = this;

		// Private properties
		this._disposed = false;
		this._assets = new Object();

		// Getters
		this.__defineGetter__("isDisposed", function() { return this._disposed; });
		this.__defineGetter__("assets", function() { 
			var myAssets = new Array();
			for (var path in this._assets) {
				myAssets.push(path);
			}

			return myAssets; 
		});
	},

	addAsset: function(asset, path) {
		if(this.hasAsset(path)) {
			console.error("Unable to add asset: " + path + " to AssetStore. Asset already exists.");
			return;
		}

		if(!asset) {
			console.error("Unable to add asset: " + path + " to AssetStore. Asset cannot be undefined.");
			return;			
		}

		this._assets[path] = asset;
	},

	removeAllAssets: function() {
		for (var path in this._assets) {
			delete this._assets[path];
		}

		this._assets = new Object();
	},

	getAsset: function(path) {
		return this._assets[path];
	},

	assetType: function(path) {
		return path.split(".").pop();
	},

	hasAsset: function(path) {
		return this._assets[path] != null;
	},

	dispose: function() {
        if(this._disposed) {
        	console.error("Unable to dispose object: " + this.name);	
        }

		console.info(this.type + ": " + this.name + " is disposed");	
	
		this.removeAllAssets();
		
		this._disposed = true;		
		this._assets = null;
	}
});

rocket88.assetStore  = new rocket88.AssetStore();