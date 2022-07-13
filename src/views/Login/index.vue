<template>
  <div class="login">
    <van-nav-bar title="账号登录">
      <van-icon name="arrow-left" slot="left" />
    </van-nav-bar>
    <!-- /导航栏 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model.trim="username"
        name="username"
        :rules="[{ required: true, message: '请填写用户名' }]"
      >
      </van-field>
      <van-field
        v-model.trim="password"
        type="password"
        name="password"
        :rules="[{ required: true, message: '请输入密码' }]"
      >
      </van-field>
      <div style="margin: 16px">
        <van-button block type="primary" native-type="submit">登 录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'Login',
  created () { },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        console.log(res)
        this.$store.commit('setUser', res.data.body)
        this.$router.push({ name: 'my' })
      } catch (err) {
        // console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/.van-field__control {
  width: 345px;
  height: 60px;

  padding: 2px 0;
  font-size: 17px;
}
.van-nav-bar {
  background-color: #1cb676;
  color: #fff;
  /deep/.van-nav-bar__title {
    color: #fff;
    font-size: 18px;
  }
  .van-icon {
    color: #fff;
  }
}
.van-button {
  font-size: 18px;
}
/deep/.van-field__control {
  background: transparent;
}
</style>
