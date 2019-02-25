const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
        path: __dirname + '/dist',
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
            test: /.scss?$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                }, {
                    loader: "css-loader",
                }, {
                    loader: "postcss-loader",
                    options: {
                        ident: 'postcss',
                        plugins: (loader) => [
                            require('autoprefixer'),
                        ]
                    }
                }, {
                    loader: "sass-loader"
                },
            ],
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
    },
    plugins: [
      htmlPlugin,
      new MiniCssExtractPlugin({
          filename: "[name].css",
          options: {
              publicPath: './'
          }
      }),
    ]
}