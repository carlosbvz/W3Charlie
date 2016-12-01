const pubsub 	= require('../../assets/scripts/core/pubsub.js');
const urlsModal = require('../../components/urls-modal/urls-modal.js');


// globlas
const 	$btnTrigger 		= $('.btn-run-fetcher'),
 		$dataPagesSection 	= $('.w3c-data-pages');

let 	w3cErrorsByPage		= [];


const fetcher = {
	urls: [],
	$sideMenuSection: $('.side-menu'),
	ajaxCount: 0,
	delayer: 1000, // Time between every hit to the w3c site
	w3cURL: 'https://validator.w3.org/nu/?doc=',

	clearData: () => { 
		fetcher.ajaxCount = 0;
		w3cErrorsByPage = [];
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
						fetcher.ajaxCount++;
						let errors 		= $(htmlData).find('.error'),
							warnings 	= $(htmlData).find('.warning'),
							progress 	= (fetcher.ajaxCount*100)/fetcher.urls.length;
						fetcher.saveData(errors, warnings, url);
						render.byPage(errors, warnings, url);
						render.updateProgressBar(progress+'%');
						render.updateTotals(
							w3cErrorsByPage.map((item) => item.errors.length).reduce((a,b) => a+b , 0),
							w3cErrorsByPage.map((item) => item.warnings.length).reduce((a,b) => a+b , 0)
						);
						if(fetcher.ajaxCount === fetcher.urls.length ) { // all ajax calls are done
							render.enableRunBtn();
						}
					}});
				},fetcher.delayer);
				fetcher.delayer += 1500;
			});
		} else {
			// Show error msg
		}
	},
	saveData: (errors, warnings, url) => {
		w3cErrorsByPage.push({
			url: url,
			errors: errors,
			warnings: warnings
		}); 
	},
	init: () => {
		render.disableRunBtn();
		render.clearUI();
		fetcher.clearData();
		fetcher.getUrls();
		fetcher.getData();
	}
}

const render = {

 	$totalErrors: 	$('.total-errors'),
 	$totalWarnings: $('.total-warnings'),

 	clearUI: () => {
		$dataPagesSection.html('');
		render.updateProgressBar('0%');
		render.$totalErrors.html(0);
		render.$totalWarnings.html(0);
 	},

	byPage: (errors, warnings, url) => {
		let id 			= makeid(),
		  	data	 	= `
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
	},
	disableRunBtn: () => {
		$btnTrigger.button('loading');
	},
	enableRunBtn: () => {
		$btnTrigger.button('reset');
	},
	updateTotals: (totalErrors, totalWarnings) => {
		console.log('totalErrors: '+ totalErrors)
		render.$totalErrors.html(totalErrors);
		render.$totalWarnings.html(totalWarnings);
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