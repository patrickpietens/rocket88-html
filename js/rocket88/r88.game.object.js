var GameObject = Object88.extend({
	// inheritDoc
	init: function(name) {
		this._super(name);

		// Private properties
		this._components 		= new LinkedList();
		this._componentsByName 	= new Object();		
		this._transform			= new Transform();
		this._graphic			= new Graphic();
		this._renderer 			= Rocket88.renderer;

		// Public properties
		this.layer 				= null;	

		// Getters
		this.__defineGetter__("type", function() { return "gameobject"; });
		this.__defineGetter__("components", function() { return this._components.toArray(); });
		this.__defineGetter__("transform", function() { return this._transform; });
		this.__defineGetter__("graphic", function() { return this._graphic; });	
		this.__defineGetter__("renderer", function() { return this._renderer; });	

		this._transform.gameobject 	= this;
		this._graphic.gameobject 	= this;

		this._transform.addListener("propertyChanged", delegate(this, this.onTransform ));

		this._transform.ready();
		this._graphic.ready();
	},
			
	// inheritDoc
	ready: function() {
		this._super();
		
		var myNode = this._components.head;
		while (myNode) {
			var myComponent = myNode.data;
			myComponent.ready();
			
			myNode = myNode.next;
		}		

		this._transform.ready();
		this._graphic.ready();
	},
	
	// inheritDoc
	update: function() {
		this._super();
	
		// Set the current gameobject of the renderer
		this._renderer.renderedGameObject = this;
				
		// Update all attached components
		var myNode = this._components.head;
		while (myNode) {
			var myComponent = myNode.data;
			if(myComponent.enabled) {
				myComponent.update();
			}
			
			myNode = myNode.next;
		}		
		// Update transformation if physics components is available
		var myPhysics = this.componentByName("physics");
		if(myPhysics) {
			this._transform.position.x = myPhysics.body.GetPosition().x * 30;
			this._transform.position.y = myPhysics.body.GetPosition().y * 30;
			this._transform.rotation = myPhysics.body.GetAngle() * 180/Math.PI;
		}

		this._transform.update();
		this._graphic.update();
	},

	onTransform : function(property, newValue) {
		var myPhysics = this.componentByName("physics");
		if(myPhysics) {
			//console.assert(!Rocket88.showErrors, "Do not change the Transform Component of a GameObjects directly. Use the Physics Component instead.");
		}
	},
	
	// Adds an component to the gameobject
	addComponent: function(component) {
		if(component.isDisposed) {
			console.assert(!Rocket88.showErrors, "Unable to add disposed component: " + component.name + " to gameobject: " + this.name);
			return null;
		}

		if(this.hasComponent(component.name)) {
			console.assert(!Rocket88.showErrors, "Unable to add component: " + component.name + " to gameobject: " + this.name + " Required property 'name' must be unique");
			return null;
		}

		component.gameobject = this;
		if(this.isReady) {
			component.ready();
		}	

		// Add components and notify listeners
		this._components.add(component);
		this._componentsByName[component.name] = component;
				
		this.dispatch("componentAdded", this, component);

		return component;
	},
	
	// Removes an component from the GameObject
	removeComponent: function(component) {
		if(!this.hasComponent(component.name)) {
			return false;
		}
		
		this._objectList.nodeOf(component).remove();
		delete this._objectSet[component.name];
		
		if(myComponent.autoDispose) {
			myComponent.dispose();
		}

		this.dispatch("componentRemoved", this, component);
				
		return myObject;	
	},
	
	// Removes all components from the GameObject
	removeAllComponents: function()
	{
		var myNode = this._components.head;
		while (myNode) {
			var myComponent = myNode.data;
			
			this.dispatch("componentRemoved", this, myComponent);

			// Destroy the component
			if(myComponent.autoDispose) {
				myComponent.dispose();
			}
			
			myNode = myNode.next;
		}
		
		this._components = new LinkedList();
		this._componentsByName = new Object();	
	},
				
	// Boolean indicating the component has a gameobject
	hasComponent: function(name) {
		return this._componentsByName[name]!=null;
	},
		
	// Returns a gameobject by its name	
	componentByName: function(name) {
		return this._componentsByName[name];
	},

	clone: function(name) {
		var myGameObject = new Layer(name);

		var i = this._components.length;
		while(--i > -1)	{
			var myComponent = this._components[i].clone();
			myGameObject.addComponent(myComponent);
		}

		return myGameObject;
	},	
	
	// inheritDoc
	dispose: function() {
		this._super();

		this.removeListener("propertyChanged", this.onTransform );

		this._graphic.dispose();
		this._transform.dispose();
		this.removeAllComponents();

		this._components = null;
		this._componentsByName = null;
		this._graphic = null;
		this._transform = null;
		this._renderer = null;

		this.layer = null;
	}
});