const path=require("path");
const VueLoaderPlugin=require('vue-loader/lib/plugin');
const HtmlWebpackPlugin =require('html-webpack-plugin');
const webpack =require('webpack');
const ExtractPlugin =require('extract-text-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const packagejson = require("./package.json");

const isDev=process.env.NODE_ENV==='development';
console.log("process.env.NODE_ENV:",process.env.NODE_ENV);

const config={
    entry:path.join(__dirname,"client/index.js"),
    output:{
        filename:"bundle[hash:8].js",
        path:path.join(__dirname,"dist")
    },
    module:{
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader'
              },
              {
                  test:/\.css$/,
                  use:[
                      'style-loader',
                      {
                          loader:'css-loader',
                        options: {
                            modules:{  localIdentName: '[path][name]__[local]--[hash:base64:5]'}
                          
                          }
                      }
                      
                  ]
                
                 
              },
              {
                  test:/\.(gif|jpg|png|bmp|jpeg|svg)$/,
                  use:[
                      {
                        loader:'url-loader',
                        options:{
                            limit:1024,
                            name:'[name]-aaa.[ext]',
                        }
                      }
                  ]
                  
              },
              {
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
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
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin(),
        new webpack.DefinePlugin({
           'process.env':{
               NODE_ENV:isDev?'"development"':'"production"'
           }
        }),
        // new webpack.HotModuleReplacementPlugin(),
       ],
       
    //    optimization: {
    //     splitChunks: {
    //       chunks: 'all',
    //     }
    // },

    devServer:{
        port:8099,
        host: '0.0.0.0',
        overlay:{
            errors:true,
        },
        hot:true,
            //     proxy: {
    //   '/chatHub': {
    //     target: 'http://localhost:5000',
    //     ws: false,
    //     changeOrigin: true
    //   }
     proxy: {
        '/api': {
          target: 'http://localhost:5000/chatHub',//设置你调用的接口域名和端口号 别忘了加http
          changeOrigin: true,//如果需要跨域
          pathRewrite: {
            '^/api': 'http://localhost:5000/chatHub',//调用接口直接写‘/api/user/add’即可
          }
        }
      }
    }
}

if(!isDev){
    config.entry = {
        app: path.join(__dirname, 'client/index.js'),
        // vendor: Object.keys(packagejson.dependencies)//获取生产环境依赖的库
        vendor: ['vue']
      }
    config.output.filename = '[name].[chunkhash:8].js'
    //css打包
    // config.module.rules.push(
    //     {
    //         test: /\.css$/,
    //         use: [
    //             {
    //                 loader: MiniCssExtractPlugin.loader,
    //                 options: {
    //                     publicPath:'../',
    //                 },
    //             },
    //             'css-loader'
    //         ],
    //     }
    //   )


      config.module.rules.push({
            test:/\.css$/,
            use:ExtractPlugin.extract(
                {
                    fallback:'style-loader',
                    use:[
                        'css-loader'
                    ]

                    
                }
            )
        })
        //styl打包
        config.module.rules.push({
            test:/\.styl$/,
            use:ExtractPlugin.extract(
                {
                    fallback:'style-loader',
                    use:[
                        'css-loader',
                        {
                            loader:'postcss-loader',
                            options:{
                                sourceMap:true
                            }
                        },
                        'stylus-loader'
                    ]

                    
                }
            )
        })



        // config.plugins.push(
        //     new ExtractPlugin('styles.css'), new MiniCssExtractPlugin({
        //         filename: '[name].css',
        //         chunkFilename:'[id].css',
        //     })
        // )

        config.plugins.push(
            new ExtractPlugin('styles.[md5:contenthash:hex:8].css'),
        )

        config.optimization={
            runtimeChunk: 'single', 
            splitChunks:{
                
                cacheGroups: {
                    commons: {
                        name: 'vendor',
                        chunks: "initial",//指定source chunk，即指定从哪些chunk当中去找公共模块，省略该选项的时候，默认就是entry chunks
                        minChunks: 2
                    }
                }
            }
        }
        

   
        
}


module.exports=config;