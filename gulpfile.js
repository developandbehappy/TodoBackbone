var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');

gulp.task('eslint', function() {
	return gulp.src(['src/script/*.js'])
	       .pipe(eslint())
	       .pipe(eslint.format())
	       .pipe(eslint.failOnError());
});


gulp.task('test', ['eslint']);

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

gulp.task('default',['test']);