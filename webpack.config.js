const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devServer: {
    contentBase: './dist',
    hot: true
  },
  devtool: 'inline-source-map',
  entry: {
    app: './src/index.js',
  },
  mode: 'development',
  module: {
    rules: [
      { test:/\.(s*)css$/i, use:['style-loader','css-loader','sass-loader'] },
      // /\.(s*)css$/
      //{ test:/\.s[ac]ss$/i, use:['style-loader','css-loader','sass-loader'] },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'yankees-data-structures.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.ejs",
      templateParameters: { 'title': 'YANKEES AND DATA STRUCTURES' }
    }),
    new CopyWebpackPlugin([
      {from:'src/data/images',to:'images'},
      {from:'src/styles/prism.css',to:'prism.css'},
      {from:'src/prism.js',to:'prism.js'}
    ]),
  ]
};
