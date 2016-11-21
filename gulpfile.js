var gulp        = require('gulp'),
	browserSync = require('browser-sync').create(),
	uglify      = require('gulp-uglify'),
	rename      = require('gulp-rename'),
	sass        = require('gulp-sass'),
	plumber     = require('gulp-plumber'),
	cleanCSS    = require('gulp-clean-css');

//Html
gulp.task('html', function () {
	gulp.src('*.html')
		.pipe(plumber())
        .pipe(gulp.dest('dist/'));
});

// Static Server
gulp.task('serve', function() {
    browserSync.init({
        server: "./"
    });
});

//Styles
gulp.task('styles', function () {
	gulp.src('scss/*.scss')
		.pipe(plumber())
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(gulp.dest('css/'))
		.pipe(browserSync.stream());
});

//CSS
gulp.task('css', function() {
  	gulp.src('css/*.css')
  		.pipe(gulp.dest('dist/css'))
    	.pipe(cleanCSS({compatibility: 'ie8'}))
    	.pipe(rename({suffix:'.min'}))
    	.pipe(gulp.dest('dist/css'));
});

//Uglify
gulp.task('scripts', function () {
	gulp.src('js/*.js')
		.pipe(plumber())
		.pipe(gulp.dest('dist/js'))
		.pipe(uglify())
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest('dist/js'));
});

//Watch Task
gulp.task('watch', function() {
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('*.css', ['css']);
	gulp.watch('*.html', ['html']);
	gulp.watch("scss/*.scss", ['styles']);
    gulp.watch("*.html").on('change', browserSync.reload);
})



// Default Task
gulp.task('default', ['styles', 'css', 'html', 'scripts', 'serve', 'watch']);