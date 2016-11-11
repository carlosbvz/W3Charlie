'use strict';

var gulp 		= require('gulp-run-seq');
var concat 		= require('gulp-concat');
var config  	= require('../config');
var sass 		= require('gulp-sass');
var plumber 	= require('gulp-plumber');
var sourcemaps 	= require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles',function(){
	return 	gulp.src(config.styles.src)
			.pipe(plumber())  
			.pipe(sourcemaps.init())
			.pipe(sass(config.sassOptions.dev).on('error', sass.logError))
		    .pipe(autoprefixer(config.autoPrefixerOptions.dev))
		    .pipe(sourcemaps.write('./maps'))
			.pipe(plumber.stop())
			.pipe(gulp.dest(config.styles.dest));
});
gulp.task('styles:prod',function(){
	return 	gulp.src(config.styles.src)
			.pipe(plumber())
			.pipe(concat('main.css'))
			.pipe(sass(config.sassOptions.prod).on('error', sass.logError))
		    .pipe(autoprefixer())
			.pipe(plumber.stop())
			.pipe(gulp.dest(config.styles.dest));
});