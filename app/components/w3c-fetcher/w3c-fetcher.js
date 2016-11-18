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