var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('lint:server', function() {
  return gulp.src(['./server/**/*.js'])
            .pipe(jshint('./server/.jshintrc'))
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(jshint.reporter('fail'));
});

