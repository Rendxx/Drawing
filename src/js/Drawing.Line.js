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
