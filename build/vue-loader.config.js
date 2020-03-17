
module.exports = (isDev) => {
    return {
      preserveWhitepace: true, 
      extractCSS: !isDev, // 将css从vue中提取出来，单独打包
      cssModules: {
        localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
        camelCase: true,
  
      },
      // hotReload: false, // 根据环境变量生成
      // loaders: {
      //   js: 'coffe-loader',
      // },
      // preLoader: {
        
      // },
      // postLoader: {
  
      // }
    }
  }