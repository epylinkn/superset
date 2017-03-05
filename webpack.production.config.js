var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * This is the Webpack configuration file for production.
 */
module.exports = {
  devtool: 'source-map',

  entry: ['babel-polyfill', './src/index'],

  output: {
    path: __dirname + '/build/',
    filename: 'app.js?[hash]',
  },

  plugins: [
    new ExtractTextPlugin('app.css?[hash]', { allChunks: true }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
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

  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
  },
};
