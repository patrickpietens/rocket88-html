rocket88.Matrix = Class.extend({

	// inheritDoc
	init: function(a, b, c, d, tx, ty) {
		this.a = a || 1;
		this.b = b || 0;
		this.c = c || 0;
		this.d = d || 1;

		this.tx = tx || 0;
		this.ty = ty || 0;
	},
	
	identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;

		this.tx = 0;
		this.ty = 0;

		return this;
	},
	
	inverse: function() {
 		var determinant = this.a * this.d - this.b * this.c;

		var myA = this.d / determinant;
        var myB = -1 * this.b / determinant;
		var myC = -1 * this.c / determinant;
		var myD = this.a / determinant;
		var myTx = (this.c * this.ty - this.d * this.tx) / determinant;
		var myTy = (this.b * this.tx - this.a * this.ty) / determinant;

		this.a = myA;
		this.b = myB;
		this.c = myC;
		this.d = myD;
		this.tx = myTx;
		this.ty = myTy;

		return this;
	},

	multiply: function(matrix) {
		var myA = this.a * matrix.a + this.c * matrix.b;
        var myB = this.b * matrix.a + this.d * matrix.b;
		var myC = this.a * matrix.c + this.c * matrix.d;
		var myD = this.b * matrix.c + this.d * matrix.d;
		var myTx = this.a * matrix.tx + this.c * matrix.ty + this.tx;
		var myTy = this.b * matrix.tx + this.d * matrix.ty + this.ty;

		this.a = myA;
		this.b = myB;
		this.c = myC;
		this.d = myD;
		this.tx = myTx;
		this.ty = myTy;

		return this;		
	},

	translate: function(x, y) {
		// Create translation matrix
		var myMatrix = new rocket88.Matrix(1, 0, 0, 1, x, y);		
		this.multiply(myMatrix);

		return this;		
	},
	
	rotate: function(radians) {
		var mySine 		= Math.sin(radians);
		var myCosine 	= Math.cos(radians);

		// Create rotation matrix
		var myMatrix = new rocket88.Matrix(myCosine, mySine, -1 * mySine, myCosine);	
		this.multiply(myMatrix);

		return this;
	},
	
	scale: function(x, y) {
		// Create scale matrix
		var myMatrix = new rocket88.Matrix(x, 0, 0, y);
		this.multiply(myMatrix);

		return this;
	},

	clone: function() {
		return new rocket88.Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
	},

	toString: function() {
		return "[matrix a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + "]";
	},

	toCss: function() {
		var myMatrix = "matrix(" + this.a.toFixed(12) + "," + this.b.toFixed(12) + "," + this.c.toFixed(12) + "," + this.d.toFixed(12) + "," + this.tx.toFixed(12) + "," + this.ty.toFixed(12) + ")";
		var myCSS = "-moz-transform:" + myMatrix + ";-webkit-transform:" + myMatrix + ";-o-transform:" + myMatrix + ";transform:" + myMatrix + ";";

		return myCSS;
	}
});