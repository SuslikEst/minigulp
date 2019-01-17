const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const cssnano = require("gulp-cssnano");
const plumber = require("gulp-plumber");

gulp.task("scss", () => {
  return gulp
    .src("src/stylesheets/**/*.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(
      autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
        cascade: true
      })
    )
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest("public/stylesheets"));
});

gulp.task("default", ["scss"], () => {
  gulp.watch("src/stylesheets/**/*.scss", ["scss"]);
});
