/************************************************ 
Drawing Library
Copyright (c) 2014-2015 Dongxu Ren  http://www.rendxx.com/

License: MIT (http://www.opensource.org/licenses/mit-license.php)
Version: 0.3.0
Update: 2016-04-22

Description:
    Draw shape in selected HTML container
    
Compatibility:
    Chrome; Fire Fox; Safari; Edge; IE 9-11;
 
Dependency:
    jQuery
    Transform2D

API-Drawing Library:
    $$.drawing.create(shapeType, opts)
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
    
    [Shape].scaleTo(ratio)
        - scale to given ratio
    
    [Shape].setOpts(opts)
        - reset options and re-render the shape

    [Shape].destroy()
        - destroy the object
    
API-Line:
    [Shape].lineTo(left, top)
        - move the end of the line to specific position

    [Shape].scaleTo()
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

        this.scaleTo = function (ratio) {
            if (this.ele == null) return;
            this.inner.transform2D({
                scaleX: ratio,
                scaleY: ratio
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
        var bodyLengthAdjust = 0;       // adjust length of body
        var bodyOffset = 0;             // offset the body from start to end

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
            "z-index": 1
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
            _buffer_h = Math.sqrt(_l * _l + _t * _t);
            that.ele.css("overflow","hidden");
            that.inner.height(_buffer_h);
            _html["body"].height(_buffer_h + bodyLengthAdjust);

            this.rotateTo(deg);
            that.ele.css("overflow", "visible");
        };

        this.rotate = function (deg) {
            if (this.ele == null) return;
            var r = that.inner.rotation();
            that.inner.transform2D({
                rotate: r + deg,
                translateX: -(_buffer_h / 2) * Math.sin(deg / 180 * Math.PI),
                translateY: (_buffer_h / 2) * Math.cos(deg / 180 * Math.PI) - _buffer_h / 2
            });
        };

        this.rotateTo = function (deg) {
            if (this.ele == null) return;
            that.inner.transform2D({
                rotate: deg,
                translateX: -(_buffer_h / 2) * Math.sin(deg / 180 * Math.PI),
                translateY: (_buffer_h / 2) * Math.cos(deg / 180 * Math.PI) - _buffer_h / 2
            });
        };

        this.scaleTo = function (rate) {
            return;
        };

        this.setOpts = function (opts) {
            _setOpts(opts);
            _render();
        };

        var _setOpts = function (opts) {
            if (opts == null) return;
            if (opts["container"]) that.options["container"] = opts["container"];
            if (opts["z-index"]) that.options["z-index"] = opts["z-index"];
            if (opts["adjust"]) that.options["adjust"] = opts["adjust"];
            if (opts["offset"]) that.options["offset"] = opts["offset"];
            if (opts["css"]) that.options["css"] = opts["css"];
        };

        var _render = function () {
            var opts = that.options;

            // overall css
            that.ele.css("z-index", opts["z-index"]);

            // body css
            var cssListBody = {};
            if (opts.hasOwnProperty("css") && opts.css.hasOwnProperty("body")) {
                for (var i in opts.css.body) {
                    cssListBody[i] = opts.css.body[i];
                }
            }
            _html["body"].css(cssListBody);
            var leftOffset = parseInt(_html["body"].css('padding-left')) + parseInt(_html["body"].css('border-left-width')) + _html["body"].width() / 2;
            _html["body"].css('margin-left', -leftOffset + "px");
            
            // start pointer css
            var cssListStart = {};
            if (opts.hasOwnProperty("css") && opts.css.hasOwnProperty("start")) {
                for (var i in opts.css.start) {
                    cssListStart[i] = opts.css.start[i];
                }
            }
            _html["start"].css(cssListStart);
            var leftOffset = parseInt(_html["start"].css('padding-left')) + parseInt(_html["start"].css('border-left-width')) + _html["start"].width() / 2;
            _html["start"].css('left', -leftOffset + "px");

            // end pointer css
            var cssListEnd = {};
            if (opts.hasOwnProperty("css") && opts.css.hasOwnProperty("end")) {
                for (var i in opts.css.end) {
                    cssListEnd[i] = opts.css.end[i];
                }
            }
            _html["end"].css(cssListEnd);
            var leftOffset = parseInt(_html["end"].css('padding-left')) + parseInt(_html["end"].css('border-left-width')) + _html["end"].width() / 2;
            _html["end"].css('margin-left', -leftOffset + "px");


            var _topOffset = -(parseInt(_html["start"].css('padding-top')) + parseInt(_html["start"].css('border-top-width')) + _html["start"].height() / 2);
            _html["start"].css('top', _topOffset + "px");

            var _bottomOffset = -(parseInt(_html["end"].css('padding-bottom')) + parseInt(_html["end"].css('border-bottom-width')) + _html["end"].height() / 2);
            _html["end"].css('bottom', _bottomOffset + "px");
            
            if (opts.hasOwnProperty("adjust") && opts.adjust !== null) bodyLengthAdjust = opts.adjust;
            if (opts.hasOwnProperty("offset") && opts.adjust !== null) bodyOffset = opts.offset;
            _html["body"].css('margin-top', bodyOffset + "px");
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
                "height": "1px",
                "overflow": "visible"
            });
            that.inner.css({
                "position": "absolute",
                "margin": "0px",
                "padding": "0px",
                "border": "0px",
                "top": "0px",
                "left": "0px",
                "width":"0px",
                "overflow": "visible"
            });
            _html["body"].css({
                "position": "absolute",
                "top": "0px",
                "left": "0px",
                "z-index": "1",
                "width": "0px",
                "height": "100%",
                "margin": "0px",
                "background-position":"center center"
            });
            _html["start"].css({
                "position": "absolute",
                "top": "0px",
                "left": "0px",
                "z-index": "3",
                "width": "0px",
                "height": "0px",
                "margin": "0px"
            });
            _html["end"].css({
                "position": "absolute",
                "bottom": "0px",
                "left": "0px",
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
        this.create = function (shapeType, opts) {
            if (!(shapeType in _Shape) || shapeType == "Base") return null;
            _Shape[shapeType].prototype = new _Shape.Base();
            _Shape[shapeType].base = _Shape[shapeType].prototype;
            return new _Shape[shapeType](opts);
        };
        var _init = function () {
        }();
    };

    window.$$ = window.$$ || {};
    window.$$.drawing = new _initDrawing();
})();
//# sourceMappingURL=Drawing.js.map
