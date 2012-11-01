/**
 * @author patrickpietens
 *
 */

var Layer = EightyEightObject.extend({

	// inheritDoc
	init: function(name)
	{	
		this._super(name);

		// Private properties	
		this._scene = null;

		this._objectList = new LinkedList();
		this._objectSet = new Object();
		
		this._depth		= 0;
		this._x 		= 0;
		this._y 		= 0;
        this._rotation  = 0;
		this._scale		= 1;		

		this._transformMatrix = new Matrix();
	},

	
	// inheritDoc
	inject: function(values)
	{
		this._super(values);
		if(values)
		{
			this._scene = values.scene;
		}
	},
	

	// inheritDoc
	ready: function()
	{
		this._super();

		var myNode = this._objectList.head();
		while (myNode)
		{
			var myObject = myNode.userData;
			myObject.ready();
			
			myNode = myNode.next;
		}		
	},
	
	
	// inheritDoc
	update: function()
	{	
		this._super();
        var myCamera = this._scene.camera();

		this._x = -1 * myCamera.x();
		this._y = -1 * myCamera.y();
        this._rotation = -1 * myCamera.rotation();
		this._scale = myCamera.zoom();

		if (this._depth != 0.0 && !myCamera.isStatic())
		{
			var myFocalLength = myCamera.focalLength();
			this._scale = myFocalLength / ( myFocalLength + _depth );

			this._x *= myScale;
			this._y *= myScale;
		}

		var myNode = this._objectList.head();
		while (myNode)
		{
			var myObject = myNode.userData;
			myObject.update();
			
			myNode = myNode.next;
		}		
	},
	
	
	// Adds a gameobject to the layer
	addObject: function(gameObject)
	{
		this._setupObject(gameObject);
		
		// Add layers and notify listeners
		this._objectList.add(gameObject);
		this._objectSet[gameObject.name()] = gameObject;
				
		return gameObject;
	},
	
	
	// Inserts a gameobject above target object
	insertObjectAbove: function(gameObject, above)
	{
		if(!this.hasObject(above))
		{
			return false;
		}
		
		// Get the corresponding layer
		var myObject = this.getObject(above);
		var myNode = this._objectList.nodeOf(myObject);

		this._setupObject(gameObject);
		
		// Add layers and notify listeners
		this._objectList.insertBefore(gameObject, myNode);
		this._objectSet[gameObject.name()] = gameObject;

		return true;
	},
	
	
	// Inserts a gameobject underneath target object
	insertObjectBelow: function(gameObject, below)
	{
		if(!this.hasObject(below))
		{
			return false;
		}
		
		// Get the corresponding layer
		var myObject = this.getObject(below);
		var myNode = this._objectList.nodeOf(myObject);

		this._setupObject(gameObject);
		
		// Add layers and notify listeners
		this._objectList.insertBefore(gameObject, myNode);
		this._objectSet[gameObject.name()] = gameObject;

		return true;
	},
	
	
	// Swap two gameobjects
	swapObjects: function(nameA, nameB)
	{
		if(!this.hasObject(nameA) || !this.hasObject(nameB))
		{
			return false;
		}
		
		var myObjectA = this.getObject(nameA);
		var myNodeA = this._objectList.nodeOf(myObjectA);

		var myObjectB = this.getObject(nameB);
		var myNodeB = this._objectList.nodeOf(myObjectB);
		
		this._objectList.swap(myNodeA, myNodeB);
	
		return true;	
	},
	
		
	// Removes a gameobject from the layer
	removeObject: function(name)
	{
		if(!this.hasObject(name))
		{
			return false;
		}
		
		// Get the corresponding layer
		var myObject = this.getLayer(name);

		// Remove from the scene
		this._objectList.nodeOf(myObject).remove();
		this._objectSet[name] = null;
		
		// Destroy layer
		if(myObject.autoDestroy())
		{
			myObject.destroy();
		}

		return myObject;	
	},
	
	
	// Remove all gameobjects from the layer
	removeAllObjects: function ()
	{
		var myNode = this._objectList.head();
		while (myNode)
		{
			var myObject = myNode.userData;
			if(myObject.autoDestroy())
			{
				myObject.destroy();
			}
			
			myNode = myNode.next;
		}
		
		this._objectList = new LinkedList();	
		this._objectSet = new Object();	
	},
	
	
	// Removes the layer from the scene
	removeFromScene: function()
	{
		this._scene.removeLayer(this.name());
	},
	

	// Setups a gameobject
	_setupObject: function(gameObject)
	{
		// Fail if the object doesn't have a unique name
		if(this.hasObject(gameObject.name()))
		{
			console.error("Required property 'name' must be unique");
			return null;			
		}
		
		// Set injection map
		var myMap = 
		{
			world: this.world(),
			renderer: this.renderer(),
			layer: this
		};

		// Inject properties
		gameObject.inject(myMap);
		gameObject.create();
		
		// If the object is ready notify the object
		if(this.isReady())
		{
			gameObject.ready();
		}		
	},
	
	
	// Returns a list with all layers
	gameObjects: function()
	{
		return this._objectList.toArray();
	},
	
	
	// Returns a gameobject by its name	
	getObject: function(name)
	{
		return this._objectSet[name];
	},
	
	
	// Boolean indicating the layer has a gameobject
	hasObject: function(name)
	{
		return this._objectSet[name] != null;
	},
	

	// Reference to the parent scene
	scene: function()
	{
		return this._scene;
	},
	
	
	// Signal object that notifies other objects when a gameobject is added
	gameObjectAdded: function()
	{
		return this._objectAdded;
	},


	// Signal object that notifies other objects when a gameobject is removed		
	gameObjectRemoved: function()
	{
		return this._objectRemoved;
	},


	transformMatrix: function()
	{
        return this._transformMatrix.
            identity().
            translate(this._x, this._y).
            rotate(this._rotation * (Math.PI/180)).
            scale(this._scale, this._scale);
    },


	// inheritDoc
	destroy: function()
	{
		if(!this.isDestroyed())
		{
			this.removeAllObjects();
						
			this._objectList = null;
			this._objectSet = null;
			this._objectAdded = null;
			this._objectRemoved = null;				
		}
		
		this._super();	
	}
	
});