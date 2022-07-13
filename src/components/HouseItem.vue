<template>
  <div class="grid_house">
    <div
      class="HouseItem_house"
       @click="
        $router.push({ name: 'detail', params: { houseCode: item.houseCode } })
      "
    >
      <img :src="`http://liufusong.top:8080${item.houseImg}`" />
      <div class="right">
        <h3>{{ item.title }}</h3>
        <p>{{ item.desc }}</p>
        <span class="dizhi">{{ item.tags[0] }}</span>
        <div class="price">
          <span class="left">{{ item.price }}</span
          >元/月
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    item: {
      type: [String, Object],
      required: true
    }
  },
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
// 大盒子
.grid_house {
  height: auto;
  // position: relative;
  width: 345px;
  will-change: transform;
  overflow: hidden auto;
  // background-color: pink;
  margin-left: 15px;
  border-bottom: 1px solid #e5e5e5;
  // padding:0 15px;
  // 里面每个小盒子
  .HouseItem_house {
    display: flex;
    width: 100%;
    height: 120px;
    font-size: 12px;
    margin-top: 15px;
    img {
      width: 106px;
      height: 80px;
    }
    .right {
      line-height: 22px;
      padding-left: 12px;
      /deep/h3 {
        width: 227px;
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
      }
      .dizhi {
        color: #39becd;
        background: #e1f5f8;
      }
      p {
        color: #afb2b3;
      }
      .price {
        font-size: 12px;
        color: #fa5741;
        .left {
          font-size: 16px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
