const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    // 记住就可以
    // 判断当前的环境，动态设置标题
    config.plugin("html").tap((args) => {
      args[0].title = "黑马头条";
      return args;
    });
  },
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // 我们可以自定义一个样式文件，去覆盖默认的样式文件
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${path.join(
              __dirname,
              // 替换成自己的文件路径就可以
              "src/styles/theme.less"
            )}";`,
          },
        },
      },
    },
  },
});
