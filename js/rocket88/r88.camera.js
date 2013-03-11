var Camera = Object88.extend({

    // Executes when the object is instantiated
    init: function(name)
    {
        this._super(name);

        // Private properties
        this._transform  = new TransformComponent();

        // Public properties
        this.isStatic    = true;
        this.focalLength = 80;
        this.viewport    = new Rectangle();

        // Getters
        this.__defineGetter__("type", function() { return "camera"; });
        this.__defineGetter__("transform", function() { return this._transform; });
    },


    clone: function(name) {
        var myCamera = new Camera(name);
        myCamera.isStatic    = this.isStatic;
        myCamera.focalLength = this.focalLength;
        myCamera.viewport    = this.viewport.clone();
        myCamera.transform   = this._transform.clone();

        return myCamera;
    },

    
    dispose: function() {
        this._super();

        this.transform = null;
        this.viewport = null;
    },
});