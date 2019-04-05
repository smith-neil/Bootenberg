const webpack = require("webpack");
const path = require("path");

module.exports = {
    mode: 'development',
    optimization: {
		minimize: false
	},
    entry: {
        'blocks.bundle.min': [
            path.resolve(__dirname, 'includes/blocks/alert.js')
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'assets')
    }
};
