rocket88.Layer = rocket88.Object88.extend({

	init: function(name) {	
		this._super(name);

		// Private properties	
		this._gameObjects 	 	= new rocket88.LinkedList();
		this._gameObjectsByName = new Object();

		// Public properties
		this.z					= 0;
		this.scene   			= undefined;

		// Getters
		this.__defineGetter__("type", function() { return "layer"; });
		this.__defineGetter__("gameObjects", function() { return this._gameObject.toArray(); });
	},

	ready: function() {
		this._super();

		var myNode = this._gameObjects.head;
		while (myNode) {
			var myGameObject = myNode.data;
			myGameObject.ready();
			
			myNode = myNode.nextdata;
		}		
	},
	
	update: function() {
		this._super();

		var myRenderer = rocket88.director.renderer;
		myRenderer.renderedLayer = this;
		
		var myNode = this._gameObjects.head;
		while (myNode) {
			var myGameObject = myNode.data;
			myGameObject.update();
			
			myNode = myNode.next;
		}		
	},
	
	// Adds a gameobject to the scene and places it on top of the stack
	addGameObject: function(gameobject) {	
		if(gameobject.isDisposed) {
			console.assert(!this.director.showErrors, "Unable to add disposed gameobject: " + gameobject.name + " to layer: " + this.name);
			return null;
		}

		// Fail if the gameobject doesn't have a unique name
		if(this.hasGameObject(gameobject.name)) {
			console.assert(!this.director.showErrors, "Unable to add gameobject: " + gameobject.name + " to scene: " + this.name + " Required property 'name' must be unique");
			return null;
		}
	    
	    gameobject.layer = this;
		if(this.isReady) {
			gameobject.ready();
		}

		this._gameObjects.add(gameobject);
		this._gameObjectsByName[gameobject.name] = gameobject;
        
        this.onGameObjectAdded(gameobject);

        return gameobject;
	},

	addGameObjectAbove: function(gameobjectA, gameobjectB) {
		if(this.hasGameObject(gameobjectB.name) ) {
			console.assert(!this.director.showErrors, "Unable to add gameobject: " + gameobjectA.name + " above gameobject: " + gameobjectB.name + " The latter doesn't exists in layer: " + this.name);
			return false;
		}
		
		gameobjectA.scene = this;
		if(this.isReady) {
			gameobjectA.ready();
		}

		this._gameObjects.insertAfter(gameobjectA, myNode);
		this._gameObjectsByName[gameobjectA.name] = gameobjectA;
		
        this.onGameObjectAdded(gameobject);

		return true;
	},

	addGameObjectBelow: function(gameobjectA, gameobjectB) {
		if(this.hasgameObject(gameobjectB.name)) {
			console.assert(!this.director.showErrors, "Unable to add gameobject: " + gameobjectA.name + " below gameobject: " + gameobjectB.name + " The latter doesn't exists in layer: " + this.name);
			return false;
		}
		
		gameobjectA.scene = this;
		if(this.isReady) {
			gameobjectA.ready();
		}

		this._gameObjects.insertBefore(gameobjectA, myNode);
		this._gameObjectsByName[gameobjectA.name] = gameobjectA;
		
        this.onGameObjectAdded(gameobject);

		return true;
	},

	onGameObjectAdded: function(gameobject) {
	},

	swapGameObjects: function(gameobjectA, gameobjectB) {
		if(!this.hasGameObject(gameobjectA.name) || !this.hasGameObject(gameobjectB.name)) {
			console.assert(!this.director.showErrors, "Unable to swap gameobject: " + gameobjectA.name + " with gameobject:" + gameobjectB.name);
			return false;
		}
		
		var myNodeA = this._gameObjects.nodeOf(gameobjectA);
		var myNodeB = this._gameObjects.nodeOf(gameobjectB);
		this._gameObjects.swap(myNodeA, myNodeB);
	
		return true;		
	},

	// Removes a gameobject from the scene
	removeGameObject: function(gameobject) {	
		if(!this.hasGameObject(gameobject.name)) {
			console.assert(!this.director.showErrors, "Unable to remove gameobject: " + gameobject.name + " from scene: " + this.name + " gameobject doesn't exists in layer: " + this.name);
			return null;
		}

		// Remove from the scene
		this._gameObjects.nodeOf(gameobject).remove();
		delete this._gameObjectsByName[gameobject.name];

		// Destroy gameobject
		if(gameobject.autoDispose) {
			gameobject.dispose();
		}

		this.onGameObjectRemoved(gameobject);

		return gameobject;
	},

	// Remove all gameObjects from the scene
	removeAllGameObjects: function(name) {
		var myNode = this._gameObjects.head;
		while (myNode) {

			var myGameObject = myNode.data;
			this.onGameObjectRemoved(myGameObject);

			if(myGameObject.autoDispose) {
				myGameObject.dispose();
			}

			var myNextNode = myNode.next;
			this._gameObjects.remove(myNode);
			myNode = myNextNode;
		}

		this._gameObjectsByName = new Object();
	},	

	onGameObjectRemoved: function(gameobject) {
	},

	// Returns a gameObject by its name
	getGameObjectByName: function(name) {
		return this._gameObjectsByName[name];
	},

	getGameObjectByTag: function(tag) {
		var myNode = this._gameObjects.head;
		while (myNode) {
			var myGameObject = myNode.data;
			if(myGameObject.tag!=0 && myGameObject.tag==tag) {
				return myGameObject;
			}

			myNode = myNode.next;
		}

		return undefined;
	},

	// Boolean indicating the scene has a gameObject
	hasGameObject: function(name) {	
		return this._gameObjectsByName[name] != null;
	},

	clone: function(name) {
		var myLayer = new Layer(name);
		myLayer.depth = this.depth;

		var i = this.gameobjects.length;
		while(--i > -1)	{
			var myObject = this._gameObjects[i].clone();
			myLayer.addGameObject(myObject);
		}

		return myLayer;
	},

	// inheritDoc
	dispose: function() {
		this._super();	
		this.removeAllGameObjects();
					
		this._gameObjects = null;
		this._gameObjectsByName = null;		
		this._renderer = null;
	}
});