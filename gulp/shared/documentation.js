var gulp = require('gulp'),
    jsdoc = require('gulp-jsdoc3');
    //apidoc = require('gulp-apidoc'),

// JS Documentation
gulp.task('jsdoc', function (cb) {
    gulp.src(['README.md', './client/assets/native/js/*.js'], {read: false})
    .pipe(jsdoc(cb));
});

// API Documentation
//gulp.task('apidoc', function(done) {
//    apidoc({
//        src: "./server/routes/",
//        dest: "apidoc/"
//    }, done);
//});
