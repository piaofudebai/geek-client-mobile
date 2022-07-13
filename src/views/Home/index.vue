<template>
  <div class="Home">
    <div class="top">
      <div class="banner">
        <van-swipe :autoplay="8000">
          <van-swipe-item
            v-for="(image, index) in ShufflingFigure"
            :key="index"
          >
            <img v-lazy="image" />
          </van-swipe-item>
        </van-swipe>
        <i class="iconfont icon-dingwei" @click="$router.push('/map')"></i>
      </div>
      <div class="search_box">
        <div class="wz">
          <span>{{ currentList.label || "北京" }}</span>
          <i
            class="iconfont icon-xialaanniu"
            @click="$router.push('/city')"
          ></i>
          <span class="line">|</span>
        </div>
        <div class="sousuo">
          <input type="search" placeholder="" />
          <template>
            <van-icon size="15" name="search" />
          </template>
        </div>
      </div>
    </div>
    <div class="cengterRow">
      <van-grid :border="false" :column-num="4">
        <van-grid-item @click="$router.push('/home/house')">
          <img src="@/assets/images/nav-1.png" alt="" />
          整租
        </van-grid-item>
        <van-grid-item @click="$router.push('/home/house')">
          <img src="@/assets/images/nav-2.png" alt="" />
          合租
        </van-grid-item>
        <van-grid-item>
          <img src="@/assets/images/nav-3.png" alt="" />
          地图找房
        </van-grid-item>
        <van-grid-item @click="$router.push('/add')"
        >
          <img src="@/assets/images/nav-4.png" alt="" />
          去出租
        </van-grid-item>
      </van-grid>
    </div>
    <div class="group">
      <div class="title">
        <h3>租房小组</h3>
        <van-button @click="$router.push('/add')">更多</van-button>
      </div>
      <van-grid :gutter="10" direction="horizontal" :column-num="2">
        <van-grid-item v-for="(item, index) in groupList" :key="index">
          <img
            class="left"
            :src="'http://liufusong.top:8080' + item.imgSrc"
            alt=""
          />
          <div class="right">
            <p>{{ item.title }}</p>
            <p>{{ item.desc }}</p>
          </div>
        </van-grid-item>
        <!-- <van-grid-item>
          <img class="left" src="" alt="" />
          <div class="right">
            <p>家住回龙观</p>
            <p>归属的感觉</p>
          </div>
        </van-grid-item>
        <van-grid-item>
          <img class="left" src="" alt="" />
          <div class="right">
            <p>家住回龙观</p>
            <p>归属的感觉</p>
          </div>
        </van-grid-item>
        <van-grid-item>
          <img class="left" src="" alt="" />
          <div class="right">
            <p>家住回龙观</p>
            <p>归属的感觉</p>
          </div>
        </van-grid-item> -->
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getSwiper } from '@/api/home'
import { getGroups } from '@/api/area'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  created () {
    this.getSwiper()
    this.getGroupsList()
  },
  data () {
    return {
      ShufflingFigure: [],
      groupList: []
    }
  },
  methods: {
    async getSwiper () {
      try {
        const res = await getSwiper()
        // console.log(res)
        // eslint-disable-next-line no-return-assign
        this.ShufflingFigure = res.data.body.map(item => item.imgSrc = 'http://liufusong.top:8080' + item.imgSrc)
        // this.ShufflingFigure.push(src)
        // console.log(this.ShufflingFigure)
      } catch (err) {
        // console.log('请求轮播图', err)
      }
    },
    async getGroupsList () {
      try {
        const res = await getGroups(this.currentList.value)
        // console.log('刚请求的', res)
        this.groupList = res.data.body
        // console.log(this.groupList)
      } catch (err) {
        // console.log(err)
      }
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

<style scoped lang='less'>
.top {
  position: relative;
  width: 375px;
  height: 212px;
  .banner {
    height: 212px;
    position: relative;
    i {
      position: absolute;
      right: 24px;
      top: 20px;
      font-size: 33px;
    }
  }
  .search_box {
    position: relative;
    position: absolute;
    top: 25px;
    left: 25px;
    display: flex;
    width: 310px;
    padding: 0 10px;
    margin-right: 10px;
    .van-search {
      border-left: #7f7f80;
      width: 280px;
      height: 34px;
      padding-left: 50px;
      .van-field__control {
        background-color: #fff;
      }
    }
  }
  .wz {
    display: flex;
    text-align: center;
    font-size: 12px;
    position: absolute;
    left: 10px;
    top: 8px;
    color: #7f7f80;
    .line {
      margin-left: 15px;
      color: #9c9fa1;
    }
    span {
      margin-right: 3px;
      margin-left: 3px;
    }
    i {
      position: absolute;
      left: 20px;
      bottom: -2px;
      margin-left: 5px;
      font-size: 12px;
      color: #7f7f80;
    }
  }
}
input {
  border-radius: 5px;
}
.sousuo {
  .van-icon {
    position: absolute;
    left: 65px;
    top: 12px;
  }
}
.cengterRow {
  font-size: 16px;
  img {
    width: 60px;
    height: 60px;
  }
}
.group {
  width: 375px;
  height: 230px;
  background-color: #f6f5f6;
  font-size: 14px;
  .van-button {
    color: "red";
  }
}
.title {
  display: flex;
  justify-content: space-between;
  .van-button {
    background-color: #f6f5f6;
    border: none;
  }
  h3 {
    padding-top: 10px;
    padding-left: 15px;
  }
}
/deep/.van-grid-item__content {
  border-radius: 10px;
  img {
    width: 50px;
    height: 50px;
  }
  p {
    margin-left: 15px;
    font-size: 15px;
    line-height: 15px;
  }
}
</style>
