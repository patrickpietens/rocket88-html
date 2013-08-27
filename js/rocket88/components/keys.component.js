(function(rocket88) {
	"use strict";

	rocket88.KeysComponent = rocket88.Component.extends({
		init: function(name) {
			this._super(name || "keys.component");
			this.pressedKeys = "";

			document.onkeydown = delegate(this, this.onKeyDown);
			document.onkeyup = delegate(this, this.onKeyUp);
		},


		onKeyDown: function(event) {
			var myCode = event.keyCode;
			if(!this.keyIsDown(myCode)) {
				this.pressedKeys += "|" + myCode;
			}
		},


		onKeyUp: function(event) {
			var myCode = event.keyCode;
			if(this.keyIsDown(myCode)) {
				this.pressedKeys = this.pressedKeys.replace("|" + myCode, "");
			}			
		},


		keyIsDown: function(code) {
			return this.pressedKeys.indexOf("|" + code) > -1;
		},


		dispose: function() {
			this._super();
			delete this.pressedKeys;
		}
	});
})( use("rocket88") );