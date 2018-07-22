const isDev = () => {
  return process.env.NODE_ENV !== "production";
};

const getEnvVariable = config => {
  const envVariable = {
    "process.env.NODE_ENV": JSON.stringify(
      isDev() ? "development" : "production"
    ),
    __DEV__: isDev()
  };

  const { env } = config;
  if (typeof env === "object" && typeof env !== null) {
    Object.keys(env).forEach(key => {
      envVariable[key] = JSON.stringify(env[key]);
    });
  }

  return envVariable;
};

module.exports = {
  isDev,
  getEnvVariable
};
