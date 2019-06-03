const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const notifier = require('node-notifier');
const c = require('ansi-colors');

function showError(err) {
    console.log( c.red(err.messageFormatted));
    notifier.notify({
        title: 'BŁĄD SASS',
        message: 'err.messageFormatted'
    });
}


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/."
        }
    });
});


gulp.task('sass', function () {
    return gulp.src('./scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed"  //compact, compressed, nested, expanded
        }).on('error', showError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
        }))
        .pipe(sourcemaps.write('.'))  //kropka jako string, nie bedzie komentarza w scss
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream())
});

gulp.task('watch', function() {
   gulp.watch('./scss/**/*.scss', ['sass']);
   gulp.watch("./dist/*.html").on('change', browserSync.reload);
});

gulp.task('default', function() {
    console.log('------------');
    gulp.start(['sass', 'watch', 'browser-sync']);
});