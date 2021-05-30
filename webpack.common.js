module.exports = {
    entry: {
        main: "./src/index.js",
        vendor: "./src/vendor.js"
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ["html-loader"]  //converts <img src="/assest.img" /> to require('./assest.img').
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                    loader: "file-loader", //handles the require(). Moves the file in the mentioned folder. Adds the img in html dynamically
                    options: {
                        name: "[name].[hash].[ext]", 
                        outputPath: "imgs"
                    }
                }
            }
        ]
    }
}