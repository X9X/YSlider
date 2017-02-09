const path = require("path");
const webpack = require("webpack");
module.exports = {
    entry: [
        './src/YSlider.js'
    ],
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'YSlider.min.js',
        library:"YSlider",
        libraryTarget: 'umd'
    },
    module: {
        rules: [
          {test: /\.(js|jsx)$/, use: 'babel-loader'}
        ]
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
