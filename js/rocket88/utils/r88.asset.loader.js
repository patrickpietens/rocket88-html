var AssetLoader = Class.extend({

	init: function() {
		this._queue = new Array();

		this._currentIndex = 0;
		this._running = false;

		this._imageExtensions = ["png","jpg","jpeg","gif"];
		this._textExtensions = ["txt", "xml", "json", "php"];

		this._assetStore = AssetStore.getInstance();
	},

	addAsset: function(url) {
		this._queue.push(url);
	},

	addAssets: function(assets) {
		this._queue = this._queue.concat(assets);
	},

	downloadAssets: function(totalSize) {
		if(this._running) {
			return;
		}

		this._running = true;
		this._currentIndex = -1;

		this.downloadNext();
	},

	downloadNext: function() {
		this._currentIndex++;
		var myURL = this._queue[this._currentIndex];

		var myExtension = myURL.split(".").pop();
		if(this._imageExtensions.indexOf(myExtension)>-1) {
			this.downloadImage(myURL);
		}
		else if (this._textExtensions.indexOf(myExtension)>-1) {
			this.downloadTextFile(myURL);
		}
	},

	downloadImage: function(url) {
		var self = this;
		var myImage = new Image();

		myImage.onprogress = function(event) {
			console.log(event);
		}

		myImage.onload = function (event) {
			self._assetStore.addAsset(this, url);
			self.downloadNext();
		}

		myImage.src = url;
	},

	downloadTextFile: function(url) {
		var self = this;
		var myXHR = new XMLHttpRequest();

		myXHR.onprogress = function(event) {
			console.log(event);
		}

		myXHR.onreadystatechange=function(event) {
			if (myXHR.readyState==4 && myXHR.status==200) {
				self._assetStore.addAsset(this, url);
			}
		}

		myXHR.open("GET", url, true);
		myXHR.send();
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
