var gulp = require('gulp'),
    nightwatch = require('gulp-nightwatch')

 gulp.task('test:nightwatch', () =>
  gulp.src('test/*.js', {read: false})
    .pipe(nightwatch({configFile: 'nightwatch.conf.BASIC.js'}))
    .once('error', () => {
      process.exit(1);
    })
);