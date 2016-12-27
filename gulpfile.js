var gulp        = require('gulp'),
	browserSync = require('browser-sync').create(),
	uglify      = require('gulp-uglify'),
	rename      = require('gulp-rename'),
	sass        = require('gulp-sass'),
	plumber     = require('gulp-plumber'),
	cleanCSS    = require('gulp-clean-css'),
	imagemin    = require('gulp-imagemin');


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

//Watch Task
gulp.task('watch', function() {
	gulp.watch("scss/*.scss", ['styles']);
    gulp.watch("css/*.css").on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("js/*.js").on('change', browserSync.reload);
})


// Default Task
gulp.task('default', ['styles', 'serve', 'watch']);


//////////////////////////////////////////////////////////
///                      Build Task                    ///
//////////////////////////////////////////////////////////

// Build Server
gulp.task('build-serve', function() {
    browserSync.init({
        server: "./dist"
    });
});

//CSS
gulp.task('css', function() {
  	gulp.src('css/*.css')
  		.pipe(gulp.dest('dist/css'))
    	.pipe(cleanCSS({compatibility: 'ie8'}))
    	.pipe(rename({suffix:'.min'}))
    	.pipe(gulp.dest('dist/css'));
});

//Html
gulp.task('html', function () {
	gulp.src('*.html')
		.pipe(plumber())
        .pipe(gulp.dest('dist/'));
});

//Images
gulp.task('image', () =>
    gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);

//Uglify
gulp.task('scripts', function () {
	gulp.src('js/*.js')
		.pipe(plumber())
		.pipe(gulp.dest('dist/js'))
		.pipe(uglify())
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest('dist/js'));
});

//Build Task
gulp.task('build', ['css', 'html', 'scripts', 'image', 'build-serve']);
