window.$$ = window.$$ || {};
window.$$.func = window.$$.func || {};

(function (FUNC) {
    "use strict";
    FUNC.offsetScreen = function (node) {
        if (node === document.body) return {top:0, left:0};
        var top = node.offsetTop,
            left = node.offsetLeft;
        node = node.parentNode;
        while (node !== document.body) {
            top -= node.scrollTop;
            left -= node.scrollLeft;
            node = node.parentNode;
        }
        return { top: top, left: left };
    };
    
    FUNC.getMousePos = function (e, parent) {
        var pos;
        if (e.pageX == undefined) {
            pos = [e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY];
        } else {
            pos = [e.pageX, e.pageY];
        }
        if (parent != undefined) {
            var offset = FUNC.offsetScreen(parent);
            pos[0] -= offset.left;
            pos[1] -= offset.top;
        }
        return pos;
    };

})(window.$$.func);

window.$$ = window.$$ || {};
window.$$.draw = window.$$.draw || {};

(function (DRAW) {
	"use strict";

	var Basic = function (container, para) {
		this.container = container;
		this.para = para;
		this._canvas = document.createElement('canvas');
		this._ctx = this._canvas.getContext('2d');
		this.container.appendChild(this._canvas);
		this.resize();
	};
	Basic.prototype = Object.create(null);
	Basic.prototype.constructor = Basic;

	Basic.prototype.copy = function () {
		// copy the element and return the copy
	    var copy = new Basic(this.container, para);
	    copy._ctx.drawImage(this._canvas, 0, 0);
		return copy;
	};

	Basic.prototype.draw = function () {
	    // draw element
	};

	Basic.prototype.clear = function () {
	    // clear the canvas
	    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
	};

	Basic.prototype.getImage = function () {
	    // get the canvas image
	    var image = new Image();
	    image.src = this._canvas.toDataURL();
	    return image;
	};

	Basic.prototype.destroy = function () {
	    // destroy the element and release all memory
	    this._canvas = null;
	    this._ctx = null;
	};

	Basic.prototype.resize = function () {
	    // resize the canvas
	    this._canvas.width = this.container.offsetWidth;
	    this._canvas.height = this.container.offsetHeight;
	};

	DRAW.Basic = Basic;
})(window.$$.draw);

window.$$ = window.$$ || {};
window.$$.draw = window.$$.draw || {};

(function (DRAW, FUNC) {
    "use strict";

    var FreeDraw = function (container, para) {
        DRAW.Basic.call(this, container, para);
        this._setupBinding();
    };
    FreeDraw.prototype = Object.create(DRAW.Basic.prototype);
    FreeDraw.prototype.constructor = FreeDraw;

    FreeDraw.prototype.startDrawing = function (para) {
        // draw element
        var para = para || {};
        for (var i in para) this._ctx[i] = para[i];
        this._ctx.beginPath();
        this._lastPos = null;
        this.container.addEventListener("mousemove", this._fn_draw, false);
    };

    FreeDraw.prototype.stopDrawing = function () {
        this._lastPos = null;
        this.container.removeEventListener("mousemove", this._fn_draw, false);
    };

    FreeDraw.prototype._setupBinding = function () {
        var that = this;
        
        this._lastPos = null;
        this._fn_draw = function (e) {
            var mousePos = FUNC.getMousePos(e, this);
            if (that._lastPos === null) {
                that._lastPos = mousePos;
                that._ctx.moveTo(mousePos[0], mousePos[1]);
                return false;
            }
            console.log(mousePos);
            that._ctx.lineTo(mousePos[0], mousePos[1]);
            that._ctx.stroke();
            that._lastPos = mousePos;
        };
    };

    DRAW.freeDraw = FreeDraw;
})(window.$$.draw, window.$$.func);

//# sourceMappingURL=Drawing.js.map
