window.$$ = window.$$ || {};
window.$$.draw = window.$$.draw || {};

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
        var style = para.style || para.color || '#000000';
        var image = para.image || null;
        var thickness = para.thickness || 1;

        var x = start[0] - end[0];
        var y = start[1] - end[1];
        var len = Math.sqrt(x*x+y*y);
        var angle = Math.atan2(y, x);

        this._ctx.translate(start[0], start[1]);
        this._ctx.rotate(angle);
        this._ctx.drawImage(image, 0, 0, thickness, len);
        if (image != null) {
            var ptrn = this._ctx.createPattern(image, 'repeat');
            this._ctx.fillStyle = ptrn;
        } else {
            this._ctx.fillStyle = style;
        }
        this._ctx.fillRect(0, 0, thickness, len);
        this._ctx.rotate(-angle);
        this._ctx.translate(-start[0], -start[1]);
    };

    DRAW.Line = Line;
})(window.$$.draw);
