const pubsub = require('../../assets/scripts/core/pubsub.js');


let $wrapper    = $("#wrapper")
    $menuToggle = $("#menu-toggle")


// bind events to DOM
const bindEventsToUI = () => {
    $menuToggle.click(function(e) {
        e.preventDefault();
        $wrapper.toggleClass("toggled");
    });
};

// public interface
const init = () => {
    console.log('left-panel'); 
    bindEventsToUI();
};


// export public interface
module.exports = {
    init:init,
    autoLunch: false
};


