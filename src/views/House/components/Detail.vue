<template>
  <div class="detail-index">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="list.community"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <!-- 轮播图 -->
    <div class="banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in list.houseImg" :key="index">
          <img v-lazy="'http://liufusong.top:8080' + image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 轮播图 -->
    <!-- 中间部分 -->
    <div class="house_info">
      <div class="info_title">
        <h3>{{ list.title }}</h3>
        <span>{{ list.tags[0] }}</span>
      </div>
      <ul class="info_price">
        <li>
          <h3>{{ list.price }}/月</h3>
          <span>租金</span>
        </li>
        <li>
          <h3>{{ list.roomType }}</h3>
          <span>房型</span>
        </li>
        <li>
          <h3>{{ list.size }}</h3>
          <span>面积</span>
        </li>
      </ul>
      <ul class="info_basic">
        <li class="left">
          <div>
            <span class="title">装修： </span>
            <span>精装</span>
          </div>
          <div>
            <span class="title">楼层： </span>
            <span>{{ list.floor }}</span>
          </div>
        </li>
        <li class="right">
          <div>
            <span class="title">朝向： </span>
            <span>{{ list.oriented[0] }}</span>
          </div>
          <div>
            <span class="title">类型： </span>
            <span>精装</span>
          </div>
        </li>
      </ul>
      <div class="map_house">
        <div class="map_title">
          小区：
          <span>天行城</span>
        </div>
        <div class="BMap_mask">
          <Webmap></Webmap>
        </div>
      </div>
      <div class="house_about">
        <div class="about_title">房屋配套</div>
        <van-grid :border="false">
          <van-grid-item icon="hotel-o" text="衣柜" />
          <van-grid-item icon="shop-o" text="洗衣机" />
          <van-grid-item icon="fire-o" text="空调" />
        </van-grid>
      </div>
      <div class="house_set">
        <div class="set_title">房源概况</div>
        <div class="house_user">
          <img src="http://liufusong.top:8080/img/avatar.png" alt="" />
          <div class="userinfo">
            <p>王女士</p>
            <div class="userauth">
              <van-icon name="success" />
              已认证房主
            </div>
          </div>
          <span class="usermsg"> 发消息 </span>
        </div>
        <div class="desctext">
          {{
            list.description.length === 0 ? "暂无描述信息" : list.description
          }}
        </div>
      </div>
      <div class="recommend">
        <div class="like_house">猜你喜欢</div>
        <van-cell title="单元格" size="large" class="cell">
          <template #icon>
            <van-image
              width="100"
              height="100"
              src="http://liufusong.top:8080/img/message/1.png"
            />
          </template>
          <template #title>
            <div class="text_p">
              <p>安贞西里 3室1厅</p>
              <span class="text_p1"><p>72.32㎡/南 北/低楼层</p></span>
              <span class="text_p2"> <p>随时看房</p></span>
              <p class="text_p3">4500元/月</p>
            </div>
          </template>
        </van-cell>
        <van-cell title="单元格" size="large" class="cell">
          <template #icon>
            <van-image
              width="100"
              height="100"
              src="http://liufusong.top:8080/img/message/2.png"
            />
          </template>
          <template #title>
            <div class="text_p">
              <p>天居园 2室1厅</p>
              <span class="text_p1"><p>83㎡/南/高楼层</p></span>
              <span class="text_p2"> <p>近地铁</p></span>
              <p class="text_p3">7200元/月</p>
            </div>
          </template>
        </van-cell>
        <van-cell title="单元格" size="large" class="cell">
          <template #icon>
            <van-image
              width="100"
              height="100"
              src="http://liufusong.top:8080/img/message/3.png"
            />
          </template>
          <template #title>
            <div class="text_p">
              <p>角门甲4号院 1室1厅</p>
              <span class="text_p1"><p>52㎡/西南/低楼层</p></span>
              <span class="text_p2"> <p>集中供暖</p></span>
              <p class="text_p3">4300元/月</p>
            </div>
          </template>
        </van-cell>
      </div>
    </div>
    <!-- /中间部分 -->
    <!-- 底部 -->
    <div class="fixedBottom">
      <div class="shoucang" @click.stop="onClick">
        <van-icon :name="light ? 'star' : 'star-o'" />
        <span>收藏</span>
      </div>
      <div class="zixun">在线咨询</div>
      <div class="telephone">
        <a href="tel:400-618-4000">电话预约</a>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import { favoritesTr, addFavorites, deleteFavorites } from '@/api/user'
import Webmap from '@/components/Webmap.vue'
import { getHouseList } from '@/api/house'
import { Toast } from 'vant'
export default {
  props: {
    houseCode: {
      type: [Number, String],
      required: true

    }
  },
  name: 'DetailIndex',
  created () {
    this.getHouseList()
    this.getFavoritesTr()
  },
  data () {
    return {
      list: {},
      collection: {},
      light: false
    }
  },
  methods: {
    async getFavoritesTr () {
      const res = await favoritesTr(this.houseCode)
      // console.log(res)
      this.light = res.data.body.isFavorite
      console.log(this.light)
    },
    async getHouseList () {
      try {
        const res = await getHouseList(this.houseCode)
        // console.log(res)
        this.list = res.data.body
        // console.log(this.list)
      } catch (err) {
        console.log(err)
      }
    },
    async onClick () {
      // this.light = true
      this.getFavoritesTr()
      // console.log(this.light)
      if (this.light === true) {
        await deleteFavorites(this.houseCode)
        Toast.success('删除收藏成功')
        this.light = false
        //
      } else {
        await addFavorites(this.houseCode)
        Toast.success('添加收藏成功')
        this.light = true
      }
    }
  },
  mounted () {
    // console.log(this.houseItem)
    console.log(this.houseCode)
  },

  computed: {
    // ...mapState(['houseItem'])
  },
  watch: {},
  filters: {},
  components: { Webmap }
}
</script>

