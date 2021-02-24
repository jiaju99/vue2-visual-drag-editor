const webpack = require('webpack')
const path = require('path')
const PACKAGE = require('./package.json')
const resolve = dir => path.join(__dirname, dir)

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: isProduction ? '/my-project/' : '/',
  productionSourceMap: false,

  css: {
    sourceMap: !isProduction,
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true, // add this line to support Javascript In Less
        },
      },
    },
  },

  devServer: {
    port: 8000,
    overlay: {
      //让浏览器 overlay 同时显示警告和错误
      warnings: false,
      errors: true,
    },
  },

  //调整webpack配置
  configureWebpack: {
    plugins: [
      // 精简 moment.js, 语言包只保留 zh-cn.js
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    ],
  },

  // @see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
  chainWebpack: config => {
    config.resolve.alias.set('@c', resolve('src/components'))

    const hasHtml = config.plugins.has('html')
    if (hasHtml)
      config.plugin('html').tap(args => {
        args[0].title = PACKAGE.name
        return args
      })

    // 修改针对 svg 的 loader (file-loader -> vue-svg-loader)
    // 当引入 svg 文件加入`?inline`后缀时, 会处理成 vue 组件
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        // @see https://github.com/svg/svgo
        svgo: {
          plugins: [{ prefixIds: true }, { removeViewBox: false }, { removeDimensions: true }],
        },
      })
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/svg/[name].[hash:8].[ext]',
      })
  },
}
