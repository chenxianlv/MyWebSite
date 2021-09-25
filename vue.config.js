const path = require("path");
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, "src/assets/less/variable.less"),
        // path.resolve(__dirname, "src/assets/less/global.less"),
      ] // 引入全局样式变量
    }
  }
}
