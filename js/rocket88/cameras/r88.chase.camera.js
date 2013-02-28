/**
 * @author patrickpietens
 *
 */

var ChaseCamera = Camera.extend({

    init: function(target) {
        // inheritDoc
        this._super("ChaseCamera");

        // Public properties
        this.isStatic = false;
        this.damping = 1.0;
        this.target = target;
    },


    update: function()
    {
        this._super();

        if(!this._target)
        {
            console.warn("ChaseCamera requires a target GameObject. Set target or use a different Camera.");
            return;
        }

        var myX = this.target.transform().x();
        var myY = this.target.transform().y();

        if (myX > this.x + this.viewport.right())
        {
            myX -= _roamingArea.right();
            this.x += (myX - this._x) * this._damping;
        }
        else if (myX < this._x + this._viewport.left())
        {
            myX -= this._viewport.left();
            this._x += (myX - this._x) * this._damping;
        }

        if (myY > this._y + this._viewport.bottom())
        {
            myY -= this._viewport.bottom();
            this._y += (myY - this._y) * this._damping;
        }
        else if (myY < this._y + this._viewport.top())
        {
            myY -= this._viewport.top();
            this._y += (myY - this._y) * this._damping;
        }
    },

    damping: function(value)
    {
        if(damping)
        {
            this._damping = value;
            return this;
        }

        return this._damping;
    },


    target: function(value)
    {
        if(value)
        {
            this._target = value;
            return this;
        }

        return this._target;
    },


    destroy: function()
    {
        if(this.isDestroyed())
        {
            this._target = null;
        }

        this._super();
    }
});