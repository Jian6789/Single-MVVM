var gulp = require('gulp'),
	babel = require('gulp-babel'),
	webpack = require('gulp-webpack'),
	rename = require('gulp-rename');

gulp.task('test', function() {
  return gulp.src('src/**/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
	.pipe(webpack())
	.pipe(rename('test.js'))
	.pipe(gulp.dest('test/'));
});