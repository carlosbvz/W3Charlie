const pubsub = require('../../assets/scripts/core/pubsub.js');


let $wrapper    = $("#wrapper"),
    $menuToggle = $("#menu-toggle"),
    $doc        = $(document),
    inputMarkup = `<div class="field-wrapper">
                        <span class="errorBlock"></span>
                        <input autocomplete="off" class="input-url form-control" placeholder="URL to test" type="text"
                                required type="url" data-parsley-type="url">
                        <a href="#" class="remove-me" >
                            remove
                        </a>
                    </div>`; 


let buttonsActions = {
    addField: (element) => {
        $(element).parent().parent().next('.input-append').append(inputMarkup);
    }
};

// bind events to DOM
const bindEventsToUI = () => {
    $menuToggle.click(function(e) {
        e.preventDefault();
        $wrapper.toggleClass("toggled");
    });
    $doc.on('click', '.btn-add-field', (e) => {
        buttonsActions.addField(e.target);
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


