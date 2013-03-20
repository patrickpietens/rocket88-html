rocket88.AssetLoader = Class.extend({

	init: function() {
		if(rocket88.assetLoader) {
			throw ReferenceError("Houston, we have a problem. AssetLoader is a singleton class. Use rocket88.assetLoader to get a reference.");
		}

		// Private properties
		this._currentIndex = 0;
		this._queue = new Array();
		this._running = false;

		this._imageExtensions = ["png", "jpg", "jpeg", "gif"];
		this._textExtensions = ["txt", "xml", "json", "php"];
		this._soundExtensions = ["wav", "mp3", "ogg"];

		// Public properties
		this.addToAssetStore = true;
	},

	addAsset: function(url) {
		if(this._isRunning) {
			console.warn("");
			return;
		}

		this._queue.push(url);
	},

	addAssets: function(assets) {
		this._queue = this._queue.concat(assets);
	},

	downloadAll: function(totalSize) {
		if(this._running) {
			return;
		}

		this._currentIndex = -1;
		this._running = true;
		this._totalSize = totalSize;

		this.downloadNext();
	},

	downloadNext: function() {
		this._currentIndex++;
		var myURL = this._queue[this._currentIndex];

		var myExtension = myURL.split(".").pop().toLowerCase();

		// Download as text
		if (this._textExtensions.indexOf(myExtension)>-1) {
			this.downloadTextFile(myURL);
		}

		// Download image
		else if(this._imageExtensions.indexOf(myExtension)>-1) {
			this.downloadImage(myURL);
		}

		// Download sound
		else if (this._soundExtensions.indexOf(myExtension)>-1) {
			this.downloadAudio(myURL);
		}		
	},

	downloadTextFile: function(url) {
		var self = this;
		var myXHR = new XMLHttpRequest();

		myXHR.onprogress = function(event) {
		}

		myXHR.onreadystatechange=function(event) {
			if (myXHR.readyState==4 && myXHR.status==200) {
				var myExtension = url.split(".").pop().toLowerCase();

				var myResponse = undefined;
				switch(myExtension) {
					case "json":
						myResponse = JSON.parse(this.response);
						break;

					default:
						myResponse = this.response;
						break;
				}
				if(self.addToAssetStore) {
					rocket88.assetStore.addAsset(myResponse, url);
				}

				self.onAsset(url, myResponse, this.response);
				if(self._currentIndex==self._queue.length-1) {
					this._running = false;
					self.onComplete();
					return;
				}

				self.downloadNext();
			}
		}

		myXHR.open("GET", url, true);
		myXHR.send();
	},

	downloadImage: function(url) {
		var self = this;
		var myImage = new Image();

		myImage.onprogress = function(event) {
		}

		myImage.onload = function (event) {
			if(self.addToAssetStore) {
				rocket88.assetStore.addAsset(this, url);
			}

			self.onAsset(url, this, undefined);
			if(self._currentIndex==self._queue.length-1) {
				this._running = false;
				self.onComplete();
				return;
			}

			self.downloadNext();
		}

		myImage.src = url;
	},

	downloadAudio: function(url) {
		var myAudio = document.createElement("audio");
		if(myAudio.play && myAudio.canPlayType("audio/mpeg"))
	   	{
			this.song = new Audio(url);
			this.song.load();
	    }
	},

	onProgress: function(progress) {
	},

	onAsset: function(url, asset, rawData) {
	},

	onComplete: function() {
	},

	dispose: function() {
		this._super();
		this._assetStore = null;
	}
});

rocket88.assetLoader = new rocket88.AssetLoader();