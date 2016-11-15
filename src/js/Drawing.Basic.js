/************************************************ 
Drawing Library
Copyright (c) 2014-2016 Dongxu Ren  http://www.rendxx.com/

License: MIT (http://www.opensource.org/licenses/mit-license.php)
Version: 0.4.3
Update: 2016-11-15
************************************************/

window.$$ = window.$$ || {};
window.$$.Draw = window.$$.Draw || {};

(function (DRAW) {
	"use strict";

	var Basic = function (container, opts) {
		this.container = container;
		this.opts = opts || {};
		this._canvas = document.createElement('canvas');
		this._ctx = this._canvas.getContext('2d');
		this.container.appendChild(this._canvas);
		//if (this.container.style.position != "relative" && this.container.style.position != "absolute") this.container.style.position = "relative";
		this._canvas.style.position = 'absolute';
		this._canvas.style.top = '0';
		this._canvas.style.left = '0';
		if (this.opts.hasOwnProperty("zIndex")) this._canvas.style.zIndex = this.opts.zIndex;
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
	    this._canvas.parentNode.removeChild(this._canvas);
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
