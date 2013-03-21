rocket88.Camera = rocket88.EventDispatcher.extend({

    // Executes when the object is instantiated
    init: function(name)
    {
        this._super(name);

        // Private properties
        this._position  = new rocket88.TransformComponent();

        // Public properties
        this.isStatic    = true;
        this.focalLength = 80;
        this.viewport    = new rocket88.Rectangle();

        // Getters
        this.__defineGetter__("type", function() { return "camera"; });
        this.__defineGetter__("position", function() { return this._position; });
    },


    clone: function(name) {
        var myCamera = new Camera(name);
        myCamera.isStatic    = this.isStatic;
        myCamera.focalLength = this.focalLength;
        myCamera.viewport    = this.viewport.clone();

        return myCamera;
    },

    
    dispose: function() {
        this._super();

        this.transform = null;
        this.viewport = null;
    },
});