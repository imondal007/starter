var gulp        = require('gulp'),
	browserSync = require('browser-sync').create(),
	uglify     = require('gulp-uglify'),
	rename     = require('gulp-rename'),
	sass       = require('gulp-sass'),
	plumber    = require('gulp-plumber');

//Html
gulp.task('html', function () {
	gulp.src('*.html')
		.pipe(plumber())
        .pipe(gulp.dest('dist/'));
});

//Styles
gulp.task('styles', function () {
	gulp.src('scss/*.scss')
		.pipe(plumber())
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(gulp.dest('css/'))
		.pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('dist/css/'));
});

//Uglify
gulp.task('scripts', function () {
	gulp.src('js/*.js')
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

// Static Server + watching scss/html files
gulp.task('serve', function() {
    browserSync.init({
        server: './'
    });
});

//Watch Task
gulp.task('watch', function() {
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('*.html', ['html']);
	gulp.watch('scss/*.scss', ['styles']);
	gulp.watch('*.html').on('change', browserSync.reload);
	gulp.watch('css/*.css').on('change', browserSync.reload);
})



// Default Task
gulp.task('default', ['styles', 'html', 'scripts', 'serve', 'watch']);