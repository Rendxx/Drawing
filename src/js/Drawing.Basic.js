window.$$ = window.$$ || {};
window.$$.draw = window.$$.draw || {};

(function (DRAW) {
	"use strict";

	var Basic = function (container, para) {
		this.container = container;
		this.para = para;
		this.image = null;
	};
	Basic.prototype = Object.create(null);
	Basic.prototype.constructor = Basic;

	Basic.prototype.copy = function () {
		// copy the element and return the copy
		var copy = new Basic(this.container, para);
		copy.image = this.image;
		return copy;
	};


	Basic.prototype.clear = function () {
		// (re)clear the canvas
	};

	Basic.prototype.destroy = function () {
		// destroy the element and release all memory
	};

	DRAW.Basic = Basic;
})(window.$$.draw);
