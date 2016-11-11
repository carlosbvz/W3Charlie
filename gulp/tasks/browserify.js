'use strict';

var gulp 	= require('gulp-run-seq');
var config  = require('../config');
var plumber = require('gulp-plumber');
var source 	= require('vinyl-source-stream');
var browserify = require('browserify');


gulp.task('browserify', function(){
	return 	browserify(config.scripts.src)
			.bundle()
			.pipe(plumber())
			.pipe(source('bundle.js'))
			.pipe(plumber.stop())
			.pipe(gulp.dest(config.scripts.dest))
});