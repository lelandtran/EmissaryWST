const gulp = require('gulp');
const sourceMaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const path = require('path');

const paths = {
  backend: {
    sourceRoot: path.join(__dirname, 'backend', 'src'),
    es7: path.join(__dirname, 'backend', 'src', '**/*.js'),
    dist: path.join(__dirname, 'backend', 'dist'),
  },
};

// Gulp task to compile ES2017 code to ES2015 code with babel
gulp.task('backend:babel', function() { return gulp
  .src(paths.backend.es7)
  .pipe(sourceMaps.init())
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(sourceMaps.write('.', { sourceRoot: paths.backend.sourceRoot }))
  .pipe(gulp.dest(paths.backend.dist))
});

// Gulp task to watch for changes to any javascript files in source, when
// they do change it will compile the changed code
gulp.task('backend:watch', function()  {
  gulp.start('backend:babel');
  gulp.watch(paths.backend.es7, ['backend:babel'])
});

var dir = require('require-dir');

dir('./gulp/', { recurse: true });

