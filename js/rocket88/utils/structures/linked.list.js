(function(rocket88) {
	"use strict";

	rocket88.LinkedList = Class.extends({
		init: function() {

			this._head = null;
			this._tail = null;
			this._size = 0;
		},

			
		add: function(data) {
			// Adds node with data to the list
			this._size++;	

			var myNode = new rocket88.LinkedListNode(data, this);
			if (this._head)  {
				myNode.prev = this._tail;
				this._tail.next = myNode;
				this._tail = myNode;
			}
			else {
				this._head = myNode;
				this._tail = myNode;
			}
			
			return myNode;
		},
		

		insertBefore: function(data, node) {
			// Inserts a node before another one
			this._size++;
			
			var myNode = new rocket88.LinkedListNode(data, this);
			if (node==this._head) {
				myNode.next = this._head;
				this._head.prev = myNode;
				this._head = myNode;
				
				return myNode;
			}
			
			// Search for the node
			var myPreviousNode = node.prev;
			
			myPreviousNode.next = myNode;
			node.prev = myNode;
			
			myNode.prev = myPreviousNode;
			myNode.next = node;
			
			return myNode;
		},
		
		
		insertAfter: function(data, node) {
			// Inserts a node 
			this._size++;
			
			var myNode = new rocket88.LinkedListNode(data, this);
			if (node==this._tail) {
				this._tail.next = myNode;
				this._tail = myNode;
				
				return myNode;
			}

			myNode.next = node.next;
			myNode.prev = node;
			
			node.next = myNode;
			
			return myNode;
		},	
		
		
		remove: function(node) {
			// Removes a node from the list
			if (node==this._head) {
				this.shift();			
				return true;
			}
			
			// Remove tail
			else if(node==this._tail) {
				this.pop();
				return true;
			}
				
			// Search for the node
			var myNext = node.next;
			var myPrev = node.prev;
			
			myNext.prev = myPrev;
			myPrev.next = myNext;		
			
			this._size--;
			node.dispose();

			return node;
		},
		
		
		shift: function() {
			// Removes the first node from the list
			if (this._head) {
				this._size--;
				if (this._head == this._tail) {
					this._head = null;
					this._tail = null;
				}
				else {
					var myNode = this._head.next;
					myNode.prev = null;
					this._head = myNode;
				}
			}
			
			return this._head;
		},
		

		pop: function() {
			// Removes the last node from the list
			if (this._tail) {
				this._size--;
				if (this._head == this._tail) {
					this._head = null;
					this._tail = null;
				}
				else {
					var myNode = this._tail.prev;
					myNode.next = null;
					this._tail = myNode;
				}
			}
			
			return this._tail;
		},
			

		swap: function(nodeA, nodeB) {
			var myDataA = nodeA.data;
			nodeA.data = nodeB.data;
			nodeB.data = myDataA;
		},


	    sort: function(property) {
	        var myNode = this._extensionList.head();
	        while (myNode) {
	            var myExtension = myNode.data;

	            // Destroy the extension
	            if(myExtension.autoDestroy()) {
	                myExtension.destroy();
	            }

	            myNode = myNode.next;
	        }
	    },


		// Returns a boolean indication if a node exists for data	
		contains: function(data)
		{
			var myNode = this._head;
			while (myNode) {
				if (myNode.data == data) {
					return true;
				}
				
				myNode = myNode.next;
			}
			
			return false;
		},

				
		empty: function() {
			var myNode = this.head;
			while (myNode) {
				var myNextNode = myNode.next;
				this.remove(myNode);
				myNode = myNextNode;
			}
		},


		nodeOf: function(data) {
			var myNode = this._head
			while (myNode) {
				if (myNode.data == data) {
					return myNode;
				}
					
				myNode = myNode.next;
			}
			
			return null;
		},
		

		toArray: function() {
			var myArray = [];
			
			var myNode = this._head;
			while (myNode) {
				myArray.push(myNode.data);
				myNode = myNode.next;
			}
			
			return myArray;
		},


		defineProperties: function() {
			var myProperties = {
				head: { 
					enumerable: true, 
					get: function() { return this._head; }
				},

				tail: { 
					enumerable: true, 
					get: function() { return this._tail; }
				},

				size: { 
					enumerable: true, 
					get: function() { return this._size; }
				},							
			};

			Object.defineProperties(this, myProperties);
		},
	});


	rocket88.LinkedListNode = Class.extends({
		init: function(data, list) {
			this._list = list;
			
			this.data = data;
			this.next = null;
			this.prev = null;

			this.__defineGetter__("list", function() { return this._list });
		},
			
		
		remove: function() {
			this._list.remove(this);
		},


		dispose: function () {
			this._list = null;

			this.data = null;
			this.next = null;
			this.prev = null;
		}
	});

	rocket88.LinkedList.create = function() {
		return new rocket88.LinkedList();
	};
})( use("rocket88") );