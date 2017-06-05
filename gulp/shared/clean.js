var gulp = require('gulp');
var del = require('del');

/* Remove the generated dist */
gulp.task('clean', function(cb) {
  del('./dist/', cb);
});