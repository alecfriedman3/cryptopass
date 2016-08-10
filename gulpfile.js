var gulp = require('gulp');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var runSeq = require('run-sequence');
var notify = require('gulp-notify');
var eslint = require('gulp-eslint');

gulp.task('lintJS', function () {

    return gulp.src(['./build/angular/**/*.js', './server/**/*.js'])
        .pipe(plumber({
            errorHandler: notify.onError('Linting FAILED! Check your gulp process.')
        }))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());

});

gulp.task('buildJS', ['lintJS'], function () {
    return gulp.src(['./build/angular/app.js', './build/angular/**/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/public'));
});

gulp.task('build', function () {
    runSeq(['buildJS']);
});

gulp.task('default', function(){
  gulp.start('build')

  gulp.watch('build/angular/**', function () {
    runSeq('buildJS');
  });

})
