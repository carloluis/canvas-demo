const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist')
};

module.exports = {
    context: __dirname,
    mode: 'production',
    entry: [PATHS.src],
    output: {
        path: PATHS.dist,
        filename: '[name].[chunkhash].js',
        publicPath: './'
    },
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
    devtool: 'hidden-source-map',
    module: {
        rules: [
            {
                test: /.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            camelCase: 'dashes',
                            minimize: true
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: '../node_modules/html-webpack-template/index.ejs',
            title: 'Canvas Demo',
            meta: [
                {
                    name: 'description',
                    content: 'HTML5 canvas demo using Webpack, ES6, SASS'
                }
            ],
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
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css'
        })
    ],
    stats: {
        children: false
    }
};
