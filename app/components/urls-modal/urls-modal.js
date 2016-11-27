const pubsub = require('../../assets/scripts/core/pubsub.js');

// Global Variables
let modalUrl    = $('#urlModal'),
    btnAdd      = modalUrl.find('.btn-add-field'),
    btnSaveUlrs = modalUrl.find('.btn-save-url'),
    btnCancelUrls= modalUrl.find('.btn-close-url'),
    urlsSection = modalUrl.find('.input-append'),
    savedInputs = urlsSection.html(),
    doc         = $(document),
    urls        = [],
    urlModalTrigger = $('.url-modal-trigger'),
    inputMarkup = `<div class="field-wrapper">
                        <span class="errorBlock"></span>
                        <input autocomplete="off" class="input-url form-control" placeholder="URL to test" type="text"
                                required type="url" data-parsley-type="url">
                        <a href="#" class="btn btn-danger remove-me" >
                            -
                        </a>
                    </div>`; 

const getUrls = () => {
    return urls;
};

let buttonsActions = {
    addField: (element) => {
        console.log(element)
        $(element).next('.input-append').append(inputMarkup);
    },
    removeField: (item) => {
        item.parent().remove();
    },
    saveUrls: () => {
        urls = [];
        savedInputs = '';
        urlsSection.find('.input-url').each((i,item) => {
            urls.push($(item).val());
        })
        savedInputs = $('.input-append').html();
    },
    showModal: () => {
        modalUrl.modal('show');
    },
    cancelModal: () => {
        modalUrl.modal('hide');
        urlsSection.html('');
        urlsSection.html(savedInputs);
    }
};

const parsleyValidation =  {
    form: $('#url-form'),
    parsleyConf: {
        errorsContainer: (pEle) => {
            var $err = pEle.$element.siblings('.errorBlock');
            return $err;
        }
    },
    init: () => {
            parsleyValidation.form.parsley(parsleyValidation.parsleyConf)
            .on('form:submit', () => {
                return false; // Don't submit form 
            })
            .on('form:success', () => {
                buttonsActions.saveUrls();
                modalUrl.modal('hide');
            });
    }
};

// bind events to DOM
const bindEventsToUI = () => {
    
    btnCancelUrls.on('click', () => {
        buttonsActions.cancelModal();
    });
    doc.on('click', '.remove-me', (e) => {
        buttonsActions.removeField($(e.target));
    });
    urlModalTrigger.on('click', (e) => {
        buttonsActions.showModal();
    });
    urlsSection.on('keyup', 'input', (e) => {
        e.target.setAttribute("value", e.target.value); 
    })

};

// public interface
const init = () => {
    console.log('urls-modal'); 
    bindEventsToUI();
    parsleyValidation.init();
};


// export public interface
module.exports = {
    init:init,
    getUrls: getUrls,
    autoLunch: false
};


