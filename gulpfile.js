var gulp = require('gulp');
var browserSync = require('browser-sync').create();


gulp.task('test', function() {
	process.exit(1);
});

gulp.task('connect', function () {
	return browserSync.init({
		files: [
			'index.html',
			'src/style/*.css',
			'src/script/*.js'
		],
		port: 3000,
		logConnections: true,
		notify: false,
		server: './'
	});
});

gulp.task('default',['connect']);