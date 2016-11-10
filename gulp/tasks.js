var gulp 	= require('gulp');
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

gulp.task('styles',function(){
	return 	gulp.src(config.css.src)
			.pipe(plumber())
			.pipe(concat('all.css'))
			.pipe(sass())
			.pipe(plumber.stop())
			.pipe(gulp.dest(config.css.dest));
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
			.pipe(gulp.dest(config.images.dest));
});

gulp.task('browserify', function(){
	return 	browserify(config.scripts.src)
			.bundle()
			.pipe(plumber())
			.pipe(source('bundle.js'))
			.pipe(plumber.stop())
			.pipe(gulp.dest(config.scripts.dest));
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
			baseDir: './'
		}
	}, cb);
});

gulp.task('default',['styles','browserify','images','browsersync'],function(){
	gulp.watch(config.css.watch,['styles',browsersync.reload]);
	gulp.watch(config.scripts.watch, ['browserify',browsersync.reload]);
	gulp.watch(config.images.watch, ['images',browsersync.reload]);
});










































