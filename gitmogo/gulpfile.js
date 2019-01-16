const gulp = require("gulp"), // Connect Gulp
  sass = require("gulp-sass"), //Connect Sass package,
  browserSync = require("browser-sync"), // Connect Browser Sync
  autoprefixer = require("gulp-autoprefixer"); // Connect the library to automatically add prefixes

gulp.task("sass", function() {
  // Create task Sass
  return gulp
    .src("app/scss/style.scss") // Take the source
    .pipe(sass().on("error", sass.logError)) // Transform Sass to CSS through gulp-sass
    .pipe(
      autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
        cascade: true
      })
    ) // Create prefixes
    .pipe(gulp.dest("app/css")) // Unload the result in a folder app/css
    .pipe(browserSync.reload({ stream: true })); // Updating CSS on the page when changing
});

gulp.task("browser-sync", function() {
  // Create task browser-sync
  browserSync({
    // Carry out browserSync
    server: {
      // Define server parameters
      baseDir: "app" // Server Directory - app
    },
    notify: false // Disable notifications
  });
});

gulp.task("watch", ["browser-sync", "sass"], function() {
  gulp.watch("app/scss/**/*.scss", ["sass"]); // Watching sass files in a folder sass
  gulp.watch("app/*.html", browserSync.reload); // Watching HTML files in the root of the project
  gulp.watch("app/js/**/*.js", browserSync.reload); // Watching JS files i folder js
});

gulp.task("build", ["sass"], function() {
  var buildCss = gulp
    .src([
      // Transferring libraries to production
      "app/css/**/*.css"
    ])
    .pipe(gulp.dest("dist/css"));

  var buildFonts = gulp
    .src("app/fonts/**/*") // Transferring fonts to production
    .pipe(gulp.dest("dist/fonts"));
  var buildJs = gulp.src("app/js/**/*").pipe(gulp.dest("dist/js"));

  var buildHtml = gulp
    .src("app/*.html") // Transferring HTML to production
    .pipe(gulp.dest("dist"));
});

gulp.task("default", ["watch"]);
