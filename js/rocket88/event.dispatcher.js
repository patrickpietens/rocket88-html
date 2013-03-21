rocket88.EventDispatcher = rocket88.Object88.extend({

	init: function(name) {
		this._super(name);
		this._events = {};
	},

	addListener: function(event, listener) {
		if(!event) {
			console.assert(!Rocket88.showErrors, "Required parameter 'event' is missing");		
			return;
		}

		if(!listener) {
			console.assert(!Rocket88.showErrors, "Required parameter 'listener' is missing");		
			return;
		}

    	var myEvents = this._events;
        var myListeners = myEvents[event] = myEvents[event] || [];

      	myListeners.push(listener);
  	},

	removeListener: function(event, listener) {
    	var myListeners = this._events[event];

    	var i = myListeners.length;
    	while(--i > -1) {
    		var myListener = myListeners[i];
    		if(myListeners==listener) {
    			myListeners.splice(i, 1);
    		}
    	}
  	},  	

  	removeAllListeners: function() {
  		this._events = {};
  	},

	dispatch: function(event) {
		var myListeners = this._events[event];
		if(myListeners) {
			var myArgs = Array.prototype.slice.call(arguments, 1);
			for (var i = 0, l = myListeners.length; i < l; i++) {
				var myListener = myListeners[i];
		  		myListener.apply(null, myArgs);
			}			
		}
	},

	dispose: function() {   
		this._super();
		this._events = null;
    },
});