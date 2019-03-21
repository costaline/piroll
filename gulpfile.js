// plugins

var gulp = require("gulp");

// var less = require("gulp-less");
var sass = require("gulp-sass");

var plumber = require("gulp-plumber");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var autoprefixer = require("gulp-autoprefixer");
var cleanCSS = require("gulp-clean-css");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var rename = require("gulp-rename");
var browserSync = require("browser-sync").create();
var del = require("del");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");

// var postcss = require("gulp-postcss");
// var autoprefixerPost = require("autoprefixer");
// var minify = require("gulp-csso");
// var webp = require("gulp-webp");
var gcmq = require("gulp-group-css-media-queries");

// functions

function clean() {
    return del(["build/*"]);
}

function copy() {
    return gulp.src([
        "source/fonts/**/*.{woff,woff2}",
        "source/img/**",
        "source/lib/**"
        ], {
            base: "source"
        })
        .pipe(gulp.dest("build"));
}

function style() {
  // return gulp.src("source/less/style.less")
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
      // .pipe(less())
      .pipe(sass())
      // .pipe(postcss([
      //     autoprefixerPost()
      // ]))
      .pipe(autoprefixer({
          browsers: [">0.1%"],
          cascade: false
      }))
      .pipe(gcmq())
      .pipe(gulp.dest("build/css"))
      // .pipe(minify())
      .pipe(cleanCSS({
          level: 2
      }))
      // .pipe(rename("style.min.css"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync.stream());
}

function html() {
    return gulp.src("source/*.html")
        .pipe(posthtml([
            include()
        ]))
        .pipe(gulp.dest("build"))
}

function script() {
  return gulp.src("source/js/**")
    .pipe(uglify({
      toplevel: true
    }))
    .pipe(gulp.dest("build/js"))
    .pipe(browserSync.stream());
}

function images() {
    return gulp.src("source/img/**/*.{png,jpg,svg}")
        .pipe(imagemin([
            imagemin.optipng({ optimizationLevel: 3 }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest("build/img"));
}

function sprite() {
    return gulp.src("source/img/icon-*.svg")
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest("build/img"));
}

function browserSyncReload(done) {
    browserSync.reload();
    done();
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "build/"
        },
        port: 3000
    });

    // gulp.watch("source/less/**/*.less", style);
    gulp.watch("source/sass/**/*.scss", style);
  
    gulp.watch("source/js/**", script);
    gulp.watch("source/*.html", gulp.series(html, browserSyncReload));
}

// functions--pub

function cleanghub() {
  return del([
    "../costaline.github.io/projects/piroll"
  ], { force: true });
}

function copyghub() {
  return gulp.src("build/**")
    .pipe(gulp.dest("../costaline.github.io/projects/piroll"));
}

// complex tasks
var build = gulp.series(clean, copy, gulp.parallel(style, html, script, images, sprite));
var dev = gulp.series(build, watch);
var publish = gulp.series(build, cleanghub, copyghub);

// export tasks

exports.clean = clean;
exports.style = style;
exports.sprite = sprite;
exports.html = html;
exports.script = script;
exports.images = images;

exports.cleanghub = cleanghub;
exports.copyghub = copyghub;

exports.copy = copy;
exports.watch = watch;

exports.default = build;
exports.build = build;
exports.dev = dev;

exports.publish = publish;
