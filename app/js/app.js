var main = require('./main.js');
var secondary = require('./secondary.js');



/*
| 	This approach is missing an 'initiator' which will look if the component 
|	is present in the DOM and then trigger the 'init' function
*/
main.init();
secondary.init();

