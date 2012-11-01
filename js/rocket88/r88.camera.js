/**
 * @author patrickpietens
 *
 */

var Camera = EightyEightObject.extend({

    // inheritDoc
    init: function()
    {
        this._super();

        this._focalLength = 80;
        this._isStatic = true;

        this._x = 0;
        this._y = 0;
        this._rotation = 0;
        this._zoom = 1.0;

        this._viewport = new Rectangle();
        this._transformMatrix = new Matrix();
    },


    // inheritDoc
    ready: function()
    {
        this._super();

        var myNode = this._extensionList.head();
        while (myNode)
        {
            var myExtension = myNode.userData;
            myExtension.ready();

            myNode = myNode.next;
        }
    },


    focalLength: function(value)
    {
        if(value)
        {
            this._focalLength = value;
            return this;
        }

        return this._focalLength;
    },


    viewPort: function(value)
    {
        if(value)
        {
            this._viewport = value;
            return this;
        }


        return this._viewport;
    },


    isStatic: function(value)
    {
        return this._isStatic;
    },


    x: function()
    {
        return this._x;
    },


    y: function()
    {
        return this._y;
    },


    rotation: function()
    {
        return this._rotation;
    },


    zoom: function()
    {
        return this._zoom;
    },


    transformMatrix: function()
    {
        return this._transformMatrix.
            identity().
            translate(this._x, this._y).
            rotate(this._rotation * (Math.PI/180)).
            scale(this._zoom, this._zoom);
    }
});