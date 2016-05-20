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
    buffer = require('vinyl-buffer');
    
gulp.task('default',['jshint','watch']);

gulp.task('jshint',function(){
   return gulp.src('source/javascript/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
    
});
gulp.task('build-js',function(){
   
   // set up the browserify instance on a task basis
    var b = browserify({
        
        debug: true
    }); 
    return b.bundle()
    .pipe(source('source/javascript/app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutils.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/assets/javascript'))
    .pipe(livereload());
    
    
//    return gulp.src('source/javascript/**/*.js')
//     .pipe(sourcemaps.init())
//         .pipe(concat('bundle.js'))
//         //.pipe(gulp.env.type === 'production' ? uglify() : gutils.noop())
//         .pipe(uglify())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('public/assets/javascript')).on('error', gutils.log)
//     .pipe(livereload());
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