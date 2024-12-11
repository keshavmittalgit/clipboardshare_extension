const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: 'source-map', // Improved source maps for debugging
    entry: {
        popup: path.resolve('./src/popup/popup.tsx'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, // Matches .ts and .tsx files
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i, // Matches .css files
                use: ['style-loader', 'css-loader'], // Correct loader order
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: path.resolve('src/assets/manifest.json'), to: path.resolve(__dirname, 'dist') },
                { from: path.resolve('src/assets'), to: path.resolve(__dirname, 'dist') },
            ],
        }),
        new HtmlPlugin({
            title: 'ReactJs Boilerplate',
            filename: 'popup.html',
            chunks: ['popup'],
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules'], // Optional: for absolute imports
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'), // Correct output path
    },
};
