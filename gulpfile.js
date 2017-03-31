var ngHtml2Js = require("gulp-ng-html2js");
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del');

gulp.task('html', function() {
	return gulp.src(["./src/template.html", "./src/customTemplate.html"])
	.pipe(ngHtml2Js({
		moduleName: "Gdo"
	}))
	.pipe(concat("partials.min.js"))
	.pipe(uglify())
	.pipe(gulp.dest("./tmp/"));
});

gulp.task('js', function() {
  return gulp.src([
    './src/destinos-autocomplete.js',
  ])
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify({mangle: false}))
  .pipe(gulp.dest('./tmp/'))
});

gulp.task('concat', ['js', 'html'], function() {
  return gulp.src(['./tmp/*.js'])
    .pipe(concat('destinos-autocomplete.min.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
  gulp.watch('./src/destinos-autocomplete.js', ['concat']);
  gulp.watch('./src/*.html', ['concat']);
});

gulp.task('clean', function(cb) {
  del(['./dist/*.js'], cb())
});

gulp.task('default', ['clean'], function() {
    gulp.start('concat', 'watch');
});