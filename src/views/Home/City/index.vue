<template>
  <div class="city-container">
    <!-- 导航栏 -->
    <van-nav-bar title="城市列表" left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->
    <van-index-bar :index-list="indexList">
      <div
        class="div"
        v-for="(val, index) in indexList"
        :key="index"
        :sticky="fasle"
      >
        <van-index-anchor :index="val">{{
          val === "#" ? "当前城市" : val === "热" ? "热门城市" : val
        }}</van-index-anchor>
        <van-cell
          :title="item.label"
          v-for="(item, index) in firstList[val]"
          :key="index"
          @click="city_btn(item)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { getCity, gethot } from '@/api/area'
export default {
  created () {
    this.getAreaCity()

    this.getHotList()
  },
  data () {
    return {
      indexList: ['#', '热'],
      firstList: {},
      hotCityList: [],
      active: 'active',
      value: []
    }
  },
  methods: {
    async getAreaCity () {
      try {
        const res = await getCity(1)
        const CityList = {}
        res.data.body.forEach(item => {
          const first = item.short[0].toUpperCase()
          if (CityList[first]) {
            CityList[first].push(item)
          } else {
            CityList[first] = [item]
          }
        })
        this.firstList = { ...this.firstList, ...CityList }
        const allGetList = Object.keys(CityList).sort()
        this.indexList = [...this.indexList, ...allGetList]
        console.log(this.firstList)
        this.value = this.firstList.forEach(item => item.value)
        console.log('value', this.value)
      } catch (err) {
        // console.log(err)
      }
    },
    async getHotList () {
      try {
        const { data } = await gethot()
        console.log(data)
        this.hotCityList = data.body
        this.firstList = { ...this.firstList, 热: [...this.hotCityList], '#': [{ label: '北京' }] }
      } catch (err) {
        // console.log('热门城市', err)
      }
    },
    city_btn (item) {
      if (this.hotCityList.indexOf(item) === -1) {
        return this.$toast('暂无房源')
      } else {
        this.$store.commit('setList', item)
        this.$router.back()
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
.city-container {
  padding-top: 45px;
}

/deep/.van-nav-bar {
  // position: absolute;
  position: fixed;
  z-index: 999999;
  width: 375px;
  height: 45px;
  background-color: #21b97a;
  margin-top: -45px;
  // z-index: 99999;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.van-cell {
  height: 50px;
  span {
    font-size: 16px;
  }
}
/deep/.van-index-anchor {
  color: #999;
  font-weight: 500;
  font-size: 14px;
}

/deep/.van-index-bar__index {
  padding-top: 13px;
  font-size: 14px;
  // color:#333
}
/deep/.van-index-bar__index--active {
  border-radius: 50%;
  background-color: #21b97a;
  color: #fff;
  width: 15px;
  height: 15px;
  padding: 0;
  margin: 0;
}
// .van-index-bar__sidebar {
// // height: 90%;
// margin-top: 20px;
// .van-index-bar__index {
// margin-right: 10px;
//  padding: 0;
//  margin-bottom: 15px;
//  font-size: 14px !important;
//  }
// }

// // .van-index-anchor--sticky {
// // position: relative;
// // position: unset;
// // }
// /deep/.van-index-bar__index--active {
// background-color: #21b97a !important;
// color: #fff !important;
// border-radius: 50%;
// }
</style>
