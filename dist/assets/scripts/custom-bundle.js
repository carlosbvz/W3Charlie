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
  console.log(data)
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
	// pubsub.trigger('peopleChanged', 3);
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
},{"../../assets/scripts/core/pubsub.js":4}],8:[function(require,module,exports){
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



},{"../../assets/scripts/core/pubsub.js":4}],10:[function(require,module,exports){
const pubsub 	= require('../../assets/scripts/core/pubsub.js');
const urlsModal = require('../../components/urls-modal/urls-modal.js');


// Variables
const btnTrigger = $('.btn-run-fetcher');
const $dataPagesSection = $('.w3c-data-pages');


const fetcher = {
	urls: [],
	w3cErrorsByPage: [],
	$sideMenuSection: $('.side-menu'),
	ajaxCount: 0,
	delayer: 1000, // Time between every hit to the w3c site
	w3cURL: 'https://validator.w3.org/nu/?doc=',

	clearUI: () => { 
		fetcher.ajaxCount = 0;
		$dataPagesSection.html('');
		render.updateProgressBar('0%');
	},
	getUrls: () => {
		fetcher.urls = [];
		fetcher.$sideMenuSection.find('.input-url').each((i,item) => {
            fetcher.urls.push($(item).val());
        })
	},
	getData: () => {
		if(fetcher.urls.length > 0 ) {
			$(fetcher.urls).each(function(i,url){
				setTimeout( function(){ 
					let fetchingURL = fetcher.w3cURL+url;
					$.ajax({ url: fetchingURL, success: function(htmlData) { 
						render.byPage(htmlData, url);
						fetcher.ajaxCount++;
						let progress = (fetcher.ajaxCount*100)/fetcher.urls.length;
						render.updateProgressBar(progress+'%');
					}});
				},fetcher.delayer);
				fetcher.delayer += 1500;
			});
		} else {
			// Show error msg
		}
	},
	init: () => {
		fetcher.clearUI();
		fetcher.getUrls();
		fetcher.getData();
	}
}

const render = {
	

	byPage: (htmlData,url) => {
		let id = makeid(),
			errors = $(htmlData).find('.error'),
			warnings = $(htmlData).find('.warning');

		let  data = `
			<div class="panel panel-default "> 						
			    <div class="panel-heading" role="tab" id="headingTwo"> 			
			      <p class="panel-title" role="button" data-toggle="collapse"	
			        data-parent="#accordion-pages" href="#`+id+`" 				
			        aria-expanded="false" aria-controls="`+id+`"> 									
			        <a class="collapsed" > 			
			        	`+ url +` 	 								
			        </a> 
			        <span class="badge badge-danger">Errors: `+errors.length+`</span>
			        <span class="badge badge-warning">Warnings: `+warnings.length+`</span>																
			      </p> 														
			    </div>	

			    <div id="`+id+`" class="panel-collapse collapse" 			
			    role="tabpanel" aria-labelledby="headingTwo"> 					
			      <div class="panel-body"> 	
			      	<div class="panel__errors">
			      		<ul>
			         		`+ render.issues(errors)+`
			         	</ul>
			         </div>	
			         <div class="panel__warnings">
			         	<ul>
			         		`+ render.issues(warnings)+`
			         	</ul>
			         </div>									
			      </div> 														
			    </div> 															
			  </div> 															
			</div>`;
		$dataPagesSection.append(data)
	},
	issues: (list) => {
		let data = '';
		$(list).each(function(i,item){
			data += '<li>'+$(item).html()+'</li><hr>';
		});
		return data;
	},
	updateProgressBar: (progress) => {

		pubsub.trigger('updateProgressBar', progress);
	}
}

const parsleyValidation =  {
    form: $('#url-form2'),
    parsleyConf: {
        errorsContainer: (pEle) => {
            var $err = pEle.$element.siblings('.errorBlock');
            return $err;
        }
    },
    init: () => {
            parsleyValidation.form.parsley()
            .on('form:submit', () => {
                return false; // Don't submit form 
            })
            .on('form:success', () => {
                fetcher.init();
            });
    }
};

const makeid = () => {
    let text = "";
     	possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( let i=0; i < 55; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

// bind events to DOM
const bindEventsToUI = () => {
	
};

// public interface
const init = () => {
	console.log('w3c-fetcher'); 
	bindEventsToUI();
	parsleyValidation.init();
};

// export public interface
module.exports = {
	init:init,
	autoLunch: true
};
},{"../../assets/scripts/core/pubsub.js":4,"../../components/urls-modal/urls-modal.js":9}]},{},[1]);
