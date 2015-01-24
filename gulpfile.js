var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('default', function() {
  var patterns = [
    'tests/server/*.js',
    'tests/server/*/*.js'
  ];
  return gulp.src(patterns, {
      read: false
    })
    .pipe(mocha({
      reporter: 'spec',
      globals: {
        should: require('should')
      }
    }));
});
