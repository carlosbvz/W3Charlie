var pubsub = require('../../assets/scripts/core/pubsub.js');

// bind events to DOM
var bindEventsToUI = function() {

};

// public interface
var init = function() {
	console.log('footer'); 
	pubsub.publish('peopleChanged', 3);
	pubsub.publish('peopleChanged', 4);
	pubsub.publish('peopleChanged', 5);
};


// export public interface
module.exports = {
	init:init,
	autoLunch: false
};