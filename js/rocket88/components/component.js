(function(rocket88) {
	"use strict";

	rocket88.Component = rocket88.Object.extends({
		init: function(name) {
			this._super(name);
			this._type = "component";
		},
	});
})( use("rocket88") );