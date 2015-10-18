/************************************************ 
Drawing Library
Copyright (c) 2014-2015 Dongxu Ren  http://www.rendxx.com/

License: MIT (http://www.opensource.org/licenses/mit-license.php)
Version: 0.2.2
Update: 2015-10-18

Description:
    Draw shape in selected HTML container
    
Compatibility:
    Chrome; Fire Fox; Safari; Edge; IE 9-11; IE 7,8;
 
Dependency:
    jQuery
    Transform2D

API-Drawing Library:
    $$.drawing.create(key, opts)
        - (object) Create a specific shape object with given options
    
API-Base:
    [Shape].show()/hide()
        - show/hide shpae element
    
    [Shape].move(left, top)
        - pan left/top from current position
    
    [Shape].moveTo(left, top)
        - move to given position
    
    [Shape].rotate(deg)
        - rotate given deg clockwise
    
    [Shape].rotateTo(deg)
        - rotate to given deg clockwise from origin
    
    [Shape].scale(rate)
        - scale to given rate
    
    [Shape].setOpts()
        - reset options and re-render the shape

    [Shape].destroy()
        - destroy the object
    
API-Line:
    [Shape].lineTo(left, top)
        - move the end of the line to specific position

    [Shape].scale()
        - scale is disabled in line    

    [Shape].ptrStart
        - start pointer of the line

    [Shape].ptrEnd
        - end pointer of the line

    [Shape].options
        - options of the line

************************************************/

