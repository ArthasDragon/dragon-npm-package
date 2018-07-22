import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import pkg from "./package.json";

export default {
  input: "src/index.js",
  output: [{ file: pkg.main, format: "cjs" }],
  plugins: [
    // resolve({
    //   jsnext: true,
    //   main: true,
    //   browser: true
    // }),
    babel({
      exclude: "node_modules/**",
      plugins: ["external-helpers"]
    }),
    commonjs()
  ]
};
