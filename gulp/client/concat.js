var gulp = require('gulp');
var concat = require('gulp-concat');

/* This will create concatenate all our angular
 * code into one file the bundle.js and place it
 * in the dist folder
 */
gulp.task('concat:js', function() {
  return gulp.src([
    './client/app/app.module.js',
    './client/app/**/*.module.js',
    './client/app/**/*.js'
  ])
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('./dist/'));
});

/* Concatenate all css files into bundle.css and place it
 * in dist/assets folder
 */
gulp.task('concat:css', function() {
  return gulp.src(['./client/assets/**/*.css'])
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./dist/'));
});
