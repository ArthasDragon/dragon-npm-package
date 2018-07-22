const webpack = require("webpack");
const paths = require("./paths");
const happyPacks = require("./happyPacks");
const { getEnvVariable } = require("./util");
const loaders = require("./loaders");

module.exports = (config = {}) => {
  const webpackConfig = {
    output: {
      path: paths.appBuild
    },
    module: {
      rules: loaders
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new webpack.DefinePlugin(getEnvVariable(config)),
      ...happyPacks
    ],
    resolve: {
      extensions: [".js", ".json", ".jsx", ".css"],
      alias: {
        "@components": paths.appComponents,
        "@util": paths.appUtil,
        "@common": paths.appCommon,
        "@store": paths.appStore,
        "@http": paths.appHttp,
        "@api": paths.appApi,
        "@constant": paths.appConstant,
        "@regex": paths.appRegex
      }
    }
  };

  const eslintRule = {
    test: /\.jsx?$/,
    enforce: "pre",
    use: [
      {
        options: {
          baseConfig: {
            extends: ["dragon-npmpackage"]
          }
        },
        loader: "eslint-loader"
      }
    ],
    include: paths.appSrc
  };

  if (config.eslint) {
    webpackConfig.module.rules.unshift(eslintRule);
  }

  return webpackConfig;
};
