<template>
  <div class="My">
    <div class="top">
      <img src="http://liufusong.top:8080/img/profile/bg.png" alt="" />
    </div>
    <!-- 已登录 -->
    <div class="my_info" v-if="user && user.token">
        <div class="mytx">
          <img :src="'http://liufusong.top:8080'+userInfo.avatar" alt="" />
        </div>
        <div class="my_user_dl">
          <span class="my_name_dl">{{userInfo.nickname}}</span>
          <div class="am_btn_dl">
            <van-button type="primary" size="small" @click="logout"
              >退出</van-button
            >
          </div>
          <div class="my_edit">
            <van-button
              >编辑个人资料
              <van-icon name="play" />
            </van-button>
          </div>
        </div>
    </div>
    <!-- /已登录 -->
    <!-- 未登录 -->
    <div class="my_info" v-else>
      <div class="mytx">
        <img src="http://liufusong.top:8080/img/profile/avatar.png" alt="" />
      </div>
      <div class="my_user">
        <span class="my_name">游客</span>
        <div class="am_btn" @click="$router.push('/login')">
          <van-button type="primary" size="small">去登录</van-button>
        </div>
      </div>
    </div>
    <!-- /未登录 -->

    <div class="my_content">
      <van-grid :column-num="3" class="grid" :border="false">
        <van-grid-item class="grid-item" icon="star-o" text="我的收藏" @click="$router.push('/favorate')"/>
        <van-grid-item icon="wap-home-o" text="我的出租" @click="$router.push('/rent')"/>
        <van-grid-item icon="clock-o" text="看房记录" />
        <van-grid-item icon="home-o" text="成为房主" />
        <van-grid-item icon="contact" text="个人资料" />
        <van-grid-item icon="phone-circle-o" text="联系我们" />
      </van-grid>
    </div>
    <div class="my_ad">
      <img src="http://liufusong.top:8080/img/profile/join.png" alt="" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'My',
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        // console.log('获取信息', res)
        this.userInfo = res.data.body
        console.log(this.userInfo)
      } catch (err) {
        console.log('我在获取用户这里报错啦', err)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: '确定退出吗' })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.top {
  width: 375px;
  height: 191px;
  z-index: 1;
}
.my_info {
  width: 319px;
  height: 165px;
  background-color: #fff;
  position: relative;
  right: -28px;
  top: -55px;
  box-shadow: 0 0 10px 3px #ddd;
  text-align: center;
  z-index: 1;
  .my_user {
    padding-top: 50px;
    font-size: 14px;
    .am_btn {
      //  width: 70px;
      margin-top: 18px;
      height: 30px;
      .van-button {
        background-color: #21b97a;
        border-radius: 5px;
        width: 70px;
        height: 30px;
      }
    }
  }
}
.mytx {
  position: absolute;
  transform: translateY(-50%);
  // transform: translateX(50%);
  left: 124px;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  border: 5px solid #f5f5f5;
  // display: inline-block;
  z-index: 1;
}
/deep/.my_content {
  position: relative;
  top: 109px;
  width: 100%;
  height: 170px;
  background-color: green;
  border: none;
  font-size: 15px;
}
/deep/.grid {
  margin-top: -163px;
}
.my_ad {
  width: 345px;
  margin-top: 125px;
  margin-left: 15px;
}
.my_user_dl {
  padding-top: 50px;
  font-size: 12px;
  .am_btn_dl {
    .van-button {
      background-color: #21b97a;
      border-radius: 30px;
      width: 54px;
      height: 20px;
    }
  }
  .my_edit {
    .van-button {
      font-size: 12px;
      border: none;
      margin-top: 10px;
      color: #999999;
    }
  }
}
</style>
