<template>
  <div class="add_index">
    <!-- 导航栏 -->
    <van-nav-bar title="发布房源" left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->
    <div class="rent_list">
      <div class="list-header">房源信息</div>
      <div class="list-body">
        <van-cell-group>
          <van-field
            label="小区名称"
            readonly
            is-link
            center
            @click="$router.push('/search')"
          >
            <template #button>
              <van-button class="btn_search" type="default" disabled>{{
                houseSearch ? houseSearch.communityName : "请输入小区"
              }}</van-button>
            </template>
          </van-field>
          <van-field
            label="租  金"
            v-model="houseList.price"
            placeholder="请输入租金/月"
          >
            <template #extra> ￥/月</template>
          </van-field>
          <van-field
            label="建筑面积"
            v-model="houseList.size"
            placeholder="请输入建筑面积"
          >
            <template #extra>㎡</template>
          </van-field>
          <!-- 第四行 -->
          <van-cell
            title="户    型"
            is-link
            @click="showPopup1"
            :value="value1.length === 0 ? '请选择' : value1"
          ></van-cell>
          <van-popup
            v-model="show1"
            position="bottom"
            :style="{ height: '50%' }"
          >
            <van-picker
              show-toolbar
              value-key="label"
              :columns="columnsList.roomType"
              @cancel="show1 = false"
              @confirm="onConfirm1"
            />
          </van-popup>
          <!-- 第五行 -->
          <van-cell
            title="所在楼层"
            is-link
            @click="showPopup2"
            :value="value2.length === 0 ? '请选择' : value2"
          ></van-cell>
          <van-popup
            v-model="show2"
            position="bottom"
            :style="{ height: '50%' }"
          >
            <van-picker
              show-toolbar
              value-key="label"
              :columns="columnsList.floor"
              @confirm="onConfirm2"
              @cancel="show = false"
            />
          </van-popup>
          <!-- 第六行 -->
          <van-cell
            title="朝  向"
            is-link
            @click="showPopup3"
            :value="value3.length === 0 ? '请选择' : value3"
          ></van-cell>
          <van-popup
            v-model="show3"
            position="bottom"
            :style="{ height: '50%' }"
          >
            <van-picker
              show-toolbar
              value-key="label"
              :columns="columnsList.oriented"
              @confirm="onConfirm3"
              @cancel="show3 = false"
            />
          </van-popup>
          <div class="input_header">
            <h3>房屋标题</h3>
            <div class="input">
              <input
                type="text"
                v-model="houseList.title"
                placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
              />
            </div>
          </div>
          <div class="list-header">
            <h3>房屋图像</h3>

            <van-uploader
              :after-read="afterRead"
              v-model="fileList"
              multiple
              :max-count="8"
            />
          </div>
          <div class="houseconfig">
            <h3>房屋配置</h3>
            <van-grid :column-num="5" :border="false">
              <van-grid-item
                icon="star-o"
                :text="item.label"
                v-for="(item, index) in columnsList.supporting"
                :key="index"
                :class="selected.includes(item.label) ? 'active' : ''"
                @click="onClick(item.label)"
              />
            </van-grid>
          </div>
          <div class="texthouse">
            <h3>房屋描述</h3>
            <div class="textarea">
              <van-field
                v-model="houseList.description"
                rows="1"
                autosize
                type="textarea"
                placeholder="请输入房屋描述信息"
              />
            </div>
          </div>
        </van-cell-group>
        <div class="db_btn">
          <van-button class="left" type="default">取消</van-button>
          <van-button class="right" type="primary" @click="pubhouse">确定</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHouseParams } from '@/api/house'
