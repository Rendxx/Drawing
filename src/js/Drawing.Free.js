window.$$ = window.$$ || {};
window.$$.Draw = window.$$.Draw || {};

(function (DRAW, FUNC) {
    "use strict";

    var FreeDraw = function (container, para) {
        this._canvas2 = document.createElement('canvas');
        this._canvas2.style.position = 'absolute';
        this._canvas2.style.top = '0';
        this._canvas2.style.left = '0';
        this._canvas2.style.zIndex = '100';
        this._ctx2 = this._canvas2.getContext('2d');
        container.appendChild(this._canvas2);

        DRAW.Basic.call(this, container, para);
        this._controlPos = null;
        this._lastPos = null;
        this._isDrawing = false;

        this._setupBinding();
    };
    FreeDraw.prototype = Object.create(DRAW.Basic.prototype);
    FreeDraw.prototype.constructor = FreeDraw;

    FreeDraw.prototype.startDrawing = function (para) {
        // draw element
        var para = para || {};
        for (var i in para) {
            this._ctx[i] = para[i];
            this._ctx2[i] = para[i];
        }
        this._ctx.beginPath();
        this._ctx2.beginPath();
        this._startPos = null;
        this._isDrawing = true;

        this.container.addEventListener("mousemove", this._fn_draw, false);
    };

    FreeDraw.prototype.stopDrawing = function () {
        this._startPos = null;
        this.container.removeEventListener("mousemove", this._fn_draw, false);
        
        this._ctx2.clearRect(0, 0, this._canvas2.width, this._canvas2.height);
        if (this._lastPos !== null && this._controlPos!==null) {
            this._ctx.quadraticCurveTo(this._controlPos[0], this._controlPos[1], (this._controlPos[0] + this._lastPos[0]) >> 1, (this._controlPos[1] + this._lastPos[1]) >> 1);
            this._ctx.stroke();
        }
        this._lastPos = null;
    };

    FreeDraw.prototype._setupBinding = function () {
        var that = this;
        //https://github.com/hongru/Canvas-Tattle/issues/19
        this._startPos = null;
        this._controlPos = null;
        var _controlPos2 = null;

        this._fn_draw = function (e) {
            var mousePos = FUNC.getMousePos(e, this);
            that._lastPos = mousePos;
            if (that._startPos === null) {
                that._startPos = mousePos;
                that._ctx.moveTo(mousePos[0], mousePos[1]);
                that._ctx2.moveTo(mousePos[0], mousePos[1]);
                that._controlPos = null;
                _controlPos2 = null;
                return false;
            } else if (that._controlPos === null) {
                that._controlPos = mousePos;
                _controlPos2 = mousePos;
                return false;
            }
            if (that._isDrawing || (Math.pow(mousePos[0] - that._controlPos[0], 2) + Math.pow(mousePos[1] - that._controlPos[1], 2) >= 400)) {
                that._ctx2.clearRect(0, 0, that._canvas2.width, that._canvas2.height);
                that._ctx2.beginPath();

                var end = [(that._controlPos[0] + mousePos[0]) >> 1, (that._controlPos[1] + mousePos[1]) >> 1];
                that._ctx2.moveTo(end[0], end[1]);
                that._isDrawing = false;
                that._ctx.quadraticCurveTo(that._controlPos[0], that._controlPos[1], end[0], end[1]);
                that._ctx.stroke();
                that._controlPos = mousePos;
                setTimeout(function () { that._isDrawing = true; }, 100);
            } else {
                that._ctx2.quadraticCurveTo(_controlPos2[0], _controlPos2[1], (_controlPos2[0] + mousePos[0]) >> 1, (_controlPos2[1] + mousePos[1]) >> 1);
                that._ctx2.stroke();
                _controlPos2 = mousePos;
            }

            return false;
        };
    };

    FreeDraw.prototype.resize = function () {
        DRAW.Basic.prototype.resize.call(this);
        this._canvas2.width = this.container.offsetWidth;
        this._canvas2.height = this.container.offsetHeight;
    };

    DRAW.FreeDraw = FreeDraw;
})(window.$$.Draw, window.$$.Func);
