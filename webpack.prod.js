
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin           = require("copy-webpack-plugin");

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser       = require('terser-webpack-plugin');

module.exports = {
     mode: 'production',

     output: {
          clean: true,
          filename: 'main.[contenthash].js'
     },

     module: {
          rules: [
               {
                    test   :   /\.html$/,
                    loader : 'html-loader',
                    options: {
                         sources: false
                    }
               },
               {
                    test   : /\.css$/,
                    exclude: /styles.css$/,
                    use    :  ['style-loader', 'css-loader']
               },
               {
                    test: /styles.css$/,
                    use : [ MiniCssExtractPlugin.loader, 'css-loader']
               },
               {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [
                      {
                        loader: 'file-loader',
                      },
                    ],  
               },
               {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                         loader: "babel-loader",
                         options: {
                              presets: ['@babel/preset-env']
                         }
                    }   
               }
          ]
     },

     optimization: {
          minimize: true,
          minimizer: [
               new CssMinimizer(),
               new Terser(),
          ]
     },

     plugins: [
          new HtmlWebpackPlugin({
               title   : 'My Webpack App',
               filename : 'index.html',
               template: './src/index.html'
          }),

          new MiniCssExtractPlugin({
               // [name] pone el nombre por defecto. Si adem??s a??adimos [fullhash] a??ade un c??digo aleatorio y 
               //que cambiar??a cada vez que se actualiza el archivo. Para evitar problemas con la cach??
               filename    : '[name].[fullhash].css',
               ignoreOrder: false
          }),

          new CopyPlugin({
               patterns: [
                 { from: "src/assets/", to: "assets/" }
               ]
          }),
     ],
}