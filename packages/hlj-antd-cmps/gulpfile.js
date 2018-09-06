const gulp = require("gulp");
const babel = require("gulp-babel");
const postcss = require("gulp-postcss");
const cssModules = require("postcss-modules");
const fs = require("fs");
const hljGulps = require("hlj-gulp-plugins");

const getJSONFromCssModules = (cssFileName, json) => {
  let toFilePath = cssFileName
    .substring(cssFileName.indexOf("src"))
    .replace("src", "dist")
    .replace(".css", ".json");
  fs.writeFileSync(toFilePath, JSON.stringify(json));
};
gulp.task("jsToReact", function() {
  gulp
    .src("src/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});
gulp.task("css", function() {
  gulp
    .src("src/**/*.css")
    .pipe(postcss([cssModules({ getJSON: getJSONFromCssModules })]))
    .pipe(gulp.dest("dist"));
});
gulp.task("cssToJs", function() {
  gulp.src("dist/**/index.js").pipe(hljGulps);
});
