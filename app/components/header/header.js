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