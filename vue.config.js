module.exports = {
    //publicPath: ['production','alpha'].includes(process.env.NODE_ENV) ? '/dispatch/' : '/',
    outputDir: 'dist',
    lintOnSave: false,
    productionSourceMap:false,
    chainWebpack: config => {
        config.entry('main').add('babel-polyfill')
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    /* less 变量覆盖，用于自定义 ant design 主题 */
                    /* 'primary-color': '#1890FF',// 全局主色
                    'link-color': '#1890FF',// 链接色
                    'border-radius-base': '4px',    //组件/浮层圆角
                    'heading-color': '#C8D0E9',              // 标题色
                    'text-color': '#C8D0E9',                 // 主文本色
                    'text-color-secondary': '#C8D0E9',      // 次文本色
                    'border-color-base': '#000',  */               // 边框色


                },
                javascriptEnabled: true
            }
        }
    },
}

