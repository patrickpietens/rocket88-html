var Matrix = Class.extend({

	// inheritDoc
	init: function(a, b, c, d, tx, ty)
	{
		this._a = a || 1;
		this._b = b || 0;
		this._c = c || 0;
		this._d = d || 1;

		this._tx = tx || 0;
		this._ty = ty || 0;
	},
	
	
	// Sets each matrix property to a value that causes a null transformation
	identity: function()
	{
		this._a = 1;
		this._b = 0;
		this._c = 0;
		this._d = 1;

		this._tx = 0;
		this._ty = 0;

		return this;
	},
	

	inverse: function()
	{
 		var determinant = this.a * this.d - this.b * this.c;

		var myA = this.d / determinant;
        var myB = -1 * this.b / determinant;
		var myC = -1 * this.c / determinant;
		var myD = this.a / determinant;
		var myTx = (this.c * this.ty - this.d * this.tx) / determinant;
		var myTy = (this.b * this.tx - this.a * this.ty) / determinant;

		this._a = myA;
		this._b = myB;
		this._c = myC;
		this._d = myD;
		this._tx = myTx;
		this._ty = myTy;

		return this;
	},

	
	// multiplyenates a matrix with the current matrix, effectively combining the geometric effects of the two
	multiply: function(matrix)
	{
		var myA = this._a * matrix.a() + this._c * matrix.b();
        var myB = this._b * matrix.a() + this._d * matrix.b();
		var myC = this._a * matrix.c() + this._c * matrix.d();
		var myD = this._b * matrix.c() + this._d * matrix.d();
		var myTx = this._a * matrix.tx() + this._c * matrix.ty() + this._tx;
		var myTy = this._b * matrix.tx() + this._d * matrix.ty() + this._ty;

		this._a = myA;
		this._b = myB;
		this._c = myC;
		this._d = myD;
		this._tx = myTx;
		this._ty = myTy;

		return this;		
	},


	// Translates the matrix along the x and y axes
	translate: function(x, y)
	{
		// Create translation matrix
		var myMatrix = new Matrix(1, 0, 0, 1, x, y);		
		this.multiply(myMatrix);

		return this;		
	},
	
	
	// Applies a rotation transformation to the Matrix object
	rotate: function(radians)
	{
		var mySine 		= Math.sin(radians);
		var myCosine 	= Math.cos(radians);

		// Create rotation matrix
		var myMatrix = new Matrix(myCosine, mySine, -1 * mySine, myCosine);	
		this.multiply(myMatrix);

		return this;
	},
	
	
	// Applies a scaling transformation to the matrix
	scale: function(x, y)
	{
		// Create scale matrix
		var myMatrix = new Matrix(x, 0, 0, y);
		this.multiply(myMatrix);

		return this;
	},


	// Returns a new Matrix object that is a clone of this matrix
	clone: function()
	{
		return new Matrix(this._a, this._b, this._c, this._d, this._tx, this._ty);
	},
	
	
	// The value that affects the positioning of pixels along the x axis when scaling or rotating an image
	a: function(value)
	{
		if(value)
		{
			this._a = value;
			return this;
		}

		return this._a;
	},
	


	// The value that affects the positioning of pixels along the y axis when rotating or skewing an image
	b: function(value)
	{
		if(value)
		{
			this._b = value;
			return this;
		}

		return this._b;
	},


	// The value that affects the positioning of pixels along the x axis when rotating or skewing an image
	c: function(value)
	{
		if(value)
		{
			this._c = value;
			return this;
		}

		return this._c;
	},


	// The value that affects the positioning of pixels along the y axis when scaling or rotating an image
	d: function(value)
	{
		if(value)
		{
			this._d = value;
			return this;
		}

		return this._d;
	},


	// The distance by which to translate each point along the x axis
	tx: function(value)
	{
		if(value)
		{
			this._tx = value;
			return this;
		}

		return this._tx;
	},


	// The distance by which to translate each point along the y axis
	ty: function(value)
	{
		if(value)
		{
			this._ty = value;
			return this;
		}

		return this._ty;
	},


	toString: function()
	{
		return "[Matrix a=" + this._a + " b=" + this._b + " c=" + this._c + " d=" + this._d + " tx=" + this._tx + " ty=" + this._ty + "]";
	}
});