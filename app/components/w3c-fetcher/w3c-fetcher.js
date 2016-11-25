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

	clearUI: function() {
		this.ajaxCount = 0;
	},
	getUrls: function() {
		this.urls = urlsModal.getUrls();
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
	},
	init: function() {
		this.clearUI();
		this.getUrls();
		this.getData();
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

// export public interface
module.exports = {
	init:init,
	autoLunch: true
};