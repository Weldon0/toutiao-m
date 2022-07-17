<template>
  <div class="update-photo">
    <img class="img" :src="img" ref="img" />

    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { updateUserPhoto } from "@/api/user";
export default {
  name: "UpdatePhoto",
  components: {},
  props: {
    // 预览图片地址信息
    img: {
      type: [String, Object],
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const img = this.$refs.img;
    this.cropper = new Cropper(img, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
    });
  },
  methods: {
    // 确定事件
    onConfirm() {
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        this.updatePhoto(blob); // 裁剪后的结果信息
      });
    },
    // 上传文件的方法
    async updatePhoto(blob) {
      // photo
      // 怎么样定义成formData格式
      // axios >> 根据你的参数的形式自动设置的ContentType
      // 查询字符串(name=xx&age=18) >> application/x-www-form-urlencoded
      // object >> application/json
      // formData >> multipart/form-data; boundary=----WebKitFormBoundaryGnwmBAvekLZAnBt2

      // 文件怎么上传的？
      // 构建一个formData对象
      const fd = new FormData();
      fd.append("photo", blob);
      const res = await updateUserPhoto(fd);
      this.$emit("input", res.data.data.photo);
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="less">
.update-photo {
  background-color: #000;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
  display: block;
  max-width: 100%;
}
</style>
