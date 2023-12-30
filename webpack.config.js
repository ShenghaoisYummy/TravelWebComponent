const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/pages/index/index.js',
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  // source-map
  devtool: 'eval-cheap-module-source-map',

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
    rules:[
        //css
        {
            test:/\.css$/,
            use: ['style-load', 'css-loader']
        },
        //art
        {
            test:/\.art$/,
            use: ['art-template-loader']
        },
        //image
        {
            test:/\.(png|jpe?g|gif|svg)$/,
            use:['url-loader'],
            options: {
                limit: 10000,
                name: 'images/[name].[ext]',
                esModule: false
            }
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
    }) ]

};