const gulp = require("gulp");
const babel = require("gulp-babel");
const cssmin = require("gulp-minify-css");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const cssModules = require("postcss-modules");
const path = require("path");
const fs = require("fs");
const hljGulps = require("hlj-gulp-plugins");

const getJSONFromCssModules = (cssFileName, json) => {
  console.log(
    cssFileName,
    json,
    cssFileName.substring(cssFileName.indexOf("src"))
  );
  let toFilePath = cssFileName
    .substring(cssFileName.indexOf("src"))
    .replace("src", "dist")
    .replace(".css", ".json");
  let cssName = path.basename(cssFileName, ".css");
  let jsonFileName = path.resolve("./dist", cssName + ".json");
  fs.writeFileSync(toFilePath, JSON.stringify(json));
};
gulp.task("jsToReact", function() {
  gulp
    .src("src/**/*.js")
    .pipe(babel())
    // .pipe(react()) //这里就是新加入的模块, 解析jsx用
    .pipe(gulp.dest("dist"));
});
// gulp.task('postcss', function() {
//   gulp
//     .src('src/**/*.css')
//     .pipe(postcss([cssmin, autoprefixer({ browsers: ['last 2 versions'] })]))
//     .pipe(gulp.dest('dist'))
// })
gulp.task("css", function() {
  gulp
    .src("src/**/*.css")
    .pipe(postcss([cssModules({ getJSON: getJSONFromCssModules })]))
    .pipe(gulp.dest("dist"));
});
gulp.task("cssToJs", function() {
  gulp.src("dist/**/index.js").pipe(hljGulps);
});
