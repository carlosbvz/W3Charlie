const pubsub = require('../../assets/scripts/core/pubsub.js');

// Global Variables
let modalUrl    = $('.modal-url');
let btnAdd      = modalUrl.find('.btn-add-field');
let btnSaveUlrs = modalUrl.find('.btn-save-url');
let urlsSection = modalUrl.find('.input-append');
let doc         = $(document);


let buttonsActions = {
    addField: () => {
        let data = `<div class="field-wrapper">
                        <input autocomplete="off" class="input-url form-control" placeholder="URL to test" type="text">
                        <a href="#" class="btn btn-danger remove-me" >
                            -
                        </a>
                    </div>`
        urlsSection.append(data);
    },
    removeField: (item) => {
        item.parent().remove();
    },
    saveUrls: () => {
        let urls = handleUrls.getUrlsFromForm();

    }
};
let handleUrls = {

    getUrlsFromForm: () => {
        urlsSection.find('.input-url').each((i,item) => {
            // console.log(e)
            console.log(item.value)
        })
    },
    areUrlsValid: () => true  // needs to add a real validation here

}


// bind events to DOM
const bindEventsToUI = () => {
    btnAdd.on('click', (e) => {
        e.preventDefault();
        buttonsActions.addField();
    });
    doc.on('click', '.remove-me', (e) => {
        buttonsActions.removeField($(e.target));
    });
    btnSaveUlrs.on('click', (e) => {
        buttonsActions.saveUrls();
    })
};

// public interface
const init = function() {
    console.log('urls-modal'); 
    bindEventsToUI();
};


// export public interface
module.exports = {
    init:init,
    autoLunch: true
};


