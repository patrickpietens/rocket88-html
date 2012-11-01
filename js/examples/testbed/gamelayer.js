var GameLayer = Layer.extend({

	create: function()
	{
		this._super();

		var myPlayer = new Player("player");
		this.addObject(myPlayer);
	}
});