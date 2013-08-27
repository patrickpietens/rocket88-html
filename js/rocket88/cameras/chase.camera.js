(function(rocket88) {
    "use strict";

    rocket88.ChaseCamera = rocket88.Camera.extends({
        init: function(target) {
            this._super("chase.camera");

            if(target==undefined) {
                throw ReferenceError("Required parameter 'target' is missing");
            }

            this._super("chase.camera");

            // Public properties
            this.target = target;
            this.isStatic = false;

            this.damping = 1.0;
            this.viewport = new rocket88.Rectangle();        
        },


        update: function() {
            this._super();

            var myX = this.target.transform.x;
            var myY = this.target.transform.y;

            if (myX > this.position.x + this.viewport.right) {
                myX -= this.viewport.right;
                this.position.x += (myX - this.position.x) * this.damping;
            }
            else if (myX < this.position.x + this.viewport.left) {
                myX -= this.viewport.left;
                this.position.x += (myX - this.position.x) * this.damping;
            }

            if (myY > this.position.y + this.viewport.bottom) {
                myY -= this.viewport.bottom;
                this.position.y += (myY - this.position.y) * this.damping;
            }
            else if (myY < this.position.y + this.viewport.top) {
                myY -= this.viewport.top;
                this.position.y += (myY - this.position.y) * this.damping;
            }

            //console.log(this.position.x, this.position.y);
        },


        damping: function(value) {
            if(damping) {
                this._damping = value;
                return this;
            }

            return this._damping;
        },


        target: function(value) {
            if(value) {
                this._target = value;
                return this;
            }

            return this._target;
        },


        dispose: function() {
            this._super();
            this._target = null;
        }
    });
})( use("rocket88") );