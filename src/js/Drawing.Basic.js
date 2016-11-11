window.$$ = window.$$ || {};
window.$$.Draw = window.$$.Draw || {};

(function (DRAW) {
	"use strict";

	var Basic = function (container, para) {
		this.container = container;
		this.para = para;
		this._canvas = document.createElement('canvas');
		this._ctx = this._canvas.getContext('2d');
		this.container.appendChild(this._canvas);
		this.resize();
	};
	Basic.prototype = Object.create(null);
	Basic.prototype.constructor = Basic;

	Basic.prototype.copy = function () {
		// copy the element and return the copy
	    var copy = new Basic(this.container, para);
	    copy._ctx.drawImage(this._canvas, 0, 0);
		return copy;
	};

	Basic.prototype.draw = function () {
	    // draw element
	};

	Basic.prototype.clear = function () {
	    // clear the canvas
	    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
	};

	Basic.prototype.getImage = function () {
	    // get the canvas image
	    var image = new Image();
	    image.src = this._canvas.toDataURL();
	    return image;
	};

	Basic.prototype.destroy = function () {
	    // destroy the element and release all memory
	    this._canvas = null;
	    this._ctx = null;
	};

	Basic.prototype.resize = function () {
	    // resize the canvas
	    this._canvas.width = this.container.offsetWidth;
	    this._canvas.height = this.container.offsetHeight;
	};

	DRAW.Basic = Basic;
})(window.$$.Draw);
