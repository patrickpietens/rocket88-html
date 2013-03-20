var Player = rocket88.InteractiveObject.extend({

	init: function() {
		this._super("player");
	},

	ready: function() {
		this._super();

		var myData = rocket88.assetStore.getAsset("js/examples/testbed/data/data.json");
		var mySheet = new rocket88.Spritesheet(myData);
		this.graphic.sprite = new rocket88.AnimatedSprite("js/examples/testbed/images/data.png", mySheet);

		this.physics.addCircle(30);
		this.physics.isFixedRotation = true;

		this.transform.x = 250;
		this.transform.scale = 0.5;	
	},
 
	update: function() {
		this._super();

		// Touches ground
		if(this.collisions.touchesGroup(2))
		{
			// Jump!
			if(this.keys.keyIsDown(32)) {
				this.physics.applyImpulse(0, -25);
			}

			// Go left
			if(this.keys.keyIsDown(37))
			{
				this.transform.flipX(false);
				this.physics.applyForce(-65, 0);
				this.graphic.sprite.play("Untitled");
			}

			// Go Right
			else if(this.keys.keyIsDown(39))
			{
				this.transform.flipX(true);
				this.physics.applyForce(65, 0);
				this.graphic.sprite.play("Untitled");
			}
			else
			{
				this.graphic.sprite.stopAtTheEndOfCurrentAnimation();
			}				
		}
	}
});