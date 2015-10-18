$(function () {
    $(function () {
        var createLine = function (start, end, opts) {
            var l = $$.drawing.create("Line", opts);
            l.moveTo(parseInt(start.css("left")), parseInt(start.css("top")));
            l.lineTo(parseInt(end.css("left")), parseInt(end.css("top")));

            var offset = {};

            // get mouse position fomr mouse event
            var _getMousePosition = function (e) {
                var pos = {};
                pos["x"] = e.pageX == undefined ? e.originalEvent.touches[0].pageX : e.pageX;
                pos["y"] = e.pageY == undefined ? e.originalEvent.touches[0].pageY : e.pageY;
                return pos;
            };

            // mouse event handler
            var _startDrag = function (e) {
                e.preventDefault();

                var mousePos = _getMousePosition(e);
                var position = {
                    x: parseInt(end.css("left")),
                    y: parseInt(end.css("top"))
                };
                offset.x = mousePos.x - position.x;
                offset.y = mousePos.y - position.y;
                $(document).bind("mousemove", _onDrag);
                return false;
            };

            var _onDrag = function (e) {
                e.preventDefault();

                var mousePos = _getMousePosition(e);
                mousePos.x = mousePos.x - offset.x;
                mousePos.y = mousePos.y - offset.y;

                end.css({
                    "left": mousePos.x + "px",
                    "top": mousePos.y + "px"
                });
                l.lineTo(mousePos.x, mousePos.y);
                return false;
            };

            var _stopDrag = function (e) {
                e.preventDefault();
                $(document).unbind("mousemove", _onDrag);
            };

            end.bind("mousedown", _startDrag);
            $(document).bind("mouseup", _stopDrag);
        };

        createLine($(".start-1"), $(".end-1"), {
            "container": $(".wrap"),
            "width": 4,
            "z-index": 30,
            "background": {
                color: "",
                image: "line-bg.png"
            },
            pointer: {
                start: {
                    image: "line-icon.png",
                    position: "0px -30px",
                    radius: 8
                },
                end: {
                    image: "line-icon.png",
                    position: "-16px -30px",
                    radius: 6
                }
            }
        });
        createLine($(".start-2"), $(".end-2"), {
            "container": $(".wrap"),
            "width": 8,
            "z-index": 20,
            "background": {
                color: "#e33"
            }
        });

        createLine($(".start-3"), $(".end-3"), {
            "container": $(".wrap"),
            "width": 10,
            "z-index": 10,
            "background": {
                color: "",
                image: "line-bg2.gif"
            },
            pointer: {
                end: {
                    image: "line-icon.png",
                    position: "0px 0px",
                    radius: 15
                }
            }
        });
    });
});