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