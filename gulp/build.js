/**
 * Build tasks
 */

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    flatten = require('gulp-flatten'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    htmlreplace = require('gulp-html-replace'),
    imagemin = require('gulp-imagemin');

var sourceFolder =  'src/app',
    devFolder = 'builds/dev',
    prodFolder = 'builds/prod',
    buildFolder = devFolder;

// Dev task
gulp.task('dev', ['clean', 'views', 'styles', 'images', 'lint', 'browserify']);
gulp.task('prod', ['clean', 'replaceForProd', 'minify', 'images', 'lint', 'uglify']);

gulp.task('setProd', function() {buildFolder = prodFolder;});

gulp.task('clean', function() {
    return gulp.src('./'+ buildFolder, { read: false }) // much faster
        .pipe(rimraf({force: true}));
});

// JSHint task
gulp.task('lint', function() {
    gulp.src(sourceFolder + '/**/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Styles task
gulp.task('styles', function() {
    return gulp.src(sourceFolder + '/**/styles/*.scss')
        // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        // Optionally add autoprefixer
        .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
        .pipe(concat('bundle.css'))
        // These last two should look familiar now :)
        .pipe(gulp.dest(buildFolder + '/css/'));
});

// Browserify task
gulp.task('browserify', function() {
    // Single point of entry (make sure not to src ALL your files, browserify will figure it out)
    return gulp.src([sourceFolder + '/main.js'])
        .pipe(browserify({
            insertGlobals: true,
            debug: false
        }))
        // Bundle to a single file
        .pipe(concat('bundle.js'))
        // Output it to our build buildFolder
        .pipe(gulp.dest(buildFolder + '/js'));
});

// Images task
gulp.task('images', function() {
    gulp.src(sourceFolder + '/**/images/*')
        .pipe(flatten())
        .pipe(imagemin())
        .pipe(gulp.dest(buildFolder + '/images/'));
});

// Views task
gulp.task('views', function() {
    gulp.src(sourceFolder + '/**/views/*')
        .pipe(flatten())
        // Will be put in the build/views buildFolder
        .pipe(gulp.dest(buildFolder + '/views/'));
    return gulp.src(sourceFolder + '/index.html')
        // And put it in the build buildFolder
        .pipe(gulp.dest(buildFolder + '/'));
});

gulp.task('minify', ['styles'], function() {
    gulp.src(buildFolder + '/css/bundle.css')
        .pipe(minifyCSS())
        .pipe(rename('bundle.min.css'))
        .pipe(gulp.dest(buildFolder + '/css'));
});

gulp.task('uglify', ['browserify'], function() {
    gulp.src(buildFolder + '/js/bundle.js')
        .pipe(uglify())
        .pipe(rename('bundle.min.js'))
        .pipe(gulp.dest(buildFolder + '/js'));
});

gulp.task('replaceForProd', ['views'], function() {
    gulp.src(buildFolder + '/index.html')
        .pipe(htmlreplace({
            'css': 'css/bundle.min.css',
            'js': 'js/bundle.min.js'
        }))
        .pipe(gulp.dest(buildFolder + '/'));
});