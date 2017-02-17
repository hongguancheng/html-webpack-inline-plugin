function HtmlWebpackInlinePlugin (opt) {
  this.chunks = opt.chunks || []
}
HtmlWebpackInlinePlugin.prototype.apply = function (compiler, callback) {
  compiler.plugin('compilation', compilation => {
    compilation.plugin('html-webpack-plugin-alter-asset-tags', (htmlPluginData, callback) => {
      // 合并去重
      this.chunks = Array.from(new Set(this.chunks.concat(htmlPluginData.plugin.options.inlineChunks)))

      this.chunks.forEach(name => {
        let chunk = compilation.chunks.filter(chunk => {
          return chunk.name === name
        })[0]

        let chunkPath = chunk && chunk.files[0]

        if (!chunkPath) {
          return
        }

        htmlPluginData.body.unshift({
          tagName: 'script',
          closeTag: true,
          attributes: {
            type: 'text/javascript'
          },
          innerHTML: compilation.assets[chunkPath].source()
        })
      })
      callback(null, htmlPluginData)
    })
  })
}

module.exports = HtmlWebpackInlinePlugin
