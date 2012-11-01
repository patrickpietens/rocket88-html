/**
 * @author patrickpietens
 *
 */
 
var GameObject = EightyEightObject.extend({
	
	// inheritDoc
	init: function(name, group)
	{
		this._super(name);

		this._layer = null;	
		this._group = group || "no_name";
		
		this._extensionList = new LinkedList();
		this._extensionSet = new Object();		
	},
	
	
	// inheritDoc
	create: function()
	{
		this._super();
	
		this.addExtension(new GraphicExtension());
		this.addExtension(new TransformExtension());
	},
	
	
	// inheritDoc
	inject: function(values)
	{
		this._super(values);	
		if(values)
		{
			this._layer = values.layer;
		}		
	},
	
	
	// inheritDoc
	ready: function()
	{
		this._super();
		
		var myNode = this._extensionList.head();
		while (myNode)
		{
			var myExtension = myNode.userData;
			myExtension.ready();
			
			myNode = myNode.next;
		}		
	},
	
	
	// inheritDoc
	update: function()
	{
		this._super();
		
		var myNode = this._extensionList.head();
		while (myNode)
		{
			var myExtension = myNode.userData;
			if(myExtension.enabled())
			{
				myExtension.update();
			}
			
			myNode = myNode.next;
		}		
	},
	
	
	// Adds an extension to the GameObject
	addExtension: function(extension)
	{
		this._setupExtension(extension);
		
		// Add layers and notify listeners
		this._extensionList.add(extension);
		this._extensionSet[extension.name()] = extension;
				
		return extension;
	},
	
	
	// Removes an extension from the GameObject
	removeExtension: function(name)
	{
		if(!this.hasExtension(name))
		{
			return false;
		}
		
		// Get the corresponding layer
		var myExtension = this.getExtension(name);

		// Remove from the scene
		this._objectList.nodeOf(myExtension).remove();
		this._objectSet[name] = null;
		
		// Destroy layer
		if(myExtension.autoDestroy())
		{
			myExtension.destroy();
		}
		
		// Notify
		this._extensionRemoved.dispatch(myExtension);
		
		return myObject;	
	
	},
	
	
	// Removes all extensions from the GameObject
	removeAllExtension: function()
	{
		var myNode = this._extensionList.head();
		while (myNode)
		{
			var myExtension = myNode.userData;
			
			// Destroy the extension
			if(myExtension.autoDestroy())
			{
				myExtension.destroy();
			}
			
			myNode = myNode.next;
		}
		
		this._extensionList = new LinkedList();
		this._extensionSet = new Object();	
	},
	
	
	// Removes the GameObject from its parent layer	
	removeFromLayer: function()
	{
	},
	
	
	// Setups an extension
	_setupExtension: function(extension)
	{
		// Fail if the object doesn't have a unique name
		if(this.hasExtension(extension.name()))
		{
			console.error("Required property 'name' must be unique");
			return null;			
		}
		
		// Set injection map
		var myMap = 
		{
			world: this.world(),
			renderer: this.renderer(),
			gameObject: this
		};

		// Inject properties
		extension.inject(myMap);
		extension.create();
		
		// If the object is ready notify the object
		if(this.isReady())
		{
			extension.ready();
		}	
	},
	
	
	// Returns an array with all extensions
	extensions: function()
	{
		return this._extesionList.toArray();
	},
	
	
	// Returns a gameobject by its name	
	getExtension: function(name)
	{
		return this._extensionSet[name];
	},
	
	
	// Boolean indicating the layer has a gameobject
	hasExtension: function(name)
	{
		return this._extensionSet[name] != null;
	},
		
	
	// Returns the frame extension
	transform: function()
	{
		return this._extensionSet["transform"];	
	},
	
	
	// Returns the graphics extension
	graphic: function()
	{
		return this._extensionSet["graphic"];
	},
	
	
	// Returns the parent layer of the GameObject
	layer: function()
	{
		return this._layer;
	},
	
	
	// Returns the group of the GameObject
	group: function()
	{
		return this._group;
	},

	
	// inheritDoc
	destroy: function()
	{
		if(!this.isDestroyed())
		{
			this.removeAllExtensions();

            this._layer = null;
            this._group = null;

			this._extensionList = null;
			this._extensionSet = null;
		}
		
		this._super();	
	}
});