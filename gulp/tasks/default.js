'use strict';

var gulp 		= require('gulp-run-seq');
var watch 		= require('gulp-watch');
var config  	= require('../config');
var browsersync = require('browser-sync');

gulp.task('default',[[ ['styles','scripts','images','assemble'], 'browsersync' ]],function(){
	gulp.watch(config.styles.watch,		['styles',browsersync.reload]);
	gulp.watch(config.scripts.watch, 	['scripts',browsersync.reload]);
	gulp.watch(config.images.watch, 	['images',browsersync.reload]);
	gulp.watch(config.assemble.watch, 	['assemble',browsersync.reload]);
});