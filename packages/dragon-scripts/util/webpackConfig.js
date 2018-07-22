const mutateConfigByFunction = (webpackConfig, mergeConfig) => {
  if (typeof mergeConfig.webpack === "function") {
    webpackConfig = mergeConfig.webpack(webpackConfig);
  }

  return webpackConfig;
};

const mutateConfigByProperty = (webpackConfig, mergeConfig) => {
  webpackConfig.output.publicPath = mergeConfig.publicPath;
  webpackConfig.entry.vendor = [
    ...new Set(webpackConfig.entry.vendor.concat(mergeConfig.extraVendor))
  ];
  return webpackConfig;
};

module.exports = {
  mutateConfigByFunction,
  mutateConfigByProperty
};
