<template>
  <div class="house">
    <div class="house_top">
      <i class="iconfont icon-fanhuijiantou fanhui" @click="$router.back()"></i>
      <div class="wz_btn">
        <span class="wz">{{ currentList.label || "深圳" }}</span>
        <i class="iconfont icon-xialaanniu" @click="$router.push('/city')"></i>
        <span class="line">|</span>
      </div>
      <input class="search_input" type="text" placeholder="请输入小区或地址" />
      <i class="iconfont icon-sousuo"></i>
      <i class="iconfont icon-dingwei" @click="$router.push('/map')"></i>
    </div>
    <!-- /导航栏 -->
    <div class="am-flexbox">
      <van-dropdown-menu>
        <van-dropdown-item title="区域" ref="area">
          <van-picker
            show-toolbar
            :columns="columns"
            value-key="label"
            toolbar-position="bottom"
            @cancel="$refs.area.toggle()"
            @confirm="onConfirm"
          />
        </van-dropdown-item>
        <van-dropdown-item title="方式" ref="method">
          <van-picker
            value-key="label"
            :columns="columnsList.rentType"
            @cancel="$refs.method.toggle()"
            @confirm="onConfirmFnA"
            show-toolbar
            toolbar-position="bottom"
          />
        </van-dropdown-item>
        <van-dropdown-item title="租金" ref="money">
          <van-picker
            value-key="label"
            :columns="columnsList.price"
            @cancel="$refs.money.toggle()"
            @confirm="onConfirmFnB"
            show-toolbar
            toolbar-position="bottom"
          />
        </van-dropdown-item>
        <van-dropdown-item title="筛选" id="filter" ref="filter">
          <!-- <van-popup v-model="showPicker" round> -->
          <van-picker
            show-toolbar
            toolbar-position="bottom"
            @cancel="$refs.filter.toggle()"
            @confirm="clickConfirmc"
          >
            <template #columns-bottom>
              <div class="choose">
                <dl>
                  <dt class="choose-title">户型</dt>
                  <dd class="choose-key">
                    <span
                      class="key-type"
                      v-for="item in columnsList.roomType"
                      :key="item.value"
                      :class="{
                        active: columnsType.indexOf(item.value) !== -1,
                      }"
                      @click="onClick(columnsType, item)"
                      >{{ item.label }}</span
                    >
                  </dd>
                  <dt class="choose-title">朝向</dt>
                  <dd class="choose-key">
                    <span
                      class="key-type"
                      :class="{
                        active: columnsOriented.indexOf(item.value) !== -1,
                      }"
                      @click="onClick(columnsOriented, item)"
                      v-for="item in columnsList.oriented"
                      :key="item.value"
                      >{{ item.label }}</span
                    >
                  </dd>
                  <dt class="choose-title">楼层</dt>
                  <dd class="choose-key">
                    <span
                      class="key-type"
                      :class="{
                        active: columnsfloor.indexOf(item.value) !== -1,
                      }"
                      @click="onClick(columnsfloor, item)"
                      v-for="item in columnsList.floor"
                      :key="item.value"
                      >{{ item.label }}</span
                    >
                  </dd>
                  <dt class="choose-title">房屋亮点</dt>
                  <dd class="choose-key">
                    <span
                      class="key-type"
                      :class="{
                        active: columnsSpot.indexOf(item.value) !== -1,
                      }"
                      @click="onClick(columnsSpot, item)"
                      v-for="item in columnsList.characteristic"
                      :key="item.value"
                      >{{ item.label }}</span
                    >
                  </dd>
                </dl>
              </div>
            </template>
          </van-picker>
          <!-- </van-popup> -->
        </van-dropdown-item>
      </van-dropdown-menu>
      <!-- /下拉菜单 -->
    </div>
    <!-- 房源列表 -->
    <van-list
      v-if="list.length > 0"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <HouseItem
        v-for="(item, index) in list"
        :key="index"
        :item="item"
      ></HouseItem>
    </van-list>
    <Empty v-else>
      <p>暂无房源</p>
    </Empty>
  </div>
</template>

