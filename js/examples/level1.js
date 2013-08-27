(function(rocket88) {
	var Level1 = rocket88.Scene.extends({
		ready: function() {
			this._super("");
			this.gameLayer = this.addChild( new GameLayer("gamelayer") );
			this.camera.transform.x = 100;
		},
	});


	var GameLayer = rocket88.Layer.extends({
		ready: function() {
			this._super();
			this.player = this.addChild( new Player("player") );	
		}
	});


	var Player = rocket88.GameObject.extends({
		ready: function() {
			this._super();

			this.graphic.sprite = new rocket88.AnimatedSprite("img/data.png", "data/data.json");;
			this.graphic.sprite.framerate = 60;
			this.graphic.sprite.transform.degrees = 50;
			//this.graphic.sprite.transform.scale = 0.5;
			this.graphic.sprite.play("Untitled");

			this.transform.degrees = 45;
			this.transform.x = -100;
			this.transform.y = 200;
		},


		update: function() {
			this._super();
			this.transform.degrees++;
		}
	});


	var myStage = document.getElementById("game");
	var myDirector = new rocket88.Director(myStage);
	myDirector.scene = new Level1("level1");

	var myLoader = rocket88.assetLoader;
	myLoader.addAssets(["img/data.png", "data/data.json"]);
	myLoader.onComplete = function() {
		myDirector.liftOff();
	}

	myLoader.downloadAll();

})( use("rocket88") );