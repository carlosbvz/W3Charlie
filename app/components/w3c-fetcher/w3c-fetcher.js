const pubsub 	= require('../../assets/scripts/core/pubsub.js');
const urlsModal = require('../../components/urls-modal/urls-modal.js');


// Variables
let btnTrigger = $('.btn-run-fetcher');


let fetcher = {
	urls: [],
	w3cErrorsByPage: [],
	$sideMenuSection: $('.side-menu'),
	ajaxCount: 0,
	delayer: 1000, // Time between every hit to the w3c site
	w3cURL: 'https://validator.w3.org/nu/?doc=',

	clearUI: () => { 
		fetcher.ajaxCount = 0;
	},
	getUrls: () => {
		fetcher.urls = [];
		fetcher.$sideMenuSection.find('.input-url').each((i,item) => {
            fetcher.urls.push($(item).val());
        })
        console.log(fetcher.urls)
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