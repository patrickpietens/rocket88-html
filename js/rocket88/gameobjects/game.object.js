rocket88.GameObject = rocket88.EventDispatcher.extend({

	// inheritDoc
	init: function(name) {
		this._super(name);

		// Private properties
		this._components 		= new rocket88.LinkedList();
		this._componentsByName 	= new Object();		

		this._transform			= new rocket88.TransformComponent();
		this._transform.gameobject = this;

		this._graphic			 = new rocket88.GraphicComponent();
		this._graphic.gameobject = this;

		// Public properties
		this.layer 				= undefined;
		this.group				= 0;

		// Getters
		this.__defineGetter__("type", function() { return "gameobject"; });
		this.__defineGetter__("components", function() { return this._components.toArray(); });
		this.__defineGetter__("transform", function() { return this._transform; });
		this.__defineGetter__("graphic", function() { return this._graphic; });	
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
		var myRenderer = rocket88.director.renderer;
		myRenderer.renderedGameObject = this;
				
		// Update all attached components
		var myNode = this._components.head;
		while (myNode) {
			var myComponent = myNode.data;
			if(myComponent.enabled) {
				myComponent.update();
			}
			
			myNode = myNode.next;
		}		

		this._transform.update();
		this._graphic.update();
	},

	
	// Adds an component to the gameobject
	addComponent: function(component) {
		if(component.isDisposed) {
			console.assert(!this.director.showErrors, "Unable to add disposed component: " + component.name + " to gameobject: " + this.name);
			return null;
		}

		if(this.hasComponent(component.name)) {
			console.assert(!this.director.showErrors, "Unable to add component: " + component.name + " to gameobject: " + this.name + " Required property 'name' must be unique");
			return null;
		}

		component.gameobject = this;
		if(this.isReady) {
			component.ready();
		}	

		// Add components and notify listeners
		this._components.add(component);
		this._componentsByName[component.name] = component;
				
		this.onComponentAdded(component);

		return component;
	},
	
	onComponentAdded: function(component) {
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

		this.onComponentRemoved(component);
				
		return myObject;	
	},
	
	// Removes all components from the GameObject
	removeAllComponents: function() {
		var myNode = this._components.head;
		while (myNode) {

			var myComponent = myNode.data;
			this.onComponentRemoved(myComponent);

			// Destroy the component
			if(myComponent.autoDispose) {
				myComponent.dispose();
			}
			
			myNode = myNode.next;
		}
		
		this._components = new LinkedList();
		this._componentsByName = new Object();	
	},

	onComponentRemoved: function(component) {
	},
				
	// Boolean indicating the component has a gameobject
	hasComponent: function(name) {
		return this._componentsByName[name]!=null;
	},
		
	// Returns a gameobject by its name	
	getComponentByName: function(name) {
		return this._componentsByName[name];
	},

	getComponentByTag: function(tag) {
		var myNode = this._layers.head;
		while (myNode) {
			var myComponent = myNode.data;
			if(myComponent.tag!=0 && myComponent.tag==tag) {
				return myComponent;
			}

			myNode = myNode.next;
		}

		return undefined;
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