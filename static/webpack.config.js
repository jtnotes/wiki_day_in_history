const path = require("path");
const HWP = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');
var config = {
  entry: {
    Index: "./Index.js",
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              // options...
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bulmaCustomized.css",
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: "resources/css/main.css",
    //       to: "resources/css/",
    //     },
    //     {
    //       from: "resources/css/blueprint-icons.css",
    //       to: "resources/css/",
    //     },
    //     {
    //       from: "resources/css/blueprint.css",
    //       to: "resources/css/",
    //     },
    //   ],
    // }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    })
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
    config.optimization = {
      minimize: false
    }
  }

  if (argv.mode === 'production') {
    config.optimization = {
      minimize: true
    }
  }

  return config;
};