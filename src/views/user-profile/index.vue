<template>
  <div class="user-profile">
    <van-nav-bar title="个人信息" @click-left="$router.back()">
      <template #left>
        <van-icon color="white" name="arrow-left"></van-icon>
      </template>
    </van-nav-bar>

    <input @change="fileChange" ref="input" type="file" hidden />
    <van-cell @click="clickInput" is-link title="头像" center>
      <template #default>
        <van-image round class="avatar" :src="userInfo.photo" />
      </template>
    </van-cell>
    <van-cell
      @click="isShowName = true"
      title="昵称"
      :value="userInfo.name"
      is-link
    ></van-cell>
    <van-cell
      :value="userInfo.gender === 1 ? '男' : '女'"
      title="性别"
      is-link
      @click="isShowGender = true"
    ></van-cell>
    <van-cell
      :value="userInfo.birthday"
      @click="isShowBirthday = true"
      title="生日"
      is-link
    ></van-cell>

    <van-popup style="height: 100%" position="bottom" v-model="isShowName">
      <UpdateName v-model="userInfo.name" @close="isShowName = false" />
    </van-popup>
    <van-popup position="bottom" v-model="isShowGender">
      <UpdateGender @close="isShowGender = false" v-model="userInfo.gender" />
    </van-popup>
    <van-popup v-model="isShowBirthday" position="bottom">
      <UpdateBirthday
        @close="isShowBirthday = false"
        v-model="userInfo.birthday"
      />
    </van-popup>
    <van-popup position="bottom" style="height: 100%" v-model="isShowImage">
      <UpdatePhoto
        v-model="userInfo.photo"
        @close="isShowImage = false"
        :img="img"
      />
    </van-popup>
  </div>
</template>

<script>
import { fetchUserProfile } from "@/api/user";
import UpdateName from "@/views/user-profile/components/update-name";
import UpdateGender from "@/views/user-profile/components/update-gender";
import UpdateBirthday from "@/views/user-profile/components/update-birthday";
import UpdatePhoto from "@/views/user-profile/components/update-image";

export default {
  name: "UserProfile",
  components: { UpdatePhoto, UpdateBirthday, UpdateGender, UpdateName },
  created() {
    this.getUserInfo();
  },
  data() {
    return {
      /**
       * @type {UserInfo.Data}
       */
      userInfo: {},
      isShowName: false,
      isShowGender: false,
      isShowBirthday: false,
      isShowImage: false,
      img: "",
    };
  },
  methods: {
    async getUserInfo() {
      const res = await fetchUserProfile();
      this.userInfo = res.data.data;
    },
    clickInput() {
      this.$refs.input.click();
      // 怎么样拿到图片的预览地址
    },
    fileChange(e) {
      const file = e.target.files[0];
      console.log(file);
      // 拿到图片的预览地址
      const url = URL.createObjectURL(file);
      console.log(url);
      // 预览 >> 裁剪 >> 提交
      // 弹出预览弹层
      this.isShowImage = true;
      this.img = url;
      //   获取到文件？
    },
  },
};
</script>
<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 80px;
  }
}
</style>
