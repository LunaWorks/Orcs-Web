var gulp = require('gulp');
var ftp = require('vinyl-ftp');
var gutil = require('gulp-util');
var minimist = require('minimist');
var args = minimist(process.argv.slice(2));

console.log(args.user);
console.log(args.password);

gulp.task('deploy', function() {
  var remotePath = './';
  var conn = ftp.create({
    host: 'ftp.s5.domain-ellenorzes.hu',
    user: args.user,
    password: args.password,
    log: gutil.log
  });

  gulp.src(['index.html', './**/*'])
    .pipe(conn.newer(remotePath))
    .pipe(conn.dest(remotePath));
});
