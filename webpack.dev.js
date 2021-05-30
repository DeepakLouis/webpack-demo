const path = require('path');
const common = require("./webpack.common");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: "development",
    //devtool : "none" easy to read in main.js
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist") //__dirname - deepak/personal-file/webpack-demo
    },
    // No need for minification in dev as it takes time
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html" // for dynamically adding script file in html
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader", //3. Inject styles into DOM
                    "css-loader", //2. Turns css into commonjs
                    "sass-loader"  //1. Turns sass into css
                ]
            }
        ]
    }
})