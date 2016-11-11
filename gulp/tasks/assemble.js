'use strict';

var gulp 		= require('gulp-run-seq');
var config  	= require('../config');
var plumber 	= require('gulp-plumber');
var assemble 	= require('assemble');
var app 		= assemble();
var extname  	= require('gulp-extname');
var _        	= require('lodash');

gulp.task('load',function(cb) {
	//Set main assemble options
  app.layouts('./app/layouts/*.hbs');
  app.pages('app/pages/**/*.hbs');
  app.partials('app/components/**/*.hbs');
  app.engine('hbs', require('engine-handlebars'));
  app.data('app/components/**/*.json');

  // //Custom helpers
  app.helper('get', function(prop) {
    return get(this.context, prop);
  });

  app.helper('pagename', function(){
    let url = get(this.context, 'view.path');;
    let pagenameArr = url.split('/');
    let pagename = _.last(pagenameArr);
        pagename = pagename.split('.')[0];
    return pagename;
  });
  
  cb();
});
//Assemble main task
gulp.task('assemble', ['load'], function(){
    return app.toStream('pages')
      .pipe(app.renderFile())
      .pipe(extname())
      .pipe(plumber())
      .pipe(app.dest(config.assemble.dest));
});