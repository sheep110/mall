//个人配置  全局文件
module.exports = {
    configureWebpack: {
        resolve: {
            // extensions: [],
            alias: {
                assets: '@/assets',
                common: '@/common',
                components: '@/components',
                network: '@/network',
                // router: '@/router',
                // store: '@/store',
                views: '@/views',
            }
        }
    }
}