const chalk = require("chalk");
const clearConsole = require("./clearConsole");

const isInteractive = process.stdout.isTTY;

const createCompiler = (webpack, config, appName, port) => {
  const compiler = webpack(config);

  compiler.plugin("invalid", () => {
    if (isInteractive) {
      clearConsole();
    }
    console.log("Compiling...");
  });

  compiler.plugin("done", () => {
    if (isInteractive) {
      clearConsole();
    }

    console.log(chalk.green("Compiled successfully!"));
    printInstructions(appName, port);
  });
  return compiler;
};

const printInstructions = (appName, port) => {
  console.log();
  console.log(`You can now view ${chalk.bold(appName)} in the browser.`);
  console.log();

  console.log(`  ${chalk.bold("Local:")}            port ${port}`);

  console.log();
  console.log("Note that the development build is not optimized.");
  console.log(
    `To create a production build, use ` + `${chalk.cyan("yarn build")}.`
  );
  console.log();
};

module.exports = {
  createCompiler
};
