var AssetStore = Class.extend({

	init: function() {
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
		if(this.hasAsset(path) && Rocket88.showErrors) {
			console.error("Unable to add asset: " + path + " to AssetStore. Asset already exists.");
			return;
		}

		if(!asset && Rocket88.showErrors) {
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

	assetForPath: function(path) {
		return this._assets[path];
	},

	assetType: function(path) {
		return path.split(".").pop();
	},

	hasAsset: function(path) {
		return this._assets[path] != null;
	},

	dispose: function() {
        if(this._disposed && Rocket88.showErrors) {
        	console.error("Unable to dispose object: " + this.name);	
        }

		console.info(this.type + ": " + this.name + " is disposed");	
	
		this.removeAllAssets();
		
		this._disposed = true;		
		this._assets = null;
	}
});