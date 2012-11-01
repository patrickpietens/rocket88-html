window.toDegrees 	= function() { return 180/Math.PI; };
window.toRadians 	= function() { return Math.PI/180; };
window.toScreen 	= function() { return 30; };
window.toWorld		= function() { return 1/30; };


// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimationFrame = (function()
{
	return window.requestAnimationFrame      || 
	      window.webkitRequestAnimationFrame || 
	      window.mozRequestAnimationFrame    || 
	      window.oRequestAnimationFrame      || 
	      window.msRequestAnimationFrame     || 
	      
	      function( callback )
	      {
			window.setTimeout(callback, 1000 / 60);
	      };
})();



// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
if (!Function.prototype.bind) 
{  
	Function.prototype.bind = function (oThis) 
	{  
    	if (typeof this !== "function") 
    	{  
			throw new TypeError("Function.prototype.bind: what is trying to be bound is not callable");  
		}  
  
	    var aArgs 	= Array.prototype.slice.call(arguments, 1),   
        fToBind 	= this,   
        fNOP 		= function () {},  
        fBound 		= function () 
        {  
			return fToBind.apply(this instanceof fNOP  
                                 ? this  
                                 : oThis,  
                               aArgs.concat(Array.prototype.slice.call(arguments)));  
        };  
  
	    fNOP.prototype 		= this.prototype;  
    	fBound.prototype 	= new fNOP();  
  
	    return fBound;  
	};  
}



(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
  // The base Class implementation (does nothing)
  this.Class = function(){};
  
  // Create a new Class that inherits from this class
  Class.extend = function() {
    var _super = this.prototype;
    
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
    
	for ( var index in arguments)
	{
		var mySource = arguments[index];
		
	    // Copy the properties over onto the new prototype
	    for (var name in mySource) {
	      // Check if we're overwriting an existing function
	      prototype[name] = typeof mySource[name] == "function" && 
	        typeof _super[name] == "function" && fnTest.test(mySource[name]) ?
	        (function(name, fn){
	          return function() {
	            var tmp = this._super;
	            
	            // Add a new ._super() method that is the same method
	            // but on the super-class
	            this._super = _super[name];
	            
	            // The method only need to be bound temporarily, so we
	            // remove it when we're done executing
	            var ret = fn.apply(this, arguments);        
	            this._super = tmp;
	            
	            return ret;
	          };
	        })(name, mySource[name]) :
	        mySource[name];
	    }		
	}
    
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
    
    // Populate our constructed prototype object
    Class.prototype = prototype;
    
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;
    
    return Class;
  };
})();