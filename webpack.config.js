var path = require('path');
var root = path.resolve(__dirname);
var src = path.resolve(root, 'src');
var dist = path.resolve(root, 'dist');
var webpack = require("webpack");
module.exports = {
    entry: {
        entry: './entry.js',
        vendor: ['jquery']
    },
    output: {
        path: dist,
        //publicPath: "./dist/",
        filename: "[name].bundle.js"
    },
    cache: true,
    minimize: true,
    plugins: [
         new webpack.optimize.DedupePlugin(),
         new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
         new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } }),
         new webpack.optimize.OccurenceOrderPlugin(),
         new webpack.ProvidePlugin({
             $: "jquery",
             jQuery: "jquery",
             "window.jQuery": "jquery"
         })
    ],
    resolve: {
        extensions: ['', '.js', '.css']
    },
    module: {
        perLoaders: [
           { test: /\.(js)$/, include: src, loader: 'jshint-loader' }
        ],
        loaders: [
            { test: /\.html$/, loader: 'raw'},
            { test: /src.*\.js$/, loaders: ['ng-annotate'] },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=8192&name=images/[name].[ext]' },
            //{ test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000" }
            { test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader" }
        ]
    }
}