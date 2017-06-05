var  nodemon = require('gulp-nodemon'),
     shell = require('gulp-shell');

var gulp = require('gulp');


/* Serve the server. gulp-nodemon is used for automatic
 * restarting upon changes to *.js files, excluding tests.
 * Note: do not start directories with ./ in watch and ignore
 */
gulp.task('serve:backend', function() {
  return nodemon({
    script: 'backend/app.js',
    watch: ['backend/**/*.js'],
    ignore: ['backend/test/**/*.js']
  })
  .on('restart', function() {
    console.log('Server restarting. Please wait.');
  });
});

/* Use foreman to serve the server, allowing gulp-nodemon
 * to automatically access the .env file.
 */
gulp.task('backend', function() {
  return gulp.src('')
    .pipe(shell('nf run gulp serve:backend'))
});