<script>
import Empty from '@/components/Empty.vue'
import { getCondition, gethomebycityid } from '@/api/house'
import HouseItem from '@/components/HouseItem.vue'
import { mapState } from 'vuex'
let key = null
export default {
  name: 'House',
  created () {
    this.gethomebycityid()
    this.getCondition()
  },
  data () {
    return {
      loading: false,
      finished: false,
      list: [], // 请求回来的list
      show: false, // 是否显示弹出层
      columns: [], // 区域地铁
      columnsList: {}, // 总数据
      columnsType: [], // 户型
      columnsOriented: [], // 朝向
      columnsfloor: [], // 楼层
      columnsSpot: [], // 房屋亮点
      state: {
        rentType: '', // 方式
        price: '', // 租金
        area: '', // 区域
        subway: [] // 地铁
      }
    }
  },
  methods: {
    async gethomebycityid () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await gethomebycityid({
          cityId: this.currentList.value,
          stat: 1,
          end: 20,
          more: this.more,
          ...this.state
        })
        console.log(res)
        this.list.push(...res.data.body.list)
        console.log('找房里面187行', this.list)
        if (this.list.length === res.data.body.count) {
          this.finished = true
        }
        this.loading = false
      } catch (err) {
        // console.log(err)
      }
    },
    async getCondition () {
      try {
        const res = await getCondition({
          id: this.currentList.value
        })
        console.log(res)
        this.columnsList = res.data.body
        const area = this.areaFormat(this.columnsList.area.children)
        const subway = this.areaFormat(this.columnsList.subway.children)
        console.log(this.columnsList.area.children)
        console.log('area', area)
        console.log(subway)
        this.columns = [{ label: '区域', children: area }, { label: '地铁', children: subway }]
      } catch (err) {
        console.log(err)
      }
    },
    clickConfirmc () {
      this.$refs.filter.toggle()
      this.list = []
      this.gethomebycityid()
    },
    // 方式
    onConfirmFnA (value) {
      console.log(value)
      this.$refs.method.toggle()
      this.state.rentType = value.value
      // console.log(this.state.rentType)
      this.list = [] // 把数据清空 ，从新调用请求数据
      this.gethomebycityid()
    },
    // 租金
    onConfirmFnB (value) {
      // console.log(value)
      this.$refs.money.toggle()
      this.state.price = value.value
      this.list = []
      this.gethomebycityid()
    },
    // 区域，地铁
    onConfirm (value) {
      // console.log('区域地铁', value)
      const val = value[2] ? value[2] : value[1]
      const result = this.findValue(this.columns[0].children, val)
      if (value[0] === '区域') {
        this.state.area = result
      } else {
        this.state.subway = result
      }
      this.$refs.area.toggle()
      this.list = []
      this.gethomebycityid()
    },
    findValue (arr, val) {
      // console.log(arr, val)
      arr.forEach(item => {
        if (item.label === val) {
          key = item.value
        } else if (item.children && item.children.length > 0) {
          this.findValue(item.children, val)
        }
      })
      console.log(key)
      return key
    },
    // 筛选
    onClick (Array, val) {
      // console.log(Array, val)
      console.log(Array)
      if (Array.length === 0) {
        Array.push(val.value)
      } else if (Array.indexOf(val.value) !== -1) {
        const index = Array.findIndex(item => item === item.value)
        Array.splice(index, 1)
      } else {
        Array.push(val.value)
      }
    },
    onLoad () {
      this.gethomebycityid()
    },
    areaFormat (Arr) {
      return Arr.map(item => {
        return {
          label: item.label,
          value: item.value,
          children: item.children
            ? item.children.map(v => ({
              label: v.label,
              value: v.value
            }))
            : [{ label: '' }]
        }
      })
    }

  },
  computed: {
    ...mapState(['currentList']),
    // 获取所有数据
    more () {
      const str1 = this.columnsType.join(',')
      const str2 = this.columnsOriented.join(',')
      const str3 = this.columnsfloor.join(',')
      const str4 = this.columnsSpot.join(',')
      return str1 + ',' + str2 + ',' + str3 + ',' + str4
    }
  },
  watch: {},
  filters: {},
  components: { HouseItem, Empty }
}
</script>

<style scoped lang='less'>
.house_top {
  position: relative;
  width: 375px;
  height: 50px;
  background-color: #21b97a;
  text-align: center;
  /deep/& i:nth-child(1) {
    position: absolute;
    left: 15px;
    top: 10px;
    font-size: 22px;
    color: #fff;
  }
  /deep/& i:nth-child(4) {
    position: absolute;
    left: 122px;
    top: 15px;
    font-size: 18px;
    color: #9c9fa1;
    font-size: 15px;
  }
  /deep/& i:nth-child(5) {
    position: absolute;
    top: 8px;
    right: 13px;
    font-size: 24px;
    color: #fff;
  }
  .wz_btn {
    position: absolute;
    left: 53px;
    top: 3px;
    .wz {
      font-size: 16px;
    }
    i {
      margin-left: 2px;
      font-size: 12px;
      color: #7f7f80;
    }
    .line {
      padding-left: 10px;
      font-size: 18px;
      color: #e5e5e5;
    }
  }
}

