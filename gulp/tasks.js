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
      .pipe(app.dest(config.tmp));
});

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

gulp.task('scripts',function(){
	return 	gulp.src(config.scripts.src)
			.pipe(plumber())
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(concat('bundle.js'))
			.pipe(uglify())
			.pipe(plumber.stop())
			.pipe(gulp.dest(config.scripts.dest))
});

gulp.task('images', function() {
	return 	gulp.src(config.images.src)
			.pipe(imagemin())
			.pipe(gulp.dest(config.images.dest))
});

gulp.task('browserify', function(){
	return 	browserify(config.scripts.src)
			.bundle()
			.pipe(plumber())
			.pipe(source('bundle.js'))
			.pipe(plumber.stop())
			.pipe(gulp.dest(config.scripts.dest))
});

gulp.task('serve', function(){
	return 	connect().use(serve('./'))
			.listen(8080)
			.on('listening',function(){
				console.log('Server running: View at hhtp://localhost:8080');
			});
});


gulp.task('browsersync', function(cb){
	return browsersync({
		server: {
			baseDir: config.tmp
		}
	}, cb);
});

gulp.task('default',[[ ['styles','browserify','images','assemble'], 'browsersync' ]],function(){
	gulp.watch(config.styles.watch,['styles',browsersync.reload]);
	gulp.watch(config.scripts.watch, ['browserify',browsersync.reload]);
	gulp.watch(config.images.watch, ['images',browsersync.reload]);
	gulp.watch(config.assemble.watch, ['assemble',browsersync.reload]);
});







































