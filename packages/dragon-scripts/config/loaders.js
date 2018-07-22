const paths = require("./paths");
const generateCssLoader = require("./generateCssLoader");

module.exports = [
  {
    test: /\.jsx?$/,
    exclude: paths.appModules,
    use: "happypack/loader?id=jsx"
  },
  generateCssLoader({
    include: paths.appSrc,
    exclude: paths.appStyle,
    happyId: "css_modules_post"
  }),
  generateCssLoader({
    include: paths.appStyle,
    exclude: paths.appLess,
    happyId: "css_post"
  }),
  generateCssLoader({
    include: paths.appLess,
    happyId: "less"
  }),
  generateCssLoader({
    include: paths.appModules,
    happyId: "css"
  }),
  {
    test: /\.(jpe?g|png|gif|svg)$/,
    use: {
      loader: "url-loader",
      options: {
        limit: 10000,
        name: "images/[name].[hash:8].[ext]"
      }
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)$/,
    use: {
      loader: "file-loader",
      options: {
        name: "fonts/[name].[ext]"
      }
    }
  }
];
