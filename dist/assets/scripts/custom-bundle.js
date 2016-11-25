(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
| 	Gets the initializer and inits it with all the modules
*/
var initializer = require('./core/initializer.js');
var modules 	= require('./core/modules');

initializer.init(modules);





},{"./core/initializer.js":2,"./core/modules":3}],2:[function(require,module,exports){


var getComponentsInUI = function() {
	var componetsList = [];
	var componentsInUI = document.querySelectorAll('[data-action-name]');
	for( var i = 0; i < componentsInUI.length; i++ ) {
		componetsList.push(componentsInUI[i].getAttribute('data-action-name'))
	}
	return componetsList;
}

var init = function(modules) {	
	components = getComponentsInUI();
	for( var module in modules ) {

		if(	(components.indexOf(module) != -1) // If the component is present in UI
							|| 							
			(modules[module].autoLunch === true)) { // If component needs to be autoLunched

				modules[module].init();
		}
	} 
}
 
module.exports = {
	init: init
}


},{}],3:[function(require,module,exports){
/*
|	Modules goes here
| 	Please use camelCase to name them
*/
module.exports = {

	pubsub: 	require('./pubsub.js'),
 	header: 	require('../../../components/header/header.js'),
 	footer: 	require('../../../components/footer/footer.js'),
 	w3cFetcher: require('../../../components/w3c-fetcher/w3c-fetcher.js'),
 	urlsModal: 	require('../../../components/urls-modal/urls-modal.js'),
 	progressBar:require('../../../components/progress-bar/progress-bar.js'),
 	rightPanel: require('../../../components/side-menu/side-menu.js'),


}

},{"../../../components/footer/footer.js":5,"../../../components/header/header.js":6,"../../../components/progress-bar/progress-bar.js":7,"../../../components/side-menu/side-menu.js":8,"../../../components/urls-modal/urls-modal.js":9,"../../../components/w3c-fetcher/w3c-fetcher.js":10,"./pubsub.js":4}],4:[function(require,module,exports){

var events = {};

var subscribe = function (eventName, fn) {  
    // if events[eventName] is not Null, Undefined nor empty, sets to himself
    // if it is undefined (not existed yet) it gets created.
    events[eventName] = events[eventName] || [];  
    events[eventName].push(fn);
};

var unsubscribe = function(eventName, fn) {
    if (events[eventName]) {
      for (var i = 0; i < events[eventName].length; i++) {
        if (events[eventName][i] === fn) {
          events[eventName].splice(i, 1);
          break;
        }
      };
    }
};

var trigger = function (eventName, data) {
    if (events[eventName]) {
      events[eventName].forEach(function(fn) {
        fn(data);
      });
    }
}


module.exports = {
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    trigger: trigger
}

},{}],5:[function(require,module,exports){
const pubsub = require('../../assets/scripts/core/pubsub.js');

// bind events to DOM
const bindEventsToUI = () => {

};

// public interface
const init = () => {
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
},{"../../assets/scripts/core/pubsub.js":4}],6:[function(require,module,exports){
const pubsub = require('../../assets/scripts/core/pubsub.js');

// bind events to DOM
const bindEventsToUI = function() {

};

// public interface
const init = function() {
	console.log('header');
};

const handler = function(data) {
	
}


// export public interface
module.exports = {
	init:init,
	autoLunch: false
};
},{"../../assets/scripts/core/pubsub.js":4}],7:[function(require,module,exports){
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
},{"../../assets/scripts/core/pubsub.js":4}],8:[function(require,module,exports){
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



},{"../../assets/scripts/core/pubsub.js":4}],9:[function(require,module,exports){
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
        $(element).closest('.input-append').append(inputMarkup);
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
    doc.on('click', '.btn-add-field', (e) => {
        e.preventDefault();
        buttonsActions.addField(e.target);
    });
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



},{"../../assets/scripts/core/pubsub.js":4}],10:[function(require,module,exports){
const pubsub 	= require('../../assets/scripts/core/pubsub.js');
const urlsModal = require('../../components/urls-modal/urls-modal.js');


// Variables
let btnTrigger = $('.btn-run-fetcher');


let fetcher = {
	urls: [],
	w3cErrorsByPage: [],
	ajaxCount: 0,
	delayer: 1000, // Time between every hit to the w3c site
	w3cURL: 'https://validator.w3.org/nu/?doc=',

	clearUI: () => { 
		fetcher.ajaxCount = 0;
	},
	getUrls: () => {
		fetcher.urls = urlsModal.getUrls();
	},
	getData: () => {
		if(fetcher.urls.length > 0 ) {
			$(fetcher.urls).each(function(i,url){
				setTimeout( function(){ 
					let fetchingURL = fetcher.w3cURL+url;
					$.ajax({ url: fetchingURL, success: function(htmlData) { 
						fetcher.processData(htmlData,url);
						fetcher.ajaxCount++;
					}});
				},fetcher.delayer);
				fetcher.delayer += 1500;
			});
		} else {
			// Show error msg
		}
	},
	processData: (htmlData,url) => {
		let errors   = $(htmlData).find('.error');
		let warnings = $(htmlData).find('.warning');
		fetcher.w3cErrorsByPage.push({
			url: url,
			errors: errors,
			warnings: warnings
		}); 
	},
	init: () => {
		fetcher.clearUI();
		fetcher.getUrls();
		fetcher.getData();
	}
}

// bind events to DOM
const bindEventsToUI = () => {
	btnTrigger.click(function() {
		fetcher.init();
	})

};

// public interface
const init = () => {
	console.log('w3c-fetcher'); 
	bindEventsToUI();
};

// export public interface
module.exports = {
	init:init,
	autoLunch: true
};
},{"../../assets/scripts/core/pubsub.js":4,"../../components/urls-modal/urls-modal.js":9}]},{},[1]);
