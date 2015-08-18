var gulp = require('gulp');
var browserSync = require('browser-sync').create();


gulp.task('connect', function () {
	return browserSync.init({
		files: [
			'index.html',
			'src/*.css',
			'vendor/js/*.js'
		],
		port: 3000,
		logConnections: true,
		notify: false,
		server: './'
	});
});

gulp.task('default',['connect']);