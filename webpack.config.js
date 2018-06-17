const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'eval-source-map',
  output: {
    publicPath: '/'
  },
  devServer: {
    compress: true,
    port: 9000,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {minimize: true}
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
}
