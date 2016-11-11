'use strict';

var gulp 	= require('gulp-run-seq');
var config  = require('../config');
var browsersync = require('browser-sync');

gulp.task('browsersync', function(cb){
	return browsersync({
		server: {
			baseDir: config.dist
		}
	}, cb);
});