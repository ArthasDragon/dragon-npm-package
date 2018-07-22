const { existsSync } = require("fs");
const { resolve } = require("path");

const exist_postcss_config = existsSync(
  resolve(process.cwd(), "postcss.config.js")
);

module.exports = Object.assign(
  {
    plugins: [
      require("precss")(),
      require("autoprefixer")({
        browsers: ["last 2 versions"]
      }),
      require("cssnano")({
        safe: true
      })
    ]
  },
  exist_postcss_config
    ? require(resolve(process.cwd(), "postcss.config.js"))
    : {}
);
