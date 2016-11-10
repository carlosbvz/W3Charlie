(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


var initializer = require('./core/initializer.js');

initializer.init(require('./core/modules'));





},{"./core/initializer.js":2,"./core/modules":3}],2:[function(require,module,exports){


var getComponentsInUI = function() {
	var componetsList = [];
	var componentsInUI = document.querySelectorAll('[data-action-name]');
	for( var i = 0; i < componentsInUI.length; i++ ) {
		componetsList.push(componentsInUI[i].getAttribute('data-action-name'))
	}
	return componetsList;
}

var init = function(modules) {	

	components = getComponentsInUI();

	for( var module in modules ) {

		if(	(components.indexOf(module) != -1) // If the component is present in UI
							|| 							
			(modules[module].autoLunch === true)) {     // If component needs to be autoLunched

				modules[module].init();
		}
	}
}


 
module.exports = {
	init: init
}


},{}],3:[function(require,module,exports){
/*
|	Modules goes here
*/
module.exports = {

	main: 		require('../modules/main.js'),
	secondary: 	require('../modules/secondary.js')
 





}

},{"../modules/main.js":4,"../modules/secondary.js":5}],4:[function(require,module,exports){


// bind events to DOM
var bindEventsToUI = function() {

};

// public interface
var init = function() {
	console.log('main.js');
};


// export public interface
module.exports = {
	init:init,
	autoLunch: false
};
},{}],5:[function(require,module,exports){

// bind events to DOM
var bindEventsToUI = function() {

};

// public interface
var init = function() {
	console.log('secondary.js');
};

module.exports = {
	init:init,
	autoLunch: false
};
},{}]},{},[1]);
