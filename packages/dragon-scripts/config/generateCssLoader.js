const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { isDev } = require("./util");

const generateCssLoader = function({ include, exclude, happyId }) {
  const hp = `happypack/loader?id=${happyId}`;
  return {
    test: /\.(css|less)$/,
    include,
    exclude,
    use: isDev()
      ? ["style-loader", hp]
      : ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [hp]
        })
  };
};
module.exports = generateCssLoader;
