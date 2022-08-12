const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    target: 'web',
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack Output",
    }),
  ],

};