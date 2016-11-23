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
 	w3cFetcher: 	require('../../../components/w3c-fetcher/w3c-fetcher.js'),
 	urlsModal: 	require('../../../components/urls-modal/urls-modal.js'),





}

},{"../../../components/footer/footer.js":5,"../../../components/header/header.js":6,"../../../components/urls-modal/urls-modal.js":7,"../../../components/w3c-fetcher/w3c-fetcher.js":8,"./pubsub.js":4}],4:[function(require,module,exports){

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



},{"../../assets/scripts/core/pubsub.js":4}],8:[function(require,module,exports){
const pubsub = require('../../assets/scripts/core/pubsub.js');


// Variables
let btnTrigger = $('.btn-run-fetcher');


let fetcher = {
	urls: [],
	w3cErrorsByPage: [],
	ajaxCount: 0,
	delayer: 1000, // Time between every hit to the w3c site
	w3cURL: 'https://validator.w3.org/nu/?doc=',

	clearUI: function() {
		console.log('clearing UI');
		this.ajaxCount = 0;
	},
	getUrls: function() {
		this.urls = [
		'http://ah.digitas.com/?x=1',
		'http://ah.digitas.com/practice/athenaclinicals/her',
		'http://ah.digitas.com/practice/athenaclinicals/emr',
		'http://ah.digitas.com/practice/athenaclinicals/ehr-software-features',
		'http://ah.digitas.com/practice/athenacollector/medical-billing',
		'http://ah.digitas.com/practice/athenacollector/practice-management',
		'http://ah.digitas.com/practice/athenacollector/medical-billing-software-features',
		'http://ah.digitas.com/practice/athenacommunicator/patient-engagement',
		'http://ah.digitas.com/practice/athenacommunicator/patient-portal',
		'http://ah.digitas.com/practice/athenacommunicator/patient-portal-software',
		'http://ah.digitas.com/practice/athenacoordinator/medical-order-transmission',
		'http://ah.digitas.com/practice/athenatext/secure-text-messaging',
		'http://ah.digitas.com/practice/epocrates/clinical-decision-support',
		'http://ah.digitas.com/enterprise/athenaclinicals/ehr-systems',
		'http://ah.digitas.com/enterprise/athenacollector/revenue-cycle-management',
		'http://ah.digitas.com/enterprise/athenacoordinator/patient-access',
		'http://ah.digitas.com/enterprise/athenacommunicator/population-health',
		'http://ah.digitas.com/enterprise/epocrates/clinical-decision-support',
		'http://ah.digitas.com/enterprise/accountable-care-organizations/accountable-care-organizations',
		'http://ah.digitas.com/enterprise/academic-medical-centers/academic-medical-centers'
		];
	},
	getData: function() {
		$(this.urls).each(function(i,url){
			setTimeout( function(){ 
				let fetchingURL = fetcher.w3cURL+url;
				$.ajax({ url: fetchingURL, success: function(htmlData) { 
					fetcher.processData(htmlData,url);
					this.ajaxCount++;
				}});
			},this.delayer);
			this.delayer += 1500;
		});
	},
	processData: function(htmlData,url) {
		let errors   = $(htmlData).find('.error');
		let warnings = $(htmlData).find('.warning');
		this.w3cErrorsByPage.push({
			url: url,
			errors: errors,
			warnings: warnings
		}); 
		console.log(this.w3cErrorsByPage)
	},
	init: function() {
		this.clearUI();
		this.getUrls();
		this.getData();
		console.log(this.urls);
	}
}

// bind events to DOM
const bindEventsToUI = function() {
	btnTrigger.click(function() {
		fetcher.init();
	})

};

// public interface
const init = function() {
	console.log('w3c-fetcher'); 
	bindEventsToUI();
};

const handler = function(data) {
	
}


// export public interface
module.exports = {
	init:init,
	autoLunch: true
};
},{"../../assets/scripts/core/pubsub.js":4}]},{},[1]);
