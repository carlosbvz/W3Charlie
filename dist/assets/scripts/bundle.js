(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var main = require('./main.js');
var secondary = require('./secondary.js');



/*
| 	This approach is missing an 'initiator' which will look if the component 
|	is present in the DOM and then trigger the 'init' function
*/
main.init();
secondary.init();


},{"./main.js":2,"./secondary.js":3}],2:[function(require,module,exports){


// bind events to DOM
var bindEventsToUI = function() {

};

// public interface
var init = function() {
	console.log('main.js');
};


// export public interface
module.exports = {
	init:init
};
},{}],3:[function(require,module,exports){

// bind events to DOM
var bindEventsToUI = function() {

};

// public interface
var init = function() {
	console.log('secondary.js');
};

module.exports = {
	init:init
};
},{}]},{},[1]);
