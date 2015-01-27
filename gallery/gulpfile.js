// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/viewmodels/*.js')
        .pipe(concat('viewmodels.js'))
        .pipe(gulp.dest('wwwroot/js'))
        .pipe(rename('viewmodels.min.js'))
        .pipe(uglify({mangle:true, compress:false}))
        .pipe(gulp.dest('wwwroot/js'));
});

gulp.task('minify-css', function() {
  gulp.src('css/*.css')
    .pipe(minifyCSS({keepBreaks:false}))
    .pipe(gulp.dest('wwwroot/css'))
});


// Default Task
gulp.task('default', ['scripts','minify-css']);