var gulp = require('gulp');

/* This will create the dist folder
 * That is ready to serve by our backend
 */
gulp.task('dist', [
// 'lint:server',
// 'lint:client', uncomment this when ready to turn linting on
  'bower',
  'concat:css',
  'concat:js',
  'copy:assets',
  'copy:bower-components',
  'copy:views',
  'copy:css',
  'copy:js',
  'copy:images'
]);