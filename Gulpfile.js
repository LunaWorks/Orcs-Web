'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

// Modules for webserver and livereload
var express = require('express'),
    refresh = require('gulp-livereload'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 5000;

// Set up an express server (not starting it yet)
var server = express();
// Add live reload
server.use(livereload({port: livereloadport}));
// Use our 'build' folder as rootfolder
server.use(express.static('./build'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.all('/*', function(req, res) {
  res.sendfile('index.html', { root: 'build' });
});

// Dev task
gulp.task('dev', ['clean', 'views', 'styles', 'images', 'lint', 'browserify'], function() { });

// Clean task
gulp.task('clean', function() {
  gulp.src('./build', { read: false }) // much faster
  .pipe(rimraf({force: true}));
});

// JSHint task
gulp.task('lint', function() {
  gulp.src('src/**/scripts/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// Styles task
gulp.task('styles', function() {
  gulp.src('src/**/styles/*.scss')
  // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  // Optionally add autoprefixer
  .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
  .pipe(concat('bundle.css'))
  // These last two should look familiar now :)
  .pipe(gulp.dest('build/css/'));
});

// Browserify task
gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out)
  gulp.src(['src/core/scripts/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: false
  }))
  // Bundle to a single file
  .pipe(concat('bundle.js'))
  // Output it to our build folder
  .pipe(gulp.dest('build/js'));
});

// Images task
gulp.task('images', function() {
  gulp.src('src/**/images/*')
      .pipe(gulp.dest('build/images/'));
});

// Views task
gulp.task('views', function() {
  // Get our index.html
  gulp.src('src/index.html')
  // And put it in the build folder
  .pipe(gulp.dest('build/'));

  // Any other view files from src/views
  gulp.src('src/**/views/*')
  // Will be put in the build/views folder
  .pipe(gulp.dest('build/views/'));
});

gulp.task('watch', ['lint'], function() {
  // Start webserver
  server.listen(serverport);
  // Start live reload
  refresh.listen(livereloadport);

  // Watch our scripts, and when they change run lint and browserify
  gulp.watch(['src/**/scripts*.js'],[
    'lint',
    'browserify'
  ]);
  // Watch our sass files
  gulp.watch(['src/**/images/*.scss'], [
    'images'
  ]);
  // Watch our sass files
  gulp.watch(['src/**/styles/*.scss'], [
    'styles'
  ]);

  gulp.watch(['src/**/views/*.html'], [
    'views'
  ]);

  gulp.watch('./build/**').on('change', refresh.changed);

});

gulp.task('default', ['dev', 'watch']);
