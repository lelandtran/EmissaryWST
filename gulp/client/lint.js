var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    htmlhint = require('gulp-htmlhint');

gulp.task('lint:client', function() {
  return gulp.src(['./client/app/**/*.js'])
    .pipe(jshint('./client/.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

/* This will validate the html files
 */
gulp.task('lint:html', ['htmlify'],function(){
  return gulp.src('./dist/**/*.html')
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
});
