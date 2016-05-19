// get the packages we want to use

var gulp = require('gulp'),
    gutil = require('gulp-util');
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass');
    sourcemaps = require('gulp-sourcemaps');
    
// define the default task and add the watch task to it    
gulp.task('default',['watch']);

//configure the jshint task
gulp.task('jshint',function () {
    return gulp.src('source/javascript/**/*.js')
        .pipe(sourcemaps.init())
            .pipe(jshint())
            .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())    
        .pipe(jshint.reporter('jshint-stylish'));
});

//configure the sass task
gulp.task('build-css',function () {
    return gulp.src('source/scss/**/*.scss')
        .pipe(sourcemaps.init())// process OG source
        .pipe(sass())
        .pipe(sourcemaps.write()) // pump out map
        .pipe(gulp.dest('public/assests/stylesheets'));
});

//configure what files we want to watch

gulp.task('watch', function () {
    gulp.watch('source/javascript/**/*.js',['jshint']);
    gulp.watch('source/scss/**/*.scss',['build-css']);
});