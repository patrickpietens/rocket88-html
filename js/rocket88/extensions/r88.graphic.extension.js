/**
 * @author patrickpietens
 *
 */
 
var GraphicExtension = Extension.extend({

	init: function()
	{
		this._super("graphic");
		
		this._spriteList = new LinkedList();
		this._spriteSet = new Object();
	},
	
	
	update: function()
	{
		this._super();
		
		var myNode = this._spriteList.head();
		while (myNode)
		{
			var mySprite = myNode.userData;
			if(mySprite.image())
			{
				mySprite.update();
				this.renderer().drawSprite(mySprite, this.gameObject());
			}
			
			myNode = myNode.next;
		}
	},		
	
	
	addSprite: function(sprite)
	{
		this._spriteList.add(sprite);
	},
	
	
	// Inserts a sprite above target object
	insertSpriteAbove: function(sprite, above)
	{
	},
	
	
	// Inserts a sprite underneath target object
	insertSpriteBelow: function(sprite, below)
	{
	},
	
		
	removeSprite: function()
	{
	},
	
	
	removeAllSprites: function()
	{
	}
});