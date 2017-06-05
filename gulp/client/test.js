var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    exit = require('gulp-exit'),
    shell = require('gulp-shell');

gulp.task('test:client-setup', 
  shell.task('echo export PATH="$PWD"/frontend/bin:"$PATH" >> ~/.bash_profile')
)

/* This will run our mocha tests */
gulp.task('test:client', function(){
   return gulp.src('./frontend/test/*.js', {read: false})
    .pipe(mocha({reporter: 'spec'}))
    .pipe(exit());
});