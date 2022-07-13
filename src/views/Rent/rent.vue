<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="房屋管理" left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->
    <HouseItem
      v-for="(item, index) in pubList"
      :key="index"
      :item="item"
    ></HouseItem>
  </div>
</template>

<script>
import HouseItem from '@/components/HouseItem.vue'
import { getPubHouse } from '@/api/pubhouse'
export default {
  async created () {
    try {
      const res = await getPubHouse()
      console.log(res)
      this.pubList = res.data.body
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      pubList: []
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: { HouseItem }
}
</script>

<style scoped lang='less'>
/deep/.van-nav-bar {
  background-color: #21b97a;

  .van-nav-bar__title {
    color: #fff !important;
  }
  .van-icon {
    color: #fff;
  }
}
</style>
