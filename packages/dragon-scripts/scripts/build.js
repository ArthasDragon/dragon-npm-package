process.env.NODE_ENV = "production";

const webpack = require("webpack");
const fs = require("fs-extra");
const paths = require("../config/paths");
const {
  mutateConfigByFunction,
  mutateConfigByProperty
} = require("../util/webpackConfig");
const mergeConfig = require("../util/mergeConfig")();
let webpackConfig = require("../config/webpack.prod.config")(mergeConfig);

const build = () => {
  webpackConfig = mutateConfigByProperty(webpackConfig, mergeConfig);
  webpackConfig = mutateConfigByFunction(webpackConfig, mergeConfig);

  const compiler = webpack(webpackConfig);
  compiler.run((err, stats) => {
    if (err) {
      return console.log(err);
    }

    console.log(
      stats.toString({
        colors: true,
        modules: false,
        children: false
      })
    );
  });
};

const cleanAndBuild = () => {
  fs.emptyDirSync(paths.appBuild);

  build();
};

cleanAndBuild();
