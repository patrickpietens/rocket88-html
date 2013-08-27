(function(rocket88) {
	"use strict";

	rocket88.Object = Class.extends({
		init: function(name) {
			this._type = "object";
			this._createdAt = new Date();
			this._name = name || "unnamed" + rocket88.abs( Math.random() * this._createdAt.getTime() | 0 );
			this._ready = false;
			this._disposed = false;

			this.autoDispose = true;
			this.tag = 0;
		},


		ready: function() {
			this._ready = true;
			console.info(this.type + ": " + this._name + " is ready");	
		},
		

		update: function() {	
			if(!this._ready) {
				return;
			}
		},


		toJSON: function(describeChildren) {
			var myRexExp = /^\s*function\s+(?:\w*\s*)?\((.*?)\)/;
			function introspect(func) {
			    return (func = func.toString().match(myRexExp)) ? (func[1] ? func[1].trim().split(/\s*,\s*/) : []) : null;
			}			

			var myDescription = {};
			for (var key in this) {
				var myObject = this[key];
				myDescription[key] = myObject;

				switch(typeof this[key]) {
					case "object":
						if(describeChildren && !!myObject.toJSON) {
							myDescription[key] = myObject.toJSON(false);
						}
						break;

					case "function":
						myDescription[key] = introspect(this[key]);
						break;
				}
			}

			return myDescription;
		},


		fromJSON: function(json) {
		},


		dispose: function() {
	        if(this._disposed) {
	        	console.assert(!Rocket88.showErrors, "Unable to dispose object: " + this.name);	
	        }

			console.info(this.type + ": " + this._name + " is disposed");	
			
			delete this.director;
			delete this._createdAt;
			delete this._assetStore;	
			delete this._name;
	        delete this._world;
	        delete this._type;

	        this._disposed = true;
	    },


	    defineProperties: function() {
	    	// Getters/ setters
	    	var myProperties = {
	    		type: { 
	    			enumerable: true, 
	    			get: function() { return this._type; }
	    		},
			    
			    name: { 
			    	enumerable: true, 
			    	get: function() { return this._name; }
			    },
			    
			    createdAt: { 
			    	enumerable: true, 
			    	get: function() { return this._createdAt; }
			    },
			    
			    isReady: { 
			    	enumerable: true, 
			    	get: function() { return this._ready; }
			    },

			    isDisposed: { 
			    	enumerable: true, 
			    	get: function() { return this._disposed; }
			    },
			};

			// Hide private properties
	    	for (var key in this) {
	    		if(key.indexOf("_") == 0) {
	    			myProperties[key] = {enumerable: false};
	    		}
	    	}

	    	Object.defineProperties(this, myProperties);
	    },
	});
})( use("rocket88") );
