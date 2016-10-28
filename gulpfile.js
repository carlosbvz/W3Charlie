var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('styles',function(){
	return 	gulp.src('app/css/*.css')
			.pipe(concat('all.css'))
			.pipe(gulp.dest('dist/css/'));
});