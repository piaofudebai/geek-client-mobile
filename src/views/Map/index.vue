<template>
  <div class="map">
    <!-- 头部 -->
    <van-nav-bar title="地图找房" fixed>
      <template #left>
        <van-icon name="arrow-left" class="iconFont" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <!-- 地图 -->

    <baidu-map class="map" :center="center" @ready="handler" :zoom="zoom">
      <bm-scale anchor=" BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
      <bm-navigation anchor=" BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>
      <!-- BMAP_NAVIGATION_CONTROL_PAN -->
      <bm-overlay
        v-for="item in maphouseList"
        :key="item.value"
        pane="labelPane"
        :class="{ sample: true, active }"
        @draw="draw($event, item.coord)"
        @mouseover.native="active = true"
        @mouseleave.native="active = false"
        @click.native="onClick(item)"
        @touchend.native="onClick(item)"
      >
        <p class="font_S">{{ item.label }}{{ item.count }}套</p>
      </bm-overlay>
    </baidu-map>
  </div>
</template>

<script>
import { getMapHouse } from '@/api/area'// 地图房屋数量查询
import { mapState } from 'vuex'
import { gethomebycityid } from '@/api/house'
export default {
  name: 'map',
  created () {
    this.getMapHouse()
    this.city = this.currentList
  },
  data () {
    return {
      maphouseList: [],
      active: false,
      city: [],
      show: 1,
      zoom: 11,
      houseList: [],

      center: {
        lng: '',
        lat: ''
      }
    }
  },
  mounted () {
    // const { BMapGL } = window
    // const map = new BMapGL.Map('container')
    // // 创建地图实例
    // const point = new BMapGL.Point(116.404, 39.915)
    // // 创建点坐标
    // map.centerAndZoom(point, 15)
    // // 初始化地图，设置中心点坐标和地图级别
  },
  methods: {
    handler ({ BMap, map }) {
      console.log(BMap, map)
      // this.center.lng = 116.404
      // this.center.lat = 39.915
      this.center = this.currentList.label
      this.zoom = 11
    },
    // 根据城市id获取对应的房源数据
    async getMapHouse () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await getMapHouse(this.currentList.value)
        console.log(res)
        this.maphouseList = res.data.body
        this.$toast.success('获取成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('获取失败')
      }
    },
    async onClick (item) {
      if (this.show >= 3) {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
      }
      const res = await gethomebycityid({
        cityId: item.value
      })
      console.log(res)
      try {
        const res = await gethomebycityid({
          cityId: item.value
        })
        this.houseList = res.data.body.list
        console.log(res)
        this.$toast.success('获取成功')
        return
      } catch (error) {
        console.log(error)
        this.$toast.fail('获取失败')
      }
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      this.center = {
        lng: item.coord.longitude,
        lat: item.coord.latitude
      }
      if (this.show === 1) {
        this.zoom = 13
      } else if (this.show === 2) {
        this.zoom = 16
      }
      this.show++
      console.log(item)
      try {
        const res = await getMapHouse(item.value)
        // console.log(res)
        this.maphouseList = res
        this.$toast.success('获取成功')
      } catch (error) {
        console.dir(error)
        this.$toast.fail('获取房源失败')
      }
    },
    draw ({ el, BMap, map }, { longitude, latitude }) {
      // console.log(el, BMap, map)
      // console.log(longitude, latitude)
      const pixel = map.pointToOverlayPixel(new BMap.Point(longitude, latitude))
      el.style.left = pixel.x - 60 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    }
  },
  computed: {
    ...mapState(['currentList'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #21b97a;
}
.map {
  width: 100%;
  height: 722px;
}
.van-nav-bar {
  background-color: #21b97a;
  /deep/.van-nav-bar__title {
    font-size: 18px;
    color: #fff;
  }
  .iconFont {
    color: #fff;
    font-size: 18px;
  }
}
.sample {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background: rgba(12, 181, 106, 0.9);
  border: 2px solid hsla(0, 0%, 100%, 0.8);
  color: #fff;
  text-align: center;
  cursor: pointer;
  position: absolute;
  display: inline-block;
  line-height: 65px;
}
.font_S {
  font-size: 12px;
}
.sample.active {
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
}
</style>
