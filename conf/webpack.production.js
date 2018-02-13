const Config = require('webpack-config');

const webpack = require('webpack');
const BabiliPlugin = require('babili-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const { devServerPath, outputDirName, outputPath } = require('./paths');

module.exports = new Config.Config()
  .extend('conf/webpack.common.js')
  .merge({
    output : {
      path : outputPath,
      publicPath : '/',
    },
    plugins : [
      new CleanWebpackPlugin([outputDirName], {
        root: process.cwd(),
        verbose: false,
      }),
      new CopyWebpackPlugin([
        { from: 'manifest.json' },
        { from: 'firebase-messaging-sw.js' },
      ]),
      new ExtractTextPlugin('bundle.css'),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: { discardComments: {removeAll: true } },
      }),
      new HtmlWebpackPlugin({
        filename : 'index.html',
        inject : false,
        template : require('html-webpack-template'),
        appMountId : 'container',
        minify : {
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          preserveLineBreaks : true,
        },
        // explicit viewport metatag provided below
        // mobile : true,
        meta: [
          {
            name: 'viewport',
            content: 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no',
          },
        ],
        lang : 'ru-RU',
        title : `BrainWave${process.env.NODE_ENV === 'development' ? ' WIP' : ''}`,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV : JSON.stringify('production'),
          SERVER_URL : JSON.stringify(devServerPath),
        },
      }),
      new BabiliPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
    ],
  });
