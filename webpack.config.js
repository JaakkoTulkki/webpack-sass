const path = require('path')
let autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: ['babel-polyfill', './src/index.js', './src/scss/index.scss', './src/scss/testname.scss'],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/},
      {test: /\.(png|woff|woff2|eot|ttf|otf|svg)$/, loader: 'file-loader?name=fonts/[name].[ext]'},
      {
        test: /\.s?css$/,
        // https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/159
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
            loader: 'file-loader',
            options: {
                name: '[name].css',
                context: './src/css/',
                outputPath: 'css/',
                publicPath: '../'
            }
        },
        {
            loader: 'extract-loader'
        },
            {
            loader: "css-loader",
            options: {autoprefixer: false, sourceMap: true, importLoaders: 1}
          },
            {loader: 'sass-loader'},
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer]
              },
            },
          ],
        }),
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: 'static/index.html'}),
    new ExtractTextPlugin('/css/[name].css'),
  ],
  devServer: {
    historyApiFallback: true,
  },
}