const webpack = require("webpack");
const path = require("path");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

module.exports = {
    mode: 'development',
    optimization: {
		minimize: false
	},
    entry: {
        'blocks.bundle.min': [
            path.resolve(__dirname, 'includes/blocks/alert/index.js')
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
            },
            {
                test: /\.(scss|sass)$/,
                exclude: /node_modules/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader",
                        "sass-loader"
                    ]
                })
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'assets')
    },
    plugins: [
        new ExtractTextWebpackPlugin("style-editor.css")
    ]
};
