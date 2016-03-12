/**
 * Server tasks
 */

// Modules for webserver and livereload
var gulp = require('gulp'),
    express = require('express'),
    refresh = require('gulp-livereload'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 5000;

var sourceFolder =  'src',
    devFolder = 'build';

// Set up an express server (not starting it yet)
var server = express();
// Add live reload
server.use(livereload({port: livereloadport}));
// Use our 'build' folder as rootfolder
server.use(express.static('./' + devFolder));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.all('/*', function(req, res) {
    res.sendfile('index.html', { root: devFolder });
});

gulp.task('watch', ['lint'], function() {
    // Start webserver
    server.listen(serverport);
    // Start live reload
    refresh.listen(livereloadport);

    // Watch our scripts, and when they change run lint and browserify
    gulp.watch([sourceFolder + '/**/scripts*.js'],[
        'lint',
        'browserify'
    ]);
    // Watch our sass files
    gulp.watch([sourceFolder + '/**/images/*.scss'], [
        'images'
    ]);
    // Watch our sass files
    gulp.watch([sourceFolder + '/**/styles/*.scss'], [
        'styles'
    ]);

    gulp.watch([sourceFolder + '/index.html', sourceFolder + '/**/views/*.html'], [
        'views'
    ]);

    gulp.watch('./' + devFolder + '/**/*').on('change', refresh.reload);

});