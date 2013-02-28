var b2Vec2	= Box2D.Common.Math.b2Vec2;
var b2World	= Box2D.Dynamics.b2World;

  var   b2Vec2 = Box2D.Common.Math.b2Vec2
        , b2BodyDef = Box2D.Dynamics.b2BodyDef
        , b2Body = Box2D.Dynamics.b2Body
        , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
        , b2Fixture = Box2D.Dynamics.b2Fixture
        , b2World = Box2D.Dynamics.b2World
        , b2MassData = Box2D.Collision.Shapes.b2MassData
        , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
        , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
        , b2DebugDraw = Box2D.Dynamics.b2DebugDraw


var Scene = Object88.extend({
	// Executes when the object is instantiated
	init: function(name) {
		this._super(name);

		// Private properties        
		this._layers 		= new LinkedList();
		this._layersByName 	= new Object();
		this._gravity		= 20;

		var myGravity 		= new b2Vec2(0, this._gravity);
		this._world 		= new b2World(myGravity, true);
		//_world.SetContactListener( _contactSolver );

 var SCALE = 30;
     
       var fixDef = new b2FixtureDef;
       fixDef.density = 1.0;
       fixDef.friction = 0.5;
       fixDef.restitution = 0.2;
     
       var bodyDef = new b2BodyDef;
     
       //create ground
       bodyDef.type = b2Body.b2_staticBody;
       
       // positions the center of the object (not upper left!)
       bodyDef.position.x = 400 / 2 / SCALE;
       bodyDef.position.y = 300 / SCALE;
       
       fixDef.shape = new b2PolygonShape;
       
       // half width, half height. eg actual height here is 1 unit
       fixDef.shape.SetAsBox((600 / SCALE) / 2, (10/SCALE) / 2);
       this._world.CreateBody(bodyDef).CreateFixture(fixDef);

		// Public properties
		this.camera 		= new Camera();

		// Getters/setters
		this.__defineGetter__("type", function() { return "scene"; });
		this.__defineGetter__("layers", function() { return this._layers.toArray(); });
		this.__defineGetter__("world", function() { return this._world; });

		this.__defineGetter__("gravity", function() { return this._layers.toArray(); });
		this.__defineGetter__("gravity", function(gravity) { 
			return this._gravity; 
		});
	},

	// All properties are injected and set and the game is ready to run.
	ready: function() {
		this._super();

		var myNode = this._layers.head;
		while (myNode) {
			var myLayer = myNode.data;
			myLayer.ready();

			myNode = myNode.next;
		}
	},

	// Executes every render tick
	update: function() {
		this._super();
        this.camera.update();

		this._world.Step(1 / 60, 10, 10);
		this._world.DrawDebugData();
		this._world.ClearForces();        

		if(Rocket88.debugMode) {
			this._world.DrawDebugData();
		}

		var myNode = this._layers.head;
		while (myNode) {
			var myLayer = myNode.data;
			myLayer.update();

			myNode = myNode.next;
		}
	},

	// Adds a layer to the scene and places it on top of the stack
	addLayer: function(layer) {	
		if(layer.isDisposed) {
			console.assert(!Rocket88.showErrors, "Unable to add disposed layer: " + layer.name + " to scene: " + this.name);
			return null;
		}

		// Fail if the layer doesn't have a unique name
		if(this.hasLayer(layer.name)) {
			console.assert(!Rocket88.showErrors, "Unable to add layer: " + layer.name + " to scene: " + this.name + " Required property 'name' must be unique");
			return null;
		}
	    
	    layer.scene = this;
		if(this.isReady) {
			layer.ready();
		}

		this._layers.add(layer);
		this._layersByName[layer.name] = layer;
        
        this.dispatch("layerAdded", this, layer);

        return layer;
	},

	addLayerAbove: function(layerA, layerB) {
		if(this.hasLayer(layerB.name)) {
			console.assert(!Rocket88.showErrors, "Unable to add layer: " + layerA.name + " above layer: " + layerB.name + " The latter doesn't exists in scene: " + this.name);
			return false;
		}
		
		layerA.scene = this;
		if(this.isReady) {
			layerA.ready();
		}

		this._layers.insertAfter(layerA, myNode);
		this._layersByName[layerA.name] = layerA;
		
		this.dispatch("layerAdded", this, layer);

		return true;
	},

	addLayerBelow: function(layerA, layerB) {
		if(this.hasLayer(layerB.name)) {
			console.assert(!Rocket88.showErrors, "Unable to add layer: " + layerA.name + " below layer: " + layerB.name + " The latter doesn't exists in scene: " + this.name);
			return false;
		}
		
		layerA.scene = this;
		if(this.isReady) {
			layerA.ready();
		}

		this._layers.insertBefore(layerA, myNode);
		this._layersByName[layerA.name] = layerA;
		
		this.dispatch("layerAdded", this, layer);

		return true;
	},

	swapLayers: function(layerA, layerB) {
		if(!this.hasLayer(layerA.name) || !this.hasLayer(layerB.name)) {
			console.assert(!Rocket88.showErrors, "Unable to swap layer: " + layerA.name + " with layer:" + layerB.name);
			return false;
		}
		
		var myNodeA = this._layers.nodeOf(layerA);
		var myNodeB = this._layers.nodeOf(layerB);
		this._layers.swap(myNodeA, myNodeB);
	
		return true;		
	},

	// Removes a layer from the scene
	removeLayer: function(layer) {	
		if(!this.hasLayer(layer.name)) {
			console.assert(!Rocket88.showErrors, "Unable to remove layer: " + layer.name + " from scene: " + this.name + " Layer doesn't exists in scene: " + this.name);
			return null;
		}

		// Remove from the scene
		this._layers.nodeOf(layer).remove();
		delete this._layersByName[layer.name];

		// Destroy layer
		if(layer.autoDispose) {
			layer.dispose();
		}

		this.dispatch("layerRemoved", this, layer);

		return layer;
	},

	// Remove all layers from the scene
	removeAllLayers: function(name) {
		var myNode = this._layers.head;
		while (myNode) {

			var myLayer = myNode.data;

			this.dispatch("layerRemoved", this, myLayer);

			if(myLayer.autoDispose) {
				myLayer.dispose();
			}

			var myNextNode = myNode.next;
			this._layers.remove(myNode);
			myNode = myNextNode;
		}

		this._layersByName = new Object();
	},	

	// Returns a layer by its name
	layerByName: function(name) {
		return this._layersByName[name];
	},

	// Boolean indicating the scene has a layer
	hasLayer: function(name) {	
		return this._layersByName[name] != null;
	},

	clone: function(name) {
		var myScene = new Scene();
		myScene.camera = this.camera.clone();

		var i = this.layers.length;
		while(--i > -1)	{
			var myLayer = this.layers[i].clone();
			myScene.addLayer(myLayer);
		}

		return myScene;
	},
    
	dispose: function() {
		this._super();
		this.removeAllLayers();

		_world.SetDestructionListener(new b2DestructionListener());

        this._camera = null;
		this._layers = null;
		this._layersByName = null;
		this._world = null;
	},
});