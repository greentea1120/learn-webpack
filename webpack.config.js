const path = require('path');
const uglifyPlugin = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

var website = {
    publicPath:"http://localhost:9898/"
}
module.exports = {
    entry : {
        entry:'./src/entry.js'
    },
    output : {
        path:path.resolve(__dirname,'dist'),
        filename: '[name].js',
        publicPath:website.publicPath
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use: extractTextPlugin.extract({
                    fallback:"style-loader",
                    use:"css-loader"
                })
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:5000,
                        outputPath:'images/'
                    }
                }]
            },
            {
                test:/\.html$/i,
                use:['html-withimg-loader']
            }
        ]
    },
    plugins:[
        // new uglifyPlugin()
        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html'
        }),
        new extractTextPlugin("css/index.css")
    ],
    devServer : {
        //设置基本目录结构
        contentBase:path.resolve(__dirname,'dist'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host:'localhost',
        //服务端压缩是否开启
        compress:true,
        //配置服务端口号
        port:9898
    }
}