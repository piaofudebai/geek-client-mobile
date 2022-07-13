import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import './style/reset.less'
import './style/index.less'
import './assets/iconfont/iconfont.css'
import BaiduMap from 'vue-baidu-map'

Vue.use(Lazyload)
Vue.use(Vant)
Vue.config.productionTip = false
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '9HeOiLigGH1fiB5l5GKI5WDy8vN2MBF3'
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
