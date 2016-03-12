/**
 * Build tasks
 */

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    flatten = require('gulp-flatten');

var sourceFolder =  'src',
    devFolder = 'builds/dev',
    prodFolder = 'builds/prod';

// Dev task
gulp.task('dev', ['clean', 'views', 'styles', 'images', 'lint', 'browserify'], function() { });

function isProduction() {
    return process.argv.indexOf('--production') > -1;
}

/**
 * Determines the environment folder by the --production parameter.
 */
function environmentSwitch() {
    var folder = devFolder;
    if (isProduction()) {
        folder = prodFolder;
    }
    return folder;
}

gulp.task('clean', function() {
    var folder = environmentSwitch();

    gulp.src('./'+ folder, { read: false }) // much faster
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
    var folder = environmentSwitch();
    gulp.src(sourceFolder + '/**/styles/*.scss')
        // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        // Optionally add autoprefixer
        .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
        .pipe(concat('bundle.css'))
        // These last two should look familiar now :)
        .pipe(gulp.dest(folder + '/css/'));
});

// Browserify task
gulp.task('browserify', function() {
    var folder = environmentSwitch();
    // Single point of entry (make sure not to src ALL your files, browserify will figure it out)
    gulp.src([sourceFolder + '/core/scripts/main.js'])
        .pipe(browserify({
            insertGlobals: true,
            debug: false
        }))
        // Bundle to a single file
        .pipe(concat('bundle.js'))
        // Output it to our build folder
        .pipe(gulp.dest(folder + '/js'));
});

// Images task
gulp.task('images', function() {
    var folder = environmentSwitch();
    gulp.src(sourceFolder + '/**/images/*')
        .pipe(flatten())
        .pipe(gulp.dest(folder + '/images/'));
});

// Views task
gulp.task('views', function() {
    var folder = environmentSwitch();
    // Get our index.html
    gulp.src(sourceFolder + '/index.html')
        // And put it in the build folder
        .pipe(gulp.dest(folder + '/'));

    // Any other view files from src/views
    gulp.src(sourceFolder + '/**/views/*')
        .pipe(flatten())
        // Will be put in the build/views folder
        .pipe(gulp.dest(folder + '/views/'));
});