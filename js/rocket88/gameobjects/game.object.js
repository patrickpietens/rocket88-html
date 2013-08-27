(function(rocket88) {
	"use strict";

	rocket88.GameObject = rocket88.Object.extends({
		init: function(name) {
			this._super(name);

			this._type = "game.object";
			this._components = new rocket88.LinkedList();

			this._transform	= new rocket88.TransformComponent();
			this._transform.parent = this;

			this._graphic = new rocket88.GraphicComponent();
			this._graphic.parent = this;

			this._collision = new rocket88.CollisionComponent();
			this._collision.parent = this;

			this._screen = new rocket88.ScreenComponent();
			this._screen.parent = this;
		},

				
		ready: function() {		
			this._super();

			this._transform.ready();
			this._screen.ready();
			this._collision.ready();
			this._graphic.ready();
		},

		
		update: function() {			
			this._transform.update();
			this._screen.update();
			this._collision.update();
			this._graphic.update();

			this._super();
		},


		draw: function() {	
			var myRenderer = rocket88.director.renderer;
			myRenderer.bufferObject(this);
		},
		

		dispose: function() {
			this._super();

			this._graphic.dispose();
			this._transform.dispose();
			this._collision.dispose();
			this._screen.dispose();
			
			delete this._components;
			delete this._graphic;
			delete this._transform;
			delete this._collision;
			delete this._screen;
		},


	    defineProperties: function() {
	    	this._super();
	    	
	    	var myProperties = {
	    		layer: {
					enumerable: true, 
		    		get: function() { return this.parent; } 
		    	},

		    	transform: {
					enumerable: true, 
		    		get: function() { return this._transform; } 
		    	},

		    	graphic: {
					enumerable: true, 
		    		get: function() { return this._graphic; } 
		    	},

		    	collision: {
					enumerable: true, 
		    		get: function() { return this._collision; } 
		    	},

		    	screen: {
		    		enumerable: true,
		    		get: function() { return this._screen }
		    	},
		    };

		    Object.defineProperties(this, myProperties);
		},	
	});
})( use("rocket88") );