<style scoped lang='less'>
body {
  background-color: #f5f5f9;
}
.detail-index {
  position: relative;
  padding-bottom: 34px;
  // background-color: #f6f5f6;
}
/deep/.van-nav-bar {
  background-color: #21b97a;
  .van-nav-bar__title {
    color: #fff !important;
  }
  .van-icon {
    color: #fff;
  }
}
.banner {
  width: 375px;
  height: 252px;
  background-color: pink;
  img {
    height: 252px;
  }
}
.house_info {
  padding: 15px;
  // background-color: green;
  .info_title {
    h3 {
      font-weight: 400;
      font-size: 16px;
      color: #333;
    }
    span {
      color: #39becd;
      background: #e1f5f8;
      display: inline-block;
      font-size: 12px;
      border-radius: 3px;
      padding: 4px 5px;
      margin-right: 5px;
      line-height: 12px;
    }
  }
  .info_price {
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #cecece;
    border-bottom: 1px solid #cecece;
    margin: 15px 0;
    padding: 15px 0;
    font-size: 14px;
    li {
      text-align: center;
    }
    h3 {
      color: #fa5741;
      font-size: 18px;
      font-weight: bolder;
    }
    span {
      height: 26px;
      line-height: 26px;
      text-align: center;
      color: #999;
    }
  }
  .info_basic {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 13px;
    li {
      width: 1689px;
    }
    .title {
      display: inline-block;
      color: #999;
      padding-right: 5px;
      line-height: 26px;
    }
    span {
    }
  }
  .map_house {
    font-size: 14px;
    margin-top: 10px;
    .map_title {
      margin: 0 3%;
      line-height: 44px;
      color: #666;
      span {
        color: #333;
      }
    }
    .BMap_mask {
      height: 145px;
      background-color: pink;
    }
  }
  .house_about {
    .about_title {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 10px;
      padding: 15px 0;
      border-bottom: 1px solid #cecece;
    }
    /deep/ .van-grid-item__content {
      width: 71px;
      height: 51px;
    }
  }
  .house_set {
    .set_title {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 10px;
      padding: 15px 0;
      margin-top: 15px;
      border-bottom: 1px solid #cecece;
      border-top: 1px solid #cecece;
    }
    .house_user {
      position: relative;
      display: flex;
      font-size: 14px;
      margin-bottom: 10px;
      img {
        border-style: none;
        width: 52px;
        height: 52px;
        margin: 10px 10px 0 0;
      }
      .userinfo {
        padding: 15px 0 0 5px;
        .userauth {
          color: #fa5741;
        }
      }
      .usermsg {
        position: absolute;
        right: 15px;
        top: 20px;
        color: #33be85;
        border: 1px solid #33be85;
        border-radius: 3px;
        padding: 3px 15px;
      }
    }
    .desctext {
      line-height: 1.6;
      padding: 10px 0;
      color: #333;
      font-size: 14px;
    }
  }
  .recommend {
    .like_house {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 10px;
      padding: 15px 0;
      border-bottom: 1px solid #cecece;
    }
    /deep/ .van-cell {
      padding: 0;
      padding-top: 18px;
      border-bottom: 1px solid #e5e5e5;
    }
    .text_p {
      p {
        // padding-top:-20px ;
        margin: 3px;
        margin-left: 10px;
      }
    }
    .text_p1 {
      color: #afb2b3;
      font-size: 15px;
    }
    .text_p2 {
      font-size: 12px;
      color: #39becd;
      background: #e1f5f8;
      border-radius: 3px;
    }
    .text_p3 {
      font-size: 12px;
      font-size: 16px;
      color: #fa5741;
    }
  }
}
.fixedBottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-top: 1px solid #cecece;
  text-align: center;
  font-size: 17px;
  color: #999;
  background-color: #fff;
  overflow: hidden;
  display: flex;
  .shoucang {
    border-right: 1px solid #e8e8e9;
    box-sizing: border-box;
    flex: 1 1;
    margin-left: 8px;
    min-width: 10px;
    img {
      width: 16px;
      border-style: none;
    }
    span {
      margin-left: 6px;
    }
  }
  .zixun {
    box-sizing: border-box;
    flex: 1 1;
    margin-left: 8px;
    min-width: 10px;
  }
  .telephone {
    border-right: 1px solid #e8e8e9;
    background-color: #21b97a;
    box-sizing: border-box;
    flex: 1 1;
    margin-left: 8px;
    min-width: 10px;
    a {
      color: #fff;
    }
  }
}
.active {
  color: #21b97a;
  background-color: #21b97a;
  /deep/.van-grid-item__text {
    color: #21b97a;
  }
}
</style>
