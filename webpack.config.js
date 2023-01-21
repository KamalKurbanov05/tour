const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { dirname } = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js',
        test: './test.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
        },
        port: 9000,

    },
    resolve: {
        extensions: ['.js', '.css', '.png'],
        alias: {
            "@": path.resolve(__dirname, "src/js"),
            "@css": path.resolve(__dirname, "src/css")
        }
    },

    plugins: [
        new HTMLWebpackPlugin(
            {
                template: './index.html',
            }
        ),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            { test: /\.svg$/, use: 'svg-inline-loader' },
            {
                test: /\.css$/i,
                loader: "css-loader",
                options: {
                  url: true,
                },
            },
            { test: /\.(js)$/, use: 'babel-loader' },
            {
                test: /\.(png|jpe?g|jpg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ]
    }
}