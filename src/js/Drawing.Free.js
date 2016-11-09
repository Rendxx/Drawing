window.$$ = window.$$ || {};
window.$$.draw = window.$$.draw || {};

(function (DRAW) {
    "use strict";

    var FreeDraw = function (container, para) {
        DRAW.Basic.call(this, container, para);
    };
    FreeDraw.prototype = Object.create(DRAW.Basic.prototype);
    FreeDraw.prototype.constructor = FreeDraw;

    FreeDraw.prototype.copy = function () {
        var copy = DRAW.Basic.prototype.copy.call(this);
    };

    FreeDraw.prototype.startDraw = function (para) {
        // draw element
        var para = para || {};
        var style = para.color || '#000000';
        var thickness = para.thickness || 1;

    };

    DRAW.FreeDraw = FreeDraw;
})(window.$$.draw);
