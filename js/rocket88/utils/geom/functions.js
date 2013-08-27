(function(rocket88) {
	"use strict";

	rocket88.round = function(x) {
		return x + (x < 0 ? -0.5 : 0.5)>>0;
	};


	rocket88.ceil = function(x) {
		return x + (x < 0 ? 0 : 1) >> 0;
	};


	rocket88.floor = function(x) {
		return x + (x < 0 ? -1 : 0) >> 0;
	};


    rocket88.max = function(x, y) {
        return x > y ? x : y;
    };


    rocket88.min = function(x, y) {
        return x < y ? x : y;
    };


    rocket88.abs = function(x) {
		return x < 0 ? -x : x;    	
    };
})( use("rocket88" ));