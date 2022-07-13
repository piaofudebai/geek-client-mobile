<template>
  <div>
    <div class="pub_search">
      <van-field
        v-model.trim="SearchText"
        center
        clearable
        left-icon="search"
        placeholder="请输入搜索关键词"
      >
        <template #button>
          <van-button size="small" type="primary" @click="$router.back()"
            >取消</van-button
          >
        </template>
      </van-field>
    </div>
    <van-cell-group v-if="SearchText !== ''">
      <van-cell
        :value="item.communityName"
        v-for="(item, index) in SearchSuggest"
        :key="index"
        @click="$router.push({ name: 'add', params: { houseSearch: item } })"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getSearchList } from '@/api/search'
let timer = null
export default {
  name: 'SearchIndex',
  created () { },
  data () {
    return {
      SearchText: '',
      SearchSuggest: []
    }
  },
  methods: {
  },
  computed: {
    ...mapState(['currentList'])
  },
  watch: {
    // 监听表单内容的变化
    SearchText: {
      immediate: true,
      handler (newVal) {
        clearTimeout(timer)
        timer = setTimeout(async () => {
          // console.log(newVal)
          console.log(this.currentList.value)
          try {
            const res = await getSearchList({
              name: newVal,
              id: this.currentList.value
            })
            // console.log(res)
            this.SearchSuggest = res.data.body
          } catch (err) {
            console.log(err)
          }
        }, 500)
      }
    }
  },
  filters: {},
  components: {},
  beforeDestroy () {
    clearTimeout(timer)
  }
}
</script>

<style scoped lang='less'>
.pub_search {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 8px;
  background-color: #efeff4;
  .van-cell {
    padding: 0;
  }
  .van-button {
    background: #efeff4;
    color: #6b7072;
    border: none;
    padding-top: 1px;
  }
}
</style>
