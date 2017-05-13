var gulp = require('gulp'),
    apidoc = require('gulp-apidoc');

/**
* Run documentation generator
*/
gulp.task('apidoc', function(done){
   apidoc({
      src: "./server/",
      dest: "doc/"
   }, done);
});

gulp.task('default', ['apidoc']);