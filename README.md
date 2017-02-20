# html-webpack-inline-plugin
把代码内联到 html 内的 webpack 插件

## Basic Usage

import 入你的 webpack config

```javascript
var HtmlWebpackInlinePlugin = require('./HtmlWebpackInlinePlugin.js')
```

添加 plugin 到 webpack config 里:

```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new HtmlWebpackInlinePlugin()
]  
```

因为该插件是基于 HtmlWebpackPlugin 的，在写 HtmlWebpackPlugin 的配置时设置 inlineChunk 表示当前设置的页面需要内联相应的 chunk 代码。

也可以在 HtmlWebpackInlinePlugin 的配置内设置 inlineChunk 来表示上面所有的 HtmlWebpackPlugin 配置的页面都要内联相应的 chunk 代码。（重复设置不会重复添加）

```javascript
plugins: [
  new HtmlWebpackPlugin({
    inlineSource: [main] // 名为 main 的 chunk 的所有 javascript 和 css 代码都会内联
  }),
  new HtmlWebpackInlineSourcePlugin({
    inlineSource: [main]
  })
]
```

