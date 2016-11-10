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

    DRAW.freeDraw = FreeDraw;
})(window.$$.draw, window.$$.func);
