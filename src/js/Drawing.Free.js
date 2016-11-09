window.$$ = window.$$ || {};
window.$$.draw = window.$$.draw || {};

(function (DRAW) {
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
        //var style = para.color || '#000000';
        //var thickness = para.thickness || 1;
        //var join = para.join || 'round';

        //this._ctx.lineWidth = thickness;
        //this._ctx.strokeStyle = style;
        //this._ctx.lineJoin = join;

        for (var i in para) {
            this._ctx[i] = para[i];
        }

        this._ctx.beginPath();
        this._lastPos = null;
        this.container.addEventListener("mousemove", this._fn_draw, false);
    };

    FreeDraw.prototype.stopDrawing = function () {
        this._lastPos = null;
        this.container.removeEventListener(evt, this._fn_draw, false);
    };

    FreeDraw.prototype._setupBinding = function () {
        var that = this;

        var _getMousePos = function (e) {
            var pos;
            if (e.pageX == undefined) {
                pos = [e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY];
            } else {
                pos = [e.pageX, e.pageY];
            }
            var viewportOffset = that._canvas.getBoundingClientRect();
            pos[1] -= viewportOffset.top;
            pos[0] -= viewportOffset.left
            return pos;
        };
        
        this._lastPos = null;
        this._fn_draw = function (e) {
            var mousePos = _getMousePos(e);
            if (that._lastPos === null) {
                that._lastPos = mousePos;
                that._ctx.moveTo(mousePos[0], mousePos[1]);
                return false;
            }

            that._ctx.lineTo(mousePos[0], mousePos[1]);
            that._ctx.stroke();
            that._lastPos = mousePos;
        };
    };

    DRAW.freeDraw = FreeDraw;
})(window.$$.draw);
