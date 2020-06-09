const gulp          = require('gulp');
const sass          = require('gulp-sass');
const cssmin        = require('gulp-cssnano');
const autoprefixer  = require('gulp-autoprefixer');
const concat        = require('gulp-concat');
const browserSync   = require('browser-sync').create();
const webpack       = require('webpack');
const fs            = require('fs');


function styles(){
	return gulp.src('./public/src/scss/*.scss')
		  .pipe(sass().on('error',sass.logError))
		  .pipe(concat('style.css'))
		  .pipe(cssmin())
		  .pipe(autoprefixer())
		  .pipe(gulp.dest('./public/dist'))
}

function compile(done) {
    return new Promise((resolve, reject) => {
        webpack(require('./webpack.config.js'), (err, stats) => {
            if (err) {
                return reject(err);
            }
            if (stats.hasErrors()) {
                return reject(new Error(stats));
            }
            resolve();
        });
    });
}

function watch() {
	browserSync.init({
		notify: false,
		server: {
			baseDir: "public"
		}
	});

	gulp.watch(['./public/src/scss/**/*.scss','./public/src/scss/*.scss','./public/src/scss/**/*.scss'],styles);
	gulp.watch(['./public/src/js/*.js'],compile);
	gulp.watch(['./public/*.html','./public/src/scss/*.scss','./public/src/scss/**/*.scss','./public/src/js/*.js'],browserSync.reload);
	
}

exports.styles     = styles;
exports.compile    = compile;
exports.watch      = watch;