#!/usr/bin/env node

"use strict";

const { spawnSync } = require("child_process");
const script = process.argv[2];

switch (script) {
  case "start":
  case "init":
  case "build":
    const res = spawnSync("node", [require.resolve("../scripts/" + script)], {
      stdio: "inherit"
    });
    break;
  default:
    console.log(`Unknown script ${script}.`);
    break;
}
