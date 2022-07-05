module.exports = {
  plugins: {
    autoprefixer: {
      Browserslist: ["Android >= 4.0", "iOS >= 8"],
    },
    "postcss-pxtorem": {
      // 根据设计稿的尺寸/10 得到rootValue的值
      // 我们自己的设计稿75
      // vant组件的rootValue设置为37.5
      // 区分设置
      rootValue: (arg) => {
        // 处理的文件对象
        // px --> rem
        // 动态设置
        // 如果我们自己写的样式 75
        // 如果是vant组件的样式 37.5

        // 判断需要处理的样式文件是否是vant组件的
        // 如果是返回37.5
        // 如果不是返回75
        // arg里面的file属性，为文件的路径
        return arg.file.includes("vant") ? 37.5 : 75;
      },
      propList: ["*"],
    },
  },
};
