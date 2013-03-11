var Player = InteractiveObject.extend({

	init: function() {
		this._super("player");
	},

	ready: function() {
		this._super();
		var myData = {"frames": {

			"Untitled-20001.png":
			{
				"frame": {"x":0,"y":0,"w":94,"h":136},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":160,"y":220,"w":94,"h":136},
				"sourceSize": {"w":94,"h":136}
			},
			"Untitled-20002.png":
			{
				"frame": {"x":94,"y":0,"w":94,"h":136},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":160,"y":220,"w":94,"h":136},
				"sourceSize": {"w":94,"h":136}
			},
			"Untitled-20003.png":
			{
				"frame": {"x":188,"y":0,"w":92,"h":136},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":161,"y":220,"w":92,"h":136},
				"sourceSize": {"w":92,"h":136}
			},
			"Untitled-20004.png":
			{
				"frame": {"x":280,"y":0,"w":92,"h":136},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":161,"y":220,"w":92,"h":136},
				"sourceSize": {"w":92,"h":136}
			},
			"Untitled-20005.png":
			{
				"frame": {"x":372,"y":0,"w":92,"h":138},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":163,"y":218,"w":92,"h":138},
				"sourceSize": {"w":92,"h":138}
			},
			"Untitled-20006.png":
			{
				"frame": {"x":0,"y":138,"w":92,"h":138},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":163,"y":218,"w":92,"h":138},
				"sourceSize": {"w":92,"h":138}
			},
			"Untitled-20007.png":
			{
				"frame": {"x":92,"y":138,"w":102,"h":136},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":158,"y":220,"w":102,"h":136},
				"sourceSize": {"w":102,"h":136}
			},
			"Untitled-20008.png":
			{
				"frame": {"x":194,"y":138,"w":102,"h":136},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":158,"y":220,"w":102,"h":136},
				"sourceSize": {"w":102,"h":136}
			},
			"Untitled-20009.png":
			{
				"frame": {"x":296,"y":138,"w":120,"h":132},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":148,"y":221,"w":120,"h":132},
				"sourceSize": {"w":120,"h":132}
			},
			"Untitled-20010.png":
			{
				"frame": {"x":0,"y":276,"w":120,"h":132},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":148,"y":221,"w":120,"h":132},
				"sourceSize": {"w":120,"h":132}
			},
			"Untitled-20011.png":
			{
				"frame": {"x":120,"y":276,"w":134,"h":134},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":138,"y":222,"w":134,"h":134},
				"sourceSize": {"w":134,"h":134}
			},
			"Untitled-20012.png":
			{
				"frame": {"x":254,"y":276,"w":134,"h":134},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":138,"y":222,"w":134,"h":134},
				"sourceSize": {"w":134,"h":134}
			},
			"Untitled-20013.png":
			{
				"frame": {"x":388,"y":276,"w":112,"h":136},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":153,"y":221,"w":112,"h":136},
				"sourceSize": {"w":112,"h":136}
			},
			"Untitled-20014.png":
			{
				"frame": {"x":0,"y":412,"w":112,"h":136},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":153,"y":221,"w":112,"h":136},
				"sourceSize": {"w":112,"h":136}
			},
			"Untitled-20015.png":
			{
				"frame": {"x":112,"y":412,"w":92,"h":136},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":160,"y":221,"w":92,"h":136},
				"sourceSize": {"w":92,"h":136}
			},
			"Untitled-20016.png":
			{
				"frame": {"x":204,"y":412,"w":92,"h":136},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":160,"y":221,"w":92,"h":136},
				"sourceSize": {"w":92,"h":136}
			},
			"Untitled-20017.png":
			{
				"frame": {"x":296,"y":412,"w":92,"h":136},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":161,"y":221,"w":92,"h":136},
				"sourceSize": {"w":92,"h":136}
			},
			"Untitled-20018.png":
			{
				"frame": {"x":388,"y":412,"w":92,"h":136},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":161,"y":221,"w":92,"h":136},
				"sourceSize": {"w":92,"h":136}
			},
			"Untitled-20019.png":
			{
				"frame": {"x":0,"y":548,"w":92,"h":136},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":160,"y":221,"w":92,"h":136},
				"sourceSize": {"w":92,"h":136}
			},
			"Untitled-20020.png":
			{
				"frame": {"x":92,"y":548,"w":92,"h":136},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":160,"y":221,"w":92,"h":136},
				"sourceSize": {"w":92,"h":136}
			},
			"Untitled-20021.png":
			{
				"frame": {"x":184,"y":548,"w":92,"h":136},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":160,"y":221,"w":92,"h":136},
				"sourceSize": {"w":92,"h":136}
			},
			"Untitled-20022.png":
			{
				"frame": {"x":276,"y":548,"w":92,"h":136},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":160,"y":221,"w":92,"h":136},
				"sourceSize": {"w":92,"h":136}
			},
			"Untitled-20023.png":
			{
				"frame": {"x":368,"y":548,"w":92,"h":134},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":159,"y":221,"w":92,"h":134},
				"sourceSize": {"w":92,"h":134}
			},
			"Untitled-20024.png":
			{
				"frame": {"x":0,"y":684,"w":92,"h":134},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":159,"y":221,"w":92,"h":134},
				"sourceSize": {"w":92,"h":134}
			},
			"Untitled-20025.png":
			{
				"frame": {"x":92,"y":684,"w":94,"h":134},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":156,"y":222,"w":94,"h":134},
				"sourceSize": {"w":94,"h":134}
			},
			"Untitled-20026.png":
			{
				"frame": {"x":186,"y":684,"w":94,"h":134},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":156,"y":222,"w":94,"h":134},
				"sourceSize": {"w":94,"h":134}
			},
			"Untitled-20027.png":
			{
				"frame": {"x":280,"y":684,"w":92,"h":134},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":159,"y":222,"w":92,"h":134},
				"sourceSize": {"w":92,"h":134}
			},
			"Untitled-20028.png":
			{
				"frame": {"x":372,"y":684,"w":92,"h":134},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {"x":159,"y":222,"w":92,"h":134},
				"sourceSize": {"w":92,"h":134}
			}},
			"meta": {
				"app": "http://www.texturepacker.com",
				"version": "1.0",
				"image": "data.png",
				"format": "RGBA8888",
				"size": {"w":500,"h":818},
				"scale": "1"
			}
		};

		var mySheet = new Spritesheet(myData);
		this.graphic.sprite = new AnimatedSprite("js/examples/testbed/images/data.png", mySheet);
		this.graphic.sprite.play("Untitled");

		this.transform.x = 250;
		this.transform.degrees = 35;
		this.transform.scale = 0.5;	
		this.transform.flipX();

		this.physics.addBox(new Size(50, 65));

		this.keys.onLeftArrow = delegate(this, this.onLeftArrow);
		this.keys.onRightArrow = delegate(this, this.onRightArrow);
		this.keys.onSpacebar = delegate(this, this.onSpacebar);

		this.collision.onCollision = delegate(this, this.onCollision);
	},

	onLeftArrow: function(direction) {
		if(direction=="down") {
			console.log("onLeftArrow");
		}
	},

	onRightArrow: function(direction) {
		if(direction=="down") {
			console.log("onRightArrow");
		}
	},

	onSpacebar: function(direction) {
		if(direction=="down") {
			if(this.collision.hasContact("ground"))
			{
			}
		}
	},

	onCollision: function(gameobject, position, impact) {
		console.log("onCollision");
	}
});