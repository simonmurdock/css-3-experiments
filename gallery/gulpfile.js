// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');

// // Concatenate & Minify JS
// gulp.task('scripts', function() {
//     return gulp.src('js/linear_partition.js')
//         .pipe(gulp.dest('wwwroot/js'))
//         .pipe(rename('linear_partition.min.js'))
//         .pipe(uglify({mangle:true, compress:true}))
//         .pipe(gulp.dest('wwwroot/js'));
// });
// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/gallery.js')
        .pipe(gulp.dest('wwwroot/js'))
        .pipe(rename('gallery.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('wwwroot/js'));
});

// Default Task
gulp.task('default', ['scripts']);