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
