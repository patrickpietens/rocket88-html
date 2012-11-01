/**
 * @author patrickpietens
 *
 */

var Scene = EightyEightObject.extend({

	// inheritDoc
	init: function(name)
	{
		this._super(name);

		// Private properties
        this._camera = new Camera();
		this._layerList = new LinkedList();
		this._layerSet = new Object();
	},


	// inheritDoc
	ready: function()
	{
		this._super();

		var myNode = this._layerList.head();
		while (myNode)
		{
			var myLayer = myNode.userData;
			myLayer.ready();

			myNode = myNode.next;
		}
	},


	// inheritDoc
	update: function()
	{
		this._super();

		this.renderer().clear();

        this._camera.update();

		var myNode = this._layerList.head();
		while (myNode)
		{
			var myLayer = myNode.userData;
			myLayer.update();

			myNode = myNode.next;
		}

		this.renderer().render();
	},


	// Adds a layer to the scene and places it on top of the stack
	addLayer: function(layer)
	{
		layer = this._setupLayer(layer);

        this._layerSet[layer.name()] = layer;
        if(this._layerList.size() == 0)
        {
            this._layerList.add(layer);
            return true;
        }

        var myNode = this._extensionList.head();
        while (myNode)
        {
            var myLayer = myNode.userData;
            if(layer.depth() >= myLayer.depth())
            {
                this._layerList.insertBefore(layer, myLayer);
                return true;;
            }

            myNode = myNode.next;
        }

		return false;
	},


	// Removes a layer from the scene
	removeLayer: function(name)
	{
		if(!this.hasLayer(name))
		{
			return false;
		}

		// Get the corresponding layer
		var myLayer = this.getLayer(name);

		// Remove from the scene
		this._layerList.nodeOf(myLayer).remove();
		this._layerSet[name] = null;

		// Destroy layer
		if(myLayer.autoDestroy())
		{
			myLayer.destroy();
		}

		return myLayer;
	},


	// Remove all layers from the scene
	removeAllLayers: function(name)
	{
		var myNode = this._layerList.head();
		while (myNode)
		{
			var myLayer = myNode.userData;

			// Destroy the layer
			if(myLayer.autoDestroy())
			{
				myLayer.destroy();
			}

			myNode = myNode.next;
		}

		this._layerList = new LinkedList();
		this._layerSet = new Object();
	},


	// Setups the layer
	_setupLayer: function(layer)
	{
		// Fail if the layer doesn't have a unique name
		if(this.hasLayer(layer.name()))
		{
			console.error("Required property 'name' must be unique");
			return null;
		}

		// Set injection map
		var myMap =
		{
			world: this.world(),
			renderer: this.renderer(),
			scene: this
		};

		// Inject properties
		layer.inject(myMap)
		layer.create();

		// If the scene is ready notify the layer if so
		if(this.isReady())
		{
			layer.ready();
		}

		return layer;
	},


    camera: function(value)
    {
        if(value)
        {
            this._camera = value;
            return this;
        }

        return this._camera;
    },


	// Array which holds all layers of the scene
	layers: function()
	{
		return this._layerList.toArray();
	},


	// Returns a layer by its name
	getLayer: function(name)
	{
		return this._layerSet[name];
	},


	// Boolean indicating the scene has a layer
	hasLayer: function(name)
	{
		return this._layerSet[name] != null;
	},


	// Destroys a layer
	destroy: function()
	{
		if(!this.isDestroyed())
		{
			this.removeAllLayers();

            this._camera = null;
			this._layerList = null;
			this._layerSet = null;
		}

		this._super();
	}
});