const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const cssnano = require("gulp-cssnano");
const plumber = require("gulp-plumber");

gulp.task("scss", () => {
  return gulp
    .src("dev/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(
      autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
        cascade: true
      })
    )
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest("public/css"));
});


gulp.task('img', function() {
  return gulp
    .src('dev/images/**/*')
    .pipe(
    imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()],
      interlaced: true,
    })
    )
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/images'));
  });

gulp.task("default", ["scss", "img"], () => {
  gulp.watch("dev/scss/**/*.scss", ["scss"]);
  gulp.watch("dev/images/**/*", ["img"]);
});
