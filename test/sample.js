
var img_dash = new Image();
img_dash.src = 'line-bg.png';

var container = document.getElementById("container");
var scene = document.getElementById("scene");
var btn_line = document.getElementById("btn-line");
var btn_line2 = document.getElementById("btn-line2");
var btn_free = document.getElementById("btn-free");
var btn_clear = document.getElementById("btn-clear");
var btn_redo = document.getElementById("btn-redo");
var btn_undo = document.getElementById("btn-undo");

var _mouseout = null,
    _mouseup = null,
    _mousedown = null,
    _mousemove = null;
var _drawing = null;
var drawingList = [];
var drawingListIdx = -1;
var ctx = scene.getContext("2d");

var clearBinding = function () {
    if (_mouseout) container.removeEventListener('mouseout', _mouseout);
    if (_mouseup) container.removeEventListener('mouseup', _mouseup);
    if (_mousedown) container.removeEventListener('mousedown', _mousedown);
    if (_mousemove) container.removeEventListener('mousemove', _mousemove);
    if (_drawing) _drawing.destroy();
};
var setupBinding = function () {
    if (_mouseout) container.addEventListener('mouseout', _mouseout, false);
    if (_mouseup) container.addEventListener('mouseup', _mouseup, false);
    if (_mousedown) container.addEventListener('mousedown', _mousedown, false);
    if (_mousemove) container.addEventListener('mousemove', _mousemove, false);
};
var selectDrawing = function (btn) {
    btn_line.className = btn_line.className.replace(/(?:^|\s)selected(?!\S)/g, '');
    btn_line2.className = btn_line2.className.replace(/(?:^|\s)selected(?!\S)/g, '');
    btn_free.className = btn_free.className.replace(/(?:^|\s)selected(?!\S)/g, '');
    btn.className += " selected";
};

var render = function () {
    ctx.clearRect(0, 0, scene.width, scene.height);
    for (var i = 0; i <= drawingListIdx; i++) {
        ctx.drawImage(drawingList[i], 0, 0);
    }
};

var addBinding = {
    "line": function () {
        clearBinding();
        _drawing = new $$.Draw.Line(container);
        var start = null;
        _mousedown = function (e) {
            start = $$.Func.getMousePos(e, container);
        };
        _mousemove = function (e) {
            if (start == null) return false;
            var end = $$.Func.getMousePos(e, container);
            _drawing.draw(start, end, {
                strokeStyle: '#ff6666',
                lineWidth: 4,
                lineCap: 'round'
            });
        };
        _mouseup = _mouseout = function (e) {
            if (start === null) return;
            start = null;
            var img = _drawing.getImage();
            drawingList.length = ++drawingListIdx;
            drawingList.push(img);
            _drawing.clear();
            render();
        };
        setupBinding();
        selectDrawing(btn_line);
    },

    "line2": function () {
        clearBinding();
        _drawing = new $$.Draw.Line(container);
        var start = null;
        _mousedown = function (e) {
            start = $$.Func.getMousePos(e, container);
        };
        _mousemove = function (e) {
            if (start == null) return false;
            var end = $$.Func.getMousePos(e, container);
            _drawing.draw(start, end, {
                lineWidth: 10,
                image: img_dash
            });
        };
        _mouseup = _mouseout = function (e) {
            if (start === null) return;
            start = null;
            var img = _drawing.getImage();
            drawingList.length = ++drawingListIdx;
            drawingList.push(img);
            _drawing.clear();
            render();
        };
        setupBinding();
        selectDrawing(btn_line2);
    },
    "free": function () {
        clearBinding();
        _drawing = new $$.Draw.FreeDraw(container);
        var start = null;
        _mousedown = function (e) {
            start = 1;
            _drawing.startDrawing({
                strokeStyle: '#555',
                lineWidth: 4,
                lineCap: 'round'
            });
        };
        _mousemove = function (e) {
        };
        _mouseup = _mouseout = function (e) {
            if (start === null) return;
            start = null;
            _drawing.stopDrawing();
            var img = _drawing.getImage();
            drawingList.length = ++drawingListIdx;
            drawingList.push(img);
            _drawing.clear();
            render();
        };
        setupBinding();
        selectDrawing(btn_free);
    }
};

btn_line.addEventListener("click", function () { addBinding["line"](); }, false);
btn_line2.addEventListener("click", function () { addBinding["line2"](); }, false);
btn_free.addEventListener("click", function () { addBinding["free"](); }, false);
btn_clear.addEventListener("click", function () {
    drawingList.length = 0;
    drawingListIdx = -1;
    render();
}, false);
btn_redo.addEventListener("click", function () {
    drawingListIdx = Math.min(drawingListIdx + 1, drawingList.length - 1);
    render();
}, false);
btn_undo.addEventListener("click", function () {
    drawingListIdx = Math.max(drawingListIdx - 1, -1);
    render();
}, false);

btn_line.click();

scene.width = container.offsetWidth;
scene.height = container.offsetHeight;
window.addEventListener('resize', function (e) {
    scene.width = container.offsetWidth;
    scene.height = container.offsetHeight;
    console.log("1: " + container.offsetWidth + "  " + container.offsetHeight)
    if (_drawing) _drawing.resize();
});