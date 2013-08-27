(function(rocket88) {
	"use strict";

	rocket88.AssetStore = Class.extends({
		init: function() {
			if(rocket88.assetStore) {
				throw ReferenceError("Houston, we have a problem. AssetStore is a singleton class. Use rocket88.assetStore method to get a reference.");
			}

			this._disposed = false;
			this._assets = new Object();
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
			if(!this.hasAsset(path)) {
				console.error("Asset doesn't exist: " + path);	
			}

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
		},


		defineProperties: function() {
			Object.defineProperties(this, {
				assets: {
					get: function() { 
						var myAssets = new Array();
						for (var path in this._assets) {
							myAssets.push(path);
						}

						return myAssets; 
					}
				}
			});
		},
	});
})( use("rocket88") );
	
