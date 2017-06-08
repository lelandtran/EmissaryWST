var gulp = require('gulp');


gulp.task('copy:assets', function () {
  return gulp.src(['./client/assets/**', '!./client/assets/native/js/*.js'])
    .pipe(gulp.dest('./dist/assets'));
});

gulp.task('copy:js', function () {
  return gulp.src('./client/assets/js/**/*.js')
     .pipe(gulp.dest('./dist/js'));
});

gulp.task('copy:css', function () {
  return gulp.src('./client/assets/css/**/*.css')
     .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy:images', function () {
  return gulp.src('./client/assets/images/**/*.*')
     .pipe(gulp.dest('./dist/images'));
});

gulp.task('copy:views', function () {
  return gulp.src('./client/assets/views/*.html')
     .pipe(gulp.dest('./dist'));
});

gulp.task('copy:bower-components', function () {
  return gulp.src('./client/bower_components/**')
    .pipe(gulp.dest('./dist/bower_components/'));
});