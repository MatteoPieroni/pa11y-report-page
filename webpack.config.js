const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
    entry: {
        app: './src/app.js'
    },
    mode: 'development',
    output: {
        path: __dirname + '/dist/js',
        filename: 'app.bundle.js'
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: false,
      port: 9100
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
    },
    plugins: [htmlPlugin]
}