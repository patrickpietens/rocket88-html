 var KeysComponent = Component.extend({

	init: function() {
		this._super("keys");

		document.onkeydown = delegate(this, function(event) {
			if(this.enabled) {
				this.onKeyDown(event.keyCode);
				switch(event.keyCode) {
					case 37: this.onLeftArrow("down"); break;
					case 39: this.onRightArrow("down"); break;
					case 37: this.onUpArrow("down"); break;
					case 40: this.onDownArrow("down"); break;
					case 32: this.onSpacebar("down"); break;
				}				
			}
		});

		document.onkeyup = delegate(this, function(event) {

			if(this.enabled) {
				this.onKeyUp(event.keyCode);
				switch(event.keyCode) {
					case 37: this.onLeftArrow("up"); break;
					case 39: this.onRightArrow("up"); break;
					case 37: this.onUpArrow("up"); break;
					case 40: this.onDownArrow("up"); break;
					case 32: this.onSpacebar("up"); break;
				}				
			}
		});
	},

	onKeyDown: function(keyCode) {
	},

	onKeyUp: function(keyCode) {
	},

	onLeftArrow: function(direction) {
	},

	onRightArrow: function(direction) {
	},

	onUpArrow: function(direction) {
	},

	onDownArrow: function(direction) {
	},

	onSpacebar: function(direction) {
	}
});