(function(rocket88) {
	"use strict";

	rocket88.ObjectContainer = rocket88.Object.extends({
		init: function(name) {
			this._super(name);

			this._type = "object.container";
			this._children = new rocket88.LinkedList();
			this._childrenByName = new Object();

			this.parent = undefined;
		},


		ready: function() {
			this._super();

			var myNode = this._children.head;
			while (myNode) {
				myNode.data.ready();
				myNode = myNode.next;
			}
		},


		update: function() {
			this._super();

			var myNode = this._children.head;
			while (myNode) {
				myNode.data.update();
				myNode = myNode.next;
			}
		},


		addChild: function(child) {	
			if(child.isDisposed) {
				console.assert(!rocket88.showErrors, "Unable to add disposed child: " + child.name + " to container: " + this.name);
				return this;
			}

			// Fail if the child doesn't have a unique name
			if(this.hasChild(child.name)) {
				console.assert(!rocket88.showErrors, "Unable to add child: " + child.name + " to container: " + this.name + " Required property 'name' must be unique");
				return this;
			}
		
			child.parent = this;

			if(this.isReady) {
				child.ready();
			}

			this._children.add(child);
			this._childrenByName[child.name] = child;
	        
	        return child;
		},


		insertChildAbove: function(childA, childB) {
			if(this.hasChild(childB.name)) {
				console.assert(!rocket88.showErrors, "Unable to add child: " + childA.name + " above child: " + childB.name + " The latter doesn't exists in container: " + this.name);
				return this;
			}
			
			if(this.isReady) {
				childA.ready();
			}

			this._children.insertAfter(childA, myNode);
			this._childrenByName[childA.name] = childA;
			
			return this;
		},


		insertChildBelow: function(childA, childB) {
			if(this.hasChild(childB.name)) {
				console.assert(!rocket88.showErrors, "Unable to add child: " + childA.name + " below child: " + childB.name + " The latter doesn't exists in container: " + this.name);
				return this;
			}
			
			if(this.isReady) {
				childA.ready();
			}

			this._children.insertBefore(childA, myNode);
			this._childrenByName[childA.name] = childA;
			
			return this;
		},


		swapChildren: function(childA, childB) {
			if(!this.hasChild(childA.name) || !this.hasChild(childB.name)) {
				console.assert(!rocket88.showErrors, "Unable to swap child: " + childA.name + " with child:" + childB.name);
				return this;
			}
			
			var myNodeA = this._children.nodeOf(childA);
			var myNodeB = this._children.nodeOf(childB);
			this._children.swap(myNodeA, myNodeB);
		
			return this;		
		},


		removeChild: function(child) {	
			if(!this.hasChild(child.name)) {
				console.assert(!rocket88.showErrors, "Unable to remove child: " + child.name + " from container: " + this.name + " child doesn't exists in container: " + this.name);
				return this;
			}

			this._children.nodeOf(child).remove();
			delete this._childrenByName[child.name];

			if(child.autoDispose) {
				child.dispose();
			}

			return this;
		},


		removeAllChildren: function(name) {
			var myNode = this._children.head;
			while (myNode) {

				var myChild = myNode.data;
				if(myChild.autoDispose) {
					myChild.dispose();
				}

				var myNextNode = myNode.next;
				this._children.remove(myNode);
				myNode = myNextNode;
			}

			this._childrenByName = new Object();
		},


		getChildByName: function(name) {
			return this._childrenByName[name];
		},


		getChildByTag: function(tag) {
			var myNode = this._children.head;
			while (myNode) {
				var myChild = myNode.data;
				if(myChild.tag>0 && myChild.tag==tag) {
					return myChild;
				}

				myNode = myNode.next;
			}

			return null;
		},


		hasChild: function(name) {	
			return this._childrenByName[name] != null;
		},
	    

		dispose: function() {
			this._super();

			this.removeAllChildren();
			this._collisionSolver.dispose();

			delete this._children;
			delete this._childrenByName;
		},


	    defineProperties: function() {
	    	this._super();

			// Getters/ setters
	    	Object.defineProperties(this, {
	    		children: { 
					enumerable: true, 
	    			get: function() { return this._children.toArray(); }
	    		},
	    	});	    	
		},		
	});
})( use("rocket88") );