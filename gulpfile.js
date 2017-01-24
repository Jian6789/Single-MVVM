var gulp = require('gulp'),
	babel = require('gulp-babel'),
	webpack = require('gulp-webpack'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify');

gulp.task('p', function() {
  return gulp.src('dist/single.js')
	.pipe(uglify())
	.pipe(rename('single.min.js'))
	.pipe(gulp.dest('dist/'));
});