.search_input {
  border-radius: 5px;
  width: 278px;
  height: 34px;
  border: none;
  font-size: 14px;
  margin-left: -8px;
  padding-left: 25%;
  margin-top: 8px;
}
.am-flexbox {
  font-size: 18px;
  /deep/.van-picker__cancel {
    width: 125px;
    height: 50px;
    color: #21b97a;
    font-size: 18px;
  }
  /deep/.van-picker__confirm {
    width: 250px;
    height: 50px;
    color: #fff;
    background: #21b97a;
    font-size: 18px;
  }
}
.tck_btn {
  // padding-top: 50px;
  position: fixed;
  right: 45px;
  // height: 43px;
  // line-height: 48px;
  top: 47px;
  // background-color: green;
  z-index: 999999;
  .van-button {
    height: 48px;
    border: 0;
    // background: pink;
    font-size: 16px;
  }
  /deep/.tcc {
    width: 280px;
    background-color: #fff;
    .title {
      /deep/h3 {
        color: #333;
        font-size: 16px;
        font-weight: 400;
      }
    }
  }
}
.van-popup {
  padding: 0 15px;

  h3 {
    font-weight: normal;
    font-size: 15px;
    margin: 15px 0;
  }
}
.van-row {
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 14px;

  .van-col {
    // display: inline-block;
    height: 32px;
    width: 70px;
    margin: 0 18px 15px 50px;
    border: 1px solid #ddd;
    border-radius: 3px;
    line-height: 32px;
    text-align: center;
    font-size: 12px;
    color: #888;
    // padding-left: 20px;
  }
}
.van-col--12 {
  margin-left: 50px;
}
.inner {
  width: 70px;
  height: 32px;
  line-height: 32px;
  // background-color: #f4f5f6;
  border-radius: 6px;
  margin-right: 0;
  // margin-left: 14px;
  margin-bottom: 29px;
}
.sx_btn {
  position: fixed;
  // left: 80px;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 99999999;
  .van-button--primary {
    width: 196px;
    height: 55px;
    color: #fff;
    font-size: 18px;
    padding-right: unset;
  }
  .van-button--default {
    width: 113px;
    height: 55px;
    color: #21b97a;
    font-size: 18px;
    // background-color: pink;
    // border: 1px solid #999;
  }
}

#filter {
  /deep/.van-dropdown-item {
    position: unset;
  }
  /deep/.van-dropdown-item__content {
    position: fixed;
    min-height: 700px;
  }
  /deep/.van-overlay {
    height: 667px;
  }
  /deep/.van-popup--top {
    left: unset;
    right: 0;
    width: 75%;
  }
  /deep/.van-picker {
    height: 667px;
    padding-bottom: 50px;
    .van-picker__mask {
      background: unset;
    }
  }
  /deep/.van-picker__columns {
    position: unset;
    display: none;
  }
  /deep/.van-picker__toolbar {
    position: fixed;
    bottom: 0;
  }
  /deep/.van-picker__confirm {
    display: inline-block;
    width: 197px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    color: #fff;
    background-color: #21b97a;
  }
  /deep/.van-picker__cancel {
    background-color: #fff;
    display: inline-block;
    width: 98px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    color: #21b97a;
    flex: 1 1;
  }
  .choose {
    padding-bottom: 50px;
    margin-bottom: -238px;
    dl {
      margin-bottom: 30px;
    }
    .choose-title {
      padding: 0 15px;
      margin: 20px 0;
      font-size: 15px;
      color: #333;
    }
    .choose-key {
      margin-left: 40px;
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 7px;
      .key-type {
        display: inline-block;
        height: 32px;
        width: 70px;
        margin: 0 18px 15px 0;
        border: 1px solid #ddd;
        border-radius: 3px;
        line-height: 32px;
        text-align: center;
        font-size: 12px;
        color: #888;
      }
      .active {
        border: 1px solid #21b97a;
        color: #21b97a;
        background-color: #defaef;
      }
    }
  }
}
</style>
