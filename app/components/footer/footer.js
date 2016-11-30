const pubsub = require('../../assets/scripts/core/pubsub.js');

// bind events to DOM
const bindEventsToUI = () => {

};

// public interface
const init = () => {
	console.log('footer'); 
	// pubsub.trigger('peopleChanged', 3);
};


// export public interface
module.exports = {
	init:init,
	autoLunch: true
};