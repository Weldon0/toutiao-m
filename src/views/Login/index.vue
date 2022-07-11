<template>
  <div class="login-container">
    <!--    <van-button @click"">点击</van-button>-->
    <van-nav-bar title="登录">
      <template #left>
        <van-icon @click="$router.back()" color="red" name="like" />
        <!--        <ToutiaoIcon-->
        <!--          @click.native="$router.back()"-->
        <!--          style="color: white"-->
        <!--          icon="guanbi"-->
        <!--        />-->
      </template>
    </van-nav-bar>
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
        <van-button block type="info" native-type="reset">重置</van-button>
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
      isDisabled: false,
      isShowCountDown: false, // 是否展示倒计时组件
      user: {
        mobile: "13911111111",
        code: "24681",
      },
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
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 倒计时组件的业务逻辑:
    // 页面初始化的时候默认展示获取验证码按钮
    // >> 点击按钮之后（表单校验通过）
    // >> 显示倒计时
    // >> 倒计时结束继续展示验证码按钮
    async onSubmit() {
      // value自动从表单里面获取的值
      // 获取到的值是对象：key >> 表单的name值  value >> 用户输入的值
      // await后面写的是promise
      // 只有promise成功了的情况下才会继续执行
      // 参数data数据满足接口文档的格式就可以
      // 如果捕获await的错误，用try catch
      try {
        const res = await login(this.user);
        // 登录成功以后获取的数据存储到vuex和本地存储当中
        this.$store.commit("setUser", res.data.data);
        //  >> 登录成功 提示用户
        // Toast.success("登录成功");
        // Toast = this.$toast
        this.$toast("登录成功");

        //  跳转首页
        this.$router.push("/");
      } catch (e) {
        // e >> 错误对象信息
        // if (e && e.response && e.response.data && e.response.data.message) {
        //
        // }
        // 使用可选链运算符进行数据是否存在的判断
        // 为什么要判断：如果直接从undefined获取属性，会直接报错，导致程序停止运行
        Toast.fail(e?.response?.data?.message || "服务器端错误");
      }
    },
    async sendSmsCode() {
      // 通过传入表单name值，决定校验哪个表单 validate(name?: string | string[])
      // Promise：异步解决方案。 解决了什么问题？回调地域 >> 链式调用形式 >> 每一次then返回一个新的promise
      // async await >> 链式调用（不够优雅）>> 看起来是同步形式

      // 不同的try处理不同的错误
      // 校验的错误 >> 捕获
      // 接口请求错误 >> 进行错误提示
      try {
        await this.$refs.form.validate("mobile");
      } catch (e) {
        console.log(e);
        return;
      }
      try {
        // 展示倒计时?
        // 调用获取验证码接口
        // 如果接口请求速度很慢

        // 接口获取到结果之前，我的按钮一直可以重复点击(重复发送请求)
        // 预期：接口拿到结果之后才可以进行下一次点击
        // >> 请求的过程当中按钮需要禁用或者loading

        // button 合适的时机添加disabled
        this.isDisabled = true;
        await getSmsCode(this.user.mobile); // 时间 10s
        this.isShowCountDown = true;
        // 获取成功以后进行提示
        this.$toast.success("发送验证码成功");
      } catch (e) {
        // 如果获取失败了，进行错误的提示
        this.$toast.fail(e?.response?.data?.message || "出错了");
      } finally {
        // 不管成功或者失败都会执行的逻辑
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
