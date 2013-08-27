(function(rocket88) {
    "use strict";

    rocket88.Camera = rocket88.Object.extends({
        init: function(name) {
            this._super(name);
            this._type = "camera";

            this.isStatic = true;
            this.focalLength = 80;

            this._zoom = 1;
            this._inversedZoom = 1;
            
            this._transform = new rocket88.TransformComponent();
            this._transform.parent = this;
        },


        update: function() {
            this._super();
            this._transform.update();
        },

        
        dispose: function() {
            this._super();

            delete this.transform;
            delete this.viewport;
        },


        defineProperties: function() {
            this._super();
            
            var myProperties = {
                zoom: {
                    enumerable: true,
                    get: function() { return this._zoom; },
                    set: function(zoom) { 
                        this._zoom = zoom;
                        this._inversedZoom = 1 / zoom;
                    }
                },

                inversedZoom: {
                    enumerable: true,
                    get: function() { return this._inversedZoom }
                },
                
                transform: {
                    enumerable: true, 
                    get: function() { return this._transform; } 
                }
            }

            Object.defineProperties(this, myProperties);
        },
    });
})( use("rocket88") );