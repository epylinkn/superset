var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Efficiently evaluate modules with source maps
  devtool: 'eval',

  // Set entry point to ./src/main and include necessary files for hot load
  entry: ['babel-polyfill', './src/index'],

  // This will not actually create a bundle.js file in ./build. It is used
  // by the dev server for dynamic hot loading.
  output: {
    path: __dirname + '/build/',
    filename: 'app.js',
    publicPath: '/'
  },

  // Necessary plugins for hot load
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
    }),
  ],

  // Transform source code using Babel and React Hot Loader
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader'],
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader',
        ],
      },

      // font-awesome-webpack has weird versioned urls, e.g. ?v=1.2.3
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])$/,
        loader: "file-loader"
      },

      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=build/fonts/[name].[ext]'
      },

      // auth0 lock
      {
        test: /node_modules[\\\/]auth0-lock[\\\/].*\.js$/,
        loaders: [
          'transform-loader/cacheable?brfs',
          'transform-loader/cacheable?packageify',
        ],
      },
      {
        test: /node_modules[\\\/]auth0-lock[\\\/].*\.ejs$/,
        loader: 'transform-loader/cacheable?ejsify',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },

  // Automatically transform files with these extensions
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
  },

  devServer: {
    host: '127.0.0.1',
    port: 3000,
    historyApiFallback: true,
    hot: true,
    inline: true,
  },
};
