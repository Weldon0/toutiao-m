<template>
  <van-share-sheet
    :value="showShowShare"
    title="立即分享给好友"
    :options="options"
    @cancel="$emit('update:showShowShare', false)"
    @click-overlay="$emit('update:showShowShare', false)"
  />
</template>

<script>
export default {
  name: "Share",
  props: {
    showShowShare: Boolean,
  },
  data() {
    return {
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
          { name: "小程序码", icon: "weapp-qrcode" },
        ],
      ],
    };
  },
};
</script>
