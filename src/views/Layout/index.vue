<template>
  <div>
    <router-view class="main" />
    <van-tabbar route>
      <van-tabbar-item icon="wap-home-o" to="/home">
       首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/home/house"> 找房</van-tabbar-item>
      <van-tabbar-item icon="newspaper-o" to="/home/info">资讯</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/home/my"> 我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.main {
  // padding-bottom: 100px;
  // background-color: #f5f7f9;
}
/deep/.van-tabbar-item__text{
  font-size: 12px;
}
</style>
