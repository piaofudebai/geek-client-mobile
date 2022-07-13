import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    currentList: {},
    // 存储搜索建议
    searchSuggestList: []

  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setList (state, payload) {
      state.currentList = payload
    },
    suggestList (state, payload) {
      let arr = state.suggestList
      arr.unshift(payload)
      arr = [...new Set(arr)]
      state.searchSuggestList = arr
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
