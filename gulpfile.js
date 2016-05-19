var gulp = require('gulp'),
    gutils = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat')
    uglify = require('gulp-uglify');
    
gulp.task('default',['jshint','watch']);

gulp.task('jshint',function(){
   return gulp.src('source/javascript/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
    
});
gulp.task('build-js',function(){
   return gulp.src('source/javascript/**/*.js')
    .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        //.pipe(gulp.env.type === 'production' ? uglify() : gutils.noop())
        .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/javascript')); 
});

gulp.task('watch',function() {
   gulp.watch('source/javascript/**/*.js',['jshint','build-js']); 
});    