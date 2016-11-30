const pubsub = require('../../assets/scripts/core/pubsub.js');

let $progressBar = $('.progress-bar'),
	$display 	 = $progressBar.find('.display');


const updateBar = (progress) => {
	$progressBar.css('width',progress);
	$display.html(progress);
};

// bind events to DOM
const bindEventsToUI = () => {


};

// public interface
const init = () => {
    console.log('progress-bar'); 
    bindEventsToUI();
    pubsub.subscribe('updateProgressBar', updateBar);
};


// export public interface
module.exports = {
    init:init,
    autoLunch: false
};