'use strict';

var gulp 		= require('gulp-run-seq');
var imagemin 	=require('gulp-imagemin');
var config  	= require('../config');

gulp.task('images', function() {
	return 	gulp.src(config.images.src)
			.pipe(imagemin())
			.pipe(gulp.dest(config.images.dest))
});