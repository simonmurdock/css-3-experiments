// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');

gulp.task('copy', function(){
  return gulp.src('index.html')
    .pipe(gulp.dest('wwwroot'));
});

gulp.task('css', function() {
    return gulp.src('css/css.css')
        .pipe(minifyCSS({keepBreaks:false}))
        .pipe(gulp.dest('wwwroot/css'));
});

gulp.task('scripts', function() {
    return gulp.src('js/gallery.js')
        .pipe(uglify())
        .pipe(gulp.dest('wwwroot/js'));
});

// Default Task
gulp.task('default', ['scripts', 'css', 'copy']);