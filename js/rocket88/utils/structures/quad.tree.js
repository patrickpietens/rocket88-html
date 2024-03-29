rocket88.QuadTree = Class.extends({

    init: function(size) {
        this.size = size;
        this.maxDepth = 5;
        this.maxChildren = 10;

        this.root = new rocket88.Node(this.size, this.maxDepth, this.maxChildren);
    },


    insert: function(gameobject) {
    },


    retrieve: function() {
    },


    clear: function() {
    },
});


rocket88.Node = Class.extends({
    init: function(bounds, level, maxChildren, maxDepth) {
        this.bounds = bounds;
        this.level = level;
        this.maxChildren = maxChildren;

        this.nodes = new rocket88.LinkedList();
        this.items = new rocket88.LinkedList();
    }
});


/**
* Inserts an item into the QuadTree.
* @method insert
* @param {Object|Array} item The item or Array of items to be inserted into the QuadTree. The item should expose x, y 
* properties that represents its position in 2D space.
**/
QuadTree.prototype.insert = function(item)
{
    if(item instanceof Array)
    {
        var len = item.length;
        
        for(var i = 0; i < len; i++)
        {
            this.root.insert(item[i]);
        }
    }
    else
    {
        this.root.insert(item);
    }
}

/**
* Clears all nodes and children from the QuadTree
* @method clear
**/
QuadTree.prototype.clear = function()
{
    this.root.clear();
}

/**
* Retrieves all items / points in the same node as the specified item / point. If the specified item
* overlaps the bounds of a node, then all children in both nodes will be returned.
* @method retrieve
* @param {Object} item An object representing a 2D coordinate point (with x, y properties), or a shape
* with dimensions (x, y, width, height) properties.
**/
QuadTree.prototype.retrieve = function(item)
{
    //get a copy of the array of items
    var out = this.root.retrieve(item).slice(0);
    return out;
}

/************** Node ********************/


function Node(bounds, depth, maxDepth, maxChildren)
{
    this._bounds = bounds;
    this.children = [];
    this.nodes = [];
    
    if(maxChildren)
    {
        this._maxChildren = maxChildren;
        
    }
    
    if(maxDepth)
    {
        this._maxDepth = maxDepth;
    }
    
    if(depth)
    {
        this._depth = depth;
    }
}

//subnodes
Node.prototype.nodes = null;
Node.prototype._classConstructor = Node;

//children contained directly in the node
Node.prototype.children = null;
Node.prototype._bounds = null;

//read only
Node.prototype._depth = 0;

Node.prototype._maxChildren = 4;
Node.prototype._maxDepth = 4;

Node.TOP_LEFT = 0;
Node.TOP_RIGHT = 1;
Node.BOTTOM_LEFT = 2;
Node.BOTTOM_RIGHT = 3;


Node.prototype.insert = function(item)
{
    if(this.nodes.length)
    {
        var index = this._findIndex(item);
        
        this.nodes[index].insert(item);
        
        return;
    }

    this.children.push(item);

    var len = this.children.length;
    if(!(this._depth >= this._maxDepth) && 
        len > this._maxChildren)
    {
        this.subdivide();
        
        for(var i = 0; i < len; i++)
        {
            this.insert(this.children[i]);
        }
        
        this.children.length = 0;
    }
}

Node.prototype.retrieve = function(item)
{
    if(this.nodes.length)
    {
        var index = this._findIndex(item);
        
        return this.nodes[index].retrieve(item);
    }
    
    return this.children;
}

Node.prototype._findIndex = function(item)
{
    var b = this._bounds;
    var left = (item.x > b.x + b.width / 2)? false : true;
    var top = (item.y > b.y + b.height / 2)? false : true;
    
    //top left
    var index = Node.TOP_LEFT;
    if(left)
    {
        //left side
        if(!top)
        {
            //bottom left
            index = Node.BOTTOM_LEFT;
        }
    }
    else
    {
        //right side
        if(top)
        {
            //top right
            index = Node.TOP_RIGHT;
        }
        else
        {
            //bottom right
            index = Node.BOTTOM_RIGHT;
        }
    }
    
    return index;
}


Node.prototype.subdivide = function()
{
    var depth = this._depth + 1;
    
    var bx = this._bounds.x;
    var by = this._bounds.y;
    
    //floor the values
    var b_w_h = (this._bounds.width / 2)|0;
    var b_h_h = (this._bounds.height / 2)|0;
    var bx_b_w_h = bx + b_w_h;
    var by_b_h_h = by + b_h_h;

    //top left
    this.nodes[Node.TOP_LEFT] = new this._classConstructor({
        x:bx, 
        y:by, 
        width:b_w_h, 
        height:b_h_h
    }, 
    depth);
    
    //top right
    this.nodes[Node.TOP_RIGHT] = new this._classConstructor({
        x:bx_b_w_h,
        y:by,
        width:b_w_h, 
        height:b_h_h
    },
    depth);
    
    //bottom left
    this.nodes[Node.BOTTOM_LEFT] = new this._classConstructor({
        x:bx,
        y:by_b_h_h,
        width:b_w_h, 
        height:b_h_h
    },
    depth);
    
    
    //bottom right
    this.nodes[Node.BOTTOM_RIGHT] = new this._classConstructor({
        x:bx_b_w_h, 
        y:by_b_h_h,
        width:b_w_h, 
        height:b_h_h
    },
    depth); 
}

Node.prototype.clear = function()
{   
    this.children.length = 0;
    
    var len = this.nodes.length;
    for(var i = 0; i < len; i++)
    {
        this.nodes[i].clear();
    }
    
    this.nodes.length = 0;
}


}(window));