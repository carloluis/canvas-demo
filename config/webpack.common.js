const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist')
};

console.info('dirname', __dirname);

const common = {
    context: __dirname,
    entry: [PATHS.src],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    enforce: true,
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './node_modules/html-webpack-template/index.ejs',
            title: 'Canvas Demo',
            meta: [
                {
                    name: 'description',
                    content: 'HTML5 canvas demo using Webpack, ES6, SASS'
                },
                {
                    name: 'keywords',
                    content: 'canvas,canvas-demo,html5,es6+,sass,animations'
                }
            ],
            favicon: './src/favicon.ico',
            bodyHtmlSnippet: '<canvas></canvas>',
            inject: false,
            minify: {
                collapseWhitespace: true,
                conservativeCollapse: true,
                preserveLineBreaks: true,
                useShortDoctype: true,
                html5: true
            },
            mobile: true
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(PATHS.src, 'favicon.ico'),
                to: path.join(PATHS.dist, 'favicon.ico')
            }
        ]),
    ],
    stats: {
        children: false
    }
};

module.exports = {
    common,
    PATHS
};
