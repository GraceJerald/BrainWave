import webpack from 'webpack';
import Config from 'webpack-config';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';

import {
  devServerPath,
} from './paths';

export default new Config()
  .extend('conf/webpack.common.js')
  .merge({
    devtool : 'source-map',

    devServer : {
      hot: true,
      host: '0.0.0.0',
      port : 3000,
      public: devServerPath,
      historyApiFallback : true,
      open: true,
    },

    plugins : [
      new StyleLintPlugin(),
      new HtmlWebpackPlugin({
        filename : 'index.html',
        inject : false,
        template : require('html-webpack-template'),
        appMountId : 'container',
        devServer : '',
        minify : {
          collapseWhitespace : true,
          preserveLineBreaks : true,
        },
        links: [
          {
            href: '/manifest.json',
            rel: 'manifest',
          },
        ],
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
      new webpack.LoaderOptionsPlugin({
        options : {
          eslint : {
            failOnWarning : false,
            failOnError : true,
            fix : false,
          },
        },
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV : JSON.stringify('development'),
          SERVER_URL : JSON.stringify(devServerPath),
        },
      }),
    ],
  });
