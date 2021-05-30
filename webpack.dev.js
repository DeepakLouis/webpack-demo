const path = require('path');
const common = require("./webpack.common");
const merge = require("webpack-merge");

module.exports = merge(common, {
    mode: "development",
    //devtool : "none" easy to read in main.js
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    }
})