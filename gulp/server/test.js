var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    exit = require('gulp-exit');

/* This will run our mocha tests */
gulp.task('test:server', ['backend:babel'], function(){
   return gulp.src('./backend/dist/test/*.js', {read: false})
    .pipe(mocha({reporter: 'spec'}))
    .pipe(exit());
});
