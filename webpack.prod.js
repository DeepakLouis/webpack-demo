const path = require('path');
const common = require("./webpack.common");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin"); //Present by default in node modules
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].[contentHash].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(), //minimize css. Without it files will be lengthy
            new TerserPlugin(), //minimize js. By default it will be included. If minimizer is overridden should include it.
            new HtmlWebpackPlugin({ //minimize html
                template: "./src/template.html",
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                }
            })
        ]
    },
    plugins: [
        //Without it html will be loaded first without any css as main.js is loaded last
        //Extracts css into new file and adds it in link tag above <body></body>
        new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
        //removes dist every time when rebuilt. 
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, //3. Extract css into files
                    "css-loader", //2. Turns css into commonjs
                    "sass-loader"  //1. Turns sass into css
                ]
            }
        ]
    }
})