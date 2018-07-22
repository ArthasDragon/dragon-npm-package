const HappyPack = require("happypack");
const threadPool = HappyPack.ThreadPool({ size: 8 });

const cssModules = {
  modules: true,
  importLoaders: 1,
  localIdentName: "[path][name]__[local]--[hash:base64:5]"
};
const createHappyPack = function(id, loaders) {
  return new HappyPack({
    id,
    threadPool,
    loaders
  });
};

const jsxLoader = {
  loader: "babel-loader",
  options: {
    babelrc: false,
    cacheDirectory: true,
    presets: [
      [
        "env",
        {
          modules: false,
          targets: {
            browsers: ["last 2 versions"]
          }
        }
      ],
      "stage-2",
      "react"
    ],
    plugins: ["transform-decorators-legacy", "transform-object-rest-spread"]
  }
};

const cssLoader = { loader: "css-loader", options: { minimize: true } };

const postcssLoader = {
  loader: "postcss-loader",
  options: {
    config: {
      path: require.resolve("./postcss.config.js")
    }
  }
};

module.exports = [
  createHappyPack("jsx", [jsxLoader]),

  createHappyPack("css_modules_post", [
    {
      loader: "css-loader",
      options: {
        minimize: true,
        ...cssModules
      }
    },
    postcssLoader
  ]),

  createHappyPack("css_post", [cssLoader, postcssLoader]),

  createHappyPack("less", [cssLoader, "less-loader"]),

  createHappyPack("css", [cssLoader, "less-loader"])
  // createHappyPack('less', ['css-loader','less-loader']),
];
