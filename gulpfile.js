var postcss = require('gulp-postcss');
var gulp = require('gulp');
var nested = require('postcss-nested');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var atImport = require("postcss-import");
var sourcemaps = require("gulp-sourcemaps");
var jsImport = require('gulp-js-import');

var plugins = [
	autoprefixer({browsers: ['last 1 version']}),
	cssnano(),
	nested,
	atImport()
];

gulp.task('default', ['watch']);

gulp.task('watch', function() {
	gulp.watch('src/css/*.css', ['css-content', 'css-popup']);
	gulp.watch('src/js/*.js', ['js-content']);
});

gulp.task('css-content', function () {
	return gulp.src('./src/css/content.css')
		.pipe(postcss(plugins))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('css-popup', function () {
	return gulp.src('./src/css/popup.css')
		.pipe(postcss(plugins))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('js-content', function () {
	return gulp.src(['src/js/content.js'])
		.pipe(jsImport({hideConsole: true}))
		.pipe(gulp.dest('dist/js'));
});

// gulp.task('js-popup', function () {
// 	return gulp.src(['src/js/popup.js'])
// 		.pipe(sourcemaps.init())
// 		.pipe(babel())
// 		.pipe(webpack({output: {filename: 'popup.js'} }))
// 		.pipe(sourcemaps.write('.'))
// 		.pipe(gulp.dest('dist/js'));
// });
