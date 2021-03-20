var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin =require ('extract-text-webpack-plugin');
var webpack=require('webpack')
module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [{
            test: /\.vue?$/,
            exclude: /(node_modules)/,
            use: 'vue-loader'
        },
        {
            test: /\.js?$/,
            exclude: /(node_modules)/,
            use: 'babel-loader'
        },
        {
            test:/\.(png|jpe?g|gif)$/i,
            exclude:/(node_modules)/,
            loader:'url-loader'
        }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })
],
    
    devServer: {

        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:4000'
        })
    },

    output: {
        publicPath: '/',
        filename: 'index.js'
      }

}
