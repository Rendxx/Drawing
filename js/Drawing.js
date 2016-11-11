window.$$ = window.$$ || {};
window.$$.Func = window.$$.Func || {};

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

})(window.$$.Func);

window.$$ = window.$$ || {};
window.$$.Draw = window.$$.Draw || {};

(function (DRAW) {
	"use strict";

	var Basic = function (container, para) {
		this.container = container;
		this.para = para;
		this._canvas = document.createElement('canvas');
		this._ctx = this._canvas.getContext('2d');
		this.container.appendChild(this._canvas);
		if (this.container.style.position != "relative" && this.container.style.position != "absolute") this.container.style.position = "relative";
		this._canvas.style.position = 'absolute';
		this._canvas.style.top = '0';
		this._canvas.style.left = '0';
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
})(window.$$.Draw);

window.$$ = window.$$ || {};
window.$$.Draw = window.$$.Draw || {};

(function (DRAW) {
    "use strict";

    var Line = function (container, para) {
        DRAW.Basic.call(this, container, para);
        this.start = null;
        this.end = null;
    };
    Line.prototype = Object.create(DRAW.Basic.prototype);
    Line.prototype.constructor = Line;

    Line.prototype.copy = function () {
        var copy = DRAW.Basic.prototype.copy.call(this);
        copy.start = this.start;
        copy.end = this.end;
    };

    Line.prototype.draw = function (start, end, para) {
        // draw element
        if (start == null || end == null) throw new Error("parameter error");
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this.start = start;
        this.end = end;

        var para = para || {};
        for (var i in para) this._ctx[i] = para[i];
        var image = para.image || null;

        if (image == null) {
            this._ctx.beginPath();
            this._ctx.moveTo(start[0], start[1]);
            this._ctx.lineTo(end[0], end[1]);
            this._ctx.stroke();
            return;
        }
        
        var lineWidth = para.lineWidth || 1;
        var x = start[0] - end[0];
        var y = start[1] - end[1];
        var len = Math.sqrt(x*x+y*y);
        var angle = Math.atan2(x, -y);
        var offset = -image.width / 2;
        var wid = Math.min(image.width, lineWidth);
        var left = Math.max((image.width - lineWidth)/2, 0);

        this._ctx.translate(start[0], start[1]);
        this._ctx.rotate(angle);

        this._ctx.translate(offset, 0);
        this._ctx.fillStyle = this._ctx.createPattern(image, 'repeat-y');
        this._ctx.fillRect(left, 0, wid, len);
        this._ctx.translate(-offset, 0);

        this._ctx.rotate(-angle);
        this._ctx.translate(-start[0] , -start[1]);
    };

    DRAW.Line = Line;
})(window.$$.Draw);

window.$$ = window.$$ || {};
window.$$.Draw = window.$$.Draw || {};

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
        this._startPos = null;
        this._count = 0;
        this._controlPos = null;
        this.container.addEventListener("mousemove", this._fn_draw, false);
    };

    FreeDraw.prototype.stopDrawing = function () {
        this._startPos = null;
        this.container.removeEventListener("mousemove", this._fn_draw, false);
    };

    FreeDraw.prototype._setupBinding = function () {
        var that = this;
        //https://github.com/hongru/Canvas-Tattle/issues/19
        this._startPos = null;
        this._fn_draw = function (e) {
            var mousePos = FUNC.getMousePos(e, this);
            if (that._startPos === null) {
                that._startPos = mousePos;
                that._ctx.moveTo(mousePos[0], mousePos[1]);
                return false;
            } else if (that._controlPos === null) {
                that._controlPos = mousePos;
                return false;
            }
            that._count++;
            if (that._count<5 && (Math.pow(mousePos[0] - that._controlPos[0], 2) + Math.pow(mousePos[1] - that._controlPos[1], 2) < 9)) return false;
            //console.log(mousePos);
            that._count=0;
            that._ctx.quadraticCurveTo(that._controlPos[0], that._controlPos[1], (that._controlPos[0]+mousePos[0])>>1, (that._controlPos[1]+mousePos[1])>>1);
            that._ctx.stroke();
            that._controlPos = mousePos;
        };
    };

    DRAW.FreeDraw = FreeDraw;
})(window.$$.Draw, window.$$.Func);

//# sourceMappingURL=Drawing.js.map
