'use strict';

// var gulp 	= require('gulp');
var gulp 	= require('gulp-run-seq');
var concat 	= require('gulp-concat');
var uglify 	= require('gulp-uglify');
var watch 	= require('gulp-watch');
var myth 	= require('gulp-myth');
var config  = require('./config');
var sass 	= require('gulp-sass');
var jshint 	= require('gulp-jshint');
var plumber = require('gulp-plumber');
var imagemin =require('gulp-imagemin');
var connect = require('connect');
var serve 	= require('serve-static');
var browsersync = require('browser-sync');
var browserify = require('browserify');
var source 	= require('vinyl-source-stream');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var color = require('gulp-color');
var assemble = require('assemble');
var app = assemble();
var extname  = require('gulp-extname');
var _        = require('lodash');









gulp.task('default',[[ ['styles','browserify','images','assemble'], 'browsersync' ]],function(){
	gulp.watch(config.styles.watch,['styles',browsersync.reload]);
	gulp.watch(config.scripts.watch, ['browserify',browsersync.reload]);
	gulp.watch(config.images.watch, ['images',browsersync.reload]);
	gulp.watch(config.assemble.watch, ['assemble',browsersync.reload]);
});







































