function HtmlWebpackInlineChunksPlugin (opt) {
  // 插件参数，配置的 chunk 将内联到所有 html-webpack-plugin 配置的 html 中
  this.chunks = opt.chunks || []
}

HtmlWebpackInlineChunksPlugin.prototype.apply = function (compiler, callback) {
  compiler.plugin('compilation', compilation => {
    compilation.plugin('html-webpack-plugin-alter-asset-tags', (htmlPluginData, callback) => {
      // 合并去重
      this.chunks = Array.from(new Set(this.chunks.concat(htmlPluginData.plugin.options.inlineChunks)))

      this.chunks.forEach(name => {
        let chunk = compilation.chunks.filter(chunk => {
          return chunk.name === name
        })[0]

        chunk && this.addData(compilation, htmlPluginData, chunk)
      })
      callback(null, htmlPluginData)
    })
  })
}

HtmlWebpackInlineChunksPlugin.prototype.addData = function (compilation, htmlPluginData, chunk) {
  let reCss = /\.css$/
  let reJs = /\.js$/

  // 判断文件类别，按类型加入到 htmlPluginData 中
  chunk.files.forEach((file) => {
    if (reCss.test(file)) {
      htmlPluginData.body.unshift({
        tagName: 'style',
        closeTag: true,
        attributes: {
          type: 'text/css'
        },
        innerHTML: compilation.assets[file].source()
      })
    } else if (reJs.test(file)) {
      htmlPluginData.body.unshift({
        tagName: 'script',
        closeTag: true,
        attributes: {
          type: 'text/javascript'
        },
        innerHTML: compilation.assets[file].source()
      })
    }
  })
}

module.exports = HtmlWebpackInlineChunksPlugin
