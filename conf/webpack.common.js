import webpack from 'webpack';
import Config from 'webpack-config';
import cssnano from 'cssnano';
import path from 'path';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';

import {
  sourcePath,
} from './paths';

export default new Config()
  .merge({
    entry : [
      'react-hot-loader/patch',
      path.join(sourcePath, '/Root.jsx'),
    ],

    output : {
      publicPath : '/',
      filename : 'bundle.js',
      chunkFilename: '[name].[chunkhash].async.js',
    },

    context : path.join(__dirname, '../'),

    resolve : {
      extensions : [ '.js', '.jsx' ],
    },

    module : {
      rules : [
        {
          test : /\.jsx?$/,
          exclude : /node_modules/,
          loader : 'babel-loader',
          options: {
            plugins: ['lodash'],
          },
        },
        {
          enforce : 'pre',
          test : /\.jsx?$|\.json$/,
          exclude : /node_modules/,
          loader : 'eslint-loader',
          options : {
            emmitError : true,
            fix : true,
          },
        },
        {
          test : /\.(scss|css)$/,
          use : [
            {
              loader : 'style-loader',
            },
            {
              loader : 'css-loader',
              options : { importLoaders: 1 },
            },
            {
              loader : 'sass-loader',
            }],
        },
        {
          test : /\.(svg|png|jpe?g|gif)$/,
          use : [{
            loader : 'url-loader',
            options : {
              limit : 8192,
            },
          }],
        },
        {
          test : /\.(eot|svg|ttf|woff|woff2)$/,
          use : [
            {
              loader : 'file-loader',
            }],
        },
      ],
    },

    plugins : [
      new ExtractTextPlugin('bundle.css'),
      new LodashModuleReplacementPlugin,
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.LoaderOptionsPlugin({
        postcss : [
          cssnano({
            autoprefixer : {
              add : true,
              remove : true,
              browsers : ['> 2%'],
            },
            discardComments : {
              removeAll : true,
            },
            discardUnused : false,
            mergeIdents : false,
            reduceIdents : false,
            safe : true,
            sourcemap : true,
          }),
        ],
      }),
    ],
  });
