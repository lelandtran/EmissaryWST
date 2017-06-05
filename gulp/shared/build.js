var uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    htmlify = require('gulp-angular-htmlify'),
    ngAnnotate = require('gulp-ng-annotate');

var gulp = require('gulp');

gulp.task('htmlify', ['copy:views'],function(){
  return gulp.src('./dist/**/*.html')
    .pipe(htmlify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('ng-annotate', ['concat:js'], function () {
  return gulp.src('dist/bundle.js')
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./dist/'));
});

/* Minify bundle.css. If it doesn't exist, create 
 * it first using concat:css
 */
gulp.task('minify:css', ['concat:css'], function() {
  return gulp.src('./dist/bundle.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/'))
});

/* Minify bundle.js */
gulp.task('minify:js', ['ng-annotate'], function() {
  return gulp.src('./dist/bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
});

/* Build the app without minification */
gulp.task('build:dev', ['dist']);

/* Build the app and minfy */
gulp.task('build:prod', ['dist', 'minify:js', /*'minify:css',*/ 'htmlify']);
