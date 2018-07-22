process.on("unhandledRejection", err => {
  throw err;
});

const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const os = require("os");

module.exports = (appName, appPath) => {
  if (!appName) {
    console.log(chalk.cyan("you should input your production name"));
  }
  const ownPackageName = require(path.join(__dirname, "..", "package.json"))
    .name;
  const ownPath = path.join(appPath, "node_modules", ownPackageName);
  const appPackage = require(path.join(appPath, "package.json"));

  // Copy over some of the devDependencies
  appPackage.dependencies = appPackage.dependencies || {};

  // Setup the script rules
  appPackage.scripts = {
    start: "hlj-scripts start",
    build: "hlj-scripts build"
  };

  fs.writeFileSync(
    path.join(appPath, "package.json"),
    JSON.stringify(appPackage, null, 2) + os.EOL
  );

  const templatePath = path.join(ownPath, "template");
  fs.copySync(templatePath, appPath);

  console.log();
  console.log(`Success! Created ${appName} at ${appPath}`);
  console.log("You can run:");
  console.log();
  console.log(chalk.cyan("  yarn start"));
  console.log("    Starts the development server.");
  console.log();
  console.log(chalk.cyan("  yarn build"));
  console.log("    Build for production.");
  console.log();
};