import { pubhouse } from '@/api/pubhouse'
import { publishImg } from '@/api/plugin'
import { mapState } from 'vuex'
export default {
  name: 'AddIndex',
  created () { this.getHouseParams() },
  data () {
    return {
      // message: '',
      fileList: [],
      value1: '',
      value2: '',
      value3: '',
      show1: false,
      show2: false,
      show3: false,
      // 接收路由参数
      houseSearch: this.$route.params.houseSearch,
      columnsList: [], // 总数居
      // 控制房屋配置图标是否变绿
      isActive: false,
      selected: [], // 选中的房屋高亮
      houseList: {
        // 收集参数发起请求
        // houseSearch: this.$route.params.houseSearch.communityName,
        price: '', // 租金
        size: '', // 面积
        title: '', // 标题z
        description: '', // 描述
        roomType: '', // 户型
        supporting: '', // 图标
        oriented: '', // 朝向
        floor: '', // 楼层
        community: this.$route.params.houseSearch?.community
      },
      houseImage: [] // 图片
    }
  },
  methods: {
    showPopup1 () {
      this.show1 = true
    },
    showPopup2 () {
      this.show2 = true
    },
    showPopup3 () {
      this.show3 = true
    },
    onConfirm1 (value1) {
      console.log(value1)
      this.value1 = value1.label
      this.houseList.roomType = value1.value
      this.show1 = false
    },
    onConfirm2 (value2) {
      // console.log(value, index)
      this.value2 = value2.label
      this.houseList.floor = value2.value
      this.show2 = false
    },
    onConfirm3 (value3) {
      // console.log(value, index)
      this.value3 = value3.label
      this.houseList.oriented = value3.value
      this.show3 = false
    },
    // 将图片转为2进制
    afterRead (file) {
      console.log(file)
      this.loadImage(file.file)
    },
    // 请求图片
    async loadImage (file) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        const res = await publishImg(formData)
        console.log(res)
        this.houseImage.push(res.data.body[0])
      } catch (err) {
        console.log(err)
      }
    },

    async getHouseParams () {
      try {
        const res = await getHouseParams()
        console.log('222行', res)
        this.columnsList = res.data.body
      } catch (err) {
        console.log(err)
      }
    },
    // 实现点击高亮存储
    onClick (val) {
      if (this.selected.includes(val)) {
        const index = this.selected.indexOf(val)
        this.selected.splice(index, 1)
      } else {
        this.selected.push(val)
      }
      this.houseList.supporting = this.selected.join('|')
    },
    // 点击发布房源
    async pubhouse () {
      try {
        const houseImg = this.houseImage.join('|')
        const res = await pubhouse({
          ...this.houseList, houseImg
        })
        console.log(res)
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
/deep/.van-nav-bar {
  background-color: #21b97a;

  .van-nav-bar__title {
    color: #fff !important;
  }
  .van-icon {
    color: #fff;
  }
}
.rent_list {
  .list-header {
    color: #21b97a;
    background-color: #fff;
    font-size: 15px;
    padding: 15px 15px 9px;
    width: 100%;
    box-sizing: border-box;
  }
  .list-body {
    position: relative;
    background-color: #fff;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  .input_header {
    h3 {
      color: #333;
      font-size: 14px;
      padding: 15px 15px 9px;
      font-size: 14px;
      width: 100%;
      box-sizing: border-box;
    }
    .input {
      position: relative;
      background-color: #fff;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      font-size: 12px;
      padding: 15px;
      input {
        color: #888;
        font-size: 14px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 100%;
        padding: 2px 0;
        border: 0;
        background-color: transparent;
        line-height: 1;
        box-sizing: border-box;
      }
    }
  }
  .list-header {
    h3 {
      color: #333;
      font-size: 14px;
      padding: 15px 0px 9px;
      font-size: 14px;
      width: 100%;
      box-sizing: border-box;
    }
    /deep/.van-uploader__preview {
      margin-right: 5.5px;
    }
  }
  .houseconfig {
    .van-grid-item {
      // color: #21b97a;
      width: 20%;
      line-height: 23px;
      border: none;
    }
    /deep/.van-grid-item__text {
      // color: #21b97a;
    }
    .active {
      color: #21b97a;
      background-color: #21b97a;
      /deep/.van-grid-item__text {
        color: #21b97a;
      }
    }
    h3 {
      color: #333;
      font-size: 14px;
      padding: 15px 0px 9px;
      font-size: 14px;
      width: 100%;
      box-sizing: border-box;
      padding-left: 15px;
      // margin-right: 15px;
      border-bottom: 1px solid #ddd;
    }
  }
  .texthouse {
    h3 {
      color: #333;
      font-size: 14px;
      padding: 15px 0px 9px;
      font-size: 14px;
      width: 100%;
      box-sizing: border-box;
      padding-left: 15px;
      // margin-right: 15px;
      border-bottom: 1px solid #ddd;
    }
    .textarea {
      width: 375px;
      height: 128px;
      margin-bottom: 60px;
      border-bottom: 1px solid #ddd;
      overflow: hidden;
      /deep/ .van-field__body {
        width: 375px;
        // height: 128px;
      }
      .van-field__control {
        margin-top: 0;
      }
    }
  }
}
/deep/.btn_search {
  border: 0;
}
.db_btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  height: 45px;
  z-index: 1;
  color: #fff;
  font-size: 15px;
  background-color: #fff;
  .left {
    width: 188px;
  }
  .right {
    width: 187px;
  }
}
</style>