(function () {
    "use strict";
    // HTML library
    var _HTML = {};
    _HTML["Base"] = '';
    _HTML["Line"] = '<div class="drawing-wrap"><div class="drawing-line"><div class="drawing-line-start"></div><div class="drawing-line-body"></div><div class="drawing-line-end"></div></div></div>';
    // Shape library
    var _Shape = {};
    _Shape["Base"] = function () {
        this.ele;
        this.inner;
        this.deg;

        this.move = function (left, top) {
            if (this.ele == null) return;
            var cssList = {
                "left": (parseInt(this.inner.css("left")) + (left ? left : 0)) + "px",
                "top": (parseInt(this.inner.css("top")) + (top ? top : 0)) + "px"
            };
            this.ele.css(cssList);
        };

        this.moveTo = function (left, top) {
            if (this.ele == null) return;
            var cssList = {};
            if (left !== null && left !== undefined) cssList["left"] = left + "px";
            if (top !== null && top !== undefined) cssList["top"] = top + "px";
            this.ele.css(cssList);
        };

        this.rotate = function (deg) {
            if (this.ele == null) return;
            var r = this.inner.rotation();
            this.inner.transform2D({
                rotate: r + deg
            });
        };

        this.rotateTo = function (deg) {
            if (this.ele == null) return;
            this.inner.transform2D({
                rotate: deg
            });
        };

        this.scale = function (rate) {
            if (this.ele == null) return;
            this.inner.transform2D({
                scaleX: rate,
                scaleY: rate
            });
        };

        // Element control
        this.show = function () {
            if (this.ele == null) return;
            this.ele.show();
        };

        this.hide = function () {
            if (this.ele == null) return;
            this.ele.hide();
        };

        this.destroy = function () {
            if (this.ele == null) return;
            this.ele.remove();
        };

        this.setOpts = function (opts) {
        };
    };

    _Shape["Line"] = function (opts_in) {
        var that = this;
        var _base = this;
        var _buffer_h = 0;      // buffer of line length, in order to fix old ie issue
        var _t = 0;             // top difference
        var _l = 0;             // left difference

        var _html = {
            "body": null,
            "start": null,
            "end": null
        };
        var endPoint = {
            "left": 0,
            "top": 0
        };
        
        this.ptrStart = null;
        this.ptrEnd = null;
        this.options = {
            "container": $("body"),
            "width": 1,
            "z-index": 1,
            background: {
                color: "#000",
                image: null
            },
            pointer: {
                start: {
                    image: null,
                    position: null,
                    radius: 0
                },
                end: {
                    image: null,
                    position: null,
                    radius: 0
                }
            }
        };

        this.lineTo = function (left, top) {
            if (left !== null && left !== undefined) endPoint["left"] = left;
            if (top !== null && top !== undefined) endPoint["top"] = top;

            // set line 
            var startPoint = {
                left:  parseInt(that.ele.css("left")),
                top:  parseInt(that.ele.css("top"))
            };

            _l = endPoint.left - startPoint.left;
            _t = endPoint.top - startPoint.top;
            var deg = -Math.atan2(_l, _t) * 180 / Math.PI;
            _buffer_h = Math.sqrt(_l * _l + _t * _t) + that.options.pointer.start.radius + that.options.pointer.end.radius;
            that.ele.css("overflow","hidden");
            that.inner.height(_buffer_h);
            _html["body"].height(_buffer_h - that.options.pointer.start.radius * 2 - that.options.pointer.end.radius );

            this.rotateTo(deg);
            that.ele.css("overflow", "visible");
        };

        this.rotate = function (deg) {
            if (this.ele == null) return;
            var r = that.inner.rotation();
            //var offset = _buffer_h / 2 - that.options.pointer.start.radius;
            that.inner.transform2D({
                rotate: r + deg,
                translateX: -(_buffer_h / 2 - that.options.pointer.start.radius) * Math.sin(deg / 180 * Math.PI),
                translateY: (_buffer_h / 2 - that.options.pointer.start.radius) * Math.cos(deg / 180 * Math.PI) - _buffer_h / 2
            });
            //that.inner.css("top", -offset - that.options.pointer.start.radius + "px");
        };

        this.rotateTo = function (deg) {
            if (this.ele == null) return;
            //var offset = _buffer_h / 2 - that.options.pointer.start.radius;
            that.inner.transform2D({
                rotate: deg,
                translateX: -(_buffer_h / 2 - that.options.pointer.start.radius) * Math.sin(deg / 180 * Math.PI),
                translateY: (_buffer_h / 2 - that.options.pointer.start.radius) * Math.cos(deg / 180 * Math.PI) - _buffer_h / 2
            });
            //that.inner.css("top", -offset - that.options.pointer.start.radius + "px");
        };

        this.scale = function (rate) {
            return;
        };

        this.setOpts = function (opts) {
            _setOpts(opts);
            _render();
        };

        var _setOpts = function (opts) {
            if (opts == null) return;
            if (opts["container"]) that.options["container"] = opts["container"];
            if (opts["width"]) that.options["width"] = opts["width"];
            if (opts["z-index"]) that.options["z-index"] = opts["z-index"];

            if (opts.background) {
                for (var i in opts.background)
                    that.options.background[i] = opts.background[i];
            }
            if (opts.pointer) {
                for (var i in opts.pointer)
                    that.options.pointer[i] = opts.pointer[i];
            }
        };

        var _render = function () {
            var opts = that.options;

            // overall css
            var max_w = opts["width"];
            if (max_w < opts.pointer.start.radius * 2) max_w = opts.pointer.start.radius * 2;
            if (max_w < opts.pointer.end.radius * 2) max_w = opts.pointer.end.radius * 2;

            that.ele.css("z-index", opts["z-index"]);

            var cssListEle = {};
            cssListEle["width"] = max_w + "px";
            cssListEle["top"] = "0px";
            cssListEle["left"] = -max_w / 2 + "px";
            that.inner.css(cssListEle);

            // body css
            var cssListBody = {};
            cssListBody["width"] = opts["width"] + "px";
            cssListBody["margin-top"] = "0px";
            cssListBody["margin-left"] = (max_w - opts["width"])/2 + "px";
            cssListBody["background-color"] = opts.background.color;
            cssListBody["background-image"] = (opts.background.image == null) ? null : ("url('" + opts.background.image + "')");
            _html["body"].css(cssListBody);

            // start pointer css
            var cssListStart = {};
            cssListStart["background-image"] = (opts.pointer.start.image == null) ? null : ("url('" + opts.pointer.start.image + "')");
            cssListStart["background-position"] = (opts.pointer.start.position == null) ? null : opts.pointer.start.position;
            cssListStart["height"] = cssListStart["width"] = opts.pointer.start.radius * 2 + "px";
            cssListStart["margin-left"] = (max_w / 2 - opts.pointer.start.radius) + "px";
            _html["start"].css(cssListStart);

            // end pointer css
            var cssListEnd = {};
            cssListEnd["background-image"] = (opts.pointer.end.image == null) ? null : ("url('" + opts.pointer.end.image + "')");
            cssListEnd["background-position"] = (opts.pointer.end.position == null) ? null : opts.pointer.end.position;
            cssListEnd["height"] = cssListEnd["width"] = opts.pointer.end.radius * 2 + "px";
            cssListEnd["margin-left"] = (max_w / 2 - opts.pointer.end.radius) + "px";
            cssListEnd["margin-top"] = - opts.pointer.end.radius + "px";
            _html["end"].css(cssListEnd);
        };

        var _buildEle = function () {
            that.ele = $(_HTML.Line);
            that.ele.appendTo(that.options.container);
            that.inner = that.ele.children(".drawing-line");
            _html["body"] = that.inner.children(".drawing-line-body");
            _html["start"] = that.inner.children(".drawing-line-start");
            _html["end"] = that.inner.children(".drawing-line-end");
            that.ptrStart = _html["start"];
            that.ptrEnd = _html["end"];

            that.ele.css({
                "position": "absolute",
                "margin": "0px",
                "padding": "0px",
                "border": "0px",
                "top": "0px",
                "left": "0px",
                "width": "1px",
                "height": "1px"
            });
            that.inner.css({
                "position": "absolute",
                "margin": "0px",
                "padding": "0px",
                "border": "0px",
                "top": "0px",
                "left": "0px"
            });
            _html["body"].css({
                "z-index": "1",
                "width": "0px",
                "height": "100%",
                "margin": "0px",
                "background-position":"center center"
            });
            _html["start"].css({
                "z-index": "3",
                "width": "0px",
                "height": "0px",
                "margin": "0px"
            });
            _html["end"].css({
                "z-index": "2",
                "width": "0px",
                "height": "0px",
                "margin": "0px"
            });

            _render();
        };

        var _init = function (opts) {
            _base = that.constructor.prototype = new _Shape.Base();
            _setOpts(opts);
            _buildEle();
            _render();
        }(opts_in);
    };

    // Drawing init
    var _initDrawing = function () {
        this.create = function (key, opts) {
            if (!(key in _Shape) || key == "Base") return null;
            _Shape[key].prototype = new _Shape.Base();
            _Shape[key].base = _Shape[key].prototype;
            return new _Shape[key](opts);
        };
        var _init = function () {
        }();
    };

    window.$$ = window.$$ || {};
    window.$$.drawing = new _initDrawing();
})();
//# sourceMappingURL=Drawing.js.map
