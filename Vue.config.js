module.exports = {
    lintOnSave:false,//关闭语法检查
    productionSourceMap:false,//关闭正式打包时产生map文件
    //代理跨域
    devServer: { 
        proxy:{
            '/api':{
                target:'http://39.98.123.211',
                // pathRewrite:{'^/api':''},
                ws:true, //用于支持websocket
                changeOrigin:true //用于控制请求头中的host值
            }
        }
    }
}