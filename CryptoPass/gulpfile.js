var gulp = require('gulp');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var runSeq = require('run-sequence');
var notify = require('gulp-notify');
var eslint = require('gulp-eslint');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

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

gulp.task('buildCSS', function () {

    var sassCompilation = sass();
    sassCompilation.on('error', console.error.bind(console));

    return gulp.src('./src/styles/index.scss')
        .pipe(plumber({
            errorHandler: notify.onError('SASS processing failed! Check your gulp process.')
        }))
        .pipe(sourcemaps.init())
        .pipe(sassCompilation)
        .pipe(sourcemaps.write())
        .pipe(rename('index.css'))
        .pipe(gulp.dest('./'));
});

gulp.task('build', function () {
    runSeq(['buildJS', 'buildCSS']);
});

gulp.task('default', function(){
  gulp.start('build')

  gulp.watch('build/angular/**', function () {
    runSeq('buildJS');
  });
  gulp.watch('src/styles/**', function () {
      runSeq('buildCSS');
  });

})
