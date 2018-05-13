const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { common, PATHS } = require('./webpack.common');

module.exports = {
    mode: 'production',
    output: {
        path: PATHS.dist,
        filename: '[name].[chunkhash].js',
        publicPath: './'
    },
    devtool: 'hidden-source-map',
    module: {
        rules: [
            ...common.module.rules,
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
            }
        ]
    },
    plugins: [
        ...common.plugins,
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css'
        })
    ]
};
