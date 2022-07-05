<template>
  <div class="login-container">
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit" ref="form">
      <van-field
        name="mobile"
        v-model="user.mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
        required
      >
        <template #left-icon>
          <ToutiaoIcon icon="shouji" />
        </template>
      </van-field>
      <!--  验证码输入框：-->
      <!--  type: 指定输入框的类型 -->
      <!--  maxlength: 指定输入的最大位数 -->
      <!--  required: 是否显示必填的※ -->
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="rules.code"
        required
        type="number"
        maxlength="6"
      >
        <template #left-icon>
          <ToutiaoIcon icon="yanzhengma" />
        </template>

        <template #button>
          <van-count-down
            @finish="isShowCountDown = false"
            v-if="isShowCountDown"
            :time="5000"
            format="ss s"
          />
          <van-button
            v-else
            @click="sendSmsCode"
            native-type="button"
            class="send-sms-btn"
            size="small"
            :loading="isDisabled"
          >
            获取验证码
          </van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from "@/api/user";
import { Toast } from "vant";

export default {
  name: "LoginPage",
  components: {},
  props: {},
  data() {
    return {
      isDisabled: false, // 是否禁用发送验证码按钮
      isShowCountDown: false, // 是否展示倒计时组件
      user: {
        mobile: "13911111111",
        code: "24681",
      }, // 表单数据
      rules: {
        mobile: [
          {
            required: true,
            // 校验规则如果不满足的提示消息
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不对",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码只能6位",
          },
        ],
      }, // 校验规则对象
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      try {
        const res = await login(this.user);
        console.log(res);
        this.$toast("登录成功");
      } catch (e) {
        Toast.fail(e?.response?.data?.message || "服务器端错误");
      }
    },
    async sendSmsCode() {
      // 1、校验mobile表单
      try {
        await this.$refs.form.validate("mobile");
      } catch (e) {
        console.log(e);
        return;
      }

      // 2、校验通过
      // 2-1：按钮禁用 >> 发送请求
      // 发送成功 >> 倒计时 >> 成功的提示
      // 发送失败 >> 错误的提示
      // 拿到结果 >> 解除禁用
      try {
        this.isDisabled = true;
        await getSmsCode(this.user.mobile);
        this.isShowCountDown = true;
        this.$toast.success("发送验证码成功");
      } catch (e) {
        this.$toast.fail(e?.response?.data?.message || "出错了");
      } finally {
        this.isDisabled = false;
      }
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  /deep/ .toutiao {
    font-size: 37px;
  }

  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
}
</style>
