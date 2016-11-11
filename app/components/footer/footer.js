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
	autoLunch: true
};