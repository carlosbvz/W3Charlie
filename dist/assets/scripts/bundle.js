(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
| 	Gets the initializer and inits it with all the modules
*/
var initializer = require('./core/initializer.js');
var modules 	= require('./core/modules');

initializer.init(modules);





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
			(modules[module].autoLunch === true)) { // If component needs to be autoLunched

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

	pubsub: 	require('./pubsub.js'),
 	header: 	require('../../../components/header/header.js'),
 	footer: 	require('../../../components/footer/footer.js'),





}

},{"../../../components/footer/footer.js":5,"../../../components/header/header.js":6,"./pubsub.js":4}],4:[function(require,module,exports){

var events = {};

var subscribe = function (eventName, fn) {  
    // if events[eventName] is not Null, Undefined nor empty, sets to himself
    // if it is undefined (not existed yet) it gets created.
    events[eventName] = events[eventName] || [];  
    events[eventName].push(fn);
};

var unsubscribe = function(eventName, fn) {
    if (events[eventName]) {
      for (var i = 0; i < events[eventName].length; i++) {
        if (events[eventName][i] === fn) {
          events[eventName].splice(i, 1);
          break;
        }
      };
    }
};

var trigger = function (eventName, data) {
    if (events[eventName]) {
      events[eventName].forEach(function(fn) {
        fn(data);
      });
    }
}


module.exports = {
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    trigger: trigger
}

},{}],5:[function(require,module,exports){
var pubsub = require('../../assets/scripts/core/pubsub.js');

// bind events to DOM
var bindEventsToUI = function() {

};

// public interface
var init = function() {
	console.log('footer'); 
	pubsub.trigger('peopleChanged', 3);
	pubsub.trigger('peopleChanged', 4);
	pubsub.trigger('peopleChanged', 5);
};


// export public interface
module.exports = {
	init:init,
	autoLunch: false
};
},{"../../assets/scripts/core/pubsub.js":4}],6:[function(require,module,exports){
var pubsub = require('../../assets/scripts/core/pubsub.js');

// bind events to DOM
var bindEventsToUI = function() {

};

// public interface
var init = function() {
	console.log('header');
	pubsub.subscribe('peopleChanged', handler);
};

var handler = function(data) {
	console.log('header triggered'+data);
}


// export public interface
module.exports = {
	init:init,
	autoLunch: false
};
},{"../../assets/scripts/core/pubsub.js":4}]},{},[1]);
