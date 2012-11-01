var LinkedList = Class.extend({

	init: function()
	{
		// Private properties
		
		this._head = null;
		this._tail = null;
		this._size = 0;
	},
		
	
	// Adds node with userData to the list
	add: function(userData)
	{
		this._size++;	

		var myNode = new LinkedListNode(userData, this);
		if (this._head) 
		{
			myNode.prev = this._tail;
			this._tail.next = myNode;
			this._tail = myNode;
		}
		else 
		{
			this._head = myNode;
			this._tail = myNode;
		}
		
		return myNode;
	},
	
	
	// Inserts a node before another one
	insertBefore: function(userData, node)
	{
		this._size++;
		
		var myNode = new LinkedListNode(userData, this);
		if (node==this._head)
		{
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
	
	
	// Inserts a node 
	insertAfter: function(userData, node)
	{
		this._size++;
		
		var myNode = new LinkedListNode(userData, this);
		if (node==this._tail)
		{
			this._tail.next = myNode;
			this._tail = myNode;
			
			return myNode;
		}

		myNode.next = node.next;
		myNode.prev = node;
		
		node.next = myNode;
		
		return myNode;
	},	
	
	
	// Removes a node from the list
	remove: function(node)
	{
		// Remove head
		if (node==this._head)
		{
			this.shift();			
			return true;
		}
		
		// Remove tail
		else if(node==this._tail)
		{
			this.pop();
			return true;
		}
			
		// Search for the node
		var myNext = node.next;
		var myPrev = node.prev;
		
		myNext.prev = myPrev;
		myPrev.next = myNext;		
		
		this._size--;
		
		return node;
	},
	
	
	// Removes the first node from the list
	shift: function()
	{
		if (this._head)
		{
			this._size--;
			if (this._head == this._tail)
			{
				this._head = null;
				this._tail = null;
			}
			else
			{
				var myNode = this._head.next;
				myNode.prev = null;
				this._head = myNode;
			}
		}
		
		return this._head;
	},
			
	
	// Removes the last node from the list
	pop: function()
	{
		if (this._tail)
		{
			this._size--;
			if (this._head == this._tail)
			{
				this._head = null;
				this._tail = null;
			}
			else
			{
				var myNode = this._tail.prev;
				myNode.next = null;
				this._tail = myNode;
			}
		}
		
		return this._tail;
	},
		
		
	swap: function(nodeA, nodeB)
	{
		var myUserDataA = nodeA.userData;
		nodeA.userData = nodeB.userData;
		nodeB.userData = myUserDataA;
	//	this.insertBefore(nodeA, nodeB.next);
	//	this.insertBefore(nodeB, nodeA.next);		
	},


    sort: function(property)
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
    },

		
	// Returns a boolean indication if a node exists for userData	
	contains: function(userData)
	{
		var myNode = this._head;
		while (myNode)
		{
			if (myNode.userData == userData) 
			{
				return true;
			}
			
			myNode = myNode.next;
		}
		
		return false;
	},
	
					
	nodeOf: function(userData)
	{
		var myNode = this._head
		while (myNode)
		{
			if (myNode.userData == userData)
			{
				return myNode;
			}
				
			myNode = myNode.next;
		}
		
		return null;
	},
	
		
	size: function()
	{
		return this._size;
	},
	
	
	head: function()
	{
		return this._head;
	},
	

	tail: function()
	{
		return this._tail;
	},

	
	toArray: function()
	{
		var myArray = [];
		
		var myNode = this._head;
		while (myNode)
		{
			myArray.push(myNode.userData);
			myNode = myNode.next;
		}
		
		return myArray;
	}
});


var LinkedListNode = Class.extend({

	init: function(userData, list)
	{
		// Private proeprties
		this._list = list;
		this._id = new Date().getTime();
		
		// Public properties
		this.userData = userData;
		this.next = null;
		this.prev = null;
	},
		
	
	// Removes the node from its parent list
	remove: function()
	{
		this._list.remove(this);
	},
	
	
	list: function()
	{
		return this._list;
	}
});