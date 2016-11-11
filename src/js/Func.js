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
