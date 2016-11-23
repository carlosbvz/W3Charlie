'use strict';

var gulp 	= require('gulp-run-seq');
var config  = require('../config');
var plumber = require('gulp-plumber');
var source 	= require('vinyl-source-stream');
var insert 	= require('gulp-insert'); // Not needed, remove from node_modules
var concat 	= require('gulp-concat');
var browserify = require('browserify');

/* 
|	This concats all vendor files
*/
gulp.task('scripts-vendor', function() {
	 gulp.src(config.scripts.vendor)
	.pipe(plumber())
	.pipe(concat('vendors-bundle.js'))
	.pipe(plumber.stop())
	.pipe(gulp.dest(config.scripts.dest));
});

/* 
|	This concats all custom modules
*/
gulp.task('browserify', function(){
	 	browserify(config.scripts.src)
			.bundle()
			.pipe(plumber())
			.pipe(source('custom-bundle.js'))
			.pipe(plumber.stop())
			.pipe(gulp.dest(config.scripts.dest));
});

/* 
|	This concats vendor files & custom modules
*/
gulp.task('scripts', ['browserify','scripts-vendor'], function(){
	gulp.src(['./dist/assets/scripts/vendors-bundle.js','./dist/assets/scripts/custom-bundle.js'])
	.pipe(concat('main.js'))
	.pipe(gulp.dest(config.scripts.dest));
});