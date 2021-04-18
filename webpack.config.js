/* eslint-disable */

const path = require("path");

module.exports = {
  mode: "none",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ ".ts", ".js" ]
  },
  externals: {
    "gltf-js-utils": "gltf-js-utils",
    "three": "three",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "gltf-js-utils-three.js",
  }
};
