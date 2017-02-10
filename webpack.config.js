const path = require("path");
const webpack = require("webpack");
module.exports = {
    entry: [
        './src/YSlider.js'
    ],
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'YSlider.min.js',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
          {test: /\.(js|jsx)$/, use: 'babel-loader'}
        ]
    },
    devtool: 'source-map',
    // plugins:[
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false
    //         }
    //     })
    // ]
};
