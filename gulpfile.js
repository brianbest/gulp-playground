var gulp = require('gulp'),
    gutils = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat')
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    watchify = require('watchify'),
    babel = require('babelify');

// Browserify Babelify & Watchify on watch

function compile(watch) {
  var bundler = watchify(browserify('./source/javascript/app.js', { debug: true }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutils.log)
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('public/assets/javascript'))
      .pipe(livereload());
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

gulp.task('default',['jshint','watch']);

gulp.task('build-js',function(){
   compile(true);
});

gulp.task('jshint',function(){
   return gulp.src('source/javascript/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
    
});


gulp.task('build-css', function() {
   return gulp.src('source/scss/**/*.scss') 
    .pipe(sass())
    .pipe(gulp.dest('public/assets/stylesheets')).on('error', gutils.log)
    .pipe(livereload());
});

gulp.task('build-html', function() {
   return gulp.src('source/**/*.html') 
    .pipe(gulp.dest('public'))
    .pipe(livereload());
});

gulp.task('watch',function() {
    livereload.listen();
        gulp.watch('source/javascript/**/*.js',['jshint','build-js']); 
        gulp.watch('source/scss/**/*.scss',['build-css']); 
        gulp.watch('source/**/*.html',['build-html']); 
});    



