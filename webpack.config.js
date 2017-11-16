const path = require('path');
const glob = require('glob');
const uglifyPlugin = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const purifyCssPlugin = require('purifycss-webpack');

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
                    use:[
                        {loader:'css-loader',options:{importLoaders:1}},
                        'postcss-loader'
                    ]
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
            },
            {
                test:/\.less$/,
                use: extractTextPlugin.extract({
                    use:[{
                        loader:"css-loader",options:{importLoaders:1}
                    },{
                        loader:"less-loader"
                    },'postcss-loader'],
                    fallback:"style-loader"
                })
            },
            {
                test:/\.scss/,
                use:extractTextPlugin.extract({
                    use:[{
                        loader:"css-loader"
                    },{
                        loader:"less-loader"
                    }],
                    fallback:"style-loader"
                })
            },
            {
                test:/\.js$/,
                use:{
                    loader:"babel-loader",
                },
                exclude:/node_modules/
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
        new extractTextPlugin("css/index.css"),
        new purifyCssPlugin({
            paths:glob.sync(path.join(__dirname,'src/*.html'))
        })
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