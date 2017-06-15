var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("babel", function () {
    return gulp.src('./client/assets/native/js/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./dist/assets/native/js'));
});