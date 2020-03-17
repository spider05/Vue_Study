
const merge=require('webpack-merge');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const webpack=require('webpack');
const path=require('path');
const baseConfig=require('./webpack.base.config');
const ExtractPlugin =require('extract-text-webpack-plugin');

const isDev=process.env.NODE_ENV==='development'

let config;


if(isDev){
console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
config= merge(baseConfig,{
    devtool: '#cheap-module-eval-source-map',
    module: {
        rules: [
          {
            test: /\.styl/,
            use: [
              'vue-style-loader',//修改CSS样式后，可以热启动
              {
               loader: 'css-loader',
               options:{
                //    modules:{
                //        localIdentName:'[path]-[name]-[hash:base64:5]',//stylus文件模块化
                //    },
                //    localsConvention: 'camelCase',//开启驼峰main-header=mainHeader

               }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          }
        ]
      },
    plugins:[ 
        new HtmlWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],


    devServer:{
    port:8099,
    host:'0.0.0.0',
    overlay:{
        errors:true
    },
    hot:true
    } 
})
}
else{
 config=   merge(baseConfig,{
        mode:process.env.NODE_ENV||'production',
        entry:{
            app:path.join(__dirname,'../client/index.js'),
            // vender:['vue']
        },
        output:{
            filename:'[name].[chunkhash:8].js',
            path:path.join(__dirname,'../dist')
        },
        module: {
            rules: [
                {
                test:/\.css/,
                use:ExtractPlugin.extract({
                   fallback: 'style-loader',
                   use:[
                       'css-loader'
                   ]
                }
                )
              },
              {
                test: /\.styl/,
                use: ExtractPlugin.extract({
                  fallback: 'vue-style-loader',
                  use: [
                    'css-loader',
                    {
                      loader: 'postcss-loader',
                      options: {
                        sourceMap: true
                      }
                    },
                    'stylus-loader'
                  ]
                })
              }
            ]
          },
          optimization: {
            splitChunks: {
              chunks: 'all'
            },
            runtimeChunk: true
          },
        plugins:[
            new ExtractPlugin('styles.[md5:contenthash:hex:8].css'),
        ],
        optimization:{
            runtimeChunk:true,
            splitChunks:{
                chunks:'all'
                // cacheGroups: {
                //     commons: {
                //         name: 'vendor',
                //         chunks: "initial",//指定source chunk，即指定从哪些chunk当中去找公共模块，省略该选项的时候，默认就是entry chunks
                //         minChunks: 2
                //     }
                // }
            }
        }

    })

}

module.exports=config;