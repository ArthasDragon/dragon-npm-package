#!/usr/bin/env node



const { spawnSync } = require("child_process");
const script = process.argv[2];
const productionType = process.argv[3];
const name = process.argv[4];
const path = process.argv[5] || process.cwd();
const createReact = require("../scripts/init");

switch (script) {
  case "start":
  case "build":
    spawnSync("node", [require.resolve("../scripts/" + script)], {
      stdio: "inherit"
    });
    break;
  case "init":
    if (productionType === "react") {
      createReact(name, path);
    }
    break;
  default:
    console.log(`Unknown script ${script}.`);
    break;
}
