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

gulp.task('styles',function(){
	return 	gulp.src(config.css.src)
			.pipe(concat('all.css'))
			// .pipe(myth())
			.pipe(sass())
			.pipe(gulp.dest(config.css.dest));
});

gulp.task('scripts',function(){
	return 	gulp.src(config.scripts.src)
			.pipe(plumber())
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(concat('all.js'))
			.pipe(uglify())
			.pipe(plumber.stop())
			.pipe(gulp.dest(config.scripts.dest))
});

gulp.task('images', function() {
	return 	gulp.src(config.images.src)
			.pipe(imagemin())
			.pipe(gulp.dest(config.images.dest));
});

gulp.task('serve', function(){
	return 	connect().use(serve('./'))
			.listen(8080)
			.on('listening',function(){
				console.log('Server running: View at hhtp://localhost:8080');
			});
})

gulp.task('default',['styles','scripts'],function(){
	gulp.watch(config.css.watch,['styles']);
	gulp.watch(config.scripts.watch, ['scripts']);
	gulp.watch(config.images.watch, ['images']);
});
















