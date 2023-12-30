const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve = dir => path.resolve(__dirname, dir);


module.exports = {
    mode: 'development',

    entry: './src/pages/index/index.js',
    output: {
        filename: 'js/[name].js',
        path: resolve('dist'),
    },
    // source-map
    devtool: 'cheap-module-eval-source-map',

    resolve: {
        extensions: ['.js'],
        alias: {
            api: resolve('src/api'),
            fonts: resolve('src/assets/fonts'),
            images: resolve('src/assets/images'),
            styles: resolve('src/assets/styles'),
            components: resolve('src/assets/components'),
            pages: resolve('src/pages')
        }
    },

    module: {
        rules: [
            //css
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            //art
            {
                test: /\.art$/,
                use: 'art-template-loader'
            },
            //image
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'images/[name].[ext]',
                        esModule: false
                    }
                }]
            },
            //fonts
            {
                test: /\.(woff2?|eot|ttf|otf)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/pages/index/index.art'
        })
    ]

};