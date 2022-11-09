
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin           = require("copy-webpack-plugin");

module.exports = {
     mode: 'development',

     output: {
          clean: true
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
               }
          ]
     },

     optimization: {},

     plugins: [
          new HtmlWebpackPlugin({
               title   : 'My Webpack App',
               filename : 'index.html',
               template: './src/index.html'
          }),

          new MiniCssExtractPlugin({
               // [name] pone el nombre por defecto. Si además añadimos [fullhash] añade un código aleatorio y 
               //que cambiaría cada vez que se actualiza el archivo. Para evitar problemas con la caché
               filename    : '[name].css',
               ignoreOrder: false
          }),

          new CopyPlugin({
               patterns: [
                 { from: "src/assets/", to: "assets/" }
               ]
          }),
     ],
}