const pubsub = require('../../assets/scripts/core/pubsub.js');

// bind events to DOM
const bindEventsToUI = () => {


};

// public interface
const init = () => {
    console.log('progress-bar'); 
    bindEventsToUI();
};


// export public interface
module.exports = {
    init:init,
    autoLunch: false
};